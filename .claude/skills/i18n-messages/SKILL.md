---
name: i18n-messages
description:
    Authoring Paraglide message keys in messages/en.json with copy whose length
    and register match the existing sibling strings. Use whenever adding or
    editing a section title, subtitle, badge, nav label, button text, alt text,
    page metadata or any other UI string, naming a message key, or tempted to
    type English straight into a component.
---

# Paraglide messages

Every UI string goes through Paraglide (the rule is in `CLAUDE.md`). The value
here is **not** translation: the site ships English only (`locales: ["en"]` in
`project.inlang/settings.json`), with no locale switcher and no second file. It
is keeping copy out of the markup, in one place, editable without touching
components.

## Message or content?

| It is…                                                | It goes in         |
| ----------------------------------------------------- | ------------------ |
| prose about Matthew's work: a role, a course, a blurb | `src/content/`     |
| a label a component puts around that content          | `messages/en.json` |
| a section title, subtitle, badge, nav or button label | `messages/en.json` |
| `alt` text for an image a component imports           | `messages/en.json` |
| `alt` text for an image a content file references     | that file's `alt`  |
| an `aria-label` for an icon, or an icon-only link     | `messages/en.json` |
| `<title>` and meta description                        | `messages/en.json` |

Which images and icons need text, and of which kind, is in `CLAUDE.md`,
Accessibility.

A section heading that comes from a blurb's `title` stays in the blurb; only
sections without a blurb (Career, Projects, Education, Training) take their
title from a message.

## Key naming

Keys are `snake_case`: `<domain>_<element>`. The domain is the section or
primitive that shows the string. **Reuse an existing domain**; grep for the
prefix before adding a key:

| prefix                                            | covers                                                   |
| ------------------------------------------------- | -------------------------------------------------------- |
| `site_`                                           | the name, `<title>` pattern and meta description         |
| `nav_`, `social_`, `footer_`                      | the top bar, the social links, the footer                |
| `about_`                                          | the About section's buttons                              |
| `experience_`, `what_i_do_`                       | the two blurb-led sections                               |
| `career_`, `projects_`, `education_`, `training_` | the four list sections                                   |
| `course_`                                         | one training row inside the Training timeline            |
| `content_`                                        | fallbacks shared by every section                        |
| `external_`                                       | the new-tab text inside `Button` and `ExternalTextLink`  |
| `date_`, `duration_`                              | date ranges and lengths, used through `src/lib/utils.ts` |
| `not_found_`                                      | the 404 page                                             |

The **suffix** declares the string's family, and the family sets its length.

## The length rule

Before writing a value, find its siblings, the keys sharing its suffix, and
match their length and tone. Measured off the current `en.json`:

| family                                           | register                                      | example                                   |
| ------------------------------------------------ | --------------------------------------------- | ----------------------------------------- |
| `_title`                                         | one or two words, the section's name          | `"Career"`                                |
| `_subtitle`                                      | one short line, first person, no stop         | `"Where I've worked and what I've built"` |
| `_badge`                                         | one word under the section icon               | `"Employer"`                              |
| `nav_*`                                          | one word, the section's title                 | `"Projects"`                              |
| action (`_view_*`, `_try_live`, `_get_in_touch`) | two or three words, verb first, sentence case | `"View certificate"`                      |
| `_alt`                                           | what the image shows                          | `"Alien with Spock hand"`                 |
| `_description`                                   | one sentence, ends with a stop                | the 404 and meta descriptions             |

Stay within roughly half again of the siblings' length. A badge that runs to two
words, or a subtitle that becomes a sentence with a stop, breaks the layout the
component was built around. The writing rules in `CLAUDE.md` (British English,
no em dashes in copy) apply here too; the en dash in `date_range` is correct.

## Parameters and plurals

Interpolate with `{name}`, matching the surrounding keys:

```json
"site_title": "{title} - {site}",
"footer_copyright": "© {year} {name}"
```

A parameter carries a value the code already has. It is **not** a way to build
English in a component and pass it through: pass the parts and let the key own
the words. Counted words use the plural form the `duration_*` keys show
(`declarations`, `selectors`, `match` on `=one` and `=*`); copy one of them
rather than writing `"{n} year(s)"`.

## Workflow

1. Grep `messages/en.json` for the domain prefix and the suffix family.
2. Add the key beside its domain neighbours, matching the name pattern and
   length.
3. Use it as `m.<key>()`, imported from `@paraglide/messages.js`. In a list of
   links, store the function (`label: m.nav_career`) and call it where it is
   rendered, as `Nav.astro` does.
4. `npm run dev` and `npm run build` recompile `src/paraglide/` through the Vite
   plugin. For `npm run astro check` on a fresh checkout, compile first:
   `npx paraglide-js compile --project ./project.inlang --outdir ./src/paraglide`
5. **A key nothing references is deleted**, in the same commit as whatever
   stopped using it. Check with `grep -rn "m.<key>" src`.
