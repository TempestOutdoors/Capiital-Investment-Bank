# Capiital — v3

A one-page site for Capiital, an advisory firm working with private equity funds,
portfolio companies and ambitious businesses. Eight sections: the front page, what
we engage, what we believe, what we learned, cases, who we are, what we think, and
contact running into the footer.

Built from the supplied design as a static site — no build step, no dependencies.
Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
```

## What is in this repository

Two things live here, and they are not the same kind of thing.

**`Capiital Website Design/`** is the upstream design project, as exported from
Claude Design. It is the source of truth for the design and it is not built from
anything in this repository:

```
Capiital Website Design/
  CLAUDE-CODE-BRIEF.md      what changed since the first handoff, and what it obliges
  project-log.md            the reasoning behind the decisions, and the traps
  copy-register.md          the house voice; read before writing any copy
  sections.jsx              the reference for layout and copy
  CAPIITAL Website v3.html  the whole site as one file — the intended result
  tokens/                   the only source of colour, type, spacing and motion
  components/               the shared building blocks, by category
```

**Everything else is the WordPress implementation** — the static site built from
that design, and the two themes and paste-ready snippets generated from it.
`index.html` is its source of truth; `wordpress/build.sh` generates the rest.

Editing a file under `Capiital Website Design/` changes the design record.
Editing `index.html` changes what ships. They are kept apart deliberately.

## Structure

```
index.html              markup and copy for all eight sections
assets/css/tokens.css   design tokens — palette, type, space, motion
assets/css/styles.css   base styles, components, responsive rules
assets/js/main.js       header state, scroll progress, active nav, reveals
assets/favicon.svg      the doubled skewed bars of the wordmark
wordpress/              the same site as an Elementor-compatible theme
```

## Design notes

The values in `tokens.css` come verbatim from the design and are not
approximations to be tidied up:

- **The palette is derived, not picked.** Two colours are carried from the
  artwork — the eggshell ground `#EBE8DF` and the signature green `#5A8281`.
  Every chromatic token takes that green and rotates its OKLCH hue 34° toward
  blue (190 → 224) at identical lightness and chroma. Distribution stays 60/30/10,
  and **never two accents at once**.
- **One ground: eggshell.** Sections 02–07 share it; only the front page and the
  contact/footer are dark. Separation therefore rests entirely on hairlines, the
  numbered marks and vertical spacing. If the page starts reading as one column
  the answer is wider section padding, not a second ground returning.
- **Every radius token is `0`.** The brand is square; `--radius-pill` exists for
  switch and radio dots only.
- **Tracking is restrained.** Caps are tracked enough to read as structure, never
  as ornament — `0.14em` on nav and meta, `0.2em` on eyebrows.
- **The wordmark is set in type.** `CAP//TAL` is Inter 300 with the doubled *ii*
  as two bars skewed 16°. That skew is the cut the identity is built on; it is
  never drawn as artwork.
- **Emphasis by withdrawal.** Section 02's hovered quadrant does not grow — the
  other three recede to 42%. The system forbids hover-scaling.
- **Section marks are scaffolding.** `[ 02 — What we engage ]` renders at 34% of
  the accent so the build can be followed against the section list. Remove the
  `<i class="ref">` wrapper to restore a permanent eyebrow.

Both faces — Inter and Source Serif 4 — load from Google Fonts, matching the
design source, with system and Georgia fallbacks.

## Motion

Three scroll-entry motions only, all one-way, all colour- and opacity-quiet:
`settle` (14px up and fade), `veil` (opacity only, for prose) and `draw` (a
hairline growing from its left edge). Elements start hidden and are released by
an IntersectionObserver; a `<noscript>` rule and a no-observer fallback both
release them, so the page is never blank without script.

The front page's wash arrives once on load: a veil of the darkest stop laid on
the gradient's own 140° axis, moved by `transform` alone. Every length is in
`vmax` measured along the veil's own axis — sized in percent it stops covering a
tall viewport, and a visible travelling edge would fail the gesture outright.

## Responsive

The design is drawn at desktop and is reproduced exactly there. Below 1100px the
12-column editorial grids are re-declared rather than re-spanned (a
`repeat(12, 1fr)` track floors each column at its min-content width, which pushes
the page wider than the viewport), the quadrants fold to two columns and their
hover-only text becomes permanently visible, and below 860px the nav becomes a
toggle sheet.

Verified free of horizontal overflow from 320px to 1920px.
