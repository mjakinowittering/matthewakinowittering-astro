---
name: content-accomplishments
description:
    The stat figures in src/content/accomplishments/ that the hero shows as
    cards (1,200+, 250+, 150+). Use whenever the user wants to add, update or
    remove a headline number, a stat, a metric or an achievement figure, or asks
    how the stat cards are ordered or formatted.
---

# Accomplishments

Each file is one stat card in the hero (`home/hero/index.astro`): the number in
marker, then the caption in sans. A card shows no organisation. Read them
through `getAccomplishments()` in `src/lib/accomplishments.ts`, never
`getCollection` directly, so every reader gets the same order.

## Frontmatter

```yaml
---
value: 1200 # a plain number, no separators or quotes
suffix: '+' # optional, shown straight after the number
caption: people across 15+ agencies use Ignite for eCommerce and Retail Media
    analytics # the text after the number
---
```

The body is not rendered; leave it empty. Name the file after what it counts, in
kebab-case (`ignite-people.md`).

### `value` and `suffix`

`value` is a positive whole number. Write `1200`, never `"1,200"`: the thousands
separator is added by `formatAccomplishment(value, suffix)`, with `en-GB`
formatting, so `1200` and `+` show as "1,200+". The `+` is a `suffix`, not part
of the number.

### `caption`

Lower-case start, no full stop: it reads on from the number ("1,200+ people
across…"). One line of plain text, no markdown.

## Order

Largest `value` first, derived by `getAccomplishments()`. There is no `index`:
to move a card, the number has to change, which only happens when the fact does.

## Figures are Matthew's

Every `value` is a real figure Matthew has given. Never invent one, round it up,
or turn "about 1,150" into "1,200+". When a figure changes, change the file; if
the same figure is also typed in a role body (Ignite's are in the Acorn-i role),
change that too until it has one home.

## Checklist

1. `value` is a plain whole number Matthew gave, `suffix` only if he uses one
2. `caption` reads on from the number, lower-case start, no full stop
3. Body empty
4. `npm run build`, then check the card in the hero
