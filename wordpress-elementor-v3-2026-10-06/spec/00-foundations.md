# 00 · Foundations

## 1. Page

- Ground: eggshell `#EBE8DF` on every section except the footer (`spec/20-footer.md`).
- Content: `max-width: 1400px; margin: 0 auto; width: 100%`.
- Horizontal padding of every section: `var(--gutter-lg)` = `clamp(24px, 3.4vw, 48px)`.
- Section vertical padding: `var(--section-y)` = 128px top and bottom, unless the section spec says otherwise.
- Grid: 12 columns, `repeat(12, 1fr)` (or `minmax(0,1fr)`), gaps per section.

## 2. Breakpoints in the source (exact)

| Width | What changes |
| --- | --- |
| ≤ 1300px | Header links fold into *Menu* |
| ≤ 1280px | Archive grid 5 → 4 columns |
| ≤ 900px | What we learned unpins; Cases, Who we are and the legal page go to one column; archive grid 2 columns; archive panel one column |
| ≤ 640px | Header 56px; language switch moves into the open menu |
| ≤ 560px | Archive grid 1 column; archive panel full screen |

Every section's phone and touch behaviour is decided in v3 (7 October 2026) and written in its spec.
At ≤ 900px every 12-column intro grid stacks to one column. On `(hover: none)` nothing is hidden behind hover.

## 3. Colour

Tokens in `tokens/colors.css`. Hex values, rounded from OKLCH:

| Token | Hex | Role |
| --- | --- | --- |
| `--ink-blue` / `--ink` | `#132939` | Body text colour base, headings |
| `--navy` (`--taupe`, `--accent`, `--ring`) | `#1F4C6B` | The one accent: italic accent lines, live states, links on hover, focus ring |
| `--slate` (`--muted-foreground`) | `#446881` | Meta text on light grounds |
| `--steel` | `#6F98B3` | Rules and charts only, **never text** |
| `--ice` | `#B8D0E0` | The main colour as a ground: footer gradient end, archive hover veil |
| `--ice-pale` | `#E7F0F6` | Footer gradient start, Logo Border strip |
| `--eggshell` (`--bone`) | `#EBE8DF` | The field |
| `--cream` | `#F7F5F0` | Header background when scrolled, archive panel, popovers |
| `--sand` | `#C3BCB1` | Hairlines (mixed) |
| `--stone` | `#6E655E` | Quadrant numerals at rest, the services hint, placeholder icons |
| `--brown` | `#88766C` | Names in Who we are |
| `--brown-ink` | ≈ `#484C50` | Roles, phones, e-mails, case refs (oklab mix 45% brown + ink) |
| `--text-body` | ≈ `#43535E` on eggshell | Body prose (ink at 78% alpha) |
| `--border` on `.on-sand` | ≈ `#CFC9BF` | Hairlines on eggshell (sand at 70% alpha) |

**Contrast** (WCAG, measured on the ground named):

| Pair | Ratio |
| --- | --- |
| Ink on eggshell | ≈ 12.3 |
| Navy on eggshell | ≈ 7.5 |
| Slate on eggshell | ≈ 4.9 |
| Body text on eggshell | ≈ 6.9 |
| Stone on eggshell | ≈ 4.9 |
| Brown on eggshell | ≈ 3.6 (headline scale only: names at 30px) |
| Ink on ice | ≈ 9 |
| Navy on ice | ≈ 5.5 |
| Slate on ice | ≈ 3.4: **never used** |
| Ink on archive hover veil (ice 78%) | ≈ 9 |

Use the CSS variables, not the hex values, so `colors.css` stays the single master. `color-mix(in
oklab, …)` is used throughout. Keep it: all target browsers support it.

## 4. Type

Families: `--font-display` (Source Serif 4) and `--font-sans` (Inter). Every headline figure is set in the serif.

| Style (Elementor global name) | Family | Size | Weight | Line height | Tracking | Case | Colour |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Hero | display | `clamp(44px, 6.4vw, 96px)` | 400 | 1.02 | −0.02em | sentence | ink; lines 2–3 italic navy |
| Section heading lg | display | 60px | 400 | 1.05 | −0.01em | sentence | ink; accent line italic navy |
| Section heading md | display | 48px | 400 | 1.05 | −0.01em | sentence | as above |
| Quote | display | 60px | 400 | 1.15 | 0 | sentence | ink; accent italic navy |
| Title 4xl | display | 36px | 400 | 1.05 | −0.01em | | ink |
| Title 3xl | display | 30px | 400 | 1.08–1.1 | 0 | | ink |
| Title 2xl | display | 24px | 400 | 1.15 | 0 | | ink |
| Lead | sans | 18px | 300 | 1.625 | 0 | | body text |
| Body | sans | 16px | 300 | 1.625 | 0 | | body text |
| Small | sans | 14px | 300 | 1.625 | 0 | | body text |
| Nav | sans | 11px | 400 | normal | 0.14em | UPPER | inherit (ink 80%) |
| Caps | sans | 11px | 400 | normal | 0.16em | UPPER | slate or as stated |
| Link caps | sans | 12px | 400 | normal | 0.16em | UPPER | inherit |

Section headings (`SectionHeading` in `reference/source/ds-components.jsx`):
- An `h2` with `margin-top: 24px`.
- Each plain line ends in `<br>`.
- The accent line follows as `<span style="font-style:italic;color:var(--accent)">`.

Line breaks are authored and must be kept exactly as in `content/copy-en-da.md`.

## 5. Rules, corners, surfaces

- **Every corner square** (`border-radius: 0`). The only round element is the radio dot in the archive's order menu.
- **Hairlines:** 1px `var(--border)`. Card grids use `gap:1px` on a `var(--border)` background, so the gap *is* the rule.
- **No box-shadows** anywhere on the site. Inputs carry `--shadow-xs` in the source; drop it in the footer.
- **No gradients** except the footer ground and the skyline mask.

## 6. Focus

Every interactive element gets a visible focus: `outline: 1px solid var(--ring); outline-offset: 2px`
on `:focus-visible`. The browser outline is replaced, never only removed. Quadrants in *Where we engage*
are focusable (`tabindex="0"`), and focus works exactly like hover.

## 7. Selection, scrollbars, misc

- No custom scrollbars and no custom cursor.
- `html{scroll-behavior:auto}`: smooth scrolling is done in JS (`spec/60-links.md`).
- `text-wrap: pretty` on long titles where the source uses it (archive), `balance` on the panel title.

## Current detail (7 October 2026) — governs where the text above differs

- **No outlined boxes anywhere.** Cells, cards, portraits, image placeholders, the archive panel and pop-ups have no border or outline and no 1px-gap grid; space separates them (40–48px between columns, 24px in the archive grid). Hairlines remain only as rules and ledger lines. Form controls keep their edges.
- **Section subtitles sit under the heading**, 24px below it, max-width 34rem, never in a column beside it.
- **Audience:** owner-led and PE-owned companies, start-ups, VC and PE investors, family offices, Nordic and global. Any text you write must suit all of them.
