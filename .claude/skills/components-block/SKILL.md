---
name: components-block
description: >-
    The shared primitives in src/components/ui/ (Section, SectionHead, Pill,
    Card, Button, ExternalTextLink, Icon, Doodle), the page chrome in site/
    (Nav, SiteFooter) and the island in islands/ (EventDescription): their
    props, when to use each, and when a new primitive is justified. Use whenever
    building or editing any section or card, adding a button, link, pill or
    icon, changing the nav or footer, or tempted to write a section wrapper,
    heading or link by hand.
---

# Block components

Primitives know nothing about content collections. They take plain props and
slots, and every section is assembled from them. Before writing markup for a
wrapper, heading, card, button, pill, icon or external link, use the primitive.

## Catalogue

### `Section`

```astro
<Section id="career" alt>…</Section>
```

| Prop  | Type      | Default | Does                            |
| ----- | --------- | ------- | ------------------------------- |
| `id`  | `string`  | none    | anchor target for the nav links |
| `alt` | `boolean` | `false` | the sand band instead of base   |

Owns the vertical rhythm (`py-16 sm:py-20`) and the 1120px container
(`max-w-280`, 16px gutter on a phone). The container is `relative`, so a
`Doodle` placed inside sits in the section's padding. Neighbours alternate
`alt`. Career, Learning and contact narrow their content to a centred 760px
column (`mx-auto max-w-190`) inside it.

### `SectionHead`

```astro
<SectionHead pill={m.nav_projects()} tone="yellow" title={m.projects_title()}>
    <p class="font-marker …">{m.projects_marker()}</p>
</SectionHead>
```

The section's pill, then its `<h2>`. The optional slot sits beside the heading,
outside the `<h2>`, for a marker accent. How I work has no heading beyond its
pill, so it puts a `Pill` inside its own `<h2>` instead.

### `Pill`

```astro
<Pill tone="green">{m.nav_career()}</Pill>
<Pill tone="teal" href="/#contact">{m.nav_contact()}</Pill>
```

An outlined, fully round label in a section's index-card colour (`tone`:
`yellow`, `blue`, `green`, `pink`, `teal`). With `href` it is a link, as on the
404 page. The tones belong to their sections (`src/lib/sections.ts`); never pick
one for decoration.

### `Card`

```astro
<Card as="li" class="p-6">…</Card>
<Card panel class="p-10">…</Card>
```

The raised surface: card white, 1.5px ink outline, 16px radius. `as` is `div` or
`li` (the stat cards are a list); `panel` adds the contact panel's `8px 8px 0`
shadow; `class` sets padding and layout.

### `Button`

```astro
<Button href="#projects">{m.hero_see_projects()}</Button>
<Button href={sourceUri} variant="ghost" external>
    {m.projects_view_source()}
</Button>
```

| Prop       | Type                   | Default     | Does                          |
| ---------- | ---------------------- | ----------- | ----------------------------- |
| `href`     | `string`               | required    | it is always a link           |
| `variant`  | `'primary' \| 'ghost'` | `'primary'` | tangerine fill, or card white |
| `external` | `boolean`              | `false`     | new tab with `rel="noopener"` |

Both variants are outlined in ink with ink text, on a hard `0 4px 0` ink edge
that sinks to 3px when pressed. One primary per group, the action Matthew most
wants taken; the rest are ghost.

### `ExternalTextLink`

```astro
<ExternalTextLink href={organisation.data.uri}>
    {organisation.data.name}
</ExternalTextLink>
```

An inline text link with a trailing arrow icon, opening in a new tab, styled
with the `link` utility. `size` (`'sm'` or `'md'`) sizes the icon only. An
optional `class` replaces the `link` style.

`Button external` and `ExternalTextLink` are the one home for new-tab links:
both add the visually hidden `external_new_tab` message ("(opens in a new tab)")
that `CLAUDE.md`'s Accessibility section asks for. Never write `target="_blank"`
by hand.

### `Icon`

```astro
<Icon icon={Moon02Icon} class="size-6" />
<Icon icon={CheckmarkBadge01Icon} label={iconLabel} />
```

Renders a Hugeicons Free icon (imported from `@hugeicons/core-free-icons`) as
static inline SVG in `currentColor`, so icons ship no JavaScript. Without
`label` it is decorative (`aria-hidden`); with one it gets `role="img"` and that
`aria-label`, for an icon that carries meaning. Size it with a `size-*` class.
Pick names from the package; never mix in another set.

### `Doodle`

```astro
<Doodle icon={BulbIcon} position="top-left" />
```

A decorative line icon in a section's padding, `top-left` or `bottom-right`,
hidden below tablet width and always `aria-hidden`. At most two per section, one
in each corner (`design-brief`, Doodles and stickers).

### `EventDescription.svelte`

The duration of an event ("7 years 3 months"), from
`calcLengthInYearsAndMonths`. Career and Learning mount it `client:only` **only
when the event is ongoing**, so the duration counts on in the browser; a
finished event renders it at build time with no JavaScript. Because directives
cannot be spread or made conditional, callers branch on the directive and spread
`eventDates` into each branch (`entries/Role.astro` shows it). It lives in
`src/components/islands/` and is imported by path, never through a barrel. It
renders plain text, not an `aria-live` region, so a screen reader reads it once.

### `Nav` and `SiteFooter`

The sticky header (the `header` landmark) and the footer. `Nav` shows the name,
linking home, and the sections in `src/lib/sections.ts` marked `inNav`; their
hrefs are rooted at `/` so they work from the 404 page. From 900px (the `nav:`
breakpoint) the links sit inline; below it they move into a native `popover`
menu opened by a real "Menu" `<button popovertarget>`, which the browser
announces as expanded or collapsed and closes on Escape or a tap outside. A
short inline script closes it after a link is followed. The header's height is
the `spacing-header` token, which the menu's `top-header` and `html`'s
`scroll-padding-top` also read. A tangerine progress bar along its bottom edge
is a CSS scroll-driven animation (`scroll-progress` in `global.css`),
`aria-hidden` and absent where unsupported.

`SiteFooter` is the copyright line only; its year is `new Date().getFullYear()`,
so it is right at each build. The social links live in the contact panel, read
from `src/lib/socials.ts`.

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
