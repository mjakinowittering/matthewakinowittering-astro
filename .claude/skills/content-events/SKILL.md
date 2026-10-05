---
name: content-events
description:
    Adding or editing a role, course or degree in src/content/events/, including
    its frontmatter, dates, link and body copy. Use whenever the user mentions a
    new job, promotion, leaving a role, a course, certificate, certification,
    badge or degree, or wants to update their career history, CV or training
    list on the site, even if they don't say "event".
---

# Events: roles, courses and degrees

An event is one thing Matthew did at one organisation. Its `type` decides which
section shows it and which component renders it.

| `type`       | Section   | Rendered by       | Lives in                             |
| ------------ | --------- | ----------------- | ------------------------------------ |
| `employment` | Career    | `Role.astro`      | `events/employment/<yyyy-mm>/<org>/` |
| `training`   | Training  | `Course.astro`    | `events/courses/<yyyy-mm>/<org>/`    |
| `education`  | Education | `Education.astro` | `events/courses/<yyyy-mm>/<org>/`    |

`<yyyy-mm>` is the year and month of the event's `dateFrom`, so a folder listing
reads in date order. If `dateFrom` changes, move the file to match. The folder
is for finding files only: the page still sorts by the dates in frontmatter.

## Frontmatter

```yaml
---
title: Lead Product Manager # the role, course or degree name
organisationId: acorn-i # the organisation's frontmatter `id`
type: employment # employment | training | education
uri: https://… # optional, see below
dateFrom: '2019-08-05T00:00:00+00:00' # quoted ISO 8601 with offset
dateTo: '2021-03-31T00:00:00+00:00' # omit while ongoing
---
```

Quote a `title` containing a colon:
`title: 'Radical Product Thinking: Vision Setting'`.

### `organisationId`

Must equal the `id` in an organisation file, which is **not always the file
name**: Scrum Alliance's is `scrumalliance`. Open the organisation file and copy
its `id`. If the organisation does not exist yet, create it first (see
**`content-organisations`**). A wrong value does not fail the build; the event
just disappears, so always check the page afterwards.

### `uri`, per type

| Type         | What it points at            | What renders                                   |
| ------------ | ---------------------------- | ---------------------------------------------- |
| `training`   | the certificate or badge URL | a tick before the title and "View certificate" |
| `education`  | the course page              | "View course"                                  |
| `employment` | nothing; leave it out        | not rendered                                   |

A training event without a certificate omits `uri`, and loses the tick.

### Dates, per type

| Type         | `dateFrom`              | `dateTo`                     | Shows as                                |
| ------------ | ----------------------- | ---------------------------- | --------------------------------------- |
| `employment` | first day in the role   | last day; omit while current | `Aug 2019 – Present · 7 years 3 months` |
| `training`   | the completion date     | omit                         | `Mar 2026`                              |
| `education`  | first day of the course | the end of the course        | `2005 – 2009 · 3 years 11 months`       |

Use midnight UTC (`T00:00:00+00:00`) unless the existing siblings use an
end-of-day time. An ongoing role's duration is computed in the browser, so it
keeps counting without a redeploy.

**A promotion is a new event**, not an edit: give the old role its `dateTo` and
add the new role with the next day's `dateFrom` (The Exchange Lab's two roles
show this). **Leaving a role** is adding its `dateTo`. The organisation's span
and the timeline's active dot follow on their own.

## Body copy, per type

General writing rules are in `CLAUDE.md`, Writing. On top of those:

### `employment`

- One paragraph, roughly 40 to 90 words, past tense even for the current role
- Open with a short subjectless fragment that frames the role, then switch to
  "I": _"First product hire into a services business with ambitions to build
  SaaS. I took Ignite from…"_ / _"Promoted to lead the Vendor Integrations
  portfolio. I ran…"_
- Lead with outcomes and scale, using Matthew's real figures (users, brands,
  uplift, time saved). Name the products he owned
- The "My experience" blurb tells the career as a story; a role body is the
  specific record. Do not copy sentences between them

### `training`

The body's voice and length are set by **`rewrite-course`**; load it and follow
its style rules. When adding a new course from pasted material, write the
frontmatter here, then apply `rewrite-course` to the body.

### `education`

Two short paragraphs in first person, past tense: what was studied, then what it
led to or why it still matters. Loughborough's entry is the reference.

## Checklist

1. Organisation exists and its `id` is copied exactly into `organisationId`
2. File is in the right folder for its `type`, named in kebab-case after the
   title
3. Dates are quoted, have an offset, and `dateTo` is absent if ongoing
4. `uri` follows the per-type table
5. Body follows the voice for its type
6. `npm run build`, then open the page and find the event in its section
