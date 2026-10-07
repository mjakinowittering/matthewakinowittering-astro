---
name: components-block
description: >-
    The shared primitives in src/components/ui/ (Section, SectionHead, Pill,
    Card, Button, ExternalTextLink, Icon, Doodle), the page chrome in site/
    (Nav, SiteFooter, BackToTop): their props, when to use each, and when a new
    primitive is justified. Use whenever building or editing any section or
    card, adding a button, link, pill or icon, changing the nav or footer, or
    tempted to write a section wrapper, heading or link by hand.
---

# Block components

Primitives know nothing about content collections. They take plain props and
slots, and every section is assembled from them. Before writing markup for a
wrapper, heading, card, button, pill, icon or external link, use the primitive.

Their values come from the reference pack in `docs/design/reference/` (see
**`design-brief`**). Where the reference's markup sizes a box as `content-box`
(a `min-height` or `width` that excludes padding and border), the primitive says
`box-content` so it measures the same; Tailwind's default is `border-box`.

## Catalogue

### `Section`

```astro
<Section id="learning" alt class="gap-8">…</Section>
```

| Prop    | Type                               | Default     | Does                                       |
| ------- | ---------------------------------- | ----------- | ------------------------------------------ |
| `id`    | `string`                           | none        | anchor target for the nav links            |
| `alt`   | `boolean`                          | `false`     | the sand band instead of base              |
| `pad`   | `'section' \| 'hero' \| 'contact'` | `'section'` | the vertical padding, from a lookup        |
| `class` | `string`                           | none        | the content column's layout, usually `gap` |

The content column is a flex column, 1120px wide with 24px gutters at every
width (`max-w-page px-6`), and `relative`, so a `Doodle` inside sits in its
padding. `pad` is `py-16 sm:py-24` for most sections; the hero has its own, and
Contact has no bottom padding because the footer below it supplies it. Each
section after the first draws the 1.5px ink rule above itself
(`not-first:border-t`) and clips its overflow. Neighbours alternate `alt`.

### `SectionHead`

```astro
<SectionHead pill={m.nav_projects()} tone="yellow" title={m.projects_title()}>
    <p class="font-marker …">{m.projects_marker()}</p>
</SectionHead>
```

A centred column, 14px apart: the section's pill, its `<h2>`, then the optional
slot, outside the `<h2>`, for what follows it (Projects' marker line, Career's
intro). How I work has no heading beyond its pill, so it puts a `Pill` inside
its own `<h2>` instead.

### `Pill`

```astro
<Pill tone="green">{m.nav_career()}</Pill>
<Pill tone="teal" href="/#contact">{m.nav_contact()}</Pill>
```

An outlined, fully round label in a section's index-card colour (`tone`:
`yellow`, `blue`, `green`, `pink`, `teal`). As a label it is 12px bold uppercase
with wide tracking; with `href` it is a sentence-case 14px link pill, as on the
404 page. The tones belong to their sections (`src/lib/sections.ts`); never pick
one for decoration.

### `Card`

```astro
<Card as="li" shape="tile" class="px-5.5 py-5">…</Card>
<Card as="article" shadow class="p-6 sm:p-8">…</Card>
```

The raised surface: card white with a 1.5px ink outline. `as` is `div`, `li` or
`article`; `shape` is `card` (16px, the default), `tile` (14px, the stat cards)
or `panel` (20px, the contact panel); `shadow` adds the large `8px 8px 0` offset
(the degree card); `class` sets padding and layout.

### `Button`

```astro
<Button href="#projects" icon={ArrowDown01Icon} iconAfter>
    {m.hero_see_projects()}
</Button>
<Button href={sourceUri} variant="ghost" external icon={SourceCodeIcon}>
    {m.projects_view_source()}
</Button>
```

| Prop        | Type                   | Default     | Does                                 |
| ----------- | ---------------------- | ----------- | ------------------------------------ |
| `href`      | `string`               | required    | it is always a link                  |
| `variant`   | `'primary' \| 'ghost'` | `'primary'` | tangerine fill, or card white        |
| `size`      | `'md' \| 'lg'`         | `'md'`      | `lg` is the 404 page's larger button |
| `external`  | `boolean`              | `false`     | new tab with `rel="noopener"`        |
| `icon`      | a Hugeicons icon       | none        | an 18px icon beside the label        |
| `iconAfter` | `boolean`              | `false`     | the icon after the label, for arrows |

Both variants are outlined in ink with ink text (15px, semibold, 44px tall), on
a hard `0 4px 0` ink edge; hovering or pressing moves it down 2px onto a 2px
edge. One primary per group, the action Matthew most wants taken; the rest are
ghost.

### `ExternalTextLink`

```astro
<ExternalTextLink href={organisation.data.uri}>
    {organisation.data.name}
</ExternalTextLink>
```

An inline text link opening in a new tab, styled with the `link` utility.
`arrow` adds a 14px trailing arrow, as on the Certificate links; organisation
names and View course go without. An optional `class` replaces the `link` style.

`Button external` and `ExternalTextLink` are the one home for new-tab links:
both add the visually hidden `external_new_tab` message ("(opens in a new tab)")
that `CLAUDE.md`'s Accessibility section asks for. Never write `target="_blank"`
by hand.

### `Icon`

```astro
<Icon icon={Mail01Icon} class="size-5" />
<Icon icon={CheckmarkBadge01Icon} label={iconLabel} />
```

Renders a Hugeicons Free icon (imported from `@hugeicons/core-free-icons`) as
static inline SVG in `currentColor`, so icons ship no JavaScript. Without
`label` it is decorative (`aria-hidden`); with one it gets `role="img"` and that
`aria-label`, for an icon that carries meaning. Size it with a `size-*` class.
Pick names from the package; never mix in another set. The hero's swish, the
bat, Learning's arrow and the starburst are drawn marks from the reference,
inline in their sections, not icons.

### `Doodle`

```astro
<Doodle icon={Idea01Icon} position="top-left" class="size-[38px] -rotate-10" />
```

A decorative ink line icon, always `aria-hidden` and hidden below 640px.
`position` is `top-left` or `bottom-right` (72px in and 4% across, in a
section's padding) or `top-right` (inside the contact panel). `class` is
required: each doodle's size and tilt are copied from the reference. Placement
rules are in **`design-brief`**, Doodles and stickers.

### `Nav`, `SiteFooter` and `BackToTop`

The sticky header (the `header` landmark) and the footer. The header is on the
page base with an ink bottom edge. `Nav` shows the name, linking home; the
sections in `src/lib/sections.ts` marked `inNav`, in a `nav` labelled
"Sections", with hrefs rooted at `/` so they work from the 404 page; and, from
640px, 44px square buttons for each social in `src/lib/socials.ts` and email,
each icon-only with an `aria-label`. From 900px (the `nav:` breakpoint) the
links sit inline; below it they move into a native `popover` menu opened by an
icon-only `<button popovertarget>` labelled "Menu", which the browser announces
as expanded or collapsed and closes on Escape or a tap outside. Below 640px the
menu also carries the socials, so they stay reachable on a phone. A short inline
script closes it after a link is followed.

A 4px progress bar runs along the header's top edge: a `rule` track with a
tangerine fill grown by a CSS scroll-driven animation (`scroll-progress` in
`global.css`), `aria-hidden` and absent where unsupported. `progress={false}`
leaves it out, as the 404 page does. The header's height, bar included, is the
`spacing-header` token, which the menu's `top-header` and `html`'s
`scroll-padding-top` also read.

Below 900px the header collapses as the reader scrolls (the why is in
**`design-brief`**, Header). The `<header>` is the sticky element and is
transparent; inside it, the bar (`#site-progress`, `relative z-10`, opaque) sits
above the inner part (`#site-header-inner`), which holds everything else. Nav's
script sets `data-hidden` on the `<header>`, and the classes
`max-nav:group-data-hidden:-translate-y-full` slide the inner part up behind the
bar while `max-nav:data-hidden:pointer-events-none` lets taps through the empty
box. So the attribute does nothing at 900px and wider. The script:

- reads the scroll once per animation frame from a passive listener, clamped to
  the page so rubber-banding doesn't count
- hides after 10px down and shows after 10px up, measured from where it last
  changed or held; it always shows within the header's height of the top, and
  never hides while the menu is open
- shows the header on `focusin`; `global.css` moves the header's scroll area
  down (`scroll-margin`) so focusing one of its controls never makes the browser
  scroll the page to clear the padding
- on a phone, sets `scroll-padding-top` per in-page link click: the bar's height
  when the jump goes down (the header will hide), bar plus header when it goes
  up

`BackToTop` is a link to `#main`, the skip link's target, rendered at the end of
the homepage and hidden from 900px (`nav:hidden`). The browser's own fragment
navigation scrolls to the top and moves focus to `main`, so the link needs no
script to work; a small script only sets `data-shown` past one screen down and
removes it within half a screen of the top. Until then it is `invisible`, out of
the tab order, so without JavaScript it never shows.

`SiteFooter` is the copyright line only; its year is `new Date().getFullYear()`,
so it is right at each build. On the homepage it follows the contact panel with
no rule; `ruled` puts it under a hairline, as on the 404 page.

## Writing a new primitive

Only when the same markup is needed in **two** places (YAGNI). Then:

- It goes in `src/components/ui/`, named for what it is, PascalCase, with a line
  in `ui/index.ts`; import it as `{ Name } from '@components/ui'`
- `interface Props` with defaults set in the destructure:
  `const { size = 'md' } = Astro.props;`
- Variants are a lookup object fed into `class:list`, as `Button`, `Pill` and
  `Doodle` do, never a chain of ternaries
- No content collection imports, no hardcoded copy; text arrives by prop or
  slot, or from `messages/en.json` for the primitive's own labels
- Colours from tokens only (see **`styling`**)
- Meets `CLAUDE.md`'s Accessibility rules from the first commit: a visible focus
  style, and any label from `messages/en.json`
- Replace the duplicated markup with it in the same commit
