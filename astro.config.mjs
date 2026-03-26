// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://opencauldron.ai',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'Docs',
      logo: {
        src: './public/favicon.svg',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/opencauldron/opencauldron' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/opencauldron' },
      ],
      editLink: {
        baseUrl: 'https://github.com/opencauldron/opencauldron/edit/main/',
      },
      customCss: ['./src/styles/starlight.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { slug: 'docs/introduction' },
            { slug: 'docs/installation' },
            { slug: 'docs/cli' },
            { slug: 'docs/configuration' },
            { slug: 'docs/guides/api-keys' },
          ],
        },
        {
          label: 'Generating',
          items: [
            { slug: 'docs/guides/models' },
            { slug: 'docs/guides/parameters' },
            { slug: 'docs/guides/prompts' },
            { slug: 'docs/guides/image-editing' },
            { slug: 'docs/guides/loras' },
            { slug: 'docs/guides/brews' },
            { slug: 'docs/guides/gallery' },
          ],
        },
        {
          label: 'Team & Usage',
          items: [
            { slug: 'docs/guides/teams' },
            { slug: 'docs/guides/brands' },
            { slug: 'docs/guides/usage-and-limits' },
            { slug: 'docs/guides/xp-and-feats' },
            { slug: 'docs/guides/admin' },
          ],
        },
        {
          label: 'Infrastructure',
          items: [
            { slug: 'docs/guides/storage' },
            { slug: 'docs/guides/database' },
            { slug: 'docs/guides/deploying' },
          ],
        },
        {
          label: 'Contributing',
          items: [
            { slug: 'docs/contributing' },
            { slug: 'docs/contributing/development-setup' },
            { slug: 'docs/contributing/contributing-to-docs' },
            { slug: 'docs/contributing/contributing-to-cli' },
            { slug: 'docs/guides/adding-providers' },
            { slug: 'docs/contributing/code-style' },
            { slug: 'docs/contributing/issues-and-requests' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'docs/reference' },
        },
        {
          label: 'Releases',
          items: [
            { slug: 'docs/changelog' },
          ],
        },
      ],
      lastUpdated: true,
    }),
  ],
});
