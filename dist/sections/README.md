# The front page, piece by piece
Seven pieces, each for one Elementor HTML widget. Two of them are deliberately not split further, and the reasons are given beside them.

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

1. **`01-header-front.html`** — The skip link, the header and the front page  
   4,052 bytes
2. **`02-engage.html`** — Where we engage  
   4,594 bytes
3. **`03-learned-quote.html`** — What we learned, and the quote — one piece on purpose  
   5,518 bytes
4. **`04-cases.html`** — Cases  
   6,021 bytes
5. **`05-people.html`** — Who we are  
   6,599 bytes
6. **`06-papers.html`** — What we think  
   3,319 bytes
7. **`07-footer-contact.html`** — How to reach us, and the footer  
   4,755 bytes

## Then

- The page template should be **Elementor Canvas**, so the theme wraps nothing around it.
- Check at 1440, 1024 and 390px wide, in both languages, with and without reduced motion.
  `checklist.md` in the design folder is the list to work through.
- The ledger under *What we think* is four fixed rows here. It becomes a Loop Grid of the
  latest four Publication posts when that post type exists, and then it can never disagree
  with the archive.
