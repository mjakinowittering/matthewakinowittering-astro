# Matthew's Astro Site

Personal site for Matthew Akino-Wittering, a Product Manager. It presents
employment history, training, education, and a short profile so potential
employers can learn more than a LinkedIn page shows.

Built with [Astro](https://astro.build), [Svelte](https://svelte.dev) islands,
[Tailwind CSS](https://tailwindcss.com) v4, and MDX. It is a static site
deployed to GitHub Pages.

Live at [mjakinowittering.github.io](https://mjakinowittering.github.io).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
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
[`src/content.config.ts`](src/content.config.ts):

- **blurbs** intro copy for page sections
- **organisations** employers, trainers, and universities
- **events** individual roles and courses, each referencing an organisation
- **skills** the "what I do" cards

To add a role or course, create an event MDX file under `src/content/events/`
with the correct `type` and an `organisationId` matching an existing
organisation. Add the organisation under `src/content/organisations/` first if
it does not exist.

## Deployment

Pushing to `main` builds and deploys to GitHub Pages via
[`.github/workflows/astro.yml`](.github/workflows/astro.yml). There is no
separate staging environment.
