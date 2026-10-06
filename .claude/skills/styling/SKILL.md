---
name: styling
description:
    Colour tokens, typography scale, prose styling and Tailwind v4 conventions,
    with src/styles/global.css as their home. Use whenever writing or changing
    class strings, picking a colour, font size or spacing, styling content body
    text, adding a token, or fixing anything that looks off-palette.
---

# Styling

Tailwind CSS v4, loaded through the `@tailwindcss/vite` plugin in
`astro.config.mjs` (not an Astro integration), with `@tailwindcss/typography`
for content bodies. There is no `tailwind.config.*`: theme values are declared
in CSS. Why the site looks as it does is in **`design-brief`**; this skill is
how the code does it.

## Tokens

`src/styles/global.css` holds every design value in its `@theme` block, with a
comment on each saying what it is for. That file is the one home for the values;
do not copy hex codes into this skill or into components.

| Token family                     | Utility examples                 | Used for                                                         |
| -------------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `base`, `sand`                   | `bg-base`, `bg-sand`             | the page, and the alternate section bands (`Section alt`)        |
| `card`                           | `bg-card`                        | every raised surface: cards, header, contact panel               |
| `ink`                            | `text-ink`, `border-ink`         | headings, outlines, button text, offset shadows, the focus ring  |
| `muted`                          | `text-muted`                     | body copy, dates, captions, doodles                              |
| `rule`                           | `divide-rule`                    | hairlines between Career and Learning rows; decorative only      |
| `accent`                         | `bg-accent`, `decoration-accent` | tangerine: primary buttons, link underlines, the progress bar    |
| `ic-*`                           | `bg-ic-yellow` … `bg-ic-teal`    | one per section's pill, through `Pill`'s `tone`; never elsewhere |
| `ic-apricot`                     | `fill-ic-apricot`                | the hero sticker only                                            |
| `radius-card`, `-button`         | `rounded-card`, `rounded-button` | cards and the panel; buttons and screenshots                     |
| `shadow-offset`, `-sm`, `-panel` | `shadow-offset`, `shadow-panel`  | the hard ink edge under buttons; the contact panel's larger one  |
| `breakpoint-nav`                 | `nav:flex`, `nav:hidden`         | 900px, where the header's links replace the menu button          |
| `spacing-header`                 | `h-header`, `top-header`         | the header's height, also read by `scroll-padding-top` on `html` |

Rules:

- **Stock Tailwind colours are switched off** (`--color-*: initial`), so
  `gray-300`, `white` and `black` don't compile. If no token fits, add one to
  `@theme` with a comment arguing for it, then use it
- A token is referenced in arbitrary CSS as `var(--color-<name>)`, as the
  project placeholder's stripe gradient does
- **Tangerine is never text** and never an edge on its own: a primary button has
  an ink outline, and a link is marked by its underline, not its colour. Text on
  a tangerine fill is ink
- `text-base` would be ambiguous now that `base` is a colour, and ESLint flags
  it; write a font size as `text-[16px]`
- There is no dark mode, and that is decided (`CLAUDE.md`, Styling): no `dark:`
  variants, no second palette

### Contrast

Every pairing in use meets `CLAUDE.md`, Accessibility. Measured:

| Foreground | On                             | Ratio          |
| ---------- | ------------------------------ | -------------- |
| `ink`      | `base`, `sand`, `card`         | 15.9 to 17.5:1 |
| `ink`      | each `ic-*` tint, `ic-apricot` | 13.6 to 15.0:1 |
| `ink`      | `accent` (primary button text) | 6.5:1          |
| `muted`    | `base`, `sand`, `card`         | 8.5 to 9.3:1   |

`accent` on the page is 2.5 to 2.7:1, which is why it is never text or a lone
edge; `rule` on `card` is 1.24:1, which is why it only ever divides. A new token
or pairing is measured and added here.

## Type

`font-sans` is Figtree and `font-marker` is Permanent Marker, both loaded in
`Layout.astro` from Google Fonts. The marker is only for the five places the
marker rule in **`design-brief`** names, always real text, never body copy.
Sizes in use; reuse a step rather than adding one:

| Role                           | Classes                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------- |
| hero `<h1>`                    | `text-[40px] sm:text-[58px] font-extrabold leading-[1.05] tracking-[-0.02em]` |
| section `<h2>` (`SectionHead`) | `text-[32px] sm:text-[42px] font-extrabold leading-[1.1] tracking-[-0.01em]`  |
| card / row `<h3>`              | `text-[20px]` to `text-[24px] font-extrabold`                                 |
| lead body                      | `text-[17px]`, `sm:text-[19px]` in the hero, `leading-[1.65]`                 |
| body                           | `text-[15px] leading-[1.65]`                                                  |
| meta (dates, durations)        | `text-sm font-semibold text-muted`                                            |
| pill                           | `text-[13px] font-bold`                                                       |
| marker accent                  | `font-marker`, `text-xl` to `text-2xl`, a slight rotate                       |

Arbitrary values (`text-[15px]`, `max-w-190`) are normal in this codebase and
fine; matching an existing value matters more than avoiding brackets.

## Prose (content bodies)

Every rendered content body sits in a wrapper like:

```astro
<div
    class="prose text-muted prose-p:text-[15px] prose-p:leading-[1.65] prose-p:text-muted mt-3"
>
    <Content />
</div>
```

- `prose-p:*` modifiers set paragraph size and colour per context; copy them
  from the nearest sibling component
- Site-wide prose overrides live in `global.css`: links use the `link` utility
  (ink text, tangerine underline that thickens on hover and focus), and `<time>`
  (the `CareerLength` figure) gets a dashed tangerine underline. Change those
  there, not per component

## Class strings

- Prettier sorts classes (`prettier-plugin-tailwindcss`); run `npm run format`.
  ESLint's `tailwindcss` rules check the rest, with ordering left to Prettier
- Conditional classes use `class:list={[base, cond && 'x', variants[variant]]}`
- A text link outside prose takes the `link` utility (`ExternalTextLink` does by
  default). Buttons use `Button`, pills `Pill`, outlined surfaces `Card`
- Focus needs nothing per component: one `:focus-visible` rule in `global.css`
  draws a 2px ink ring, offset onto the surrounding surface. Never set
  `outline-none` on a control
- Motion is opt-in: a hover or press movement goes behind `motion-safe:`. The
  progress bar is tied to scrolling, not played, so it needs no guard
- Mobile first, checked at phone, tablet and desktop widths (`CLAUDE.md`,
  Styling)
