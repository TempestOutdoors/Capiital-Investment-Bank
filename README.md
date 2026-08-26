# CAP=TAL — Investment Bank

A one-page site for CAP=TAL, an independent advisory firm: navy hero, client
marquee, advisory grid, tombstone ledger, insights, offices and navy footer.

Built from the supplied design as a static site — no build step, no
dependencies. Open `index.html`, or serve the folder:

```sh
python3 -m http.server 8000
```

## Structure

```
index.html              markup and copy for all six sections
assets/css/tokens.css   design tokens — palette, type, space, motion
assets/css/styles.css   base styles, components, responsive rules
assets/js/main.js       mobile nav toggle (the only script on the page)
assets/favicon.svg      the "=" mark on the ink ground
```

## Design notes

The values in `tokens.css` come verbatim from the design and are not
approximations to be tidied up:

- **Palette is oklch.** Ink navy, warm taupe, cream and bone. `--taupe-soft` is
  the accent on dark grounds; `--taupe` is the accent on light ones.
- **`.on-ink` is a scope, not a colour.** Dark sections set the class and every
  token inside — `--background`, `--foreground`, `--border`, `--accent` —
  re-points at its inverse value. That is why the same component markup reads
  correctly on both grounds.
- **Every radius token is `0`.** The brand is square; `--radius-pill` exists for
  switch and radio dots only.
- **Structure comes from hairlines, not shadows.** The card grids use
  `gap: 1px` over a tinted background: the gap *is* the rule. Shadow tokens are
  defined but deliberately near-flat.
- **Wide uppercase letterspacing is the signature.** Tracking runs from `0.2em`
  on meta text to `0.32em` on eyebrows.
- **The wordmark is set in type, not drawn.** `CAP=TAL` is Inter 400 at `0.22em`
  tracking with the `=` rendered as two rules `0.09em` thick.

Both faces — Cormorant Garamond and Inter — load from Google Fonts, matching the
design source, with local serif and system-ui fallbacks.

## Responsive

The design is drawn at desktop and is reproduced exactly there. Below 1100px the
12-column editorial grids collapse to one column, below 860px the nav becomes a
toggle sheet and the transaction ledger stacks into records. Type scales, rules
and tints are unchanged at every width.

Verified free of horizontal overflow from 320px to 1920px.
