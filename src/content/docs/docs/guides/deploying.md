---
title: Deploying
description: Deploy OpenCauldron to production using Docker Compose, a standalone Docker container, or Vercel.
---

This guide covers three production deployment paths. For local development setup, see [Installation](/docs/installation).

---

## Before you start

Every deployment needs the same core environment variables regardless of path:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | Full public URL of your deployment |
| `NEXTAUTH_SECRET` | Random secret — generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

See [Configuration](/docs/configuration) for the full variable reference, including AI provider keys and storage options.

### Google OAuth setup

Update your Google OAuth credentials to include your production domain:

1. Go to [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials) and open your OAuth client.
2. Add your production URL to **Authorized JavaScript origins** (e.g. `https://your-domain.com`).
3. Add the production callback URL to **Authorized redirect URIs**: `https://your-domain.com/api/auth/callback/google`.

---

## Auth middleware

Every route in OpenCauldron requires authentication except two:

- `/api/auth/*` — NextAuth sign-in and callback endpoints
- `/api/uploads/*` — Local file serving for the local storage backend

Unauthenticated requests to any other route are redirected to `/login`. This applies to the API and to all page routes.

To restrict sign-in to a single email domain, set:

```bash
ALLOWED_EMAIL_DOMAIN="yourcompany.com"
```

Leave this unset to allow any Google account to sign in.

---

## Docker Compose

Docker Compose is the simplest self-hosted path. The included `docker-compose.yml` starts the app and a Postgres 16 database together, with a health check so the app waits for the database to be ready.

### 1. Create your environment file

Docker Compose reads from `.env.local` — not `.env`. Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

Set at minimum:

```bash
DATABASE_URL="postgresql://cauldron:cauldron@db:5432/cauldron"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET=""   # openssl rand -base64 32
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
STORAGE_PROVIDER="local"
```

The `DATABASE_URL` host must be `db` (the Compose service name), not `localhost`.

### 2. Start the stack

```bash
docker compose up -d
```

This builds the app image, starts Postgres, waits for it to be healthy, then starts the app on port 3000.

### 3. Run migrations

On first deploy, apply the database schema:

```bash
docker compose exec app bun run db:migrate
```

### 4. Seed badge definitions

Badge definitions (feats) must be inserted into the database before they appear in the UI. The seed script reads from `.env.local` and requires a Neon connection string — if you are running a plain Postgres database, run the seed command from a separate environment that has a Neon `DATABASE_URL`, or skip this step and the feats system will simply be empty until you can run it.

To seed from a machine with a Neon `DATABASE_URL` in `.env.local`:

```bash
bun src/lib/db/seed-badges.ts
```

Re-run this after upgrades to pick up any new or renamed badges.

### Persistent storage

The `docker-compose.yml` defines two named volumes:

- `pgdata` — Postgres data directory, persists database across container restarts
- `uploads` — mounted at `/app/uploads` in the app container, persists locally stored files

As long as you do not remove these volumes, your data survives container rebuilds and restarts.

### Updating

To deploy a new version:

```bash
docker compose build
docker compose up -d
docker compose exec app bun run db:migrate
```

---

## Docker (standalone container)

Use this path when you want to manage the database externally (Neon, Supabase, RDS, or any hosted Postgres) and run only the app container.

### How the image is built

The `Dockerfile` uses a three-stage build:

1. **deps** — installs dependencies with `bun install --frozen-lockfile`
2. **builder** — runs `bun run build`, which produces a Next.js standalone output at `.next/standalone`
3. **runner** — copies only the standalone bundle, static files, and `public/` into a slim image

The production container starts with `bun server.js`, not `next start`. The standalone output bundles the Node server directly, so `next` does not need to be installed in the final image.

### Running the container

```bash
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  ghcr.io/opencauldron/opencauldron:latest
```

Or pass variables individually:

```bash
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host/db?sslmode=require" \
  -e NEXTAUTH_URL="https://your-domain.com" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e GOOGLE_CLIENT_ID="your-client-id" \
  -e GOOGLE_CLIENT_SECRET="your-client-secret" \
  -e STORAGE_PROVIDER="r2" \
  -e R2_ACCOUNT_ID="your-account-id" \
  -e R2_ACCESS_KEY_ID="your-access-key" \
  -e R2_SECRET_ACCESS_KEY="your-secret-key" \
  -e R2_BUCKET_NAME="cauldron" \
  -e R2_PUBLIC_URL="https://your-bucket.your-domain.com" \
  ghcr.io/opencauldron/opencauldron:latest
```

The app listens on port 3000. Map it to whichever port your reverse proxy expects.

### Database and migrations

Provide `DATABASE_URL` pointing to your external Postgres instance. Run migrations before starting the container (or as a separate init step):

```bash
DATABASE_URL="postgresql://..." bun run db:migrate
```

### Storage

The local filesystem backend does not work well with standalone containers — the `/app/uploads` directory is ephemeral unless you mount a volume. For containerized deployments without Compose, use R2:

```bash
STORAGE_PROVIDER="r2"
```

See the [Storage guide](/docs/guides/storage) for full R2 configuration.

---

## Vercel

Vercel is the easiest path if you do not need self-hosting. The app deploys as a serverless Next.js application.

### Requirements

Before deploying to Vercel you need:

- A [Neon](https://neon.tech) database (or another serverless-compatible Postgres)
- A [Cloudflare R2](https://developers.cloudflare.com/r2/) bucket with public access enabled

Both are required. Read on for why.

### Why Neon is required

OpenCauldron auto-detects the database driver at startup. If `DATABASE_URL` contains `neon.tech` or `neon.db`, it uses the `@neondatabase/serverless` HTTP driver, which is compatible with Vercel's edge and serverless runtime. Standard `pg` connections use long-lived TCP connections that do not work in serverless environments. Use a Neon connection string for Vercel deployments.

### Why R2 is required

Vercel's serverless functions have an ephemeral filesystem — any files written to disk disappear when the function exits. The local storage backend writes to disk and will not work on Vercel. Set `STORAGE_PROVIDER="r2"` and configure your R2 credentials.

Additionally, image-to-video generation requires a publicly accessible URL for the reference image. R2 with a public bucket satisfies this requirement; local storage does not.

### Deploy

1. Push your fork to GitHub.
2. Import the repository in the [Vercel dashboard](https://vercel.com/new).
3. Add environment variables in **Settings > Environment Variables**.

Set all required variables plus:

```bash
NEXTAUTH_URL="https://your-project.vercel.app"   # or your custom domain
STORAGE_PROVIDER="r2"
```

Vercel automatically runs `bun run build` (or `next build`) during deployment. No extra build command is needed.

### Environment variables on Vercel

Add every variable from `.env.example` that applies to your deployment. Key ones to double-check:

| Variable | Value for Vercel |
|----------|-----------------|
| `DATABASE_URL` | Neon connection string (must contain `neon.tech`) |
| `NEXTAUTH_URL` | Your production URL — must match the deployed domain exactly |
| `STORAGE_PROVIDER` | `r2` |
| `R2_PUBLIC_URL` | Public base URL for your R2 bucket |

### Running migrations on Vercel

Vercel does not run migrations automatically. Run them from your local machine against your Neon database before or after the first deploy:

```bash
DATABASE_URL="postgresql://..." bun run db:migrate
```

Then seed badge definitions:

```bash
# .env.local must contain your Neon DATABASE_URL
bun src/lib/db/seed-badges.ts
```

### Custom domain

After deploying, update `NEXTAUTH_URL` in Vercel's environment variables to match your custom domain, and update the **Authorized JavaScript origins** and **Authorized redirect URIs** in your Google OAuth credentials to include the new domain.

---

## Related

- [Configuration](/docs/configuration) — Full environment variable reference
- [Storage](/docs/guides/storage) — R2 setup and storage backend details
- [API Keys](/docs/guides/api-keys) — Configure AI provider keys
