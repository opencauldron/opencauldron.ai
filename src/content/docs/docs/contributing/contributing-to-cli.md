---
title: Contributing to the CLI
description: How to set up and develop the create-opencauldron scaffolding wizard.
---

The `create-opencauldron` CLI is a standalone package that scaffolds new OpenCauldron projects. It lives in a separate repository from the main app.

**Repository:** [opencauldron/create-opencauldron](https://github.com/opencauldron/create-opencauldron)

**npm:** [`create-opencauldron`](https://www.npmjs.com/package/create-opencauldron)

---

## What the CLI does

Running `npx create-opencauldron@latest` walks a user through an interactive setup wizard that:

1. Prompts for a studio name, database provider, storage backend, and AI model API keys
2. Shallow-clones the main `opencauldron/opencauldron` repository
3. Generates a configured `.env.local` from `.env.example` using the user's input
4. Installs dependencies using the detected package manager (Bun, pnpm, Yarn, or npm)
5. Initializes a git repository with an initial commit

See the [CLI Wizard guide](/docs/cli) for the full user-facing documentation.

---

## Prerequisites

- Node.js 20+ or Bun 1.0+
- Git

---

## 1. Fork and clone

Fork [opencauldron/create-opencauldron](https://github.com/opencauldron/create-opencauldron) on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/create-opencauldron
cd create-opencauldron
```

---

## 2. Install dependencies

```bash
bun install
```

---

## 3. Run the CLI locally

To test the wizard locally without publishing to npm:

```bash
node index.js
```

Or run it in a specific target directory:

```bash
node index.js my-test-studio
```

To test non-interactive mode:

```bash
node index.js my-test-studio --skip
```

:::tip
Use a temporary directory outside the repo for test runs to avoid cluttering the working tree. The CLI will clone the main app repo into whatever directory you specify.
:::

---

## CLI structure

The CLI is intentionally small. The entry point is `index.js` at the repo root.

Key areas to understand when making changes:

- **Prompts** — Built with the [`prompts`](https://github.com/terkelg/prompts) package. Each wizard step is a prompt object in the main flow. The provider selection step is a multi-select built from a static list of providers.
- **Provider list** — The list of AI providers shown in the wizard (with their env var names and model descriptions) is defined inline near the top of the file. When a new provider is added to the main app, it should be added here too.
- **Env file generation** — The CLI reads `.env.example` from the cloned repo and replaces placeholder values with the user's input. The replacement logic looks for specific commented-out lines matching each env var name.
- **Package manager detection** — The CLI detects which package manager is available by checking for lockfiles and running `which` checks in order: Bun, pnpm, Yarn, npm.

---

## Common contribution types

### Adding a new provider to the wizard

When a new AI provider is added to the main app (via `src/providers/` and `.env.example`), the CLI wizard should be updated to include it in the provider selection step.

Find the provider list array in `index.js`. Each entry looks like this:

```js
{
  title: 'Google Gemini',
  description: 'Imagen 4, Flash, Flash Lite + Veo 3 video',
  value: 'GEMINI_API_KEY',
  type: 'image+video',
}
```

Add a new entry following the same shape. The `value` field must match the env var name exactly as it appears in `.env.example`.

### Fixing a wizard step

Each wizard step is a `prompts` configuration object. Refer to the [prompts documentation](https://github.com/terkelg/prompts#-types) for available field types and validation options.

### Improving non-interactive mode

The `--skip` flag bypasses all prompts and uses hardcoded defaults. If you change the defaults or add new prompts, update the skip-mode fallback values to match.

---

## Testing your changes

Before opening a pull request, run a full end-to-end test:

1. Create a clean temporary directory somewhere outside the repo.
2. Run `node /path/to/create-opencauldron/index.js test-studio` from inside that directory.
3. Walk through all wizard steps (or test with `--skip`).
4. Verify the generated `.env.local` contains the expected values.
5. Confirm `bun install` runs without errors in the scaffolded directory.

There are no automated tests. Manual end-to-end verification is required.

---

## Publishing

The CLI package is published to npm as `create-opencauldron`. Maintainers handle releases — contributors do not need to publish.

---

## Related

- [CLI Wizard guide](/docs/cli) — User-facing documentation for create-opencauldron
- [Contributing Overview](/docs/contributing) — Full contribution process
- [Code Style and PR Guidelines](/docs/contributing/code-style) — PR conventions
