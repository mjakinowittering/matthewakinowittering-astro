---
name: content-organisations
description:
    Adding or editing an employer, course provider or university in
    src/content/organisations/. Use whenever a new company, training provider or
    university needs to appear on the site, when an organisation's name or link
    changes, or before adding a role or course for an organisation that doesn't
    exist yet.
---

# Organisations: employers, trainers, universities

An organisation is the heading a group of events sits under on a timeline. It
holds no prose; its events carry the story.

## Frontmatter

```yaml
---
id: acorn-i # the join key events point at
name: Acorn-i # shown as the timeline heading
type: employer # employer | trainer | university
uri: https://acorn-i.com/ # where the heading links to
---
```

The file has no body. It goes in `src/content/organisations/<type>/<id>.md`.

### `id`

- Kebab-case, and the same as the file name for anything new
- It is what every event's `organisationId` must match. The file path plays no
  part in the join
- **Never change an existing `id`** without updating every event that uses it in
  the same commit. Search first:
  `grep -r "organisationId: <old-id>" src/content/events`. `scrumalliance` does
  not match its file name `scrum-alliance.md`; leave it unless you are renaming
  both sides

### `name`

The organisation's own styling of its name (`Acorn-i`, `Andalucia.com`,
`ScrumAlliance`), not a description.

### `uri`

The organisation's homepage. When the company no longer exists or has no useful
site, link its LinkedIn company page instead (The Exchange Lab does this). It
always renders through `ExternalTextLink`, so it opens in a new tab.

### Fields to leave out

The schema also accepts `dateFrom`, `dateTo` and `events`. Do not set them: an
organisation's span and event count are derived from its events at render time
(see `CLAUDE.md`, "Derived, never stored"). Loughborough's file still carries
old values that nothing reads; dropping the fields is a Todo item in
`README.md`.

## How each type is shown

| Type         | Section   | Hidden when it has no events | Sorted by                           |
| ------------ | --------- | ---------------------------- | ----------------------------------- |
| `employer`   | Career    | yes                          | its **earliest** role, newest first |
| `trainer`    | Training  | yes                          | its **latest** course, newest first |
| `university` | Education | no                           | collection order                    |

An employer with a role that has no `dateTo` gets a filled timeline dot, marking
it as current. The logic lives in the section components; see
**`components-sections`**.

## Checklist

1. `id` is new, kebab-case and matches the file name
2. File is under the folder for its `type`
3. `uri` resolves and is the homepage or the LinkedIn fallback
4. At least one event points at it, or it will not appear (except universities)
5. `npm run build`, then check the heading and its link on the page
