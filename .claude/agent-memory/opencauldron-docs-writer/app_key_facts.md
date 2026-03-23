---
name: OpenCauldron main app key facts for documentation
description: Tech stack, scripts, provider system, database, storage, and auth details that underpin accurate docs
type: project
---

## Tech stack
- Next.js 16.2.1, React 19, TypeScript
- Drizzle ORM + PostgreSQL (auto-detects Neon vs standard pg)
- NextAuth.js v5 beta with Google OAuth
- Tailwind CSS v4
- Bun as package manager and runtime
- shadcn/ui components, lucide-react icons

## Scripts (package.json)
- `bun run dev` — Next.js dev server
- `bun run build` — production build
- `bun run lint` — ESLint
- `bun run db:push` — schema push (dev only)
- `bun run db:migrate` — versioned migrations (production)
- `bun run db:studio` — Drizzle Studio browser UI

## Provider system
- Interface: `GenerationProvider` in `src/types/index.ts`
- Registry: `src/providers/registry.ts`
- Each provider file: `src/providers/<name>.ts`
- Providers hidden (not errored) when their API key env var is missing
- Variant groups for multi-variant model cards: `VARIANT_GROUPS` and `VARIANT_ONLY_IDS` in registry

## Supported AI providers (as of March 2026)
Image: Google Gemini (GEMINI_API_KEY), xAI Grok (XAI_API_KEY), BFL Flux (BFL_API_KEY), Ideogram (IDEOGRAM_API_KEY), Recraft (RECRAFT_API_KEY)
Video: Veo 3 (shares GEMINI_API_KEY), Runway (RUNWAY_API_KEY), Kling/fal.ai (FAL_KEY), MiniMax Hailuo (MINIMAX_API_KEY), Luma Ray (LUMA_API_KEY)
Tools: Mistral prompt enhancement (MISTRAL_API_KEY)

## Database
- PostgreSQL only
- Neon serverless driver auto-selected when URL contains `neon.tech` or `neon.db`
- Seed script: `bun tsx src/lib/db/seed-badges.ts` (populates badges table)
- `db:push` for local dev, `db:migrate` for production

## Storage
- `STORAGE_PROVIDER="local"` (default for dev, saves to `uploads/`)
- `STORAGE_PROVIDER="r2"` (Cloudflare R2, required for production and image-to-video)
- Local storage cannot serve public URLs needed by video AI APIs

## Auth
- Google OAuth only
- Optional domain restriction: `ALLOWED_EMAIL_DOMAIN`
- Roles: `member` (default) and `admin`

## Docker
- `docker compose up db -d` — local Postgres only
- `docker compose up` — full stack (app + db)
- Image: `ghcr.io/opencauldron/opencauldron:latest`
- DB service name is `db` (use in DATABASE_URL host)
