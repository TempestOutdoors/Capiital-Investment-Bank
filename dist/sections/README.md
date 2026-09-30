# Capiital — section snippets

Paste each file into an Elementor **HTML widget**, in number order.

**Step one is not a widget.** `00-stylesheet.css` goes into
**Appearance > Customize > Additional CSS**, and everything else depends on it.
Skip it and the page renders as unstyled markup.

| # | File | Goes in |
| --- | --- | --- |
| 00 | `00-stylesheet.css` | **Appearance > Customize > Additional CSS**, then Publish |
| 01 | `01-header-front.html` | Header **and** front page, together |
| 02 | `02-engage.html` | What we engage |
| 03 | `03-believe.html` | What we believe |
| 04 | `04-learned.html` | What we learned |
| 05 | `05-cases.html` | Cases |
| 06 | `06-people.html` | Who we are |
| 07 | `07-papers.html` | What we think |
| 08 | `08-contact.html` | How to reach us |
| 09 | `09-footer.html` | Footer |
| 10 | `10-script.html` | An HTML widget at the very bottom |

`10-script-oneline.html` is an alternate, described below.

## Why the stylesheet is not in a widget

It was, once, folded into the top of `01`. That build rendered as unstyled
markup: browser-default headings, blue underlined links, the wordmark without its
two bars, every section visible at once because the rule that hides them until
they are scrolled to had gone too.

The cause is that WordPress strips `<style>` from widget content in most
configurations, and 42KB of stylesheet goes with it. **Appearance > Customize >
Additional CSS is never run through those filters**, so that is where it belongs.
Nothing is lost by the move: CSS from the Customizer is global, so every widget
on the page still sees it.

If the design ever renders as plain text, this is the first thing to check ---
view the page source and search for `--sea-ink`. If it is not there, the
stylesheet did not load.

## Why the header is not its own piece

The header is `position: fixed`, so it needs no layout space of its own. Given a
separate Elementor section it gets some anyway, and three faults follow at once:
a band of page ground above the hero, a seam between the header and the hero, and
the navigation sitting on the eggshell instead of over the dark hero before
anything has been scrolled. Keeping it in the same widget as the front page means
there is no wrapper between them to add space. Do not split `01` in two.

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

## The file that is not a section

**`10-script.html` releases the scroll-entry reveals.** Without it every section
below the front page stays at `opacity: 0` and the page looks empty past the
hero. It also drives the header on scroll, the reading-progress hairline and the
live navigation item.

If the script comes back broken — view the page source and look for `<br />` or
`<p>` inside the `<script>` — paste **`10-script-oneline.html`** instead. It is
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
