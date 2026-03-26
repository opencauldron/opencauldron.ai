---
title: Changelog
description: Release history and notable changes for OpenCauldron.
---

## 2026-03-26

### References

- Every uploaded reference image is now tracked in a references library with full metadata: dimensions, file size, MIME type, thumbnail, and usage count.
- New **/references page** accessible from the sidebar — a browsable gallery of all uploaded reference images with grid view, infinite scroll, lightbox detail view, download, delete, and Use actions.
- The reference image section on the Generate page now offers two options: **Upload** (new file) and **Browse** (pick from existing). The Browse dialog has two tabs — **Uploads** (previously uploaded references) and **Gallery** (past generations to reuse as references).
- Gallery lightbox now shows a **Reference** button on image assets, navigating to the Generate page with that image pre-loaded.
- Gallery lightbox shows the reference image thumbnail in the parameters panel when a reference was used during generation.
- Reference images (`imageInput`) are now saved and restored with Brews, so saved recipes preserve which reference image was used.
- Usage count increments each time a reference image is used in a generation.

### Navigation

- Added **References** entry to the application sidebar.

---

## 2026-03-25

### LoRA support

- Added full LoRA support for Flux image generation via the fal.ai `flux-lora` endpoint.
- The system automatically routes to fal.ai when one or more LoRAs are active — no configuration change required.
- Up to 5 LoRAs can be stacked per generation, each with an independent weight slider (0–4).
- Trigger words are auto-inserted into the prompt when a LoRA is added.

### /loras exploration page

- New dedicated page for browsing the Civitai LoRA catalog.
- Filter by base model: Flux (ready to generate), SDXL, Pony, Illustrious, SD 1.5, Hunyuan Video, Wan Video.
- Sort by Most Downloaded, Highest Rated, or Newest.
- NSFW toggle with preference saved locally per browser.
- Detail modal with image/video gallery, trigger words, stats, and a link to the Civitai listing.
- Video LoRA previews play inline as silent loops.
- Optional `CIVITAI_API_KEY` for higher Civitai API rate limits.

### Brews

- Brews are saved generation recipes that capture the model, LoRAs and weights, parameters, and optionally the prompt.
- Save a brew from the Generate page after a successful generation using the **Save as Brew** button.
- Load a brew on the Generate page from the **Brew** popover next to the model selector.
- Each brew tracks a usage count that increments each time the brew is loaded.
- Edit brew name/description or delete brews from the /brews management page.

### Save brews from the Gallery

- The asset lightbox in the Gallery now includes a **Brew** button.
- Clicking it opens the Save as Brew dialog pre-filled with the model and parameters from that generation, allowing you to capture a recipe from any past result.

### Navigation

- Added **Brews** and **LoRAs** entries to the application sidebar.
