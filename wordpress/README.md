# Capiital for WordPress

`captal-onepage/` is the v3 site packaged as an installable WordPress theme.

It is **generated** from `index.html` and `assets/` at the repository root. Edit
those, then regenerate — changes made directly to the theme are overwritten on
the next build:

```sh
wordpress/build.sh
```

The PHP templates live in `wordpress/src/`; the script injects the markup split
out of `index.html` into them, checks the PHP syntax if `php` is available,
verifies `the_content()` survived, and repacks `captal-onepage.zip`.

## Install

1. Zip the `captal-onepage` folder (or use the prebuilt `captal-onepage.zip`).
2. **Appearance → Themes → Add New → Upload Theme** → choose the zip → Install.
3. **Activate.**

That's it — there is no page to create and nothing to configure. The front page
renders the one-page design; every other page, post and archive renders through
`the_content()` so Elementor and the block editor both work.

## Elementor

The theme is Elementor-compatible. Elementor renders by replacing the post
content filter, so it needs a template that calls `the_content()` inside the
loop — a template printing hardcoded markup gives it nothing to render into,
which is what the "Check Theme Compatibility" notice is reporting.

- `page.php`, `single.php`, `index.php` and `search.php` all run the loop and
  call `the_content()`.
- `header.php` and `footer.php` defer to Elementor Pro's Theme Builder via
  `elementor_theme_do_location()`, so a header or footer published there
  replaces the design's own.
- `captal_register_elementor_locations()` registers the core locations, without
  which Theme Builder silently falls back to the theme's templates.
- On a page built with Elementor the theme stands down: `captal_is_builder_page()`
  adds a body class that removes the theme's title, padding and content measure,
  so Elementor controls its own layout instead of being caged by ours.

`build.sh` fails the build if `the_content()` ever disappears from `page.php` or
`single.php`, since losing it breaks the builder silently.

## Where the one-page design lives

The design is no longer the whole theme — it is a template part
(`template-parts/onepage.php`) rendered by two entry points:

- **`front-page.php`** — the site's front page, used only when the assigned page
  has no content of its own. Build that page in Elementor and its content wins.
- **`template-onepage.php`** — a "Capiital One-Page" template you can assign to
  any page from the editor's Template dropdown.

The sticky header and the footer moved out into `header.php` and `footer.php`,
so ordinary pages, builder pages and the one-pager all share the same chrome
rather than each carrying a copy.

## Menus

The header nav falls back to the design's own links until a menu is assigned to
the **Primary** location under Appearance → Menus, at which point that menu
renders instead. `wp_nav_menu` emits `<ul><li><a>` where the design expects bare
`<a>`; rather than ship a custom walker, `wordpress.css` makes the list
transparent to the flex layout so both shapes lay out identically.

## Editing the content

All copy is plain markup in `index.php` — the transaction figures, office
addresses, insight titles and so on are literal text. Search for the phrase you
want to change and edit it in place.

To make a section editable from the WordPress admin instead, replace the literal
text with a field call (`the_field()` with ACF, or `get_post_meta()`), keeping
the surrounding markup and classes exactly as they are — the classes carry the
design.

## Notes

- **Fonts** are Inter and Source Serif 4, loaded from Google Fonts to match the
  design source. If the site must not call out to Google, download the two
  families, drop the woff2 files into `assets/fonts/`, and swap the
  `captal-fonts` enqueue for local `@font-face` rules.
- **`tokens.css` is a dependency of `styles.css`**, declared in the enqueue
  rather than with an `@import`, so the order is guaranteed and WordPress can
  cache both normally.
- **The admin bar** would otherwise sit on top of the sticky header; the theme
  offsets the header by 32px (46px on narrow screens) only while it is showing.
- **A Site Icon** set in the Customizer wins over the bundled `favicon.svg`.
