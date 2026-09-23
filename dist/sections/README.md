# Capiital — section snippets

Twelve files, pasted in order into twelve Elementor **HTML widgets** on one page.

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

## Two of these are not sections

**`00-styles.html` carries the entire stylesheet** and every other file depends on
it. Paste it first. If you would rather keep it out of the page, drop the contents
of its `<style>` tag (without the tag itself) into **Appearance > Customize >
Additional CSS** instead — either works, but it has to exist somewhere.

**`11-script.html` drives the header on scroll, the reading-progress hairline, the
live navigation item and the scroll-entry reveals.** Without it every section below
the front page stays invisible, because they start at `opacity: 0` and are released
by script. Paste it last.

## Settings for each section

For every Elementor section holding one of these widgets:

- **Layout > Content Width: Full Width**
- **Layout > Columns Gap: No Gap**
- **Advanced > Padding: 0** on all four sides

The stylesheet also neutralises Elementor's own wrappers, scoped to
`.capiital-part` so nothing else on the site is affected — but setting the three
above keeps the editor preview honest.

## Editing

Each file is one HTML widget's contents, wrapped in `<div class="capiital-part">`.
That wrapper is what the Elementor reset targets; keep it. Everything inside is
ordinary markup, so copy lives where you can see it.

The section marks — `[ 02 — What we engage ]` — are scaffolding, deliberately set
at 34% of the accent. Delete the `<i class="ref">` wrapper to turn one into a
permanent eyebrow, or delete the line to remove it.

## Regenerating

These files are generated from `index.html` by `wordpress/build.sh`. Edit that and
re-run, or edit these directly and accept that the next build overwrites them.
