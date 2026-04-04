// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
    useTabs: false,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'none',
    plugins: [
        'prettier-plugin-astro',
        'prettier-plugin-tailwindcss',
        'prettier-plugin-astro-organize-imports'
    ],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro'
            }
        }
    ],
    astroOrganizeImportsMode: 'All'
};
