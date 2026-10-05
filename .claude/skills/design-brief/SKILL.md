---
name: design-brief
description: >-
    The agreed redesign of Matthew's site: who it is for, how it positions him,
    the friendly stationery look, the colour, type, icon and doodle rules, and
    the section-by-section layout of the new page. Load before any visible
    change, any redesign or restyling work, reordering sections, drawing a
    wireframe, or writing hero, projects, how-I-work, career, learning or
    contact copy, so the change serves the brief rather than drifting from it.
---

# Design brief: the redesign

Agreed with Matthew over a long design conversation and a canvas mock-up at
phone (390px), tablet (1024px) and desktop (1280px) widths. This is the
**target**: until a section is rebuilt, its domain skill describes the code as
it is (see "Target versus current" in `CLAUDE.md`). When a section is rebuilt,
its domain skill is updated to match, and this brief stays the record of why.

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

- **Page**: the warm base, alternating with a sand band from section to section.
- **Raised**: every card, the header and the contact panel sit on card white,
  outlined in ink.

### Colour tokens

The values below move into `src/styles/global.css` `@theme` when the redesign is
built, each with a comment saying what it is for. From then on that file is
their one home and this table is history.

| Token        | Value     | Used for                                         |
| ------------ | --------- | ------------------------------------------------ |
| `base`       | `#f8f5ef` | the page                                         |
| `sand`       | `#f7f0e3` | alternate section bands                          |
| `card`       | `#fdfbf7` | every raised surface                             |
| `ink`        | `#17151f` | headings, outlines, offset shadows, button text  |
| `muted`      | `#46434f` | body copy, dates, captions                       |
| `rule`       | `#e7e3dc` | hairline dividers in lists and timelines         |
| `accent`     | `#f07a2e` | tangerine: primary buttons, link underlines, bar |
| `ic-yellow`  | `#fbeaa5` | Projects pill                                    |
| `ic-blue`    | `#dce6f2` | How I work pill                                  |
| `ic-green`   | `#d8ecd5` | Career pill                                      |
| `ic-pink`    | `#f7d8e0` | Learning pill                                    |
| `ic-teal`    | `#d7ebe7` | Say hello pill                                   |
| `ic-apricot` | `#fce3d0` | the hero sticker                                 |

- **Tangerine is the one accent.** Text on a tangerine fill is ink, not white.
  Tangerine is never used for body text; check every use against the Contrast
  rule in `CLAUDE.md`.
- The `ic-` tints are index-card colours, one per section, used only for that
  section's pill. They are not a palette to reach for elsewhere.
- Rejected for now: Marigold, Rust, Red string, Purple, Teacup teal and Farrow &
  Ball Marmelo as accents. Keep the token name `accent` so a change is one
  value.

### Shape

- **Outlines**: 1.5px solid ink on cards, buttons, pills and screenshots.
- **Radius**: 16px on cards, 10px on buttons and screenshots, fully round
  (999px) on pills.
- **Offset shadow**: buttons sit on a hard ink edge, `0 4px 0` (3px on small
  ones), so they feel like physical cards; it shrinks when pressed. The contact
  panel takes a larger `8px 8px 0` offset. No soft, blurred shadows anywhere.
- **Pill labels** sit above each section heading to orient a skimming reader,
  tinted with that section's index-card colour.
- **Width**: content within a 1120px container; reading columns narrower (the
  Career timeline is a centred 760px column).

### Type

- **Figtree** (Google Fonts) for everything: headings 800, buttons and labels
  600 to 700, body 400 to 500. It replaces Public Sans. Fallback
  `ui-sans-serif, system-ui, sans-serif`.
- **Permanent Marker** (Google Fonts, weight 400) is the sharpie, used only
  under the marker rule below. Fallback ending in `cursive`.
- Approximate scale at desktop: hero `<h1>` 58px, section `<h2>` 40 to 44px,
  card `<h3>` 22 to 24px, lead body 19px, body 15px, meta 12 to 14px. Each steps
  down at phone width.

### The marker rule: human moments and building

**Clean sans carries the formal, credentialed side; the sharpie carries the
human, hand-made side.** The contrast tells the story at a glance. The marker
appears in exactly these places:

1. **Hero**: "and builder." on its own line under "I'm Matthew, a product
   leader".
2. **Stats**: the big numbers on the stat cards (1,200+, 250+, 150+).
3. **Projects**: "built after hours" beside the heading, with a small bat.
4. **Learning**: "and still learning…" introducing the courses under the degree.
5. **Contact**: "What are you building?" inside the contact panel.

Everything else (headings, body, buttons, dates, the career timeline) stays
clean sans. The marker is always real text, never an image; never body copy;
never a whole section heading. Avoid the word "hobby": it undersells the
strongest builder proof.

### Icons

- **Hugeicons Free** (`@hugeicons/core-free-icons`, Stroke Rounded), replacing
  Lucide entirely in the same PR. One icon set across the site; never mix.
- Render statically: a small Astro wrapper outputs the icon data as inline SVG,
  so icons ship no JavaScript. Use `@hugeicons/svelte` only inside an island
  that already exists for another reason.
- `currentColor`, stroke width 1.5. Labelling follows Accessibility in
  `CLAUDE.md`.

### Doodles and stickers

- Small line doodles that relate to their section, from the same Hugeicons set
  so the line matches: lightbulb (Projects), binoculars and a navigation compass
  (How I work), briefcase and rocket (Career), a chat bubble (contact).
- **At most two per section**, placed diagonally: one top left, one bottom
  right. Marker accents (the bat) sit with their text and do not count.
- **Never sparkles**: they read as an AI cliché. No squiggles.
- Doodles decorate and never carry information: `aria-hidden="true"`, and hidden
  at phone width.
- **One sticker**: the apricot starburst on the hero photo, "16+ years in
  product". The number is derived, never stored (see `CLAUDE.md`).

### Links and controls

- **Content links**: ink text with a tangerine underline (2.5px, offset 4px)
  that thickens to 4px on hover and focus.
- **Primary button**: tangerine fill, ink text, ink outline, offset shadow.
  **Ghost button**: card white with the same outline and shadow.
- Focus is always visible, per `CLAUDE.md`.

### Leave out

Scroll-triggered reveals, marquees, photo collages, testimonials, contact forms,
a theme toggle, and an "open to work" anything.

## Page layout

Mobile first: each section is designed at phone width and scales up. Phone and
tablet differences are noted per section.

### Header

- **Sticky** at the top, on card white with an ink bottom edge. Name on the
  left, section links on the right: Projects, How I work, Career, Learning, each
  an in-page anchor.
- **Scroll progress bar**: a thin tangerine bar along the header's bottom edge
  showing how far down the page the reader is. Built with a CSS scroll-driven
  animation (`animation-timeline: scroll()`), no JavaScript; where unsupported
  it simply does not show. It is decorative: `aria-hidden="true"`.
- **Below 900px** the links collapse behind a real menu button that works by
  keyboard and announces its state. Navigation must work on a phone.

### 1. Hero

- `<h1>`: "I'm Matthew, a product leader" with "and builder." in marker. No
  "Hello"; lead with the role. No current-employer pill.
- A lead paragraph qualifying it with the hireable angle: data-heavy B2B SaaS, 0
  to 1, AI, and happy writing the query or the spec as well as the strategy.
- Two buttons: "See what I've built" (primary, to Projects) and "Get in touch"
  (ghost, to contact).
- A photo of Matthew, outlined, with the apricot starburst sticker overlapping a
  corner. Until a new photo exists, a dashed placeholder.
- **Stat cards** below the intro: three outlined cards, number in marker,
  caption in sans, **sorted largest first**. Today: 1,200+ (people across 15+
  agencies use Ignite), 250+ (brands use Ignite), 150+ (people use Texana). They
  come from the new `accomplishments` collection, not markup.
- Phone: stacks to one column; stat cards stack.

### 2. Projects

- Pill "Projects" (yellow), heading "Things I've built and shipped myself",
  marker "built after hours" with the bat. Lightbulb doodle.
- Two cards side by side (one column on phone), on card white: a rounded,
  outlined screenshot, title, description, then **tag pills and buttons aligned
  to the bottom** of the card so the two cards line up.
- Buttons: "Try it live" (primary) and "View source" (ghost) **only when the
  project has a `sourceUri`**.
- DyslexicWriter's screenshot is its 1200×630 Open Graph image, saved as
  `src/content/projects/img/dyslexicwriter.png`.

### 3. How I work

- Pill "How I work" (blue), then **two sentences only**, carrying the hidden
  structure above. Binoculars and compass doodles. Replaces the three "What I
  do" cards and the About me and My experience blurbs.
- The current two sentences are a draft; Matthew will rewrite them in his own
  voice.

### 4. Career

- Pill "Career" (green), heading "Where I've worked", a short intro paragraph
  (the arc from Ask.com through a WPP company to Acorn-i, and two acquisitions).
- A "Download CV" button: **placeholder until the CV is decided**.
- A centred 760px timeline with no rule above or below it, rows 30px apart: date
  range, then "role at organisation", then the role body. Every role stays.
  Briefcase and rocket doodles.

### 5. Learning

- Pill "Learning" (pink), heading "Trained as a builder". One merged section
  replacing today's Education and Training.
- **The degree first**, as a featured card: Computing and Management, BSc (Hons)
  2:1, Loughborough University, 2005 to 2009, with the line about the final-year
  project and a "View course" link.
- Then marker "and still learning…", then courses **grouped by provider**,
  providers sorted by their most recent course (newest first), courses newest
  first within each. A numbered or hairline-divided list, not cards.
- Each course row: name, date, and "Certificate ↗" **only when it has a `uri`**.
  On phone a row wraps to two lines.
- **Lose nothing**: every course stays.

### 6. Contact

- Pill "Say hello" (teal) and heading "Fancy a chat about product?" above an
  outlined card-white panel with the large offset shadow.
- Inside: "What are you building?" in marker, then three short sentences, then
  "Get in touch" (email, primary) and LinkedIn (ghost). Chat bubble doodle.
- The current sentences are a draft for Matthew to put in his own voice: they
  are about talking product, turning vision into strategy and strategy into
  features, and how AI is changing the role.

### Footer

Copyright line only. The socials live in the contact panel.

## Content and copy

- Short labels (pills, button text, headings, `alt` text) are Paraglide
  messages. Anything longer than a sentence or two (the hero lead, How I work,
  the Career intro, the contact copy) is markdown in `src/content/`, so Matthew
  can edit it directly.
- **New `accomplishments` collection** for the stat cards: one markdown file per
  stat with `value` (a plain number), `suffix` (`+`), `caption`, and an optional
  reference to the organisation. The hero sorts by `value` descending and
  formats it with `en-GB` thousands separators. Defined in its own step, with
  its own skill.
- Never invent a number or outcome; every figure is Matthew's.

## Open decisions

Raise these before building the part they touch:

- **Hero sticker**: the starburst, or a post-it note. Both mocked.
- **Project titles**: plain, or with a soft pink ruled line beneath, like an
  index card. Both mocked.
- **Photo**: a new photo of Matthew is needed; the placeholder stays until then.
- **CV**: whether to offer a download. `/resume` is reserved in `robots.txt`.
- **Copy in his voice**: How I work and the contact panel.
- **Provider order**: sorting by most recent course currently puts Pendo ahead
  of Anthropic. The rule stands unless Matthew says otherwise.
