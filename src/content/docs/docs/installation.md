---
title: Installation
description: Get OpenCauldron running locally or deploy to production.
---

## Prerequisites

- Node.js 20+ or Bun 1.0+
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- Cloudflare R2 bucket (or any S3-compatible storage)
- At least one AI model API key

## Quick start

### Clone and install

```bash
git clone https://github.com/opencauldron/opencauldron
cd opencauldron
bun install
```

### Set up environment

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

### Run database migrations

```bash
bun run db:migrate
```

### Seed badge definitions

Badges (feats) are defined in code and must be inserted into the database before they appear in the UI. The seed script reads from `.env.local`, so copy your environment file first:

```bash
cp .env .env.local
bun src/lib/db/seed-badges.ts
```

Re-run this command after any upgrade to pick up new or renamed badges.

### Start the development server

```bash
bun run dev
```

OpenCauldron will be available at `http://localhost:3000`.

## Docker

Run OpenCauldron with a single command:

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e R2_ACCOUNT_ID="your-r2-account" \
  ghcr.io/opencauldron/opencauldron:latest
```

## Next steps

- [Configuration](/docs/configuration/) — Set up API keys and customize your instance
