---
title: Contributing to Docs
description: How to edit or add documentation pages on the OpenCauldron docs site.
---

The OpenCauldron docs site lives in a separate repository from the main app. It is an [Astro](https://astro.build) project using the [Starlight](https://starlight.astro.build) documentation framework.

**Repository:** [opencauldron/opencauldron-website](https://github.com/opencauldron/opencauldron-website)

---

## Prerequisites

- Node.js 22+ or Bun 1.0+
- Git

---

## 1. Fork and clone

Fork [opencauldron/opencauldron-website](https://github.com/opencauldron/opencauldron-website) on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/opencauldron-website
cd opencauldron-website
```

---

## 2. Install dependencies

```bash
bun install
```

---

## 3. Start the dev server

```bash
bun run dev
```

The site starts at [http://localhost:4321](http://localhost:4321) with hot reload. Changes to `.md` files appear immediately in the browser.

---

## Where docs live

All documentation content is in `src/content/docs/docs/`. The directory structure maps directly to URL paths:

```
src/content/docs/docs/
├── introduction.md           → /docs/introduction
├── installation.md           → /docs/installation
├── configuration.md          → /docs/configuration
├── cli.md                    → /docs/cli
├── guides/
│   ├── api-keys.md           → /docs/guides/api-keys
│   ├── adding-providers.md   → /docs/guides/adding-providers
│   └── ...
├── contributing/
│   ├── index.md              → /docs/contributing
│   ├── development-setup.md  → /docs/contributing/development-setup
│   └── ...
└── reference/
    └── environment-variables.md  → /docs/reference/environment-variables
```

---

## File format

Each doc is a Markdown file with a YAML frontmatter block at the top:

```markdown
---
title: Page Title
description: One-sentence description used in meta tags and the sidebar tooltip.
---

Page content goes here.
```

Both `title` and `description` are required. The title appears as the `<h1>` heading on the page — do not repeat it as a heading in the body.

---

## Starlight components

Starlight provides several components you can use directly in Markdown. The most useful:

### Asides (callout boxes)

```markdown
:::note
Use this for supplementary information that does not block the reader.
:::

:::tip
Use this for helpful shortcuts or best practices.
:::

:::caution
Use this for things that may cause problems if ignored.
:::

:::danger
Use this for actions that cannot be undone or that carry serious risk.
:::
```

These render as styled callout boxes with icons. Use them sparingly — overuse makes them lose impact.

---

## Adding a new page

### 1. Create the file

Create a `.md` file in the appropriate subdirectory. For example, a new contributing guide:

```bash
touch src/content/docs/docs/contributing/my-new-guide.md
```

Add the required frontmatter and write your content.

### 2. Register it in the sidebar

Open `astro.config.mjs` and add the new slug to the appropriate sidebar section:

```js
{
  label: 'Contributing',
  items: [
    { slug: 'docs/contributing' },
    { slug: 'docs/contributing/development-setup' },
    { slug: 'docs/contributing/my-new-guide' },  // add here
  ],
}
```

Pages not listed in the sidebar are still accessible by URL but will not appear in the navigation. Always register new pages.

---

## Editing an existing page

Open the file in `src/content/docs/docs/` and edit it directly. The dev server hot-reloads on save.

The "Edit this page" link on every doc page points to the corresponding file in the GitHub repo — you can use that as a shortcut to find the right file.

---

## Writing guidelines

These conventions match the existing docs:

- **Second person** — Write instructions as "you": "Run the following command" not "The user should run..."
- **Active voice** — "The app checks for API keys" not "API keys are checked by the app"
- **Sentence case for headings** — "Add a new page" not "Add A New Page"
- **Code blocks always have a language tag** — Use `bash`, `typescript`, `markdown`, `yaml`, etc.
- **Cross-link related pages** — Add a "Related" section at the bottom with links to pages the reader is likely to want next
- **Horizontal rules between major sections** — Use `---` to visually separate H2-level sections, matching the existing docs
- **No trailing summary** — End docs with a "Related" section, not a paragraph summarizing what you just wrote

### Cross-links

When linking to other doc pages, use root-relative paths without the trailing slash:

```markdown
See [Installation](/docs/installation) for setup instructions.
```

The existing docs use this pattern consistently — do not use relative paths like `../installation`.

---

## Building before submitting

Run the build to verify there are no broken links or Astro errors:

```bash
bun run build
```

Fix any errors before opening a pull request.

---

## Related

- [Contributing Overview](/docs/contributing) — Full contribution process
- [Code Style and PR Guidelines](/docs/contributing/code-style) — PR conventions
