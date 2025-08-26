// @ts-check
import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'

import tailwindcss from '@tailwindcss/vite'

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    site: 'https://mjakinowittering.github.io',
    integrations: [mdx(), svelte()],

    vite: {
        plugins: [tailwindcss()]
    }
})