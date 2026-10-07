# 04 · What we learned

**Purpose.** Four observations from both sides of a transaction, read against one fixed statement.
**Anchor:** `#learned`. **Built as:** custom widget `Capiital · What we learned` (repeater for observations).
**Source:** `LearnedSection`, `usePinnedStage`, `LEARNED_CSS`.

## Ground and padding

Eggshell `on-sand`. Padding top 128px, bottom **64px** (half), sides `var(--gutter-lg)`.

## Layout

12-column grid, gap 64px, `align-items:start`.
- **Left** (`grid-column: span 4`), the pinned column:
  - Section heading **md**: *Having sat on* / italic navy *both sides of the table.*
    (Danish: *Vi har siddet på* / *begge sider af bordet.*)
  - Standfirst `p`: margin-top 32px, margin-bottom 0, max-width 24rem, 16px, 300, line-height 1.625, body text.
- **Right** (`grid-column: 6 / span 7`): the rail of four observations. Each observation:
  1. A hairline: 1px, `var(--border)`, Reveal **draw** (`scaleX 0→1` from the left).
  2. A block with padding `40px 0`, Reveal **settle**:
     - `h3`: serif 30px, line-height 1.1, max-width 24ch
     - `p`: margin-top 20px, max-width 34rem, 16px, 300, line-height 1.625, body text
  - Both reveals use `threshold: 0` and `rootMargin: 0px 0px -10% 0px`.
  - In this section only, durations are **×1.5**: settle 1350ms, draw 1800ms.

## The pinned stage: the second sanctioned motion exception

Active only when `innerWidth > 900` **and** not `prefers-reduced-motion`. Otherwise both columns
scroll normally.

```
section#learned.is-staged
  └ track                       height = stage.offsetHeight + travel        (set in JS)
     └ stage .learned-stage     position: sticky; top: var(--nav-height); padding-top: 48px
        └ grid
           ├ pin (left column)
           └ window .learned-window   height = pin.offsetHeight; overflow: hidden;
                                      mask-image: linear-gradient(to bottom, transparent, #000 24px)
              └ rail .learned-rail    transform: translate3d(0, -s px, 0); will-change: transform
```

- `travel = max(0, rail.offsetHeight − pin.offsetHeight)`.
- On every scroll (one rAF): `s = clamp(navH − track.getBoundingClientRect().top, 0, travel)`.
  `navH` is the computed `--nav-height` in px (64 or 56).
- **Result:**
  - When the section reaches the header it holds.
  - The left column stays fixed while the observations travel up past it **at exactly the reader's scroll speed**.
  - It lets go when the foot of the last observation (*Complexity outgrows its instruments*) is flush
    with the foot of the left column.
  - No empty strip follows the release.
- **The wheel is never intercepted, slowed or sped.** The track is simply as tall as the travel. No
  scroll-jacking library, no `wheel` listeners, no `preventDefault`.
- Re-measure on resize, on a `ResizeObserver` of rail and pin, and on a change of the reduced-motion preference.
- **Editor note:** adding or removing an observation must just work, because the heights are measured,
  never hard-coded.

## Responsive

≤ 900px:
- unpinned
- grid becomes one column
- left column first, then the rail
- reveals as normal

## Reduced motion

Unpinned, and the reveals show instantly.

## Traps

- Several earlier attempts made the right rail scroll on its own, start too early, or end with a gap.
  The rules are: hold at the header, move at 1:1, release flush.
- Do not use Elementor's Sticky or Scrolling motion effects to imitate this. They cannot do it, and the
  house rules forbid them.
- Off on phones: that is a decision, not a missing feature.

## Current detail (7 October 2026) — governs where the text above differs

- While staged, `.learned-stage` has `min-height: calc(100vh − var(--nav-height))` (border-box), so nothing below it is visible until the last observation is flush with the left column.
- While staged, the section's bottom padding is 0 and the quote section's top padding is 0, to shorten the eggshell strip left on release.
- **Pause at the end:** `track height = stage.offsetHeight + travel + dwell`, with `dwell = round(0.35 × innerHeight)`. The rail stops when the last row is flush (`s` is clamped to `travel`); the stage then stays still for the dwell before it lets go.
- **Held once per page load, then a 2×2 grid** (7 October 2026):
  1. When the raw scroll into the track reaches `travel + dwell × 0.5`, add `is-leaving`: the rail fades to opacity 0 over 300ms.
  2. After 320ms, re-form: note the stage's screen top; remove `is-staged`, the inline track and window heights and the rail transform; add `is-grid` and `is-flushing`; then `scrollTo(scrollY + (newTop − oldTop), behavior:"instant")` so the stage stays exactly where it stood. Fire one `scroll` event for the header.
  3. The grid: the right column becomes `grid-template-columns: repeat(2, minmax(0,1fr)); column-gap: 40px`. Each observation keeps its top hairline (a rule, not a box); title 24px/1.15; padding 24px 0 40px.
  4. The flush: each observation settles in (`opacity 0 → 1`, `translateY(14px) → none`, 900ms rise), staggered 90ms, in order I–IV. Once only.
  - From then on: no hold, no re-staging on resize. ≤ 900px the grid is one column. A reload starts again.
  - Arriving below the section: the grid at once, without the flush.
  - Phones and reduced motion are never staged and keep the plain list.
