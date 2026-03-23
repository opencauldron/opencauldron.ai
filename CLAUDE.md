# OpenCauldron Website

Marketing site and documentation for OpenCauldron, the open-source AI media generation studio.

## Tech Stack

- **Framework**: Astro with Starlight (for docs)
- **Styling**: Tailwind CSS v4 with OKLCH color system
- **Fonts**: Plus Jakarta Sans (headings), Inter (body), Cascadia Code (mono)
- **Build**: `npx astro dev` / `npx astro build`

## Project Structure

- `src/pages/` — Astro pages (index.astro, styleguide.astro)
- `src/pages/docs/` — Starlight documentation (MDX)
- `src/layouts/Layout.astro` — Base HTML layout with meta, fonts, OG tags
- `src/styles/global.css` — Design tokens, animations, component styles
- `public/` — Static assets (logos, favicons, OG image)

## Design System

All UI work on this site must follow these conventions. Read `src/styles/global.css` and `src/pages/styleguide.astro` for the canonical reference.

### Color Tokens (OKLCH)

All colors use OKLCH and are defined as CSS custom properties in `:root`. Never use hex, RGB, or HSL.

| Token | Value | Usage |
|---|---|---|
| `--color-background` | `oklch(0.12 0.02 280)` | Page backgrounds |
| `--color-foreground` | `oklch(0.94 0.008 280)` | Primary text |
| `--color-card` | `oklch(0.16 0.02 280)` | Elevated surfaces |
| `--color-primary` | `oklch(0.68 0.19 280)` | Interactive elements, links |
| `--color-primary-fg` | `oklch(0.98 0.005 280)` | Text on primary backgrounds |
| `--color-muted` | `oklch(0.58 0.025 280)` | Secondary text, placeholders |
| `--color-border` | `oklch(0.26 0.025 280)` | Borders, dividers |
| `--color-violet` | `oklch(0.65 0.20 300)` | Accent — violet |
| `--color-fuchsia` | `oklch(0.68 0.20 325)` | Accent — warm pink (badges, callouts) |
| `--color-sky` | `oklch(0.72 0.14 240)` | Accent — cool blue (code highlights) |
| `--color-teal` | `oklch(0.70 0.12 195)` | Accent — green-blue |

### Color Usage Principles

- **Avoid monochromatic sections.** The hero and other prominent sections should use multiple accent colors, not just `--color-primary` everywhere. The "Level up your creative team" section is the reference for good color variability.
- **Cycle accent colors** in lists, CLI commands, feature grids, etc. Use the rotation: sky → primary → fuchsia → violet.
- **Badges and callouts** use `--color-fuchsia` (not primary) for background, text, and ring.
- **The brand icon is a magic wand** (the Lucide wand-sparkles SVG). Use it instead of pulsing dots or generic indicators in badges.

### Gradients

Headlines and CTAs use multi-stop OKLCH gradients applied via `background-clip: text`:

- **Hero heading**: `linear-gradient(135deg, oklch(0.80 0.12 280), oklch(0.68 0.19 280), oklch(0.65 0.20 310))`
- **Creative/gamification**: `linear-gradient(135deg, oklch(0.68 0.20 325), oklch(0.65 0.20 300))`
- **CTA button**: `linear-gradient(135deg, oklch(0.58 0.22 280), oklch(0.65 0.20 300), oklch(0.68 0.19 280), oklch(0.60 0.22 260))`
- **Body ambient**: Two radial gradients on `<body>` — purple at top-left, violet-pink at bottom-right.

### Typography

| Role | Font | Weights | Token |
|---|---|---|---|
| Headings | Plus Jakarta Sans | 600, 700, 800 | `--font-heading` / `font-heading` |
| Body | Inter | 400, 500, 600 | `--font-sans` / `font-sans` |
| Code/CLI | Cascadia Code | — | `--font-mono` / `font-mono` |

Headings use `tracking-tight`. Body text uses `leading-relaxed` for longer passages.

### Component Patterns

**Badges** — Rounded-full pills with tinted bg, matching text, and ring:
```
bg-[var(--color-fuchsia)]/10 text-[var(--color-fuchsia)] ring-1 ring-[var(--color-fuchsia)]/20
```

**Cards** — Rounded-xl with ring border and card background:
```
rounded-xl ring-1 ring-[var(--color-border)] bg-[var(--color-card)]
```
Hover state adds `hover:ring-[var(--color-primary)]/30`.

**Buttons (primary)** — Gradient background with shimmer animation:
```
rounded-xl h-12 px-7 text-sm font-semibold text-white animate-shimmer
```

**Buttons (secondary)** — Ghost with ring border:
```
rounded-xl h-12 px-7 ring-1 ring-[var(--color-border)] hover:ring-[var(--color-primary)]/40
```

**Code blocks** — Card container with tab bar, mono font, and multi-colored command lines.

**Icon containers** — Three sizes:
- Nav logo: 9×9, gradient bg, white stroke icon
- Feature: 10×10, `primary/10` bg, primary stroke icon
- Inline badge: 8×8, tinted bg

### Animations

| Class | Effect | Timing |
|---|---|---|
| `.animate-fade-up` | Translate Y + opacity | 0.7s cubic-bezier(0.16, 1, 0.3, 1) |
| `.animate-shimmer` | Gradient position cycle | 3s ease-in-out infinite |
| `.animate-float` | Gentle vertical bob | 4s ease-in-out infinite |
| `sparkle-pulse` | Scale + opacity pulse | 3-6s staggered |

Stagger entrance animations with `.delay-100` through `.delay-700`.

### SVG Icons

All icons are inline SVGs following Lucide conventions: 24×24 viewBox, stroke-based, `stroke-width="1.5"` for feature icons and `stroke-width="2"` for small UI icons. The magic wand SVG path is:
```
<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/>
<path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>
```
