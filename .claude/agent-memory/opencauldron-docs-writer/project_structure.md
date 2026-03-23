---
name: OpenCauldron project structure and repo map
description: The three repos, their roles, local paths, and what source of truth each one is for documentation
type: project
---

OpenCauldron has three public repos:

1. **Main app** — `opencauldron/opencauldron` (Next.js 16, React 19, Drizzle ORM, NextAuth)
   - Local path: `/Users/adam/code/opencauldron` (this path only has package.json + node_modules — main app source is not fully cloned here; treat GitHub as source of truth for source files)
   - Scripts: `bun run dev`, `bun run build`, `bun run lint`, `bun run db:push`, `bun run db:migrate`, `bun run db:studio`
   - Provider system in `src/providers/`, types in `src/types/index.ts`, registry in `src/providers/registry.ts`

2. **Docs/marketing site** — `opencauldron/opencauldron-website` (Astro 6 + Starlight)
   - Local path: `/Users/adam/code/cauldron-website` (this is the working directory)
   - Scripts: `bun run dev` (port 4321), `bun run build`, `bun run preview`
   - Docs content: `src/content/docs/docs/`
   - Sidebar config: `astro.config.mjs`

3. **CLI tool** — `opencauldron/create-opencauldron` (Node.js CLI, published as `create-opencauldron` on npm)
   - Local path: `/Users/adam/code/opencauldron` appears to be this repo (only package.json + node_modules, no src/)
   - Entry point: `index.js` at repo root
   - Run locally: `node index.js`

**Why:** Tracking this avoids confusion between the three repos when writing docs.
**How to apply:** Always check which repo a doc is about before asserting file paths or commands.
