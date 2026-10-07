# Capiital

The firm's website: the design as a working page, and the WordPress theme it runs on.

The design is specified elsewhere and implemented here. **`wordpress-elementor-v3-2026-10-06/`
governs.** It is the handoff written in Claude Design on 6 October 2026, with the Elementor
build in view: a spec per section, the five token files, every string in English and Danish,
the three images, a checklist to test against, and the reference prototypes. Where its spec
and its reference disagree, the reference wins and the disagreement is reported — the ones
found so far are listed at the foot of this file.

`Capiital Website Design/` is the earlier snapshot of the same project, from September. It is
kept for its component library and its brief, but it is a generation behind: its palette is
the sea palette, which the ice palette replaced on 30 September. Build nothing from it.

## The three halves

Everything installed or pasted is generated from the sources at the root. Run
`wordpress/build.sh` after any change.

**The pages.** `index.html`, and `archive.html` and `legal.html` generated from
`templates/`. Open them from a local server — the wordmark is a CSS mask, which `file://`
will not load.

```
assets/css/tokens/     the five token files, byte for byte from the design folder,
                       plus site.css for the only two values this site changes
assets/css/tokens.css  generated from those, by the build
assets/css/fonts.css   @font-face for the two self-hosted families
assets/css/styles.css  the design: the front page, the archive, the legal page
assets/js/main.js      reveals, header, in-page links, the two held sections, the form
assets/js/archive.js   the archive's filters, cards and reading panel
assets/fonts/          Source Serif 4 and Inter, latin and latin-ext, SIL OFL
assets/img/            the skyline, the Logo Border's shape, the wordmark mask
content/               publications.json — the twelve placeholder entries, both languages
templates/             the archive and legal page shells, filled by the build
```

**The theme.** `wordpress/capiital/` — a Hello Elementor child carrying the tokens, the
typefaces and every style, and rendering no content of its own.

**The plugin.** `wordpress/capiital-site/` — the Publication post type behind the archive and
the front page's ledger, six custom Elementor widgets, the shared behaviour, the form's spam
floor, and a Reveal control so the firm keeps the house motion on anything it adds.

See `wordpress/README.md` for the order to install them in, and `wordpress/SETTINGS.md` for
the Elementor settings to click through once.

## One archive, two sources

`assets/js/archive.js` draws the filters, the cards and the reading panel from a JSON island
and never knows where it came from. The static page's island is built from
`content/publications.json`; the *Capiital · Archive* widget writes the same island from the
publication post type. The archive is therefore written, tested and fixed once rather than
twice, and the static build is a real test of what ships.

## Where this is going

The handoff asks for the site rebuilt in Elementor Pro so the firm can edit text,
publications, people and images without a developer. What is built: the child theme, the
plugin, the post type, the six widgets, the archive, the legal page, the Theme Builder
templates and the WPML configuration.

What is left: putting it on the server, and the Danish. WPML is installed but four major
versions behind, which is why the translation pass is last.

## What is settled, and what is not

`wordpress-elementor-v3-2026-10-06/open-items.md` lists what the firm has yet to supply —
portraits, two principals' details, LinkedIn addresses, the three real cases, the twelve
publications, the legal brackets. Each has a stand-in in the build and none of it is to be
invented.

The copy is the draft in `content/copy-en-da.md`, and the Danish awaits a native-speaker
review. The eight held copy fixes are not applied: the file as it stands is what is built.

## House rules that bind the code

The full account is in `CLAUDE.md` and in the design folder's own README. In short: every
corner square; hairlines, not boxes; no outlined box anywhere; no shadow doing a border's
work; every headline figure in the serif; nothing centred but the quote; one accent at a
time; motion arrives and does not perform, fires once and never reverses. If an element's
purpose is to be noticed, it is wrong.

Two of those are checked by the build rather than left to care: no third-party request may
appear in the sources, and no paste-able piece may carry a `<style>` or a `<script>`.

## Disagreements reported

The handoff asks for these rather than for silent corrections.

- **`spec/80-content-model.md`** still lists a *hint* field for Where we engage and names
  "figure, knot, hover logic" as fixed. `spec/03` removed the hint and retired the knot.
  Built to `spec/03`.
- **`spec/70-accessibility.md`** calls the four stages "the quadrants". Terminology only.
- **`spec/00` §5** says card grids use `gap:1px` over a border ground. The *Current detail*
  note at the foot of the same file, and `spec/30`, both say space and no outline. Built to
  the later notes.
- **`spec/20`** says slate is never used on the ice ground, while `FOOT_ICE_CSS` sets the
  form's placeholder to slate. The spec's own type table exempts placeholders. Built to the
  reference; the placeholder is the only slate in the footer.
- **`elementor.md` §8** gives UI icons stroke-width 2; the reference's `Icon` renders them at
  1.25. Built to the reference.
- **The footer band overflows the viewport below 900px** in the reference, by 186px at
  390px: twelve `minmax(0,1fr)` tracks collapse, but the items spanning them keep
  `min-width:auto`. Fixed here by re-declaring the tracks at the breakpoint.
- **The three case accounts could not be read on a desktop keyboard.** They are shown on
  hover alone, and the cells were not reachable; `spec/70` covers touch but not keyboard.
  The cells are focusable here and focus works exactly as hover does, which is the rule
  `spec/03` already sets for the stages.
- **The header overflows by 15px at 390px** in the reference: the Logo Border, a 40px gap and
  the Menu button need 405px. The gap is narrowed on phones here. A deviation, not a
  correction of the spec — reverse it by deleting one rule if the firm would rather the
  reference stood.
