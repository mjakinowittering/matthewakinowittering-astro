---
name: content-projects
description:
    The project cards in src/content/projects/, with their description, tags,
    screenshot and live/source links. Use whenever the user wants to add a side
    project, app, tool or build to the site, update a project's screenshot or
    links, reorder projects, or remove one.
---

# Projects

Each file is one card in the Projects section: screenshot on one side, title,
description, tags and two buttons on the other. Where the Projects section and
its copy are heading in the redesign is in **`design-brief`**.

## Frontmatter

```yaml
---
title: YouDemo
description:
    A browser-only screen and webcam recorder, deployable straight to GitHub
    Pages. No backend, no SSR, no routing library, just record, edit and
    download.
uri: https://mjakinowittering.github.io/youdemo/ # "Try it live"
sourceUri: https://github.com/mjakinowittering/youdemo # "View source", optional
tags:
    - Browser-only
    - No backend
    - Static hosting
index: 1 # position, 1 first
img: ./img/youdemo.png # optional
alt:
    YouDemo recorder interface with a No screen selected prompt and a Start
    Recording button
---
```

`uri` is required: every project has a live version to try. `sourceUri` is
optional: set it only when the code is public, and `Project.astro` renders the
"View source" button only when it is set. DyslexicWriter has no `sourceUri`, so
its card shows "Try it live" alone. Never point `sourceUri` at something other
than the source.

### `description`

The card's only prose, rendered as plain text, so no markdown or links. One or
two sentences: what it is, then what makes it notable. Short fragments are fine
here. The file's **body is not rendered**; leave it empty.

### `tags`

Two to four, each one to three words, sentence case. They describe the build's
character (constraints, approach), not a list of every library used.

### `img` and `alt`

A screenshot of the real interface in `projects/img/`, referenced relatively.
`<Image>` optimises it at build time, so a large PNG is fine. `alt` describes
what the screenshot shows, not what the project is for.

Without `img`, `Project.astro` shows a striped placeholder with the
`projects_screenshot_placeholder` message. It is a stopgap; add the real
screenshot when there is one.

### `index`

Lower comes first. Renumber the others when inserting, so indexes stay 1, 2, 3…

## Checklist

1. `uri` loads the deployed build, and `sourceUri` (if set) is the public repo
2. Description is one or two plain sentences, body empty
3. Screenshot is current and `alt` describes it
4. `index` places it where intended
5. `npm run build`, then check the card at phone, tablet and desktop widths
