# 30 · The archive

**Purpose.** Every publication, filterable and orderable. A card opens a near-full-screen reading panel over the page.
**URL:** an Elementor page, `/archive/` (Danish `/da/arkiv/`). Reached from *All publications* and from
*Archive* in the footer. **Built as:** custom widget `Capiital · Archive`, reading the Publication CPT,
with header and footer from Theme Builder.
**Source:** `reference/source/archive.jsx` (`ARCHIVE_CSS`, `ArcCard`, `ArcMenu`, `ArcPanel`, `Archive`).

## Page

- `main`: padding `calc(var(--nav-height) + 80px) var(--gutter-lg) 128px`. Inner max-width 1400.
- **Intro:** 12-column grid, gap 48px, `align-items:end`, Reveal veil.
  - Left (span 7): section heading **md**: *What we think,* / italic navy *in full.* (Danish *Hvad vi mener,* / *i sin helhed.*)
  - Right (span 5): `p` 16px, 300, line-height 1.625, body text, max-width 30rem:
    *Every letter, note and review the house has published, arranged by type, sector, stage of engagement and year.*

## Filter and order bar

- Margin-top 64px. `.arc-bar`:
  - flex-wrap, space-between, `align-items:center`, gap 16px 40px, padding 16px 0
  - 1px rule top and bottom
  - `role="group"`, `aria-label` *Filter and order the archive*
- **Four filter dropdowns** on the left (flex-wrap, gap 8px 40px):

  | Label (EN / DA) | Values | Option order |
  | --- | --- | --- |
  | Type / Type | publication_kind | A–Z (in the current language) |
  | Sector / Sektor | publication_sector | A–Z, *Across sectors* (*Tværgående*) last |
  | Stage / Fase | publication_stage | fixed: Before a transaction, After a transaction, During ownership, Before exit |
  | Year / År | from the publish date | newest year first |

  Only values that occur in at least one publication are listed.
- **One order dropdown** on the right (its pop-up aligned right):
  - Label *Order: Newest* (Danish *Rækkefølge: Nyeste*).
  - Options:
    - Newest / Nyeste (**default**)
    - Oldest / Ældste
    - A–Z / A–Å
    - Z–A / Å–A
  - A–Z sorts by the title in the current language.
- **Menu button** `.arc-menu-btn`:
  - transparent, padding 6px 0, 11px, uppercase, tracking 0.14em, ink
  - inline-flex, gap 8px, followed by a 12px `chevron-down` that rotates 180° when open (200ms)
  - navy on hover and when open
  - Filters show their count when active: *Sector (2)*.
- **Pop-up** `.arc-pop`:
  - `position:absolute; top: calc(100% + 8px); left:0; z-index:20; min-width:15rem`
  - cream background, 1px border, padding 8px 0
  - `role="group"` for filters and `role="radiogroup"` for order
- **Option** `.arc-opt`:
  - full width, flex, gap 12px, padding 8px 20px, 14px, ink
  - hover: eggshell background, navy text
  - Box 14×14, 1px stone border:
    - Filters are checkboxes: checked fills navy with a cream tick (10px, stroke 3).
    - Order is a radio: a round box, its checked state an inset navy dot.
  - `role="checkbox"` / `role="radio"`, with `aria-checked`.
  - Choosing an order closes its menu; filters stay open for several picks.
- Clicking outside or pressing Escape closes any open menu. Only one is open at a time.
- **Count line** below the bar: flex, gap 24px, padding 16px 0, 14px, slate, `aria-live="polite"`.
  - Reads `{n} of {total} publications` (*{n} af {total} publikationer*), with the `n` in serif, ink.
  - When any filter is active, a *Clear filters* / *Ryd filtre* button follows. Style it as `.arc-toggle`:
    11px uppercase, tracking 0.14em, slate, ink on hover, padding 6px 0.
- Filters combine: **AND across groups, OR within a group**.

## Grid

- `.arc-grid`: `repeat(5, minmax(0,1fr))`, gap 1px, padding 1px, margin-top 8px. Each card has a 1px `var(--border)` outline.
  - 4 columns at ≤ 1280px, 2 at ≤ 900px, 1 at ≤ 560px.
- **Card** `.arc-card`:
  - a `button`, `aria-haspopup="dialog"`, `aria-label` = the title
  - `position:relative; overflow:hidden; background: cream`
  - **The photograph alone at rest**, aspect 4 / 5, `object-fit:cover`.
- **Placeholder** (until a photograph is set): aspect 4 / 5, background `color-mix(in oklab, var(--sand)
  28%, var(--eggshell))`, camera icon 22px stone centred, and the `photo_brief` text top-left (inset 16px,
  top 12px), 11px, line-height 1.4, stone. `role="img"` with `aria-label` *Photograph to follow: {brief}*.
- **Hover veil** `.arc-info`, over the photo's foot:
  - `position:absolute; left:0; right:0; bottom:0`, grid, gap 8px, padding 20px
  - background `color-mix(in oklab, var(--ice) 78%, transparent)` with `backdrop-filter: blur(12px)`, text ink-blue
  - Opacity 0 at rest, 1 on card hover or `:focus-visible` (600ms standard). `aria-hidden`.
  - Contents:
    1. `{Kind} · {Month Year}`: 11px, uppercase, tracking 0.16em, navy
    2. title: serif 18px, line-height 1.2
    3. summary: 12px, 400, line-height 1.5
    4. sector: caps, navy
  - **Touch (`hover: none`):** the veil becomes `position:static; opacity:1`, under the photo.
- **Empty state:** when no publication matches, a block with margin-top 24px, padding 64px 0, rules top
  and bottom, serif 24px, slate: *No publication answers to every filter chosen.*

## Reading panel

- **Veil** `.arc-veil`:
  - `position:fixed; inset:0; z-index:100`
  - background `color-mix(in oklab, var(--eggshell) 85%, transparent)`: the site stays visible, muted, behind it
  - opacity 0→1 over 420ms standard
  - Clicking the veil (not the panel) closes.
- **Panel** `.arc-panel`:
  - `position:absolute; top:4vh; bottom:4vh; left:0; right:0; margin:0 auto; width:min(92vw, 1320px)`
  - cream background, 1px border, `overflow:auto; overscroll-behavior:contain`
  - `role="dialog" aria-modal="true" aria-labelledby="arc-title"`
- **Sticky head:**
  - cream background, border-bottom, flex space-between, padding `20px 48px`
  - Left: `{Kind} · {Month Year}` in caps, slate.
  - Right: *Close* / *Luk* + `x` 16px (11px caps, ink, navy on hover). Focus goes to *Close* on open.
- **Body** `.arc-detail`: 12-column grid, gap 48px, padding `40px 48px 64px`.
  - **Left (span 7):** the photograph, aspect **4 / 3**, 1px border (placeholder icon 30px).
  - **Right (span 5):** grid, gap 24px:
    1. `h2#arc-title`: serif 48px, 400, line-height 1.06, tracking −0.015em, ink, `text-wrap:balance`
    2. summary: serif 20px, line-height 1.4, navy
    3. body paragraphs: 16px, 300, line-height 1.625, body text
    4. meta `dl`: margin-top 16px, rule on top; rows grid `9rem 1fr`, gap 16px, padding 12px 0, rule below.
       - `dt` caps slate, `dd` 14px ink
       - Rows: Type, Sector, Stage, Published, Reading time (*Type, Sektor, Fase, Udgivet, Læsetid*)
    5. If a PDF is attached, a final link *Download the PDF →* (*Hent PDF →*) in the link-caps style.
       This is new, and the only addition to v3.
- **Address:** opening sets `#{slug}` with `history.replaceState`. Loading `/archive/#{slug}` opens that entry.
  Closing clears the hash.
- **While open:** `html{overflow:hidden}`. Escape closes. Focus returns to the card that opened it.
- ≤ 900px: the body goes to one column, gap 32px, padding 24px.
- ≤ 560px: the panel is full screen (`top:0; bottom:0; width:100vw; border:0`).

## Data

From the Publication CPT, current language. Card and panel fields:
- title
- summary (ACF)
- kind, sector and stage (taxonomies)
- publish date (`F Y`, Danish month names on `/da/`)
- read time (ACF)
- featured image, or else `photo_brief` (ACF)
- body (content)
- PDF (ACF)

Load all publications at once; there are few. If there are ever more than 60, paginate by 30 with a
*More* link in the link-caps style.

## Adding a publication

The editor adds a post under *Publications → Add new*. It appears in the archive and, if among the
latest four, in *What we think*, with the formatting and behaviour above automatically. Nothing about a
card is styled per post.

## Reduced motion

The veil and hover fades are instant.

## Traps

- Cards show **the photo alone** until hovered. That was decided after a version with text under every card.
- The hover veil is ice at 78% with a blur, not navy.
- Filters were checkbox chips first; they are now dropdowns.

## Current detail (7 October 2026) — governs where the text above differs

- Intro: heading, then the standfirst 24px under it (max-width 34rem).
- Grid: `gap: 24px`, no padding; cards have **no outline**.
- Placeholders, the reading panel and the pop-up menus have **no border**. The panel's sticky-head rule and the meta ledger rules stay.
