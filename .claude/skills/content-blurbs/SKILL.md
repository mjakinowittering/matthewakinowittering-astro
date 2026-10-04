---
name: content-blurbs
description:
    The intro copy for the About me, My experience and What I do sections, in
    src/content/blurbs/. Use whenever the user wants to change their headline,
    introduction, bio, profile summary, career story or "how I work" copy, or
    asks how the years-of-experience figure is shown.
---

# Blurbs: section intro copy

Three files, each read by exactly one component by its file name:

| File              | Read by                         | Shows as                                             |
| ----------------- | ------------------------------- | ---------------------------------------------------- |
| `about-me.mdx`    | `home/about-me/index.astro`     | the `<h1>` and opening paragraphs                    |
| `experience.md`   | `home/experience/index.astro`   | "My experience" heading, subtitle, story             |
| `what-do-i-do.md` | `home/what-do-i-do/index.astro` | "What I do" heading, subtitle, intro above the cards |

The file name **is** the key (`getEntry('blurbs', 'about-me')`). Renaming a file
breaks its section; adding a fourth file does nothing until a component reads
it.

## Frontmatter

```yaml
---
title: My experience # the section heading (the <h1> for about-me)
subtitle: The story behind the CV # optional; about-me has none
---
```

## Body

Plain Markdown, except `about-me.mdx`, which is MDX because it computes: it
exports a `dateFrom` and uses `calcLengthInYears` to render "16+ years" inside a
`<time>` element. Keep any logic that small; anything bigger belongs in
`src/lib/`. Turn a blurb into `.mdx` only when it has to compute too.

The career start date (`2010-01-01`) is also set in `pages/index.astro` for the
meta description. Change both together until it has one home (a Todo item in
`README.md`).

## Voice

General writing rules are in `CLAUDE.md`. For blurbs:

- First person, present tense: these describe who Matthew is now
- **about-me**: two short paragraphs. What he does and where, then what he is
  best at. A recruiter should get it in ten seconds
- **experience**: three or four paragraphs telling the career as a story, newest
  first: the current role and its products, then earlier roles more briefly.
  Link company names inline. It complements the Career timeline, so it does not
  repeat role bodies sentence for sentence
- **what-do-i-do**: two short paragraphs on how he works. The three skill cards
  below it carry the specifics
- Concrete over abstract: name products, numbers and kinds of problem rather
  than adjectives like "passionate" or "results-driven"
