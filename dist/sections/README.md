# Capiital — section snippets

Paste each file into an Elementor **HTML widget**, in number order.

| # | File | Goes in |
| --- | --- | --- |
| 00 | `00-styles.html` | An HTML widget at the very top |
| 01 | `01-header.html` | Header and navigation |
| 02 | `02-front.html` | Front page |
| 03 | `03-engage.html` | What we engage |
| 04 | `04-believe.html` | What we believe |
| 05 | `05-learned.html` | What we learned |
| 06 | `06-cases.html` | Cases |
| 07 | `07-people.html` | Who we are |
| 08 | `08-papers.html` | What we think |
| 09 | `09-contact.html` | How to reach us |
| 10 | `10-footer.html` | Footer |
| 11 | `11-script.html` | An HTML widget at the very bottom |

Two alternates are included for the cases described below:
`00-styles-for-additional-css.css` and `11-script-oneline.html`.

## Read this first: the HTML widget, not the Text Editor

Elementor's **Text Editor** widget runs WordPress's content filters. Those
filters silently delete markup they consider unnecessary and rewrite newlines.
On this design they remove:

- **every `<br>`**, so multi-line headings collapse into one line;
- **the empty `<span>`s inside the wordmark**, so `CAP//TAL` loses its two
  skewed bars and renders as literal text;
- **`<span>` and `<p>` wrappers** inside cards and prose, so the type that
  depends on them falls back to the default size and colour;
- **every newline inside a `<script>`**, replacing them with `<br />` and `<p>`
  tags, which destroys the JavaScript completely.

The **HTML** widget does none of this. Use it for every file here.

## The two files that are not sections

**`00-styles.html` carries the whole stylesheet** and everything else depends on
it. Paste it first. The safest home is actually **Appearance > Customize >
Additional CSS**, which is never run through the content filters — use
`00-styles-for-additional-css.css` for that, which is the same CSS without the
`<style>` tag. Either way it has to exist somewhere.

**`11-script.html` releases the scroll-entry reveals.** Without it every section
below the front page stays at `opacity: 0` and the page looks empty past the
hero. It also drives the header on scroll, the reading-progress hairline and the
live navigation item.

If the script comes back broken — view the page source and look for `<br />` or
`<p>` inside the `<script>` — paste **`11-script-oneline.html`** instead. It is
the same code on a single line, so there are no newlines for the filters to
convert. Behaviour is identical.

## Settings for each section

For every Elementor section holding one of these widgets:

- **Layout > Content Width: Full Width**
- **Layout > Columns Gap: No Gap**
- **Advanced > Padding: 0** on all four sides

The stylesheet also neutralises Elementor's own wrappers, scoped to
`.capiital-part` so nothing else on the site is affected — but setting the three
above keeps the editor preview honest.

## Editing

Each file is one widget's contents, wrapped in `<div class="capiital-part">`.
That wrapper is what the Elementor reset targets; keep it.

The section marks — `[ 02 — What we engage ]` — are scaffolding, deliberately set
at 34% of the accent. Delete the `<i class="ref">` wrapper to turn one into a
permanent eyebrow, or delete the line to remove it.

## Regenerating

Generated from `index.html` by `wordpress/build.sh`. Edit that and re-run, or
edit these directly and accept that the next build overwrites them.
