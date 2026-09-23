# ScrollProgress · useScrollProgress · useActiveSection

Three pieces of scroll plumbing.

- `<ScrollProgress tone="light|dark" />` — a 1px read-progress rule, positioned absolutely inside the fixed header. The accent at one weight; no gradient, no glow.
- `useScrollProgress(ref)` — 0 to 1 as the element crosses the viewport. Drives scroll-linked figures such as the thesis waterline.
- `useActiveSection(ids)` — the id of the section currently owning the viewport; marks the live nav item.

All three are passive listeners and disconnect on unmount.
