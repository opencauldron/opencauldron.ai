---
title: LoRAs
description: Browse, favorite, and apply Civitai LoRAs to Flux generations for fine-grained style, character, and concept control.
---

LoRA (Low-Rank Adaptation) is a technique for applying small, targeted modifications to a base model without retraining it. LoRA files are typically a few hundred megabytes and encode a specific style, character, concept, or subject. Stacking multiple LoRAs lets you combine their effects in a single generation.

OpenCauldron sources LoRAs from [Civitai](https://civitai.com), the largest community hub for community-trained models.

---

## The /loras exploration page

Navigate to **LoRAs** in the sidebar to open the exploration page. It searches the Civitai catalog directly and shows results as a browsable grid.

### Filtering and sorting

The toolbar at the top of the page provides four controls:

| Control | Options |
|---------|---------|
| **Search** | Free-text search against Civitai's LoRA catalog |
| **Base model** | Flux, SDXL, Pony, Illustrious, SD 1.5, Hunyuan Video, Wan Video |
| **Sort** | Most Downloaded, Highest Rated, Newest |
| **NSFW** | Toggle to include adult-rated content (off by default, preference is saved in your browser) |

Results update as you type. Click **Load more** at the bottom of the grid to fetch the next page.

### Base model support

The base model filter determines which LoRAs appear in the search results. Not all base models can be used for generation yet:

| Base model | Status |
|------------|--------|
| Flux | Ready to generate |
| SDXL, Pony, Illustrious, SD 1.5 | Browse only |
| Hunyuan Video, Wan Video | Browse only |

Cards for Flux LoRAs show a **Ready to generate** badge. Cards for all other base models show a **Browse only** badge. You can still favorite browse-only LoRAs for future use as more base models are added.

### Viewing LoRA details

Click any card to open the detail modal. The left side shows a full-size image or video gallery; the right panel shows:

- Name and creator
- Download count and like count
- Base model and file format/size
- Trigger words — the keywords the LoRA was trained with
- Tags

If the LoRA has multiple preview images or videos, use the left/right arrows to step through them, or click any thumbnail in the strip below the main image. Video previews play as silent, looping clips.

### Favorites

Click the heart button on any card to save a LoRA to your favorites. Favorited LoRAs sync to your account so they're available on the Generate page without searching again.

To see only your saved LoRAs, click the **Favorites** toggle button at the top of the page. The favorites count is shown next to the button when you have any saved.

To remove a favorite, click the heart again on any favorited card or in the detail modal.

---

## Using LoRAs on the Generate page

LoRAs are only available when a **Flux** model is selected. When you pick any Flux variant, a LoRA section appears in the left panel below the model selector.

### Adding LoRAs

Click the **LoRA** header (or the toggle switch next to it) to expand the browser. It has two tabs:

- **Browse** — search Civitai directly from inside the Generate page
- **Favorites** — your saved LoRAs, ready to add instantly

Hover any card and click **Add** to apply it to the current generation. You can add up to **5 LoRAs** at a time. The badge next to the LoRA header shows the current count (e.g., `2/5`).

### Adjusting weight

Each active LoRA appears in an **Active LoRAs** list below the browser. For each one you can:

- **Adjust weight** — drag the slider from 0 to 4. A weight of `1.0` applies the LoRA at full strength. Lower values blend it in more subtly; higher values make its effect more dominant. Default is `1.0`.
- **Remove** — click the X button to deactivate the LoRA.

### Trigger words

If a LoRA was trained with trigger words, they appear as badges under its name in the Active LoRAs list. The system automatically inserts these trigger words into your prompt when you generate. You will see them appear in the prompt field.

Including trigger words in your prompt is important — without them, the LoRA's effect may be weak or absent.

### NSFW content

The NSFW toggle appears inside the LoRA browser on the Generate page and is shared with the setting on the /loras exploration page. Enabling it allows adult-rated LoRAs to appear in search results.

---

## How generation works with LoRAs

When you generate with one or more active LoRAs, OpenCauldron automatically routes the request to the **fal.ai `flux-lora` endpoint** instead of the standard Flux provider. This is transparent — you do not need to configure anything differently.

The fal.ai endpoint requires a `FAL_KEY` environment variable. If this key is not configured, LoRA-enabled generation will fail. See the [Environment Variables](/docs/reference/environment-variables) reference and [API Keys](/docs/guides/api-keys) guide.

---

## Civitai integration

LoRA search is powered by the Civitai API. No account is needed to browse, but unauthenticated requests are subject to stricter rate limits.

To increase rate limits, set a `CIVITAI_API_KEY` in your environment:

```bash
CIVITAI_API_KEY=your_civitai_api_token
```

You can generate a Civitai API key from your account settings on [civitai.com](https://civitai.com). When this key is set, all Civitai API calls from your OpenCauldron instance include it as a Bearer token.
