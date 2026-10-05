---
name: content-skills
description:
    The three "What I do" cards in src/content/skills/ (Vision & Strategy,
    Discovery, Development). Use whenever editing, reordering, adding or
    removing one of these cards, changing a card's icon, or rewriting how
    Matthew describes his way of working, even when the user calls them "craft",
    "strengths" or "capabilities".
---

# Skills: the "What I do" cards

Each file is one card in a three-column grid under the What I do blurb.

## Frontmatter

```yaml
---
title: Discovery # card heading
img: ./img/archeologist.svg
alt: Tomb Raider
index: 2 # position, 1 first
---
```

### `index`

Sets the order (cards are sorted by it) **and picks the icon**. `Skill.astro`
maps `1 → Compass`, `2 → Search`, `3 → Code`, falling back to `Compass`.
Reordering cards therefore swaps their icons too. If an icon should stay with
its card, move the mapping onto a frontmatter field rather than juggling
numbers.

### `img` and `alt`

Required by the schema, validated as images, and **not rendered**: the cards
show Lucide icons now. Keep both fields valid so the build passes; what to do
with them is an open decision in `README.md`'s Todo, so ask Matthew before
removing or reviving them.

## Adding or removing a card

The section is built for three. A fourth card needs, in the same change: a new
icon in `Skill.astro`'s map, and a decision about the grid in
`what-do-i-do/index.astro` (`md:grid-cols-3` would wrap it onto a row of its
own). Raise the layout question before adding.

## Body

One paragraph, 60 to 80 words, first person, present tense. Shape:

1. A plain claim about why this stage matters (_"Good products start with a
   clear sense of purpose."_)
2. What Matthew does in it, concretely
3. What goes wrong without it, or the line he holds

General writing rules are in `CLAUDE.md`. Where the how-I-work copy is heading
in the redesign is in **`design-brief`**.
