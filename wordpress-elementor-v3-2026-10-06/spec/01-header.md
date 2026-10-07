# 01 · Header

**Purpose.** Shows where the reader is, takes them to any section, and switches language.
**Built as:** custom widget `Capiital · Header` in a Theme Builder header template, shown on all pages.
**Source:** `SiteHeader`, `HEADER_CSS`, `LangSwitch`, `useReadingLine` in `reference/source/sections.jsx`.

## Bar

- `position: fixed; top: 0; left: 0; right: 0; z-index: 50`.
- Height `var(--nav-height)`: **64px**, or **56px** at ≤ 640px.
- Inner row: max-width 1400, centred, padding `0 var(--gutter-lg)`, flex, `align-items:center`,
  `justify-content:space-between`, gap 40px.
- **At the top of the page** (`scrollY ≤ 40`):
  - background transparent
  - border-bottom `1px solid transparent`
  - no blur
- **Scrolled** (`scrollY > 40`):
  - background `color-mix(in oklab, var(--cream) 95%, transparent)`
  - `backdrop-filter: blur(12px)`
  - border-bottom `1px solid var(--border)`
- Transition: `all 500ms cubic-bezier(0.4, 0, 0.2, 1)`. Text colour stays ink in both states.

## The Logo Border (left)

A link to the front page's top (`/#top`; on `/da/`, `/da/#top`), `aria-label="Capiital"`. Built in layers so
it melts rather than swaps:

- **Box:**
  - `position:relative; display:block; align-self:flex-start; flex-shrink:0`
  - `height: calc(var(--nav-height) + 1px)` (1px taller than the bar so it covers the bar's bottom hairline)
  - `aspect-ratio: 1060 / 200`
  - `margin-left: calc(var(--logo-border-h) * -0.42)`
- **Strip:**
  - `position:absolute; top:0; bottom:0; right: calc(100% - 1px); width:100vw; background: var(--ice-pale)`
  - Runs from the shape to the screen's left edge.
  - Opacity 0 at top, 1 when scrolled.
- **Shape:**
  - `position:absolute; inset:0; background: url(logo-border-shape-ice.png) 0 0 / 100% 100% no-repeat`
  - Opacity 0 at top, 1 when scrolled.
- **Mark:**
  - `position:absolute; left:7.925%; top:32%; width:75.943%; height:36%; background-color: var(--navy)`
  - Masked: `mask-image:url(logo-rgb-white.png); mask-size:100% 100%; mask-repeat:no-repeat` (with the `-webkit-` prefixes)
  - **Always navy, never moves, never fades.** At the top it stands alone on eggshell; when scrolled the ice shape arrives behind it.
- Fades use `opacity 500ms cubic-bezier(0.4,0,0.2,1)`, on the same trigger as the bar.
- This is a header state, not an entry animation. It reverses when the reader scrolls back to the top, and that is intended.

## Section links (≥ 1301px)

- `nav.site-nav`: flex, gap `clamp(12px, 1.7vw, 32px)`, 11px, uppercase, tracking 0.14em, `white-space:nowrap`,
  colour `color-mix(in oklab, currentColor 80%, transparent)`.
- Six links, from a WP menu location `primary` (labels translated by WPML), in this order:

  | English | Danish | Anchor |
  | --- | --- | --- |
  | Where we engage | Hvor vi rådgiver | `#services` |
  | What we learned | Hvad vi har lært | `#learned` |
  | Cases | Cases | `#cases` |
  | Who we are | Hvem vi er | `#people` |
  | What we think | Hvad vi mener | `#papers` |
  | How to reach us | Kontakt | `#contact` |

- On the archive and legal pages the hrefs point to the front page plus the anchor
  (e.g. `/#learned` or `/da/#learned`).
- **Live state:**
  - colour navy
  - a 1px `currentColor` line under the link (`bottom:0`, `padding-bottom:4px`), `transform: scaleX(0→1)` from the left
  - transition `500ms cubic-bezier(0.2,0.7,0.2,1)`
  - colour transition 200ms
- **Which link is live:** on every scroll, inside one `requestAnimationFrame`, the live section is the
  last of the six whose top is at or above `0.34 × viewport height`. If the page is scrolled to the
  bottom (`innerHeight + scrollY ≥ scrollHeight − 2`), the last section (`contact`) is live. None is live
  above the first section. Recheck on resize. Do not use IntersectionObserver for this: it misses short
  sections (*What we think*) and was replaced for that reason.

## Right cluster

- Flex, gap 24px, `flex-shrink:0`.
- **Language switch** `EN · DA`, class `lang-in-bar`:
  - `role="group"`, `aria-label` *Language* / *Sprog*
  - 11px, uppercase, tracking 0.14em, gap 8px
  - The `·` is at opacity 0.5 and `aria-hidden`.
  - Each code is a link to that language's version of the current page (WPML URL). Mark it
    `aria-current="true"` and `lang` (`en` / `da`).
  - Current language: navy, 1px solid bottom border in currentColor, padding `4px 0 3px`, cursor default.
  - Other language: inherits, transparent border, colour transition 200ms.
  - **On switching, return the reader to the same section:** carry the current hash, or the section in
    view, to the other language's URL.
- **Menu button**, shown ≤ 1300px:
  - `display:inline-flex`, gap 8px, 11px uppercase, tracking 0.14em, no background or border
  - Text *Menu* / *Close* (Danish *Menu* / *Luk*), followed by a 16px Lucide `menu` / `x` icon
  - `aria-expanded`, `aria-controls="site-menu"`

## Folded menu (≤ 1300px)

- The six links are hidden in the bar.
- When open, `#site-menu` is a grid positioned `absolute; left:0; right:0; top:100%`, background eggshell,
  border-bottom `1px solid var(--border)`, padding `8px var(--gutter-lg) 24px`.
- Each link: padding 16px 0, border-bottom `1px solid var(--border)`, 14px, uppercase, tracking 0.14em. The live one is navy.
- Clicking a link closes the menu.
- **At ≤ 640px:** the bar's language switch is hidden, and an identical one (`lang-in-menu`) sits at the
  foot of the open menu, padding-top 20px. Above 640px the in-menu copy is `display:none`. Never show both.
- Escape closes the menu and returns focus to the button. Trap nothing; the menu is not modal.

## Read-progress rule

- A 1px line at the very top of the header: `position:absolute; top:0; left:0; right:0; height:1px`.
- Inner bar width `scrollY / (scrollHeight − innerHeight) × 100%`, background navy, `transition: width 120ms linear`.
- `aria-hidden`.

## Responsive

As above: 1300px for the fold, 640px for the 56px height and the language switch position. The Logo Border
scales with the height automatically: about 345px wide at 64px, about 300px at 56px.

## Traps (from the project log)

- The Logo Border must fill the full bar height plus 1px. Earlier builds left a gap under it.
- A single mark that stays navy is correct. An earlier build swapped a navy mark for a white one, and
  they never lined up.
- The fold width moved from 1160 to 1300px when the language switch was added. Below 1300px the six
  links, the switch and the border do not fit together.
- Do not use Elementor's sticky header effect: the header is plain `position: fixed`.

## Changed 7 October 2026

- The language switch reads **EN · DK**. Only the visible label changes: the language code stays `da` everywhere (`<html lang="da">`, the `lang` attribute on the link, hreflang, WPML, URLs under `/da/`). WPML shows `DA` by default, so set the label by hand in the header widget.
