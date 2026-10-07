# 06 · Cases

**Purpose.** Three accounts of situations, the usual course, and the other reading the firm took.
**Anchor:** `#cases`. **Built as:** native containers (3 cells) + Heading + Text widgets, with a small
CSS class `case-cell` from the child theme for the hover. Editable.
**Source:** `CasesSection`, `CASES_CSS`, `cases`.

## Ground and padding

Eggshell `on-sand`. Padding top **64px** (half), bottom 128px, sides gutter.

## Head row

- Flex, align end, space-between, gap 32px, margin-bottom 64px.
- **Left:** section heading **md**: *Quiet rigour.* / italic navy *Loud results.*
  (Danish: *Stille grundighed.* / *Tydelige resultater.*). Reveal settle.
- **Right:** max-width 24rem, 16px, 300, line-height 1.625, body text. Reveal veil, step 1:
  *The affairs of those we advise are their own; names and identifying detail are withheld.*

## Grid

- `display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 48px 40px`. No background, no border.
- Each **cell**: no fill, no padding, flex column. Reveal settle, step 0/1/2
  (delays 0, 90, 180ms).
  1. `h3` sector: margin-top 0, serif 30px, weight 400, line-height 1.08. Navy on cell hover (200ms).
  2. Image placeholder (see below), then  3. Body: margin-top 24px. `p` 14px, 300, line-height 1.625, body text. Opacity 0 at rest, **1 on cell
     hover** (900ms). The space is held throughout, so nothing moves or reflows.

## Copy

Three sectors and accounts, verbatim from `content/copy-en-da.md`:
- Industrial manufacturing
- Sponsor-backed services
- Life sciences

All three are **placeholders** until the firm supplies real cases (`open-items.md`).

## Responsive

- ≤ 900px: one column, `grid-auto-rows: 1fr`.
- `(hover: none)`: body visible at rest (decided in v3, 7 October 2026). On a phone the account would otherwise never be seen.

## Reduced motion

No transition on the body.

## Traps

- Titles only at rest is deliberate. Do not show the body permanently on desktop.
- No figures or statistics. A *figures* block was removed from this section on purpose.

## Current detail (7 October 2026) — governs

- Head: the heading, then the subtitle 24px **under** it (max-width 34rem). Not beside it.
- Grid: `gap: 48px 40px`, no background, no border. Cells: no fill, no padding.
- **No *Case 01–03* labels** (7 October 2026): each cell begins with its sector title (margin-top 0).
- **Image placeholder** below each sector title (7 October 2026): 3:2, `color-mix(in oklab, var(--sand) 28%, var(--eggshell))`, camera icon 22px stone centred, no border, margin-top 24px, `role="img"` *Photograph to follow*. The account follows 24px below it. A per-case image field in Elementor; when set, the photo replaces the box at 3:2, `object-fit: cover`.
- **The photographs must not identify the company.** They show a kind of place or work (a production floor, a laboratory bench), never the actual company, its site, signage or people. Cases are anonymised.
