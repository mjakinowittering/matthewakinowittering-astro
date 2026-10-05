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

- [ ] Give the nav links a phone layout: `Nav.astro` hides `navLinks` below `sm`
      with nothing in their place, so on a phone only the social links are
      reachable from the top bar.
- [ ] Add a visible focus style: nothing in `global.css` or the primitives
      styles `:focus-visible`, so every link, button and the training rows'
      `<summary>` rely on the browser's default ring, untested against the green
      primary button and the sand `alt` bands.
- [ ] Announce new tabs: `ExternalTextLink` and `Button external` open links in
      a new tab without a visually hidden "opens in a new tab". The social links
      in `Nav.astro`, `SiteFooter.astro` and `about-me/index.astro` write
      `target="_blank"` by hand, so route them through a primitive in the same
      change.
- [ ] Fix contrast on the sand bands: `text-muted` on `bg-panel` is 4.18:1,
      under the 4.5:1 body text needs, and it is the body colour of the My
      experience, Career and Education sections. The `border` token is 1.35:1 on
      `bg-bg`, under 3:1, and is the only edge of the ghost `Button` and the
      About section's social pills.

#### Projects

- [ ] Hide "View source" on a project without a `sourceUri`: the schema in
      `content.config.ts` requires `sourceUri`, so a project with no public repo
      fails the build, and `Project.astro` always renders the ghost `Button`.
      Make the field optional and render the button only when it is set.
- [ ] Fix the screenshot placeholder copy: `projects_screenshot_placeholder`
      reads "app screenshot goes here · youdemo recorder ui", so every project
      without an `img` names YouDemo. Give it neutral copy, such as "Screenshot
      coming soon".

#### Pages

- [ ] Move the 404 page onto the palette: `pages/404.astro` uses stock
      `text-gray-800`, `bg-gray-300` and `hover:bg-gray-400`, and a hand-built
      link. Use `text-muted` and `Button` instead.
- [ ] Fix the `<time>` in `blurbs/about-me.mdx`: it sets a `time` attribute,
      which doesn't exist. The machine-readable one is
      `datetime={dateFrom.toISOString()}`.

#### Timeline

- [ ] Remove the `uri` from the Certified Scrum Product Owner course
      (`events/courses/2016-06/scrum-alliance/certified-scrum-product-owner.md`):
      it points at an out-of-date Scrum Alliance profile page. Without it the
      row loses its tick and "View certificate".
- [ ] Fix durations under a year in `src/lib/utils.ts`:
      `calcLengthInYearsAndMonths` prints "0 years 5 months", where it should
      print "5 months". A whole number of years is fine ("2 years").
      `calcLengthInYears` also prints "0+ years" under a year and "1 year",
      without the plus, at one; it only feeds the career figure today, so that
      half is harmless for now.

- [ ] Stop shipping JavaScript for a finished degree: `event/Education.astro`
      always mounts `EventDescription` with `client:only`. Follow `Role.astro`,
      which only goes live while the event is ongoing and renders at build time
      otherwise.

### Features

#### Content model

- [ ] Give the career start date one home: `2010-01-01` is set in both
      `blurbs/about-me.mdx` and `pages/index.astro`, and the two must be changed
      together. A `src/lib/site.ts` both import is the likely home.
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
