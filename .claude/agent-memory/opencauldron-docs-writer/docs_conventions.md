---
name: Docs site conventions and writing style
description: File format, frontmatter, Starlight components, writing style, and navigation patterns used across the OpenCauldron docs
type: project
---

## File format
- Plain Markdown (`.md`), not MDX
- Required frontmatter: `title` (string) and `description` (string)
- Title renders as the `<h1>` — do not repeat it as a heading in the body

## Directory and slug mapping
- Content root: `src/content/docs/docs/`
- URL pattern: file path within that dir = URL path after `/docs/`
- Example: `docs/contributing/index.md` → `/docs/contributing`
- Subdirectories: `guides/`, `contributing/`, `reference/`

## Sidebar registration
- All new pages must be manually added to the `sidebar` array in `astro.config.mjs`
- Slug format: `'docs/path/to/page'` (no leading slash, no trailing slash)
- The `reference/` section uses `autogenerate: { directory: 'docs/reference' }`

## Starlight callout syntax
```markdown
:::note
:::tip
:::caution
:::danger
```

## Writing style (matched from existing docs)
- Second person ("you") for instructions
- Active voice
- Sentence case for headings
- Code blocks always have a language tag (bash, typescript, markdown, yaml, etc.)
- Cross-links use root-relative paths: `/docs/installation` (not relative `../installation`)
- Horizontal rules (`---`) between major H2 sections
- "Related" section at the bottom of most pages — links to next logical pages
- No trailing summary paragraph
- Prerequisites at the top of how-to guides

## Why
Maintaining these conventions ensures new docs look identical to existing ones and Starlight renders them correctly.
