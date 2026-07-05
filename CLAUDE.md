# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project

Personal site for Matthew Akino-Wittering, a Product Manager. It presents
employment history, training, education, and self-description so potential
employers can learn more than a LinkedIn profile shows. It is a static Astro
site deployed to GitHub Pages.

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm run dev`     | Start local dev server at `localhost:4321` |
| `npm run build`   | Build the production site to `./dist/`     |
| `npm run preview` | Preview the build locally before deploying |
| `npm run lint`    | `prettier --check .` then `eslint .`       |
| `npm run format`  | Format all files with Prettier             |

There is no test suite. Use `npm run astro check` for type checking.

## Deployment

`.github/workflows/astro.yml` builds and deploys to GitHub Pages on every push
to `main` (site is `https://mjakinowittering.github.io`). There is no separate
staging environment, so pushing to `main` publishes.

## Architecture

Astro 6 with Svelte islands, Tailwind CSS v4 (loaded through the
`@tailwindcss/vite` plugin, not an Astro integration), and MDX for content.
Components are `.astro` by default; use `.svelte` only where client-side
interactivity is needed (for example `EventDescription.svelte`).

### Content collections are the data model

Everything on the site is driven by content collections defined in
[src/content.config.ts](src/content.config.ts). The four collections and how
they relate:

- **blurbs** (`src/content/blurbs/`): free-text intro copy for page sections
  (`about-me`, `experience`, `what-do-i-do`). Schema: `title`, optional
  `subtitle`, plus the MDX body.
- **organisations** (`src/content/organisations/`): the entities Matthew has
  worked for or trained with. `type` is one of `employer`, `trainer`, or
  `university`. Each has a stable `id` used as the reference key.
- **events** (`src/content/events/`): individual roles or courses. `type` is one
  of `employment`, `training`, or `education`. Each event points at its
  organisation via `organisationId`, a Zod `reference('organisations')`. Date
  fields are ISO strings transformed to `Date` objects.
- **skills** (`src/content/skills/`): the "what I do" cards, each with an `img`
  (validated as an Astro image asset), `alt`, and `index` for ordering.

The three "Employment / Roles" and "Trainers / Courses" sections mentioned in
project context map to this events + organisations pairing: an organisation is
the employer or trainer, and its events are the roles or courses.

### How events and organisations are joined

The topic components
([topics/employment/index.astro](src/components/home/experience/topics/employment/index.astro),
`topics/training/`, `topics/education/`) all follow the same pattern:

1. `getCollection('events', ...)` filtered by event `type`.
2. `getCollection('organisations', ...)` filtered by matching organisation
   `type`.
3. For each organisation, filter events where
   `event.data.organisationId.id === organisation.data.id`, drop organisations
   with no events, then derive `dateFrom`/`dateTo` and an `events` count by
   reducing over the matched events, and sort by date descending.

The derived `dateFrom`, `dateTo`, and `events` count are computed at render
time, not stored in the content files.
[organisation/index.astro](src/components/home/experience/organisation/index.astro)
then re-queries events for that organisation to render each role or course.

When adding a role or course, create a new event MDX file with the correct
`type` and an `organisationId` that matches an existing organisation's `id`. Add
the organisation file first if it does not exist.

## Conventions

- **Path alias**: import components with `@components/*` (maps to
  `src/components/*`, see [tsconfig.json](tsconfig.json)).
- **Prettier**: 4-space indent, single quotes, no trailing commas, imports
  auto-organised. Astro and Tailwind class sorting run through Prettier plugins,
  so run `npm run format` rather than hand-ordering classes.
- **Prose**: do not use em-dashes in written content; use commas or restructure
  the sentence.
- **DRY**: avoid repetition. Destructure shared values once in the frontmatter
  and reuse them, and spread a shared prop object (`{...props}`) into components
  rather than re-typing the same props. Note that Astro client directives
  (`client:only`, `client:load`, etc.) are compile-time and cannot be spread or
  applied conditionally, so branch on the directive while still spreading the
  shared props.
