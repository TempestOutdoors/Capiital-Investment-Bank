# Capiital · site

What Elementor cannot do on its own, in one plugin: the Publication post type behind the
archive and the front page's ledger, six custom widgets, the shared behaviour, the form's
spam floor, and a Reveal control so the firm keeps the house motion on anything it adds.

## What is here, and why it is here rather than in the theme

| | |
| --- | --- |
| `includes/class-capiital-publications.php` | the `publication` post type, three taxonomies, four ACF fields in PHP, the admin columns |
| `includes/class-capiital-seed.php` | the twelve placeholder publications, imported on demand and removable in one step |
| `includes/class-capiital-assets.php` | `main.js` for the whole site, `archive.js` only where the archive is |
| `includes/class-capiital-form.php` | the three-second floor on the contact form |
| `includes/class-capiital-reveal.php` | settle / veil / draw on every widget's Advanced tab |
| `widgets/` | the six custom widgets |
| `wpml-config.xml` | every translatable field, including the ones inside repeaters |
| `data/publications.json` | the placeholder entries — the same file the static archive is built from |
| `assets/js/` | copied from the repository root by `wordpress/build.sh`; edit the sources, not these |

The line between this and the child theme is one question: would it be lost if the design
were restyled? Colours, type and layout belong to the theme and can be swapped. Publications,
their fields and the page's behaviour belong here, because they must survive that.

## Installing

1. **Advanced Custom Fields** (the free one) — the four publication fields are registered
   against it. Without ACF the plugin still runs and the archive still renders; the fields
   fall back to plain post meta, which nobody can edit comfortably.
2. This plugin.
3. Visit **Settings → Permalinks** once if `/publications/` 404s. Activation flushes the
   rules, but a cache in front of WordPress occasionally outlives it.
4. **Publications → Placeholder entries → Import the missing entries** to get the twelve
   drafts the archive was designed against. They are drafts, not published, and flagged, so
   the whole set can be binned in one step once the firm has written its own.

## The three places most likely to need an adjustment

Everything here is syntax-checked against PHP 8.4 and reviewed line by line, but none of it
has been run against a live WordPress with Elementor Pro. These are the parts where the
installed versions matter, and what to do if one misbehaves.

**1 · The form's three-second floor** (`class-capiital-form.php`). Silently accepting a
submission while running none of its actions is not something Elementor Pro documents a hook
for. The approach used is the one the field uses: register an error, which stops every
action, then set the response back to a success so the visitor sees the ordinary message. It
depends on `Ajax_Handler::set_success()` and `::add_error()` staying public.

*Test it:* submit within three seconds of the page loading. The visitor should see *Received,
with thanks*, no mail should arrive, and nothing should appear under Elementor → Submissions.
*If it misbehaves:* delete the time check and keep Elementor Pro's own Honeypot field, which
is the larger part of the protection anyway.

**2 · The Reveal control** (`class-capiital-reveal.php`). It is added through
`elementor/element/common/_section_style/after_section_end` and two sibling hooks, which is
how a plugin reaches the Advanced tab of every widget. Those hook names have been stable for
years but are not a promise.

*Test it:* open any widget's Advanced tab and look for *Reveal · Capiital*. *If it is
missing:* the hook name has moved; the control itself is unaffected and only needs
re-attaching.

**3 · The footer's form template** (`class-capiital-widget-contact.php`). A widget cannot
nest another widget, so the Elementor Pro Form is built once as a saved template and embedded
by id through `Plugin::$instance->frontend->get_builder_content_for_display()`.

*Test it:* the form should appear in the footer with its own styling from the theme. *If it
does not:* check the template is published and that its id is the one chosen in the widget.

## Editing the behaviour

`assets/js/` here is a copy. The sources are `assets/js/main.js` and `assets/js/archive.js`
at the repository root; `wordpress/build.sh` copies them in and then refuses to finish if the
two have drifted. A hand-edit inside this folder would be overwritten on the next build,
silently, which is exactly what that check exists to prevent.

## What this plugin does not do

It does not style anything. Every rule the site uses is in the child theme, including the
archive's and the legal page's. That is deliberate: the static pages at the repository root
are built and tested against the same stylesheet, so what is verified there is what ships.
