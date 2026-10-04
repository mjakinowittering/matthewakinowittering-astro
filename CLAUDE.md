# CLAUDE.md

This file defines the conventions, patterns, and architecture for this project.
Follow these guidelines precisely. Do not deviate without explicit instruction.

This is the **personal site of Matthew Akino-Wittering**, a Product Manager. It
is a single static page that tells potential employers more than a LinkedIn
profile can: who he is, how he works, where he has worked, what he has built,
and what he has studied.

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

| Skill                   | Load when working on…                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `project-structure`     | locating a file, deciding where a new file belongs, the page's section order and anchors                                  |
| `content-blurbs`        | the intro copy in `src/content/blurbs/` — About me, My experience, What I do                                              |
| `content-organisations` | adding or editing an employer, trainer or university in `src/content/organisations/`                                      |
| `content-events`        | adding or editing a role, course or degree in `src/content/events/`, its dates, link and body copy                        |
| `rewrite-course`        | turning pasted course material into the house style for one training event (`/rewrite-course <path>`)                     |
| `content-skills`        | the three "What I do" cards in `src/content/skills/`                                                                      |
| `content-projects`      | the project cards in `src/content/projects/`, their screenshots, tags and links                                           |
| `components-block`      | the shared primitives in `src/components/block/` — Section, SectionHead, Badge, Button, ExternalTextLink, Nav, SiteFooter |
| `components-sections`   | the page sections in `src/components/home/`, the timeline join, `Layout.astro`, `pages/`, adding a section                |
| `styling`               | colour tokens, typography, prose styling, Tailwind v4 in `src/styles/global.css` and class strings                        |
| `i18n-messages`         | adding or editing a UI string or message key in `messages/en.json`                                                        |
| `ascii-wireframes`      | any visible change: draw it and get it approved before building                                                           |
| `todo-review`           | the `## Todo` list in `README.md`, and every time plan mode is entered (`/todo-review`)                                   |
| `branch-and-commit`     | cutting a branch off `develop`, writing a commit message, pushing, opening a PR                                           |

> When a domain skill contradicts a stale line here, the skill is the more
> detailed source — but the General Rules always hold regardless of which skill
> is loaded.

---

## Tech Stack

| Concern         | Choice                                                             |
| --------------- | ------------------------------------------------------------------ |
| Framework       | Astro 6, static output                                             |
| Islands         | Svelte 5 (runes), only where a value must be live                  |
| Language        | TypeScript                                                         |
| Content         | Markdown in Astro content collections, validated with Zod          |
| UI copy         | Paraglide JS, English only, in `messages/en.json`                  |
| Styling         | Tailwind CSS v4 via `@tailwindcss/vite`, `@tailwindcss/typography` |
| Icons           | Lucide (`@lucide/astro`, `@lucide/svelte`)                         |
| Dates           | date-fns                                                           |
| Formatting      | Prettier (Astro, import-sort and Tailwind plugins)                 |
| Linting         | ESLint (TypeScript, Astro, Tailwind)                               |
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

| Collection      | Holds                                                        | Rendered by                               |
| --------------- | ------------------------------------------------------------ | ----------------------------------------- |
| `blurbs`        | intro copy for three sections, keyed by file name            | about-me, experience, what-do-i-do        |
| `organisations` | employers, trainers and universities                         | the Career, Education, Training timelines |
| `events`        | roles, courses and degrees, each pointing at an organisation | `Role`, `Course`, `Education`             |
| `skills`        | the three "What I do" cards                                  | `what-do-i-do/Skill.astro`                |
| `projects`      | things built and shipped                                     | `projects/Project.astro`                  |

### How events meet organisations

```
organisations/employer/acorn-i.md         events/employment/acorn-i/product-lead.md
---                                       ---
id: acorn-i            <───────────────   organisationId: acorn-i
type: employer                            type: employment
---                                       ---
```

| Event `type` | Organisation `type` | Section   | Event file lives in        |
| ------------ | ------------------- | --------- | -------------------------- |
| `employment` | `employer`          | Career    | `events/employment/<org>/` |
| `training`   | `trainer`           | Training  | `events/courses/<org>/`    |
| `education`  | `university`        | Education | `events/courses/<org>/`    |

The join is on the organisation's **frontmatter `id`**, not its file path.
Astro's `reference('organisations')` does not resolve that value against a real
entry, so a mistyped `organisationId` does **not** fail the build — the event
just vanishes from the page. The section components do the join; see
**`components-sections`**.

### Derived, never stored

These are computed at render time and must never be written into a content file:
an organisation's date span and event count, a role's duration, and the "N+
years of experience" figure.

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
  something (`about-me.mdx` derives the years of experience)
- A new frontmatter field is added to its schema in `content.config.ts` **in the
  same commit** as the first file that uses it, and rendered by the component in
  that commit too. A field nothing renders is dead weight, not "for later"
- Dates are **quoted ISO 8601 strings with an offset**:
  `'2019-08-05T00:00:00+00:00'`. An ongoing role or course has **no `dateTo`** —
  never a far-future date
- After adding or renaming an event or organisation, **build and look for it on
  the page**. The build cannot catch a broken `organisationId`
- Order comes from data: `index` for skills and projects, dates for the
  timelines. Never reorder by moving markup around

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
- Components are `.astro`. A `.svelte` island is used **only** where a value
  must stay live after the build — today that is `EventDescription.svelte`, so
  an ongoing role's duration keeps counting without a redeploy
- Astro client directives (`client:only`, `client:load`…) are compile-time: they
  cannot be spread or applied conditionally. Branch on the directive, and still
  spread the shared props (`Role.astro` shows the pattern)
- Svelte is **runes only** (`$props`, `$state`, `$derived`) — never `export let`
  or `$:`
- **Destructure once, spread once.** Pull shared values out of `entry.data` once
  in the frontmatter and reuse them; pass a shared props object with
  `{...props}` rather than retyping the same props
- Import components through the `@components/*` alias and messages through
  `@paraglide/messages.js`. `src/lib/` has no alias yet; import it relatively.
  `src/paraglide/` is compiled by the Vite plugin and ignored by git; never edit
  it
- Every collection entry is read through `getCollection` / `getEntry` and
  rendered with `render()` — never read content files from disk directly
- No `any`. Explicit `interface Props` on every component that takes props
- No `console.log` in committed code

### Styling and assets

- **Colours are tokens in `src/styles/global.css`**, never a hex value or a
  stock Tailwind palette colour (`gray-300`) in a component. A new colour gets a
  token there with a comment saying what it is for. Details in **`styling`**
- Class order is Prettier's job. Run `npm run format`; never hand-sort classes
- Images go through `astro:assets` `<Image>` with meaningful `alt` text. A
  collection's images sit in an `img/` folder beside its content files and are
  referenced relatively (`./img/youdemo.png`)
- Every external link opens in a new tab with `rel="noopener"` — use
  `ExternalTextLink` or `Button external` rather than writing the attributes by
  hand
- Icons come from Lucide. An icon that carries meaning gets `role="img"` and an
  `aria-label`; a decorative one gets neither

### Planning, branching and committing

- A visible change is drawn as a wireframe and approved before it is built
  (**`ascii-wireframes`**)
- Planned work runs on its own branch off `develop` and reaches it by PR; never
  commit or push to `main` directly. The how is in **`branch-and-commit`**
- Before committing: `npm run format`, then `npm run lint`, then
  `npm run build`, all three clean
- Remember `main` is production. Nothing is "just a test push"
