# The WordPress half

Two things go on the server, and `SETTINGS.md` is clicked through once between them.

| | | |
| --- | --- | --- |
| **Hello Elementor** | the parent theme | install, do not activate |
| **`dist/capiital-child-theme.zip`** | tokens, the two typefaces, every style | install and activate |
| **`dist/capiital-site-plugin.zip`** | publications, the six widgets, the behaviour | install and activate |
| **Advanced Custom Fields** (free) | the four publication fields | install before the plugin |

Elementor Pro, WPML and Yoast are already on the site. Do not add Rank Math — Yoast is there,
and two SEO plugins fight.

## The order

1. **Hello Elementor**, installed and left inactive.
2. **`capiital`**, uploaded and activated. The site now has the colours, both typefaces and
   every style, and renders no content of its own.
3. **`SETTINGS.md`**, clicked through. Google Fonts off is the one that matters most.
4. **ACF**, then **`capiital-site`**. Then *Publications → Placeholder entries → Import* for
   the twelve drafts the archive was designed against.
5. **The two Theme Builder templates**, from `wordpress/templates/`: Templates → Theme
   Builder → Import, then set each to display on the Entire Site.
6. **The front page**: a page set to **Elementor Canvas**, with the pieces from
   `dist/sections-grouped/` — minus the header and the footer, which the templates now own.
   Or, section by section, the six custom widgets from the **Capiital** category.
7. **The archive**: a page at `/archive/`, Canvas, with one *Capiital · Archive* widget.
8. **The legal page**: a page at `/legal/`, Canvas, built from `templates/legal.html`.
9. **WPML last.** Translating fields that are still moving wastes the work twice.

## What goes where, and why

**The theme styles; the plugin behaves; Elementor arranges.** The line between the first two
is one question: would it be lost if the design were restyled? Colours, type and layout
belong to the theme. Publications, their fields and the page's behaviour belong to the
plugin, because they have to survive that.

**No CSS is ever pasted anywhere.** Not into a widget — WordPress strips `<style>` from widget
content, and the whole stylesheet disappeared that way once, leaving the site as unstyled
markup. Not into Additional CSS either. A stylesheet enqueued by PHP is not page content and
is never filtered.

**Nothing loads from a third party.** Both typefaces are served from the theme, and
`functions.php` refuses any Google Fonts request a plugin might reintroduce. The legal page
states as a fact that no third party is contacted when a page loads; `build.sh` fails rather
than ship a build where that has stopped being true.

## The archive is one implementation, not two

`assets/js/archive.js` draws the filters, the cards and the reading panel from a JSON island
and never knows where that island came from. The static `archive.html` is built from
`content/publications.json`; the *Capiital · Archive* widget writes the same island from the
publication post type. So the archive is written, tested and fixed once.

## Rebuilding

```
wordpress/build.sh
```

Reads `index.html`, `templates/`, `assets/` and `content/` at the repository root and writes
the theme, the plugin's copies, `archive.html`, `legal.html`, the paste pieces, the single
self-contained file and every zip. Editing a generated file directly means the next run
discards the change without saying so.

It refuses to finish if a third-party request has appeared, if a paste-able piece has
acquired a `<style>` or a `<script>`, if the single-file build still fetches anything, if a
sub-page's header or footer still carries a bare `#anchor`, if the ledger links to a slug no
publication answers to, or if the plugin's copy of the behaviour has drifted from the source.
Each of those guards exists because the fault it catches happened.

## The other theme here

`capiital-blank/` is the neutral standalone theme written before the child theme, and it is
what is active on the site today. It carries none of the design. Once `capiital` is on and the
front page renders, it can be deleted — along with `CAP=TAL One-Page`, which is the retired
generation.
