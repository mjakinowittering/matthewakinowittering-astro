---
name: design-brief
description: >-
    The design of Matthew's site and why: who it is for, how it positions him,
    the friendly stationery look, the colour, type, icon and doodle rules, and
    the section-by-section layout of the page. Load before any visible change,
    any restyling work, reordering sections, drawing a wireframe, or writing
    hero, projects, how-I-work, career, learning or contact copy, so the change
    serves the brief rather than drifting from it.
---

# Design brief

Agreed with Matthew over a long design conversation and a canvas mock-up at
phone (390px), tablet (1024px) and desktop (1280px) widths, built in the
redesign PR (`feature/redesign`) and matched to the mock-up pixel for pixel in
`fix/pixel-perfect`. This brief is the record of what the page is and why; the
domain skills describe how the code does it (see "Why versus how" in
`CLAUDE.md`). A visible change follows both and updates the domain skill.

## The reference is the source of truth

**`docs/design/reference/` is the visual source of truth.** It holds the
approved boards: full-page screenshots (`.png`) and their rendered mark-up with
every style inline (`.html`) for the homepage at 390, 1024 and 1280px, the 404
page at 390 and 1280px, and the Open Graph image. Its `README.md` lists the only
intended differences between the boards and the build (the real photo for the
placeholder, the derived years figure, copy from `src/content/`, a live progress
bar, the hidden Download CV button).

- **Where this brief and the reference disagree, the reference wins**, and the
  brief is corrected to match
- Exact values (sizes, weights, line heights, spacing, colours, borders, radii,
  shadows) are read from the reference `.html`, never estimated from a
  screenshot
- `npm run compare` checks the build against the boards, section by section (see
  **`ascii-wireframes`**, After building)
- A change the reference doesn't cover is agreed with Matthew as a wireframe,
  and the reference is then updated to show it

Every rule in `CLAUDE.md` still holds, in particular Accessibility, one light
theme, mobile first, facts in `src/content/` and UI copy in `messages/en.json`.

## Purpose

The site is a **hiring tool**. Every choice serves one question: would a hirer
read this and want to talk to Matthew?

- **Audience**: founders and hiring managers, largely at data and AI companies,
  deciding in seconds whether to keep reading.
- **He is quietly looking.** No "open to work" banner, nothing awkward if a
  current colleague lands on it. Contact is easy but understated: an email link
  and LinkedIn, never a loud call to action, never a form.
- The design is itself evidence of craft and taste. Clarity reads as confidence;
  clutter reads as hedging.

## Positioning

**Product leader and builder.** Both claims, each backed on the page.

- **Leader**: owns vision, mission and strategy, and tells the product
  narrative. Proof is the Acorn-i story (Ignite from internal tool to licensed
  SaaS, Texana from proof-of-concept to a shipped agentic product), the stats
  and the How I work section.
- **Builder**, two strands: hands-on fluency in the materials of the work
  (querying data, writing specs engineers trust, working in markdown and AI
  workflows) **and** shipping whole products solo (YouDemo, DyslexicWriter).
  Frame the first as capability, never a tool checklist. The Computing and
  Management degree is further builder evidence.

### Hidden structure, never named

The product canon shapes the copy but is **never cited on the page**: joining
vision down to features and back (Eriksson's Decision Stack), testing value,
usability, feasibility and viability before committing (Cagan's four risks),
horizons of confidence over dated roadmaps (Bastow's now, next, later), and
outcomes over output (the agency trap). Fluent readers recognise it; everyone
else simply understands it.

### Dyslexic thinking: the unspoken theme

Matthew is dyslexic and credits dyslexic thinking (big picture, patterns,
joining dots others miss) for much of his success. It runs through the site as a
**theme, never a label**: in the formal-versus-hand-made contrast and in threads
joined across the page. **Do not name dyslexia in site copy**; the only mention
is the DyslexicWriter project itself.

## Tone guardrails

**Friendly first, and understated.** Warm and a little playful, so the reader
thinks "easy to work with"; the content carries the credibility. Three things
must stay quiet:

- **Colour**: one bold accent on a calm warm base. Tints are soft, never candy.
- **Humour**: small and dry, in a word or a doodle, never a joke that needs
  explaining.
- **The detective idea**: product as detective work (gathering evidence, joining
  threads) is **subtext only**. No magnifying glasses, string boards or
  deerstalkers drawn on the page.

## Look

The primary reference is the Meelo Webflow template (https://meelo.webflow.io):
outlined, tactile cards and buttons, pill labels, a friendly geometric sans. The
theme is **the product manager's own stationery**: index-card tints, sharpie
notes, the odd sticker. The earlier editorial (Sera, Vega) directions are
superseded.

### Surfaces

Two levels only:

- **Page**: the warm base, alternating with a sand band from section to section
  (hero, How I work and Learning are sand). The header sits on the base.
- **Raised**: every card, the contact panel and the header's buttons sit on card
  white, outlined in ink.

### Colour tokens

The values live in `src/styles/global.css` `@theme`, each with a comment saying
what it is for: that file is their one home, and **`styling`** lists the
measured contrast. The roles:

| Token        | Used for                                         |
| ------------ | ------------------------------------------------ |
| `base`       | the page                                         |
| `sand`       | alternate section bands                          |
| `card`       | every raised surface                             |
| `ink`        | headings, outlines, offset shadows, button text  |
| `muted`      | body copy, dates, captions                       |
| `rule`       | the progress bar's track, the 404 footer's edge  |
| `hairline`   | dividers between course rows in Learning         |
| `accent`     | tangerine: primary buttons, link underlines, bar |
| `ic-yellow`  | Projects pill                                    |
| `ic-blue`    | How I work pill                                  |
| `ic-green`   | Career pill                                      |
| `ic-pink`    | Learning pill, and the degree card's badge       |
| `ic-teal`    | Say hello pill                                   |
| `ic-apricot` | the hero sticker                                 |

- **Tangerine is the one accent.** Text on a tangerine fill is ink, not white.
  Tangerine is never used for body text; check every use against the Contrast
  rule in `CLAUDE.md`.
- The `ic-` tints are index-card colours, one per section, used only for that
  section's pill (and pink for the degree badge inside Learning). They are not a
  palette to reach for elsewhere.
- Rejected for now: Marigold, Rust, Red string, Purple, Teacup teal and Farrow &
  Ball Marmelo as accents. Keep the token name `accent` so a change is one
  value.

### Shape

- **Ink rules give the page its shape**: a 1.5px ink line under the header and
  between every pair of sections, and between Career's rows and Learning's
  providers.
- **Outlines**: 1.5px solid ink on cards, buttons, pills, screenshots and the
  hero photo.
- **Radius**: 16px on cards, 14px on the stat cards and the degree badge, 20px
  on the contact panel, 10px on buttons and screenshots, fully round (999px) on
  pills and the photo.
- **Offset shadow**: buttons sit on a hard ink edge, `0 4px 0` (3px on the
  header's square buttons), so they feel like physical cards; hovering presses
  them 2px down onto a 2px edge. The hero photo and the degree card take a
  larger `8px 8px 0` offset. The contact panel has none. No soft, blurred
  shadows anywhere.
- **Pill labels** sit above each section heading, centred, in small bold
  capitals, to orient a skimming reader, tinted with that section's index-card
  colour.
- **Width**: content within a 1120px column with 24px gutters at every width.
  Section heads are centred. The Career timeline is a centred 760px column, the
  contact panel 720px; Projects and Learning use the full column.

### Type

- **Figtree** (Google Fonts) for everything: headings 800, buttons and labels
  600 to 700, body 400 to 500. It replaces Public Sans. Fallback
  `ui-sans-serif, system-ui, sans-serif`.
- **Permanent Marker** (Google Fonts, weight 400) is the sharpie, used only
  under the marker rule below. Fallback ending in `cursive`.
- Scale at desktop: hero `<h1>` 58px, section `<h2>` 40px, the How I work
  statement 36px, card `<h3>` 24 to 28px, row `<h3>` 19 to 22px, lead body 18.5
  to 19px, body 16px, meta 12.5px in uppercase. Headings step down at phone
  width (40px, 30px, 26px). The exact values are in **`styling`**.

### The marker rule: human moments and building

**Clean sans carries the formal, credentialed side; the sharpie carries the
human, hand-made side.** The contrast tells the story at a glance. The marker
appears in exactly these places:

1. **Hero**: "and builder." on its own line under "I'm Matthew, a product
   leader", with a tangerine swish beneath it.
2. **Stats**: the big numbers on the stat cards (1,200+, 250+, 150+).
3. **Projects**: "built after hours" under the heading, with a small drawn bat
   beside it.
4. **Learning**: "and still learning…" introducing the courses under the degree,
   with a drawn arrow curling down to them.
5. **Contact**: "What are you building?" inside the contact panel.

Everything else (headings, body, buttons, dates, the career timeline) stays
clean sans. The marker is always real text, never an image; never body copy;
never a whole section heading. Avoid the word "hobby": it undersells the
strongest builder proof.

### Icons

- **Hugeicons Free** (`@hugeicons/core-free-icons`, Stroke Rounded), which
  replaced Lucide in the redesign. One icon set across the site; never mix.
- Render statically: a small Astro wrapper outputs the icon data as inline SVG,
  so icons ship no JavaScript. Use `@hugeicons/svelte` only inside an island
  that already exists for another reason.
- `currentColor`, stroke width 1.5. Labelling follows Accessibility in
  `CLAUDE.md`.
- **Drawn marks are not icons.** The hero's swish, the Projects bat, Learning's
  arrow and the hero's starburst are hand-drawn shapes from the reference,
  inline SVG in their sections, always decorative. Everything that is an icon
  (buttons, the header, doodles, the degree badge) is Hugeicons.

### Doodles and stickers

- Small ink line doodles that relate to their section, from the same Hugeicons
  set so the line matches: a lightbulb (Projects), binoculars and a navigation
  compass (How I work), a briefcase and a rocket (Career), a chat bubble (inside
  the contact panel). Hero and Learning have none.
- **At most two per section**, placed diagonally: one top left, one bottom
  right, 72px in from the section's edge and 4% across. The contact panel's
  bubble sits in the panel's top right corner. Each one's size and tilt are the
  reference's. Marker accents (the bat, the arrow) sit with their text and do
  not count.
- **Never sparkles**: they read as an AI cliché. No squiggles.
- Doodles decorate and never carry information: `aria-hidden="true"`, and hidden
  below 640px.
- **One sticker**: the apricot 14-point starburst on the hero photo's top left,
  "16+ years in product" in small bold capitals on two lines. The number is
  derived, never stored (see `CLAUDE.md`).

### Links and controls

- **Content links**: ink text with a tangerine underline (2.5px, offset 4px)
  that thickens to 4px on hover and focus. Header links have no underline until
  hovered, then a plain 2px one.
- **Primary button**: tangerine fill, ink text, ink outline, offset shadow.
  **Ghost button**: card white with the same outline and shadow. Buttons carry a
  Hugeicons icon where the reference shows one: a leading mail, LinkedIn or code
  icon, a trailing chevron or arrow.
- Focus is always visible, per `CLAUDE.md`.

### Leave out

Scroll-triggered reveals, marquees, photo collages, testimonials, contact forms,
a theme toggle, and an "open to work" anything.

## Page layout

Mobile first: each section is designed at phone width and scales up. Phone and
tablet differences are noted per section.

### Header

- **Sticky** at the top, on the page base with an ink bottom edge. Name on the
  left, the section links in the middle (Projects, How I work, Career, Learning,
  each an in-page anchor), and on the right three square icon buttons for
  LinkedIn, GitHub and email.
- **Scroll progress bar**: a 4px bar along the header's top edge, a `rule` track
  filled in tangerine as the reader scrolls. Built with a CSS scroll-driven
  animation (`animation-timeline: scroll()`), no JavaScript; where unsupported
  it simply does not show. It is decorative: `aria-hidden="true"`. The 404 page
  has none.
- **Below 900px** the links collapse behind an icon-only menu button that works
  by keyboard and announces its state. **Below 640px** the social buttons go
  too, and the menu carries LinkedIn and GitHub. Navigation must work on a
  phone.
- **Below 900px the header collapses as you read**, as
  `docs/design/reference/mobile-scroll.png` draws it: scrolling down slides it
  up out of view, leaving only the progress bar pinned to the top; any upward
  scroll slides it back. It ignores movement under about 10px, always shows near
  the top, never hides while the menu is open, and slides back whenever
  something in it takes focus. On a small screen the header costs a lot of the
  page; at 900px and wider, where the links sit inline, it stays as it is,
  always visible. Without JavaScript it simply stays sticky.
- **Back to top**, below 900px only: a round 52px card-white button with an ink
  outline and the header buttons' `0 3px 0` edge, an up caret inside, 20px from
  the right and 24px from the bottom (plus the safe area). It fades in once the
  page is more than a screen down and out within half a screen of the top. It
  returns to the very top and puts focus on the page's start, so a keyboard or
  screen reader user begins again from there. Without JavaScript it never shows.
- **In-page links glide** to their section at every width, and land just below
  whatever is showing at the top: the header, or on a phone the bar alone when
  the jump goes down. With reduced motion, jumps are instant and nothing slides
  or fades.

### 1. Hero

- On the sand band. `<h1>`: "I'm Matthew, a product leader" with "and builder."
  in marker on its own line, the tangerine swish beneath it. No "Hello"; lead
  with the role. No current-employer pill.
- A lead paragraph qualifying it with the hireable angle: data-heavy B2B SaaS, 0
  to 1, AI, and happy writing the query or the spec as well as the strategy. The
  years figure ("16+ years") is plain text, styled like the rest of it.
- Two buttons: "See what I've built" (primary, a trailing chevron, to Projects)
  and "Get in touch" (ghost, a leading mail icon, to contact).
- A round 280px photo of Matthew, outlined, on the 8px offset shadow, with the
  apricot starburst sticker overlapping its top left. The current photo stays
  until Matthew supplies a new one; never a dashed placeholder.
- **Stat cards** below the intro: three outlined 14px-radius cards in a row,
  number in marker, caption in sans, **sorted largest first**. Today: 1,200+
  (people across 15+ agencies use Ignite), 250+ (brands use Ignite), 150+
  (people use Texana). They come from the `accomplishments` collection, not
  markup, and name no organisation.
- Phone: the photo comes first, then the text; the stat cards stack.

### 2. Projects

- Pill "Projects" (yellow), heading "Things I've built and shipped myself",
  marker "built after hours" with the drawn bat, all centred. Lightbulb doodle.
- Two cards side by side (one column on phone), on card white: a rounded,
  outlined screenshot inset from the card's edge, a plain title (no ruled line),
  description, then **tag pills and buttons aligned to the bottom** of the card
  so the two cards line up.
- Buttons: "Try it live" (primary, trailing arrow) and "View source" (ghost,
  leading code icon) **only when the project has a `sourceUri`**.
- DyslexicWriter's screenshot is its 1200×630 Open Graph image, saved as
  `src/content/projects/img/dyslexicwriter.png`.

### 3. How I work

- On the sand band, centred. Pill "How I work" (blue), then **two sentences
  only**, carrying the hidden structure above: the first as a large bold
  statement, the second smaller and muted beneath it. Binoculars and compass
  doodles. Replaces the three "What I do" cards and the About me and My
  experience blurbs.
- The current two sentences are a draft; Matthew will rewrite them in his own
  voice.

### 4. Career

- Pill "Career" (green) and heading "Where I've worked", centred, then a short
  intro paragraph (the arc from Ask.com through a WPP company to Acorn-i, and
  two acquisitions), a left-aligned block centred under the heading.
- A "Download CV" button goes under the intro **once a CV exists**; until then
  nothing renders (a Features item in `README.md`).
- A centred 760px timeline: each row is the date range in a narrow left column
  (small capitals), then "role at organisation" and the role body beside it; on
  a phone the date sits above. Rows are 30px apart, divided by ink rules as wide
  as the timeline. **Dates only, no duration.** Every role stays. Briefcase and
  rocket doodles.

### 5. Learning

- On the sand band. Pill "Learning" (pink), heading "Trained as a builder". One
  merged section replacing today's Education and Training, using the full 1120px
  column.
- **The degree first**, as a featured card on the 8px offset shadow: a pink
  mortarboard badge, then "2005 – 2009 · Loughborough University" in small
  capitals, Computing and Management, BSc (Hons) 2:1, its full body (including
  the final-year project) and a "View course" link. **No duration.**
- Then marker "and still learning…" with its drawn arrow, then one outlined card
  listing the courses **grouped by provider**, providers sorted by their most
  recent course (newest first), courses newest first within each.
- Each provider is a numbered row (01, 02…) that opens and closes, showing its
  name, how many courses and the latest date, with a round chevron button. Only
  the newest provider starts open. The provider's name is not a link.
- Each course row: name, date and "Certificate ↗" **only when it has a `uri`**,
  the date and certificate aligned right, rows divided by hairlines. On phone a
  row wraps to two lines. A course's body is not shown; it stays in its file as
  the record.
- **Lose nothing**: every course stays.

### 6. Contact

- Pill "Say hello" (teal) and heading "Fancy a chat about product?", centred,
  above an outlined card-white panel 720px wide with a 20px radius and no
  shadow.
- Inside, centred: "What are you building?" in marker, then three short
  sentences (left-aligned), then "Get in touch" (email, primary, mail icon) and
  LinkedIn (ghost, LinkedIn icon). GitHub lives in the header. Chat bubble
  doodle in the panel's top right corner.
- The current sentences are a draft for Matthew to put in his own voice: they
  are about talking product, turning vision into strategy and strategy into
  features, and how AI is changing the role.

### Footer

Copyright line only, 56px under the contact panel with no rule. The socials live
in the header and the contact panel.

### 404 page

The classic pattern on the same tokens, as the reference draws it: the shared
header without its progress bar, then a centred 640px column with a large "404"
(decorative, `aria-hidden`), the `<h1>` "Page not found", one line ("Sorry, the
page you're looking for doesn't exist or has moved."), a larger primary "Back to
the homepage" button, then "Or try one of these:" and the five sections as
sentence-case pill links in their index-card colours (Projects, How I work,
Career, Learning, Say hello). The footer sits under a hairline. No illustration,
no doodles and no marker font.

## Content and copy

- Short labels (pills, button text, headings, `alt` text) are Paraglide
  messages, and so are the marker lines. Anything longer than a sentence or two
  (the hero lead, How I work, the Career intro, the contact copy) is markdown in
  `src/content/`, so Matthew can edit it directly.
- The **`accomplishments` collection** holds the stat cards: one markdown file
  per stat with `value` (a plain number), `suffix` (`+`) and `caption`. The hero
  sorts by `value` descending and formats it with `en-GB` thousands separators
  (see **`content-accomplishments`**).
- Never invent a number or outcome; every figure is Matthew's.

## Decisions made

Settled when the redesign was built; reopen only with Matthew.

- **Hero sticker**: the apricot starburst, not the post-it.
- **Project titles**: plain, with no ruled line.
- **Photo**: the current photo stays until there is a new one, never a
  placeholder.
- **CV**: no "Download CV" button until a CV exists.
- **Provider order**: by most recent course, newest first (Pendo, then
  Anthropic, then ScrumAlliance today).
- **Course rows**: name, date and certificate only; bodies are not shown.
- **Stat cards**: no organisation on the card.
- **Marker lines**: messages, not blurb fields.
- **The bat**: a small drawn bat, as the reference shows, a drawn mark rather
  than an icon (Hugeicons Free has no bat).
- **Durations**: Career and the degree show dates only; the live duration island
  was removed with them.
- **Socials**: LinkedIn, GitHub and email as icon buttons in the header; the
  contact panel offers email and LinkedIn.
- **Sharing card**: the designed 1200 by 630 `public/og.png` is the Open Graph
  and Twitter image.
- **What I do, About me and My experience**: replaced by How I work.

## Open decisions

Raise these before building the part they touch:

- **Copy in his voice**: How I work and the contact panel are drafts.
- **The Ignite figures**: they are both in the Acorn-i role body and on the stat
  cards; whether the role body keeps them.
- **A new photo**: when Matthew supplies one, it replaces the hero photo.
- **The sharing card's years**: `og.png` bakes in "16+ years", so it needs
  redrawing when the figure changes (a Features item in `README.md`).
- **The CV**: when one exists, the button and where the file lives (`/resume` is
  reserved in `robots.txt`).
