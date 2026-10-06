---
name: content-blurbs
description: >-
    The section copy in src/content/blurbs/: the hero's heading and lead, How I
    work, the Career intro and the contact panel. Use whenever the user wants to
    change their headline, introduction, bio, profile summary, career story, how
    I work or contact copy, or asks how the years-in-product figure is shown.
---

# Blurbs: section copy

Each file is read by exactly one component, by its file name:

| File            | `title` shows as                      | Body shows as                        | Read by           |
| --------------- | ------------------------------------- | ------------------------------------ | ----------------- |
| `hero.mdx`      | the `<h1>`, "I'm Matthew, a product…" | the lead paragraph under it          | `home/hero`       |
| `how-i-work.md` | the blue pill, as the section's `h2`  | the two sentences, a short statement | `home/how-i-work` |
| `career.md`     | the Career heading                    | the intro above the roles            | `home/career`     |
| `contact.md`    | the heading above the contact panel   | the panel's sentences                | `home/contact`    |

The file name **is** the key (`getEntry('blurbs', 'career')`). Renaming a file
breaks its section; a new file does nothing until a component reads it.

The short labels around a blurb are messages, not blurb fields: the section
pills, and the marker lines in Permanent Marker ("and builder." under the hero
heading, "What are you building?" in the panel). See **`i18n-messages`**.

## Frontmatter

```yaml
---
title: Where I've worked # the section heading (the <h1> for hero)
---
```

## Body

Plain Markdown, except `hero.mdx`, which is MDX because it shows the years in
product. It imports `CareerLength` from `@components/content/CareerLength.astro`
and writes `<CareerLength />` where the figure goes; it renders "16+ years"
inside a `<time>`, counted from the `careerStart` event (see `CLAUDE.md`,
"Derived, never stored"). Never type the number or the date. Turn a blurb into
`.mdx` only when it has to compute too, and keep the computing in a component or
`src/lib/`, not the blurb. Every MDX entry draws a `MODULE_LEVEL_DIRECTIVE`
warning from Astro itself (a Bugs item in `README.md`), another reason to keep
to `.md`.

## Voice

General writing rules are in `CLAUDE.md`; what each section is for is in
**`design-brief`**. For blurbs:

- First person, present tense: these describe who Matthew is now
- **hero**: one short paragraph qualifying the heading with the hireable angle:
  data-heavy B2B SaaS, 0 to 1, AI, and happy writing the query or the spec as
  well as the strategy
- **how-i-work**: two sentences only, carrying the product canon without naming
  it (`design-brief`, "Hidden structure")
- **career**: two or three sentences on the arc, which the role bodies below
  then record in detail; it does not repeat them
- **contact**: three short sentences, warm and understated, never a call to
  action
- How I work and contact are Matthew's drafts, to be rewritten in his own voice
  (a Features item in `README.md`); keep them as written until he does
- Concrete over abstract: name products, numbers and kinds of problem rather
  than adjectives like "passionate" or "results-driven"
