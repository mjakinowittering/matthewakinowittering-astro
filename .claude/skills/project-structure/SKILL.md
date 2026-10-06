---
name: project-structure
description:
    The folder tree, where each kind of file belongs, and the page's section
    order and anchor ids. Use whenever locating a file, deciding where a new
    component, content file, image or helper should go, or changing the order or
    navigation of the page sections, even if the task only mentions one file.
---

# Project structure

## Tree

```
├── CLAUDE.md                      always-on rules
├── .claude/skills/                project skills, one folder each
├── .github/workflows/astro.yml    build + deploy to GitHub Pages on push to main
├── astro.config.mjs               integrations (mdx, svelte), Tailwind and Paraglide Vite plugins, site
├── messages/en.json               every UI string, read as m.<key>()
├── project.inlang/                Paraglide settings (English only)
├── public/
│   ├── CNAME                      the domain's one home
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── assets/                    images imported by components (the hero photo)
    ├── content.config.ts          the five collection schemas
    ├── content/
    │   ├── accomplishments/       one .md per hero stat
    │   ├── blurbs/                one file per section's copy, keyed by name
    │   ├── organisations/
    │   │   ├── employer/          one .md per employer
    │   │   ├── trainer/           one .md per course provider
    │   │   └── university/        one .md per university
    │   ├── events/
    │   │   ├── employment/<yyyy-mm>/<org>/  one .md per role
    │   │   └── courses/<yyyy-mm>/<org>/     one .md per course or degree
    │   └── projects/              one .md per project + img/
    ├── components/
    │   ├── block/                 shared primitives, no content knowledge
    │   ├── content/               components content files import (CareerLength)
    │   └── home/                  one folder per page section
    │       ├── hero/
    │       ├── projects/          section + Project card
    │       ├── how-i-work/
    │       ├── career/            section + Role row
    │       ├── learning/          section + Degree card + Provider list
    │       └── contact/
    ├── layouts/Layout.astro       <head>, sharing tags, fonts, body shell
    ├── lib/
    │   ├── accomplishments.ts     stats sorted largest first, and their formatting
    │   ├── career.ts              the career start date, from the careerStart event
    │   ├── organisations.ts       an event's organisation, or a build failure
    │   ├── sections.ts            the linkable sections: label, href, pill tone
    │   ├── socials.ts             the email address, LinkedIn and GitHub links
    │   └── utils.ts               date formatting and duration helpers
    ├── paraglide/                 compiled messages; generated, git-ignored
    ├── pages/
    │   ├── index.astro            composes the sections in order
    │   └── 404.astro
    └── styles/global.css          Tailwind import, @theme tokens, link, progress bar, .prose overrides
```

## Where a new file goes

| Adding…                                  | Goes in                                                            |
| ---------------------------------------- | ------------------------------------------------------------------ |
| a role                                   | `src/content/events/employment/<yyyy-mm>/<org-folder>/<role>.md`   |
| a course or degree                       | `src/content/events/courses/<yyyy-mm>/<org-folder>/<course>.md`    |
| an employer, trainer or university       | `src/content/organisations/<type>/<id>.md`                         |
| a UI string                              | `messages/en.json` (see **`i18n-messages`**)                       |
| a project or its screenshot              | `src/content/projects/`, image in `projects/img/`                  |
| a primitive used by two or more sections | `src/components/block/`                                            |
| a part used by one section only          | that section's folder under `components/home/`                     |
| a hero stat                              | `src/content/accomplishments/` (see **`content-accomplishments`**) |
| a component a content file imports       | `src/components/content/`                                          |
| a helper (no DOM; may read a collection) | `src/lib/`                                                         |
| an image a component imports             | `src/assets/`                                                      |
| a file served at a fixed URL             | `public/`                                                          |

`<org-folder>` is a readable folder for grouping and does not have to equal the
organisation's `id` (`andalucia.com/` holds `organisationId: andalucia`). The
`organisationId` inside the file is what joins it.

## Page order and anchors

`src/pages/index.astro` is the only place the order is set:

| #   | Section    | Component         | `id`         | In nav | Band | Pill   |
| --- | ---------- | ----------------- | ------------ | ------ | ---- | ------ |
| 1   | Hero       | `home/hero`       | none         | no     | base | none   |
| 2   | Projects   | `home/projects`   | `projects`   | yes    | sand | yellow |
| 3   | How I work | `home/how-i-work` | `how-i-work` | yes    | base | blue   |
| 4   | Career     | `home/career`     | `career`     | yes    | sand | green  |
| 5   | Learning   | `home/learning`   | `learning`   | yes    | base | pink   |
| 6   | Contact    | `home/contact`    | `contact`    | no     | sand | teal   |

Two couplings to keep in step when reordering or adding:

- An `href="/#x"` in `src/lib/sections.ts`, or on a `Button` such as the hero's
  "See what I've built" (`#projects`) and "Get in touch" (`#contact`), needs a
  section with `id="x"`. Removing or renaming an id breaks the link silently
- Sections alternate base and sand (`Section alt`) bands. Moving one usually
  means flipping `alt` on its neighbours so two sand bands never touch
