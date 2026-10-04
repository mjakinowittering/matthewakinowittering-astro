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
    ├── assets/                    images imported by components (avatar, 404 alien)
    ├── content.config.ts          the five collection schemas
    ├── content/
    │   ├── blurbs/                about-me.mdx, experience.md, what-do-i-do.md
    │   ├── organisations/
    │   │   ├── employer/          one .md per employer
    │   │   ├── trainer/           one .md per course provider
    │   │   └── university/        one .md per university
    │   ├── events/
    │   │   ├── employment/<yyyy-mm>/<org>/  one .md per role
    │   │   └── courses/<yyyy-mm>/<org>/     one .md per course or degree
    │   ├── skills/                three cards + img/
    │   └── projects/              one .md per project + img/
    ├── components/
    │   ├── block/                 shared primitives, no content knowledge
    │   └── home/                  one folder per page section
    │       ├── about-me/
    │       ├── experience/
    │       │   ├── index.astro    the "My experience" blurb section
    │       │   ├── topics/        employment/, training/, education/ sections
    │       │   ├── organisation/  one timeline entry: dot, name, its events
    │       │   └── event/         Role, Course, Education, EventDescription.svelte
    │       ├── what-do-i-do/      section + Skill card
    │       └── projects/          section + Project card
    ├── layouts/Layout.astro       <head>, fonts, body shell
    ├── lib/
    │   ├── socials.ts             the LinkedIn and GitHub links
    │   └── utils.ts               date formatting and duration helpers
    ├── paraglide/                 compiled messages; generated, git-ignored
    ├── pages/
    │   ├── index.astro            composes the sections in order
    │   └── 404.astro
    └── styles/global.css          Tailwind import, @theme tokens, .prose overrides
```

## Where a new file goes

| Adding…                                  | Goes in                                                          |
| ---------------------------------------- | ---------------------------------------------------------------- |
| a role                                   | `src/content/events/employment/<yyyy-mm>/<org-folder>/<role>.md` |
| a course or degree                       | `src/content/events/courses/<yyyy-mm>/<org-folder>/<course>.md`  |
| an employer, trainer or university       | `src/content/organisations/<type>/<id>.md`                       |
| a UI string                              | `messages/en.json` (see **`i18n-messages`**)                     |
| a project or its screenshot              | `src/content/projects/`, image in `projects/img/`                |
| a primitive used by two or more sections | `src/components/block/`                                          |
| a part used by one section only          | that section's folder under `components/home/`                   |
| a pure helper (no Astro, no DOM)         | `src/lib/`                                                       |
| an image a component imports             | `src/assets/`                                                    |
| a file served at a fixed URL             | `public/`                                                        |

`<org-folder>` is a readable folder for grouping and does not have to equal the
organisation's `id` (`andalucia.com/` holds `organisationId: andalucia`). The
`organisationId` inside the file is what joins it.

## Page order and anchors

`src/pages/index.astro` is the only place the order is set:

| #   | Section       | Component                           | `id`        | In Nav | `alt` band |
| --- | ------------- | ----------------------------------- | ----------- | ------ | ---------- |
| 1   | About         | `home/about-me`                     | `about`     | yes    | no         |
| 2   | My experience | `home/experience`                   | none        | no     | yes        |
| 3   | What I do     | `home/what-do-i-do`                 | none        | no     | no         |
| 4   | Career        | `home/experience/topics/employment` | `career`    | yes    | yes        |
| 5   | Projects      | `home/projects`                     | `projects`  | yes    | no         |
| 6   | Education     | `home/experience/topics/education`  | `education` | yes    | yes        |
| 7   | Training      | `home/experience/topics/training`   | none        | no     | no         |

Two couplings to keep in step when reordering or adding:

- An `href="#x"` in `Nav.astro`'s `navLinks`, or on a `Button` such as "View
  projects", needs a section with `id="x"`. Removing or renaming an id breaks
  the link silently
- Sections alternate plain and `alt` bands. Moving one usually means flipping
  `alt` on its neighbours so two sand bands never touch
