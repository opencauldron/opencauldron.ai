---
title: Adding a Provider
description: Step-by-step guide to implementing and registering a new AI model provider in OpenCauldron.
---

OpenCauldron's provider system is a thin abstraction over AI APIs. Each model is a TypeScript object that implements the `GenerationProvider` interface. Adding a new provider means creating that object, registering it, and wiring up its API key.

This guide covers everything from the interface contract through the variant system that drives model cards in the UI.

## Prerequisites

- Node.js / Bun development environment set up per the [installation guide](/docs/installation)
- Familiarity with `async`/`await` and TypeScript interfaces
- An API key for the provider you want to add

---

## The GenerationProvider interface

Every provider implements this interface, defined in `src/types/index.ts`:

```typescript
export interface GenerationProvider {
  id: ModelId;
  name: string;
  provider: ProviderName;
  mediaType: MediaType;
  capabilities: ModelCapabilities;
  costPerImage: number;
  costPerSecond?: number;
  generate(params: GenerationParams): Promise<GenerationResult>;
  getStatus?(jobId: string): Promise<GenerationResult>;
}
```

**Field reference:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ModelId` | Unique string identifier for this model. Must be added to the `ModelId` union in `src/types/index.ts`. |
| `name` | `string` | Display name shown in the UI. Shared across variants of the same model family (e.g. `"Flux"` for all Flux variants). |
| `provider` | `ProviderName` | The API provider. Must exist in the `ProviderName` union — add a new entry if introducing a new provider. |
| `mediaType` | `"image" \| "video"` | Whether this model produces images or video. Controls which tab the model appears in. |
| `capabilities` | `ModelCapabilities` | Declares which parameters the model supports. Controls which controls appear in the generation UI. |
| `costPerImage` | `number` | Estimated USD cost per generated image. Set to `0` for video-only providers. |
| `costPerSecond` | `number` (optional) | Estimated USD cost per second of video. Required for video providers. |
| `generate` | `function` | Calls the provider API and returns a `GenerationResult`. For image models, returns the image buffer. For video models, returns a `jobId` for async polling. |
| `getStatus` | `function` (optional) | Required for async providers. Called repeatedly by the polling endpoint to check job status. |

---

## ModelCapabilities

The `capabilities` object tells the UI which parameter controls to show. Every flag you set to `true` makes a corresponding input appear on the generation form.

```typescript
export interface ModelCapabilities {
  // Required
  aspectRatios: string[];            // List of supported aspect ratio strings
  supportsNegativePrompt: boolean;   // Show negative prompt textarea
  supportsBatchGeneration: boolean;  // Show batch count slider
  maxBatchSize: number;              // Maximum images per batch request

  // Image controls (optional)
  supportsSeed?: boolean;            // Show seed input
  supportsOutputFormat?: boolean;    // Show JPEG/PNG toggle
  supportsResolution?: boolean;      // Show resolution selector
  resolutionOptions?: string[];      // e.g. ["1K", "2K", "4K"] or ["720p", "1080p", "4k"]
  supportsGuidance?: boolean;        // Show guidance (prompt adherence) slider
  supportsSteps?: boolean;           // Show inference steps slider
  supportsCfgScale?: boolean;        // Show CFG scale slider
  supportsRenderingSpeed?: boolean;  // Show Turbo/Default/Quality selector
  supportsColorPalette?: boolean;    // Show color palette picker
  supportsPersonGeneration?: boolean;// Show person generation policy selector
  supportsWatermarkToggle?: boolean; // Show watermark on/off toggle
  supportsPromptEnhance?: boolean;   // Show provider-side prompt enhancement toggle
  supportsPromptOptimizer?: boolean; // Show Hailuo-style prompt optimizer toggle
  styles?: string[];                 // Show style selector with these options

  // Video controls (optional)
  maxDuration?: number;              // Maximum video duration in seconds
  supportedDurations?: number[];     // Specific durations available (e.g. [5, 8])
  supportsAudio?: boolean;           // Show audio enable/disable toggle
  supportsImageToVideo?: boolean;    // Show image input for image-to-video
  supportsCameraControl?: boolean;   // Show camera motion selector
  cameraMotions?: string[];          // Available camera motion options
  resolutions?: ("540p"|"720p"|"1080p"|"4k")[]; // Video resolutions
  supportsLoop?: boolean;            // Show loop video toggle
}
```

Only set flags to `true` for parameters your provider's API actually accepts. Unused flags have no cost — they simply won't render controls.

---

## Sync vs async providers

### Image providers (sync)

Image providers complete the full request inside `generate()` and return the image data directly. The API route awaits the result before responding to the client.

Your `generate()` must resolve with `imageBuffer` populated:

```typescript
return {
  status: "completed",
  imageBuffer: Buffer.from(arrayBuffer),
  width: 1024,
  height: 1024,
  durationMs: Date.now() - startTime,
};
```

Many image APIs are themselves async (submit a job, poll for completion). Handle all polling inside your `generate()` function — from the application's perspective the call is still synchronous. See `src/providers/flux.ts` for an example of this pattern.

### Video providers (async)

Video generation takes tens of seconds to minutes. Video providers return immediately from `generate()` with a `jobId`, and implement `getStatus()` for the polling endpoint to call.

`generate()` for a video provider submits the job and returns:

```typescript
return {
  status: "processing",
  jobId: operationId, // the ID returned by the provider API
};
```

`getStatus()` checks the job and returns one of three shapes:

```typescript
// Still running
return { status: "processing" };

// Finished successfully
return {
  status: "completed",
  videoUrl: "https://...",   // provider-hosted URL, OR
  videoBuffer: Buffer,       // raw video bytes (if API returns base64)
  hasAudio: true,
  duration: 8,
};

// Failed
return {
  status: "failed",
  error: "Provider returned error: ...",
};
```

The `jobId` you return from `generate()` is stored in the database and passed back to `getStatus()` verbatim — it can be any string your polling logic needs (an operation name, task ID, URL, etc.).

---

## Step-by-step walkthrough

### 1. Add the model ID and provider name

Open `src/types/index.ts` and add your model to the `ModelId` union:

```typescript
export type ModelId =
  | "imagen-4"
  // ... existing models ...
  | "my-new-model";      // add here
```

If you are introducing a new provider company (not just a new model from an existing provider), also add it to `ProviderName`:

```typescript
export type ProviderName =
  | "google"
  // ... existing providers ...
  | "myprovider";        // add here
```

You must also add the new model ID to the `z.enum([...])` array in `src/app/api/generate/route.ts` so the API route accepts it:

```typescript
model: z.enum([
  // existing models...
  "my-new-model",
]),
```

### 2. Create the provider file

Create `src/providers/myprovider.ts`. The simplest image provider looks like this:

```typescript
import type {
  GenerationProvider,
  GenerationParams,
  GenerationResult,
} from "@/types";

function getApiKey(): string {
  const key = process.env.MY_PROVIDER_API_KEY;
  if (!key) throw new Error("MY_PROVIDER_API_KEY is not set");
  return key;
}

export const myModelProvider: GenerationProvider = {
  id: "my-new-model",
  name: "My Model",
  provider: "myprovider",
  mediaType: "image",
  capabilities: {
    aspectRatios: ["1:1", "16:9", "9:16"],
    supportsNegativePrompt: false,
    supportsBatchGeneration: false,
    maxBatchSize: 1,
    supportsSeed: true,
    supportsOutputFormat: true,
  },
  costPerImage: 0.03,

  async generate(params: GenerationParams): Promise<GenerationResult> {
    const startTime = Date.now();
    try {
      const apiKey = getApiKey();
      const prompt = params.enhancedPrompt || params.prompt;

      const response = await fetch("https://api.myprovider.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ prompt, seed: params.seed }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`API error (${response.status}): ${text}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const imageBuffer = Buffer.from(arrayBuffer);

      return {
        status: "completed",
        imageBuffer,
        width: 1024,
        height: 1024,
        durationMs: Date.now() - startTime,
      };
    } catch (error) {
      return {
        status: "failed",
        error: error instanceof Error ? error.message : String(error),
        durationMs: Date.now() - startTime,
      };
    }
  },
};
```

For an async video provider, follow the pattern in `src/providers/veo.ts` (Google's long-running operation pattern) or `src/providers/runway.ts` (task ID polling pattern). Both submit a job in `generate()` and implement `getStatus()` to check its progress.

### 3. Register the provider

Open `src/providers/registry.ts`. Add your import and push the provider into `allProviders`:

```typescript
// At the top with other imports
import { myModelProvider } from "./myprovider";

// In the allProviders array
const allProviders: GenerationProvider[] = [
  // ... existing providers ...
  myModelProvider,
];
```

The registry's `hasApiKey()` function controls visibility. Add a case for your new provider so models without a configured key are hidden rather than throwing errors:

```typescript
function hasApiKey(provider: GenerationProvider): boolean {
  switch (provider.provider) {
    // ... existing cases ...
    case "myprovider":
      return !!process.env.MY_PROVIDER_API_KEY;
    default:
      return false;
  }
}
```

### 4. Add the env var

Add your API key to `.env.example` in the `AI MODELS` section, commented out by default:

```bash
# My Provider (My New Model)
# MY_PROVIDER_API_KEY=""
```

Then add the actual value to your local `.env` file. Restart the dev server — your model card should appear.

### 5. Verify

```bash
bun run lint
bun run build
```

Both must pass before opening a pull request.

---

## The VARIANT_GROUPS pattern

When a provider has multiple models that share a base capability set but differ in speed, quality, or cost, you can group them into a single model card with a segmented control selector.

**How it works:**

- The primary model (e.g. `"flux-1.1-pro"`) gets its own card.
- Secondary models (e.g. `"flux-dev"`, `"flux-2-klein"`) are listed in `VARIANT_ONLY_IDS`, which hides them from the top-level card list.
- `VARIANT_GROUPS` maps the primary model ID to an array of `ModelVariant` objects describing each variant.
- The UI renders a segmented control on the primary card. Selecting a variant switches which model ID is sent to the API.

**Adding variants for your provider:**

First, add the secondary model IDs to `VARIANT_ONLY_IDS` in `registry.ts`:

```typescript
const VARIANT_ONLY_IDS: Set<ModelId> = new Set([
  // ... existing entries ...
  "my-new-model-fast",
  "my-new-model-pro",
]);
```

Then add an entry to `VARIANT_GROUPS`, keyed by the primary model ID:

```typescript
const VARIANT_GROUPS: Partial<Record<ModelId, ModelVariant[]>> = {
  // ... existing entries ...
  "my-new-model": [
    {
      id: "my-new-model",
      label: "Standard",
      costPerImage: 0.03,
      avgGenerationTime: 8,
      description: "Balanced quality and speed.",
    },
    {
      id: "my-new-model-fast",
      label: "Fast",
      costPerImage: 0.01,
      avgGenerationTime: 2,
      description: "Lower cost, faster generation for drafts.",
    },
    {
      id: "my-new-model-pro",
      label: "Pro",
      costPerImage: 0.06,
      avgGenerationTime: 15,
      description: "Highest quality output.",
    },
  ],
};
```

Each variant needs its own `GenerationProvider` export in your provider file and its own entry in `allProviders`. They can share capabilities and only differ in cost or generation parameters — see how `fluxProvider`, `fluxDevProvider`, `fluxKontextProvider`, and `fluxKleinProvider` are all exported from `src/providers/flux.ts` and share a `capabilities` object.

---

## GenerationResult reference

Your `generate()` and `getStatus()` functions return a `GenerationResult`. All fields are optional except `status`.

```typescript
export interface GenerationResult {
  status: "pending" | "processing" | "completed" | "failed";

  // Image output (one of imageBuffer or imageUrl must be set on completion)
  imageUrl?: string;      // Provider-hosted URL — used only for interim display
  imageBuffer?: Buffer;   // Raw image bytes — required for the API route to store to R2
  width?: number;         // Pixel width of the output
  height?: number;        // Pixel height of the output

  // Video output
  videoUrl?: string;      // Provider-hosted URL to download the video
  videoBuffer?: Buffer;   // Raw video bytes (for providers that return base64)
  posterUrl?: string;     // Thumbnail frame URL, if the provider returns one
  duration?: number;      // Actual video duration in seconds
  hasAudio?: boolean;     // Whether the video has an audio track

  // Async tracking
  jobId?: string;         // Returned by video generate() — stored for polling

  // Common
  error?: string;         // Human-readable error message on failure
  durationMs?: number;    // Total wall-clock time for the generation request
}
```

**Image providers:** You must return `imageBuffer` on success. The API route in `src/app/api/generate/route.ts` checks `result.imageBuffer` and treats a missing buffer as a failure, even if `status` is `"completed"`.

**Video providers:** Return `videoUrl` or `videoBuffer` from `getStatus()` when done. `videoUrl` is more common — the app downloads and re-uploads the video to R2 storage.

---

## Related

- [API Keys](/docs/guides/api-keys) — Environment variable names for all existing providers
- [Working with Models](/docs/guides/models) — How models and variants appear in the UI
- [Environment Variables](/docs/reference/environment-variables) — Full env var reference
