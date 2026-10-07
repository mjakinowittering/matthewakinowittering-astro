# Design reference

The approved mock-ups, exported from the design canvas. **These are the source
of truth for how the site looks.** Where `design-brief` and these files
disagree, these files win.

| File                         | Width  | What it is                       |
| ---------------------------- | ------ | -------------------------------- |
| `home-phone.png` / `.html`   | 390px  | Homepage, phone                  |
| `home-tablet.png` / `.html`  | 1024px | Homepage, tablet and small laptop |
| `home-desktop.png` / `.html` | 1280px | Homepage, desktop                |
| `404-phone.png` / `.html`    | 390px  | 404 page, phone                  |
| `404-desktop.png` / `.html`  | 1280px | 404 page, desktop                |
| `og-image.png` / `.html`     | 1200px | Open Graph image, 1200×630       |
| `mobile-scroll.png`          | 390px  | Header and back to top on scroll |

`mobile-scroll.png` is a behaviour board: four phone frames of the header as
you scroll, with the rules beneath them. It has no `.html` and
`npm run compare` does not check it.

The `.png` files are full-page screenshots. The `.html` files are the rendered
mark-up of the same boards, with every style inline: read them for exact
sizes, spacing, colours, borders, radii and shadows rather than measuring the
images.

## Intended differences

The build differs from the mock only here:

- **Photo**: the mock shows a dashed placeholder. The build shows Matthew's
  real photo in the same circular frame, with the same outline and offset
  shadow.
- **Years**: the mock types "Sixteen years". The build derives the figure
  ("16+ years") as plain text, styled like the rest of the paragraph.
- **Copy and course lists** come from `src/content/` and `messages/`, so their
  text and length may differ from the mock. Match the layout, not the words.
- **Scroll progress bar**: the mock freezes it at 35%; the build tracks scroll.
- **Download CV**: hidden until a CV exists.
