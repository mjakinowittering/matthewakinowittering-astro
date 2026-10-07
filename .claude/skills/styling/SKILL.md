---
name: styling
description:
    Colour tokens, typography scale, content body styling and Tailwind v4
    conventions, with src/styles/global.css as their home. Use whenever writing
    or changing class strings, picking a colour, font size or spacing, styling
    content body text, adding a token, or fixing anything that looks
    off-palette.
---

# Styling

Tailwind CSS v4, loaded through the `@tailwindcss/vite` plugin in
`astro.config.mjs` (not an Astro integration). There is no `tailwind.config.*`:
theme values are declared in CSS. Why the site looks as it does is in
**`design-brief`**; this skill is how the code does it.

## Tokens

`src/styles/global.css` holds every design value in its `@theme` block, with a
comment on each saying what it is for. That file is the one home for the values;
do not copy hex codes into this skill or into components.

| Token family                                | Utility examples                 | Used for                                                                                                                  |
| ------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `base`, `sand`                              | `bg-base`, `bg-sand`             | the page and header, and the alternate section bands (`Section alt`)                                                      |
| `card`                                      | `bg-card`                        | every raised surface: cards, the contact panel, the header's buttons                                                      |
| `ink`                                       | `text-ink`, `border-ink`         | headings, outlines, the rules between sections and rows, shadows, focus                                                   |
| `muted`                                     | `text-muted`                     | body copy, dates, captions                                                                                                |
| `rule`                                      | `bg-rule`, `border-rule`         | the progress bar's track, the 404 footer's top edge; decorative only                                                      |
| `hairline`                                  | `border-hairline`                | dividers between course rows in Learning; decorative only                                                                 |
| `accent`                                    | `bg-accent`, `decoration-accent` | tangerine: primary buttons, link underlines, the hero swish, the bar                                                      |
| `ic-*`                                      | `bg-ic-yellow` … `bg-ic-teal`    | one per section, its pill through `Pill`'s `tone`; pink also the degree badge                                             |
| `ic-apricot`                                | `fill-ic-apricot`                | the hero sticker only                                                                                                     |
| `radius-card`, `-tile`, `-panel`, `-button` | `rounded-card`, `rounded-tile`   | 16px cards; 14px stat cards and badge; 20px contact panel; 10px buttons                                                   |
| `shadow-offset`, `-sm`, `-press`, `-panel`  | `shadow-offset`, `shadow-panel`  | the ink edge under buttons (4px, 3px on header squares, 2px pressed); the 8px offset under the hero photo and degree card |
| `breakpoint-nav`                            | `nav:block`, `nav:hidden`        | 900px, where the header's links replace the menu button                                                                   |
| `container-page`                            | `max-w-page`                     | 1168px: the 1120px content column plus its 24px gutters                                                                   |
| `spacing-header`                            | `h-header`, `top-header`         | the header's height with its bar; `scroll-padding-top`'s default, which Nav's script overrides per jump on a phone        |

The values match the reference pack in `docs/design/reference/`, which
**`design-brief`** makes the visual source of truth: a new value is read from
its `.html`, never estimated from the screenshots.

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
edge; `rule` on `base` is 1.18:1 and `hairline` on `card` 1.39:1, which is why
they only ever divide. A new token or pairing is measured and added here.

## Type

`font-sans` is Figtree and `font-marker` is Permanent Marker, both loaded in
`Layout.astro` from Google Fonts. The marker is only for the five places the
marker rule in **`design-brief`** names, always real text, never body copy.
Sizes in use; reuse a step rather than adding one:

| Role                           | Classes                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| body (set on `<body>`)         | `text-[16px] leading-[1.6]`; everything inherits the 1.6 line height                |
| hero `<h1>`                    | `text-[40px] sm:text-[58px] font-extrabold leading-[1.08] tracking-[-0.035em]`      |
| section `<h2>` (`SectionHead`) | `text-[30px] sm:text-[40px] font-extrabold leading-[1.15] tracking-[-0.03em]`       |
| How I work statement           | `text-[26px] sm:text-[36px] font-bold leading-[1.3] tracking-tight`                 |
| card `<h3>`                    | `text-[24px]` (projects) or `text-[28px]` (degree) `font-extrabold`                 |
| row `<h3>`                     | `text-[19px] font-bold` (roles), `text-[22px] font-extrabold` (providers)           |
| lead body                      | `text-[18.5px]` in the hero, `text-[19px]` in How I work                            |
| body                           | inherited 16px; `text-[15.5px]` in role bodies                                      |
| meta (dates)                   | `text-[12.5px] font-bold tracking-[0.06em] uppercase text-muted`                    |
| pill                           | `text-[12px] font-bold tracking-[0.06em] uppercase`; link pills `text-[14px]`       |
| marker accent                  | `font-marker`, `text-[22px]` to `text-[30px]`, a slight rotate; stats `text-[44px]` |

Arbitrary values (`text-[15.5px]`, `max-w-[56ch]`) are normal in this codebase
and fine; matching the reference matters more than avoiding brackets.

## Content bodies

A rendered content body sits in a plain wrapper that sets its size and colour,
copied from the reference for that place, for example
`<div class="text-muted max-w-[64ch] text-[15.5px]"><Content /></div>`.
Paragraphs have no margins (Tailwind's preflight), so a body with several
paragraphs sets the gap between them on the wrapper (`flex flex-col gap-2.5`, as
the degree card does). There is no typography plugin.

- A link written in a markdown body has no class, and `global.css` gives every
  class-less `<a>` the `link` utility (ink text, tangerine underline that
  thickens on hover and focus). Change that there, not per component
- The `CareerLength` figure in the hero is plain text, styled like the rest of
  its paragraph

## Class strings

- Prettier sorts classes (`prettier-plugin-tailwindcss`); run `npm run format`.
  ESLint's `tailwindcss` rules check the rest, with ordering left to Prettier
- Conditional classes use `class:list={[base, cond && 'x', variants[variant]]}`
- A text link outside prose takes the `link` utility (`ExternalTextLink` does by
  default). Buttons use `Button`, pills `Pill`, outlined surfaces `Card`
- Focus needs nothing per component: one `:focus-visible` rule in `global.css`
  draws a 2px ink ring, offset onto the surrounding surface. Never set
  `outline-none` on a control
- Motion is opt-in: a hover or press movement goes behind `motion-safe:`, and so
  does its `duration-*`, since on its own a duration animates every property
  (the default `transition-property` is `all`), reduced motion or not. The
  progress bar is tied to scrolling, not played, so it needs no guard
- Mobile first, checked at phone, tablet and desktop widths (`CLAUDE.md`,
  Styling)
