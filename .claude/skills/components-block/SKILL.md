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
badge slot. Props: `label`. Slot: one Lucide icon at
`size={26} stroke-width={1.5}`, the size every section uses. The icon is
decorative beside its label, and Lucide renders it `aria-hidden` by default.

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
come from the parent. Use it for any off-site text link.

`Button external` and `ExternalTextLink` are the one home for new-tab links, so
the new-tab announcement `CLAUDE.md`'s Accessibility section asks for belongs in
them. Neither has it yet; that is a Todo bug in `README.md`.

### `Nav` and `SiteFooter`

The sticky top bar and the footer. `Nav` holds `navLinks` (anchor links, hidden
below the `sm` breakpoint with no alternative on a phone yet, a Todo bug) and
the social links. Adding a section to the nav means adding an entry to
`navLinks` whose `href` matches that section's `id`.

Both, and the About section, map over `socials` from `src/lib/socials.ts`; add
or change a social link there, never in a component. All three write
`target="_blank"` by hand today rather than using a primitive; that is part of
the new-tab Todo bug. The footer's year is `new Date().getFullYear()`, so it is
right at each build.

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
