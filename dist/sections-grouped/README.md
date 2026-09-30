# Capiital — grouped snippets

The same page as `sections/`, in four Elementor **HTML widgets** instead of ten.

**Step one is not a widget.** `00-stylesheet.css` goes into
**Appearance > Customize > Additional CSS**, and everything else depends on it.
Skip it and the page renders as unstyled markup.

| # | File | Contains |
| --- | --- | --- |
| 0 | `00-stylesheet.css` | **Appearance > Customize > Additional CSS**, then Publish |
| 1 | `1-header-front.html` | Header, front page |
| 2 | `2-middle.html` | What we engage, believe, learned, cases, who we are, what we think |
| 3 | `3-contact-footer.html` | How to reach us, and the footer |
| 4 | `4-script.html` | The script |

`4-script-oneline.html` is an alternate, described below.

## Why these four

Every widget boundary is a wrapper that can introduce padding, so ten pieces mean
nine internal seams to keep flush and four mean two. The split follows the
design's own grounds — dark front page, eggshell middle, dark tail — so each file
is one continuous surface.

Contact travels with the footer because that is how the design was drawn. They
share the same deep ground and were a single component in the source, contact
running *into* the footer rather than sitting above a separate thing. Splitting
between them would cut the dark block in a place it was never drawn to be cut.

The stylesheet is not in a widget at all. It was once folded into file 1, and
that build rendered as unstyled markup, because WordPress strips `<style>` from
widget content in most configurations. The Customizer's Additional CSS box is
never filtered, so the stylesheet lives there and every widget still sees it.

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

## If the design renders as plain text

View the page source and search for `--sea-ink`. If it is not there, the
stylesheet did not load: `00-stylesheet.css` has not been pasted into Additional
CSS, or it was pasted and not published.

## Regenerating

Generated from `index.html` by `wordpress/build.sh`.
