---
name: styling
description:
    Colour tokens, typography scale, prose styling and Tailwind v4 conventions,
    with src/styles/global.css as their home. Use whenever writing or changing
    class strings, picking a colour, font size or spacing, styling content body
    text, adding a token, or fixing anything that looks off-palette, including
    on the 404 page (still a Todo item in README.md).
---

# Styling

Tailwind CSS v4, loaded through the `@tailwindcss/vite` plugin in
`astro.config.mjs` (not an Astro integration), with `@tailwindcss/typography`
for content bodies. There is no `tailwind.config.*`: theme values are declared
in CSS.

## Tokens

`src/styles/global.css` holds every colour in its `@theme` block, with a comment
on each saying what it is for. That file is the one home for the values; do not
copy hex codes into this skill or into components.

| Token family      | Utility examples                             | Used for                                        |
| ----------------- | -------------------------------------------- | ----------------------------------------------- |
| `bg`              | `bg-bg`                                      | the cream page and card surfaces                |
| `panel`           | `bg-panel`                                   | `alt` section bands, avatar ring                |
| `border`          | `border-border`, `bg-border`                 | every border and the timeline line              |
| `ink`             | `text-ink`                                   | headings and emphasised text                    |
| `muted`           | `text-muted`                                 | body copy, dates, labels                        |
| `accent`          | `bg-accent`, `text-accent`                   | primary buttons, prose links                    |
| `accent-strong`   | `text-accent-strong`, `border-accent-strong` | section titles, hovers, icons, the timeline dot |
| `accent-soft`     | `bg-accent-soft`                             | tag pills                                       |
| `accent-contrast` | `text-accent-contrast`                       | text on a filled accent button                  |

The palette is warm cream and sand with one green accent. Rules:

- Never a hex value, `rgb()` or stock palette class (`gray-300`, `white`,
  `black`) in a component. If no token fits, add one to `@theme` with a comment
  arguing for it, then use it
- A token is referenced in arbitrary CSS as `var(--color-<name>)`, as the
  project placeholder's stripe gradient does
- There is no dark theme. Do not add `dark:` variants piecemeal; a dark theme
  would be a whole-palette proposal

## Type

One family: `font-sans`, which is Public Sans (loaded in `Layout.astro`) with a
system fallback. Sizes follow the existing scale; reuse a step rather than
adding one:

| Role                     | Classes                                                                           |
| ------------------------ | --------------------------------------------------------------------------------- |
| page `<h1>`              | `text-5xl font-extrabold leading-[1.06] tracking-[-0.01em]`                       |
| section title (`<h2>`)   | `text-[32px] font-extrabold leading-[1.15] tracking-[-0.01em] text-accent-strong` |
| section subtitle         | `text-[15px] font-semibold leading-[1.65] text-ink`                               |
| card / timeline `<h3>`   | `text-lg font-bold` (project cards `text-2xl`)                                    |
| lead body                | 17px, `leading-[1.65]`                                                            |
| standard body            | 15px, `leading-[1.65]`                                                            |
| compact body             | 13.5px to 14px (`text-sm`), `leading-[1.6]`                                       |
| meta line (dates, roles) | `text-[13px] font-bold text-muted`                                                |
| tiny labels              | 10 to 11px, `uppercase font-bold`, wide tracking                                  |

Arbitrary values (`text-[13px]`, `gap-4.5`, `max-w-295`) are normal in this
codebase and fine; matching an existing value matters more than avoiding
brackets.

## Prose (content bodies)

Every rendered content body sits in a wrapper like:

```astro
<div
    class="prose text-muted prose-p:text-sm prose-p:leading-[1.6] prose-p:text-muted mt-2 max-w-[64ch]"
>
    <Content />
</div>
```

- `prose-p:*` modifiers set paragraph size and colour per context; copy them
  from the nearest sibling component
- Cap the measure with `max-w-[56ch]` to `max-w-[70ch]` for readability
- Site-wide prose overrides live in `global.css`: links are `text-accent` and
  semibold, underlined on hover; `<time>` gets a dashed accent underline. Change
  those there, not per component

## Class strings

- Prettier sorts classes (`prettier-plugin-tailwindcss`); run `npm run format`.
  ESLint's `tailwindcss` rules check the rest, with ordering left to Prettier
- Conditional classes use `class:list={[base, cond && 'x', variants[variant]]}`
- Interactive elements get a visible hover state (`hover:text-ink`,
  `hover:border-accent-strong`), and links that look like buttons get
  `no-underline`
- Mobile first: base classes for small screens, then `sm:` / `md:` upwards.
  Check every change at a phone width
