---
name: content-blurbs
description:
    The section copy in src/content/blurbs/, for today's About me, My experience
    and What I do intros and the redesign's hero, How I work, Career and contact
    copy. Use whenever the user wants to change their headline, introduction,
    bio, profile summary, career story or "how I work" copy, or asks how the
    years-of-experience figure is shown.
---

# Blurbs: section copy

Each file is read by exactly one component by its file name. Three feed today's
page:

| File              | Read by                         | Shows as                                             |
| ----------------- | ------------------------------- | ---------------------------------------------------- |
| `about-me.mdx`    | `home/about-me/index.astro`     | the `<h1>` and opening paragraphs                    |
| `experience.md`   | `home/experience/index.astro`   | "My experience" heading, subtitle, story             |
| `what-do-i-do.md` | `home/what-do-i-do/index.astro` | "What I do" heading, subtitle, intro above the cards |

Four more hold the redesign's copy and are read by nothing until their section
is built (see **`design-brief`**). Their bodies are Matthew's draft, kept as
written; How I work and contact are to be rewritten in his own voice:

| File            | `title` (the section heading) | Feeds                               |
| --------------- | ----------------------------- | ----------------------------------- |
| `hero.mdx`      | I'm Matthew, a product leader | 1. Hero: the lead paragraph         |
| `how-i-work.md` | How I work                    | 3. How I work: the two sentences    |
| `career.md`     | Where I've worked             | 4. Career: the intro above the list |
| `contact.md`    | Fancy a chat about product?   | 6. Contact: the panel's sentences   |

The file name **is** the key (`getEntry('blurbs', 'about-me')`). Renaming a file
breaks its section; a new file does nothing until a component reads it.

## Frontmatter

```yaml
---
title: My experience # the section heading (the <h1> for about-me)
subtitle: The story behind the CV # optional; about-me has none
---
```

## Body

Plain Markdown, except `about-me.mdx` and `hero.mdx`, which are MDX because they
show the years in product. Each imports `CareerLength` from
`@components/content/CareerLength.astro` and writes `<CareerLength />` where the
figure goes; it renders "16+ years" inside a `<time>`, counted from the
`careerStart` event (see `CLAUDE.md`, "Derived, never stored"). Never type the
number or the date. Turn a blurb into `.mdx` only when it has to compute too,
and keep the computing in a component or `src/lib/`, not the blurb.

## Voice

General writing rules are in `CLAUDE.md`. Where the hero and how-I-work copy is
heading in the redesign is in **`design-brief`**; until those sections are
rebuilt, the rules below describe today's blurbs. For blurbs:

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
