---
title: Installation
description: Get OpenCauldron running locally or deploy to production.
---

## Quick start

### Option 1: CLI Wizard (Recommended)

The fastest way to get started. The interactive wizard walks you through database, storage, and AI provider setup:

```bash
npx create-opencauldron@latest
```

It clones the repo, generates your `.env.local` with the values you provide, installs dependencies, and initializes git. Follow the printed next steps to start your dev server.

See the [CLI Wizard](/docs/cli/) docs for the full walkthrough.

### Option 2: Git Clone

For manual setup or if you prefer to configure `.env.local` yourself:

```bash
git clone https://github.com/opencauldron/opencauldron
cd opencauldron
bun install
cp .env.example .env.local
```

Edit `.env.local` with your keys, then:

```bash
docker compose up db -d   # start local Postgres
bun run db:push           # create tables
bun tsx src/lib/db/seed-badges.ts  # seed feats
bun run dev
```

OpenCauldron will be available at `http://localhost:3000`.

### Option 3: Docker

```bash
git clone https://github.com/opencauldron/opencauldron
cd opencauldron
cp .env.example .env.local    # edit with your keys
docker compose up
```

## Prerequisites

Both the CLI wizard and manual setup require:

- Node.js 20+ or [Bun](https://bun.sh) 1.0+
- [Docker](https://docker.com) (for local Postgres) or a [Neon](https://neon.tech) database
- A Google Cloud project for OAuth ([setup guide](/docs/api-keys/))
- At least one AI model API key

## Next steps

- [CLI Wizard](/docs/cli/) — Detailed guide for the interactive setup wizard
- [Configuration](/docs/configuration/) — All environment variables and options
- [API Keys](/docs/api-keys/) — How to get keys for each AI provider
