# Project log

Context that would be expensive to rediscover: what was decided, why, and what bit us on the way.
The binding rules live in `CLAUDE.md`; this is the reasoning behind them.

---

## v3 — the eight sections

Ordered and named by the user. The capital-cycle section that stood at 01 was removed and parked.

| # | Section | What it is |
| --- | --- | --- |
| 01 | Front page | Deep-blue hero. Headline, standfirst, two links. Repeatedly protected — do not restyle it without being asked. |
| 02 | What we engage | Four service titles floating around a centre placeholder; explanation on hover only. |
| 03 | What we believe | Four positions, then the four movements. Carries the sticky-column read. |
| 04 | What we learned | Experience told sideways. Four observations; never a curriculum vitae. |
| 05 | Cases | Three situations, no names, each on the same five beats. |
| 06 | Who we are | Four principals, initials only, no photographs. |
| 07 | What we think | Publications as a contents page. |
| 08 | How to reach us | Contact running into the footer. |

**Section marks are scaffolding.** `[ 02 — WHAT WE ENGAGE ]` at 34% of the accent, so the user can
follow the build. Implemented as a local `ref()` helper in v3 only — removing it later is one edit,
and the shared `Eyebrow` component is untouched.

---

## Decisions, and why

**One ground: eggshell.** The client's boss objected to the page changing ground — white, eggshell,
navy and back. Sections 02–07 are now eggshell throughout. **The hero and the footer stay dark**, by
explicit instruction. The consequence to watch: separation now rests entirely on hairlines, the
numbered marks and vertical spacing. If the page starts reading as one column the answer is wider
section padding, not a second ground returning.

**Section 02 — emphasis by withdrawal.** No panel borders and no fills. Titles and numerals float
hard left or hard right; a bordered placeholder spans the centre. On hover the title and numeral go
to the accent, the one-line explanation fades up, a hairline draws inward toward the centre object,
and the other three recede to 42%. The design system forbids hover-scaling, so the hovered quadrant
does not grow — its neighbours withdraw. Keyboard-focusable throughout.

**Section 03 — the sticky read, carrying both groups.** Lifted from v2's parked implementation. The
left column pins the heading and the standfirst and holds while *both* the four positions and the
four movements pass it, so each is read against the same sentence. The right side is one continuous
ledger rather than two blocks.

**Section 06 — four principals, initials only.** C.H. Tange, M.F. Madsen, J.S. Wiese, A.S. Trats.
No photographs. Names in `--brown` at headline scale, role, telephone and email in `--brown-ink`.
The eight-person grid with portraits that preceded this is gone.

**The front-page bar was removed** and is held in `ui_kits/website-dev/copy-register.md`:
*Bespoke counsel · Quiet rigour · Enduring results*, with eighteen slot variants. It is the
shortest complete statement of the register the project has produced and may yet earn a place.

---

## Imagery — the whole thread

**The artwork's glass figures were removed and are not coming back.** Knight, magnifying glass,
gears, atom, bulb, Swiss army knife, iceberg. Two separate faults: the *metaphors* are the standard
business-illustration vocabulary, and each restates its headline in picture form, which signals the
claim is not trusted to carry itself; and the *3D glass render* is a 2021–23 SaaS and crypto
aesthetic that already dates. The brand book independently rules out "glossy 3D icon art" and names
chess pieces, magnifying glasses and gears as cliché — so the artwork contradicts the brand book.

**What the field actually does**, read from Lazard, EQT, Clearwater Denmark, Nordic M&A and Bain:
at the top of the market illustration has disappeared. Typography, photography, real charts,
restraint. Icons survive only as wayfinding. MBB commissions original editorial illustration for
articles — original work, never a library metaphor. Thin-line icon grids are the mid-market default
and read as generic; increasingly they read as 2019 SaaS.

**The single highest-value asset the project could receive is photography** — team portraits and
Nordic city or industrial imagery in a muted register. It would move the site further than any
other change available.

### The Gordian knot

The user proposed a Gordian knot: first as a scroll-driven hero animation, then as a symbol for the
identity. The scroll animation was declined — scroll-jacking, and it requires drawing an illustrated
object. **The identity proposal was accepted, and the reasoning matters.**

The first objection raised was that Alexander's solution rewards impatience. *That objection was
wrong and was retracted.* The user's reading is better: the knot at Gordium was a **rigged test**,
and the ritual of working at it was the trap. Read that way the knot is not complexity — it is **the
industry's theatre**: the six-week workstream, the ninety-slide deck, the buzzword standing in for a
finding. Refusing the premise is precisely the firm's positioning, and it is a symbol whose meaning
is the refusal of symbols, which is the one metaphor admissible in a system that bans metaphors.

An identity mark is also a different category from page imagery. The imagery rule exists to stop
pictures decorating claims in content; a mark is *supposed* to be symbolic.

**Two conclusions carried forward.** The mark should be **the cut, not the knot** — a rendered knot
fails at 16px, dates on drawing, and is the version that reads as consulting cliché. And the
wordmark already contains the gesture: CAP//TAL sets the doubled *ii* as two skewed bars, which are
already a cut, so a mark drawn from them is one the house already owns.

**Handling: let the mark be silent.** Never tell the story on the site. Old houses do not explain
their crest, and explaining it is the buzzword behaviour the idea rejects. Keep it for the room.

**Where it stands.** Six closed candidates at `guidelines/mark-gordian.html` — Solomon, Quadrature,
Trefoil, Chain, Lattice, Skew — no cut, on instruction; the severed variant follows once one is
chosen. True interlace: crossings computed geometrically, over/under alternated along each strand,
rendered as ground-coloured casings in painter's order. **Masks and filters were tried first and
did not survive the renderer — use painter's order.** Skew is the recommendation (the Solomon knot
at the wordmark's exact sixteen degrees); Trefoil is the strongest as pure form and the only true
knot in the set; Lattice is included to be rejected and fails below about 40px.

---

### The mark in motion

`guidelines/mark-animated.html` — Solomon and Trefoil written in, plus the Trefoil as one unbroken
pen. Each closed loop is halved at its start point and at the point exactly half its perimeter away,
and the halves are raised together.

**Crossings are ploughed, not patched — this is the whole of the third and final fix.** Each
crossing is a short run of the over-strand carrying a ground-coloured blade (12.4 wide, butt) with
its own ink (7.6, square) behind it, and *both are dash-drawn along the strand in the strand's
direction of travel*, entering as the tip enters and leaving as it leaves. The under-strand is whole
until the blade reaches it and cut the instant it passes. Two consequences worth keeping: it
self-resolves in either arrival order (if the under-strand has not arrived, the blade erases ground
on ground, and the finished blade masks the under-strand's later ink anyway), and the ink's square
cap leading the blade by 3.8 units is harmless because it is ink over ink.

**Why casings are structurally unavoidable.** An alternating knot has no valid paint order — for
Solomon, A1 must sit above B1 at (35,65) and below it at (35,35), a cycle. Splitting the strands at
under-crossings and using geometric gaps removes the cycle but produces *floating gaps*: at (35,35)
the gap opens 1191ms in and is not covered until 1879ms, so the line reads broken for ~690ms, and no
choice of start point, direction or stagger fixes all four (the constraints require d >= .246D and
d <= -.246D simultaneously). Ploughs are the only construction that is both correct and continuous.

**Descending was built first and set aside.** It closed the figure at its weakest point, and it was
the one element on the site moving against a system in which everything arrives from below. Raising
it costs nothing and puts the mark in the same grammar as every heading above it.

**The Trefoil has exactly one axial split**: the crown and the centre vertex, which are half a
perimeter apart to the unit — good fortune of the construction, not an adjustment. It has no apex at
its foot (its lowest points are the two lower lobes, and the lowest point on the axis is a crossing),
so the rising version runs centre → crown. The one-pen row exists because a single closed strand can
return to its own start, which is the claim the mark makes.

**The lag, found factually after three attempts.** The client reported it twice; it had three causes
that all peaked at the same moment, which is why fixing one at a time never worked.

1. *The crossing collision.* Casings were flipped whole by `opacity` at the moment the tip reached
   the crossing's **centre**. The bar is 13.2 units and its ink has square caps (+3.8 each end), so
   20.8 units of ink appeared in one frame — **10.4 of them ahead of the tip** — and the pen then
   spent ~185ms crossing line already drawn. It stopped, visibly. Solomon did it twice; the one-pen
   Trefoil did it at f=.880, i.e. right at the close. Also `transition:opacity 0s linear var(--g)`
   is a zero-duration transition, which engines need not schedule on a frame boundary — part of why
   it varied by device.
2. *The easing was never what I claimed.* `cubic-bezier(.4,.15,.6,.85)` measures dy/dx = 0.375 at
   both ends and 1.417 at the midpoint — **a 3.78:1 speed ratio**; 90% of the ink lands by 83.3% of
   the time. The first curve, `(.35,.02,.28,1)`, was worse still (y2 = 1 makes it a hard ease-out).
   Now `cubic-bezier(.15,.12,.85,.88)` — measured 1.29:1, slowest moment 0.8x cruising. Probed
   live: 62.4 u/s at the start, 51.5 u/s at 1100ms, mean 62.1.
3. *Paint cost rises monotonically.* `stroke-dashoffset` is not compositable, so every frame
   re-rasterises the whole stroke; a frame at 90% drawn costs ~9x one at 10%, and the page ran ~30
   concurrent path animations (3 rows x 4 instances x up to 4 strands) peaking together. Fixed by
   animating only the two 164px marks, setting the 30px lockups finished (`.st`), and queueing rows
   so at most four strokes grow at once.

The wordmark's veil starts *before* the strokes finish rather than 120ms after, or the pause reads
as three-quarters of a second of nothing.

**Trap.** Two half-paths meeting at a *vertex* leave a notch, because separate paths do not join.
Where the meeting point is a vertex rather than a straight run, each half carries a 1.2-unit stub of
the other past it so the corner mitres. The trefoils need this; Solomon's four meeting points all
fall mid-edge, so it was left abutting — **which was wrong for a different reason.** Two butt caps
that abut exactly still antialias against each other, and once `will-change` promotes each strand to
its own layer they antialias in *separate* layers, so the ground bleeds through. Result: four short
light seams stacked on the centre axis at (50,6), (50,35), (50,65), (50,94), reading as one thin
white line down the middle of the figure. Measured at 4x supersampling: 72 against solid ink's 37,
about 17% ground. Solomon's halves now run 1.2 units *past* the axis and overlap like the trefoils'
(strand length 118 -> 120.40, so every plough window was recomputed); probe now reads 37 at all four
points at both 164px and 656px. **Rule for this file: never let two same-coloured strokes abut where
they can overlap.**

**The empty-chip artifact.** Reported as "a small block, before it begins and throughout", on the
trefoil rows. It was not the knot — it was `.lock.dk`, the dark lockup chip: `opacity:0` hid the
wordmark but still reserved its width, leaving a wide dark rectangle holding a 30px mark and a void.
Most obvious below 1100px, where the grid collapses to two columns and the chip sits alone in a
wide cell. The lockups are now complete static specimens — mark *and* name set finished — which
cost the wordmark's veil; that was a deliberate register choice and it is gone from this page, to
return when the wordmark is part of a real lockup animation rather than a specimen.

**The block at the start.** Reported on the two-half Trefoil only, and the cause was the mitre
stubs. Each half was authored with its 1.2-unit stub as its *first* segment, and each stub runs
backwards across the axis along the **other** half's leg direction — so the first ink either half
laid was the same small central patch, 7.6 wide and mutually opposed. Measured at 1.2 units drawn:
a solid 3.8 x 7.8-unit block on the axis, 308px at 4x, not resolving into lines until about 12
units (~6% of the run, ~110ms). Fixed by starting both halves exactly at (50,41.54) and moving the
seal to a separate 2.391-unit path (`noBlade:1`, butt caps, mitred) timed to arrive at 12 units —
once the legs are clear of the vertex rather than before they exist. Strand length 203.56 -> 202.36,
so the three plough windows were recomputed by shifting every distance -1.196 and redividing.

**General rule this produced:** nothing may be drawn before the line that carries it. A corner seal
is a separate pass, never the first segment of a run.

**Residual, and honest about it.** A butt-capped 7.6-unit stroke starting at a point is 7.6 units
across by definition, and the Trefoil's two centre legs leave at only ±14° from horizontal, so the
first few units still read as a tall patch: 252px / 4.0 x 7.5 units at 1.2 drawn (down from 308px),
squarish at 4 units, elongating from 12 on. This is the floor for a centre-out start at this weight.
If it still reads as a block, the two remedies are to start each run ~2 units out along its own leg
so two separate tips diverge from the first frame with the centre filled by the same seal mechanism,
or to start at the crown, where the apex is sharp and the first ink is a narrow wedge — which is why
the one-pen row has never shown this.

**A diagnosis that was wrong, recorded so it is not repeated.** I first attributed the block to the
Trefoil's lobes closing at 30px and dropped the small-size stroke to 5.2. Flood-fill on the
rasterised 30px mark disproves it: the four enclosed ground regions survive at *every* weight from
4.6 to 7.6, so the figure never blobs. Worse, lightening measurably damaged Solomon at that size
(half-tone pixels 7% -> 23%, i.e. strokes dissolving into grey). Reverted to 7.6 for all sizes.

**Trap.** A casing path must be authored in its over-strand's direction of travel or the plough
sweeps backwards. Two of Solomon's four were reversed from the candidate sheet (it does not matter
for a static stroke, which is why it went unnoticed): `(65,35)` and `(65,65)` both needed flipping.

**Data errors found while deriving the plough windows.** Two of the two-half Trefoil's `at`
second-entries were wrong — cas0 recorded strand 0 at f=.631 where the geometry gives .763, and cas1
recorded .455 where both mirror halves reach that axial crossing at .566. Only cas0's mattered
(the old gate took the max, so its casing popped early). Both are now moot: the plough is driven
purely by the over-strand's entry and exit, and the under-strand's arrival no longer enters the
timing at all.

**Verified, not assumed.** Finished states of all three rows were rendered against the candidate
sheet's own path data — pixel-identical. A live probe confirmed strand lengths (Solomon 120.40 x4,
Trefoil 203.56 x2, one-pen 403.52) and casing lengths 13.20 against the hand-computed geometry, a
negative casing lead at all four Solomon crossings (no ink ever ahead of the pen; the old build was
+10.4 by construction), and a clean centre axis after the overlap fix.

**Tooling note.** The screenshot path re-renders the DOM and cannot hold mid-animation CSS state —
every frame comes back finished, so motion cannot be checked visually from here. `requestAnimationFrame`
is also throttled in the background frame (~5 samples over 2.4s). Verify motion numerically: sample
`getComputedStyle(...).strokeDashoffset` into an array, then write the report into `document.body`
and capture that. JS-injected `window.scrollTo` inside a capture step times out on these pages.

**The probe that actually works for static artifacts.** Clone the live `<svg>`, inline every
CSS-inherited property as an attribute (the page stylesheet does not travel with a serialised node),
serialise to a data URI, load into an `Image`, draw to a canvas and read pixels. That gives exact
ink/ground values, seam measurement, and flood-fill region counts. Two cautions learned the hard
way: a test drawn on integer pixel boundaries will never show an antialiasing seam — use the real
fractional geometry and supersample; and a canvas raster does **not** reproduce layer-compositing
artifacts, so a clean raster is not proof of a clean live render. When the raster disagrees with the
report, screenshot the user's actual view — that is what found the empty chip.

## The competitor gap audit

`guidelines/site-gap-audit.html`, read live from five primary sites, September 2026. Eighteen gaps,
each with evidence and a verdict at this firm's size.

**Rated essential:** a dated transaction track record (all five have one; we have none) · an
audience-split entry, owners versus sponsors · sector pages · a real legal and regulatory suite
rather than one line · offices with street addresses · Danish alongside English · news filed apart
from thinking · individual bio pages · owner-facing explainers · newsletter capture · long-form
case studies.

**The uncomfortable finding, and the true one:** the deficit is not design. It is that the firm has
no published deals, no photographs, no addresses and no published thinking. Every structural gap is
a content gap wearing a structure costume.

**What the site has that none of the five do:** the capital-cycle framing (all of them organise by
sector or service; none by where in the ownership cycle the client stands), readiness as the product
rather than the transaction, and the memo register.

---

## Technical traps

**The spacing scale is 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32.** There is no `--space-7`,
`-9`, `-14` or `-28`. One invalid value kills the *entire* declaration, so a single bad step
silently removes a whole grid gap or padding. This cost several rounds. Sweep for it.

**`alignSelf: start` is what makes the sticky read work.** A grid item defaults to `stretch`, which
makes it as tall as its row; a sticky element cannot move inside a box already the full height of
its track, so it silently behaves as `static`. Both columns need it. Written up at
`ui_kits/website-dev/parked/README.md`.

**Contrast failures found the hard way.** Eggshell on cream is ~1.05:1 — invisible. `--sand-dark` on
eggshell is ~2:1 — hence `--brown-ink`. Plain `--sand` on cream is ~2.4:1. Warm neutrals are for
grounds and rules; warm *text* has to be mixed into the ink.

**SVG interlace: painter's order, not masks.** Masks and filters did not render reliably. Draw each
strand whole, then redraw every over-strand across its crossing with a ground-coloured casing
beneath it. Colour must be baked per ground variant rather than inherited via `currentColor`. Core
patches take a square linecap so they fuse with their strand; casings keep a butt cap so the gap
stays the width it was computed to be.

**`getComputedStyle` hands `oklch()` back unchanged.** Parsing its digits as R, G, B produces a
plausible, entirely false hex. Resolve colour to sRGB through a canvas (`fillStyle` → `fillRect`
→ `getImageData`), with a sentinel so a refused value prints nothing rather than a fabricated one.

**A rotated sweep must be sized in `vmax`, not percent — and its ends must clear the hero.** A veil
at 300% of the hero's width, rotated onto a diagonal, stops covering when the hero is tall. Sizing
it square in `vmax` fixed that but left a second fault: at the first frame the hero's far corner
sat beyond the veil's solid end, so a hard diagonal showed for a quarter-second. The rule now: lay
out every length in `vmax` along the veil's own axis (clear, falloff, solid), and check that a
full-viewport hero — at most ±75vmax along a 50° axis — sits wholly inside the solid at the start
and wholly inside the clear at the end. Current geometry: 470×200vmax, clear 0–160, falloff
160–256, solid 256–470, travel −128 → 155vmax. Verified at seven aspect ratios from 390×844 to
2560×1080.

**Full-bleed motion moves by `transform` only.** Animating gradient stops or
`background-position` repaints the largest surface on the site every frame; the judder reads as
the design.

---

## The front page's height — reverted (September 2026)

Three changes to the hero's spacing were tried and all withdrawn at the user's instruction:
- halving the gap above the headline, first with a fixed offset, then with a 1:3 split;
- halving the bottom by shortening the hero (option A), which left the top of section 02 in view;
- two full-screen compositions for the fold (a ruled index, or the statement set low), built as a
  review sheet and deleted.

The original stands: full screen height, headline block centred, `space-20` below it. The user
reports it presents correctly in Elementor. The flush and the 0.3 / 0.45 / 0.6s rise delays predate
these changes and remain.

**Trap, kept.** A gap that is a fraction of free space must be changed as a ratio, never replaced
by a fixed length. The first attempt halved the gap only near 900px of screen height.

---

## The Solomon knot in 02 (September 2026)

**Revised to option C.** At the user's instruction the knot no longer follows the scrollbar: it
draws once on its own clock (2.12s, the sheet's timing) when half the knot is in view, then holds.
The 1px frame around it was removed; its grid cell and 22rem minimum height are kept, so nothing
moves. With the scroll link gone it breaks no motion rule, so the exception entry was taken out of
`CLAUDE.md`. The account below is the superseded option B.

### Superseded: drawn by scroll

The centre object of 02 — What we engage (formerly a red *Placeholder* label) is now the Solomon
knot, `SolomonKnot` in `ui_kits/website-dev/sections.jsx`, using the strands, 220ms offset, easing
and ploughed crossings from `guidelines/mark-animated.html`. Its progress is taken from the box's
position on screen (0 when the top is at 90% of the viewport, 1 when its centre reaches 50%) and
**only ratchets forward**: scrolling down draws it, scrolling up never un-draws it. Option B of three
— A (fully reversible) was declined as breaking *fires once, never reverses*; C (a timed draw on
arrival) was the fully conforming alternative. Recorded as a second admitted exception to the
motion register, beside the sticky column: scroll-linked, one-way, this element only. Complete at
once under reduced motion. The blade is `--bone`, the section's ground; if 02 changes ground, the
blade must follow. **The mark itself is still open** — Solomon was placed without being confirmed
over the other five candidates.

---

## The sequence of the work, parked (September 2026)

Removed from 03 — What we believe at the user's instruction, as having no use for now: the heading
*The sequence of the work does not vary*, the "Four movements" label, and the four rows (Diagnose ·
Architect · Operate · Empower). The `movements` array stays in `ui_kits/website-dev/sections.jsx`,
unused. To restore, render it after the tenets in `PhilosophySection` as the four-row ledger v1
still uses. v1 keeps the method as the artwork's own section.

---

## Notes from the desk (September 2026)

The four titles in 07 were first prefixed `TBD - Current Placeholder:`; at the user's instruction
the prefix and quotation marks were removed and the original titles restored. They remain
placeholders, unmarked on the page, tracked on the hub's *Awaiting decision* list.

---

## Cases rebuilt (September 2026)

The user found the five-beat case arc too much text and too many boxes, and the per-case pinned
column tiresome. Section 05 is now three ruled cells in a 1px-gap grid, titles only. One short
account per case (situation → the usual course → the other reading we took, the fix carrying the
weight) veils in on **hover only**, at the user's instruction, and back out on leave; the space is
held so nothing below moves. Touch screens have no hover, so on phones and tablets the accounts are
not reachable. That was flagged and the user chose hover only. The copy is invented placeholder in the user's framing. It was first labelled `TBD - Current
Placeholder`; at the user's instruction the label was removed and the cells shortened to their
content, text directly under the title. **The placeholders are therefore unmarked on the page** —
tracked only on the hub and here. It contains no figures, since a multiple cannot be invented. The intro still
promises *told without names, sums or dates*; revisit if real outcomes arrive with figures.

---

## v2 retired as a live build (September 2026)

The user asked for v2 to be removed. `ui_kits/website/` is deleted. Nothing in v1 or v3 loaded
its files, and every section component it exported (`EngageSection`, `MethodSection`, `PhaseDetail`
and the rest) also exists in v1, which is structurally identical, so the design-system bundle
loses no export on its next rebuild. Its role as the fixed point passes to `CAPIITAL Website.html`,
the self-contained export already at the root. Taken out of the hub, the Versions page and the
corner switch (now v1 · v3), and repointed in `CLAUDE.md`, both readmes, `github.md` and the parked
note. The copy of the old readme inside `_ds/` is a published snapshot and updates on republish.

---

## The front-page ground (September 2026)

**Hue — settled: step 02, hue 224.** Applied at the source in `tokens/colors.css`, so v1, v3, the
hub and every guideline card move together; the v2 record carries its own copy and keeps the old
ground. All seven chromatic tokens rotated +22° (ink 205→227, deep 203→225, sea, sea-light, mist,
haze 202→224); lightness, chroma and gradient stops untouched. The anchor now stands 34° from the
artwork's `#5A8281`. v1 is recoloured deliberately: its rule protects the artwork's language, not
its colour, and it was already on the shifted palette rather than the raw green. Readme, the
colour-shift card and both hue sheets updated; the flush sheet now reads the live tokens.

The account of the choice, kept: The client's principal finds the hero too green. Three things were found and hold:
the wash at chroma 0.031 is nearly neutral, which is why it drifts green or grey between screens;
hue is the only lever being tested (lightness, chroma, the 140° axis, three stops and the
top-left corner light all held); and the range ends on the brand book's own deep-blue hue, so no
step leaves the system. Steps at hue 202 (as built) → 213 → 224 → 235 → 246 → 257.
`guidelines/wash-blue-steps.html` is the specimen board; `guidelines/wash-blue-frontpages.html`
holds six full-height front pages, each firing its own entry once on scroll, separated by the
eggshell ground that follows the hero on v3. If the chosen hue reads too grey, chroma is the next lever — a separate sheet.

**Arrival — settled: calibration B, in service on v3.** A veil of `--sea-ink` in
`FrontPage` (`ui_kits/website-dev/sections.jsx`), 300vmax square, rotated 50°, travelling
−46% → 54% over 1.7s near-linear; falloff 30–62% of the veil. The three rising elements now carry
inline delays of 0.3 / 0.45 / 0.6s in place of `.delay-*`. The contact ground keeps the same
gradient, still. v1 unchanged. Added to the motion vocabulary in `CLAUDE.md` and the motion card as
the front page's single entry, on the condition that no travelling edge is ever visible.

The account of the choice, kept: the user asked for the gradient itself to arrive — light flushing top-left to
bottom-right as the type rises, carrying the artwork's glass reading without a drawn pane.
`guidelines/wash-flush.html` holds three calibrations (A 1.1s short falloff · B 1.7s long ·
C 2.6s longest, veil held at 62%); B is recommended. Type starts 300ms into the flush so the two
overlap. Now drawn from the live tokens, so it shows the chosen hue. **This is a larger
gesture than the motion register otherwise permits**; it passes only if no travelling edge is
ever visible. If admitted, it joins the sanctioned vocabulary as the hero's single entry, fired
once on load, finished state immediately under `prefers-reduced-motion`. **Awaiting the choice
of calibration.**

---

## Tokens added

`--sand-dark` `#A49C94` and `--brown` `#88766C` — both named in the brand book, neither present in
the tokens, so the first attempt at the user's colour request silently rendered black.
`--brown-ink` — the brown carried down into the ink, for meta text that must hold 4.5:1 on eggshell.

Where a colour is wanted and absent, add it to `tokens/colors.css` with the artwork's hex. Never
inline a value.

---

## Still needed from the client

Vector wordmark artwork · confirmation of the licensed serif and sans (Source Serif 4 and Inter are
stand-ins) · photography meeting the imagery rules · real transactions, addresses, and team detail ·
a decision on which candidate mark to take forward.
