---
title: Working with Models
description: All supported image and video generation models, their strengths, costs, and capabilities.
---

OpenCauldron supports 27 models across 9 providers through a unified interface. Each model has different strengths — choose the right one for each job.

## Selecting a model

Models are organized as cards in the generation interface. Some models have **variants** — shown as a segmented control on the card — that share the same provider but differ in speed, quality, or cost.

Each model card shows:
- Cost per generation (per image or per second of video)
- Average generation time
- Supported features (audio, camera control, etc.)

## Image models

### Google (Imagen / Gemini)

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Imagen 4** | $0.04/img | ~8s | Photorealistic, high-quality output |
| **Imagen 4 Ultra** | $0.08/img | ~12s | Maximum quality, 2K resolution |
| **Imagen 4 Fast** | $0.02/img | ~4s | Rapid iteration with good quality |
| **Gemini Flash** | $0.002/img | ~3s | Fast and cheap, great for testing |
| **Gemini Flash Lite** | $0.001/img | ~2s | Cheapest option, rapid prototyping |

Key capabilities: negative prompt, seed, resolution (1K/2K or up to 4K on Gemini), person generation controls, watermark toggle, provider prompt enhance, output format.

Gemini Flash models support more aspect ratios (10 options) than Imagen 4 (5 options).

**API key:** `GEMINI_API_KEY`

### Black Forest Labs (Flux)

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Flux 1.1 Pro** | $0.04/img | ~6s | General purpose, high quality |
| **Flux Dev** | $0.025/img | ~8s | Iteration with guidance/steps control |
| **Flux Kontext Pro** | $0.04/img | ~8s | Image editing, character consistency, text rendering |
| **Flux 2 Klein** | $0.015/img | ~2s | Budget drafts, sub-second inference |

Key capabilities: seed, output format, prompt upsampling. Flux Dev adds guidance and steps sliders for fine control over the diffusion process.

**API key:** `BFL_API_KEY`

### Ideogram

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Ideogram 3** | $0.06/img | ~10s | Text rendering in images, wide style range |

Key capabilities: 14 artistic styles, negative prompt, seed, rendering speed (Turbo/Default/Quality), batch generation (up to 8). Supports the most aspect ratios (11 options) of any image model.

**API key:** `IDEOGRAM_API_KEY`

### Recraft

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Recraft V3** | $0.04/img | ~8s | Design and illustration |
| **Recraft 20B** | $0.02/img | ~5s | Budget design work |
| **Recraft V4** | $0.04/img | ~8s | Improved quality, 10K char prompts |
| **Recraft V4 Pro** | $0.08/img | ~10s | Premium, 4MP print-ready output |

Key capabilities: 12 styles (realistic, vector, icon, digital illustration, and sub-styles), negative prompt, CFG scale, batch generation (up to 6).

**API key:** `RECRAFT_API_KEY`

### xAI (Grok)

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Grok Imagine** | $0.02/img | ~5s | Fast, creative generation |
| **Grok Imagine Pro** | $0.07/img | ~8s | Highest quality, up to 2K |

Key capabilities: resolution (1K/2K), batch generation (up to 10). Note: does not support negative prompts.

**API key:** `XAI_API_KEY`

---

## Video models

### Google (Veo)

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Veo 3** | $0.15/s | ~120s | Native audio, high quality |
| **Veo 3.1** | $0.15/s | ~120s | 4K support, video extension up to 148s |
| **Veo 3 Fast** | $0.08/s | ~60s | Same quality, lower latency |

Key capabilities: native audio generation, image-to-video, resolution (720p/1080p/4K), negative prompt, seed, person generation controls. Durations: 5–8s.

**API key:** `GEMINI_API_KEY`

### Runway

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Gen-4 Turbo** | $0.05/s | ~30s | Cinematic video, fast turnaround |
| **Gen-4.5** | $0.10/s | ~45s | Flagship text + image to video |

Key capabilities: image-to-video, seed, resolution (720p/1080p). Durations: 5s or 10s.

**API key:** `RUNWAY_API_KEY`

### Kling (via fal.ai)

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Kling 2.1** | $0.075/s | ~90s | Top-tier motion quality |
| **Kling 2.1 Pro** | $0.15/s | ~90s | Higher quality, motion brush |

Key capabilities: negative prompt, CFG scale, image-to-video, resolution (720p/1080p). Durations: 5s or 10s.

**API key:** `FAL_KEY`

### Hailuo (MiniMax)

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Hailuo 2.3** | $0.045/s | ~60s | Best cost/quality ratio, native audio |
| **Hailuo 2.3 Fast** | $0.03/s | ~30s | Faster iteration, cheaper |

Key capabilities: native audio, image-to-video, prompt optimizer, resolution (720p/1080p). Durations: 6s or 10s.

**API key:** `MINIMAX_API_KEY`

### Luma (Ray)

| Variant | Cost | Speed | Best for |
|---------|------|-------|----------|
| **Ray 2** | $0.07/s | ~60s | Camera controls, extendable to 60s |
| **Ray Flash 2** | $0.025/s | ~20s | 3x faster, up to 15s duration |

Key capabilities: camera motion controls (pan, zoom, orbit), loop video, image-to-video, resolution (540p–4K), most aspect ratio options of any video model (7 options). Durations: 5–10s.

**API key:** `LUMA_API_KEY`

---

## Cost comparison

### Image models (per image)

| Model | Cost |
|-------|------|
| Gemini Flash Lite | $0.001 |
| Gemini Flash | $0.002 |
| Flux 2 Klein | $0.015 |
| Recraft 20B | $0.02 |
| Grok Imagine | $0.02 |
| Imagen 4 Fast | $0.02 |
| Flux Dev | $0.025 |
| Flux 1.1 Pro | $0.04 |
| Flux Kontext Pro | $0.04 |
| Imagen 4 | $0.04 |
| Recraft V3 / V4 | $0.04 |
| Ideogram 3 | $0.06 |
| Grok Imagine Pro | $0.07 |
| Imagen 4 Ultra | $0.08 |
| Recraft V4 Pro | $0.08 |

### Video models (per second)

| Model | Cost |
|-------|------|
| Ray Flash 2 | $0.025 |
| Hailuo 2.3 Fast | $0.03 |
| Hailuo 2.3 | $0.045 |
| Runway Gen-4 Turbo | $0.05 |
| Ray 2 | $0.07 |
| Kling 2.1 | $0.075 |
| Veo 3 Fast | $0.08 |
| Runway Gen-4.5 | $0.10 |
| Kling 2.1 Pro | $0.15 |
| Veo 3 / 3.1 | $0.15 |

---

## Configuring providers

Each provider requires its own API key set as an environment variable. Only models with configured keys appear in the interface. See the [Configuration](/docs/configuration) guide for details on setting environment variables.

For details on what each parameter does, see the [Generation Parameters](/docs/guides/parameters) reference.
