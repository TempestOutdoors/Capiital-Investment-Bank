# 08 · What we think

**Purpose.** The latest four publications, listed like a contents page, with the way into the archive.
**Anchor:** `#papers`. **Built as:** native Heading + Text + **Loop Grid** (Elementor Pro) of the
Publication CPT, with a Loop item template styled as the ledger row below.
**Source:** `PapersSection`, `PublicationRow` (`ds-components.jsx`).

## Ground and padding

Eggshell `on-sand`, padding 128px gutter.

## Head

- 12-column grid, gap 48px, margin-bottom 64px.
- **Left** (span 5): section heading **md**: *Notes from* / italic navy *the desk.* (Danish *Noter fra* / *skrivebordet.*).
- **Right** (`7 / span 5`), align end: `p` 16px, 300, line-height 1.625, body text, Reveal veil step 1:
  *Letters, sector notes and quarterly reviews on Nordic transactions and the capital behind them.*

## The ledger

- A wrapper with `border-bottom: 1px solid var(--border)`, holding four rows. Each row has Reveal settle, step 0–3.
- **Query:** Publication CPT, current language, **newest first** by publish date, 4 posts.
- **Row** (a link, `display:grid`):
  - `grid-template-columns: 12rem 8rem 1fr 6rem 4rem`, gap 32px, `align-items:baseline`
  - padding `32px 24px 32px 0`, border-top `1px solid var(--border)`
  - background transparent, **white** `#FFFFFF` on hover (200ms)
- The five columns:
  1. Kind: 11px, uppercase, tracking 0.16em, navy.
  2. Date: 12px, slate.
     - In v3 the format is `Q2 · 2025` or `June 2026`. For the CPT use month and year, `June 2026`
       (Danish `Juni 2026`), as the archive does.
  3. Title: serif 24px, line-height 1.15, inherits ink; navy on hover (200ms).
  4. Read time: 12px, slate, no wrap (`12 min`).
  5. CTA: 11px, uppercase, tracking 0.16em, right-aligned, slate; navy on hover. Text *Read →* (Danish *Læs →*).
- **Link target:** the archive page with the entry open: `/archive/#{slug}` (Danish `/da/arkiv/#{slug}`,
  or whatever slug WPML gives the translated page).

## The archive link

Margin-top 40px, Reveal veil. Text *All publications* (Danish *Alle publikationer*):
- 12px, uppercase, tracking 0.16em
- inline-flex, gap 12px, followed by `→` (`aria-hidden`)
- border-bottom `1px solid color-mix(in oklab, var(--navy) 60%, transparent)`, padding-bottom 4px

It goes to the archive page.

## Responsive: decided in v3, 7 October 2026 (`PAPERS_CSS`)

- **≤ 900px:** each row becomes two lines:
  - line 1: kind and date side by side (same styles, 16px apart)
  - line 2: the title at 20px
  - read time and CTA hidden
  - padding 24px 0
- **901–1300px:** columns `10rem 7rem 1fr 5rem`, CTA hidden.
- The head grid stacks to one column at ≤ 900px.

## Traps

- The four rows in v3 are hard-coded and some titles differ from the archive's. On WordPress they are
  simply the latest four Publication posts, so they always match the archive.
- Not cards: a contents page.

## Current detail (7 October 2026) — governs where the text above differs

- Head: the heading, then the subtitle 24px **under** it (max-width 34rem). Not a 12-column split.
