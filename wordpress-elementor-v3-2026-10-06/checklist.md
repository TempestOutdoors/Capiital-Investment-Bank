# Checklist

Test each line in **English and Danish**, at **1440, 1024 and 390px** wide, unless the line says
otherwise. Tick only what you have seen.

## Setup
- [ ] WordPress, PHP, Elementor and Elementor Pro versions recorded in your report; active plugins listed, and no clashes found.
- [ ] Nothing is requested from fonts.googleapis.com, fonts.gstatic.com or any third party (check the network tab on all three pages).
- [ ] Font Awesome is not loaded. Elementor's Google Fonts are disabled.
- [ ] Source Serif 4 and Inter are served from the child theme as woff2. No SF fonts are anywhere in the theme.
- [ ] Every Elementor widget's Motion Effects are empty.
- [ ] Border-radius 0 on every element, Elementor's buttons and form fields included.
- [ ] No box-shadows anywhere.

## House rules
- [ ] No outlined box anywhere (cells, cards, portraits, placeholders, panel, pop-ups); only rules, ledger lines and form controls carry lines.
- [ ] Every section subtitle sits under its heading.

## Header
- [ ] Height 64px; 56px at ≤ 640px.
- [ ] At the top: transparent, no border. After 40px of scroll: cream 95%, 12px blur, 1px rule, over 500ms.
- [ ] Logo Border: the shape is exactly the bar's height + 1px and covers the bottom hairline; the ice strip runs to the screen's left edge.
- [ ] The mark is navy in both states, never moves, and the shape fades in behind it.
- [ ] Six links ≥ 1301px; *Menu* at ≤ 1300px (check at 1300 and 1301).
- [ ] The live link follows the section crossing 34% of the viewport, *What we think* included; *How to reach us* is live at the very bottom.
- [ ] The live link turns navy, and a 1px line draws from the left.
- [ ] EN · DK: the current language is navy and underlined; switching keeps the section. The code stays `da` (`<html lang="da">`, hreflang).
- [ ] At ≤ 640px the switch is only at the foot of the open menu. At 641–1300px it shows once only, in the bar.
- [ ] The 1px read-progress line grows with the scroll.

## Front page
- [ ] The skyline band is 240–420px tall (clamp); at 1280×800 and 1440×900 the headline and the whole standfirst are in the first screen, full bleed, and dissolves along a straight horizontal edge. No slope, tab or ragged edge.
- [ ] On load the wash brightens the band from the top-left over 1.7s, and no moving edge is ever visible.
- [ ] h1 three lines, lines 2–3 italic navy; rises at 0.3s. The standfirst rises at 0.45s.
- [ ] h1 is 96px at 1440 and 44px at 390.
- [ ] No buttons or links in the hero.

## Where we engage
- [ ] Four stages side by side on one ruled grid; two columns at ≤ 1100px, one at ≤ 900px; numerals visible from the start.
- [ ] At > 900px the section holds at the header. Stages arrive left to right at 0, ¼, ½ and ¾ of the hold, then the page lets go.
- [ ] Arrived stages never disappear when scrolling back.
- [ ] After the first pass, scrolling back up and down again passes *Where we engage* without a hold, and nothing on screen jumps at the release; the header's live link stays correct.
- [ ] Loading below the section, or arriving by `#cases`, gives no hold. A reload from the top holds again.
- [ ] The wheel is never slowed, sped or blocked.
- [ ] Hover or Tab on a stage: numeral and title turn navy, the line fades up, the others drop to 42%. Leaving the row resets.
- [ ] Touch and ≤ 900px: lines visible at rest, no dimming, not held.
- [ ] No knot anywhere on the site. No *Rest on one for more*.
- [ ] Each stage: numeral, title, then a 3:2 image placeholder with the camera icon, then the line.
- [ ] Open the page in a presenting / full-screen tab: the hold still runs.

## What we learned
- [ ] At > 900px: the section holds at the header; the left column stays still; the observations move up at exactly the scroll speed.
- [ ] Release happens when the foot of *Complexity outgrows its instruments* is flush with the foot of the left column, with no gap after.
- [ ] The wheel is never slowed, sped or blocked: scroll by trackpad, mouse and keyboard (Page Down, Space).
- [ ] Once *Complexity outgrows its instruments* is flush, the section stays still for about a third of a screen before the page moves on.
- [ ] At the end of the first pass the observations veil out and settle back in as a 2×2 grid, in place: nothing below jumps, the header's live link stays right.
- [ ] Scrolling back up and down again: the grid, no hold. Arriving by `#cases` or reloading below: the grid at once.
- [ ] While held, the quote below cannot be seen until the last observation is flush.
- [ ] Adding a fifth observation in Elementor still releases flush.
- [ ] At ≤ 900px and under reduced motion: normal scrolling.
- [ ] Hairlines draw in 1.8s and rows settle in 1.35s.

## Quote
- [ ] It sits between *What we learned* and *Cases*, with section padding 48px.
- [ ] *judgment is not delegable* is italic navy; curly quotes; 64px navy hairline above *C.H. Tange*.

## Cases
- [ ] Three cells separated by space, no borders, no *Case 01* labels: title, 3:2 camera placeholder, then the account, which fades in on hover without moving anything.
- [ ] One column at ≤ 900px. On touch the accounts show at rest. No *Case 01–03* labels. A 3:2 image placeholder sits below each title.

## Who we are
- [ ] Four people on top; Peter centred under C.H. Tange / M.F. Madsen; Richard centred under J.S. Wiese / A.S. Trats.
- [ ] Portrait placeholders at 75% width, 4:5, with the camera icon.
- [ ] Names brown serif 30px; roles in caps.
- [ ] Phones read exactly like `M: +45 6054 4110`.
- [ ] E-mails lowercase, with a hairline underline; *LinkedIn* beneath each, in the same style.
- [ ] One column at ≤ 900px.

## What we think
- [ ] The latest four Publication posts, newest first, in the ledger's five columns. The row washes white on hover and the title turns navy.
- [ ] A row opens the archive with that entry's panel open.
- [ ] *All publications →* goes to the archive.
- [ ] 901–1300px: four columns, no CTA. ≤ 900px: kind and date over the title.

## Footer
- [ ] Ground ice-pale → ice, left to right. No slate text. Headings, rules and legal lines navy.
- [ ] `contact@capiital.eu` in serif 20px with an arrow.
- [ ] Three link columns. The legal links open the legal page at the right part.
- [ ] © MMXXVI line with the CVR number and address; the disclaimer line beneath.
- [ ] ≤ 900px: stacked, link columns in two, form in one column; ≤ 560px: link columns in one.

## Form
- [ ] Empty submit: both errors appear under their fields in navy, and focus goes to the first.
- [ ] A malformed address shows the *incomplete* message. Typing clears it.
- [ ] A valid submit: *Sending*, then *Received, with thanks…*; an e-mail arrives at contact@capiital.eu, reply-to the visitor; the submission appears in Elementor → Submissions.
- [ ] Simulated failure shows the *could not be sent* line.
- [ ] Filling the honeypot, or submitting within 3s of load: the visitor sees *Received* and no e-mail is sent.
- [ ] No red anywhere. No reCAPTCHA. No cookie set by the form.

## Archive
- [ ] Five columns at 1440, four at 1280, two at 900, one at 560.
- [ ] Cards show the photo alone; on hover or focus the ice veil (78%, blurred) shows kind · date, title, summary and sector. On touch, the veil sits under the photo.
- [ ] Four filter dropdowns plus an order dropdown. Filters combine AND across groups and OR within one; counts show on the buttons; *Clear filters* appears when filters are active.
- [ ] Stage options are in the fixed order. Sector has *Across sectors* last. Year is newest first.
- [ ] Default order is newest first. A–Z / A–Å sorts by the current language's titles.
- [ ] The count line reads correctly. The empty state shows when nothing matches.
- [ ] A card opens the panel:
  - the site is visible and muted behind it
  - the URL gets `#slug`
  - focus is on *Close*
  - Escape, *Close* and a click on the veil all close it
  - focus returns to the card
  - the page doesn't scroll behind it
  - Tab stays inside the panel
- [ ] Loading `/archive/#slug` opens that entry.
- [ ] Dates are in Danish on `/da/`.

## Legal
- [ ] Four parts with their ids. The index is sticky and marks the part in view.
- [ ] The cookie paragraph no longer mentions Google Fonts.
- [ ] *[Draft for legal review]* is still visible until the lawyer approves.

## Links
- [ ] Every in-page link scrolls smoothly, with the section top at the header's foot, and never reloads.
- [ ] Links from other pages land on the section after render.

## Languages
- [ ] English at `/`, Danish at `/da/`; `hreflang` on every page; `<html lang>` correct.
- [ ] Every string in `content/copy-en-da.md` appears in the right language. No English is left on `/da/`.
- [ ] Danish headlines break where the copy file breaks them; *Nordisk M&A-rådgivning* fits at 390px or wraps cleanly.

## Accessibility and motion
- [ ] Keyboard only: everything reachable, focus always visible.
- [ ] Reduced motion (OS setting on):
  - no wash
  - no rises or reveals
  - *What we learned* unpinned
  - *Where we engage* not held
  - jumps instead of smooth scroll
- [ ] Lighthouse accessibility ≥ 95 on all three pages, in both languages.

## Editing (do as the firm would)
- [ ] Change the hero standfirst in Elementor, in English and Danish.
- [ ] Add a publication with a photo; it appears first in *What we think* and in the archive, with no styling done.
- [ ] Add a seventh person by duplicating one; the grid stays aligned.
- [ ] Add and reorder observations in *What we learned*.
