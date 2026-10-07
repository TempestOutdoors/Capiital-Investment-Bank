# Elementor, set up once

Click through this before building anything. Every value is from the design folder —
`elementor.md` §3 and `spec/00-foundations.md` — and several of them are the difference
between the design working and the design nearly working.

Menu wording shifts a little between Elementor versions; the settings themselves are stable.

## 1 · Elementor → Settings

**General**

| Setting | Value | Why |
| --- | --- | --- |
| Disable Default Colours | **on** | Elementor's own palette would otherwise sit under the tokens |
| Disable Default Fonts | **on** | the two faces come from the theme, and nothing else may |

**Features**

| | |
| --- | --- |
| Flexbox Container | **on** |
| Grid Container | **on** |
| Optimised DOM Output | **on** |
| Inline Font Icons | **on** |

**Advanced**

| | |
| --- | --- |
| Google Fonts | **Disable** |
| Load Font Awesome 4 Support | **off** |

Google Fonts off is the one that matters most. The legal page states as a fact that no third
party is contacted when a page loads, and `checklist.md` tests it. The child theme refuses
those requests as well, but a setting that is right is better than a guard that has to fire.

## 2 · Site Settings → Global Colours

Delete Elementor's defaults and create these thirteen, named exactly. Naming matters: an
editor picking "Navy" should get the accent, not a blue they liked the look of.

| Name | Hex | What it is |
| --- | --- | --- |
| Ink | `#132939` | body text and headings |
| Navy | `#1F4C6B` | **the one accent** — italic accent lines, live states, links on hover, focus |
| Slate | `#446881` | meta text on light grounds |
| Steel | `#6F98B3` | rules and charts only — **never text** |
| Ice | `#B8D0E0` | the main colour as a ground |
| Ice pale | `#E7F0F6` | the footer gradient's start, the Logo Border's strip |
| Eggshell | `#EBE8DF` | the field |
| Cream | `#F7F5F0` | the header when scrolled, the archive panel, pop-ups |
| Sand | `#C3BCB1` | hairlines, mixed |
| Stone | `#6E655E` | stage numerals at rest, placeholder icons |
| Brown | `#88766C` | names in Who we are |
| Body text | `#43535E` | prose — ink at 78% on eggshell, flattened |
| Rule | `#CFC9BF` | hairlines on eggshell — sand at 70%, flattened |

Two of them are traps worth repeating: **steel is never text** (2.5:1), and **slate is never
used on the footer's ice** (3.4:1). Everything else in the design has been measured and
passes; those two fail.

## 3 · Site Settings → Global Fonts

Both faces are already in the theme at `assets/fonts/`. Add them under **Elementor → Custom
Fonts** (Pro) by uploading the woff2 files, then build these styles. Sizes are px; the two
families are Source Serif 4 (display) and Inter (sans).

| Name | Family | Size | Weight | Line height | Tracking | Case |
| --- | --- | --- | --- | --- | --- | --- |
| Hero | display | `clamp(44px, 6.4vw, 96px)` | 400 | 1.02 | −0.02em | sentence |
| Section heading lg | display | 60 | 400 | 1.05 | −0.01em | sentence |
| Section heading md | display | 48 | 400 | 1.05 | −0.01em | sentence |
| Quote | display | 60 | 400 | 1.15 | 0 | sentence |
| Title 4xl | display | 36 | 400 | 1.05 | −0.01em | |
| Title 3xl | display | 30 | 400 | 1.08 | 0 | |
| Title 2xl | display | 24 | 400 | 1.15 | 0 | |
| Lead | sans | 18 | 300 | 1.625 | 0 | |
| Body | sans | 16 | 300 | 1.625 | 0 | |
| Small | sans | 14 | 300 | 1.625 | 0 | |
| Nav | sans | 11 | 400 | normal | 0.14em | UPPER |
| Caps | sans | 11 | 400 | normal | 0.16em | UPPER |
| Link caps | sans | 12 | 400 | normal | 0.16em | UPPER |

Every headline figure is set in the serif. That is a brand rule, not a preference.

## 4 · Site Settings → Layout

| | |
| --- | --- |
| Content width | **1400** |
| Container padding | **0** |
| Widgets space (default gap) | **0** |

The gutter is applied per section as `clamp(24px, 3.4vw, 48px)` by the theme. Any padding
Elementor adds on top of that shows as a band of page ground above the hero, through the
transparent header.

## 5 · Site Settings → Theme Style

- Buttons and Form Fields: **border-radius 0**, no box-shadow.
- Every corner on this site is square, and the only round element is the radio dot in the
  archive's order menu.

## 6 · Breakpoints

| | |
| --- | --- |
| Mobile | ≤ 640 |
| Mobile Extra | ≤ 900 |
| Tablet | ≤ 1300 |
| Laptop, Widescreen | **off** |

The custom widgets keep their own exact media queries — 560, 640, 900, 1280, 1300 — because
the design's breakpoints are where its layout changes, not where Elementor's defaults fall.

## 7 · Motion, on every widget, always

**Leave Motion Effects, Entrance Animation, Hover Animation, parallax, sticky and mouse
effects empty. All of them.** The site's own motion lives in the theme and the plugin, where
it fires once and never reverses; Elementor's performs, which the register rules out, and the
two would fight.

Where the firm wants the house motion on something it has added, the plugin puts a **Reveal**
control on every widget's Advanced tab: settle, veil or draw, with a step for staggering a
row. That is the sanctioned way, and the only one.

Two places where Elementor's own effects would look like the answer and are not:

- **The header** is plain `position: fixed`. Not Elementor's sticky header.
- **Where we engage** and **What we learned** hold the page while their contents arrive. Not
  Elementor's Sticky or Scrolling effects, which cannot do it.

## 8 · Role Manager

If a second editor is added, give them **content-only** access. They can then change text and
pictures and cannot restyle a page away from the rest of the site.

## 9 · One thing outside Elementor

**WP Rocket:** Remove Unused CSS **off**, Delay JavaScript Execution **off**. Nearly every
state in this design is applied by JavaScript at runtime — `.is-in`, `.is-live`, `.is-here`,
`.is-staged`, `.is-grid` — so RUCSS deletes the rules as unused, and delaying the script
leaves the two held sections measuring the wrong thing. Page caching, GZIP and image
lazy-loading are all fine and worth keeping.
