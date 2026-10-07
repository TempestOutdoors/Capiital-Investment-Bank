# 07 · Who we are

**Purpose.** Who the firm is, and how to reach each principal directly.
**Anchor:** `#people`. **Built as:** native containers. Use a reusable *Person* template (Elementor Pro
saved template or Loop item) so a person is added by duplicating one block. Editable.
**Source:** `PeopleSection`, `people`, `PEOPLE_SPANS`, `PEOPLE_CSS`.

## Ground and padding

Eggshell `on-sand`, padding 128px gutter.

## Intro

The heading **lg** (60px), then one subtitle 24px under it (see *Current detail* below). Reveal settle / veil.

## The people

- Margin-top 96px. First a 1px **ink** hairline drawing in from the left (RuleDraw `ink`).
- Grid: `repeat(8, minmax(0,1fr))`, column-gap 48px, row-gap 48px, padding-top 40px.
- **Placement:** four on the top row, two below them, each centred under the meeting point of a pair:

  | # | Name | `grid-column` |
  | --- | --- | --- |
  | 1 | C.H. Tange | `1 / span 2` |
  | 2 | M.F. Madsen | `3 / span 2` |
  | 3 | J.S. Wiese | `5 / span 2` |
  | 4 | A.S. Trats | `7 / span 2` |
  | 5 | Peter | `2 / span 2` |
  | 6 | Richard | `6 / span 2` |

  Person 5 sits under the join of persons 1 and 2; person 6 under the join of persons 3 and 4.
- **Each person**, a grid with gap 16px, `align-content:start`, Reveal settle, step `i % 4`:
  1. **Portrait placeholder:**
     - `role="img"`, `aria-label` *Portrait of {name} to follow*
     - `aspect-ratio: 4 / 5; width: 75%; margin-bottom: 16px`
     - background `color-mix(in oklab, var(--sand) 28%, var(--eggshell))`, 1px border `var(--border)`
     - The camera icon centred: 22px, stroke 1.25, stone
     - When the photograph arrives it replaces the box at the same size, `object-fit: cover`. Alt text is the person's name.
  2. **`h3` name:** serif 30px, line-height 1.08, **brown** `#88766C`.
  3. **Role:** 11px, uppercase, tracking 0.16em, brown-ink.
  4. **Phone:** margin-top 12px, 14px, 300, brown-ink. **Format exactly `M: +45 6054 4110`**: the letter
     M, colon, space, +45, then the eight digits in two groups of four. Make it a `tel:` link only if the
     firm wants that; v3 shows plain text.
  5. **E-mail:** a `mailto:` link, 14px, 300, brown-ink, border-bottom `1px solid color-mix(in oklab,
     var(--brown) 45%, transparent)`, padding-bottom 2px, `justify-self:start`, `overflow-wrap:anywhere`.
     **Always lowercase.**
  6. **LinkedIn:** the text *LinkedIn* (same in Danish), same style as the e-mail. Its href is empty until
     the firm supplies the addresses: render `#`, and add `target="_blank" rel="noopener"` once real.

## Copy

Names, roles, phones and e-mails from `content/copy-en-da.md` and `reference/source/sections.jsx`:

| Name | Role (EN / DA) | Phone | E-mail |
| --- | --- | --- | --- |
| C.H. Tange | Chief Executive / Administrerende direktør | M: +45 2948 8417 | christian.tange@capiital.eu |
| M.F. Madsen | Analyst / Analytiker | M: +45 6054 4110 | mathias.madsen@capiital.eu |
| J.S. Wiese | Associate / Associate | M: +45 2233 4455 | jonathan.wiese@capiital.eu |
| A.S. Trats | Senior Analyst / Senioranalytiker | M: +45 5380 8417 | anastasia.trats@capiital.eu |
| Peter | [Role] / [Rolle] | M: +45 [0000 0000] | [name]@capiital.eu |
| Richard | [Role] / [Rolle] | M: +45 [0000 0000] | [name]@capiital.eu |

Peter and Richard are placeholders. J.S. Wiese's number may be a placeholder too (`open-items.md`).

## Responsive

≤ 900px: one column, every person at `grid-column:auto`, placeholder at 75% of the column width.
**Provisional, 901–1300px:** keep the 8-column layout. If names wrap awkwardly at 1024px, reduce the
column-gap to 32px. Do not change the 4 + 2 arrangement.

## Traps

- Six people, laid out as four plus two centred beneath. Not a row of six, and not three plus three.
- The placeholder boxes were reduced by 25% on purpose, to 75% width.
- Phone format and lowercase e-mail are both checked in `checklist.md`.

## Current detail (7 October 2026) — governs where the text above differs

- Portrait placeholders have **no border**.
- **Intro replaced** (7 October 2026): the heading, then one subtitle 24px **under** it (max-width 34rem, 16px, 300, body text, Reveal veil step 1). No 12-column split, no second paragraph:
  *An M&A house in Copenhagen, with the conviction that a transaction should end in a result both sides can be proud of.*
  Danish: *Et M&A-hus i København, med den overbevisning at en transaktion skal ende i et resultat, begge sider kan være stolte af.*
