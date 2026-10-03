---
name: ascii-wireframes
description:
    Draw ASCII wireframes of visible changes for the user to approve before
    anything is built. Load before planning or building any change a visitor
    will see (a new section, card, button, badge, a moved element, a layout
    change at phone width), or when the user asks to "see it", for a wireframe,
    a mock-up or a diagram.
---

# ASCII wireframes

The user reads a wireframe faster than a paragraph, and one drawing catches a
misunderstanding that three rounds of prose miss. **Draw first, build second:**
any change a visitor will see gets a wireframe the user has approved before its
code is written. When feedback on a built change moves the layout, redraw before
rebuilding.

They are often read in the VS Code chat panel, where only plain ASCII is
reliably one column wide: box-drawing characters render narrower than letters,
and symbol glyphs wider or narrower again, so a row containing any of them
drifts out of line. **Draw with printable ASCII only.**

## What to draw

- **Every state the content can be in, not just the full one.** The content
  files decide what renders, so the gaps are where the surprise hides:
    - a role that is ongoing (no `dateTo`, filled timeline dot, live duration)
      and one that has ended
    - a training row with a certificate (tick, "View certificate") and one
      without, closed and opened
    - a project with a screenshot and one on the striped placeholder; with and
      without `sourceUri`
    - an organisation with one event and one with several
    - copy longer than the sample: a long course title, a three-line subtitle
- **Phone and desktop.** The nav links hide below `sm`, and two-column grids
  stack below `md`. Draw the width where the change is hardest to fit, and both
  when the layout differs.
- **Before and after** for a change to something that exists. Label them
  `BEFORE` / `AFTER`.
- **The neighbours.** Draw enough of the section above and below to show where
  the change sits, including whether it lands on a plain or an `alt` band.
- **Real copy and real icons.** Use the actual strings from `messages/en.json`
  and the content files ("Where I've worked and what I've built", "View
  certificate"), never lorem ipsum. Name an icon with a short ASCII word in
  brackets (`[building]`, `[external]`), and name the **Lucide** icon in a note
  underneath.

## How to draw

Each wireframe goes in a fenced code block with no language, about 90 columns
wide or less (about 40 for a phone), one region per drawing.

### Vocabulary

| Element                | Draw as                                              |
| ---------------------- | ---------------------------------------------------- |
| box border             | `+` corners and junctions, `-` across, `\|` down     |
| separator inside a box | `\|  ------  \|`, inset so it isn't read as a border |
| button                 | `[ Label ]` primary, `( Label )` ghost               |
| icon                   | `[compass]`, `[x]` (Lucide name in the notes)        |
| text link              | `_View certificate_ [external]`                      |
| tag pill               | `{ No backend }`                                     |
| timeline dot           | `o` open, `*` filled                                 |
| `alt` band             | a full-width row of `.` above and below the section  |
| copy too long to fit   | cut it with `...` inside the box                     |

### Do

- Close every row of a box in the **same column**, the inner separators
  included.
- Say what is **new** in the notes below, or draw `BEFORE` and `AFTER`.
- Check the drawing before you show it (see **Checks**), and paste the checked
  text, not a retyped copy.

### Don't

- **Any character outside printable ASCII**: no box-drawing (`┌ ─ │ ├`), bullet
  or tick glyphs, arrows, `…`, the `·` the meta lines use, or emoji. Draw the
  meta line's separator as `-`.
- **Labels beside the box.** `|  new` puts the notes in the drawing, and the
  reader can't tell which parts are UI. Put every note below the drawing as a
  plain bullet.
- **Notes inside the box.** A box shows what the visitor sees, and nothing else.
- **Count widths by eye.** It drifts every time.

```
Don't                                   Do

| Lead Product Manager  |               | Lead Product Manager  |
| Aug 2019 - Present    |  new          | Aug 2019 - Present    |
| ------------   |                      |  -------------------  |

                                        - New: the separator under the dates.
```

### Checks

Write the drawings to a scratch file and run both checks before pasting them:

- `awk '{ printf "%3d %s\n", length($0), $0 }' wireframe.txt`: every row of one
  box must print the same number.
- `grep -nP '[^\x20-\x7e]' wireframe.txt`: must print nothing.

## Keep it light

A wireframe is a question, not a spec. Keep the prose around it short, end with
one question ("Build it?" plus the one or two decisions it exposes), and ask it
with AskUserQuestion. If the answer is a change, redraw only the part that
changed.
