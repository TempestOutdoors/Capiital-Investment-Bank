# 20 · Footer: How to reach us

**Purpose.** The invitation to write, the form, the site's index, and the legal line, in one band.
**Anchor:** `#contact` (the last nav item). **Built as:** Theme Builder **footer** template, on all pages.
Left column: custom widget `Capiital · Contact`, or native Heading + Text + Elementor Pro Form. Right
column and legal lines: native widgets.
**Source:** `ContactFooter`, `FOOT_COLUMNS`, `FOOT_ICE_CSS`, `FORM_COPY`.

## Ground

- `background: linear-gradient(90deg, var(--ice-pale), var(--ice))` (#E7F0F6 → #B8D0E0), left to right.
  The Logo Border's gradient.
- Text ink-blue. Headings, legal lines and rules navy. **Slate is never used here** (≈3.4:1 on ice).
- Padding `80px var(--gutter-lg) 40px`.

## Layout

12-column grid, gap 48px, max-width 1400.

### Left (span 6): grid, gap 24px, `align-content:start`, Reveal settle

1. Section heading **md**: *Every engagement* / italic navy *begins with a letter.*
   (Danish *Ethvert samarbejde* / *begynder med et brev.*)
2. `p`: margin 0, max-width 30rem, 16px, 300, line-height 1.625, ink-blue:
   *Engagements come to us by introduction or by letter. If you are considering a sale, an acquisition, a capital raise or a succession, we would be glad to hear of it.*
3. **E-mail link** `mailto:contact@capiital.eu`:
   - `justify-self:start`, inline-flex, gap 12px
   - serif 20px, text `contact@capiital.eu` (lowercase) followed by Lucide `arrow-right` 18px
   - border-bottom `1px solid color-mix(in oklab, var(--navy) 40%, transparent)`, padding-bottom 6px
4. **Form**: grid of 2 columns (`minmax(0,1fr) minmax(0,1fr)`), gap 16px, max-width 34rem,
   `aria-label` *Write to the firm* (*Skriv til huset*), `novalidate`. See below.

### Right (`8 / span 5`): 3 columns, gap 32px, `align-content:start`

| Heading (EN / DA) | Links |
| --- | --- |
| Where we engage / Hvor vi rådgiver | Before a transaction, After a transaction, During ownership, Before exit (all → `#services`) |
| The house / Huset | What we learned `#learned`, Cases `#cases`, Who we are `#people`, What we think `#papers`, Archive → archive page |
| Legal / Juridisk | Legal notice `→ legal#legal-notice`, Privacy `#privacy`, Cookies `#cookies`, Regulatory disclosures `#regulatory` |

- Column headings: 11px, uppercase, tracking 0.16em, navy, margin-bottom 16px.
- Links: grid, gap 12px; 14px, 300, ink-blue. Hover navy (200ms).
- On the archive and legal pages, section anchors point to the front page.

### Legal lines (full width)

- Margin-top 64px, padding-top 24px, border-top `1px solid color-mix(in oklab, var(--navy) 22%, transparent)`.
- Grid, gap 8px, 11px, line-height 1.625, navy. Two lines:
  1. `© MMXXVI Capiital ApS · Dampfærgevej 27, 2100 København Ø, Denmark · CVR 42842699`
     (Danish: *…, Danmark · …*). The year is the Roman numeral MMXXVI: keep it, and update it each year.
  2. *Information on this site is provided for general informational purposes only and does not constitute investment, legal, tax or accounting advice.*

## The form

| Field | Label (EN / DA) | Placeholder (EN / DA) | Span |
| --- | --- | --- | --- |
| `weighing` textarea, 2 rows, required | What you are weighing / Hvad der overvejes | A sale, an acquisition, a raise, a succession / Et salg, et opkøb, en kapitalrejsning, et generationsskifte | both columns |
| `address` email, required, `autocomplete="email"` | Where we reply / Hvor vi svarer | name@company.eu / navn@virksomhed.dk | column 1 |
| button | `Message →` / `Send →` | | column 2, right-aligned, padding-top 26px |
| status line | (see below) | | both columns |

- **Labels:** 14px, Inter 500, line-height 1, ink-blue. Fields sit 8px below their label.
- **Inputs:**
  - Input height 36px; textarea min-height 60px, `resize: vertical`.
  - Padding: input `4px 12px`, textarea `8px 12px`.
  - 14px Inter, square corners, no shadow.
  - Border `1px solid color-mix(in oklab, var(--navy) 42%, transparent)`.
  - Background `color-mix(in oklab, var(--cream) 55%, transparent)`.
  - Text ink-blue. Placeholder slate (placeholder only; it is not body text).
  - Focus: border navy.
  - Invalid: border navy plus `box-shadow: inset 0 -1px 0 var(--navy)` (a doubled bottom rule). **No red anywhere.**
- **Button** (editorial):
  - transparent, border as the inputs, ink-blue text
  - 12px uppercase, tracking 0.16em, square, `→` after the label
  - disabled: opacity 0.55, cursor default
- **Validation**, on submit only, not while typing:
  1. Empty message → under the textarea: *Please tell us, briefly, what you are weighing.*
  2. Empty address → under the input: *Please give an address at which we may reply.*
  3. Malformed address (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`) → *That address appears incomplete; please look at it again.*
  - Each error is a `p` with margin-top 6px, 11px, line-height 1.5, navy, `id` linked by
    `aria-describedby`; the field gets `aria-invalid="true"`.
  - Focus moves to the first invalid field. Typing in a field clears its error.
- **Status line** (`role="status" aria-live="polite"`), 11px navy:
  - At rest: *All engagements are governed by separate written terms.*
  - While sending: the button reads *Sending* and is disabled.
  - Sent: *Received, with thanks. A principal will reply in person.* Fields and button disabled.
  - Failed: *The message could not be sent. Please write to contact@capiital.eu directly.*
  - Danish for all of them in `content/copy-en-da.md`.
- **Spam:** honeypot plus the 3-second floor (`elementor.md` §6). A caught submission sees *Received* and
  nothing is sent.

## Responsive: decided in v3, 7 October 2026 (`FOOT_ICE_CSS`)

- **≤ 900px:**
  - Left and right become full width, stacked, gap 48px.
  - The link columns go to 2 columns, with *Legal* wrapping to a second row.
  - The form becomes 1 column, with the button left-aligned and padding-top 0.
- **≤ 560px:** the link columns go to 1 column.

## Traps

- The footer was dark navy with a separate light contact band. **It is now one band, on ice.** Use none of
  the old navy footer styles (`on-ink`, `--rule-on-ink`).
- The e-mail is `contact@capiital.eu`, not `hello@`. Two i's in *capiital*.
- No *we do not provide capital* line anywhere. It was removed as something no house would say.
