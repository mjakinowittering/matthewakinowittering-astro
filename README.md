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
`.github/workflows/build-and-deploy.yml`. There is no separate staging
environment, so work is merged into `develop` first and released to `main` from
there.

## Todo

### Bugs

### Features

#### Projects

- [ ] Finish checking the DyslexicWriter card: the screen reader pass
      `CLAUDE.md` asks for is still owed. Its layout has been checked at phone,
      tablet and desktop widths in the redesign; confirm with VoiceOver or NVDA
      that the card reads in order and that its `alt` text reads well aloud.

#### Sharing

- [ ] Redraw `public/og.png` When the years in product reach 17, in January
      2027, the sharing card bakes "16+ years in product" into the image, so it
      cannot derive the figure from `careerStart` as the page does. Its source
      is `docs/design/reference/og-image.html`.

#### Redesign

- [ ] Rewrite the How I work and contact copy in Matthew's own voice:
      `blurbs/how-i-work.md` and `blurbs/contact.md` hold draft copy for the
      redesign, kept as written until he rewrites it.
- [ ] Add a "Download CV" button to Career once a CV exists: `design-brief`
      places it under the Career intro, and `robots.txt` already reserves
      `/resume`. Nothing renders it until there is a file to point at.
- [ ] Replace the hero photo when Matthew supplies a new one: the hero still
      uses `src/assets/MatthewAkinoWittering-BW-Alpha.png`.

#### Tooling

- [ ] Drop the `format` narrowing in `entries/Project.astro` once Astro's types
      allow: the `image()` schema infers `format` as optional, though Astro's
      own `ImageFunction` declares it required, so the card copies `img` with
      `format` narrowed rather than passing it straight to `<Image>`. Still
      needed on Astro 7.3.8; retry after the next upgrade with
      `npm run astro check`.
- [ ] Unpin `eslint-plugin-tailwindcss` from exactly `4.0.6` once it understands
      Tailwind v4 line heights: from 4.4.0 its `no-unnecessary-arbitrary-value`
      rule suggests `leading-1.2` for `leading-[1.2]`, but v4 reads a bare
      `leading-*` number as a multiple of `--spacing`, so its `--fix` would
      collapse every line height. Retry with `npm run lint` on each new plugin
      release; warnings on `leading-[…]` mean it is still wrong.
