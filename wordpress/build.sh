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
    '<style>\n' + font_import + '\n\n' + tokens.rstrip() + '\n\n' + styles.lstrip() + '\n</style>\n\n'
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
