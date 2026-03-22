---
title: Prompt Tools
description: Use template modifiers and AI enhancement to write better prompts.
---

OpenCauldron includes two client-side tools that help you build richer prompts, plus an optional provider-side enhancement toggle on supported models.

## Template mode

Template mode lets you build a prompt by selecting values from five modifier categories. Your selections are appended to whatever you type in the prompt field.

| Category | What it controls |
|----------|-----------------|
| Style | Overall visual style (e.g. Photorealistic, Cinematic, Anime, Oil Painting) |
| Lighting | Lighting setup (e.g. Studio, Dramatic, Golden Hour, Neon) |
| Composition | Shot framing (e.g. Close-up, Wide Angle, Bird's Eye, Macro) |
| Mood | Color and atmosphere (e.g. Vibrant, Moody, Ethereal, Nostalgic) |
| Quality | Resolution and quality descriptors (e.g. 4K Ultra HD, Masterpiece) |

Each category has a **None** option if you want to omit it. When you generate, the selected values are joined with commas and appended to your prompt automatically.

Template mode is client-side only. Selections are not saved between sessions and are not shared with other team members.

## LLM mode

LLM mode rewrites your prompt using Mistral's API. It keeps the core intent of your original prompt and adds detail about composition, lighting, style, and quality that tends to produce better results.

**Requirements:** Set `MISTRAL_API_KEY` in your environment. If the key is missing, LLM mode is unavailable.

The enhancer uses `mistral-small-latest` and is tuned per model — it applies different guidance depending on which AI model you are generating with. For example, when generating with Ideogram 3, the enhancer knows to emphasize text rendering; when generating with Veo 3, it focuses on scene motion and audio description.

The original prompt and the enhanced prompt are both stored with each generation so you can compare them.

## Provider prompt enhancement

Some models expose their own server-side prompt enhancement, separate from the LLM mode described above. When a model supports this, a **Provider Prompt Enhance** toggle appears in the generation settings panel. This is distinct from LLM mode — it uses the AI provider's own enhancement pipeline rather than Mistral.

Currently, Imagen models (Imagen 4, Ultra, Fast, Flash, Flash Lite) support provider prompt enhancement.

## Prompt history

Every generation saves its prompt — and enhanced prompt if one was used — alongside the output. Browse the gallery to find what worked and iterate on successful approaches.
