#!/usr/bin/env bash
#
# Regenerate the WordPress theme from the source site at the repository root.
#
# index.html is the single source of truth for markup and assets/ for CSS and
# JS; wordpress/src/ holds the PHP templates. Edit those, run this, commit the
# result. Editing the generated theme directly means the next run silently
# discards your changes.
#
# Usage:  wordpress/build.sh

set -euo pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
theme="$repo/wordpress/captal-onepage"
src="$repo/wordpress/src"

command -v python3 >/dev/null || { echo "build: python3 is required" >&2; exit 1; }

rm -rf "$theme"
mkdir -p "$theme/assets/css" "$theme/assets/js" "$theme/template-parts"

python3 - "$repo" "$theme" "$src" <<'PY'
import re, sys, os, base64, json

repo, theme, src = sys.argv[1], sys.argv[2], sys.argv[3]
html = open(os.path.join(repo, 'index.html')).read()

def slice_between(start_pat, end_pat, label):
    """Pull one region out of index.html, failing loudly rather than silently
    emitting a half-built theme if the markup is restructured."""
    s = re.search(start_pat, html)
    e = re.search(end_pat, html)
    if not s or not e or e.start() < s.start():
        sys.exit('build: could not locate the %s region in index.html' % label)
    return html[s.start():e.end()].rstrip()

site_header = slice_between(r'<header class="site-header"[^>]*>', r'</header>', 'site header')
site_footer = slice_between(r'<footer class="site-footer', r'</footer>', 'site footer')
sections    = slice_between(r'<!-- ── 01 Front page', r'</section>\s*(?=\n<!-- ── Footer)', 'page sections')

# Anchor links in the chrome must work from a sub-page too, where a bare
# "#firm" resolves against the wrong document.
def absolutise(markup):
    return re.sub(
        r'href="#([a-z][a-z0-9-]*)"',
        lambda m: 'href="<?php echo esc_url( home_url( \'/#%s\' ) ); ?>"' % m.group(1),
        markup,
    )

site_header = absolutise(site_header)
site_footer = absolutise(site_footer)

# The wordmark links to the top of a one-pager, which is only the right target
# when the one-pager IS the current document. Point it at the site root so it
# still works from a sub-page or an Elementor-built page.
site_header = re.sub(
    r'<a class="site-header__home" href="#top"',
    '<a class="site-header__home" href="<?php echo esc_url( home_url( \'/\' ) ); ?>"',
    site_header, count=1,
)

# The hardcoded nav becomes a real WordPress menu, falling back to the design's
# own links until one is assigned under Appearance > Menus.
nav_re = re.compile(r'( *)<nav class="site-nav" id="site-nav" aria-label="Primary">\n(.*?)\n *</nav>', re.S)
m = nav_re.search(site_header)
if not m:
    sys.exit('build: could not locate the primary nav in the site header')
indent, links = m.group(1), m.group(2)
site_header = site_header[:m.start()] + (
    '{i}<nav class="site-nav" id="site-nav" aria-label="<?php esc_attr_e( \'Primary\', \'captal-onepage\' ); ?>">\n'
    '{i}<?php\n'
    '{i}if ( has_nav_menu( \'primary\' ) ) :\n'
    '{i}\twp_nav_menu(\n'
    '{i}\t\tarray(\n'
    '{i}\t\t\t\'theme_location\' => \'primary\',\n'
    '{i}\t\t\t\'container\'      => false,\n'
    '{i}\t\t\t\'depth\'          => 1,\n'
    '{i}\t\t\t\'fallback_cb\'    => false,\n'
    '{i}\t\t)\n'
    '{i}\t);\n'
    '{i}else :\n'
    '{i}\t?>\n'
    '{links}\n'
    '{i}\t<?php\n'
    '{i}endif;\n'
    '{i}?>\n'
    '{i}</nav>'
).format(i=indent, links=links) + site_header[m.end():]

def build(name, out_name, **subs):
    text = open(os.path.join(src, name)).read()
    for key, value in subs.items():
        token = '{{%s}}' % key
        if token not in text:
            sys.exit('build: %s has no %s placeholder' % (name, token))
        text = text.replace(token, value)
    open(os.path.join(theme, out_name), 'w').write(text)

build('header.php', 'header.php', SITE_HEADER=site_header)
build('footer.php', 'footer.php', SITE_FOOTER=site_footer)
build('template-parts-onepage.php', 'template-parts/onepage.php', SECTIONS=sections)

# Templates that need no markup injection are copied verbatim.
for name in ('functions.php', 'style.css', 'index.php', 'page.php', 'single.php',
             'front-page.php', 'template-onepage.php', '404.php', 'search.php'):
    open(os.path.join(theme, name), 'w').write(open(os.path.join(src, name)).read())

# --- stylesheets and scripts ----------------------------------------------
tokens = open(os.path.join(repo, 'assets/css/tokens.css')).read()
open(os.path.join(theme, 'assets/css/tokens.css'), 'w').write(tokens)

styles = open(os.path.join(repo, 'assets/css/styles.css')).read()
styles = styles.replace('@import url("tokens.css");\n\n', '')
if re.search(r'^\s*@import', styles, re.M):
    sys.exit('build: an @import survived in styles.css — the enqueue order would break')
open(os.path.join(theme, 'assets/css/styles.css'), 'w').write(styles)

open(os.path.join(theme, 'assets/css/wordpress.css'), 'w').write(
    open(os.path.join(src, 'wordpress.css')).read()
)

for name in ('assets/js/main.js', 'assets/favicon.svg'):
    open(os.path.join(theme, name), 'w').write(open(os.path.join(repo, name)).read())

# --- paste route -----------------------------------------------------------
# For dropping the site into an existing page rather than installing the theme.
body = re.search(r'<body>\n(.*)\n<script src=', html, re.S)
if not body:
    sys.exit('build: could not locate the body markup in index.html')
body = body.group(1).rstrip()

paste = os.path.join(repo, 'wordpress', 'paste')
os.makedirs(paste, exist_ok=True)

js = open(os.path.join(repo, 'assets/js/main.js')).read().strip()
open(os.path.join(paste, '1-custom-html-block.html'), 'w').write(
    '<!-- Capiital — paste this ENTIRE file into a Custom HTML block. -->\n'
    '<!-- The stylesheet goes separately into Appearance > Customize > Additional CSS. -->\n\n'
    + body + '\n\n<script>\n' + js + '\n</script>\n'
)

# Additional CSS cannot resolve a relative @import, so the sheets are merged
# here in dependency order instead.
open(os.path.join(paste, '2-additional-css.css'), 'w').write(
    '/* Capiital — paste this ENTIRE file into Appearance > Customize > Additional CSS.\n'
    '   tokens.css and styles.css are already merged here in the required order;\n'
    '   the @import has been removed because Additional CSS cannot resolve it. */\n\n'
    + tokens.rstrip() + '\n\n' + styles.lstrip()
)

# --- distributable copies of the site itself ---------------------------------
# capiital-website.html inlines the two stylesheets and the script into one file
# that opens straight from disk; the fonts stay on the CDN, as the design source
# specifies. index.html is the source of truth for both, so they are generated
# rather than hand-kept.
dist = os.path.join(repo, 'dist')
os.makedirs(dist, exist_ok=True)

single = html
single = single.replace(
    '<link rel="stylesheet" href="assets/css/styles.css">',
    '<style>\n' + tokens.rstrip() + '\n\n' + styles.lstrip() + '\n</style>',
)
single = single.replace(
    '<script src="assets/js/main.js" defer></script>',
    '<script>\n' + open(os.path.join(repo, 'assets/js/main.js')).read().strip() + '\n</script>',
)
# The favicon is the only remaining external reference; inline it so the file is
# genuinely self-contained apart from the webfonts.
favicon = open(os.path.join(repo, 'assets/favicon.svg')).read()
single = single.replace(
    '<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">',
    '<link rel="icon" href="data:image/svg+xml;base64,'
    + base64.b64encode(favicon.encode()).decode() + '">',
)
for leftover in ('assets/css/', 'assets/js/', 'assets/favicon'):
    if leftover in single:
        sys.exit('build: %s survived in the single-file export' % leftover)
open(os.path.join(dist, 'capiital-website.html'), 'w').write(single)

ELEMENTOR_COMPAT = """
/* ── Elementor wrappers ──────────────────────────────────────────────────── */
/* Elementor drops every HTML widget inside section > container > column > wrap,
   each of which is width-constrained and padded by default. Two things go wrong
   if they are left alone: the full-bleed grounds stop at the content width, and
   any padding above the front page shows a band of the page ground through the
   transparent header. Scoped by :has() to wrappers that actually hold a piece of
   this design, so the rest of the site's Elementor content is untouched. */
:is(.elementor,
    .elementor-location-single,
    .elementor-section,
    .elementor-column,
    .elementor-widget-wrap,
    .elementor-widget,
    .elementor-widget-html,
    .elementor-widget-container,
    .e-con,
    .e-con-inner):has(:is(.capiital-part, .front, .site-header, .site-footer)){
  padding:0!important;
  margin:0!important;
}
.elementor-section:has(:is(.capiital-part, .front, .site-header, .site-footer)) > .elementor-container{
  max-width:none!important;
  width:100%!important;
}
.capiital-part{width:100%}
"""

# --- Elementor template ------------------------------------------------------
# One importable file for Elementor: Templates > Saved Templates > Import.
# The whole page rides in a single HTML widget, because the design is authored as
# one document with its own header, footer and full-bleed sections — rebuilding
# it as Elementor sections and columns would hand the layout to Elementor's grid
# and lose the hairline construction the design is built from.
# The page is set to Elementor Canvas so the active theme wraps nothing around it.
els = []
def eid(seed):
    """Elementor wants a short unique hex id per element."""
    import hashlib
    return hashlib.sha1(seed.encode()).hexdigest()[:7]

# The webfonts arrive by @import rather than a <link>, which must be the first
# rule in the sheet — hence its position at the very top of the style block.
font_import = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,300;1,8..60,400&display=swap');"

widget_html = (
    '<style>\n' + font_import + '\n\n' + tokens.rstrip() + '\n\n' + styles.lstrip()
    + '\n' + ELEMENTOR_COMPAT + '</style>\n\n'
    + body + '\n\n<script>\n'
    + open(os.path.join(repo, 'assets/js/main.js')).read().strip() + '\n</script>\n'
)

template = {
    "version": "0.4",
    "title": "Capiital Website",
    "type": "page",
    "page_settings": {
        # Canvas: no theme header, footer or content wrapper. The design supplies
        # all three itself.
        "template": "elementor_canvas",
    },
    "content": [{
        "id": eid("section"),
        "elType": "section",
        "settings": {
            "layout": "full_width",
            "gap": "no",
            "content_width": {"unit": "px", "size": "", "sizes": []},
            "padding": {"unit": "px", "top": "0", "right": "0", "bottom": "0", "left": "0", "isLinked": True},
            "margin": {"unit": "px", "top": "0", "right": "0", "bottom": "0", "left": "0", "isLinked": True},
        },
        "elements": [{
            "id": eid("column"),
            "elType": "column",
            "settings": {
                "_column_size": 100,
                "_inline_size": None,
                "padding": {"unit": "px", "top": "0", "right": "0", "bottom": "0", "left": "0", "isLinked": True},
            },
            "elements": [{
                "id": eid("widget"),
                "elType": "widget",
                "widgetType": "html",
                "settings": {"html": widget_html},
                "elements": [],
                "isInner": False,
            }],
            "isInner": False,
        }],
        "isInner": False,
    }],
}

with open(os.path.join(dist, 'capiital-elementor-template.json'), 'w') as fh:
    json.dump(template, fh, ensure_ascii=False, separators=(',', ':'))

print('build: theme templates, assets, paste/ and dist/ generated')
PY

if command -v php >/dev/null; then
  find "$theme" -name '*.php' -print0 | xargs -0 -n1 php -l >/dev/null
  echo "build: php syntax ok"
else
  echo "build: php not found — skipping syntax check" >&2
fi

# the_content() is what Elementor requires; losing it silently breaks the
# builder, so the build refuses to ship a theme without it.
for required in page.php single.php; do
  grep -q 'the_content()' "$theme/$required" \
    || { echo "build: $required does not call the_content() — Elementor would not render" >&2; exit 1; }
done
echo "build: the_content() present in page.php and single.php"

# Deterministic archive. A plain `zip -r` stores each file's mtime and walks the
# directory in filesystem order, so rebuilding from unchanged sources produced a
# byte-different zip every time — a tracked binary that showed up as a spurious
# diff on every build. Fixing the mtimes, sorting the entry list and dropping the
# extra attribute fields (-X) makes identical inputs give identical bytes.
rm -f "$repo/wordpress/captal-onepage.zip"
find "$theme" -exec touch -t 202001010000.00 {} +
( cd "$repo/wordpress" \
  && find captal-onepage -type f ! -name '.DS_Store' | LC_ALL=C sort \
     | zip -qX captal-onepage.zip -@ )
echo "build: wrote wordpress/captal-onepage.zip"

rm -f "$repo/dist/capiital-website.zip"
find "$repo/index.html" "$repo/assets" -exec touch -t 202001010000.00 {} +
( cd "$repo" \
  && find index.html assets -type f ! -name '.DS_Store' | LC_ALL=C sort \
     | zip -qX dist/capiital-website.zip -@ )
echo "build: wrote dist/capiital-website.zip"

# --- per-section snippets ----------------------------------------------------
# One file per Elementor HTML widget, for building the page by hand rather than
# importing it whole.
python3 - "$repo" <<'PY'
import re, sys, os, shutil

repo = sys.argv[1]
html = open(os.path.join(repo, 'index.html')).read()
out  = os.path.join(repo, 'dist', 'sections')
shutil.rmtree(out, ignore_errors=True)
os.makedirs(out)

def grab(start, end, label):
    s = re.search(start, html)
    if not s:
        sys.exit('snippets: could not find %s' % label)
    e = re.search(end, html[s.start():])
    if not e:
        sys.exit('snippets: could not close %s' % label)
    return html[s.start(): s.start() + e.end()].rstrip()

skip   = grab(r'<a class="skip-link"', r'</a>', 'skip link')
header = grab(r'<header class="site-header"[^>]*>', r'</header>', 'header')
footer = grab(r'<footer class="site-footer[^>]*>', r'</footer>', 'footer')

def section(sid):
    return grab(r'<section class="[^"]*"[^>]*id="%s">' % sid, r'</section>\s*(?=\n<!--|\n<footer|\Z)', sid)


# Elementor puts every HTML widget inside section > container > column > wrap,
# each of which is width-constrained and padded by default. Left alone, the
# full-bleed grounds stop at the content width and the hairline grids inherit
# padding they were never drawn with. Scoping the reset to .capiital-part means
# it only ever touches wrappers holding a piece of this design, so the rest of
# the site's Elementor content is untouched.
COMPAT = """
/* ── Elementor wrappers ──────────────────────────────────────────────────── */
/* Elementor drops every HTML widget inside section > container > column > wrap,
   each of which is width-constrained and padded by default. Two things go wrong
   if they are left alone: the full-bleed grounds stop at the content width, and
   any padding above the front page shows a band of the page ground through the
   transparent header. Scoped by :has() to wrappers that actually hold a piece of
   this design, so the rest of the site's Elementor content is untouched. */
:is(.elementor,
    .elementor-location-single,
    .elementor-section,
    .elementor-column,
    .elementor-widget-wrap,
    .elementor-widget,
    .elementor-widget-html,
    .elementor-widget-container,
    .e-con,
    .e-con-inner):has(:is(.capiital-part, .front, .site-header, .site-footer)){
  padding:0!important;
  margin:0!important;
}
.elementor-section:has(:is(.capiital-part, .front, .site-header, .site-footer)) > .elementor-container{
  max-width:none!important;
  width:100%!important;
}
.capiital-part{width:100%}
"""

FONT_IMPORT = ("@import url('https://fonts.googleapis.com/css2?"
               "family=Inter:wght@300;400;500;600&family=Source+Serif+4:ital,opsz,wght@"
               "0,8..60,300;0,8..60,400;0,8..60,500;1,8..60,300;1,8..60,400&display=swap');")

tokens = open(os.path.join(repo, 'assets/css/tokens.css')).read()
styles = open(os.path.join(repo, 'assets/css/styles.css')).read()
styles = styles.replace('@import url("tokens.css");\n\n', '')
if re.search(r'^\s*@import', styles, re.M):
    sys.exit('snippets: an @import survived in styles.css')

# The stylesheet travels inside piece 01 rather than in a widget of its own. A
# widget holding only a <style> renders nothing but still occupies its Elementor
# section's padding — measured at 50px of empty page ground above the header —
# and it is one more thing to keep in the right order. Folded in here it cannot
# be misplaced, and CSS is global once parsed, so pieces 02 onward still see it.
# The @import has to be the first rule in the sheet or the browser drops it and
# both faces fall back silently.
STYLESHEET = ('<style>\n' + FONT_IMPORT + '\n\n' + tokens.rstrip() + '\n\n'
              + styles.lstrip() + '\n' + COMPAT + '</style>')

# The header travels WITH the front page, not in a section of its own. Given its
# own Elementor section it would occupy layout space the fixed header does not
# need, pushing the hero down: a band of page ground above the hero, a seam
# between the two, and the navigation sitting on the eggshell instead of over the
# dark hero before a single pixel has been scrolled.
# The skip link belongs to the same piece — it is the first focusable thing on
# the page and has to precede the navigation it skips.
order = [
    ('01', 'header-front', 'Stylesheet, header and front page',
     STYLESHEET + '\n\n' + skip + '\n\n' + header + '\n\n' + section('top')),
    ('02', 'engage',       'What we engage',        section('services')),
    ('03', 'believe',      'What we believe',       section('philosophy')),
    ('04', 'learned',      'What we learned',       section('learned')),
    ('05', 'cases',        'Cases',                 section('cases')),
    ('06', 'people',       'Who we are',            section('people')),
    ('07', 'papers',       'What we think',         section('papers')),
    ('08', 'contact',      'How to reach us',       section('contact')),
    ('09', 'footer',       'Footer',                footer),
]

for num, slug, title, markup in order:
    body = '\n'.join('  ' + l if l.strip() else l for l in markup.split('\n'))
    open(os.path.join(out, '%s-%s.html' % (num, slug)), 'w').write(
        '<!-- Capiital — %s. One HTML widget, in its own full-width Elementor\n'
        '     section with zero padding. -->\n'
        '<div class="capiital-part">\n%s\n</div>\n' % (title, body))

# The stylesheet again as bare CSS, for Appearance > Customize > Additional CSS.
# That box is never run through the content filters, so it is the one place the
# CSS cannot be mangled.
open(os.path.join(out, 'optional-styles-for-additional-css.css'), 'w').write(
    '/* Capiital — OPTIONAL, and an ALTERNATIVE to the <style> block at the top of\n'
    '   01-header-front.html, never a companion to it: pasting both loads the\n'
    '   stylesheet twice. Use this only if you delete that block. Paste into\n'
    '   Appearance > Customize > Additional CSS, which expects bare CSS and so\n'
    '   carries no <style> tag. */\n\n'
    + FONT_IMPORT + '\n\n' + tokens.rstrip() + '\n\n' + styles.lstrip() + '\n' + COMPAT)

open(os.path.join(out, '10-script.html'), 'w').write(
    '<!-- Capiital — SCRIPT. Paste this LAST, into its own HTML widget at the very\n'
    '     bottom of the page. It drives the header on scroll, the reading progress\n'
    '     hairline, the live nav item and the scroll-entry reveals. Without it the\n'
    '     sections below the hero stay invisible.\n'
    '     The .capiital-part wrapper collapses this widget\'s Elementor section, which\n'
    '     would otherwise leave empty padding below the footer. -->\n'
    '<div class="capiital-part">\n'
    '<script>\n' + open(os.path.join(repo, 'assets/js/main.js')).read().strip() + '\n</script>\n'
    '</div>\n')

README = """# Capiital — section snippets

Paste each file into an Elementor **HTML widget**, in number order.

| # | File | Goes in |
| --- | --- | --- |
| 01 | `01-header-front.html` | Stylesheet, header **and** front page, together |
| 02 | `02-engage.html` | What we engage |
| 03 | `03-believe.html` | What we believe |
| 04 | `04-learned.html` | What we learned |
| 05 | `05-cases.html` | Cases |
| 06 | `06-people.html` | Who we are |
| 07 | `07-papers.html` | What we think |
| 08 | `08-contact.html` | How to reach us |
| 09 | `09-footer.html` | Footer |
| 10 | `10-script.html` | An HTML widget at the very bottom |

Two alternates are included for the cases described below:
`optional-styles-for-additional-css.css` and `10-script-oneline.html`.

## The stylesheet lives in 01

There is no separate styles widget. A widget holding only a `<style>` renders
nothing but still occupies its Elementor section's padding — 50px of empty page
ground above the header — and it is one more thing to keep in the right order.
It is folded into `01` instead, ahead of the skip link. CSS is global once
parsed, so `02` onward still see it.

To move it to **Appearance > Customize > Additional CSS** instead, delete the
`<style>` block from the top of `01` and paste
`optional-styles-for-additional-css.css` there. Do one or the other, never both:
pasting both loads the stylesheet twice.

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
"""
open(os.path.join(out, 'README.md'), 'w').write(README)

print('build: wrote dist/sections/ (%d files)' % (len(order) + 3))
PY


# A newline-free copy of the script. WordPress's wpautop turns every newline
# inside a pasted <script> into a <br />, which destroys the JavaScript — so a
# build with no newlines in it has nothing to destroy. Optional: the readable
# copy is always written, and this one is skipped with a warning if the minifier
# is unavailable rather than failing the build.
if [ -f "$repo/node_modules/terser/package.json" ] || command -v terser >/dev/null 2>&1; then
  node - "$repo" <<'NODE' || echo "build: minifier failed — 10-script-oneline.html not written" >&2
const path = require('path');
const fs = require('fs');
const repo = process.argv[2];
let minify;
try { ({ minify } = require(path.join(repo, 'node_modules/terser'))); }
catch (e) { ({ minify } = require('terser')); }
(async () => {
  const src = fs.readFileSync(path.join(repo, 'assets/js/main.js'), 'utf8');
  const r = await minify(src, { format: { comments: false }, compress: true, mangle: true });
  if (r.error) throw r.error;
  if (r.code.includes('\n')) throw new Error('minified output still contains a newline');
  fs.writeFileSync(path.join(repo, 'dist/sections/10-script-oneline.html'),
    '<!-- Capiital — SCRIPT, on one line. Identical behaviour to 10-script.html.\n'
  + '     Use this one if the readable copy comes back broken: WordPress turns\n'
  + '     newlines inside a pasted <script> into <br /> tags, and a file with no\n'
  + '     newlines has nothing for it to break. -->\n'
  + '<div class="capiital-part">\n<script>' + r.code + '</script>\n</div>\n');
  console.log('build: wrote dist/sections/10-script-oneline.html');
})();
NODE
else
  echo "build: terser not installed — skipping 10-script-oneline.html" >&2
fi

# Packed last, so everything generated above is inside it.
rm -f "$repo/dist/capiital-sections.zip"
find "$repo/dist/sections" -exec touch -t 202001010000.00 {} +
( cd "$repo/dist" \
  && find sections -type f ! -name '.DS_Store' | LC_ALL=C sort \
     | zip -qX capiital-sections.zip -@ )
echo "build: wrote dist/capiital-sections.zip"
