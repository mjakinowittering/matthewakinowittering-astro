---
name: components-sections
description:
    The page sections in src/components/home/, the Career/Training/Education
    timeline that joins events to organisations, the Svelte duration island,
    Layout.astro and the pages. Use whenever changing how a section renders,
    debugging an event or organisation missing from the page, changing sort
    order or the timeline, adding a new section, editing <head> metadata, or
    touching the 404 page.
---

# Sections, layout and pages

## How a section is built

Every section component follows one shape:

1. Fetch its data in the frontmatter (`getEntry` for a blurb, `getCollection`
   for a list), sorting by `index` or date
2. `render()` any content body into `<Content />`, falling back to
   `m.content_not_found()`
3. Return `<Section>` → `<SectionHead>` (with a `Badge`) → its body. Titles,
   subtitles and badge labels not taken from a blurb are messages (see
   **`i18n-messages`**)

A rendered content body sits in a `prose` wrapper with the section's size
overrides, for example
`class="prose text-muted prose-p:text-[15px] prose-p:leading-[1.65] prose-p:text-muted mt-5 max-w-[70ch]"`.
Copy the nearest sibling's wrapper rather than inventing new sizes (see
**`styling`**).

Blurb-driven sections guard a missing entry with
`if (!blurb) return Astro.redirect('/404');`. Keep the pattern for any new
`getEntry`.

## The timeline

Career, Training and Education share one structure:

```
topics/<employment|training|education>/index.astro    the section
  └── organisation/index.astro                        one timeline entry per organisation
        └── event/Role | Course | Education.astro    one per event, chosen by organisation type
```

### The join, step by step

`topics/employment` and `topics/training`:

1. `getCollection('events')` filtered to their event `type`
2. `getCollection('organisations')` filtered to the matching organisation `type`
3. For each organisation, keep events where
   `event.data.organisationId.id === organisation.data.id`; drop organisations
   with none
4. Derive a `dateFrom` for sorting: the **earliest** role for employers, the
   **latest** course for trainers. This is deliberate: an employer sits where
   the relationship began, a trainer where Matthew last learned there
5. Sort newest first and render an `Organisation` for each, passing `isLast` so
   the final entry draws no connecting line

`topics/education` skips steps 1, 3 and 4: it renders every university in
collection order.

`organisation/index.astro` then **re-queries** events for its organisation,
sorts them newest first, and picks the event component from the organisation's
`type`. It fills the timeline dot when an employer has an event with no
`dateTo`.

### When something is missing from the page

In order of likelihood:

1. `organisationId` does not equal the organisation's frontmatter `id`
   (`reference()` does not check it, so the build passes)
2. The event's `type` does not match the organisation's (`training` under an
   `employer` is filtered out at step 1 or 2)
3. The organisation file is under the wrong `type`
4. The event file is outside `src/content/events/`, so the glob never loads it

Prefer fixing the content over loosening the join.

### Event components

| Component         | Shows                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- |
| `Role.astro`      | title · date range · duration, then the body                                          |
| `Course.astro`    | a `<details>` row: tick if `uri`, title, month; body and certificate link when opened |
| `Education.astro` | title · year range · duration, the body, a course link                                |

`EventDescription.svelte` renders the duration with
`calcLengthInYearsAndMonths`. `Role` mounts it `client:only` **only when the
role is ongoing**, so the duration counts on in the browser; a finished role
renders it at build time with no JavaScript. Because directives cannot be spread
or made conditional, `Role` branches on the directive and spreads `eventDates`
into both. `Education` does not follow this yet; that is a Todo item in
`README.md`. The island renders plain text, not an `aria-live` region, so a
screen reader reads it once (`CLAUDE.md`, Accessibility).

## Adding a section

1. Check scope: a new kind of content should be raised before it is built
2. If it needs content, add a collection to `content.config.ts` and a content
   skill for it in the same change
3. Draw it first (**`ascii-wireframes`**), following **`design-brief`**, and add
   its title, subtitle and badge to `messages/en.json` under a new section
   prefix
4. Create `src/components/home/<section>/index.astro` in the shape above
5. Add it to `pages/index.astro` in position, setting `alt` so bands alternate
6. Give it an `id` and a `navLinks` entry (with an `nav_` message) only if it
   belongs in the nav
7. Add a row to the page order table in **`project-structure`** and to the
   Skills Index in `CLAUDE.md` if you added a skill

## `Layout.astro`

Takes `metaData: { title?, description?, additionalMetaTags? }`. The `<title>`
is the `site_title` message (`"<title> - <site_name>"`), or just `site_name`
when `title` is absent. `pages/index.astro` builds the description from the
`site_description` message and the years of experience, and passes the Google
site-verification tag through `additionalMetaTags`. Public Sans loads from
Google Fonts here. Open Graph and canonical tags belong here too, once, rather
than per page.

It is also the page shell `CLAUDE.md`'s Accessibility section sets out:
`<html lang="en-GB">`, the viewport tag, and the "Skip to content" link as the
first focusable element, jumping to `<main id="main">`. The default slot lands
in `main`; the `header` and `footer` named slots sit either side of it, so
`pages/index.astro` passes `<Nav slot="header" />` and
`<SiteFooter slot="footer" />`. `Nav` renders the `header` landmark itself and
`SiteFooter` the `footer`.

## Pages

- `index.astro` composes the sections and sets the page metadata. It holds no
  markup of its own beyond the section list
- `404.astro` is standalone, with its copy in the `not_found_` messages
