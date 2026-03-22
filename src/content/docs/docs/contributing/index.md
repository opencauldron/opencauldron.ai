---
title: Contributing to OpenCauldron
description: An overview of how to contribute to OpenCauldron across its three public repositories.
---

OpenCauldron is an open-source project maintained across three public repositories. Contributions of all kinds are welcome — whether you are fixing a bug, adding a new AI provider, improving documentation, or building CLI features.

This section covers everything you need to get started as a contributor.

---

## The three repos

| Repo | What it is | Where to start |
|------|-----------|----------------|
| [opencauldron/opencauldron](https://github.com/opencauldron/opencauldron) | The main Next.js application | [Development setup](/docs/contributing/development-setup) |
| [opencauldron/opencauldron-website](https://github.com/opencauldron/opencauldron-website) | This docs and marketing site (Astro + Starlight) | [Contributing to docs](/docs/contributing/contributing-to-docs) |
| [opencauldron/create-opencauldron](https://github.com/opencauldron/create-opencauldron) | The `create-opencauldron` CLI scaffolding tool | [Contributing to the CLI](/docs/contributing/contributing-to-cli) |

Each repo has its own setup instructions. Most contributors will spend their time in the main app repo.

---

## Ways to contribute

### Add an AI provider

The most common code contribution is adding support for a new AI image or video model. The provider system is deliberately small — a new provider is a single TypeScript file implementing one interface, plus a registry entry. See [Adding a Provider](/docs/guides/adding-providers) for the full walkthrough.

### Fix a bug or implement a feature

Browse open issues on [GitHub](https://github.com/opencauldron/opencauldron/issues). Issues tagged `good first issue` are a good starting point for new contributors. Comment on an issue before starting work on it — this avoids duplicate effort.

### Improve documentation

If you find a doc that is wrong, incomplete, or hard to follow, the fix belongs in the website repo. See [Contributing to Docs](/docs/contributing/contributing-to-docs) for how the site is structured and how to preview changes locally.

### Improve the CLI

The `create-opencauldron` scaffolding wizard is a separate package. If you want to add a new provider prompt, fix a wizard step, or improve the non-interactive mode, see [Contributing to the CLI](/docs/contributing/contributing-to-cli).

### Report a bug or request a feature

See [Issues and Feature Requests](/docs/contributing/issues-and-requests) for how to write a useful bug report and how feature requests are evaluated.

---

## General process

1. **Find or open an issue** — All work should be linked to a GitHub issue. This ensures intent is clear before code is written.
2. **Fork and branch** — Fork the relevant repo and create a branch from `main`. Use descriptive branch names: `fix/video-polling-timeout`, `feat/add-stability-provider`.
3. **Make your changes** — Follow the code style and linting rules described in [Code Style and PR Guidelines](/docs/contributing/code-style).
4. **Verify** — Run `bun run lint` and `bun run build` before pushing. Both must pass.
5. **Open a pull request** — Target `main`. Fill in the PR description with what changed and why.

---

## Related

- [Adding a Provider](/docs/guides/adding-providers) — Step-by-step guide for new AI provider integrations
- [Development Setup](/docs/contributing/development-setup) — Get the main app running locally for contribution
- [Code Style and PR Guidelines](/docs/contributing/code-style) — Linting, formatting, and PR conventions
