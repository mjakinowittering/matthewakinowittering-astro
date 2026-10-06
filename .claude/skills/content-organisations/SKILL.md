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
- It is what every event's `organisationId` must match. The loader keys each
  entry by this `id` (`generateId` in `content.config.ts`), so the file path
  plays no part in the join, and a reference to an `id` that doesn't exist logs
  an "Invalid content reference" error in the build
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

## How each type is shown

| Type         | Section  | Shown as                                                    |
| ------------ | -------- | ----------------------------------------------------------- |
| `employer`   | Career   | "role at **name**" on each of its roles; roles sort by date |
| `trainer`    | Learning | a heading over its courses; providers sort by latest course |
| `university` | Learning | the name on the degree card                                 |

An organisation with no events does not appear. The logic lives in the section
components; see **`components-sections`**.

## Checklist

1. `id` is new, kebab-case and matches the file name
2. File is under the folder for its `type`
3. `uri` resolves and is the homepage or the LinkedIn fallback
4. At least one event points at it, or it will not appear
5. `npm run build`, then check the heading and its link on the page
