# The WordPress half

This folder holds the theme that goes on the server. It is the first step of a staged
build: the theme carries the colours, the typefaces, the styles and the behaviour now, and
the front page sits in Elementor as markup while its sections are converted into
`capiital-site` widgets one at a time. The architecture it is heading for is written out in
`wordpress-elementor-v3-2026-10-06/elementor.md`.

## What to install

| | |
| --- | --- |
| **Hello Elementor** | The parent theme. Install it from Appearance → Themes → Add New; do not activate it. |
| **`dist/capiital-child-theme.zip`** | The child theme. Upload, then activate this one. |

That is the whole installation. Elementor Pro, ACF and WPML come later, with the custom
widgets and the Publication post type; nothing here needs them yet.

## What the theme does, and what it refuses to do

It enqueues four files and registers one menu location. It renders no content of its own.
The theme before it put the design into every page whether or not that was wanted, which is
why it is gone.

```
capiital/
  style.css               the theme header, and no rules
  functions.php           the enqueues, the menu, the Elementor locations, the guards
  screenshot.png
  assets/css/tokens.css   generated from assets/css/tokens/*.css at the repository root
  assets/css/fonts.css    @font-face for the two self-hosted families
  assets/css/styles.css   the whole design, including the Elementor wrapper reset
  assets/js/main.js       reveals, header, in-page links, the two held sections, the form
  assets/fonts/*.woff2    Source Serif 4 and Inter, latin and latin-ext
  assets/img/             the skyline, the Logo Border's shape, the wordmark mask
```

**No CSS is ever pasted anywhere.** Not into a widget — WordPress strips `<style>` out of
widget content, and the whole stylesheet disappeared that way once, leaving the site to
render as unstyled markup. Not into Appearance → Customize → Additional CSS either; that
worked, but it is one forgotten paste away from the same result. A stylesheet enqueued by
PHP is not page content and is never filtered.

**Nothing loads from a third party.** Both typefaces are served from the theme.
`functions.php` also refuses any `fonts.googleapis.com` or `fonts.gstatic.com` request that
a plugin or an Elementor setting might reintroduce, because the legal page's cookie
paragraph states as a fact that no third party is contacted when a page loads.
`wordpress/build.sh` fails rather than ship a build where that has stopped being true.

## Putting the page in

Install the theme first. Then, in Elementor's settings: Flexbox Container on, Grid Container
on, Google Fonts off, Load Font Awesome off, Disable Default Colours on, Disable Default
Fonts on, content width 1400, container padding 0, default gap 0, border-radius 0 under
Theme Style. Leave every widget's *Motion Effects* empty — the site's own motion is in the
theme and Elementor's would fight it.

Then add an HTML widget per file from either set, in order, and set the page template to
**Elementor Canvas**:

- `dist/sections-grouped/` — three pieces. Use this unless a section needs editing alone.
- `dist/sections/` — seven pieces, one per section, for finer editing.

Two pieces are deliberately not split further, and the reason is written beside each: the
header travels with the front page because a fixed header given its own Elementor section
still occupies layout space; and *What we learned* travels with the quote because the
selector that closes the gap between them on release is an adjacent-sibling selector, which
stops matching the moment they are in separate widgets.

## The other theme here

`capiital-blank/` is the neutral standalone theme written before this one, and it is what is
installed today. It is kept because it works and because it needs no parent, but it carries
none of the design: the child theme supersedes it. Install `capiital` and this one can go.

## Rebuilding

```
wordpress/build.sh
```

It reads `index.html` and `assets/` at the repository root and writes the theme, the paste
pieces, the single self-contained file and the zips. Editing a generated file directly means
the next run discards the change without saying so. The zips are byte-reproducible, so an
unchanged source gives an unchanged archive and no spurious diff.

The build refuses to finish if a third-party request has reappeared in the sources, if a
paste-able piece has acquired a `<style>` or a `<script>`, or if the single-file build still
fetches anything.
