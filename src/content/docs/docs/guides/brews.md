---
title: Brews
description: Save and reuse generation recipes — model, LoRAs, parameters, and optional prompt — as named brews.
---

A brew is a saved generation recipe. It captures the model, all active LoRAs and their weights, generation parameters (aspect ratio, seed, output format, style, etc.), and optionally the prompt. Loading a brew on the Generate page restores the full setup in one click so you can reproduce or iterate on a previous result without rebuilding the configuration by hand.

---

## Saving a brew from the Generate page

After a successful generation, a **Save as Brew** button appears below the result. Click it to open the Save dialog:

1. Enter a **name** for the brew (required).
2. Optionally add a **description** to remind yourself what the brew is for.
3. Use the **Include prompt text** toggle to control whether the prompt is stored:
   - **On** — the prompt is saved with the brew and pre-filled when you load it.
   - **Off** — only the model and parameters are saved; you write a fresh prompt each time.
4. Click **Save Brew**.

The brew is saved immediately and appears on the /brews page.

---

## Saving a brew from the Gallery

You can save a brew from any asset already in your gallery without returning to the Generate page.

1. Open the gallery and click any asset to open the lightbox.
2. Click the **Brew** button (flask icon) in the lightbox footer.
3. The Save as Brew dialog opens, pre-filled with the model and parameters from that generation.
4. Enter a name, optional description, and choose whether to include the prompt.
5. Click **Save Brew**.

This is the fastest way to capture a recipe from an older generation you want to reproduce.

---

## Loading a brew on the Generate page

The **Brew** button sits next to the model selector at the top of the Generate page. Click it to open a popover listing all your saved brews.

Each entry in the list shows:
- A preview thumbnail (if the brew has one)
- The brew name and model
- The number of LoRAs in the recipe, if any

Click any brew to load it. The page immediately:
- Switches to the brew's model (and switches between image and video mode if needed)
- Restores all parameters (aspect ratio, seed, style, etc.)
- Restores the LoRA selection and weights
- Restores the reference image, if one was active when the brew was saved
- Pre-fills the prompt, if the brew was saved with one

A confirmation toast appears when the brew loads successfully.

---

## The /brews page

Navigate to **Brews** in the sidebar to see all your saved brews in a grid. Each card shows:

- A preview image (taken from the generation used to save the brew)
- The brew name and model
- The optional description
- The saved prompt (if any), shown in italics
- How many LoRAs the recipe includes
- How many times the brew has been used

### Actions

Each brew card has three action buttons:

| Button | Action |
|--------|--------|
| **Use** | Navigates to the Generate page and loads the brew |
| **Edit** (pencil icon) | Opens a dialog to update the name and description |
| **Delete** (trash icon) | Permanently removes the brew after a confirmation prompt |

Editing a brew only changes the name and description — it does not change the stored model, parameters, or prompt.

---

## Tips

- **Iterate from a brew** — load a brew, change a single parameter (like seed or aspect ratio), generate, and save the variation as a new brew under a different name.
- **Template brews** — save a brew without a prompt to create a reusable style template. Each time you load it you write a new subject while keeping the same model and LoRA stack.
- **LoRA stacks** — brews preserve LoRA selection and individual weight values, making them the easiest way to rebuild a complex multi-LoRA setup.
- **Reference + brew** — if you are producing a series of variations from the same reference image, save the brew with that reference loaded. When you share the brew or reload it later, the reference is restored automatically.
