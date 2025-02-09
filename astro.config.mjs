import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), svelte()],
  site: 'https://mjakinowittering.github.io',

  vite: {
    plugins: [tailwindcss()]
  }
})