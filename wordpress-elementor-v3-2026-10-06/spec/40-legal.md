# 40 · The legal page

**Purpose.** Legal notice, privacy, cookies and regulatory disclosures, on one page in four parts.
**URL:** `/legal/` (Danish `/da/juridisk/`). **Built as:** native Elementor page: a container with a
sticky left index and the text on the right. One small script from the plugin marks the part in view.
Text editable.
**Source:** `reference/source/legal.jsx`.

## Layout

- `main`: padding `calc(var(--nav-height) + 80px) var(--gutter-lg) 128px`. Inner max-width 1400.
- 12-column grid, gap 64px.
- **Index** (span 4): `position: sticky; top: calc(var(--nav-height) + 48px); align-self:start`. Native
  Elementor sticky is not used; use CSS `position: sticky`. This is the sanctioned sticky-column read.
  1. Section heading **md**: *Legal* / italic navy *and disclosures.* (*Juridisk* / *og oplysninger.*)
  2. `nav` (`aria-label` *Parts of this page* / *Sidens afsnit*): margin-top 40px, rule on top.
     - Four links, each: block, padding 12px 0, rule below, 11px, uppercase, tracking 0.14em, ink.
     - Navy on hover and when that part is in view (class `is-live`).
  3. Margin-top 24px, 11px, slate, line-height 1.6:
     - *Last updated 1 October 2026* (*Senest opdateret 1. oktober 2026*)
     - line break, then *[Draft for legal review]* (*[Udkast til juridisk gennemgang]*)
     - **Remove the bracketed line once the lawyer has approved the text.**
- **Text** (`6 / span 7`): four `section`s, each with:
  - its `id`: `legal-notice`, `privacy`, `cookies`, `regulatory`
  - `scroll-margin-top: var(--nav-height)`, padding 48px 0, rule on top (the first has no rule and no top padding)
  - `h2`: serif 36px, 400, line-height 1.08, tracking −0.01em, ink, margin-bottom 24px
  - a content column of max-width 40rem, gap 16px:
    - `p`: 16px, 300, line-height 1.625, body text, `text-wrap: pretty`
    - sub-headings `h3`: margin-top 16px, 11px, 400, uppercase, tracking 0.16em, navy
    - the register table in *Legal notice*, a `dl`:
      - rule on top, margin-bottom 16px
      - rows grid `11rem 1fr`, gap 16px, padding 12px 0, rule below
      - `dt` 11px caps slate (padding-top 3px), `dd` 14px ink
- **Live part:** the last part whose top is at or above 34% of the viewport.
- ≤ 900px: one column, gap 40px, the index static (not sticky).

## Copy

All four parts in both languages, verbatim, in `content/copy-en-da.md` (*Legal page*) and `legal.jsx`.
Register facts:
- Capiital ApS
- CVR 42842699
- Dampfærgevej 27, 2100 København Ø
- NACE 70.20
- `contact@capiital.eu`

The Danish uses neutral legal Danish (*den registrerede*, *selskabet*), not the house voice. That is deliberate.

## Must change on WordPress

- *Cookies*, paragraph 2, says the fonts load from Google Fonts. On WordPress they are self-hosted, so
  **replace that paragraph** with: *Its typefaces are served from this site's own server; no third party is
  contacted when a page loads.* (Danish: *Skrifttyperne leveres fra webstedets egen server; ingen tredjepart
  kontaktes, når en side indlæses.*) Remove the bracketed sentence.
- If Turnstile is ever added, the cookie part must say so (`open-items.md`).

## Footer links

Each of the four footer *Legal* links opens this page at its part (`/legal/#privacy` …) and scrolls there
after render (`spec/60-links.md`).

## Traps

- Bracketed items are for the firm to fill: the retention period *[twelve]* months, the conflicts-of-interest
  statement, and the hosting and e-mail processors. **Do not invent them.**
- The text is a draft. It is not in force until the firm's lawyer approves it (`open-items.md`).
