---
name: content-gists
description:
    The GitHub gists in src/content/gists/, listed as "Notes and snippets" at
    the bottom of the Projects section. Use whenever the user wants to add,
    rename, reorder or remove a gist, a snippet or a setup guide on the site, or
    a gist's language tag or link needs changing.
---

# Gists

Each file is one row of the "Notes and snippets" list under the project cards:
the title over the file name, then the language tag and a "View gist" link. Why
the block looks as it does is in **`design-brief`**, and how it is rendered in
**`components-sections`**.

## Frontmatter

```yaml
---
title: Set up Node.js with NVM
filename: README Node Version Manager.md
language: Markdown
uri: https://gist.github.com/mjakinowittering/afd7eea6db10ca96609cb79e4aa7471c
index: 3 # position, highest first
---
```

The file's **body is not rendered**; leave it empty.

### `title`

A short description of what the gist does, in sentence case, starting with a
verb. It can be plainer than the gist's own description on GitHub. It also names
the row's link for a screen reader ("View gist: …"), so no two gists share one.

### `filename`

The gist's file name exactly as GitHub shows it, spaces and all.

### `language`

`Markdown`, `CSS` or `Shell`, the enum in `content.config.ts`. A gist in another
language adds its value there in the same commit.

### `uri`

The gist's page on `gist.github.com`. The list's "All gists" link is `gistsUri`
in `src/lib/socials.ts`.

### `index`

Higher comes first, the reverse of the projects, so the next number up puts a
new gist at the top. Renumber the others when inserting elsewhere, so indexes
stay 1, 2, 3…

## Checklist

1. `uri` opens the gist, and `filename` and `language` match it
2. `title` is unique, and the body is empty
3. `index` places it where intended
4. `npm run build`, then check the row at phone, tablet and desktop widths
