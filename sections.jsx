const { Logo, Icon, Eyebrow, ArrowLink, SectionHeading,
  PublicationRow, PullQuote, SiteFooter,
  Button, Input, Textarea, Label,
  Reveal, RuleDraw, ScrollProgress, useActiveSection } = window.DS;

const NAV_IDS = ["services", "philosophy", "learned", "cases", "people", "papers", "contact"];

/* Section reference marks. Bracketed and faint: they are here so the pages can be followed
   while the site is being built, not as part of the finished page. Remove the wrapper and pass
   the plain string to restore a permanent eyebrow. */
const ref = (label) => (
  <span style={{ color: "color-mix(in oklab, var(--taupe) 34%, transparent)" }}>[ {label} ]</span>
);

const WRAP = { maxWidth: "var(--measure-max)", margin: "0 auto", width: "100%" };
const SECTION = { padding: "var(--section-y) var(--gutter-lg)" };

const nav = [
  { label: "What we engage", href: "#services" }, { label: "What we believe", href: "#philosophy" },
  { label: "What we learned", href: "#learned" }, { label: "Cases", href: "#cases" },
  { label: "Who we are", href: "#people" }, { label: "What we think", href: "#papers" },
  { label: "How to reach us", href: "#contact" },
];

/* 02 — four titles and nothing else until asked. The hover line is the whole explanation. */
const quadrants = [
  { numeral: "I", title: "Performance Visibility",
    line: "The measures a board can rely on, and reporting that holds up to scrutiny." },
  { numeral: "II", title: "Financial Leadership",
    line: "Senior financial judgment, for as long as it is needed and no longer." },
  { numeral: "III", title: "Transactions",
    line: "Diligence, modelling, and the questions a buyer will ask — asked earlier, by us." },
  { numeral: "IV", title: "Operational Finance",
    line: "The close, the team, the systems. Unremarkable work, done precisely." },
];

/* 03 — what we believe, stated as four positions and the sequence they produce. */
const tenets = [
  { title: "Judgment is not delegable",
    body: "Every mandate is led, executed and concluded by the principal who accepted it. There is no second team." },
  { title: "The work must outlast our presence",
    body: "An engagement that leaves a dependency behind has not finished; it has paused, and at the client's expense." },
  { title: "Candour is cheapest early",
    body: "The gap a buyer will find is better named by us, in a room of our choosing, long before they look for it." },
  { title: "What is not counted is not governed",
    body: "Not everything that matters can be measured. Rather more of it can be measured than usually is." },
];

/* Parked: the sequence of the work, removed from 03 at the user's instruction (September 2026).
   Kept here unused so it can be restored; see project-log.md. */
const movements = [
  { numeral: "I", title: "Diagnose", body: "What is measured, and what has quietly stopped being measured." },
  { numeral: "II", title: "Architect", body: "What is counted, by whom, and against what. Settled before anything is built." },
  { numeral: "III", title: "Operate", body: "Inside the cadence, until it holds without us in the room." },
  { numeral: "IV", title: "Empower", body: "The engagement ends when the discipline no longer needs us." },
];

/* 04 — what we have seen, told without a curriculum vitae. */
const observations = [
  { title: "The monthly pack says more than the forecast",
    body: "A month's reporting describes the two years ahead more accurately than the forecast filed beside it, and at a fraction of the effort." },
  { title: "Visibility comes before speed",
    body: "The work before an acceleration is almost always the same, and almost never discussed: settling what is to be counted, then counting it the same way twice." },
  { title: "The quiet quarters matter most",
    body: "Value accrues in the seasons when no one is watching. What held in the second quarter is what makes the fourth defensible." },
  { title: "Complexity outgrows its instruments",
    body: "A company seldom loses control of its business. It loses sight of it, which arrives at the same place by a longer and more expensive road." },
];

/* 05 — one short account per case: the situation, the usual course, and the other reading we
   took. The fix carries the weight. All three are placeholders until real cases are supplied. */
const cases = [
  { ref: "Case 01", sector: "Industrial manufacturing",
    text: "A second-generation manufacturer, profitable and reputable, weighing a sale the family had not yet resolved upon. The usual course would have been to tidy the accounts and accept the discount a purchaser applies to reporting of that kind. We read it the other way round: the reporting was not the weakness but the place the value lay hidden. Margin, restated by product line, showed a business worth more than its owners believed; they went to market a year later knowing what they held." },
  { ref: "Case 02", sector: "Sponsor-backed services",
    text: "A services platform ten weeks into its first institutional ownership, with a sound plan and a newly seated board. The customary answer to a plan slipping is more reporting. We did the opposite, and removed two of the three sets of figures in circulation, keeping the one the board and the operators could both read. The plan was revised twice in its first year, each time on evidence rather than instinct." },
  { ref: "Case 03", sector: "Life sciences",
    text: "A research-led company nine months from a raise, trusted for its science and doubted for its accounts. Convention would have deferred the round until a finance function had been built. We held the date and looked instead at how the company was owned: the legal and financial ownership of its intellectual property was rearranged, which settled its tax position and made it eligible for funding it had been told was out of reach. The round closed well above the range the founder had thought realistic." },
];

const publications = [
  { kind: "Market letter", date: "Q2 · 2025", title: "Rates, Rotation and the Return of Strategic Capital", read: "12 min" },
  { kind: "Sector note", date: "Q1 · 2026", title: "The Energy Transition and the Capital It Will Require", read: "9 min" },
  { kind: "Quarterly review", date: "June 2026", title: "Sponsor Activity and the Return of the Private Company", read: "18 min" },
  { kind: "Owner's letter", date: "March 2026", title: "On Selling a Business One Did Not Intend to Sell", read: "11 min" },
];

/* 06 — initials only, no photographs. Names in brown, everything beneath in sand. */
const people = [
  { name: "C.H. Tange", role: "Chief Executive", phone: "M: +45 29 48 84 17", email: "christian.tange@capiital.eu" },
  { name: "M.F. Madsen", role: "Analyst", phone: "M: +45 60 54 41 10", email: "mathias.madsen@capiital.eu" },
  { name: "J.S. Wiese", role: "Associate", phone: "M: +45 22 33 44 55", email: "jonathan.wiese@capiital.eu" },
  { name: "A.S. Trats", role: "Senior Analyst", phone: "M: +45 53 80 84 17", email: "anastasia.trats@capiital.eu" },
];

function SiteHeader({ scrolled }) {
  const active = useActiveSection(NAV_IDS);
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all var(--duration-nav) var(--ease-standard)",
      background: scrolled ? "color-mix(in oklab, var(--cream) 95%, transparent)" : "transparent",
      backdropFilter: scrolled ? "blur(var(--backdrop-blur))" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      color: scrolled ? "var(--ink)" : "var(--cream)" }}>
      <div style={{ ...WRAP, padding: "0 var(--gutter-lg)", height: "var(--nav-height)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-10)" }}>
        <a href="#top" style={{ flexShrink: 0 }}><Logo tone="current" size={17} /></a>
        <nav style={{ display: "flex", alignItems: "center", gap: "clamp(var(--space-3), 1.7vw, var(--space-8))",
          fontSize: 11, minWidth: 0, whiteSpace: "nowrap", textTransform: "uppercase",
          letterSpacing: "var(--tracking-nav)", color: "color-mix(in oklab, currentColor 80%, transparent)" }}>
          {nav.map((l) => {
            const live = active && ("#" + active) === l.href;
            return (
              <a key={l.label} href={l.href} style={{ position: "relative", paddingBottom: 4,
                color: live ? (scrolled ? "var(--taupe)" : "var(--taupe-soft)") : undefined,
                transition: "color var(--duration-fast) var(--ease-standard)" }}>
                {l.label}
                <span aria-hidden style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1,
                  background: "currentColor", transformOrigin: "left center",
                  transform: live ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform var(--duration-nav) var(--ease-rise)" }} />
              </a>
            );
          })}
        </nav>
      </div>
      <ScrollProgress tone={scrolled ? "light" : "dark"} />
    </header>
  );
}

/* 01 — the front page. The wash arrives: a veil of the darkest stop, laid on the gradient's own
   140° axis, slides off from the top-left over 1.7s and leaves the ground as it stands. Moved by
   transform alone, which the compositor carries. Every length is in vmax, measured along the veil's
   own axis: clear 0–160, falloff 160–256, solid 256–470. A full-viewport hero spans at most ±75
   along that axis, so it starts wholly inside the solid (centre 363) and ends wholly inside the
   clear (centre 80) — no hard edge ever reaches it. Fires once on load; the type rises 300ms in. */
const FLUSH_CSS = `
.front-veil{position:absolute;left:50%;top:50%;width:470vmax;height:200vmax;margin-left:-235vmax;margin-top:-100vmax;
  pointer-events:none;background:linear-gradient(to right, transparent 0 160vmax, var(--sea-ink) 256vmax, var(--sea-ink) 100%);
  transform:rotate(50deg) translateX(155vmax);animation:front-flush 1.7s cubic-bezier(.15,.12,.85,.88) both}
@keyframes front-flush{from{transform:rotate(50deg) translateX(-128vmax)}to{transform:rotate(50deg) translateX(155vmax)}}
@media (prefers-reduced-motion:reduce){.front-veil{display:none}}
`;
function FrontPage() {
  return (
    <section id="top" className="on-ink" style={{ position: "relative", minHeight: "100vh", display: "flex",
      flexDirection: "column", justifyContent: "space-between", padding: "6rem var(--gutter-lg) var(--space-12)",
      background: "var(--wash-sea)", overflow: "hidden" }}>
      <style>{FLUSH_CSS}</style>
      <div aria-hidden className="front-veil" />
      <div aria-hidden style={{ position: "absolute", inset: 0,
        background: "radial-gradient(120% 80% at 20% 0%, color-mix(in oklab, var(--mist) 22%, transparent), transparent 60%)" }} />
      <div style={{ ...WRAP, position: "relative", flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", paddingBottom: "var(--space-20)" }}>
        <h1 className="animate-rise" style={{ animationDelay: "0.3s", fontFamily: "var(--font-display)", marginTop: 0,
          fontSize: "var(--text-hero)", lineHeight: "var(--leading-hero)", letterSpacing: "var(--tracking-hero)" }}>
          Financial<br />Excellence<br />
          <span style={{ fontStyle: "italic", color: "var(--taupe-soft)" }}>for investor-grade companies</span>
        </h1>
        <p className="animate-rise" style={{ animationDelay: "0.45s", marginTop: "var(--space-10)", maxWidth: "42rem",
          fontSize: "var(--text-lg)", lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--on-ink-body)" }}>
          A trusted advisor to private equity funds, portfolio companies and ambitious businesses, Capiital creates the strategic insight and performance visibility required to unlock sustainable value and growth.
        </p>
        <div className="animate-rise" style={{ animationDelay: "0.6s", marginTop: "var(--space-12)", display: "flex",
          flexWrap: "wrap", alignItems: "center", gap: "var(--space-10)" }}>
          <ArrowLink href="#services" style={{ letterSpacing: "var(--tracking-button)" }}>What we engage</ArrowLink>
          <ArrowLink href="#learned" style={{ letterSpacing: "var(--tracking-button)" }}>What we learned</ArrowLink>
        </div>
      </div>
    </section>
  );
}

/* 02 — four quadrants carrying titles and nothing else. On hover the quadrant's ground washes,
   its one line of explanation fades up, and the other three recede: emphasis by withdrawal
   rather than by growth, which is the system's rule and the quieter gesture besides. */
/* The Solomon knot, from guidelines/mark-animated.html. It draws itself once, on its own clock,
   when the section comes into view, and then holds; scroll speed and direction play no part.
   Timing is the sheet's own: two loops, the lying one 220ms behind, each crossing ploughed by a
   ground-coloured blade as its over-strand arrives. Complete at once under reduced motion. */
const KNOT = {
  D: 1900, total: 2120,
  strands: ["M51.2,94 L35,94 L35,6 L51.2,6", "M48.8,94 L65,94 L65,6 L48.8,6",
    "M51.2,65 L6,65 L6,35 L51.2,35", "M48.8,65 L94,65 L94,35 L48.8,35"],
  sd: [0, 0, 220, 220],
  cas: [{ d: "M58.4,65 L71.6,65", s: 3, e0: .0797, e1: .1894 },
    { d: "M35,71.6 L35,58.4", s: 0, e0: .3206, e1: .4302 },
    { d: "M65,41.6 L65,28.4", s: 1, e0: .5698, e1: .6794 },
    { d: "M28.4,35 L41.6,35", s: 2, e0: .8106, e1: .9203 }],
};
const knotBez = (() => {
  const x1 = .15, y1 = .12, x2 = .85, y2 = .88;
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = s => ((ax * s + bx) * s + cx) * s, Y = s => ((ay * s + by) * s + cy) * s;
  const solve = (f, v) => { let lo = 0, hi = 1, s = v; for (let i = 0; i < 32; i++) { s = (lo + hi) / 2; if (f(s) < v) lo = s; else hi = s; } return s; };
  return { ease: x => Y(solve(X, x)), timeAt: y => X(solve(Y, y)) };
})();
const knotClamp = v => v < 0 ? 0 : v > 1 ? 1 : v;
function SolomonKnot() {
  const box = React.useRef(null);
  React.useEffect(() => {
    const root = box.current; if (!root) return;
    const strands = [...root.querySelectorAll("[data-strand]")].map(p => ({ p, L: p.getTotalLength() }));
    const cas = KNOT.cas.map((c, i) => {
      const a = KNOT.sd[c.s] + knotBez.timeAt(c.e0) * KNOT.D, b = KNOT.sd[c.s] + knotBez.timeAt(c.e1) * KNOT.D;
      const paths = [...root.querySelectorAll('[data-cas="' + i + '"]')].map(p => ({ p, L: p.getTotalLength() }));
      return { a, b, paths };
    });
    [...strands, ...cas.flatMap(c => c.paths)].forEach(o => { o.p.style.strokeDasharray = o.L; o.p.style.strokeDashoffset = o.L; });
    let raf = 0, io = null;
    const paint = p => {
      const t = p * KNOT.total;
      strands.forEach((o, i) => { o.p.style.strokeDashoffset = o.L * (1 - knotBez.ease(knotClamp((t - KNOT.sd[i]) / KNOT.D))); });
      cas.forEach(c => { const f = knotClamp((t - c.a) / (c.b - c.a)); c.paths.forEach(o => { o.p.style.strokeDashoffset = o.L * (1 - f); }); });
    };
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) { paint(1); return; }
    const play = () => {
      const t0 = performance.now();
      const step = now => { const p = knotClamp((now - t0) / KNOT.total); paint(p); if (p < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    };
    io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); play(); } }, { threshold: 0.5 });
    io.observe(root);
    return () => { if (io) io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <svg ref={box} viewBox="0 0 100 100" aria-hidden="true" style={{ width: "62%", maxWidth: "12rem", height: "auto", display: "block" }}>
      {KNOT.strands.map((d, i) => (
        <path key={i} data-strand d={d} fill="none" stroke="var(--ink)" strokeWidth="7.6"
          strokeLinejoin="miter" strokeMiterlimit="6" strokeLinecap="butt" />
      ))}
      {KNOT.cas.map((c, i) => (
        <g key={i}>
          <path data-cas={i} d={c.d} fill="none" stroke="var(--bone)" strokeWidth="12.4" strokeLinecap="butt" />
          <path data-cas={i} d={c.d} fill="none" stroke="var(--ink)" strokeWidth="7.6" strokeLinecap="square"
            strokeLinejoin="miter" strokeMiterlimit="6" />
        </g>
      ))}
    </svg>
  );
}

function ServicesSection() {
  const [live, setLive] = React.useState(null);
  return (
    <section id="services" className="on-sand" style={SECTION}>
      <div style={WRAP}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          gap: "var(--space-8)", marginBottom: "var(--space-12)" }}>
          <Reveal><SectionHeading eyebrow={ref("02 — What we engage")} lines={["Each part of the process"]} accentLine="held to one standard." size="md" /></Reveal>
          <Reveal variant="veil" step={1} style={{ maxWidth: "20rem" }}>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", textTransform: "uppercase",
              letterSpacing: "var(--tracking-caps)", color: "var(--stone)" }}>
              Rest on one for more
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div onMouseLeave={() => setLive(null)}
            style={{ display: "grid", gridTemplateColumns: "1fr minmax(14rem, 22rem) 1fr",
              gridTemplateRows: "1fr 1fr", columnGap: "var(--space-10)", rowGap: "var(--space-16)",
              alignItems: "center" }}>
            {quadrants.map((q, i) => {
              const on = live === i;
              const dim = live !== null && !on;
              const rightSide = i % 2 === 1;
              return (
                <div key={q.title} tabIndex={0}
                  onMouseEnter={() => setLive(i)} onFocus={() => setLive(i)} onBlur={() => setLive(null)}
                  style={{ position: "relative", gridColumn: rightSide ? 3 : 1,
                    gridRow: i < 2 ? 1 : 2, minHeight: "15rem",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: rightSide ? "flex-end" : "flex-start",
                    textAlign: rightSide ? "right" : "left",
                    cursor: "default", outline: "none", opacity: dim ? 0.42 : 1,
                    transition: "opacity var(--duration-nav) var(--ease-standard)" }}>
                  {/* the connector: a hairline reaching from the title toward the centre object */}
                  <span aria-hidden style={{ position: "absolute", top: "50%",
                    [rightSide ? "right" : "left"]: "100%", width: "var(--space-10)", height: 1,
                    background: "var(--taupe)", transformOrigin: rightSide ? "right center" : "left center",
                    transform: on ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform var(--duration-nav) var(--ease-rise)" }} />
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)",
                    lineHeight: 1, color: on ? "var(--taupe)" : "var(--stone)",
                    transition: "color var(--duration-nav) var(--ease-standard)" }}>{q.numeral}</span>
                  <h3 style={{ marginTop: "var(--space-5)", fontFamily: "var(--font-display)",
                    fontSize: "var(--text-4xl)", lineHeight: 1.05, letterSpacing: "var(--tracking-heading)",
                    maxWidth: "16ch", color: on ? "var(--taupe)" : "var(--ink)",
                    transition: "color var(--duration-nav) var(--ease-standard)" }}>{q.title}</h3>
                  <p style={{ margin: "var(--space-5) 0 0", maxWidth: "22rem", fontSize: "var(--text-base)",
                    lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)",
                    opacity: on ? 1 : 0, transform: on ? "none" : "translateY(8px)",
                    transition: "opacity var(--duration-settle) var(--ease-standard), transform var(--duration-settle) var(--ease-rise)" }}>
                    {q.line}
                  </p>
                </div>
              );
            })}
            {/* the centre object — the Solomon knot, drawn once as the section arrives */}
            <div style={{ gridColumn: 2, gridRow: "1 / span 2", alignSelf: "stretch",
              minHeight: "22rem", display: "grid", placeItems: "center" }}>
              <SolomonKnot />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 03 — four positions held to a rail against the pinned statement. */
function PhilosophySection() {
  return (
    <section id="philosophy" className="on-sand" style={SECTION}>
      <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-16)" }}>
        {/* the pinned statement: it holds while both groups pass it, so the four positions and
            the sequence they produce are read against the same sentence */}
        <div style={{ gridColumn: "span 4", position: "sticky",
          top: "calc(var(--nav-height) + var(--space-12))", alignSelf: "start" }}>
          <SectionHeading size="md" eyebrow={ref("03 — What we believe")} lines={["Stewardship,"]} accentLine="not sentiment." />
          <p style={{ marginTop: "var(--space-8)", maxWidth: "24rem", fontSize: "var(--text-base)",
            lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)" }}>
            We hold that the heritage upon which a company is built is its principal asset, and that legacy is a matter of stewardship rather than sentiment. What we believe follows from that, and from little else.
          </p>
        </div>
        {/* the rail: four positions, then the sequence, as one continuous ledger */}
        <div style={{ gridColumn: "6 / span 7", alignSelf: "start" }}>
          {tenets.map((t, i) => (
            <div key={t.title}>
              <RuleDraw step={i} />
              <Reveal step={i} style={{ padding: "var(--space-10) 0" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)",
                  lineHeight: 1.1, maxWidth: "24ch" }}>{t.title}</h3>
                <p style={{ margin: "var(--space-5) 0 0", maxWidth: "34rem", fontSize: "var(--text-base)",
                  lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)" }}>{t.body}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 04 — experience told sideways. A standfirst that claims nothing countable, then four
   observations set as a ledger. No years, no counts, no curriculum vitae. */
function LearnedSection() {
  return (
    <section id="learned" className="on-sand" style={SECTION}>
      <div style={WRAP}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-16)" }}>
          <Reveal style={{ gridColumn: "span 5" }}>
            <SectionHeading eyebrow={ref("04 — What we learned")} lines={["Having sat on"]} accentLine="both sides of the table." size="md" />
          </Reveal>
          <Reveal variant="veil" step={1} style={{ gridColumn: "7 / span 6", alignSelf: "end" }}>
            <p style={{ margin: 0, fontSize: "var(--text-lg)", lineHeight: "var(--leading-relaxed)",
              fontWeight: 300, color: "var(--text-body)" }}>
              We have prepared companies for scrutiny, and we have been the party applying it. The
              same small number of things holds true on both occasions. None of them is complicated,
              and none is ever dealt with as early as it could have been.
            </p>
          </Reveal>
        </div>
        <div style={{ marginTop: "var(--space-16)" }}>
          {observations.map((o, i) => (
            <div key={o.title}>
              <RuleDraw step={i}  />
              <Reveal step={i} style={{ display: "grid",
                gridTemplateColumns: "3rem minmax(12rem, 22rem) minmax(16rem, 1fr)", gap: "var(--space-8)",
                alignItems: "baseline", padding: "var(--space-10) 0" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)",
                  color: "var(--stone)" }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", lineHeight: 1.1 }}>{o.title}</h3>
                <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)",
                  fontWeight: 300, color: "var(--text-body)" }}>{o.body}</p>
              </Reveal>
            </div>
          ))}
          <div style={{ height: 1, background: "var(--border)" }} />
        </div>
      </div>
    </section>
  );
}

/* 05 — three cases as three ruled cells, titles only. The account veils in on hover and out
   again when the pointer leaves; the space it occupies is held throughout, so nothing moves. */
const CASES_CSS = `
.case-cell{background:var(--bone);padding:var(--space-10);display:flex;flex-direction:column}
.case-cell h3{transition:color var(--duration-fast) var(--ease-standard)}
.case-cell:hover h3{color:var(--taupe)}
.case-body{opacity:0;transition:opacity var(--duration-settle) var(--ease-standard)}
.case-cell:hover .case-body{opacity:1}
@media (max-width:900px){.case-grid{grid-template-columns:1fr!important;grid-auto-rows:1fr}}
@media (prefers-reduced-motion:reduce){.case-body{transition:none}}
`;
function CasesSection() {
  return (
    <section id="cases" className="on-sand" style={SECTION}>
      <style>{CASES_CSS}</style>
      <div style={WRAP}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          gap: "var(--space-8)", marginBottom: "var(--space-16)" }}>
          <Reveal><SectionHeading eyebrow={ref("05 — Cases")} lines={["Three situations,"]} accentLine="told without names." size="md" /></Reveal>
          <Reveal variant="veil" step={1} style={{ maxWidth: "24rem" }}>
            <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)",
              fontWeight: 300, color: "var(--text-body)" }}>
              The affairs of those we advise are their own. Identifying detail has been set aside;
              the situation, the finding and the remedy stand as they were.
            </p>
          </Reveal>
        </div>
        <div className="case-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 1, background: "var(--border)", border: "1px solid var(--border)" }}>
          {cases.map((c, i) => (
            <Reveal key={c.ref} step={i} className="case-cell">
              <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase",
                letterSpacing: "var(--tracking-caps)", color: "var(--brown-ink)" }}>{c.ref}</span>
              <h3 style={{ margin: "var(--space-6) 0 0", fontFamily: "var(--font-display)", fontWeight: 400,
                fontSize: "var(--text-3xl)", lineHeight: 1.08 }}>{c.sector}</h3>
              <div className="case-body" style={{ marginTop: "var(--space-6)" }}>
                <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)",
                  fontWeight: 300, color: "var(--text-body)" }}>{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 06 — four principals, initials only, no photographs. Names in brown, the rest in sand. */
function PeopleSection() {
  return (
    <section id="people" className="on-sand" style={SECTION}>
      <div style={WRAP}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-16)" }}>
          <Reveal style={{ gridColumn: "span 5" }}>
            <SectionHeading eyebrow={ref("06 — Who we are")} lines={["A house of conviction"]} accentLine="and capital." />
          </Reveal>
          <div style={{ gridColumn: "7 / span 6", display: "grid", gap: "var(--space-6)", alignSelf: "end",
            color: "var(--text-body)", fontSize: "var(--text-lg)", lineHeight: "var(--leading-relaxed)", fontWeight: 300 }}>
            <Reveal variant="veil"><p style={{ margin: 0 }}>Capiital was founded on a single principle: that disciplined judgment, free of conflict, compounds across generations.</p></Reveal>
            <Reveal variant="veil" step={1}><p style={{ margin: 0 }}>Value seldom sits within one function. It emerges between them — in what sales promises, what production can hold, what procurement concedes, and what the balance sheet is left to record.</p></Reveal>
          </div>
        </div>
        <div style={{ marginTop: "var(--space-24)" }}>
          <Reveal><RuleDraw tone="ink" /></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-12)",
            paddingTop: "var(--space-10)" }}>
            {people.map((p, i) => (
              <Reveal key={p.name} step={i} style={{ display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)",
                  lineHeight: 1.08, color: "var(--brown)" }}>{p.name}</h3>
                <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase",
                  letterSpacing: "var(--tracking-caps)", color: "var(--brown-ink)" }}>{p.role}</span>
                <span style={{ marginTop: "var(--space-3)", fontSize: "var(--text-sm)",
                  fontWeight: 300, color: "var(--brown-ink)" }}>{p.phone}</span>
                <a href={"mailto:" + p.email} style={{ fontSize: "var(--text-sm)", fontWeight: 300,
                  color: "var(--brown-ink)", borderBottom: "1px solid color-mix(in oklab, var(--brown) 45%, transparent)",
                  paddingBottom: 2, justifySelf: "start" }}>{p.email}</a>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal style={{ maxWidth: "var(--measure-quote)", margin: "var(--space-24) auto 0", textAlign: "center" }}>
          <PullQuote accent="judgment is not delegable"
            attribution="C.H. Tange" title="Chief Executive">
            The firm is built on the conviction that
          </PullQuote>
          <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--text-quiet)" }}>
            Every mandate is led, executed and concluded by the principal who accepted it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* 07 — the writing, listed as a contents page rather than displayed as cards. */
function PapersSection() {
  return (
    <section id="papers" className="on-sand" style={SECTION}>
      <div style={WRAP}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-12)",
          marginBottom: "var(--space-16)" }}>
          <div style={{ gridColumn: "span 5" }}>
            <Reveal><SectionHeading eyebrow={ref("07 — What we think")} lines={["Notes from"]} accentLine="the desk." size="md" /></Reveal>
          </div>
          <Reveal variant="veil" step={1} style={{ gridColumn: "7 / span 5", alignSelf: "end" }}>
            <p style={{ margin: 0, fontSize: "var(--text-base)",
              lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)" }}>
              Considered views on the forces at work in the capital markets, written when there is something worth saying.
            </p>
          </Reveal>
        </div>
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          {publications.map((p, i) => <Reveal key={p.title} step={i}><PublicationRow {...p} /></Reveal>)}
        </div>
        <Reveal variant="veil" style={{ marginTop: "var(--space-10)" }}><ArrowLink href="#papers">All publications</ArrowLink></Reveal>
      </div>
    </section>
  );
}

/* 08 — contact, sitting in the footer rather than as a section of its own: the invitation and
   the form run straight into the footer's own deep ground. */
function ContactFooter() {
  const [sent, setSent] = React.useState(false);
  return (
    <div id="contact">
      <section className="on-ink" style={{ ...SECTION, background: "var(--wash-sea)" }}>
        <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-16)" }}>
          <Reveal style={{ gridColumn: "span 6" }}>
            <SectionHeading size="xl" eyebrow={ref("08 — How to reach us")} lines={["The next word"]} accentLine="is yours." />
            <p style={{ marginTop: "var(--space-10)", maxWidth: "30rem", fontSize: "var(--text-lg)",
              lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--on-ink-body)" }}>
              We accept a small number of engagements each year, by introduction and by fit. If you are weighing a transaction, a recovery or a transformation, we would be glad to hear of it.
            </p>
            <a href="mailto:hello@capiital.eu" style={{ marginTop: "var(--space-10)", display: "inline-flex",
              alignItems: "center", gap: "var(--space-4)", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)",
              borderBottom: "1px solid color-mix(in oklab, var(--mist) 40%, transparent)", paddingBottom: 8 }}>
              hello@capiital.eu <Icon name="arrow-right" size={20} />
            </a>
          </Reveal>
          <Reveal step={1} style={{ gridColumn: "8 / span 5", alignSelf: "center", display: "grid", gap: "var(--space-5)" }}>
            <div>
              <Label>What you are weighing</Label>
              <Textarea rows={4} placeholder="A transaction, a recovery, a transformation" style={{ marginTop: 8 }} />
            </div>
            <div>
              <Label>Where we reply</Label>
              <Input placeholder="name@company.eu" style={{ marginTop: 8 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)" }}>
              <span style={{ fontSize: "var(--text-2xs)", color: "var(--on-ink-quiet)" }}>
                {sent ? "Received. A principal will reply." : "All engagements are governed by separate written terms."}
              </span>
              <Button variant="editorial" onClick={() => setSent(true)}>Message <span aria-hidden>→</span></Button>
            </div>
          </Reveal>
        </div>
      </section>
      <SiteFooter
        blurb="Financial excellence, quietly executed. Performance visibility for companies built to be held."
        legal="© MMXXVI Capiital · Information on this site is provided for general informational purposes only and does not constitute investment, legal, tax or accounting advice."
        columns={[
          { heading: "What we engage", links: ["Performance Visibility", "Financial Leadership", "Transactions", "Operational Finance"] },
          { heading: "The house", links: ["What we believe", "What we learned", "Cases", "Who we are"] },
          { heading: "Legal", links: ["Privacy", "Terms of engagement", "Regulatory disclosures"] },
        ]}
      />
    </div>
  );
}

function Home() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "var(--eggshell)", color: "var(--ink)" }}>
      <SiteHeader scrolled={scrolled} />
      <FrontPage />
      <ServicesSection />
      <PhilosophySection />
      <LearnedSection />
      <CasesSection />
      <PeopleSection />
      <PapersSection />
      <ContactFooter />
    </div>
  );
}

Object.assign(window, { Home, SiteHeader, FrontPage, ServicesSection, PhilosophySection,
  LearnedSection, CasesSection, PeopleSection, PapersSection, ContactFooter });
