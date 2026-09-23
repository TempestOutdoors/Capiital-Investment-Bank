# Capiital — grouped snippets

The same page as `sections/`, in four Elementor **HTML widgets** instead of ten.

| # | File | Contains |
| --- | --- | --- |
| 1 | `1-styles-header-front.html` | Stylesheet, header, front page |
| 2 | `2-middle.html` | What we engage, believe, learned, cases, who we are, what we think |
| 3 | `3-contact-footer.html` | How to reach us, and the footer |
| 4 | `4-script.html` | The script |

`4-script-oneline.html` and `optional-styles-for-additional-css.css` are
alternates, described below.

## Why these four

Every widget boundary is a wrapper that can introduce padding, so ten pieces mean
nine internal seams to keep flush and four mean two. The split follows the
design's own grounds — dark front page, eggshell middle, dark tail — so each file
is one continuous surface.

Contact travels with the footer because that is how the design was drawn. They
share the same deep ground and were a single component in the source, contact
running *into* the footer rather than sitting above a separate thing. Splitting
between them would cut the dark block in a place it was never drawn to be cut.

The stylesheet opens file 1 rather than occupying a widget of its own: a widget
holding only a `<style>` renders nothing but still takes its section's padding,
which shows as a band of empty page ground above the header.

**What you give up:** reordering sections by dragging. Moving *cases* above
*learned* means editing HTML inside file 2 rather than moving a block. If that
matters, use `sections/` instead — both are generated from the same source, so
you can switch at any time.

## Settings for each section

For every Elementor section holding one of these widgets:

- **Layout > Content Width: Full Width**
- **Layout > Columns Gap: No Gap**
- **Advanced > Padding: 0** on all four sides

The stylesheet also neutralises Elementor's own wrappers, scoped to
`.capiital-part` so nothing else on the site is affected.

## Use the HTML widget, not the Text Editor

The Text Editor widget runs WordPress's content filters, which strip `<br>`, the
empty `<span>`s that draw the wordmark's two bars, and `<span>`/`<p>` wrappers —
and turn every newline inside a `<script>` into `<br />`, which destroys it. The
HTML widget does none of that.

If the script comes back broken — view source and look for `<br />` or `<p>`
inside the `<script>` — paste `4-script-oneline.html` instead. Same code on one
line, so there are no newlines to convert.

## The stylesheet's other home

To keep the CSS in **Appearance > Customize > Additional CSS** instead, delete
the `<style>` block from the top of file 1 and paste
`optional-styles-for-additional-css.css` there. One or the other, never both:
pasting both loads the stylesheet twice.

## Regenerating

Generated from `index.html` by `wordpress/build.sh`.
