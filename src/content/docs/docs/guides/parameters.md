---
title: Generation Parameters
description: Reference for all image and video generation parameters.
---

Every model in OpenCauldron supports a different set of parameters. The interface adapts automatically — you'll only see the parameters that apply to your selected model.

## Common parameters

These parameters appear for most or all models.

### Aspect Ratio

The width-to-height ratio of the generated output. Available for all models.

Common ratios and their typical use cases:

| Ratio | Use case |
|-------|----------|
| 1:1 | Social media posts, profile images |
| 16:9 | Landscape, presentations, desktop wallpapers |
| 9:16 | Stories, Reels, TikTok, mobile wallpapers |
| 4:3 | Traditional photo, print |
| 3:4 | Portrait photography, posters |

Some models support additional ratios like 2:1, 3:2, 21:9, and more. The available options update based on your selected model.

### Seed

A number that controls the random generation process. Available on most image models and some video models.

- Leave empty for a random result each time
- Use the **same seed** with the **same prompt and settings** to reproduce an identical result
- Useful for iterating on a composition — change the prompt slightly while keeping the seed fixed

### Output Format

Choose between **PNG** (lossless, larger files) and **JPEG** (compressed, smaller files). Available on Flux, Imagen, and Gemini models.

Use PNG when you need transparency or will edit the image further. Use JPEG for faster downloads and sharing.

---

## Image parameters

### Negative Prompt

Describe what you want to **exclude** from the generated image. The model will actively try to avoid these elements.

**Available on:** Imagen 4, Gemini Flash, Ideogram 3, Recraft, Kling, Veo

Examples:
- `blurry, low quality, watermark` — general quality control
- `text, letters, words` — avoid unwanted text
- `people, faces, hands` — exclude human figures

### Resolution

Controls the output image dimensions. Higher resolution means more detail but slower generation.

| Model | Options |
|-------|---------|
| Imagen 4 | 1K, 2K |
| Gemini Flash / Lite | 512, 1K, 2K, 4K |
| Grok Imagine | 1K, 2K |

### Style

Apply a predefined artistic style to the output. Available on **Ideogram 3** and **Recraft**.

Ideogram styles include realistic, cinematic, anime, watercolor, sketch, 3D, and more. Recraft offers realistic image, digital illustration, vector illustration, and icon styles with additional sub-style options.

### Rendering Speed

Trade off between speed and quality. Available on **Ideogram 3**.

| Option | Description |
|--------|-------------|
| Turbo | Fastest generation, slightly lower detail |
| Default | Balanced speed and quality |
| Quality | Slowest, highest detail and coherence |

### Guidance

Controls how strictly the model follows your prompt. Available on **Flux Dev**.

- **Low values** (1.5–2.5) — more creative, looser interpretation
- **High values** (3.5–5.0) — more literal, closely follows the prompt
- Default: 3.0

### Steps

Number of diffusion steps during generation. Available on **Flux Dev**.

- **Fewer steps** (1–15) — faster, rougher output
- **More steps** (25–50) — slower, finer detail
- Default: 28

### CFG Scale

Classifier-free guidance scale — similar to Guidance but used by different models. Available on **Recraft** (as artistic level).

Controls the balance between prompt adherence and creative freedom. Range: 0.3–0.7 (default: 0.5).

### Person Generation

Controls whether the model can generate images of people. Available on **Imagen 4** and **Gemini** models.

| Option | Description |
|--------|-------------|
| Allow All | Generate people of any age |
| Allow Adults | Only generate adults (default) |
| Don't Allow | No people in the output |

This is a Google safety requirement. If your prompt mentions people and this is set to "Don't Allow," the generation may fail.

---

## Video parameters

### Duration

Length of the generated video clip in seconds. Available options depend on the model:

| Model | Durations |
|-------|-----------|
| Veo 3 | 5s, 8s |
| Veo 3.1 | 4s, 6s, 8s |
| Runway Gen-4 | 5s, 10s |
| Kling 2.1 | 5s, 10s |
| Hailuo 2.3 | 6s, 10s |
| Ray 2 | 5s, 10s |
| Ray Flash 2 | 5s, 9s |

### Generate Audio

When enabled, the model produces a synchronized audio track with the video. Available on **Veo 3/3.1** and **Hailuo 2.3**.

Audio is generated natively — the model creates sounds that match the visual content (footsteps, speech, ambient noise, etc.).

### Camera Motion

Apply a predefined camera movement to the video. Available on **Ray 2** and **Ray Flash 2**.

| Option | Description |
|--------|-------------|
| None (auto) | Model decides camera behavior |
| Pan Left / Right | Horizontal camera slide |
| Zoom In / Out | Move toward or away from subject |
| Orbit Left / Right | Circle around the subject |

---

## Toggle parameters

These are on/off switches that appear at the bottom of the parameters panel.

### Watermark

Adds a provider watermark to the output. **On by default.** Available on **Imagen 4** and **Gemini** models.

Disabling the watermark may affect your usage terms with the provider — check your API agreement.

### Provider Prompt Enhance

Lets the AI provider automatically rewrite your prompt before generation to improve results. Available on **Imagen 4** and **Gemini** models.

When enabled, the provider may add detail, improve grammar, or restructure your prompt. The original prompt is preserved — enhancement happens behind the scenes.

### Prompt Optimizer

Similar to Provider Prompt Enhance, but used by **Hailuo/MiniMax**. Optimizes your prompt on the provider side for better video generation results.

### Loop Video

Makes the generated video seamlessly loop back to its first frame. Available on **Ray 2** and **Ray Flash 2**.

Useful for creating background animations, loading screens, or social media content that plays on repeat.

---

## Parameter support by model

Quick reference for which image models support which parameters:

| Parameter | Imagen 4 | Gemini Flash | Flux Pro | Flux Dev | Ideogram 3 | Recraft | Grok |
|-----------|----------|--------------|----------|----------|-------------|---------|------|
| Negative Prompt | Yes | Yes | — | — | Yes | Yes | — |
| Resolution | Yes | Yes | — | — | — | — | Yes |
| Seed | Yes | Yes | Yes | Yes | Yes | — | — |
| Output Format | Yes | Yes | Yes | Yes | — | — | — |
| Style | — | — | — | — | Yes | Yes | — |
| Rendering Speed | — | — | — | — | Yes | — | — |
| Guidance | — | — | — | Yes | — | — | — |
| Steps | — | — | — | Yes | — | — | — |
| CFG Scale | — | — | — | — | — | Yes | — |
| Person Generation | Yes | Yes | — | — | — | — | — |
| Watermark | Yes | Yes | — | — | — | — | — |
| Prompt Enhance | Yes | Yes | — | — | — | — | — |
