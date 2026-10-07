# Elementor architecture

## 1. Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Theme | Hello Elementor + child theme `capiital` | Lightest base; the child holds tokens, fonts, base CSS |
| Builder | Elementor Pro (latest on the test site; read the version first) | Theme Builder, Loop Grid, Forms, Custom Fonts, Role Manager |
| Languages | WPML Multilingual CMS + String Translation | Official Elementor Pro compatibility; translates pages, templates, CPT, widget fields |
| Fields | Advanced Custom Fields (free) | Publication fields; Elementor Pro reads ACF in dynamic tags |
| SEO | Rank Math (only if not already present — see open items) | Titles, descriptions, hreflang works with WPML |
| Custom | Plugin `capiital-site` (you write it) | CPT, taxonomies, custom widgets, shared JS/CSS, form hooks |

Nothing else unless the test site already has it. Caching: whatever the host provides. Do not add
analytics, cookie banners, sliders, animation add-ons or icon packs.

## 2. Which parts are native and which are custom

**Native Elementor (containers + Heading, Text Editor, Image, Button, Icon List, Form, Loop Grid), so the
firm edits directly:**
- Quote section
- Cases (three cells)
- Who we are (intro text + six people)
- What we think (heading, standfirst, ledger via Loop Grid of the latest four publications, link)
- Legal page text
- The footer's text, link columns and legal lines

**Custom widgets in `capiital-site`, so the firm edits their fields in the Elementor panel while the
behaviour stays fixed:**

| Widget | Fields exposed to the editor | Why custom |
| --- | --- | --- |
| `Capiital · Header` (used in the Theme Builder header) | none (menu from a WP menu location; languages from WPML) | Logo Border cross-fade, reading-line highlighting, Menu fold at 1300px, EN · DA switch, scroll-progress rule |
| `Capiital · Front page` | headline line 1, line 2, line 3 (italic), standfirst | Skyline band, the wash arriving, entry timing |
| `Capiital · Where we engage` | heading line, accent line, hint, 4 × (numeral, title, line) | The held row (third motion exception), arrival order, hover/focus logic |
| `Capiital · What we learned` | heading line, accent line, standfirst, repeater of observations (title, body) | The pinned stage, an exception the native Sticky effect cannot do |
| `Capiital · Archive` | heading line, accent line, standfirst | Filters, order, card grid, the enlarged reading panel, `#slug` addresses |
| `Capiital · Contact` (in the footer template) | heading line, accent line, paragraph, e-mail | Wraps a native Elementor Pro Form, see §6 |

Register every text control so WPML picks it up: add a `wpml-config.xml` in the plugin declaring each
widget's fields, including repeater fields. Test that the Danish appears in *WPML → String Translation*
or the Advanced Translation Editor.

## 3. Elementor settings (Site Settings and Elementor → Settings)

- **Features:** Flexbox Container *on*, Optimised DOM / Optimised asset loading *on*, Inline Font Icons *on*,
  Grid Container *on*.
- **Disable Default Colours** and **Disable Default Fonts**: *on*.
- **Google Fonts:** *off* (Elementor → Settings → Advanced → Google Fonts: Disable).
- **Font Awesome 4 shim:** *off*. **Load Font Awesome:** *off*. Icons are inline SVG (Lucide paths, below).
- **Custom Fonts (Pro):** add Source Serif 4 and Inter from the child theme's woff2 files.
- **Global Kit → Colours (system + custom), named exactly:**
  - Ink `#132939`
  - Navy `#1F4C6B`
  - Slate `#446881`
  - Steel `#6F98B3`
  - Ice `#B8D0E0`
  - Ice pale `#E7F0F6`
  - Eggshell `#EBE8DF`
  - Cream `#F7F5F0`
  - Sand `#C3BCB1`
  - Stone `#6E655E`
  - Brown `#88766C`
  - Body text `#43535E` (ink at 78% on eggshell, flattened)
  - Rule `#CFC9BF` (sand at 70% on eggshell, flattened)
- **Global Kit → Typography:** see `spec/00-foundations.md` §4. Create one global style per row.
- **Breakpoints:**
  - Mobile ≤ 640px
  - Mobile Extra ≤ 900px
  - Tablet ≤ 1300px
  - Laptop and Widescreen *off*

  Custom widgets keep their own exact media queries (560, 640, 900, 1280, 1300) in their CSS.
- **Layout:**
  - Content width 1400px.
  - Container padding 0. The gutter is applied per section as `clamp(24px, 3.4vw, 48px)`.
  - Default gap 0.
- **Theme Style → Buttons, Form fields:** border-radius 0 everywhere, no box-shadow.
- **Motion effects, entrance animations, hover animations, parallax, sticky, mouse effects:** never used.
  Leave every widget's *Motion Effects* empty. All motion comes from the plugin's shared JS
  (`spec/50-motion.md`).
- **Role Manager:** if a second editor is added, give them content-only access ("Access to edit
  content only").

## 4. Child theme

- `style.css` imports the five token files from `tokens/` unchanged, plus v3's header override:
  `:root{--nav-height:4rem}` and `@media (max-width:640px){:root{--nav-height:3.5rem}}`.
- `fonts/` holds the woff2 files and an `@font-face` block, with `font-display: swap`.
- Base:
  - `body{margin:0;background:var(--eggshell);color:var(--ink);font-family:var(--font-sans);-webkit-font-smoothing:antialiased}`
  - `a{color:inherit;text-decoration:none}`, with `a:hover` handled per component
  - `*{border-radius:0}` for Elementor's own controls
- `.on-sand` scope as in `tokens/colors.css`: every section on eggshell carries it.

## 5. The Publication post type

- CPT `publication`: public, has archive *no* (the Archive page is an Elementor page with the custom widget),
  supports title, editor, thumbnail, excerpt, page-attributes (menu order), revisions. Slug `publications`.
- Taxonomies, all hierarchical *false*, shown in admin columns and filters:
  - `publication_kind`: Sector note · Quarterly review · Owner's letter · Market letter
  - `publication_sector`: Chemicals · Across sectors · Sponsor-backed services · Industrial manufacturing · Energy · Life sciences
  - `publication_stage`: Before a transaction · After a transaction · During ownership · Before exit (in that fixed order everywhere)
- ACF fields:
  - `summary`: textarea, one sentence
  - `read_time`: text, e.g. `12 min`
  - `photo_brief`: text; describes the photograph wanted while there is none, and becomes the alt text
  - `pdf`: file, optional
- The **date** is the post's publish date. The **body** is the post content. The **photograph** is the featured image.
- Single template (Theme Builder → Single → Publication): title, summary, body, meta ledger, photograph,
  same styles as the archive's reading panel (`spec/30-archive.md`). The archive's panel is the primary
  way to read; the single page exists for sharing and search engines.
- The twelve placeholder entries in `content/copy-en-da.md` are imported as posts, marked placeholder
  (`open-items.md`).

## 6. The form

- Native **Elementor Pro Form** inside the footer template (or inside `Capiital · Contact`).
- Fields:
  1. `weighing`: textarea, 2 rows, required.
  2. `address`: email, required.
  3. **Honeypot** field (Elementor Pro's built-in field type).
- **Time check:** add a hidden field `t0` filled on page load by JS (`Date.now()`). In
  `elementor_pro/forms/validation`, if `now - t0 < 3000` ms, mark the submission as spam: return success
  to the visitor and send nothing.
- Actions: **Email** to `contact@capiital.eu` (subject `Website enquiry`, reply-to the visitor's address)
  and **Collect Submissions**.
- Messages (Form → Additional options → Custom messages), English, with the Danish in WPML:

  | Message | English |
  | --- | --- |
  | Success | Received, with thanks. A principal will reply in person. |
  | Error | The message could not be sent. Please write to contact@capiital.eu directly. |
  | Required, message | Please tell us, briefly, what you are weighing. |
  | Required, address | Please give an address at which we may reply. |
  | Invalid address | That address appears incomplete; please look at it again. |

  Elementor has one generic *required* message, so the field-specific ones need a small JS or a
  validation hook. They must appear **under their field** in navy at 11px, not in a red box.
- Button text `Message →` (Danish `Send →`); while sending `Sending` (Danish `Sender`).
- Styling: `spec/20-footer.md`. No reCAPTCHA. Cloudflare Turnstile only if spam persists, and then the
  cookie text must change (`open-items.md`).

## 7. WPML

- Default language **English**, at the root (`capiital.eu/`). **Danish** under `capiital.eu/da/`.
- Language switcher: none of WPML's own. The header widget renders `EN · DA` itself from
  `icl_get_languages()` (`spec/01-header.md`).
- Translate: pages, Theme Builder templates (header and footer), the Publication CPT and its three
  taxonomies, ACF fields, form messages, widget fields.
- `hreflang` on every page (WPML adds it; check it does).
- Dates: Danish month names on `/da/` (WordPress locale `da_DK`).
- Anchors (`#services`, `#learned` …) and publication slugs stay **the same in both languages**, so
  in-page links work unchanged.

## 8. Icons

Inline SVG only, stroke `currentColor`, width 16 (UI) unless stated, stroke-width 2 (UI) or 1.25
(camera placeholder):
- `arrow-right`, `menu`, `x`, `chevron-down`, `check`, all from Lucide
- camera: `M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z` + circle cx12 cy13 r3

The arrow in links is the Unicode → in text, not an icon, except the e-mail link in the footer
(icon, 18px).
