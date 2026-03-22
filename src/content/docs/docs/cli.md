---
title: CLI Wizard
description: Scaffold a new OpenCauldron studio with a single command using create-opencauldron.
---

`create-opencauldron` is a command-line wizard that scaffolds a fully configured OpenCauldron project. It clones the repo, walks you through database, storage, and AI provider setup, generates your `.env.local`, installs dependencies, and initializes a git repository — all in one step.

## Usage

Run with npx (no install required):

```bash
npx create-opencauldron@latest
```

To specify a project directory up front:

```bash
npx create-opencauldron@latest my-studio
```

The directory name is derived from your studio name — spaces become hyphens and special characters are stripped. If the target directory already exists and is not empty, the CLI will exit with an error.

## Non-interactive mode

Pass `--skip` to bypass all prompts and use defaults:

```bash
npx create-opencauldron@latest my-studio --skip
```

In skip mode the wizard uses:

- **Database** — Local Postgres (Docker)
- **Storage** — Local filesystem
- **AI providers** — None (add keys to `.env.local` later)

This is useful for CI environments or when you want to configure everything manually after scaffolding.

---

## Wizard steps

### 1. Studio name

```
◆  What's your studio name?
│  my-studio
```

The name you enter is used in two ways:

- **Directory name** — lowercased and slugified (e.g. `My Studio` becomes `my-studio`)
- **Branding** — saved as `NEXT_PUBLIC_ORG_NAME` in your `.env.local` so the UI displays your studio name

If you provided a directory as a positional argument (`npx create-opencauldron@latest my-studio`), it is used as the default value.

### 2. Database

```
◆  Database
│  ● Local Postgres  (docker compose up db -d)
│  ○ Neon            (serverless Postgres)
```

Choose between a local Docker-based Postgres instance or a [Neon](https://neon.tech) serverless database.

- **Local Postgres** — Uses the default connection string `postgresql://cauldron:cauldron@localhost:5432/cauldron`, matching the included `docker-compose.yml`.
- **Neon** — Prompts for your Neon connection string (must include `neon.tech` in the URL).

### 3. Storage

```
◆  Storage
│  ● Local filesystem  (saves to ./uploads/)
│  ○ Cloudflare R2     (production storage)
```

- **Local filesystem** — Generated media is saved to the `uploads/` directory. Good for development.
- **Cloudflare R2** — Prompts for your R2 Account ID, Access Key ID, Secret Access Key, and Bucket Name. Required for image-to-video workflows where AI providers need a publicly accessible URL.

### 4. AI model providers

The wizard displays all available providers grouped by type, then presents a multi-select:

**Image Models**
| Provider | Key | Models |
|---|---|---|
| Google Gemini | `GEMINI_API_KEY` | Imagen 4, Flash, Flash Lite |
| xAI Grok | `XAI_API_KEY` | Grok Imagine, Grok Pro |
| Black Forest Labs | `BFL_API_KEY` | Flux Pro 1.1, Flux Dev |
| Ideogram | `IDEOGRAM_API_KEY` | Ideogram 3 |
| Recraft | `RECRAFT_API_KEY` | Recraft V3, Recraft 20B |

**Video Models**
| Provider | Key | Models |
|---|---|---|
| Google Veo 3 | `GEMINI_API_KEY` | (shares Gemini key) |
| Runway | `RUNWAY_API_KEY` | Gen-4 Turbo |
| Kling (fal.ai) | `FAL_KEY` | Kling 2.1 |
| MiniMax | `MINIMAX_API_KEY` | Hailuo 2.3 |
| Luma AI | `LUMA_API_KEY` | Ray 2 |

**Tools**
| Provider | Key | Purpose |
|---|---|---|
| Mistral | `MISTRAL_API_KEY` | Prompt enhancement |

Select the providers you want to use with <kbd>Space</kbd>, then press <kbd>Enter</kbd>. The wizard will prompt for each selected API key (entered as a password field). You can skip this step entirely and add keys to `.env.local` later.

:::note
Google Veo 3 shares the same `GEMINI_API_KEY` as the Gemini image models — selecting Gemini automatically enables Veo 3.
:::

---

## What happens after the wizard

Once you finish the prompts, the CLI performs four steps automatically:

1. **Clone** — Shallow-clones the OpenCauldron repository into your project directory and removes the `.git` history.
2. **Configure** — Generates `.env.local` from `.env.example` with your choices filled in. A random `NEXTAUTH_SECRET` is generated automatically.
3. **Install dependencies** — Detects your package manager (Bun, pnpm, Yarn, or npm) and runs install.
4. **Initialize git** — Runs `git init`, stages all files, and creates an initial commit.

After completion, the CLI prints a summary of your configuration and the commands to run next.

---

## Next steps after scaffolding

The CLI prints these for you, but for reference:

```bash
cd my-studio
docker compose up db -d    # start local Postgres (skip if using Neon)
bun run db:push            # create database tables
bun run dev                # start dev server
```

Open [http://localhost:3000](http://localhost:3000) to access your studio.

If you skipped the AI provider step, add API keys to `.env.local` before generating. See the [API Keys guide](/docs/guides/api-keys/) for instructions on obtaining each key.

---

## Related

- [Installation](/docs/installation/) — Manual setup walkthrough
- [Configuration](/docs/configuration/) — Full environment variable reference
- [API Keys](/docs/guides/api-keys/) — Get keys for every AI provider
