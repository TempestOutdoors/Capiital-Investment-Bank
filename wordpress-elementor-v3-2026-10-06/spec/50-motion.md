# 50 · Motion

**Motion arrives; it does not perform.** This file is the complete vocabulary. Anything not listed is not
allowed: no parallax, spring, bounce, scroll-jacking, hover-scaling, lifts, marquees, cascades longer than
about six beats, and no element animated twice. Every gesture fires once and never reverses, except the
header's state, which follows the scroll by design. Elementor's Motion Effects stay empty on every widget.

## Tokens (`tokens/motion.css`)

| Token | Value |
| --- | --- |
| `--ease-rise` | `cubic-bezier(0.2, 0.7, 0.2, 1)` |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--ease-flush` | `cubic-bezier(0.15, 0.12, 0.85, 0.88)` |
| `--duration-fast` | 200ms (colour changes) |
| `--duration-nav` | 500ms (header, live states, connectors) |
| `--duration-rise` | 1.1s |
| `--duration-settle` | 900ms |
| `--duration-draw` | 1200ms |
| `--duration-flush` | 1.7s |
| `--flush-lead` | 0.3s |
| `--stagger` | 0.15s (hero) |
| `--stagger-row` | 90ms (reveal steps) |
| `--duration-knot` | 1900ms per strand |
| `--knot-lag` | 220ms between strands |

## The gestures

1. **rise** (hero only): `from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none}`, 1.1s rise,
   `both`. The h1 is delayed 0.3s, the standfirst 0.45s.
2. **settle** (headings, rows, cells): starts at `opacity:0; transform:translateY(14px)` and transitions to
   `opacity:1; transform:none` over 900ms rise.
3. **veil** (prose): starts at `opacity:0` and transitions to `opacity:1` over 900ms standard.
4. **draw** (hairlines): starts at `transform:scaleX(0); transform-origin:left` and transitions to `scaleX(1)` over 1200ms rise.
5. **the wash arriving** (hero band only): `spec/02-front-page.md`.
6. **the held row** (*Where we engage* only): stages arrive left to right while the section holds (`spec/03`).
7. **read progress**: a 1px navy line, width = scroll fraction, 120ms linear.
7b. **the re-forming of *What we learned*** into a 2×2 grid at the end of its first pass: the rail veils out (300ms), the grid settles in (900ms, 90ms stagger). Once per page load (`spec/04`).
8. **The sticky exceptions:** the legal index (CSS sticky), the pinned stage in *What we learned* (`spec/04`) and the held row in *Where we engage* (`spec/03`).

## The reveal mechanism (port `Reveal` from `ds-components.jsx`)

- An element carries `data-reveal="settle|veil|draw"`. One `IntersectionObserver` per element, with
  defaults `threshold: 0.2` and `rootMargin: "0px 0px -12% 0px"` (*What we learned* uses `0` and
  `-10%`; RuleDraw uses `0.05`).
- On intersecting, add the class `is-in` and **unobserve**. It never reverses.
- Stagger: `transition-delay: calc(step × 90ms)`.
- If IntersectionObserver is missing, add `is-in` immediately.
- **In Elementor:** the plugin adds a *Reveal* control (none / settle / veil / draw, plus a step 0–5) to
  every widget's Advanced tab, and the shared JS applies it. The firm can then keep the reveals on
  content they add, without using Elementor's own entrance animations.
- Content must never be invisible when JS fails. Add the `opacity:0` start state only under
  `html.js` (set by an inline script in `<head>`).

## Hover and focus

Colour only, 200ms standard: links and titles turn navy, ledger rows wash to white, archive cards show
their veil. Nothing scales, lifts or moves, except the services line's 8px settle, which is part of its reveal.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce){
  .animate-rise{animation:none}
  [data-reveal]{opacity:1!important;transform:none!important;transition:none!important}
  .front-veil{display:none}
}
```

Also under reduced motion:
- *What we learned* unpins.
- The knot is drawn complete.
- Smooth scrolling becomes an instant jump.
- The archive veil and hover fades are instant.
