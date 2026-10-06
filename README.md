# Matthew's Astro Site

Personal site for Matthew Akino-Wittering, a Product Manager. It presents
employment history, training, education, and a short profile so potential
employers can learn more than a LinkedIn page shows.

Built with [Astro](https://astro.build), [Svelte](https://svelte.dev) islands,
[Tailwind CSS](https://tailwindcss.com) v4, Markdown content collections and
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

- **blurbs:** intro copy for page sections
- **organisations:** employers, trainers, and universities
- **events:** individual roles and courses, each referencing an organisation
- **skills:** the "what I do" cards
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

- [ ] Finish checking the DyslexicWriter card: it shipped in PR #6 with the
      keyboard and screen reader pass `CLAUDE.md` asks for still owed, and
      without a look at phone, tablet and desktop widths (headless screenshots
      came out blank). Its markup matches the YouDemo card's, so its layout
      should too; confirm it, and that the `alt` text reads well aloud.

#### Sharing

- [ ] Add a 1200 by 630 sharing card for Open Graph: `Layout.astro` points
      `og:image` at the hero photo, a 447 by 558 portrait that LinkedIn crops,
      with `twitter:card` set to `summary` to match. A designed card would let
      both use the large format. A decision to make, not a commitment.

#### Redesign

- [ ] Check contrast when the redesign tokens land. Today `text-muted` on
      `bg-panel` is 4.18:1, under the 4.5:1 body text needs (the body colour of
      the My experience, Career and Education sections), and the `border` token
      is 1.35:1 on `bg-bg`, under 3:1, as the only edge of the ghost `Button`
      and the About section's social pills. The redesign's new tokens replace
      both pairings; measure them then rather than retuning today's.
- [ ] Rewrite the How I work and contact copy in Matthew's own voice:
      `blurbs/how-i-work.md` and `blurbs/contact.md` hold draft copy for the
      redesign, kept as written until he rewrites it.
- [ ] Decide whether the Acorn-i role body keeps the Ignite figures: they are
      typed out in `events/employment/2019-08/acorn-i/product-lead.md` and are
      now also stat cards in `src/content/accomplishments/`. Decide once the
      redesign's hero renders the stat cards. A decision to make, not a
      commitment.

#### Tooling

- [ ] Drop the `format` narrowing in `projects/Project.astro` once Astro's types
      allow: the `image()` schema infers `format` as optional, though Astro's
      own `ImageFunction` declares it required, so the card copies `img` with
      `format` narrowed rather than passing it straight to `<Image>`. Retry
      after an Astro upgrade with `npm run astro check`.

#### Guidance

- [ ] Update the stack table in `CLAUDE.md`: it says Astro 6, but `package.json`
      has `astro` at `^7.3.5`.
- [ ] Decide the branch prefix for Bugs work: `branch-and-commit` says `bug/`,
      but step 1 went out as `fix/delivery-and-accessibility` because Matthew
      named it. Either keep `bug/` and treat that as a one-off, or allow `fix/`
      in the skill. A decision to make, not a commitment.
