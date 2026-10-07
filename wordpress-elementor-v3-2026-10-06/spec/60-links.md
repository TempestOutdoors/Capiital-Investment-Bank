# 60 · Links and anchors

## Anchors (same in both languages)

| id | Section |
| --- | --- |
| `top` | Front page hero |
| `services` | Where we engage |
| `learned` | What we learned |
| `cases` | Cases |
| `people` | Who we are |
| `papers` | What we think |
| `contact` | Footer, *How to reach us* |
| `legal-notice`, `privacy`, `cookies`, `regulatory` | Legal page parts |
| `{publication-slug}` | Archive: opens that entry's panel |

## In-page links scroll; they never rely on the browser's hash jump

The plugin's shared JS (port `useInPageLinks` and `scrollToSection` from `sections.jsx`) does the following:

- **On click** of any `a[href^="#"]`, or a link to the current page plus a hash, with no modifier keys:
  1. Find the element.
  2. Scroll to `element.top + scrollY − headerHeight + 1`, so the section's top meets the header's foot.
  3. `behavior:"smooth"`, or `"auto"` under reduced motion.
  4. `preventDefault`.
  5. Update the URL hash with `history.replaceState`.
- **On arrival** with a hash (from another page, or a reload): scroll instantly after the page has
  rendered. Try at 80ms and again at 450ms, because Elementor and the pinned stage change heights after load.
- `#top` scrolls to 0.
- Close the folded menu on click.
- Elementor Pro's own *scroll to anchor* setting must not double-handle these. Turn off Elementor's
  "Scroll Snap" and "Anchors offset" or make the plugin's handler run first.

## Cross-page links

| From | Link | To |
| --- | --- | --- |
| Header, on archive and legal | section links | `/{lang}/#id` on the front page |
| Footer | *The house* column | front page anchors; *Archive* → archive page |
| Footer | *Legal* column | `/legal/#part` (Danish `/da/juridisk/#part`) |
| What we think | ledger row | archive page `#slug` |
| What we think | *All publications* | archive page |
| Logo Border | | front page `#top` |
| Language switch | EN · DA | the same page in the other language, keeping the hash |

## External

- `mailto:` for e-mails.
- LinkedIn opens in a new tab with `rel="noopener"` once real; until then `#`.
- No other external links.
