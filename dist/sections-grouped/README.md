# The front page in three pieces
The same page in three widgets rather than seven: fewer things to place, and fewer seams. Use this one unless a section needs editing on its own.

## Before the first paste

**Install and activate the theme.** `dist/capiital-child-theme.zip`, under
Appearance → Themes → Add New → Upload, with Hello Elementor installed as its parent. The
theme carries the colours, the two typefaces, every style and all of the behaviour.

Nothing below contains any CSS or any JavaScript, and nothing should ever have any added to
it. WordPress strips `<style>` out of widget content; the whole stylesheet disappeared that
way once and the site rendered as unstyled markup. There is no Additional CSS to paste
either — the theme loads it all.

**In Elementor's settings, before building:** Flexbox Container on, Grid Container on,
Google Fonts off, Load Font Awesome off, Disable Default Colours on, Disable Default Fonts
on, content width 1400, container padding 0, default gap 0, border-radius 0 under Theme
Style. Leave every widget's *Motion Effects* empty: the site's own motion is in the theme,
and Elementor's would fight it.

## The pieces

Add an **HTML widget** for each file, in this order, and paste the file whole:

1. **`1-header-front.html`** — The skip link, the header and the front page  
   4,052 bytes
2. **`2-middle.html`** — Everything between the front page and the footer  
   26,059 bytes
3. **`3-footer-contact.html`** — How to reach us, and the footer  
   4,755 bytes

## Then

- The page template should be **Elementor Canvas**, so the theme wraps nothing around it.
- Check at 1440, 1024 and 390px wide, in both languages, with and without reduced motion.
  `checklist.md` in the design folder is the list to work through.
- The ledger under *What we think* is four fixed rows here. It becomes a Loop Grid of the
  latest four Publication posts when that post type exists, and then it can never disagree
  with the archive.
