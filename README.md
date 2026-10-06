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

#### Accessibility

- [ ] Stop the sticky header covering anchor targets: following a nav link
      scrolls the section's top to the very top of the viewport, under the
      header (`h-14` in `Nav.astro`), so its heading sits hidden behind the bar
      (`#career` lands at 0px). WCAG 2.2's Focus Not Obscured (2.4.11) asks for
      better. A `scroll-padding-top` on `html` in `global.css`, kept equal to
      the header's `h-14`, is the likely fix.

#### Tooling

- [ ] Quiet the build's two `MODULE_LEVEL_DIRECTIVE` warnings: since
      `blurbs/about-me.mdx` and `blurbs/hero.mdx` import `CareerLength.astro`,
      Vite warns that the `"use astro:head-inject"` directive "may not be
      preserved when bundling". The page renders the same as before; it is
      noise. Find out whether Astro fixes it upstream before filtering it, and
      never by silencing other warnings with it.
- [ ] Clear the five high `npm audit` findings: all are `braces`, reached
      through `micromatch`, `fast-glob` and `astro-eslint-parser` from
      `eslint-plugin-astro@1.7.0`, a devDependency used only by `npm run lint`,
      so nothing ships to the site. The only fix is `eslint-plugin-astro` 3.x, a
      major bump; check `eslint.config` still works with it.

### Features

#### Content model

- [ ] Decide what the skill cards' `img` and `alt` are for: the schema requires
      them, but `Skill.astro` shows a Lucide icon and renders neither, and two
      of the five SVGs in `skills/img/` aren't referenced at all. Either drop
      the fields, the files and the folder in one commit, or bring the images
      back into the card. A decision to make, not a commitment.

#### Projects

- [ ] Finish checking the DyslexicWriter card: it shipped in PR #6 with the
      keyboard and screen reader pass `CLAUDE.md` asks for still owed, and
      without a look at phone, tablet and desktop widths (headless screenshots
      came out blank). Its markup matches the YouDemo card's, so its layout
      should too; confirm it, and that the `alt` text reads well aloud.

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
- [ ] Settle the redesign blurbs' headings and the hero's wording when their
      sections are built. Both are decisions to make, not commitments:
    - the `title`s of `hero.mdx`, `how-i-work.md`, `career.md` and `contact.md`
      are the headings from `design-brief`, put in because the schema requires
      one. `hero.mdx`'s holds "I'm Matthew, a product leader", but the marker
      line "and builder." has no home yet: a message or part of the blurb
    - the draft "{years} years shaping…" became `<CareerLength /> shaping…`,
      which renders "16+ years shaping…" because `calcLengthInYears` already
      says "years". Check it reads as intended
- [ ] Decide whether the stat cards show their organisation: each accomplishment
      carries `organisationId: acorn-i`, but nothing reads it, and the hero
      design has no place for it. Either show it on the cards or drop the field.
      A decision to make, not a commitment.

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
