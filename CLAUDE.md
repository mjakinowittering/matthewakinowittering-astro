# CLAUDE.md

This file defines the conventions, patterns, and architecture for this project.
Follow these guidelines precisely. Do not deviate without explicit instruction.

This is the **personal site of Matthew Akino-Wittering**, a Product Manager. It
is a single static page that tells potential employers more than a LinkedIn
profile can: who he is, how he works, where he has worked, what he has built,
and what he has studied.

**It is a hiring tool, used quietly.** Matthew is open to the right role but not
announcing it: nothing on the page says "open to work", and nothing would be
awkward if a current colleague landed on it. Getting in touch is easy but
understated. The page positions him as a **product leader and builder**; how
that shows up in layout, copy and look is in **`design-brief`**.

The bar for this project is **the content being right**. A wrong date, a broken
link or a role silently missing from the timeline costs more than any visual
flaw. Every fact on the page comes from a validated content file, and the build
is the check that it still does. Favour accuracy and plainness over cleverness.

**Scope — one page, by design.** The site builds to static files and has no
server, no CMS, no database, no analytics and no forms. Any proposal that adds a
blog, a second page type, a backend, tracking, or a contact form is out of scope
and should be raised before it is built, not after.

## Principles

They apply to code and to guidance (this file, the skills, the README) alike.

- **Keep it simple** — the plainest thing that works; no cleverness to save a
  line.
- **You aren't gonna need it** — build for today's requirement, not a guessed
  one; no speculative options, abstractions or documentation of what the code
  already shows.
- **Don't repeat yourself** — one home per rule, fact or helper; elsewhere,
  point to it. A rule applying everywhere lives here; a domain rule lives in its
  skill.
- **Kaizen** — leave it a little better: fix what's stale or wrong in whatever
  you touch, in small steps, rather than saving it for a rewrite.

---

## Skills Index — where the depth lives

This file is the **always-on core**: invariants, the data model, and
cross-cutting conventions. Each domain's full patterns, worked examples and
workflows live in a **project skill** under `.claude/skills/`. **Load the
matching skill before doing substantive work in its domain** — the General Rules
below are the invariants, the skill is the _how_.

| Skill                     | Load when working on…                                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `design-brief`            | why the page looks and reads as it does: any visible change, the section order, or hero, how-I-work, projects, learning or contact copy             |
| `project-structure`       | locating a file, deciding where a new file belongs, the page's section order and anchors                                                            |
| `content-blurbs`          | the section copy in `src/content/blurbs/`: hero, How I work, Career intro, contact                                                                  |
| `content-organisations`   | adding or editing an employer, trainer or university in `src/content/organisations/`                                                                |
| `content-accomplishments` | the hero's stat figures in `src/content/accomplishments/`, their values, captions and order                                                         |
| `content-events`          | adding or editing a role, course or degree in `src/content/events/`, its dates, link and body copy                                                  |
| `rewrite-course`          | turning pasted course material into the house style for one training event (`/rewrite-course <path>`)                                               |
| `content-projects`        | the project cards in `src/content/projects/`, their screenshots, tags and links                                                                     |
| `components-block`        | the shared primitives in `src/components/ui/` (Section, SectionHead, Pill, Card, Button, ExternalTextLink, Icon, Doodle), `site/` (Nav, SiteFooter) |
| `components-sections`     | the page sections in `src/components/sections/` and their `entries/`, joining events to organisations, `Layout.astro`, `pages/`, adding a section   |
| `styling`                 | colour tokens, typography, prose styling, Tailwind v4 in `src/styles/global.css` and class strings                                                  |
| `i18n-messages`           | adding or editing a UI string or message key in `messages/en.json`                                                                                  |
| `ascii-wireframes`        | any visible change: draw it and get it approved before building                                                                                     |
| `todo-review`             | the `## Todo` list in `README.md`, and every time plan mode is entered (`/todo-review`)                                                             |
| `branch-and-commit`       | cutting a branch off `develop`, writing a commit message, pushing, opening a PR                                                                     |

> When a domain skill contradicts a stale line here, the skill is the more
> detailed source — but the General Rules always hold regardless of which skill
> is loaded.

> **Why versus how.** `design-brief` is the record of the design and why it is
> so; the domain skills describe how the code does it today. A visible change
> follows both, and updates the domain skill in the same PR.

---

## Tech Stack

| Concern         | Choice                                                             |
| --------------- | ------------------------------------------------------------------ |
| Framework       | Astro 7, static output                                             |
| Language        | TypeScript                                                         |
| Content         | Markdown in Astro content collections, validated with Zod          |
| UI copy         | Paraglide JS, English only, in `messages/en.json`                  |
| Styling         | Tailwind CSS v4 via `@tailwindcss/vite`, `@tailwindcss/typography` |
| Type            | Figtree, and Permanent Marker for the marker rule (Google Fonts)   |
| Icons           | Hugeicons Free (`@hugeicons/core-free-icons`), as static SVG       |
| Dates           | date-fns                                                           |
| Formatting      | Prettier (Astro, import-sort and Tailwind plugins)                 |
| Linting         | ESLint 10 (TypeScript, Astro, Tailwind)                            |
| Package manager | npm                                                                |
| Hosting         | GitHub Pages, `matthew.akinowittering.com`                         |

There is no test suite. `npm run build` is the test: every content file is
parsed against its schema, so a bad date, a missing field or a malformed URL
fails the build.

## Commands

| Command               | Action                               |
| :-------------------- | :----------------------------------- |
| `npm run dev`         | Local dev server at `localhost:4321` |
| `npm run build`       | Production build to `./dist/`        |
| `npm run preview`     | Preview the build locally            |
| `npm run lint`        | `prettier --check .` then `eslint .` |
| `npm run format`      | Format everything with Prettier      |
| `npm run astro check` | Type check                           |

## Deployment

`.github/workflows/astro.yml` builds and deploys to GitHub Pages on every push
to `main`. There is no staging environment: **pushing to `main` publishes**.
Work lands on `develop` through PRs, and `main` only moves when `develop` is
released into it (see **`branch-and-commit`**). The domain's one home is
`public/CNAME`; `site` in `astro.config.mjs` and `Host` in `public/robots.txt`
must agree with it.

---

## Data Model

Everything on the page is driven by five content collections, defined with their
Zod schemas in [`src/content.config.ts`](src/content.config.ts) — the schema's
one home. Field-by-field detail lives in each collection's skill.

| Collection        | Holds                                                        | Rendered by                                                 |
| ----------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| `accomplishments` | the hero's stat cards, one figure each                       | `sections/Hero`                                             |
| `blurbs`          | intro and long copy for each section, keyed by file name     | hero, how-i-work, career, contact                           |
| `organisations`   | employers, trainers and universities                         | named on Career rows and on Learning's degree and providers |
| `events`          | roles, courses and degrees, each pointing at an organisation | `career/Role`, `learning/Degree`, `learning/Provider`       |
| `projects`        | things built and shipped                                     | `projects/Project.astro`                                    |

### How events meet organisations

```
organisations/employer/acorn-i.md         events/employment/2019-08/acorn-i/product-lead.md
---                                       ---
id: acorn-i            <───────────────   organisationId: acorn-i
type: employer                            type: employment
---                                       ---
```

| Event `type` | Organisation `type` | Section  | Event file lives in                  |
| ------------ | ------------------- | -------- | ------------------------------------ |
| `employment` | `employer`          | Career   | `events/employment/<yyyy-mm>/<org>/` |
| `training`   | `trainer`           | Learning | `events/courses/<yyyy-mm>/<org>/`    |
| `education`  | `university`        | Learning | `events/courses/<yyyy-mm>/<org>/`    |

The join is on the organisation's **frontmatter `id`**, not its file path: the
`organisations` loader keys each entry by that `id`. A mistyped `organisationId`
fails the build: the sections resolve each event through `getOrganisation()` in
`src/lib/organisations.ts`, which throws on a missing one. See
**`components-sections`**.

### Derived, never stored

These are computed at render time and must never be written into a content file:
an organisation's date span and event count, a role's duration, and the "N+
years of experience" figure.

Every "years in product" figure counts from the one event marked
`careerStart: true`, read through `getCareerStart()` in `src/lib/career.ts`. A
career start date is never typed by hand, in a page, a blurb or a message; a
blurb shows the figure with `<CareerLength />`.

---

## General Rules

> These are the always-on invariants. The worked examples behind each one live
> in the matching skill — load it before doing the work, but never break a rule
> here because a skill wasn't loaded.

### Content

- **Facts about Matthew live in `src/content/`**, never in a component
- **UI copy lives in `messages/en.json`**, never as English in a component, a
  page or `src/lib/`: section titles, button text, `alt` text, page metadata.
  Read it as `m.<key>()`; details in **`i18n-messages`**
- **Site-wide facts have one home**, imported, never retyped: his name is the
  `site_name` message, and the social links are `src/lib/socials.ts`. A fact
  still retyped in two places is a Todo item in `README.md`
- Content files are `.md`. Use `.mdx` only when the body must import or compute
  something (`hero.mdx` derives the years in product)
- A new frontmatter field is added to its schema in `content.config.ts` **in the
  same commit** as the first file that uses it, and rendered by the component in
  that commit too. A field nothing renders is dead weight, not "for later"
- Dates are **quoted ISO 8601 strings with an offset**:
  `'2019-08-05T00:00:00+00:00'`. An ongoing role or course has **no `dateTo`** —
  never a far-future date
- After adding or renaming an event or organisation, **build and look for it on
  the page**
- Order comes from data: `index` for projects, dates for the timelines. Never
  reorder by moving markup around

### Writing

- **British English** throughout: organisation, prioritise, behaviour, programme
- **No em dashes** in site copy (anything under `src/content/`); use a comma or
  restructure the sentence. The en dash `–` in a date range
  (`Aug 2019 – Present`) is correct and stays
- Bodies are flowing prose: no headings, no bullet lists, no "About this course"
  scaffolding. Each content skill sets the voice, tense and length for its type
- Never invent a metric, outcome or detail. Every number on the page is
  Matthew's

### Code

- **Static only.** No SSR adapter, no API endpoints, no client-side `fetch`.
  What the page shows is decided at build time
- Components are `.astro`, and the page ships no UI framework. A value that must
  stay live after the build would need an island and a framework: raise it
  before adding one
- **Destructure once, spread once.** Pull shared values out of `entry.data` once
  in the frontmatter and reuse them; pass a shared props object with
  `{...props}` rather than retyping the same props
- Each component file is named for what it is, never `index.astro`. Each folder
  under `src/components/` has an `index.ts` barrel re-exporting its `.astro`
  components by name; a new component is added to its folder's barrel
- Import components by name from their folder's barrel
  (`import { Button, Section } from '@components/ui'`), but relatively
  (`./Icon.astro`) from inside the same folder, so a barrel never imports itself
- Import `src/lib/`, `src/layouts/` and `src/assets/` through `@lib/*`,
  `@layouts/*` and `@assets/*`, and messages through `@paraglide/messages.js`;
  never a `../` chain. `src/paraglide/` is compiled by the Vite plugin and
  ignored by git; never edit it
- Every collection entry is read through `getCollection` / `getEntry` and
  rendered with `render()` — never read content files from disk directly
- No `any`. Explicit `interface Props` on every component that takes props
- No `console.log` in committed code

### Styling and assets

- **Colours are tokens in `src/styles/global.css`**, never a hex value or a
  stock Tailwind palette colour (`gray-300`) in a component; stock colours are
  switched off, so they don't compile. A new colour gets a token there with a
  comment saying what it is for. Details in **`styling`**
- **Type is Figtree.** Permanent Marker is for the marker rule in
  **`design-brief`** only: short accents, always real text, never body copy
- Class order is Prettier's job. Run `npm run format`; never hand-sort classes
- Images go through `astro:assets` `<Image>` with meaningful `alt` text. A
  collection's images sit in an `img/` folder beside its content files and are
  referenced relatively (`./img/youdemo.png`)
- Every external link opens in a new tab with `rel="noopener"` — use
  `ExternalTextLink` or `Button external` rather than writing the attributes by
  hand
- Icons come from Hugeicons Free, rendered as static inline SVG through
  `ui/Icon.astro`; never mix in another set. How icons are labelled is under
  Accessibility below
- **One theme, light.** The site has no dark mode: no theme toggle, no `dark:`
  variants, no `prefers-color-scheme` styles
- **Mobile first.** Base styles are for a phone (320px to 390px wide), and `sm:`
  / `md:` / `lg:` add to them. Check every visible change at phone, tablet and
  desktop widths

### Accessibility

Accessibility is built in, not bolted on. Target **WCAG 2.2 AA**, and treat a
screen reader user and a dyslexic reader as primary audiences. A gap between
these rules and the code is a Bugs item in `README.md`'s Todo list.

- **Semantic HTML first.** One `<h1>`; headings descend in order without
  skipping; `header`, `nav`, `main` and `footer` landmarks; a "Skip to content"
  link as the first focusable element
- **Real controls.** `<a href>` to go somewhere, `<button>` to do something,
  native `<details>`/`<summary>` for expanders. Never a click handler on a `div`
  or `span`. An `<a>` always has an `href`
- **Keyboard.** Everything interactive is reachable and usable by keyboard in a
  sensible order, with a clearly visible focus style. Never remove `outline`
  without a replacement. Navigation works at every width, including on a phone
- **Text alternatives.** Meaningful images get descriptive `alt`; purely
  decorative images get `alt=""`; decorative icons and doodles get
  `aria-hidden="true"`; an icon that carries meaning gets `role="img"` and an
  `aria-label`; icon-only links and buttons get an `aria-label`. All of it comes
  from `messages/en.json`
- **New tabs are announced.** A link that opens a new tab says so to assistive
  tech (visually hidden "opens in a new tab"), built into `ExternalTextLink` and
  `Button external` rather than repeated by hand
- **Contrast.** Body text at least 4.5:1, large text and UI edges at least 3:1.
  Never use colour alone to carry meaning
- **Readable text.** `lang="en-GB"`; body copy left-aligned (headings, labels
  and short statements may be centred), never justified; comfortable line length
  (about 70 characters) and line height; no text baked into images. Display or
  handwritten fonts are for short accents only and are always real text
- **Motion.** No autoplaying animation; honour `prefers-reduced-motion`
- **Zoom.** The viewport tag is `width=device-width, initial-scale=1` and never
  blocks zoom; layouts hold at 200% zoom and 320px wide

### Planning, branching and committing

- A visible change is drawn as a wireframe and approved before it is built
  (**`ascii-wireframes`**), following **`design-brief`**
- Planned work runs on its own branch off `develop` and reaches it by PR; never
  commit or push to `main` directly. The how is in **`branch-and-commit`**
- Before committing: `npm run format`, then `npm run lint`, then
  `npm run build`, all three clean
- Before opening a PR with a visible change: a keyboard-only pass and a screen
  reader pass (VoiceOver or NVDA) over what changed. Automated checks such as
  axe are welcome, but raise them first: they are new tooling
- Remember `main` is production. Nothing is "just a test push"
