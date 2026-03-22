---
title: Development Setup
description: Set up the OpenCauldron main application locally for contributing code.
---

This guide walks you through getting the main OpenCauldron Next.js application running locally so you can develop and test changes before opening a pull request.

## Prerequisites

- [Node.js](https://nodejs.org) 20+ or [Bun](https://bun.sh) 1.0+ (Bun is recommended — all scripts use it)
- [Docker](https://docker.com) for local Postgres, or a [Neon](https://neon.tech) connection string
- A Google Cloud project with OAuth credentials configured for `http://localhost:3000`
- At least one AI provider API key (for testing generation)
- Git

---

## 1. Fork and clone

Fork [opencauldron/opencauldron](https://github.com/opencauldron/opencauldron) on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/opencauldron
cd opencauldron
```

Add the upstream remote so you can pull in future changes:

```bash
git remote add upstream https://github.com/opencauldron/opencauldron
```

---

## 2. Install dependencies

```bash
bun install
```

---

## 3. Configure environment

Copy the example env file:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the required values.

### Required variables

```bash
# Database — local Docker Postgres (see step 4) or a Neon connection string
DATABASE_URL="postgresql://cauldron:cauldron@localhost:5432/cauldron"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=""      # openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

For Google OAuth, create credentials at [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials). Set the authorized JavaScript origin to `http://localhost:3000` and the redirect URI to `http://localhost:3000/api/auth/callback/google`.

### AI provider keys

Add at least one AI provider key in the `AI MODELS` section so you can test generation. Any key will work:

```bash
GEMINI_API_KEY=""     # Google AI Studio — free tier available
```

See the [API Keys guide](/docs/guides/api-keys) for how to obtain keys for every supported provider.

### Storage

For local development, use the local filesystem backend — no credentials needed:

```bash
STORAGE_PROVIDER="local"
```

:::note
Local storage does not work for image-to-video generation because AI provider APIs need a publicly accessible URL for the reference image. If you are working on image-to-video features, configure Cloudflare R2 instead. See the [Storage guide](/docs/guides/storage).
:::

---

## 4. Start the database

If you are using local Postgres via Docker:

```bash
docker compose up db -d
```

This starts a Postgres 16 container using the credentials in `.env.example`. The container exposes Postgres on port 5432.

If you are using Neon, skip this step and set `DATABASE_URL` to your Neon connection string.

---

## 5. Apply the schema

Push the schema to your database:

```bash
bun run db:push
```

Use `db:push` for local development. It applies schema changes directly without generating migration files, which is faster when iterating.

---

## 6. Seed badge definitions

The feats (achievement badges) system requires a seeded `badges` table. Without it, no badges will be awarded and the feats UI will be empty.

```bash
bun tsx src/lib/db/seed-badges.ts
```

You only need to run this once (and again after upgrades that add new badges).

---

## 7. Start the dev server

```bash
bun run dev
```

The app starts at [http://localhost:3000](http://localhost:3000). Sign in with Google to create your account.

---

## Development commands

| Command | What it does |
|---------|-------------|
| `bun run dev` | Start Next.js dev server with hot reload |
| `bun run build` | Production build — run this before opening a PR |
| `bun run lint` | Run ESLint across the codebase |
| `bun run db:push` | Push schema changes to the local database |
| `bun run db:migrate` | Apply versioned migrations (production workflow) |
| `bun run db:studio` | Open Drizzle Studio in the browser |

---

## Making an admin account

After signing in for the first time, your account is created with the `member` role. To access admin features (user management, usage dashboards), promote yourself in Drizzle Studio:

```bash
bun run db:studio
```

Open `https://local.drizzle.studio`, find your row in the `users` table, and set `role` to `admin`.

---

## Keeping your fork up to date

Before starting new work, sync your fork with upstream:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

---

## Project structure

The main app is a standard Next.js App Router project. Key directories:

```
src/
├── app/                  Next.js App Router pages and API routes
│   ├── api/              API endpoints (generate, poll, upload, etc.)
│   └── (app)/            Page routes behind auth
├── components/           React components
├── lib/
│   ├── db/               Drizzle schema, client, and seed scripts
│   └── ...               Shared utilities
├── providers/            AI provider implementations + registry
└── types/                Shared TypeScript interfaces and unions
```

The provider system — where most new integrations live — is in `src/providers/`. The `GenerationProvider` interface and all shared types are in `src/types/index.ts`.

---

## Verifying your changes

Before pushing a branch, run:

```bash
bun run lint
bun run build
```

Both must pass cleanly. The build step catches type errors that the dev server may not surface.

---

## Related

- [Adding a Provider](/docs/guides/adding-providers) — The most common contribution: adding a new AI model
- [Code Style and PR Guidelines](/docs/contributing/code-style) — Linting, formatting, and PR conventions
- [Issues and Feature Requests](/docs/contributing/issues-and-requests) — How to file a bug report or feature request
