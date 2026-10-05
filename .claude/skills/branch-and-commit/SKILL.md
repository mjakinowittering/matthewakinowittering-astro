---
name: branch-and-commit
description:
    How work is branched, committed, pushed and released in this repo, with a
    branch cut off develop as the first step of an approved plan, a short
    imperative subject plus a bulleted commit body, a PR offered into develop,
    and develop released into main only when asked. Load before creating a
    branch, staging or writing a commit message, pushing, running gh pr create,
    or when the user wants to publish or release the site.
---

# Branch and commit

Reload this skill at each step rather than working from memory of an earlier
load.

`main` is production: every push to it deploys the live site. `develop` is where
finished work collects. Work branches come off `develop` and return to it by PR;
`main` only moves in a release (see the end of this skill).

## Branch, before the first edit

Cut it **right after a plan is approved**, before any file is touched, off an
up-to-date `develop`, never `main` or whatever is checked out. The first action
after approval is `git branch --show-current`; if that isn't `develop`, switch
to it before branching:

```
git switch develop && git pull --ff-only && git switch -c <prefix>/<description>
```

If `develop` doesn't exist yet, stop and ask before creating it: it is cut from
`main` and pushed once,
`git switch -c develop main && git push -u origin develop`.

**Unless a second process is editing.** Switching branches rewrites the working
tree under anything else using it. Before switching, run `ListAgents` and
`git status`: if another session is working in this repo, or there are
uncommitted changes this session didn't make, don't switch; stop and ask.

**Every plan starts from `develop`; never stack a branch on another.** If the
previous plan's branch is still checked out or unmerged, switch back to
`develop` anyway. If the new plan needs that unmerged work, stop and ask: its PR
should merge into `develop` first.

- **Prefix**: `bug/` for something already built that doesn't behave as
  intended; `feature/` for work not yet built, plus the decisions and chores
  that go with it. Content changes (a new role, a rewritten blurb) are
  `content/`. Guidance-only changes (`CLAUDE.md`, skills, README) are `docs/`.
  From a README Todo item the **list decides**: `### Bugs` → `bug/`,
  `### Features` → `feature/`; a selection spanning both takes `feature/`.
- **Description**: kebab-case, 3 to 8 words, area + change. No item numbers or
  ticket refs. One branch per plan.
- **Check `git status` first.** Unrelated uncommitted work is the user's call;
  ask rather than carrying it along. Stay on the current branch only when
  resuming the same plan; a new plan always gets a new branch.
- **No plan, no branch.** A README Todo or docs edit the user asked for directly
  stays on the current branch, uncommitted, unless they ask for a branch and PR.

```
bug/view-source-button-without-source
feature/open-graph-tags
content/add-claude-code-101-course
docs/sync-skills-with-claude-md
```

## Commit, last

Only once the work is done, the pre-commit checks in `CLAUDE.md` (Planning,
branching and committing) are clean, and anything added to the content has been
found on the built page. A failure already recorded under README `### Bugs`
doesn't block, but name it in the handover; any other failure does.

- **Stage the work's own files by path**, then show `git status --short`. Use
  `git add -A` only when nothing else is uncommitted; name anything left
  unstaged.
- **Hand the message over**: the user commits unless they ask you to. If you
  commit, end with the `Co-Authored-By` trailer. There is no pre-commit hook:
  `npm run lint` is the only formatting check, and it is on you to have run it.

The message: a short imperative subject, a blank line, a bulleted body.

```
Hide View source on projects without a public repo

- Renders the ghost button only when sourceUri is set; before, a
  project without one got an <a> with no href
- Matches what content-projects promises for a private repo
```

- **Subject**: sentence case, under 72 chars, no full stop; says what changed
  and where. It describes the work that landed, not an item's title.
- **Body**: 2 to 6 bullets wrapped at 72 (continuations indented two spaces), no
  full stops, no nesting. Lead with the change; add the _why_ the diff can't
  show. Skip the body only when the subject is the whole story.
- From a Todo item, end with `Closes the "<item title>" todo.`

## Push and PR

Push only when asked: `git push -u origin <branch>`. Then **offer** a PR into
`develop` once ("Pushed `<branch>`. Open a PR into `develop`?") and wait; skip
the offer if the user already asked for the PR.

A PR with a visible change needs the keyboard and screen reader pass `CLAUDE.md`
asks for. Say in the PR body that it was done, or that it is still owed.

GitHub's default branch is `main`, so **always pass `--base develop`**:

```
gh pr create --base develop --head <branch> --title "<subject>" --body "<bullets>"
```

Use the commit subject as the title and its bullets as the body, ending with the
`🤖 Generated with [Claude Code]` line. Print `#<n> → develop: <url>` afterwards
so a wrong base shows at once; fix one with `gh pr edit <n> --base develop`.

## Release

Only when the user asks to publish or release. Merging into `main` deploys the
live site, so first build `develop` and check the page, then:

```
gh pr create --base main --head develop --title "Release <yyyy-mm-dd>" --body "<one bullet per merged PR>"
```

Never merge, rebase, squash, amend or rewrite published history on the user's
behalf, and never push to `main`.
