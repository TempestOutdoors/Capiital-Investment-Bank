# 03 · Where we engage

**Purpose.** Names the four stages of an ownership at which the firm advises, and what each involves.
**Anchor:** `#services`, in the nav and the footer. **Built as:** custom widget `Capiital · Where we engage`.
**Source:** `ServicesSection`, `useEngageStage`, `SVC_CSS`, `quadrants` in `reference/source/sections.jsx`.
Rebuilt 7 October 2026 at the firm's instruction. The quadrant figure and the Solomon knot are retired
from this section (the knot is parked for later use elsewhere; do not build it).

## Ground and padding

Eggshell `on-sand`, padding `128px var(--gutter-lg)`.

## Head

The section heading **md** alone, margin-bottom 48px, Reveal `settle`:
*Each part of the process* / italic navy *held to one standard.*
(Danish *Hver del af processen* / *efter samme standard.*)
No hint text. (*Rest on one for more* was removed.)

## The row

- `display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 48px 40px`. **No background, no
  border, no 1px-gap grid**: space alone separates the stages.
- Two columns at ≤ 1100px, one at ≤ 900px (row-gap 48px).
- Each **stage**: flex column, no padding, no min-height, `tabindex="0"` once arrived (`-1` before),
  focus outline `1px solid var(--ring)`, offset −1px. Top to bottom:
  1. **Numeral:** serif 24px, line-height 1, stone at rest, navy when live (500ms standard). **Visible
     from the start**, so the row reads as a sequence waiting.
  2. **The arriving block** (`.svc-in`): opacity 0 and `translateY(14px)` until the stage has arrived;
     then opacity 1 and none (900ms standard / rise). It holds:
     - **`h3` title:** margin-top 20px, serif 30px, 400, line-height 1.08, tracking −0.01em, ink; navy when live.
     - **Image placeholder:** margin-top 24px, aspect 3 / 2,
       background `color-mix(in oklab, var(--sand) 28%, var(--eggshell))`, the camera icon 22px stroke
       1.25 in stone, centred, **no border**, `role="img"` *Photograph to follow* / *Fotografi følger*.
       A per-stage image field in the widget; when set, the photo replaces the box at 3:2, `object-fit: cover`.
     - **Line `p`:** margin-top 20px, 16px, 300, line-height 1.625, body text. Opacity 0 and
       `translateY(8px)` at rest; opacity 1 and none when live (900ms).
- **Live logic (hover):** `mouseenter` (only once the stage has arrived) or `focus` makes a stage live;
  `blur` clears it; `mouseleave` on the **row** clears it. While one is live the other three go to
  opacity **0.42** (500ms standard). Emphasis by withdrawal; nothing grows or moves.
- **Touch and ≤ 900px:** lines visible at rest, no dimming (`@media (max-width:900px),(hover:none)`).

## Copy (verbatim; Danish in `content/copy-en-da.md`)

Erik's four stages, in chronological order, each with a one-sentence summary of his longer text:

| | English | Danish |
| --- | --- | --- |
| I | Before a transaction | Før en transaktion |
| II | After a transaction | Efter en transaktion |
| III | During ownership | Under ejerskabet |
| IV | Before exit | Før exit |

The four names are a fixed fact, repeated in the footer's *Where we engage* column and the archive's
*Stage* taxonomy. Change all three together.

## The held row: the third sanctioned motion exception

Active only when `innerWidth > 900`, **and** not reduced motion, **and** the stage plus the header fit the
screen (`stage.offsetHeight + navH ≤ innerHeight`; with the images, from roughly 760px tall). Otherwise all
four simply arrive together (Reveal settle) and nothing is held.

```
div.svc-track.is-staged        height = stage.offsetHeight + travel     (set in JS)
  └ div.svc-stage              position: sticky; top: var(--nav-height); padding-top: 48px
```

- `travel = round(innerHeight × 0.9)`.
- On scroll (one rAF): when the track's top reaches the header, `shown = min(4, floor(min(1, (navH − top) / travel) × 4) + 1)`.
  The stages arrive **left to right, one each quarter of the way**, and stay. `shown` only ever rises.
- **The wheel is never intercepted.** The track is simply taller than the stage.
- **Held once per page load.** When all four have arrived, the hold is given up for the rest of the visit,
  **with no visible shift**: wait until the section is out of view, then remove `is-staged` and the inline
  height; if the section is above the reader, `scrollTo(scrollY − removedHeight, behavior:"instant")` in the
  same frame. Fire one `scroll` event so the header's live link updates.
- Arriving below the section (anchor, reload): all four shown and the hold given up at once.
- **Counting only real passes:** stages shown because the hold is off (narrow, short, reduced motion) do not
  count as arrived. A page that grows into the hold a moment after load (e.g. a presenting tab) still holds.
- Re-measure on resize, on a reduced-motion change and on a `ResizeObserver` of the stage.
- Do not use Elementor's Sticky or Scrolling effects to imitate this.

## Reduced motion

Never held; the stages, lines and dimming change instantly.

## Traps

- No outlines, no ruled grid, no hint text, no knot: all four were explicitly removed.
- The image box sits **below the title**, not above it.
- The hold must not return when the reader scrolls back up.
