---
title: Introduction
description: What is OpenCauldron and why you should use it.
---

OpenCauldron is an open-source AI media generation studio. It gives your team one interface for every AI media model — with brand management, prompt tools, cost tracking, and team collaboration built in.

## Why OpenCauldron?

- **Multi-model** — Flux Pro, Imagen 4, Ideogram 3, Recraft V3, and more from a single interface
- **Self-hostable** — Deploy on your infrastructure. Your data stays yours
- **Bring your own everything** — Swap in your own API keys, database, storage, and auth provider. Ships with sensible defaults; nothing is locked in
- **Team-ready** — Shared galleries, per-user usage tracking, and brand-scoped generation
- **Cost-aware** — Track API spend per user, model, and brand in real time

## How it works

OpenCauldron is a Next.js application that connects to AI media generation APIs on your behalf. You bring your own API keys, database, storage, and auth — deploy the app, and your team generates through a unified interface. It ships with sensible defaults (Neon for database, Cloudflare R2 for storage, Google OAuth for auth), but every layer is swappable.

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Your Team  │────▶│ OpenCauldron │────▶│  AI Model APIs  │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │
                    ┌──────┴──────┐
                    │  Your DB &  │
                    │  Storage    │
                    └─────────────┘
```

## Next steps

- [Installation](/docs/installation/) — Get OpenCauldron running locally or in production
- [Configuration](/docs/configuration/) — Set up API keys, database, and storage
