// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
    printWidth: 80,
    proseWrap: 'always',
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'none',
    useTabs: false,
    plugins: [
        'prettier-plugin-astro',
        '@ianvs/prettier-plugin-sort-imports',
        'prettier-plugin-tailwindcss'
    ],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro'
            }
        }
    ]
};
