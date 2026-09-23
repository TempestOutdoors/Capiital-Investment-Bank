# Brief for Claude Code — v3 changes since the first handoff

Read `CLAUDE.md` first; it governs. Then `ui_kits/website-dev/copy-register.md` before writing any
copy, and `project-log.md` for the reasoning and the traps. This page lists only what changed
since the first handoff, newest first, and what each change obliges.

**Sources of truth.**
- `tokens/` is the only source of colour, type, spacing and motion. Add a token rather than an
  inline value.
- `components/` holds the shared building blocks.
- `ui_kits/website-dev/sections.jsx` is the reference for layout and copy. It is also the **only**
  source for the Solomon knot, the wash flush and the cases grid, which live there rather than in
  `components/`.
- `CAPIITAL Website v3.html` is the whole site as one file: open it to see the intended result.

---

## 1. The Solomon knot in section 02

It replaces the red *Placeholder* label at the centre of the four service titles.

- **Component:** `SolomonKnot`, with the `KNOT` data, in `sections.jsx`. It is drawn in SVG on a
  100 × 100 grid: four strands, stroke 7.6, mitred corners, square ends.
- **Draw:** it draws **once, on its own clock**, when half the knot is in view, then holds. Scroll
  speed and direction play no part, and it never un-draws.
  - Two loops; the second, lying loop starts 220ms after the first.
  - Each strand takes 1.9s, 2.12s in total.
  - Easing `cubic-bezier(.15,.12,.85,.88)`.
- **Crossings:** each of the four crossings is *ploughed*. A ground-coloured blade (stroke 12.4),
  then the over-strand on top of it, dash-draws along the over-strand in its direction of travel,
  timed to the moment that strand arrives. Do not replace this with casings switched on at the
  centre of the crossing. That was tried and read as a flicker.
- **The blade is `--bone`,** section 02's ground. If 02 changes ground, the blade must follow, or
  the crossings show as stripes.
- **No frame:** the 1px frame around the cell was removed. The grid cell and its 22rem minimum
  height stay, so nothing around it moves.
- **Reduced motion:** where the visitor's system asks for less motion, the knot is complete at once.
- **Still open:** the mark itself. Solomon is placed provisionally. Six candidates are on
  `guidelines/mark-gordian.html`, and Skew is recommended. Keep the knot swappable: the drawing
  logic is generic, and only the `KNOT` data is Solomon's.
- **Declined, do not reintroduce:** a scroll-linked draw that follows the scrollbar or reverses on
  scrolling up. It breaks *fires once, never reverses*.

## 2. Front page

- **Spacing:** full screen height, headline block centred, `space-20` below it. **This is final.**
  Three spacing experiments were tried and reverted, and the user reports this version presents
  correctly in Elementor. Do not reintroduce a shortened hero, a fixed top offset, or a foot index.
- **The wash arrives.** This is the front page's single sanctioned entry.
  - A veil of `--sea-ink`, 470 × 200vmax, rotated 50° onto the gradient's own 140° axis, slides
    from `translateX(-128vmax)` to `155vmax` over 1.7s with `cubic-bezier(.15,.12,.85,.88)`.
  - Lengths along the veil's axis: clear 0–160vmax, soft falloff 160–256, solid 256–470.
  - It moves by `transform` alone. Never animate the gradient's stops or its background position:
    that repaints the largest surface on the site every frame.
  - **Trap:** a hero spans at most ±75vmax along that axis. It must sit wholly in the solid at the
    first frame and wholly in the clear at the last. Sizing the veil in percent, or shortening its
    solid, lets a hard diagonal edge show. Verified at seven aspect ratios, from 390 × 844 to
    2560 × 1080.
  - Where the visitor's system asks for less motion, the veil is absent and the finished wash
    shows at once.
- **The type** rises 0.3 / 0.45 / 0.6s after load (headline, standfirst, links), overlapping the
  flush.
- **Contact ground:** it uses the same gradient, **still**. The flush is not reused anywhere else.

## 3. Colour: hue 224

Chosen by the client's principal, step 02 of `guidelines/wash-blue-steps.html`. It was applied at
the source in `tokens/colors.css`: all seven chromatic tokens rotated +22°.

| Token | Hue |
| --- | --- |
| `--sea-ink` | 227 |
| `--sea-deep` | 225 |
| `--sea` | 224 |
| `--sea-light` | 224 |
| `--mist` | 224 |
| `--haze` | 224 |

Lightness and chroma are unchanged. The anchor now stands 34° from the artwork's `#5A8281`.

- Never hard-code a hex for these colours: use the tokens.
- **Trap:** `getComputedStyle` returns `oklch()` unchanged. Convert to hex through a canvas, never
  by parsing its digits.

## 4. Section 05 — Cases

- **Layout:** three equal cells in a `gap:1px` ruled grid (the gap is the border), titles only:
  *Case 0N* and the sector.
- **Hover:** the account veils in on hover only and out on leave. Its space is always held, so
  nothing moves. There is no tap or focus trigger, at the user's instruction; accepted: on touch
  screens the accounts cannot be reached.
- **Equal sizes:** all three cells are the same size at every width. Below 900px they stack, with
  `grid-auto-rows:1fr`.
- **Copy:** one paragraph per case. The situation, then *the usual course would have been…*, then
  the other reading we took. The fix carries the weight.
  - All three are **invented placeholders and unmarked on the page**. They are tracked on the hub.
  - No figures: an outcome multiple must never be invented.
  - The intro still promises *told without names, sums or dates*; revisit it when real outcomes
    arrive.

## 5. Section 07 — Notes from the desk

The four titles read in their original wording. They are placeholders, unmarked on the page.

## 6. Section 03 — What we believe

The sequence block (*The sequence of the work does not vary*: Diagnose · Architect · Operate ·
Empower) is **parked**. The `movements` array stays in `sections.jsx`, unused. To restore it, render
it after the tenets in `PhilosophySection` as the four-row ledger v1 uses.

## 7. Generations

- **v2 is retired.** `ui_kits/website/` was deleted, and `CAPIITAL Website.html` is the frozen
  record. v1 (`ui_kits/website-original/`) is never edited. All work lands in v3
  (`ui_kits/website-dev/`).
- The corner version switch now offers v1 and v3 only.

---

## Still open

- **For the house to choose:** the knot mark (and its severed variant).
- **From the firm:**
  - vector wordmark;
  - licensed serif and sans (Source Serif 4 and Inter stand in);
  - photography;
  - real transactions, addresses and team details.
- **Content:**
  - a dated transaction record;
  - separate entries for owners and for sponsors;
  - sector pages;
  - the legal suite;
  - the three real cases;
  - the four real note titles.

## Working rules that bind code, not only copy

- **Motion arrives; it does not perform.** Each gesture fires once and never reverses. No
  parallax, spring, bounce, scroll-jacking, hover-scaling or lifts.
- **Hairlines, not boxes:** square corners, no shadow doing a border's work.
- **Colour:** one accent at a time, never more than two grounds on screen.
- **Keep the code minimal.** Reuse tokens and components, and add nothing that was not asked for.
