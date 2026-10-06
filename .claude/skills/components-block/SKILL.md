---
name: components-block
description: >-
    The shared primitives in src/components/block/ (Section, SectionHead, Badge,
    Button, ExternalTextLink, Nav, SiteFooter): their props, when to use each,
    and when a new primitive is justified. Use whenever building or editing any
    section or card, adding a button or link, changing the nav or footer, or
    tempted to write a section wrapper, heading or link by hand.
---

# Block components

Primitives know nothing about content collections. They take plain props and
slots, and every section is assembled from them. Before writing markup for a
wrapper, heading, button or external link, use the primitive.

## Catalogue

### `Section`

```astro
<Section id="career" alt>…</Section>
```

| Prop  | Type      | Default | Does                                             |
| ----- | --------- | ------- | ------------------------------------------------ |
| `id`  | `string`  | none    | anchor target for Nav links                      |
| `alt` | `boolean` | `false` | sand `bg-panel` band with top and bottom borders |

Owns the vertical rhythm (`py-20`) and the content width (`max-w-295 px-8`).
Every page section except About uses it. Alternate `alt` between neighbours.

### `SectionHead`

```astro
<SectionHead title={m.career_title()} subtitle={m.career_subtitle()}>
    <Badge slot="badge" label={m.career_badge()}>
        <Building size={26} stroke-width={1.5} />
    </Badge>
</SectionHead>
```

The `<h2>` and optional subtitle, with a `badge` slot on the right. Every
`Section` starts with one.

### `Badge`

A round icon with a small uppercase label under it, made for `SectionHead`'s
badge slot. Props: `label`. Slot: one `Icon` at `class="size-6.5"`, the size
every section uses. The icon is decorative beside its label, so it takes no
`label` and renders `aria-hidden`.

### `Button`

```astro
<Button href="#projects">{m.about_view_projects()}</Button>
<Button href={sourceUri} variant="ghost" external>
    {m.projects_view_source()}
</Button>
```

| Prop       | Type                   | Default     | Does                          |
| ---------- | ---------------------- | ----------- | ----------------------------- |
| `href`     | `string`               | required    | it is always a link           |
| `variant`  | `'primary' \| 'ghost'` | `'primary'` | filled green, or outlined     |
| `external` | `boolean`              | `false`     | new tab with `rel="noopener"` |

One primary per group, the action Matthew most wants taken; the rest are ghost.

### `ExternalTextLink`

```astro
<ExternalTextLink href={uri} size="sm">
    {m.course_view_certificate()}
</ExternalTextLink>
```

An inline text link with a trailing external-link icon, opening in a new tab.
`size` is `'sm'` or `'md'` (default) and sizes the icon only; colour and type
come from the parent. Use it for any off-site text link. An optional `class`
replaces the default hover underline, for a link styled as a pill or a nav item
(the social links pass one).

`Button external` and `ExternalTextLink` are the one home for new-tab links:
both add the visually hidden `external_new_tab` message ("(opens in a new tab)")
that `CLAUDE.md`'s Accessibility section asks for. Never write `target="_blank"`
by hand.

### `Nav` and `SiteFooter`

The sticky top bar (the `header` landmark) and the footer. `Nav` holds
`navLinks` (anchor links) and the social links. From `sm` up they sit inline;
below `sm` both move into a native `popover` menu opened by a real "Menu"
`<button popovertarget>`, which the browser announces as expanded or collapsed
and closes on Escape or a tap outside. A short inline script closes it after a
link is followed. The header's fixed `h-14` is what the menu's `top-14` lines up
with; change both together. Adding a section to the nav means adding an entry to
`navLinks` whose `href` matches that section's `id`.

Both, and the About section, map over `socials` from `src/lib/socials.ts` and
render each through `ExternalTextLink`; add or change a social link there, never
in a component. The footer's year is `new Date().getFullYear()`, so it is right
at each build.

## Writing a new primitive

Only when the same markup is needed in **two** places (YAGNI). Then:

- It goes in `src/components/block/`, named for what it is, PascalCase
- `interface Props` with defaults set in the destructure:
  `const { size = 'md' } = Astro.props;`
- Variants are a lookup object fed into `class:list`, as `Button` and
  `ExternalTextLink` do, never a chain of ternaries
- No content collection imports, no hardcoded copy; text arrives by prop or
  slot, or from `messages/en.json` for the primitive's own labels
- Colours from tokens only (see **`styling`**)
- Meets `CLAUDE.md`'s Accessibility rules from the first commit: a visible focus
  style, and any label from `messages/en.json`
- Replace the duplicated markup with it in the same commit
