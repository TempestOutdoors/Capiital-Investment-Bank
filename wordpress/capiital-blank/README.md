# Capiital Blank

A deliberately empty WordPress theme. WordPress requires a theme; this one
satisfies that requirement and then gets out of the way.

## Install

**Appearance → Themes → Add New → Upload Theme** → `capiital-blank-theme.zip`
→ Install → **Activate**.

## What it renders

Nothing of its own. A page with empty content produces about 270 bytes: a
doctype, a `<head>` carrying `wp_head()`, a `<body>`, an empty `<main>`, and
`wp_footer()`. No site header, no navigation, no branding, no footer, no widget
areas, no fonts, no colours, no typography.

That is the whole point: the page *is* the design. An Elementor layout or pasted
markup renders as the entire document rather than as something dropped inside a
theme's frame.

## The stylesheet

`style.css` contains only corrections to browser defaults that would otherwise
damage a full-bleed design:

- `body` margin zeroed — the browser's default 8px puts a white border around an
  edge-to-edge layout.
- `box-sizing: border-box` — assumed by essentially every modern layout.
- Media capped at `max-width: 100%` so nothing forces a horizontal scrollbar.
- `.screen-reader-text`, which WordPress core and many plugins emit. Without it,
  text meant only for screen readers is rendered visibly on the page.

Nothing in that file is a style choice. If you want to add a rule to it, it
almost certainly belongs in the page's own stylesheet instead.

## Elementor

- `page.php`, `single.php`, `index.php` and `search.php` all run the loop and
  call `the_content()`, which is what Elementor replaces to render.
- `header.php` and `footer.php` call `elementor_theme_do_location()`, so if you
  later publish a header or footer in Theme Builder it has somewhere to go. The
  theme itself still renders neither.
- The core Theme Builder locations are registered, without which Theme Builder
  silently falls back to the theme's templates.

A page prints no title, because a designed page supplies its own. A single post
does print its title, because a written post would otherwise appear untitled.

## Against the other theme

`wordpress/captal-onepage/` renders the Capiital design itself — its own header,
its own footer, the whole one-page layout. That is the right theme if you want
the site to *be* that design with no page building. It is the wrong theme if you
are building the page in Elementor, because you get the design twice.

Use exactly one of them.

## Verified

The Capiital design was rendered inside this theme and measured against the
standalone build: same 7957px document height, same eight sections, hero and
footer both full width, nothing above the hero, every scroll reveal fired, no
horizontal overflow, and the header transparent at rest and 95% cream once
scrolled — identical on every measure.
