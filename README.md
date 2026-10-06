# Matthew's Astro Site

Personal site for Matthew Akino-Wittering, a product leader and builder. One
page presents who he is, how he works, what he has built, where he has worked
and what he has studied, so potential employers can learn more than a LinkedIn
page shows.

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com)
v4, Markdown content collections and
[Paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) for UI
copy. It is a static site deployed to GitHub Pages.

Live at [matthew.akinowittering.com](https://matthew.akinowittering.com).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| ------------------------- | ------------------------------------------------ |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run lint`            | Check formatting with Prettier, then run ESLint  |
| `npm run format`          | Format all files with Prettier                   |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Content

Site content is data-driven through Astro content collections defined in
`src/content.config.ts`:

- **accomplishments:** the hero's stat cards
- **blurbs:** the longer copy for the hero, How I work, Career and contact
- **organisations:** employers, trainers, and universities
- **events:** individual roles and courses, each referencing an organisation
- **projects:** things built and shipped

UI labels (section titles, buttons, page metadata) live in `messages/en.json`.

To add a role or course, create an event Markdown file under
`src/content/events/` with the correct `type` and an `organisationId` matching
an existing organisation. Add the organisation under
`src/content/organisations/` first if it does not exist.

## Deployment

Pushing to `main` builds and deploys to GitHub Pages via
`.github/workflows/astro.yml`. There is no separate staging environment, so work
is merged into `develop` first and released to `main` from there.

## Todo

### Bugs

#### Tooling

- [ ] Quiet the build's `MODULE_LEVEL_DIRECTIVE` warning for `blurbs/hero.mdx`:
      Vite warns that the `"use astro:head-inject"` directive "may not be
      preserved when bundling". The directive is added by Astro itself
      (`vite-plugin-content-assets.js`) to every MDX content entry, whatever the
      file holds, so nothing in this repo causes it; the page renders correctly.
      Wait for an Astro fix rather than filtering it, and never silence other
      warnings with it.
- [ ] Clear the two moderate `npm audit` findings: `postcss-selector-parser`,
      reached through `@tailwindcss/typography`, which only runs at build time.
      npm's only offer is a downgrade to 0.5.4, which is not a fix; recheck when
      `@tailwindcss/typography` releases an update.

### Features

#### Projects

- [ ] Finish checking the DyslexicWriter card: the screen reader pass
      `CLAUDE.md` asks for is still owed. Its layout has been checked at phone,
      tablet and desktop widths in the redesign; confirm with VoiceOver or NVDA
      that the card reads in order and that its `alt` text reads well aloud.

#### Sharing

- [ ] Add a 1200 by 630 sharing card for Open Graph: `Layout.astro` points
      `og:image` at the hero photo, a 447 by 558 portrait that LinkedIn crops,
      with `twitter:card` set to `summary` to match. A designed card would let
      both use the large format. A decision to make, not a commitment.

#### Redesign

- [ ] Rewrite the How I work and contact copy in Matthew's own voice:
      `blurbs/how-i-work.md` and `blurbs/contact.md` hold draft copy for the
      redesign, kept as written until he rewrites it.
- [ ] Decide whether the Acorn-i role body keeps the Ignite figures: they are
      typed out in `events/employment/2019-08/acorn-i/product-lead.md` and also
      shown as the hero's stat cards from `src/content/accomplishments/`, so a
      changed figure has two homes. A decision to make, not a commitment.
- [ ] Add a "Download CV" button to Career once a CV exists: `design-brief`
      places it under the Career intro, and `robots.txt` already reserves
      `/resume`. Nothing renders it until there is a file to point at.
- [ ] Replace the hero photo when Matthew supplies a new one: the hero still
      uses `src/assets/MatthewAkinoWittering-BW-Alpha.png`, which is also the
      Open Graph image.

#### Tooling

- [ ] Drop the `format` narrowing in `projects/Project.astro` once Astro's types
      allow: the `image()` schema infers `format` as optional, though Astro's
      own `ImageFunction` declares it required, so the card copies `img` with
      `format` narrowed rather than passing it straight to `<Image>`. Retry
      after an Astro upgrade with `npm run astro check`.
