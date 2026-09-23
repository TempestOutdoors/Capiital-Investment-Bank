## How we work together

**A message beginning `Question:` is a question and nothing else.** Read, look, answer — and
change no file until the user says go. This holds even when the message goes on to say "execute",
even when the answer is obviously a fix, and even when something is plainly broken: say so, and
wait. The rule has been broken twice and both times cost the user work they had not asked for.

Where a question carries an instruction inside it, name the conflict in the reply and stop.

**Before building, say what will be built and what it will displace.** Substantive changes are
agreed in words first. Where a choice is genuinely open, put the options and a recommendation
rather than picking silently.

**Say when the user is right and the earlier reasoning was wrong.** The Gordian-knot thread is the
example: the objection raised was to the wrong thing, the user's reading of the story was better,
and the retraction improved the work. Deference is not the point; accuracy is.

## The generations

The site exists twice over, with a fixed record of the build between them. Each has a fixed status and the statuses do not drift.

| Generation | Folder | Status |
| --- | --- | --- |
| **v1 · Christian Original** | `ui_kits/website-original/` | The artwork's language verbatim, Lorem and slips intact. Never edited. |
| **v2 · Capiital Starting Point** | `CAPIITAL Website.html` | Retired as a live build (September 2026); held as a single standalone file. Never edited. |
| **v3 · Capiital In Development** | `ui_kits/website-dev/` | Live. All work lands here. |

v1 exists to hold the PDF's words so the two live builds read as a copy diff; the v2 record exists so
any change in v3 can be measured against a fixed point. Editing either destroys the reason they
exist. The live v2 folder (`ui_kits/website/`) was removed; its section components survive in v1,
which is structurally identical, so the design-system bundle loses nothing.

## Project furniture

- **`hub.html`** — the entry point, and where a new page should be linked from. Every card opens a
  live page; nothing on it is a screenshot.
- **`ui_kits/versions.html`** — the generation switcher: v1, v3, and the v2 record.
- **`back-to-hub.js`** — injects the fixed top-left Hub marker on sub pages and pushes page content
  down to clear it. **The two live site generations deliberately do not load it** — they carry the
  corner switch instead, and pushing a full-height hero down would break it.
- **`ui_kits/version-switch.js`** — the bottom-left generation switch, on the sites only.
- Both are injected rather than authored into pages, so no page's markup carries them.
- A fuller account of decisions, reasoning and traps is in **`project-log.md`**.
- **The hub's *Awaiting decision* column** (top right, in the dark band) lists every open choice,
  missing material and content gap. It is authored, not click-to-tick. **Whenever the user
  confirms a choice in chat, in the same turn:** apply the change, remove the item from the
  column (settled items are removed, not struck through), and record the decision in
  `project-log.md`. When new open decisions arise, add them to the column.

## The house register governs everything

Capiital's voice was settled in conversation and is not a copy preference — it is the governing
principle for wording, motion, layout, colour and imagery alike. The canonical statement of it is
the section 03 standfirst:

> We hold that the heritage upon which a company is built is its principal asset, and that legacy
> is a matter of stewardship rather than sentiment. What we believe follows from that, and from
> little else.

British noble, epistolary, unhurried — the cadence of a letter rather than a page of marketing.
The full account, including the two standfirst drafts not chosen, is in
`ui_kits/website-dev/copy-register.md`. Read it before writing any copy for this project.

**Scope.** Applies to v3 (`ui_kits/website-dev/`) and to everything made from here — guideline
cards, the hub, readmes, asset names, card names and subtitles, new sections, new documents.
**It does not apply to v1** (`ui_kits/website-original/`), which exists to hold the artwork's
language verbatim, **or to the v2 record** (`CAPIITAL Website.html`), which is frozen.

### Wording

Declarative openings — *We hold that*, *It is our view*, *What follows*. Semicolons where a modern
writer would use a full stop. Nouns of stewardship: inheritance, custody, obligation, account,
house. The firm states what it is obliged to do; it never praises itself.

**The register is bearing, not vocabulary.** The firm sounds old because it is unhurried and exact,
not because it says *upon*. A first pass overshot into costume — service names abstracted until they
no longer named the service (*Clarity of Account*, *Passages of Ownership*), antique syntax carrying
no meaning (*defensible upon sight*, *Upon the Energy Transition*). That was corrected: the plain
service names stand (Performance Visibility, Financial Leadership, Transactions, Operational
Finance), each with a line saying what it involves. Clear over clever, specific over generic.

Two tests, applied to every sentence. Read it aloud: if it sounds like a costume, it is one. Then
ask whether a reader could say afterwards what the firm actually does — if not, the sentence has
failed however well it reads. The full account of the correction is in
`ui_kits/website-dev/copy-register.md`.

Ruled out: idiom of every kind (*a tell*, *the next move is yours*), alliterative pairings
(*visibility precedes velocity*), *unlock*, *world-class*, *leverage*, exclamation marks, emoji,
and any countable claim of experience — never *100+ years*, never *a decade of*. British spelling
throughout; *purchaser* not *buyer*; *those we advise* not *customers* or *clients* wherever the
sentence permits.

### Motion

Motion in this register **arrives; it does not perform.** The existing set is the whole permitted
vocabulary — `settle` (14px and fade), `veil` (opacity only, for prose), `draw` (a hairline
growing from its left edge), a figure counting once on entry, and a 1px read-progress rule. Each
fires once and never reverses.

Ruled out: parallax, spring, bounce, scroll-jacking, hover-scaling, lifts, marquees, cascades
running beyond about six beats, and any element animated twice. Slower rather than faster. A
hairline drawing itself is the most demonstrative gesture the site is allowed.

**The front page's wash arriving** is admitted as the hero's single entry: light flushing in along
the gradient's own axis, top-left to bottom-right, over 1.7s, fired once on load in v3. It is a
larger gesture than the rest of the set and passes on one condition — no travelling edge may ever
be visible; what is seen is the corner brightening. It moves by `transform` alone and is absent
under reduced motion. It is not to be reused on any other section.

The one sanctioned exception is a sticky-column read — a pinned left column against a scrolling
right rail. It is the site's signature and it is structural rather than decorative. The reference
implementation and a written explanation are parked at `ui_kits/website-dev/parked/`.

### Design

Hairlines, not boxes. Every corner square. No shadow doing a border's work, no fill where a rule
will serve, no card where a ledger row will serve. Structure from the twelve-column grid and from
generous margins, which are a brand rule and not a preference. Every headline figure set in the
serif. Nothing centred that could be aligned to a rule.

### Colour

The palette does not grow; what grows is restraint. One accent at a time, never more than two
grounds on screen. Sand and brown are the register's own colours; the green is its punctuation.
Any proposed colour must justify itself as a ground, a rule, or the accent — never as decoration.
Where a token is wanted and absent, add it to `tokens/colors.css` with the artwork's hex rather
than inventing a value inline. Contrast still holds: 4.5:1 for text, 3:1 at headline scale.

### Imagery

The logic that ruled out the artwork's glass figures stands generally: no illustrated metaphor, no
icon standing in for an idea, no chess piece, magnifying glass, gear, handshake or iceberg.
Photography, a genuine exhibit, or nothing. Lucide icons are permitted only inside controls and
navigation.

### The negative test

If an element's purpose is to be noticed, it is wrong. Everything earns its place by being
necessary — and when in doubt, less, and quieter.

## The source PDF's green mark-up is never content

`uploads/__CAPIITAL web.pdf` carries green production annotations laid over the artwork — arrows,
boxes and comments addressed to whoever builds the site. **None of it is copy, and none of it may
appear in any page, component, guideline, readme or card in this project.**

What that covers:

- Asset filenames — `_logotop_fullwidth_transparent`, `_green blur half page.png`,
  `STP2.architect_chesspieces.png`, `CT_hue cutout.png`, and every other `.png` / `.gif` call-out.
- Colour instructions — `Colour bg: hex: ebe8df`, `Colour bg: hex: 5a8281`, `transparent`,
  `2xtransparent`.
- Build instructions — `Insert: Lorum Ipsum placeholder text`, `Insert: Placeholder quotes texts`.
- Bracketed placeholder section labels — `1 – [ LORUM IPSUM ENGAGE ]`, `2 – [ LORUM IPSUM ]`.
  Use the real section name instead.
- Page markers and behaviour notes — `FRONTPAGE`, the note about paired pages, the note about the
  top bar appearing on cursor movement. Implement the *behaviour* where it is wanted; never print
  the note.

**The Lorem Ipsum body copy is a separate matter and is kept.** Where the artwork sets Lorem in a
real text frame — the four method-step paragraphs, the four service quotes, the two Who-we-are
paragraphs — that is the artwork's own placeholder copy and it stays in
`ui_kits/website-original/`, which exists precisely to hold the PDF's language verbatim. Strip the
green mark-up; keep the Lorem.
