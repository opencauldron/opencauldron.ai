---
title: References
description: Upload, browse, and reuse reference images across generations. Track which reference was used for any past result.
---

A reference image guides a generation by providing visual context — composition, style, character, or subject matter — that the model builds from. OpenCauldron tracks every reference image you upload so you can reuse them later without re-uploading, see which ones were used in past generations, and manage your library from a dedicated page.

---

## Uploading a reference image

On the **Generate** page, scroll to the reference image section below the prompt field. When no image is loaded you see two buttons:

- **Upload** — opens a file picker to select a new image from your device
- **Browse** — opens a dialog to pick from images you have already uploaded or from your gallery

When you upload a new file, it is stored in Cloudflare R2, a thumbnail is generated automatically, and a record is created in the references library. The image appears immediately as the active reference, and a preview thumbnail is shown in the reference section.

To remove the current reference before generating, click the **X** button on the preview.

---

## Browsing existing references

Clicking **Browse** opens the **Browse References** dialog with two tabs.

### Uploads tab

Shows reference images you have previously uploaded, in reverse chronological order. Click any thumbnail to select it — the dialog closes and the image is loaded as the active reference.

### Gallery tab

Shows images you have previously generated. Use this when you want to take a past generation and feed it back in as a reference for a new one. Click any thumbnail to select it.

---

## The /references page

Navigate to **References** in the sidebar to open your full reference library.

### Browsing

References display in a square-thumbnail grid. As you scroll to the bottom the next page loads automatically (30 per page). Each thumbnail shows:

- The image preview
- On hover: file name, dimensions, and file size
- A usage count badge (shown when the reference has been used at least once)

Click any thumbnail to open the detail dialog.

### Detail dialog

The detail dialog shows:

- Full-size preview of the reference image
- File name and upload date
- Dimensions (width × height in pixels)
- File size
- MIME type
- Usage count — the number of times this reference has been used in a generation

Three action buttons are available:

| Button | Action |
|--------|--------|
| **Use** | Navigates to the Generate page with this image pre-loaded as the reference |
| **Download** | Downloads the original file |
| **Delete** | Permanently removes the reference image (with a confirmation step) |

### Deleting a reference

Deleting a reference removes the image and its thumbnail from object storage and removes the database record. It does not affect any generations that were made using the reference — those assets remain in your gallery.

Deletion is permanent and cannot be undone.

---

## Gallery integration

When you open an image asset in the **Gallery** lightbox, two reference-related features are available.

### Reference button

For image assets, the lightbox footer includes a **Reference** button. Clicking it navigates to the Generate page with the selected gallery image pre-loaded as the reference input.

### Reference image in metadata

If a reference image was used when generating an asset, the lightbox detail panel shows a **Reference Image** thumbnail in the parameters section. Click the thumbnail to open the original reference in a new tab.

---

## Brews integration

Reference images are saved and restored with [Brews](/docs/guides/brews). When you save a brew after a generation that used a reference image, the reference URL is stored with the brew. Loading that brew on the Generate page restores the reference image automatically alongside the model, parameters, and LoRAs.

---

## Usage tracking

Each time a reference image is used in a generation, its usage count increments by one. The count appears:

- As a badge on the thumbnail in the /references grid
- In the detail dialog metadata

Use the count to identify which references are most productive and which have never been used.

---

## How references are stored

Reference images and their thumbnails are stored in Cloudflare R2, the same object storage used for generated assets. URLs served to the browser are short-lived signed URLs, not permanent links. For storage configuration details, see the [Storage](/docs/guides/storage) guide.
