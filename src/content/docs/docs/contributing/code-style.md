---
title: Code Style and PR Guidelines
description: TypeScript conventions, linting, formatting, and pull request expectations for OpenCauldron contributions.
---

This page covers the conventions used in the OpenCauldron main app repo. Following them keeps the codebase consistent and makes reviews faster.

---

## Language and runtime

- **TypeScript** throughout. No plain `.js` files in `src/`.
- **Bun** is the preferred runtime and package manager. All documented commands use `bun`.
- **React 19** and **Next.js App Router** — avoid patterns from Pages Router.

---

## Linting

The project uses [ESLint](https://eslint.org) with the `eslint-config-next` config. Run it before every commit:

```bash
bun run lint
```

Lint errors block the PR. Warnings are acceptable but should be addressed if straightforward to fix.

Do not disable lint rules inline (`// eslint-disable-next-line`) except in cases where the rule is genuinely wrong for the specific line. If you need to disable a rule widely, discuss it in the issue before doing so.

---

## Formatting

The project uses [Prettier](https://prettier.io) with `prettier-plugin-tailwindcss` for automatic Tailwind class sorting.

Format a file before committing:

```bash
bunx prettier --write src/path/to/your/file.ts
```

Or format the whole `src/` directory:

```bash
bunx prettier --write src/
```

The most important rule: **do not mix formatting changes with functional changes in the same PR.** If you want to reformat a file, do it in a separate commit or PR.

---

## TypeScript conventions

### Use existing types

The shared type definitions live in `src/types/index.ts`. Before defining a new type, check whether an existing one covers your use case. Extending an existing interface is usually better than creating a parallel one.

### Prefer explicit return types on exported functions

For functions exported from a module, annotate the return type explicitly:

```typescript
// Preferred
export function getProviders(): GenerationProvider[] {
  return allProviders.filter(hasApiKey);
}

// Avoid for exported functions
export function getProviders() {
  return allProviders.filter(hasApiKey);
}
```

Internal functions (not exported) can rely on inference.

### Avoid `any`

Do not use `any` unless there is no reasonable alternative. If you are working with a third-party API response that lacks types, use `unknown` and narrow it explicitly.

### Error handling in provider code

Provider `generate()` and `getStatus()` functions should never throw. Catch all errors and return a `GenerationResult` with `status: "failed"` and an `error` string:

```typescript
async generate(params: GenerationParams): Promise<GenerationResult> {
  const startTime = Date.now();
  try {
    // ... call the API ...
  } catch (error) {
    return {
      status: "failed",
      error: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - startTime,
    };
  }
}
```

---

## Component conventions

- Components live in `src/components/`.
- Use the `shadcn/ui` component library for UI primitives where a suitable component exists.
- Prefer `lucide-react` for icons — it is already a dependency and matches the existing icon set.
- Keep components focused. If a component grows past roughly 200 lines, consider splitting it.
- Client components (`"use client"`) should be pushed as deep in the tree as possible. Prefer server components for data fetching.

---

## Environment variables

- New env vars must be added to `.env.example` with a comment explaining what they are for, commented out by default.
- Variable names follow the conventions already in use: `SCREAMING_SNAKE_CASE`, prefixed by provider name where applicable (e.g. `R2_BUCKET_NAME`, `GEMINI_API_KEY`).
- Variables that must be readable in the browser are prefixed `NEXT_PUBLIC_`. Everything else is server-only.

---

## Pull request guidelines

### Scope

Keep PRs focused. A PR that adds a new provider should not also refactor unrelated components. Reviewers can merge focused PRs faster, and focused PRs are easier to revert if something goes wrong.

### Title

Use a short, descriptive title in the imperative mood:

```
Add Stability AI provider
Fix video polling timeout for Runway
Update ModelCapabilities to support audio flag
```

### Description

Every PR should answer three questions:

1. **What changed?** — A brief description of what the code does differently.
2. **Why?** — The motivation or the issue it resolves. Link to the GitHub issue with `Closes #123`.
3. **How to test?** — Steps a reviewer can follow to verify the change works.

For provider additions, the "how to test" should include which env var to set and what to generate to confirm the provider works.

### Passing checks

Before marking a PR ready for review:

```bash
bun run lint     # must pass with no errors
bun run build    # must complete without type errors
```

PRs that fail either check will not be reviewed until they are green.

### Draft PRs

Open a draft PR if you want early feedback on an approach before finishing the implementation. Mark it ready for review when lint and build pass.

---

## Commit messages

No strict convention is enforced, but good commit messages save time in code review and `git log`:

- Start with a short summary line (50 characters or less)
- Use the imperative mood: "Add provider", not "Added provider" or "Adding provider"
- Reference the issue number if relevant: `Add Stability AI provider (#42)`

---

## Related

- [Development Setup](/docs/contributing/development-setup) — Get the app running locally
- [Adding a Provider](/docs/guides/adding-providers) — Full guide for provider contributions
- [Contributing Overview](/docs/contributing) — The overall contribution process
