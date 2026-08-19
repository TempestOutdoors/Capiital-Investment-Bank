# CAP=TAL for WordPress

`captal-onepage/` is the site packaged as an installable WordPress theme.

It is **generated** from `index.html` and `assets/` at the repository root. Edit
those, then regenerate — changes made directly to the theme are overwritten on
the next build:

```sh
wordpress/build.sh
```

The script rewrites `index.php` and the theme's assets, checks the PHP syntax if
`php` is available, and repacks `captal-onepage.zip`.

## Install

1. Zip the `captal-onepage` folder (or use the prebuilt `captal-onepage.zip`).
2. **Appearance → Themes → Add New → Upload Theme** → choose the zip → Install.
3. **Activate.**

That's it — there is no page to create and nothing to configure. The theme's
`index.php` renders the one-pager for every front-end request.

## Why it is a theme and not a page

The design owns the entire page: it ships its own sticky header, its own nav and
its own footer. Dropped into an ordinary WordPress page it would render *inside*
the active theme's header and footer, giving two navs, two footers and a
container that fights the full-bleed sections.

For the same reason `index.php` deliberately does **not** call `get_header()` or
`get_footer()`. It calls `wp_head()`, `wp_body_open()` and `wp_footer()`
directly, so plugins and the admin bar still work while nothing else is injected
around the design.

## Editing the content

All copy is plain markup in `index.php` — the transaction figures, office
addresses, insight titles and so on are literal text. Search for the phrase you
want to change and edit it in place.

To make a section editable from the WordPress admin instead, replace the literal
text with a field call (`the_field()` with ACF, or `get_post_meta()`), keeping
the surrounding markup and classes exactly as they are — the classes carry the
design.

## Notes

- **Fonts** load from Google Fonts, matching the design source. If the site must
  not call out to Google, download the two families, drop the woff2 files into
  `assets/fonts/`, and swap the `captal-fonts` enqueue for local `@font-face`
  rules.
- **`tokens.css` is a dependency of `styles.css`**, declared in the enqueue
  rather than with an `@import`, so the order is guaranteed and WordPress can
  cache both normally.
- **The admin bar** would otherwise sit on top of the sticky header; the theme
  offsets the header by 32px (46px on narrow screens) only while it is showing.
- **A Site Icon** set in the Customizer wins over the bundled `favicon.svg`.
