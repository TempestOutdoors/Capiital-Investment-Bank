# 02 · Front page (hero)

**Purpose.** Says who the firm is in one line and one sentence.
**Anchor:** `#top` (not in the nav). **Built as:** custom widget `Capiital · Front page`.
**Source:** `FrontPage`, `FLUSH_CSS`.

## Ground

Eggshell, class `on-sand`. The skyline band sits at the top. The header is transparent over it until the reader scrolls.

## Layout

1. **Skyline band** `.front-sky`:
   - `position:relative; overflow:hidden; background-color: var(--eggshell)`
   - `height: clamp(15rem, 38vh, 26.25rem)` (240–420px; lowered 7 October 2026 so the headline and the standfirst share the first screen from about 1280×800)
   - `aria-hidden`
   - Full bleed: no max-width, no gutter.
2. **Text block** below the band:
   - padding `24px var(--gutter-lg) 80px`
   - inner max-width 1400 centred, left-aligned, nothing centred

## Skyline band

- Band height `clamp(15rem, 38vh, 26.25rem)` (240–420px), lowered 7 October 2026 so the headline and standfirst fit beneath it.
- `.front-sky-img`:
  - `position:absolute; inset:0`
  - `background: url(hero-skyline.jpg) center 35% / cover`
  - `mask-image: linear-gradient(to bottom, #000 70%, transparent 97%)` (with `-webkit-`)
  - The image dissolves into the eggshell along a **straight horizontal edge**. No slope, no slanted
    tab, no ragged edge: all three were explicitly rejected.
- `.front-veil`: the wash arriving, the one entry gesture of the hero. Exact CSS:

```css
.front-veil{position:absolute;left:50%;top:50%;width:470vmax;height:200vmax;margin-left:-235vmax;margin-top:-100vmax;
  pointer-events:none;background:linear-gradient(to right, transparent 0 160vmax, var(--eggshell) 256vmax, var(--eggshell) 100%);
  transform:rotate(50deg) translateX(155vmax);animation:front-flush 1.7s cubic-bezier(0.15,0.12,0.85,0.88) both}
@keyframes front-flush{from{transform:rotate(50deg) translateX(-128vmax)}to{transform:rotate(50deg) translateX(155vmax)}}
@media (prefers-reduced-motion:reduce){.front-veil{display:none}}
```

  The veil starts covering the band in eggshell and slides off along the diagonal, so the skyline
  appears from the top-left. **No travelling edge may ever be visible**: the band is smaller than the
  veil, so only a brightening corner is seen. Fires once on page load. Moves by `transform` only.
  Never reuse it elsewhere.

## Elements

1. **`h1`**: Hero style (`spec/00` §4), margin 0, ink.
   - Class `animate-rise`: `rise` keyframes, 24px up plus fade, 1.1s `cubic-bezier(0.2,0.7,0.2,1)`, `both`, delay **0.3s**.
   - Three authored lines; lines 2 and 3 in one `<span>` italic navy:
     ```
     Nordic M&A advisory
     for companies
     meant to endure.
     ```
     Danish: `Nordisk M&A-rådgivning` / `for virksomheder` / `bygget til at vare.`
2. **Standfirst `p`**:
   - margin-top 40px, max-width 42rem (672px)
   - 18px, Inter 300, line-height 1.625, body text
   - `animate-rise`, delay **0.45s** (0.3s + 0.15s)
   - Copy: *We advise Nordic companies and their investors, at home or abroad, on one principle: whoever accepts the mandate sees it to its end.*
   - Danish in `content/copy-en-da.md`.

No buttons and no links in the hero. Both were removed on purpose.

## Editor fields

Line 1, line 2, line 3 (italic), standfirst, all translatable. Store the line breaks as separate fields
so editors cannot merge the lines.

## Responsive

Fluid by the clamps. At 390px the h1 is 44px. Check that *Nordisk M&A-rådgivning* fits on one line at
390px; if it doesn't, it may wrap, but never hyphenate.

## Reduced motion

No veil, and the text appears without rising (`.animate-rise{animation:none}`).

## Traps

- The image file is 1400×268 and shown up to 608px tall, so it's upscaled. That is acceptable only
  because it is blurred. Do not sharpen it, and do not replace it with a sharper skyline without the
  firm's say.
- The h1 has never had an accent on line 1. Only lines 2 and 3 are italic navy.
