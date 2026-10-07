# Handoff · Capiital website v3 → WordPress with Elementor Pro

**Snapshot:** 6 October 2026, from v3 in Claude Design (`ui_kits/website-dev/`). The three pages in
`reference/` are bundled from that source on the same day and are the visual source of truth.
**Target:** WordPress, Hello Elementor + child theme, Elementor Pro, WPML, English default and Danish second.
**Fidelity:** high. Colours, type, spacing, motion and copy are final unless `open-items.md` says otherwise.

## What this is

The HTML files here are **design references, not production code**. They were built as React prototypes
so the design could be seen working. The job is to rebuild them in WordPress with Elementor Pro, so the
firm can edit text, publications, people and images in Elementor without a developer. That means
native widgets where Elementor can do the work, and a small custom plugin where it cannot (see
`elementor.md`). Every value you need is written in `spec/`. The reference pages show how it should
look and move. `reference/source/` holds the original code if a value is ever unclear. **Where the spec
and the reference disagree, the reference wins.** Report the disagreement.

## Read in this order

0. `CHANGES.md` if you read an earlier copy of this folder.
1. `README.md`: this file, including *The house register* below.
2. `elementor.md`: the architecture: theme, plugin, widgets, CPT, WPML, settings, forms.
3. `spec/00-foundations.md`: grid, breakpoints, tokens, type, rules, focus.
4. `spec/01` to `spec/20`: the front page, section by section, in page order.
5. `spec/30-archive.md` and `spec/40-legal.md`: the two other pages.
6. `spec/50-motion.md`, `60-links.md`, `70-accessibility.md`, `80-content-model.md`.
7. `content/copy-en-da.md`: every string in both languages, verbatim.
8. `checklist.md`: test every line before calling it done.
9. `open-items.md`: what you must not invent.
10. `editor-guide.md`: hand this to the firm when done; keep it true to what you built.

## Build order

1. **Read the test site first.** Record the exact WordPress, PHP, Elementor and Elementor Pro versions
   and every active plugin, then build for those versions. The firm's plugin list has not reached this
   export yet (see `open-items.md`). Check for clashes before installing anything.
2. Child theme: tokens as CSS custom properties, self-hosted fonts, base styles.
3. Elementor settings and Global Kit (`elementor.md` §3).
4. The `capiital-site` plugin: the Publication CPT, its taxonomies, the shared JS (reveal, in-page links,
   header) and the custom widgets.
5. Theme Builder: header and footer templates.
6. Front page, section by section, checking each against `reference/CAPIITAL Website v3.html` at
   1440, 1024 and 390px wide.
7. Archive page and single-publication template.
8. Legal page.
9. WPML: Danish for everything, from `content/copy-en-da.md`.
10. Form: sending, messages, spam protection.
11. Run `checklist.md` in full, in both languages, at the three widths, with and without reduced motion.

## Definition of done

Every line of `checklist.md` passes in English and Danish. The firm can do each task in
`editor-guide.md` in Elementor without touching code. No console errors. Nothing loads from Google
or any other third party. Lighthouse accessibility is 95 or above on all three pages.

## The house register

Capiital's voice governs any text you have to write yourself: an error message, a 404 page, an alt text,
an admin label shown to editors. In brief:

- **Declarative and unhurried, like a letter.** *We hold that…*, *It is our view…*. Semicolons are welcome.
- **The firm states what it does; it never praises itself.** No *world-class*, *leverage*, *unlock*,
  *solutions*, no exclamation marks, no emoji, no countable claims of experience (*100+ years*).
- **Who it speaks to:** owner-led and private-equity-owned companies, start-ups, venture and private-equity
  investors and family offices, Nordic and global.
- **British spelling.** *Purchaser*, not *buyer*. *Those we advise*, not *clients* or *customers*.
- **No outlined boxes; subtitles always under their heading.**
- **Three tests for every sentence:**
  1. Would a senior partner at a comparable house (Rothschild, Lazard, a Nordic boutique) put it on their own site?
  2. Does it sound like a costume when read aloud?
  3. Could a reader say afterwards what the firm actually does?
- **The negative test:** if an element's purpose is to be noticed, it is wrong.
- **Danish:** see the *Danish* section of the copy register, summarised in `content/copy-en-da.md`.
  No *De*, no breezy *du*. Wherever possible, no pronoun at all.

Design rules that bind code: square corners everywhere, hairlines not boxes, no shadows doing a
border's work, nothing centred that could be aligned to a rule. **Motion arrives; it does not perform**
(`spec/50-motion.md`).

## Folder

```
README.md, elementor.md, checklist.md, open-items.md, editor-guide.md
spec/          one file per part of the site
tokens/        the five token files exactly as in v3
content/       copy-en-da.md — every string, both languages
assets/        the three images the pages load
reference/     the three bundled pages + source/ (original React code, extracted CSS)
```

## Assets

| File | Size | Used for |
| --- | --- | --- |
| `assets/hero-skyline.jpg` | 1400×268 | Front page skyline band, `background-size: cover`, centred |
| `assets/logo-border-shape-ice.png` | 1060×200 | The Logo Border's shape, behind the mark in the header |
| `assets/logo-rgb-white.png` | 2036×182 | The wordmark, used as a CSS **mask** filled with navy, never as a visible image |

Do not use any other image from the project, from Erik's PDF or from `uploads/`. The PDF's green
production mark-up (file names, colour notes, *Insert: …*) is never content.

## Fonts

Source Serif 4 (display: weights 400 and 600, roman and italic, opsz axis) and Inter (300, 400, 500).
Both are open-source (SIL OFL): download the woff2 files and serve them from the child theme. **Never
load them from Google Fonts.** The typeface may change later (see `open-items.md`). Keep it to the two
CSS variables, `--font-display` and `--font-sans`, so a change touches one place. **Never ship SF Pro or
SF Compact** (Apple licence). Minion Pro and Capitolina would need web licences.
