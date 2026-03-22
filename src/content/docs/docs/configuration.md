---
title: Configuration
description: Configure database, authentication, storage, and AI provider keys for your OpenCauldron deployment.
---

OpenCauldron is configured through environment variables. Copy `.env.example` to `.env` and fill in the values for your deployment.

```bash
cp .env.example .env
```

---

## Required variables

These must be set before the app will start.

### Database

OpenCauldron uses PostgreSQL via Drizzle ORM. Set `DATABASE_URL` to a valid PostgreSQL connection string.

```bash
DATABASE_URL="postgresql://cauldron:cauldron@localhost:5432/cauldron"
```

For local development, the included `docker-compose.yml` spins up a Postgres 16 instance with these exact credentials. Run it with:

```bash
docker compose up db
```

For production, [Neon](https://neon.tech) is a solid serverless Postgres option. Add `?sslmode=require` to the connection string when connecting to Neon or any hosted provider that requires SSL:

```bash
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

After setting `DATABASE_URL`, run migrations before starting the app:

```bash
npx drizzle-kit push
```

### Authentication

OpenCauldron uses NextAuth.js with Google OAuth as the only sign-in provider.

```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""  # Generate with: openssl rand -base64 32
```

**`NEXTAUTH_SECRET`** must be set to a random string. Generate one with:

```bash
openssl rand -base64 32
```

**`NEXTAUTH_URL`** should be the full public URL of your deployment (e.g. `https://your-domain.com` in production).

#### Google OAuth credentials

Create OAuth credentials at [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials):

1. Create a new OAuth 2.0 Client ID (application type: Web application).
2. Add your domain to **Authorized JavaScript origins** (e.g. `http://localhost:3000`).
3. Add the callback URL to **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`.
4. Copy the client ID and secret into your `.env`:

```bash
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

---

## Optional variables

### Restrict sign-in by email domain

To limit access to users from a specific email domain, set:

```bash
ALLOWED_EMAIL_DOMAIN="yourcompany.com"
```

Leave this unset (or empty) to allow any Google account to sign in.

---

## Storage

Generated images and videos are stored either on the local filesystem or in Cloudflare R2. Set `STORAGE_PROVIDER` to choose.

### Local filesystem (default)

The simplest option for development. Files are saved under `uploads/` in the project root.

```bash
STORAGE_PROVIDER="local"
```

When running with Docker, the `docker-compose.yml` mounts a named volume at `/app/uploads` so files persist across container restarts.

### Cloudflare R2

For production deployments, use R2 or any S3-compatible object store.

```bash
STORAGE_PROVIDER="r2"
R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME="cauldron"
R2_PUBLIC_URL=""
```

**`R2_PUBLIC_URL`** is the public base URL for your R2 bucket (e.g. a custom domain or the default `https://<bucket>.<account>.r2.dev`). Generated media URLs are constructed from this value.

---

## AI provider keys

Add keys for the AI providers you want to use. Models without a configured key are automatically hidden from the interface — no error is shown, they simply do not appear.

See the [API Keys guide](/docs/guides/api-keys) for instructions on obtaining each key, a full model list with pricing, and security best practices.

---

## Docker deployment

The repo includes a `docker-compose.yml` that runs the app and a Postgres database together. It reads environment variables from `.env.local`:

```bash
cp .env.example .env.local
# Fill in values, then:
docker compose up
```

The app container is built from the included `Dockerfile` and uses Next.js standalone output. The database container uses `postgres:16-alpine` with a health check so the app only starts once Postgres is ready.

For a production Docker deployment without Compose, pass variables at runtime:

```bash
docker run -p 3000:3000 \
  --env-file .env \
  ghcr.io/opencauldron/opencauldron:latest
```

---

## Related

- [API Keys](/docs/guides/api-keys) — Get keys for every AI provider, full model list, and pricing
- [Installation](/docs/installation) — Full setup walkthrough from clone to first generation
