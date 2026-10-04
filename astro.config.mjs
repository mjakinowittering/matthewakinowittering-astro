// @ts-check
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://mjakinowittering.github.io',
    integrations: [mdx(), svelte()],

    vite: {
        plugins: [
            tailwindcss(),
            paraglideVitePlugin({
                project: './project.inlang',
                outdir: './src/paraglide',
                // English is the only locale, so always resolve to it.
                strategy: ['baseLocale']
            })
        ]
    }
});
