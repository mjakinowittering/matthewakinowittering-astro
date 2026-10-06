import js from '@eslint/js';
import type { ESLint, Linter } from 'eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import tailwind from 'eslint-plugin-tailwindcss';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            '.astro/**',
            'src/paraglide/**',
            'project.inlang/cache/**',
            // Exported mock-ups, never reformatted or linted
            'docs/design/reference/**',
            '.compare/**'
        ]
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser }
    },
    // Build scripts run in Node, not the browser
    {
        files: ['scripts/**'],
        languageOptions: { globals: globals.node }
    },
    tseslint.configs.recommended,
    // Parse .astro files so their templates are lintable.
    eslintPluginAstro.configs.recommended,
    // Run the Tailwind rules against the class attributes in .astro files.
    // The plugin ships `@typescript-eslint/utils` types that don't structurally
    // match eslint's own `Plugin`/`Config` types even though the runtime shapes
    // are compatible, so we cast the plugin and its recommended config here.
    // `configs.recommended` also only targets JS/TS files by default, hence the
    // manual re-scoping to `.astro` where the class attributes actually live.
    {
        files: ['**/*.astro'],
        plugins: { tailwindcss: tailwind as unknown as ESLint.Plugin },
        rules: {
            ...(tailwind.configs.recommended as Linter.Config).rules,
            // Prettier (prettier-plugin-tailwindcss) already sorts classes and
            // uses a different algorithm, so leave ordering to it to avoid noise.
            'tailwindcss/classnames-order': 'off'
        },
        settings: {
            tailwindcss: {
                cssConfigPath: './src/styles/global.css'
            }
        }
    }
]);
