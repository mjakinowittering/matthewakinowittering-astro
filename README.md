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

- [ ] Fix the build's 27 "Invalid content reference" errors: Astro 7 checks
      every event's and accomplishment's `organisationId` against organisation
      entry ids (file paths), not the frontmatter `id` the timeline joins on.
      The build still completes and every event renders, but real errors hide in
      the noise.

### Features

#### Content model

- [ ] Decide what the skill cards' `img` and `alt` are for: the schema requires
      them, but `Skill.astro` shows a Lucide icon and renders neither, and two
      of the five SVGs in `skills/img/` aren't referenced at all. Either drop
      the fields, the files and the folder in one commit, or bring the images
      back into the card. A decision to make, not a commitment.
- [ ] Drop `dateFrom`, `dateTo` and `events` from the organisation schema: they
      are derived from events at render time and nothing reads them. Only
      `loughborough-university.md` still carries stale dates.

#### Sharing

- [ ] Add Open Graph and canonical tags in `Layout.astro`, once for the page
      rather than per page, so a link shared on LinkedIn shows a proper card.

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
