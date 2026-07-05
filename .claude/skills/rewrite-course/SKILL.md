---
name: rewrite-course
description:
    Rewrite the body of a course .mdx under src/content/events/courses into the
    site's house style, preserving frontmatter. Invoke as /rewrite-course
    <path-to-file>.
---

# Rewrite course description

Rewrites the body of a completed-course `.mdx` file into the site's house style,
so raw pasted-in source material (curriculum text, learning objectives,
marketing copy) reads like the other entries in `src/content/events/courses/`.

The target is a short, to-the-point paragraph that quickly conveys **what the
course was** and **why it matters**. It should read as a factual summary, not as
marketing material for the course.

## Argument

A single path to the target `.mdx` file, e.g.
`/rewrite-course src/content/events/courses/anthropic/claude-code-101.mdx`.

If no path is given, ask which file to rewrite before doing anything else.

## Procedure

1. **Read the target file.** Note its frontmatter, especially `type` (`training`
   vs `education`) and `organisationId`.
2. **Calibrate against siblings.** Read 1 to 3 other `.mdx` files in the _same_
   organisation directory (the folder the target file sits in). Use them to
   settle the two things that vary between organisations: whether the voice uses
   first person ("my", "me") or stays neutral, and the typical length. Match the
   siblings. If the folder has no other files, fall back to the style rules
   below and a neutral voice.
3. **Rewrite the body only**, following the style rules below. Leave the
   frontmatter (everything between the opening and closing `---`) completely
   untouched, character for character.
4. **Apply the change in place** with an Edit that replaces the old body with
   the new one. Do not touch the frontmatter.
5. **Print a one-line summary** of what changed (for example, "Collapsed the
   learning-objectives list into a single past-tense paragraph").

Do not ask for approval of the wording before editing; make the edit and let the
user review it with `git diff`. It is version-controlled and easy to revert.

## Style rules

**Structure**

- Frontmatter is preserved byte for byte. Never edit it.
- The body is flowing prose only. Remove all headings, bullet lists, and
  scaffolding such as `Curriculum` or `About this course`, and any duplicated
  course title.
- One short paragraph for `type: training` entries, even when the source is
  deep. Do not expand into a second paragraph or a long exhaustive list.
  `type: education` entries run two short paragraphs.

**Voice and tense**

- Past tense throughout.
- Open with `This course ` followed by a verb such as _introduced_, _covered_,
  _explored_, _grounded_, or _deepened_, and state plainly what the course was
  about. Name the core framework or methodology if the source has one.
- Follow with one or two short sentences drawing out only the most important
  themes. Fold the "why it matters" into brief purpose clauses (for example, "to
  drive measurable business outcomes", "outcomes that matter to both customers
  and the business") rather than a separate sentence.
- Be reflective and factual, describing what the course covered rather than
  selling it. Strip all second-person marketing copy such as "you'll be able
  to", "you'll learn", "you'll discover", and "by the end of this course".
- First-person ("my", "me") usage varies by organisation. Match the sibling
  files from step 2 rather than guessing.

**Language**

- British English spelling (organisation, prioritise, specialise, behaviour).
- No em-dashes. Use commas or restructure the sentence instead.
- Short and to the point: aim for 2 to 4 sentences, roughly 50 to 90 words.
  Resist letting a deep source balloon the length; select, do not inventory.

**Content**

- Collapse learning-objective bullets into a couple of grouped themes, not a
  sentence per bullet. Summarise the point of the course rather than cataloguing
  everything it touched.
- Keep technical terms accurate. Do not invent detail that is not in the source.

## Reference examples

Model tone and length on these short, to-the-point entries:

- `src/content/events/courses/pendo/product-analytics-certification.mdx`
- `src/content/events/courses/pendo/ai-for-product-managers.mdx`
- `src/content/events/courses/pendo/radical-product-thinking.mdx`
- `src/content/events/courses/scrum-alliance/certified-scrum-product-owner.mdx`

Avoid the sprawl of the longer, exhaustive entries.
