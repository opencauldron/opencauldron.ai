---
title: Image Editing
description: Edit, enhance, and transform existing images using image-to-image editing, upscaling, background removal, vectorization, and animation.
---

OpenCauldron provides several ways to work with images beyond initial generation. You can edit an image by prompting against it, increase its resolution, remove its background, convert it to an SVG, or send it directly to a video model for animation.

All editing tools work on images already in your gallery. Open an image in the gallery lightbox to access the available actions.

---

## Image-to-image editing

Image-to-image editing takes an existing image and a text prompt, then produces a new image that reflects your prompt while drawing from the original. Use it to change style, modify content, adjust composition, or restyle an image in a new direction.

Three providers support image-to-image editing, each with a different approach:

### xAI (Grok)

Uses the `grok-imagine-image` model via the xAI images edits API. The model interprets your prompt alongside the source image and produces a modified result. Aspect ratio is preserved from the original or can be changed.

**API key required:** `XAI_API_KEY`

### Ideogram (Remix)

Uses the Ideogram v3 remix endpoint. The source image is blended with your prompt at a fixed image weight of 50, meaning the output balances the original composition with your new instructions equally. You can also set a style type.

**API key required:** `IDEOGRAM_API_KEY`

### Recraft (Image-to-Image)

Uses the Recraft v3 image-to-image endpoint. Supports a **strength** parameter (0–1) that controls how much the output deviates from the source image.

- **0.0** — output is nearly identical to the source; only subtle changes from the prompt
- **0.5** — balanced blend of the source image and prompt (default)
- **1.0** — prompt dominates; the source image has minimal influence

You can also set the output size via aspect ratio and apply a Recraft style.

**API key required:** `RECRAFT_API_KEY`

### Provider comparison

| Feature | xAI | Ideogram | Recraft |
|---------|-----|----------|---------|
| Strength control | — | — | 0–1 |
| Style options | — | 14 styles | 12 styles |
| Aspect ratio control | Yes | Yes | Yes |

---

## Upscale

Upscaling increases image resolution beyond the original output size. OpenCauldron supports two upscale providers with different controls.

### Ideogram upscale

Upscales an image using Ideogram's upscale API with two numeric controls:

- **Resemblance** (0–100) — how closely the upscaled output matches the original. Higher values stay closer to the source; lower values allow more reinterpretation. Default: 50.
- **Detail** (0–100) — how much fine detail the model adds during upscaling. Higher values produce sharper, more textured results. Default: 50.

Start with both at 50 and adjust from there. Raising resemblance is useful when you need the upscaled version to look exactly like the original. Raising detail helps when the source image looks soft or lacks definition.

**API key required:** `IDEOGRAM_API_KEY`

### Recraft upscale

Offers two distinct upscale modes:

| Mode | Description |
|------|-------------|
| **Crisp** | Sharpens edges and increases resolution while preserving the original's character. Good for photos and realistic images. |
| **Creative** | Applies generative enhancement during upscaling, adding detail that wasn't in the original. Good for illustrations and stylized images. |

**API key required:** `RECRAFT_API_KEY`

---

## Remove background

Removes the background from an image and returns a version with transparency. This is useful when preparing images for compositing, overlays, or export to design tools.

Background removal is provided exclusively by **Recraft**. The result is saved to your gallery as a PNG with a transparent background.

The tool works best on images with clear subject/background separation. Complex or highly detailed backgrounds may produce imperfect edges.

**API key required:** `RECRAFT_API_KEY`

---

## Vectorize

Converts a raster image to a scalable vector graphic (SVG). The output is an SVG file URL rather than a raster image, making it suitable for print, icons, and design work where infinite scalability matters.

Vectorization is provided exclusively by **Recraft**.

The tool works best on images with flat or limited color areas — logos, icons, illustrations, and graphic design output. It is not suitable for photographs or images with complex gradients.

**API key required:** `RECRAFT_API_KEY`

---

## Animate

Any image in your gallery can be sent to the video generation interface for image-to-video conversion. This lets you turn a generated still into a short video clip using one of the supported video models.

To animate an image:

1. Open the image in the gallery by clicking on it.
2. Click the **Animate** button in the detail panel.
3. You are redirected to the generation page with the image pre-loaded as the input and the original prompt pre-filled.
4. Select a video model and adjust parameters, then generate.

The following video models support image-to-video input: Veo 3, Veo 3.1, Veo 3 Fast, Runway Gen-4 Turbo, Runway Gen-4.5, Kling 2.1, Kling 2.1 Pro, Hailuo 2.3, Hailuo 2.3 Fast, Ray 2, and Ray Flash 2.

---

## Feature and provider summary

| Feature | Provider | API key |
|---------|----------|---------|
| Image-to-image editing | xAI, Ideogram, Recraft | `XAI_API_KEY` / `IDEOGRAM_API_KEY` / `RECRAFT_API_KEY` |
| Upscale (resemblance + detail) | Ideogram | `IDEOGRAM_API_KEY` |
| Upscale (crisp / creative) | Recraft | `RECRAFT_API_KEY` |
| Remove background | Recraft | `RECRAFT_API_KEY` |
| Vectorize to SVG | Recraft | `RECRAFT_API_KEY` |
| Animate (image-to-video) | All video models | Varies by model |

For a full list of API keys and how to configure them, see the [Configuration](/docs/configuration) guide.
