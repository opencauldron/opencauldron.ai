---
title: Database
description: How OpenCauldron connects to PostgreSQL via Drizzle ORM, the full schema, migration workflow, and compatible providers.
---

OpenCauldron uses PostgreSQL as its only supported database, accessed through [Drizzle ORM](https://orm.drizzle.team). Any standard PostgreSQL-compatible database works — you bring your own and set `DATABASE_URL`.

## Prerequisites

- A running PostgreSQL instance (version 14 or later recommended)
- `DATABASE_URL` set in your `.env` file

---

## Setting DATABASE_URL

Copy `.env.example` to `.env` and set the connection string:

```bash
DATABASE_URL="postgresql://cauldron:cauldron@localhost:5432/cauldron"
```

The format is standard `postgresql://user:password@host:port/database`. The app reads this variable at startup — if it is missing, the process will exit with an error.

---

## Neon vs standard Postgres auto-detection

The database client is selected automatically based on your `DATABASE_URL`. You do not configure this manually.

```
src/lib/db/index.ts
```

If the URL contains `neon.tech` or `neon.db`, the app uses the [Neon serverless driver](https://neon.tech/docs/serverless/serverless-driver) (`@neondatabase/serverless` + `drizzle-orm/neon-http`). For every other URL it falls back to the standard `pg` pool (`pg` + `drizzle-orm/node-postgres`).

| URL contains | Driver used | Best for |
|---|---|---|
| `neon.tech` or `neon.db` | Neon serverless (HTTP) | Vercel edge/serverless functions |
| Anything else | `pg` Pool | Traditional servers, Docker, Supabase, RDS, Railway |

This matters for deployment. Neon's HTTP driver works in edge runtimes that prohibit persistent TCP connections. The `pg` pool requires a long-lived process and a real TCP socket, which is exactly what you have with Docker or a VPS.

> **Vercel deployments:** Use Neon. Its connection string contains `neon.tech`, so the correct driver is picked up automatically.

> **Docker or self-hosted deployments:** Use any standard connection string. The `pg` pool is used and will maintain a connection pool for you.

---

## Compatible PostgreSQL providers

Any provider that speaks standard PostgreSQL works. Tested and known-good options:

| Provider | Notes |
|---|---|
| **Neon** | Recommended for Vercel. Free tier available. Serverless driver selected automatically. |
| **Supabase** | Standard Postgres connection string. Use the "direct connection" URL, not the pooler, for migrations. |
| **AWS RDS** | Standard connection string. Ensure security groups allow outbound from your app host. |
| **Railway** | Provides a `DATABASE_URL` environment variable out of the box — paste it directly. |
| **Docker** | The included `docker-compose.yml` runs Postgres 16 locally. Default URL is `postgresql://cauldron:cauldron@localhost:5432/cauldron`. |
| **Any standard Postgres** | If it accepts a `postgresql://` connection string, it works. |

---

## Schema

The schema is defined in `src/lib/db/schema.ts`. There are four logical groups of tables.

### Auth tables

These are required by [NextAuth.js](https://authjs.dev) via the Drizzle adapter.

| Table | Purpose |
|---|---|
| `users` | Registered accounts. Stores email, name, avatar, role (`admin` or `member`), daily generation limit, and video access flag. |
| `accounts` | OAuth provider link records. One user can have multiple connected accounts (e.g., Google). |
| `sessions` | Active session tokens with expiry timestamps. |
| `verification_tokens` | Short-lived tokens used for email verification flows. |

### Content tables

| Table | Purpose |
|---|---|
| `brands` | Named brand workspaces with a display color. Used to organize assets by project or client. |
| `assets` | Every generated image or video. Stores the prompt, model, provider, storage keys, dimensions, file size, cost estimate, and for videos the duration and audio flag. |
| `asset_brands` | Junction table linking assets to brands (many-to-many). |
| `asset_tags` | Freeform text tags applied to assets. Indexed for fast tag-based search. |

### Generation tracking

| Table | Purpose |
|---|---|
| `generations` | Audit log of every generation attempt. Tracks status (`pending`, `processing`, `completed`, `failed`), the provider job ID for async polling, cost estimate, XP earned, and duration. A row is created when generation starts; the `asset_id` is populated on success. |

### Gamification tables

| Table | Purpose |
|---|---|
| `user_xp` | Running XP total and current level for each user. One row per user. |
| `xp_transactions` | Ledger of every XP event: `generation`, `badge_reward`, or `admin_grant`. Linked to the generation that triggered it where applicable. |
| `badges` | Badge definitions — id, name, description, Lucide icon name, category, XP reward, and display order. Populated by the seed script. |
| `user_badges` | Records which users have earned which badges, with timestamps. |

See [XP, Levels, and Feats](/docs/guides/xp-and-feats) for details on how the gamification system works in practice.

---

## Migration workflow

Drizzle Kit manages schema migrations. The config lives in `drizzle.config.ts` and reads `DATABASE_URL` from `.env.local`.

### Development: push

During active development, `db:push` introspects your schema and applies changes directly without generating migration files. It is fast and convenient for iterating on schema changes locally.

```bash
bun run db:push
```

> Use `db:push` for local development only. It does not create migration files and is not safe to run against a production database.

### Production: migrate

For production deployments, generate and apply versioned migration files. Migration files are stored in `drizzle/` and should be committed to version control.

```bash
bun run db:migrate
```

This applies any pending migrations in `drizzle/` in order. It is idempotent — already-applied migrations are skipped.

### Visual browser: studio

Drizzle Studio opens a browser-based UI for inspecting and editing your database.

```bash
bun run db:studio
```

Studio connects to the database specified by `DATABASE_URL` in `.env.local` and opens at `https://local.drizzle.studio`.

---

## Seeding badges

After your first migration, run the badge seed script to populate the `badges` table. The app will not award feats until these rows exist.

```bash
bunx tsx src/lib/db/seed-badges.ts
```

The script is safe to run multiple times — it uses `INSERT ... ON CONFLICT DO UPDATE`, so it updates existing records and adds any new ones. It also removes any legacy badge IDs that are no longer in the current definition list.

The following badges are seeded:

| Category | Badge | Condition |
|---|---|---|
| Milestone | First Brew | First generation |
| Milestone | Centaur | 100 generations |
| Milestone | Hydra | 1,000 generations |
| Streak | Kindling | 7-day streak |
| Streak | Inferno | 30-day streak |
| Model | Ranger | 5+ different image models used |
| Quality | Sigil | 50+ assets tagged with brands |
| Video | Illusionist | First video generation |
| Video | Conjurer | 50 video generations |
| Special | Early Adopter | Joined in the first month |
| Special | Admin | Team administrator |
| Special | Founder | Instance creator and owner |

---

## First-time setup checklist

1. Set `DATABASE_URL` in your `.env` file.
2. Run `bun run db:migrate` (production) or `bun run db:push` (development).
3. Run `bunx tsx src/lib/db/seed-badges.ts` to populate badge definitions.
4. Start the app — `bun run dev` or `bun run start`.

---

## Related

- [Installation](/docs/installation) — Full setup instructions including Docker
- [Configuration](/docs/configuration) — All environment variables
- [XP, Levels, and Feats](/docs/guides/xp-and-feats) — How the gamification system uses these tables
- [Brands](/docs/guides/brands) — How the brands and asset organization tables are used
