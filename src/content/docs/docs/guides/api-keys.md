---
title: API Keys
description: Get API keys for every supported AI provider and configure them in OpenCauldron.
---

OpenCauldron connects directly to AI provider APIs using keys you supply. You only need keys for the providers you want to use — models without a configured key are automatically hidden from the interface.

## Quick start

If you just want to get generating as fast as possible, pick one provider and add its key:

- **Easiest to get started:** [Google AI Studio](https://aistudio.google.com/apikey) — free tier available, unlocks Imagen 4 and Veo 3
- **Best image quality per dollar:** [Black Forest Labs](https://api.bfl.ml/) — Flux models, pay-as-you-go
- **Best for text in images:** [Ideogram](https://ideogram.ai/manage-api) — no free tier but straightforward signup

Add the key to your `.env` file, restart the server, and the model cards appear.

---

## Configuring your .env file

Copy `.env.example` to `.env` at the project root:

```bash
cp .env.example .env
```

All AI provider keys live in the `AI MODELS` section of that file. Each key is commented out by default — uncomment the ones you want and fill in the values:

```bash
# Google Gemini (Imagen 4, Flash, Lite + Veo 3 video)
GEMINI_API_KEY=""

# xAI (Grok Imagine, Grok Pro)
XAI_API_KEY=""

# Black Forest Labs (Flux Pro, Flux Dev)
BFL_API_KEY=""

# Ideogram (text-in-image specialist)
IDEOGRAM_API_KEY=""

# Recraft (design & vector art)
RECRAFT_API_KEY=""

# Runway (Gen-4 Turbo video)
RUNWAY_API_KEY=""

# FAL.ai (Kling video)
FAL_KEY=""

# MiniMax (Hailuo video)
MINIMAX_API_KEY=""

# Luma AI (Ray-2 video)
LUMA_API_KEY=""

# Mistral (prompt enhancement)
MISTRAL_API_KEY=""
```

You do not need all of them. Add only the keys for providers you plan to use.

---

## Providers

### Google — `GEMINI_API_KEY`

**Get your key:** [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

Google AI Studio offers a free tier with rate limits. Paid usage is billed through Google Cloud.

**Models unlocked:**

| Model | Type | Cost |
|-------|------|------|
| Imagen 4 | Image | $0.04/img |
| Imagen 4 Ultra | Image | $0.08/img |
| Imagen 4 Fast | Image | $0.02/img |
| Gemini Flash | Image | $0.002/img |
| Gemini Flash Lite | Image | $0.001/img |
| Veo 3 | Video | $0.15/s |
| Veo 3.1 | Video | $0.15/s |
| Veo 3 Fast | Video | $0.08/s |

A single `GEMINI_API_KEY` unlocks all Google image and video models.

---

### xAI — `XAI_API_KEY`

**Get your key:** [console.x.ai](https://console.x.ai)

Pay-as-you-go pricing. Create an account, add a payment method, and generate a key from the API console.

**Models unlocked:**

| Model | Type | Cost |
|-------|------|------|
| Grok Imagine | Image | $0.02/img |
| Grok Imagine Pro | Image | $0.07/img |

---

### Black Forest Labs — `BFL_API_KEY`

**Get your key:** [api.bfl.ml](https://api.bfl.ml)

Create a BFL account and purchase credits. Keys are generated in the API section of your dashboard.

**Models unlocked:**

| Model | Type | Cost |
|-------|------|------|
| Flux 1.1 Pro | Image | $0.04/img |
| Flux Dev | Image | $0.025/img |
| Flux Kontext Pro | Image | $0.04/img |
| Flux 2 Klein | Image | $0.015/img |

---

### Ideogram — `IDEOGRAM_API_KEY`

**Get your key:** [ideogram.ai/manage-api](https://ideogram.ai/manage-api)

Ideogram requires a paid plan to access the API. Navigate to API settings in your Ideogram account.

**Models unlocked:**

| Model | Type | Cost |
|-------|------|------|
| Ideogram 3 | Image | $0.06/img |

Ideogram 3 is the strongest model for rendering readable text inside images and supports 14 artistic styles.

---

### Recraft — `RECRAFT_API_KEY`

**Get your key:** [www.recraft.ai/profile/api](https://www.recraft.ai/profile/api)

Recraft uses a credit system. Purchase credits and generate your API key from your profile settings.

**Models unlocked:**

| Model | Type | Cost |
|-------|------|------|
| Recraft V3 | Image | $0.04/img |
| Recraft 20B | Image | $0.02/img |
| Recraft V4 | Image | $0.04/img |
| Recraft V4 Pro | Image | $0.08/img |

Recraft models excel at design work, vector art, icons, and brand-safe imagery.

---

### Runway — `RUNWAY_API_KEY`

**Get your key:** [app.runwayml.com/settings/api-keys](https://app.runwayml.com/settings/api-keys)

Runway requires a paid plan. API keys are available in your account settings under API Keys.

**Models unlocked:**

| Model | Type | Cost |
|-------|------|------|
| Runway Gen-4 Turbo | Video | $0.05/s |
| Runway Gen-4.5 | Video | $0.10/s |

---

### fal.ai — `FAL_KEY`

**Get your key:** [fal.ai/dashboard/keys](https://fal.ai/dashboard/keys)

Note the variable name is `FAL_KEY` (not `FAL_API_KEY`). Create a fal.ai account, add billing, and generate a key from the dashboard.

**Models unlocked:**

| Model | Type | Cost |
|-------|------|------|
| Kling 2.1 | Video | $0.075/s |
| Kling 2.1 Pro | Video | $0.15/s |

---

### MiniMax — `MINIMAX_API_KEY`

**Get your key:** [platform.minimaxi.com/user-center/basic-information/interface-key](https://platform.minimaxi.com/user-center/basic-information/interface-key)

MiniMax uses a pay-as-you-go model. Sign up, add credits, and find your API key in the user center under Interface Key.

**Models unlocked:**

| Model | Type | Cost |
|-------|------|------|
| Hailuo 2.3 | Video | $0.045/s |
| Hailuo 2.3 Fast | Video | $0.03/s |

Hailuo models include native audio generation in the video output.

---

### Luma — `LUMA_API_KEY`

**Get your key:** [lumalabs.ai/dream-machine/api/keys](https://lumalabs.ai/dream-machine/api/keys)

Luma offers a Dream Machine API with pay-as-you-go pricing. Generate your key from the API keys section of your account.

**Models unlocked:**

| Model | Type | Cost |
|-------|------|------|
| Ray 2 | Video | $0.07/s |
| Ray Flash 2 | Video | $0.025/s |

Ray models support camera motion controls (pan, zoom, orbit) and can produce clips up to 60 seconds long.

---

### Mistral — `MISTRAL_API_KEY`

**Get your key:** [console.mistral.ai/api-keys](https://console.mistral.ai/api-keys)

Mistral is used exclusively for the **prompt enhancement** feature — it rewrites rough prompts into detailed, model-optimized versions before sending them to the generation API. It does not unlock any image or video models.

This key is optional. Without it, the AI prompt enhance button is unavailable, but the template-based prompt builder still works.

---

## How model visibility works

OpenCauldron checks for each provider's environment variable at startup. If a key is missing or empty, every model from that provider is hidden from the interface. No error is shown — the models simply do not appear.

This means you can safely deploy with only the keys you have. Add more keys later and the corresponding models appear automatically on the next restart.

The relevant logic is in `src/providers/registry.ts` if you want to inspect it directly.

---

## Security best practices

**Never commit API keys to git.** The `.gitignore` in this repo already excludes `.env`, but double-check before pushing:

```bash
git status  # .env should not appear here
```

If you accidentally commit a key, rotate it immediately at the provider's console.

**Use environment variables in deployment platforms instead of .env files in production.**

For Vercel, add keys in the project's Environment Variables settings. For Docker, pass them at runtime:

```bash
docker run -p 3000:3000 \
  -e GEMINI_API_KEY="your-key" \
  -e BFL_API_KEY="your-key" \
  ghcr.io/opencauldron/opencauldron:latest
```

For docker-compose, use an env file or set variables inline in your `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - BFL_API_KEY=${BFL_API_KEY}
```

**Limit key permissions where possible.** Some providers (Runway, fal.ai) let you create keys scoped to specific operations. Use the most restrictive scope that works.

**Monitor usage.** Each provider's console shows API usage and spend. OpenCauldron also tracks per-user costs in its own database — check the usage dashboard regularly to catch unexpected charges.

---

## Related

- [Configuration](/docs/configuration) — Database, storage, and auth setup
- [Working with Models](/docs/guides/models) — Full model capabilities, parameters, and cost comparison
- [Generation Parameters](/docs/guides/parameters) — What each model parameter does
