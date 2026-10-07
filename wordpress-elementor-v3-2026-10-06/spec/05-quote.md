# 05 · Quote

**Purpose.** The house's one quotation, the principle the firm is built on.
**Anchor:** none; not in the navigation and no heading. **Built as:** native Elementor container with
Heading or Text widgets. Editable.
**Source:** `QuoteSection`, `PullQuote`.

## Layout

- Section: eggshell `on-sand`, padding `48px var(--gutter-lg)`. Kept tight on purpose, so the gap
  between *What we learned* and *Cases* stays small.
- Inner block: max-width 1100px, centred, `text-align:center`. This is the one centred element on the
  site, and it is a deliberate exception.
- The whole block enters with Reveal **settle**.

## Elements

1. **`blockquote`** (margin 0): serif 60px, line-height 1.15, ink. Text in curly quotes:
   `“The firm is built on the conviction that ` + italic navy `judgment is not delegable` + `”`
   (Danish: *Huset er bygget på den overbevisning, at* + *dømmekraft ikke kan uddelegeres*).
2. **Attribution block:** margin-top 48px, inline-flex column, centred.
   - A 1px hairline, 64px wide, navy, margin-bottom 24px.
   - *C.H. Tange*: serif 20px, line-height 1.2, no wrap.
   - *Chief Executive* (*Administrerende direktør*): margin-top 8px, 12px, uppercase, tracking 0.16em, slate.
3. **Footnote `p`:** margin-top 24px, 14px, slate:
   *Every mandate is led, executed and concluded by the principal who accepted it.*

## Responsive: decided in v3, 7 October 2026

v3 uses `font-size: clamp(2.25rem, 5vw, 3.75rem)` (36–60px).

## Traps

- The quote previously sat lower on the page, after *Who we are*. It belongs between *What we learned*
  and *Cases*.
- The quote was rewritten from *cannot be franchised* to *is not delegable*. Use the latter.

## Current detail (7 October 2026) — governs where the text above differs

- Padding-top 0 when *What we learned* above it is staged (`#learned.is-staged + .quote-sec`).
