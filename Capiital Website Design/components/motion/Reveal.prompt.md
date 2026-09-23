# Reveal / RuleDraw

Scroll-entry motion. Wrap anything that should arrive as it is reached.

- `variant="settle"` — 14px up + fade. Headings, rows, cards, figures.
- `variant="veil"` — opacity only. Long-form prose; the quietest option and the correct one for reading matter.
- `variant="draw"` — a 1px rule growing from its left edge. Use `RuleDraw` rather than a plain border wherever a rule should arrive with its content.
- `step={n}` stages a group: 0, 1, 2, 3 — never more than ~6 in one run, or the last item arrives late.

Rules of use: fire once, never reverse; no parallax, no scale, no spring. Front page and section 01 are deliberately untouched by these — the hero has its own `rise` entry and section 01 has the sticky-column read.

```jsx
<Reveal step={1}><h3>Diagnose</h3></Reveal>
<RuleDraw tone="dark" />
```
