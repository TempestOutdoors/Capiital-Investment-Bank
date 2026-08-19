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
import re, sys, os

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

site_header = slice_between(r'<header class="site-header">', r'</header>', 'site header')
site_footer = slice_between(r'<footer class="site-footer', r'</footer>', 'site footer')
sections    = slice_between(r'<!-- ── Hero', r'</section>\s*(?=\n<!-- ── Footer)', 'page sections')

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
site_header = site_header.replace(
    '<a href="#" aria-label="CAP=TAL — home">',
    '<a href="<?php echo esc_url( home_url( \'/\' ) ); ?>" aria-label="CAP=TAL — home">',
    1,
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
    '<!-- CAP=TAL — paste this ENTIRE file into a Custom HTML block. -->\n'
    '<!-- The stylesheet goes separately into Appearance > Customize > Additional CSS. -->\n\n'
    + body + '\n\n<script>\n' + js + '\n</script>\n'
)

# Additional CSS cannot resolve a relative @import, so the sheets are merged
# here in dependency order instead.
open(os.path.join(paste, '2-additional-css.css'), 'w').write(
    '/* CAP=TAL — paste this ENTIRE file into Appearance > Customize > Additional CSS.\n'
    '   tokens.css and styles.css are already merged here in the required order;\n'
    '   the @import has been removed because Additional CSS cannot resolve it. */\n\n'
    + tokens.rstrip() + '\n\n' + styles.lstrip()
)

print('build: theme templates, assets and paste/ generated')
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

rm -f "$repo/wordpress/captal-onepage.zip"
( cd "$repo/wordpress" && zip -rq captal-onepage.zip captal-onepage -x '*.DS_Store' )
echo "build: wrote wordpress/captal-onepage.zip"
