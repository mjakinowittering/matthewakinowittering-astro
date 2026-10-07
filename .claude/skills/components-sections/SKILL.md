---
name: components-sections
description:
    The page sections in src/components/sections/ and the entries/ they render,
    how Career and Learning join events to organisations, Layout.astro and the
    pages. Use whenever changing how a section renders, debugging an event or
    organisation missing from the page, changing sort order, adding a new
    section, editing <head> metadata or sharing tags, or touching the 404 page.
---

# Sections, layout and pages

## The sections

`pages/index.astro` composes them in this order (anchors and bands are in
**`project-structure`**):

| Section    | Component           | Reads                                                        |
| ---------- | ------------------- | ------------------------------------------------------------ |
| Hero       | `sections/Hero`     | `blurbs/hero.mdx`, `accomplishments`, the career start       |
| Projects   | `sections/Projects` | `projects`, sorted by `index`                                |
| How I work | `sections/HowIWork` | `blurbs/how-i-work.md`                                       |
| Career     | `sections/Career`   | `blurbs/career.md`, `employment` events, their organisations |
| Learning   | `sections/Learning` | `education` and `training` events, their organisations       |
| Contact    | `sections/Contact`  | `blurbs/contact.md`, `src/lib/socials.ts`                    |

## How a section is built

1. Fetch its data in the frontmatter (`getEntry` for a blurb, `getCollection`
   for a list), sorting by `index` or date
2. `render()` any content body into `<Content />`, falling back to
   `m.content_not_found()`
3. Return `<Section>` → `<SectionHead>` (pill, tone, title) → its body, with at
   most two `Doodle`s. Short labels are messages (see **`i18n-messages`**);
   longer copy is a blurb (see **`content-blurbs`**)

A rendered content body sits in a plain wrapper that sets its size and colour,
for example `<div class="text-muted max-w-[64ch] text-[15.5px]">`, with the
values taken from the reference for that place (see **`styling`**, Content
bodies).

Every section is drawn in `docs/design/reference/`, the visual source of truth
(see **`design-brief`**). A change to how a section looks reads its values from
the reference `.html`, and `npm run compare` checks the result.

Blurb-driven sections guard a missing entry with
`if (!blurb) return Astro.redirect('/404');`. Keep the pattern for any new
`getEntry`.

## Events and organisations

Career and Learning both turn events into rows, and both resolve each event's
organisation through `getOrganisation(event)` in `src/lib/organisations.ts`. It
reads the event's `organisationId` reference (organisation entries are keyed by
their frontmatter `id`, see `content.config.ts`) and **throws when the
organisation doesn't exist**, so a mistyped `organisationId` fails the build.

- **Career** (`sections/Career.astro`) takes every `employment` event, newest
  first, as one flat list in a centred 760px `<ol>`. `entries/Role.astro`
  renders a row's two flex children: the date range in a 170px column, then
  "role at organisation" as the `<h3>` with the organisation linked and the
  body. On a phone the date wraps above. Rows are divided by 1.5px ink rules as
  wide as the list. No duration is shown
- **Learning** (`sections/Learning.astro`) renders each `education` event as a
  featured `entries/Degree.astro` card (mortarboard badge, years and university,
  title, body, View course; no duration), then the "and still learning…" marker
  line, then one outlined card listing the `training` events grouped by
  provider. `entries/Provider.astro` is one native `<details>`: its `<summary>`
  shows the provider's number (01, 02…, hidden from screen readers, as the
  `<ol>` already numbers it), name, course count and latest course date; its
  `<ol>` holds the courses. Only the first provider starts open. Walking the
  courses newest first meets each provider at its latest course, so providers
  come out ordered by their most recent course with no extra sort. A course row
  shows its name, date and, only with a `uri`, a Certificate link whose
  accessible name includes the course. Course bodies are not rendered, and the
  provider's name is not a link, as a link inside a `<summary>` would be

### When something is missing from the page

1. The build fails naming the event: its `organisationId` matches no
   organisation `id`
2. The event's `type` is wrong: `training` and `education` both land in
   Learning, but as a row and a card respectively, and `employment` only in
   Career
3. The event file is outside `src/content/events/`, so the glob never loads it

Prefer fixing the content over loosening the code.

## Adding a section

1. Check scope: a new kind of content should be raised before it is built
2. If it needs content, add a collection to `content.config.ts` and a content
   skill for it in the same change
3. Draw it first (**`ascii-wireframes`**), following **`design-brief`**; give it
   an index-card tone, which means a new `ic-` token, so raise it first
4. Create `src/components/sections/<Section>.astro` in the shape above, and add
   it to `sections/index.ts`; a part rendering one entry goes in `entries/` and
   its barrel
5. Add it to `pages/index.astro` in position, setting `alt` so bands alternate
6. Add it to `src/lib/sections.ts` (label, href, tone, `inNav`) so the header
   and the 404 page link to it, with a `nav_` message for its name
7. Add a row to the page order table in **`project-structure`** and to the
   Skills Index in `CLAUDE.md` if you added a skill

## `Layout.astro`

Takes `metaData: { title?, description?, additionalMetaTags?, noindex? }`.

- The `<title>` is the `site_title` message (`"<title> - <site_name>"`), or just
  `site_name` when `title` is absent. `pages/index.astro` builds the description
  from the `site_description` message and the years in product, and passes the
  Google site-verification tag through `additionalMetaTags`
- Sharing tags are set here once, for every page: a canonical link built from
  `Astro.url` and `site`, Open Graph (`og:type`, site name, `en_GB` locale,
  title, description, url, and `og:image` pointing at the 1200 by 630
  `public/og.png` with its width, height and the `og_image_alt` message) and the
  Twitter card (`summary_large_image`, with the same image and alt).
  `noindex: true` swaps the canonical and `og:url` for
  `<meta name="robots" content="noindex">`
- Figtree and Permanent Marker load from Google Fonts here

It is also the page shell `CLAUDE.md`'s Accessibility section sets out:
`<html lang="en-GB">`, the viewport tag, and the "Skip to content" link as the
first focusable element, jumping to `<main id="main">`. The default slot lands
in `main`; the `header` and `footer` named slots sit either side of it, so each
page passes `<Nav slot="header" />` and `<SiteFooter slot="footer" />`. `Nav`
renders the `header` landmark itself and `SiteFooter` the `footer`.

## Pages

- `index.astro` composes the sections, then `BackToTop`, and sets the page
  metadata. It holds no markup of its own beyond that list
- `404.astro` uses the shared header (with `progress={false}`) and the `ruled`
  footer around a centred 640px block: a large decorative "404" (`aria-hidden`),
  the `<h1>`, one line, a `size="lg"` "Back to the homepage" button and a
  "Sections" `nav` of every section in `sections.ts` as a `Pill` link. It passes
  `noindex`. Its copy is the `not_found_` messages
