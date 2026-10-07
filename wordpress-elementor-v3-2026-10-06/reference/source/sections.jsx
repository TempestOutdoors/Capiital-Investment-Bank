const { Logo, Icon, Eyebrow, ArrowLink, SectionHeading,
  PublicationRow, PullQuote, SiteFooter,
  Button, Input, Textarea, Label,
  Reveal, RuleDraw, ScrollProgress, useActiveSection, KnotMark } = window.DS;

const NAV_IDS = ["services", "learned", "cases", "people", "papers", "contact"];

/* Section reference marks — retired 30 September 2026 (sections are named, not numbered). Kept
   for reference only; no section calls it. Bracketed and faint: they are here so the pages can be followed
   while the site is being built, not as part of the finished page. Remove the wrapper and pass
   the plain string to restore a permanent eyebrow. */
const ref = (label) => (
  <span style={{ color: "color-mix(in oklab, var(--taupe) 34%, transparent)" }}>[ {label} ]</span>
);

const WRAP = { maxWidth: "var(--measure-max)", margin: "0 auto", width: "100%" };
const SECTION = { padding: "var(--section-y) var(--gutter-lg)" };

/* Set by the page: on the archive the section links lead back to the front page. */
const HOME = window.SITE_HOME || "", ARCHIVE = window.SITE_ARCHIVE ?? "archive.html", LEGAL = window.SITE_LEGAL ?? "legal.html";
/* In-page links scroll; they never reload. The bundled pages resolve "#id" against another base, so
   the browser would treat it as a new page: every click on "#id" is caught here and scrolled, the
   section's top meeting the header's foot. Arriving from another page with a #id, the scroll waits
   for the section to be drawn. Smooth on click, instant on arrival, never under reduced motion. */
function scrollToSection(id, smooth) {
  const el = id === "top" ? null : document.getElementById(id);
  if (id !== "top" && !el) return false;
  const nav = (document.querySelector("header") || {}).offsetHeight || 0;
  const y = el ? el.getBoundingClientRect().top + window.scrollY - nav + 1 : 0;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: Math.max(0, y), behavior: smooth && !still ? "smooth" : "auto" });
  return true;
}
function useInPageLinks() {
  React.useEffect(() => {
    const onClick = (ev) => {
      const a = ev.target.closest && ev.target.closest("a[href]");
      if (!a || ev.defaultPrevented || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
      const href = a.getAttribute("href");
      if (href.length > 1 && href[0] === "#" && scrollToSection(decodeURIComponent(href.slice(1)), true)) ev.preventDefault();
    };
    document.addEventListener("click", onClick);
    const id = decodeURIComponent(location.hash.slice(1));
    const timers = id ? [80, 450].map((t) => setTimeout(() => scrollToSection(id, false), t)) : [];
    return () => { document.removeEventListener("click", onClick); timers.forEach(clearTimeout); };
  }, []);
}
/* Language: English by default, Danish second (6 October 2026). Chosen by ?lang=, else the last choice
   kept in localStorage. L(en, da) picks the string. A switch reloads the page, as WPML's separate /da/
   pages will on the live site, and returns the reader to the same place. */
const LANG = (() => {
  let v = new URLSearchParams(location.search).get("lang");
  if (!v) { try { v = localStorage.getItem("capiital-lang"); } catch (e) {} }
  return v === "da" ? "da" : "en";
})();
document.documentElement.lang = LANG;
const L = (en, da) => (LANG === "da" ? da : en);
function setLang(v) {
  try { localStorage.setItem("capiital-lang", v); sessionStorage.setItem("capiital-lang-y", String(window.scrollY)); } catch (e) {}
  if (new URLSearchParams(location.search).has("lang")) {
    const u = new URL(location.href); u.searchParams.delete("lang"); history.replaceState(null, "", u.href);
  }
  location.reload();
}
Object.assign(window, { L, LANG, setLang });
const nav = [
  { label: L("Where we engage", "Hvor vi rådgiver"), href: "#services" },
  { label: L("What we learned", "Hvad vi har lært"), href: "#learned" }, { label: "Cases", href: "#cases" },
  { label: L("Who we are", "Hvem vi er"), href: "#people" }, { label: L("What we think", "Hvad vi mener"), href: "#papers" },
  { label: L("How to reach us", "Kontakt"), href: "#contact" },
].map((n) => ({ ...n, href: HOME + n.href }));

/* four titles and nothing else until asked. The hover line is the whole explanation. */
/* Erik's four stages, in the order of an ownership (7 October 2026, at the firm's instruction); each
   line is his own, from the artwork's stage panels. */
const quadrants = [
  { numeral: "I", title: L("Before a transaction", "Før en transaktion"),
    line: L("Whether reported performance reflects the true quality of the business, established before an investment decision is made.",
      "Om de rapporterede resultater afspejler virksomhedens reelle kvalitet, fastslået før investeringsbeslutningen træffes.") },
  { numeral: "II", title: L("After a transaction", "Efter en transaktion"),
    line: L("The insight a new owner needs to steer value creation: strategy aligned, governance strengthened, priorities made clear.",
      "Den indsigt, en ny ejer behøver for at styre værdiskabelsen: strategien afstemt, ledelsen styrket, prioriteterne gjort klare.") },
  { numeral: "III", title: L("During ownership", "Under ejerskabet"),
    line: L("Strategic control kept as the company grows faster than any one owner can oversee.",
      "Strategisk kontrol bevaret, når virksomheden vokser hurtigere, end en ejer alene kan overskue.") },
  { numeral: "IV", title: L("Before exit", "Før exit"),
    line: L("A credible equity story and a stronger negotiating position, prepared well before the process begins.",
      "En troværdig equity story og en stærkere forhandlingsposition, forberedt i god tid før processen begynder.") },
];

/* Parked: the former 03, what we believe — four positions. Not rendered. */
const tenets = [
  { title: "Judgment is not delegable",
    body: "Every mandate is led, executed and concluded by the principal who accepted it. There is no second team." },
  { title: "The work must outlast our presence",
    body: "An engagement that leaves a dependency behind has not finished; it has paused, and at the expense of those we advise." },
  { title: "Candour is cheapest early",
    body: "The gap a purchaser will find is better named by us, in a room of our choosing, long before they look for it." },
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

/* what we have seen, told without a curriculum vitae. */
const observations = [
  { title: L("The monthly pack says more than the forecast", "Månedsrapporten siger mere end prognosen"),
    body: L("A month's reporting describes the two years ahead more accurately than the forecast filed beside it, and at a fraction of the effort.",
      "En måneds rapportering beskriver de kommende to år mere præcist end prognosen, der ligger ved siden af den, og for en brøkdel af indsatsen.") },
  { title: L("The work before an acceleration does not vary", "Arbejdet før en acceleration er altid det samme"),
    body: L("Before any period of growth, the same work comes first: agreeing which figures matter, then reporting them the same way each month until they can be relied upon.",
      "Før enhver vækstperiode kommer det samme arbejde først: at blive enige om, hvilke tal der betyder noget, og derefter at rapportere dem på samme måde hver måned, indtil man kan stole på dem.") },
  { title: L("The quiet quarters matter most", "De stille kvartaler betyder mest"),
    body: L("Value accrues in the seasons when no one is watching. What held in the second quarter is what makes the fourth defensible.",
      "Værdi opbygges i de perioder, hvor ingen ser efter. Det, der holdt i andet kvartal, er det, der gør fjerde kvartal muligt at forsvare.") },
  { title: L("Complexity outgrows its instruments", "Kompleksiteten vokser fra sine instrumenter"),
    body: L("A company seldom loses control of its business. It loses sight of it, which arrives at the same place by a longer and more expensive road.",
      "En virksomhed mister sjældent kontrollen over sin forretning. Den mister overblikket, hvilket fører samme sted hen ad en længere og dyrere vej.") },
];

/* one short account per case: the situation, the usual course, and the other reading we
   took. The fix carries the weight. All three are placeholders until real cases are supplied. */
const cases = [
  { ref: "Case 01", sector: L("Industrial manufacturing", "Industriel produktion"),
    text: L("A second-generation manufacturer, profitable and reputable, weighing a sale the family had not yet resolved upon. The usual course would have been to tidy the accounts and accept the discount a purchaser applies to reporting of that kind. We read it the other way round: the reporting was not the weakness but the place the value lay hidden. Margin, restated by product line, showed a business worth more than its owners believed; they went to market a year later knowing what they held.",
      "En producent i anden generation, rentabel og velanset, der overvejede et salg, familien endnu ikke havde besluttet sig for. Den sædvanlige vej ville have været at rydde op i regnskabet og acceptere det nedslag, en køber giver for rapportering af den art. Vi læste det omvendt: rapporteringen var ikke svagheden, men stedet, hvor værdien lå skjult. Marginen, opgjort pr. produktlinje, viste en virksomhed, der var mere værd, end ejerne troede; de gik til markedet et år senere og vidste, hvad de havde.") },
  { ref: "Case 02", sector: L("Sponsor-backed services", "Kapitalfondsejet service"),
    text: L("A services platform ten weeks into its first institutional ownership, with a sound plan and a newly seated board. The customary answer to a plan slipping is more reporting. We did the opposite, and removed two of the three sets of figures in circulation, keeping the one the board and the operators could both read. The plan was revised twice in its first year, each time on evidence rather than instinct.",
      "En serviceplatform ti uger inde i sit første institutionelle ejerskab, med en sund plan og en nyudpeget bestyrelse. Det sædvanlige svar på en plan, der glider, er mere rapportering. Vi gjorde det modsatte og fjernede to af de tre sæt tal i omløb, så kun det, som både bestyrelsen og den daglige ledelse kunne læse, blev tilbage. Planen blev revideret to gange i det første år, begge gange på grundlag af fakta frem for fornemmelser.") },
  { ref: "Case 03", sector: L("Life sciences", "Life science"),
    text: L("A research-led company nine months from a raise, trusted for its science and doubted for its accounts. Convention would have deferred the round until a finance function had been built. We held the date and looked instead at how the company was owned: the legal and financial ownership of its intellectual property was rearranged, which settled its tax position and made it eligible for funding it had been told was out of reach. The round closed well above the range the founder had thought realistic.",
      "En forskningsdrevet virksomhed ni måneder fra en kapitalrejsning, med tillid til sin videnskab og tvivl om sit regnskab. Konventionen ville have udskudt runden, til en økonomifunktion var bygget op. Vi holdt fast i datoen og så i stedet på, hvordan virksomheden var ejet: det juridiske og økonomiske ejerskab af dens immaterielle rettigheder blev omlagt, hvilket afklarede dens skattemæssige stilling og gjorde den berettiget til finansiering, den havde fået at vide lå uden for rækkevidde. Runden lukkede et godt stykke over det niveau, stifteren havde anset for realistisk.") },
];

const publications = [
  { kind: L("Market letter", "Markedsbrev"), date: "Q2 · 2025", title: L("Rates, Rotation and the Return of Strategic Capital", "Renter, rotation og den strategiske kapitals tilbagekomst"), read: "12 min" },
  { kind: L("Sector note", "Sektornotat"), date: "Q1 · 2026", title: L("The Energy Transition and the Capital It Will Require", "Den grønne omstilling og den kapital, den vil kræve"), read: "9 min" },
  { kind: L("Quarterly review", "Kvartalsgennemgang"), date: L("June 2026", "Juni 2026"), title: L("Sponsor Activity and the Return of the Private Company", "Kapitalfondenes aktivitet og den private virksomheds tilbagekomst"), read: "18 min" },
  { kind: L("Owner's letter", "Ejerbrev"), date: L("March 2026", "Marts 2026"), title: L("On Selling a Business One Did Not Intend to Sell", "Om at sælge en virksomhed, man ikke havde tænkt sig at sælge"), read: "11 min" },
];

/* initials only, no photographs. Names in brown, everything beneath in sand. */
const people = [
  { name: "C.H. Tange", role: L("Chief Executive", "Administrerende direktør"), phone: "M: +45 2948 8417", email: "christian.tange@capiital.eu" },
  { name: "M.F. Madsen", role: L("Analyst", "Analytiker"), phone: "M: +45 6054 4110", email: "mathias.madsen@capiital.eu" },
  { name: "J.S. Wiese", role: "Associate", phone: "M: +45 2233 4455", email: "jonathan.wiese@capiital.eu" },
  { name: "A.S. Trats", role: L("Senior Analyst", "Senioranalytiker"), phone: "M: +45 5380 8417", email: "anastasia.trats@capiital.eu" },
  /* Two further principals: placeholders until the firm supplies their details (A13). */
  { name: "Peter", role: L("[Role]", "[Rolle]"), phone: "M: +45 [0000 0000]", email: "[name]@capiital.eu" },
  { name: "Richard", role: L("[Role]", "[Rolle]"), phone: "M: +45 [0000 0000]", email: "[name]@capiital.eu" },
];
/* Eight half-columns: four across the top, then two centred beneath the meeting points of the
   first and second pairs. Below 900px the grid is a single column. */
const PEOPLE_SPANS = ["1 / span 2", "3 / span 2", "5 / span 2", "7 / span 2", "2 / span 2", "6 / span 2"];
const PEOPLE_CSS = `@media (max-width:900px){.people-intro>*{grid-column:1 / -1!important}.people-intro{gap:var(--space-10)!important}.people-grid{grid-template-columns:1fr!important}.people-grid>*{grid-column:auto!important}}`;

/* The Logo Border fills the header at every width, and 1px more so it covers the foot hairline. The
   navigation folds into Menu from 1300px, the width below which the six links, the language switch and the border cannot share the bar. The header is 64px (56px on phones), set here so v1, which
   shares the token file, keeps its own 80px (1 October 2026). */
const HEADER_CSS = `
:root{--nav-height:4rem;--logo-border-h:calc(var(--nav-height) + 1px)}
@media (max-width:640px){:root{--nav-height:3.5rem}}
.site-menu-btn{display:none;background:none;border:0;padding:0;font:inherit;font-size:11px;text-transform:uppercase;
  letter-spacing:var(--tracking-nav);color:inherit;cursor:pointer;align-items:center;gap:var(--space-2)}
.site-menu{display:none}
@media (max-width:1300px){
  .site-nav{display:none!important}
  .site-menu-btn{display:inline-flex}
  .site-menu.is-open{display:grid;position:absolute;left:0;right:0;top:100%;background:var(--eggshell);
    border-bottom:1px solid var(--border);padding:var(--space-2) var(--gutter-lg) var(--space-6)}
  .site-menu a{padding:var(--space-4) 0;border-bottom:1px solid var(--border);font-size:var(--text-sm);
    text-transform:uppercase;letter-spacing:var(--tracking-nav)}}
`;
/* The live nav item: whichever section crosses a reading line a third of the way down the
   screen, checked on every scroll (one rAF). The earlier observer compared only the sections that
   had just changed, and passed over short ones such as What we think. At the foot of the page the
   last section holds. */
function useReadingLine(ids) {
  const [active, setActive] = React.useState(null);
  React.useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = window.innerHeight * 0.34;
      let cur = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) cur = ids[ids.length - 1];
      setActive(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    check();
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return active;
}

/* EN · DA. In the bar beside Menu; on phones, where the bar has no room, at the foot of the open menu.
   The current language is marked in the accent with a hairline beneath, as the live nav item is. */
const LANG_CSS = `.lang-in-bar{display:flex}.lang-in-menu{display:none}
@media (max-width:640px){.lang-in-bar{display:none!important}.lang-in-menu{display:flex!important;padding-top:var(--space-5)}}`;
function LangSwitch({ className }) {
  return (
    <div className={className} role="group" aria-label={L("Language", "Sprog")} style={{ alignItems: "center",
      gap: "var(--space-2)", fontSize: 11, textTransform: "uppercase", letterSpacing: "var(--tracking-nav)", flexShrink: 0 }}>
      {["en", "da"].map((v, i) => (
        <React.Fragment key={v}>
          {i > 0 && <span aria-hidden style={{ opacity: 0.5 }}>·</span>}
          <button type="button" lang={v} aria-pressed={LANG === v} aria-label={v === "en" ? "English" : "Dansk"}
            onClick={() => { if (LANG !== v) setLang(v); }}
            style={{ background: "none", border: 0, borderBottom: "1px solid " + (LANG === v ? "currentColor" : "transparent"),
              padding: "4px 0 3px", font: "inherit", letterSpacing: "inherit", textTransform: "inherit",
              color: LANG === v ? "var(--taupe)" : "inherit", cursor: LANG === v ? "default" : "pointer",
              transition: "color var(--duration-fast) var(--ease-standard)" }}>{v === "da" ? "DK" : "EN"}</button>
        </React.Fragment>
      ))}
    </div>
  );
}

/* Below 1300px the six links cannot sit beside the Logo Border, so they fold into a Menu control
   and a ruled list beneath the bar. */
function SiteHeader({ scrolled }) {
  const active = useReadingLine(NAV_IDS);
  useInPageLinks();
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    let y = null;
    try { y = sessionStorage.getItem("capiital-lang-y"); sessionStorage.removeItem("capiital-lang-y"); } catch (e) {}
    if (y) setTimeout(() => window.scrollTo(0, +y), 150);
  }, []);
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all var(--duration-nav) var(--ease-standard)",
      background: scrolled ? "color-mix(in oklab, var(--cream) 95%, transparent)" : "transparent",
      backdropFilter: scrolled ? "blur(var(--backdrop-blur))" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      color: "var(--ink)" }}>
      <style>{HEADER_CSS + LANG_CSS}</style>
      <div style={{ ...WRAP, boxSizing: "border-box", padding: "0 var(--gutter-lg)", height: "var(--nav-height)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-10)" }}>
        {/* The Logo Border, built in two layers so it melts rather than swaps: the shape fades in behind
            a single RGB mark that turns navy to white, on the header's own trigger, duration and easing.
            Header state, not an entry motion. Images set by the page's <head>. */}
        {/* Full header height. The shape (1060×200, narrowed from the master with its slant kept) runs
            to the screen's left edge through a strip of its own edge colour; the mark's left edge sits on
            the page's content margin. */}
        <a href={HOME + "#top"} aria-label="Capiital" style={{ flexShrink: 0, position: "relative", display: "block", alignSelf: "flex-start",
          height: "var(--logo-border-h)", aspectRatio: "1060 / 200", marginLeft: "calc(var(--logo-border-h) * -0.42)" }}>
          <span aria-hidden style={{ position: "absolute", top: 0, bottom: 0, right: "calc(100% - 1px)", width: "100vw",
            background: "var(--ice-pale)", opacity: scrolled ? 1 : 0, transition: "opacity var(--duration-nav) var(--ease-standard)" }} />
          <span aria-hidden className="logo-border-shape" style={{ position: "absolute", inset: 0,
            backgroundSize: "100% 100%", backgroundRepeat: "no-repeat",
            opacity: scrolled ? 1 : 0, transition: "opacity var(--duration-nav) var(--ease-standard)" }} />
          {/* One mark, never moved: it sits where the white mark sits in logo-border.png (84,64 · 805×72
              of 1060×200) and stays navy throughout; the ice shape (ice-pale → ice, 1 October 2026) arrives
              behind it. Navy on ice holds about 5.5:1. Masked from
              the 2036px original, so it stays sharp at any size. */}
          <span aria-hidden className="logo-mark" style={{ position: "absolute", left: "7.925%", top: "32%",
            width: "75.943%", height: "36%", WebkitMaskSize: "100% 100%", maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
            backgroundColor: "var(--navy)" }} />
        </a>
        <nav className="site-nav" style={{ display: "flex", alignItems: "center", gap: "clamp(var(--space-3), 1.7vw, var(--space-8))",
          fontSize: 11, minWidth: 0, whiteSpace: "nowrap", textTransform: "uppercase",
          letterSpacing: "var(--tracking-nav)", color: "color-mix(in oklab, currentColor 80%, transparent)" }}>
          {nav.map((l) => {
            const live = active && ("#" + active) === l.href;
            return (
              <a key={l.label} href={l.href} style={{ position: "relative", paddingBottom: 4,
                color: live ? "var(--taupe)" : undefined,
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
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", flexShrink: 0 }}>
          <LangSwitch className="lang-in-bar" />
          <button type="button" className="site-menu-btn" aria-expanded={open} aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}>
            {open ? L("Close", "Luk") : "Menu"} <Icon name={open ? "x" : "menu"} size={16} />
          </button>
        </div>
      </div>
      <nav id="site-menu" className={"site-menu" + (open ? " is-open" : "")} aria-label={L("Sections", "Afsnit")}>
        {nav.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}
          style={{ color: active === n.href.slice(1) ? "var(--taupe)" : "inherit" }}>{n.label}</a>)}
        <LangSwitch className="lang-in-menu" />
      </nav>
      <ScrollProgress tone="light" />
    </header>
  );
}

/* 01 — the front page. A band of skyline, blurred past recognition and toned in the sea, above a
   straight feathered edge that gives onto the page's own eggshell; the headline sits below it, in
   ink. No slope, no slanted tab, no ragged edge. The image is set by the page (.front-sky-img in
   the document head), so the component carries no path.
   The wash still arrives, and nowhere else: the same veil and geometry, now in eggshell, slides
   off the band along the 140° axis over 1.7s, so the skyline comes out of the page ground from the
   top-left. The band is smaller than the viewport, so no edge of the veil ever reaches it. Moved by
   transform alone; absent under reduced motion; the type rises 300ms in. */
const FLUSH_CSS = `
.front-sky{position:relative;height:clamp(15rem,38vh,26.25rem);overflow:hidden;background-color:var(--eggshell)}
.front-sky-img{position:absolute;inset:0;background-size:cover;background-position:center 35%;
  -webkit-mask-image:linear-gradient(to bottom,#000 70%,transparent 97%);mask-image:linear-gradient(to bottom,#000 70%,transparent 97%)}
.front-veil{position:absolute;left:50%;top:50%;width:470vmax;height:200vmax;margin-left:-235vmax;margin-top:-100vmax;
  pointer-events:none;background:linear-gradient(to right, transparent 0 160vmax, var(--eggshell) 256vmax, var(--eggshell) 100%);
  transform:rotate(50deg) translateX(155vmax);animation:front-flush var(--duration-flush) var(--ease-flush) both}
@keyframes front-flush{from{transform:rotate(50deg) translateX(-128vmax)}to{transform:rotate(50deg) translateX(155vmax)}}
@media (prefers-reduced-motion:reduce){.front-veil{display:none}}
`;
function FrontPage() {
  return (
    <section id="top" className="on-sand" style={{ position: "relative", background: "var(--eggshell)" }}>
      <style>{FLUSH_CSS}</style>
      <div aria-hidden className="front-sky"><div className="front-sky-img" /><div className="front-veil" /></div>
      <div style={{ padding: "var(--space-6) var(--gutter-lg) var(--space-20)" }}>
        <div style={WRAP}>
          <h1 className="animate-rise" style={{ animationDelay: "var(--flush-lead)", fontFamily: "var(--font-display)", margin: 0,
            fontSize: "var(--text-hero)", lineHeight: "var(--leading-hero)", letterSpacing: "var(--tracking-hero)", color: "var(--ink)" }}>
            {L("Nordic M&A advisory", "Nordisk M&A-rådgivning")}<br />
            <span style={{ fontStyle: "italic", color: "var(--taupe)" }}>{L("for companies", "for virksomheder")}<br />{L("meant to endure.", "bygget til at vare.")}</span>
          </h1>
          <p className="animate-rise" style={{ animationDelay: "calc(var(--flush-lead) + var(--stagger))", marginTop: "var(--space-10)", maxWidth: "42rem",
            fontSize: "var(--text-lg)", lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)" }}>
            {L("We advise Nordic companies and their investors, at home or abroad, on one principle: whoever accepts the mandate sees it to its end.",
              "Vi rådgiver nordiske virksomheder og deres investorer, i Norden og resten af verden, ud fra ét princip: den, der påtager sig mandatet, fører det til ende.")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* Where we engage (7 October 2026, the firm's instruction): the four stages side by side, I to IV,
   on one ruled grid. The section holds below the header for nine-tenths of a screen of scrolling
   while the stages arrive left to right, one each quarter of the way; once arrived they stay. The
   page is held, the wheel never intercepted: the track is simply taller than the stage. Off at
   900px and below, on short screens and under reduced motion, where all four simply settle in.
   Hover and focus as before: the stage turns navy, its line fades up, the others recede to 42%.
   The Solomon knot is parked (parked/knot-centre.md). */
const SVC_CSS = `
#services .svc-track.is-staged .svc-stage{position:sticky;top:var(--nav-height);padding-top:var(--space-12)}
.svc-q:focus-visible{outline:1px solid var(--ring);outline-offset:-1px}
@media (max-width:1100px){.svc-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
@media (max-width:900px){.svc-grid{grid-template-columns:1fr!important;row-gap:var(--space-12)!important}}
@media (max-width:900px),(hover:none){.svc-line{opacity:1!important;transform:none!important}.svc-q{opacity:1!important}.svc-hint{display:none!important}}
@media (prefers-reduced-motion:reduce){.svc-in,.svc-line{transition:none!important}}
`;
function useEngageStage(trackRef, stageRef, setShown) {
  React.useEffect(() => {
    const track = trackRef.current, stage = stageRef.current;
    if (!track || !stage) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    /* `best` counts only stages a reader has scrolled through. When the hold is off (narrow, short,
       reduced motion) all four are shown without counting as a pass, so a page that grows into the
       hold, as a presenting tab does a moment after load, still holds (fixed 7 October 2026). */
    let staged = false, released = false, travel = 0, raf = 0, best = 0;
    const show = (n) => { if (n > best) { best = n; setShown(n); } };
    const showAll = () => setShown(4);
    /* Once all four have arrived, the hold is given up for the rest of the visit: the extra height
       is removed while the section is out of view, and if it lies above the reader the scroll is
       moved back by the same amount in the same frame, so nothing on screen shifts. */
    const release = () => {
      const r = track.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) return;
      const above = r.bottom <= 0, before = track.offsetHeight;
      released = true; staged = false;
      track.classList.remove("is-staged"); track.style.height = "";
      if (above) window.scrollTo({ top: window.scrollY - (before - track.offsetHeight), behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    };
    const tick = () => {
      raf = 0;
      if (!staged) return;
      const nav = (document.querySelector("header") || {}).offsetHeight || 64;
      const top = track.getBoundingClientRect().top;
      if (top <= nav) show(Math.min(4, Math.floor(Math.min(1, (nav - top) / travel) * 4) + 1));
      if (best === 4) release();
    };
    const measure = () => {
      if (released) { show(4); return; }
      const nav = (document.querySelector("header") || {}).offsetHeight || 64;
      staged = window.innerWidth > 900 && !mq.matches && stage.offsetHeight + nav <= window.innerHeight;
      track.classList.toggle("is-staged", staged);
      if (!staged) { track.style.height = ""; showAll(); return; }
      travel = Math.round(window.innerHeight * 0.9);
      track.style.height = (stage.offsetHeight + travel) + "px";
      /* Already below the section: show all four and give the hold up at once. Otherwise reset to
         the stages actually reached and let the hold run. */
      if (track.getBoundingClientRect().bottom <= 0) { best = 4; setShown(4); release(); return; }
      setShown(best);
      tick();
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener && mq.addEventListener("change", measure);
    const ro = window.ResizeObserver ? new ResizeObserver(() => { if (staged) track.style.height = (stage.offsetHeight + travel) + "px"; }) : null;
    ro && ro.observe(stage);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure);
      mq.removeEventListener && mq.removeEventListener("change", measure); ro && ro.disconnect(); raf && cancelAnimationFrame(raf); };
  }, []);
}
function ServicesSection() {
  const [live, setLive] = React.useState(null);
  const [shown, setShown] = React.useState(0);
  const trackRef = React.useRef(null), stageRef = React.useRef(null);
  useEngageStage(trackRef, stageRef, setShown);
  return (
    <section id="services" data-screen-label="Where we engage" className="on-sand" style={SECTION}>
      <style>{SVC_CSS}</style>
      <div ref={trackRef} className="svc-track" style={WRAP}>
        <div ref={stageRef} className="svc-stage">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: "var(--space-8)", marginBottom: "var(--space-12)" }}>
            <Reveal><SectionHeading lines={[L("Each part of the process", "Hver del af processen")]} accentLine={L("held to one standard.", "efter samme standard.")} size="md" /></Reveal>
          </div>
          <div className="svc-grid" onMouseLeave={() => setLive(null)}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "var(--space-12) var(--space-10)" }}>
            {quadrants.map((q, i) => {
              const here = shown > i;
              const on = live === i;
              const dim = live !== null && !on;
              return (
                <div key={q.title} tabIndex={here ? 0 : -1} className="svc-q"
                  onMouseEnter={() => here && setLive(i)} onFocus={() => setLive(i)} onBlur={() => setLive(null)}
                  style={{ padding: 0,
                    display: "flex", flexDirection: "column", cursor: "default", outline: "none",
                    opacity: dim ? 0.42 : 1, transition: "opacity var(--duration-nav) var(--ease-standard)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)",
                    lineHeight: 1, color: on ? "var(--taupe)" : "var(--stone)",
                    transition: "color var(--duration-nav) var(--ease-standard)" }}>{q.numeral}</span>
                  <div className="svc-in" style={{ opacity: here ? 1 : 0, transform: here ? "none" : "translateY(14px)",
                    transition: "opacity var(--duration-settle) var(--ease-standard), transform var(--duration-settle) var(--ease-rise)" }}>
                    <h3 style={{ margin: "var(--space-5) 0 0", fontFamily: "var(--font-display)", fontWeight: 400,
                      fontSize: "var(--text-3xl)", lineHeight: 1.08, letterSpacing: "var(--tracking-heading)",
                      color: on ? "var(--taupe)" : "var(--ink)",
                      transition: "color var(--duration-nav) var(--ease-standard)" }}>{q.title}</h3>
                    {/* Image placeholder: the firm's photograph for this stage goes here (3:2, no border). */}
                    <div role="img" aria-label={L("Photograph to follow", "Fotografi følger")} style={{ marginTop: "var(--space-6)", aspectRatio: "3 / 2",
                      display: "grid", placeItems: "center", background: "color-mix(in oklab, var(--sand) 28%, var(--eggshell))", color: "var(--stone)" }}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg></div>
                    <p className="svc-line" style={{ margin: "var(--space-5) 0 0", fontSize: "var(--text-base)",
                      lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)",
                      opacity: on ? 1 : 0, transform: on ? "none" : "translateY(8px)",
                      transition: "opacity var(--duration-settle) var(--ease-standard), transform var(--duration-settle) var(--ease-rise)" }}>
                      {q.line}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Parked: the former 03, What we believe, removed from the page at the user's instruction
   (30 September 2026) and its format given to What we learned. Not rendered; kept so it can be
   restored, and because its standfirst is the canonical statement of the house register. */
function PhilosophySection() {
  return (
    <section id="philosophy" className="on-sand" style={SECTION}>
      <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-16)" }}>
        {/* the pinned statement: it holds while both groups pass it, so the four positions and
            the sequence they produce are read against the same sentence */}
        <div style={{ gridColumn: "span 4", position: "sticky",
          top: "calc(var(--nav-height) + var(--space-12))", alignSelf: "start" }}>
          <SectionHeading size="md" lines={["Stewardship,"]} accentLine="not sentiment." />
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

/* What we learned — a pinned stage (the second sanctioned exception; CLAUDE.md, Motion). When the
   section reaches the header it holds; the heading and standfirst stay fixed on the left while the
   observations on the right travel up past them at exactly the reader's scroll, and the stage lets go
   once the last row's foot is flush with the foot of the left column. The wheel is never intercepted:
   the track is simply as tall as the travel. Phones and reduced motion: both columns scroll plainly. */
const LEARNED_CSS = `
#learned.is-staged .learned-stage{position:sticky;top:var(--nav-height);padding-top:var(--space-12);box-sizing:border-box;min-height:calc(100vh - var(--nav-height))}
#learned.is-staged{padding-bottom:0!important}
#learned.is-staged + .quote-sec{padding-top:0!important}
#learned.is-staged .learned-window{overflow:hidden;
  -webkit-mask-image:linear-gradient(to bottom,transparent,#000 var(--space-6));mask-image:linear-gradient(to bottom,transparent,#000 var(--space-6))}
#learned.is-staged .learned-rail{will-change:transform}
#learned.is-leaving .learned-rail{opacity:0;transition:opacity 300ms var(--ease-standard)}
#learned.is-grid .learned-window{height:auto!important;overflow:visible;-webkit-mask-image:none;mask-image:none}
#learned.is-grid .learned-rail{transform:none!important;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:var(--space-10)}
#learned.is-grid .learned-rail h3{font-size:var(--text-2xl)!important;line-height:1.15!important}
#learned.is-grid .learned-rail>div>[data-reveal]:last-child{padding:var(--space-6) 0 var(--space-10)!important}
#learned.is-flushing .learned-rail>div{animation:learned-in var(--duration-settle) var(--ease-rise) both}
#learned.is-flushing .learned-rail>div:nth-child(2){animation-delay:var(--stagger-row,90ms)}
#learned.is-flushing .learned-rail>div:nth-child(3){animation-delay:calc(var(--stagger-row,90ms) * 2)}
#learned.is-flushing .learned-rail>div:nth-child(4){animation-delay:calc(var(--stagger-row,90ms) * 3)}
@keyframes learned-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@media (max-width:900px){#learned.is-grid .learned-rail{grid-template-columns:1fr}}
#learned [data-reveal="settle"]{transition-duration:calc(var(--duration-settle) * 1.5)}
#learned [data-reveal="draw"]{transition-duration:calc(var(--duration-draw) * 1.5)}
`;
/* The window is exactly as tall as the left column, so the stage ends where the last row ends and
   no empty strip follows it on release. Held once per page load (7 October 2026): halfway through the
   closing pause the rail veils out, the section re-forms as a 2×2 grid with the stage held where it
   stood (the scroll moved by the height removed, in the same frame), and the four settle in. From then
   on the section scrolls plainly. Arriving below the section, it is a grid at once, without the flush. */
function usePinnedStage(secRef, trackRef, pinRef, railRef, stageRef, winRef) {
  React.useEffect(() => {
    const sec = secRef.current, track = trackRef.current, pin = pinRef.current, rail = railRef.current,
      stage = stageRef.current, win = winRef.current;
    if (!sec || !track || !pin || !rail || !stage || !win) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    /* `dwell`: once the last row is flush, the stage stays still for a further 35% of a screen
       before it lets go, so the last observation can be read (7 October 2026). */
    let on = false, grid = false, leaving = false, travel = 0, dwell = 0, navH = 0, raf = 0, timer = 0;
    const toGrid = (flush) => {
      if (grid) return;
      grid = true; on = false;
      const before = stage.getBoundingClientRect().top;
      sec.classList.remove("is-staged", "is-leaving");
      sec.classList.add("is-grid");
      if (flush) sec.classList.add("is-flushing");
      rail.style.transform = "none"; track.style.height = ""; win.style.height = "";
      const after = stage.getBoundingClientRect().top;
      if (Math.abs(after - before) > 0.5) window.scrollTo({ top: window.scrollY + (after - before), behavior: "instant" });
      window.dispatchEvent(new Event("scroll"));
    };
    const measure = () => {
      if (grid) return;
      on = !still.matches && window.innerWidth > 900;
      sec.classList.toggle("is-staged", on);
      rail.style.transform = "none";
      if (!on) { track.style.height = ""; win.style.height = ""; return; }
      const probe = document.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden;height:var(--nav-height)";
      document.body.appendChild(probe); navH = probe.offsetHeight; probe.remove();
      travel = Math.max(0, rail.offsetHeight - pin.offsetHeight);
      win.style.height = pin.offsetHeight + "px";
      dwell = Math.round(window.innerHeight * 0.35);
      track.style.height = (stage.offsetHeight + travel + dwell) + "px";
      if (track.getBoundingClientRect().bottom <= 0) return toGrid(false);
      apply();
    };
    const apply = () => {
      raf = 0;
      if (!on || grid) return;
      const raw = navH - track.getBoundingClientRect().top;
      const s = Math.min(travel, Math.max(0, raw));
      rail.style.transform = "translate3d(0," + (-s).toFixed(2) + "px,0)";
      if (!leaving && raw >= travel + dwell * 0.5) {
        leaving = true;
        sec.classList.add("is-leaving");
        timer = setTimeout(() => toGrid(true), 320);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const ro = new ResizeObserver(measure);
    ro.observe(rail); ro.observe(pin);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    still.addEventListener?.("change", measure);
    measure();
    return () => { ro.disconnect(); window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure); still.removeEventListener?.("change", measure);
      if (raf) cancelAnimationFrame(raf); clearTimeout(timer); };
  }, []);
}
function LearnedSection() {
  const secRef = React.useRef(null), trackRef = React.useRef(null), pinRef = React.useRef(null), railRef = React.useRef(null),
    stageRef = React.useRef(null), winRef = React.useRef(null);
  usePinnedStage(secRef, trackRef, pinRef, railRef, stageRef, winRef);
  return (
    <section id="learned" data-screen-label="What we learned" ref={secRef} className="on-sand"
      style={{ ...SECTION, paddingBottom: "calc(var(--section-y) / 2)" }}>
      <style>{LEARNED_CSS}</style>
      <div ref={trackRef}>
        <div ref={stageRef} className="learned-stage">
          <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-16)", alignItems: "start" }}>
            <div ref={pinRef} style={{ gridColumn: "span 4" }}>
              <SectionHeading size="md" lines={[L("Having sat on", "Vi har siddet på")]} accentLine={L("both sides of the table.", "begge sider af bordet.")} />
              <p style={{ marginTop: "var(--space-8)", marginBottom: 0, maxWidth: "24rem", fontSize: "var(--text-base)",
                lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)" }}>
                {L("We have prepared companies for scrutiny, and we have been the party applying it. The same small number of things holds true on both occasions. None of them is complicated, and none is ever dealt with as early as it could have been.",
                  "Vi har forberedt virksomheder på at blive gransket, og vi har selv været den part, der gransker. De samme få ting gælder begge gange. Ingen af dem er komplicerede, og ingen af dem bliver taget op så tidligt, som de kunne.")}
              </p>
            </div>
            <div ref={winRef} className="learned-window" style={{ gridColumn: "6 / span 7" }}>
              <div ref={railRef} className="learned-rail">
                {observations.map((o, i) => (
                  <div key={o.title}>
                    <Reveal variant="draw" threshold={0} margin="0px 0px -10% 0px" style={{ height: 1, background: "var(--border)" }} />
                    <Reveal threshold={0} margin="0px 0px -10% 0px" style={{ padding: "var(--space-10) 0" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)",
                        lineHeight: 1.1, maxWidth: "24ch" }}>{o.title}</h3>
                      <p style={{ margin: "var(--space-5) 0 0", maxWidth: "34rem", fontSize: "var(--text-base)",
                        lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)" }}>{o.body}</p>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* The house's one quotation, standing on its own between What we learned and Cases. Not in the
   navigation; no heading. */
function QuoteSection() {
  return (
    <section data-screen-label="Quote" className="on-sand quote-sec" style={{ padding: "var(--space-12) var(--gutter-lg)" }}>
      <style>{".quote-sec blockquote{font-size:clamp(2.25rem,5vw,3.75rem)!important}"}</style>
      <Reveal style={{ maxWidth: "var(--measure-quote)", margin: "0 auto", textAlign: "center" }}>
        <PullQuote accent={L("judgment is not delegable", "dømmekraft ikke kan uddelegeres")}
          attribution="C.H. Tange" title={L("Chief Executive", "Administrerende direktør")}>
          {L("The firm is built on the conviction that", "Huset er bygget på den overbevisning, at")}
        </PullQuote>
        <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--text-quiet)" }}>
          {L("Every mandate is led, executed and concluded by the principal who accepted it.", "Hvert mandat ledes, udføres og afsluttes af den partner, der påtog sig det.")}
        </p>
      </Reveal>
    </section>
  );
}

/* three cases as three ruled cells, titles only. The account veils in on hover and out
   again when the pointer leaves; the space it occupies is held throughout, so nothing moves. */
const CASES_CSS = `
.case-cell{display:flex;flex-direction:column}
.case-cell h3{transition:color var(--duration-fast) var(--ease-standard)}
.case-cell:hover h3{color:var(--taupe)}
.case-body{opacity:0;transition:opacity var(--duration-settle) var(--ease-standard)}
.case-cell:hover .case-body{opacity:1}
@media (max-width:900px){.case-grid{grid-template-columns:1fr!important;grid-auto-rows:1fr}}
@media (hover:none){.case-body{opacity:1}}
@media (prefers-reduced-motion:reduce){.case-body{transition:none}}
`;
function CasesSection() {
  return (
    <section id="cases" data-screen-label="Cases" className="on-sand" style={{ ...SECTION, paddingTop: "calc(var(--section-y) / 2)" }}>
      <style>{CASES_CSS}</style>
      <div style={WRAP}>
        <div style={{ display: "grid", gap: "var(--space-6)", marginBottom: "var(--space-16)" }}>
          <Reveal><SectionHeading lines={[L("Quiet rigour.", "Stille grundighed.")]} accentLine={L("Loud results.", "Tydelige resultater.")} size="md" /></Reveal>
          <Reveal variant="veil" step={1} style={{ maxWidth: "34rem" }}>
            <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)",
              fontWeight: 300, color: "var(--text-body)" }}>
              {L("The affairs of those we advise are their own; names and identifying detail are withheld.", "Forholdene hos dem, vi rådgiver, er deres egne; navne og genkendelige detaljer er udeladt.")}
            </p>
          </Reveal>
        </div>
        <div className="case-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "var(--space-12) var(--space-10)" }}>
          {cases.map((c, i) => (
            <Reveal key={c.ref} step={i} className="case-cell">
              <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 400,
                fontSize: "var(--text-3xl)", lineHeight: 1.08 }}>{c.sector}</h3>
              {/* Image placeholder (3:2, no border). The photograph must show a kind of place or work, never the company itself. */}
              <div role="img" aria-label={L("Photograph to follow", "Fotografi følger")} style={{ marginTop: "var(--space-6)", aspectRatio: "3 / 2",
                display: "grid", placeItems: "center", background: "color-mix(in oklab, var(--sand) 28%, var(--eggshell))", color: "var(--stone)" }}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg></div>
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

/* four principals, each above a portrait placeholder until the photographs arrive (A3). */
function PeopleSection() {
  return (
    <section id="people" data-screen-label="Who we are" className="on-sand" style={SECTION}>
      <style>{PEOPLE_CSS}</style>
      <div style={WRAP}>
        <div className="people-intro" style={{ display: "grid", gap: "var(--space-6)" }}>
          <Reveal>
            <SectionHeading lines={[L("A house of conviction", "Et hus af overbevisning")]} accentLine={L("and capital.", "og kapital.")} />
          </Reveal>
          <Reveal variant="veil" step={1} style={{ maxWidth: "34rem" }}>
            <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)" }}>
              {L("An M&A house in Copenhagen, with the conviction that a transaction should end in a result both sides can be proud of.", "Et M&A-hus i København, med den overbevisning at en transaktion skal ende i et resultat, begge sider kan være stolte af.")}
            </p>
          </Reveal>
        </div>
        <div style={{ marginTop: "var(--space-24)" }}>
          <Reveal><RuleDraw tone="ink" /></Reveal>
          <style>{PEOPLE_CSS}</style>
          <div className="people-grid" style={{ display: "grid", gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
            columnGap: "var(--space-12)", rowGap: "var(--space-12)", paddingTop: "var(--space-10)" }}>
            {people.map((p, i) => (
              <Reveal key={p.name} step={i % 4} style={{ gridColumn: PEOPLE_SPANS[i], display: "grid", gap: "var(--space-4)", alignContent: "start" }}>
                {/* Portrait placeholder: never ships. Replaced by the firm's photography (A3). */}
                <div role="img" aria-label={L("Portrait of " + p.name + " to follow", "Portræt af " + p.name + " følger")} style={{ aspectRatio: "4 / 5", width: "75%",
                  marginBottom: "var(--space-4)", display: "grid", placeItems: "center",
                  background: "color-mix(in oklab, var(--sand) 28%, var(--eggshell))",
                  color: "var(--stone)" }}><svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" /></svg></div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)",
                  lineHeight: 1.08, color: "var(--brown)" }}>{p.name}</h3>
                <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase",
                  letterSpacing: "var(--tracking-caps)", color: "var(--brown-ink)" }}>{p.role}</span>
                <span style={{ marginTop: "var(--space-3)", fontSize: "var(--text-sm)",
                  fontWeight: 300, color: "var(--brown-ink)" }}>{p.phone}</span>
                <a href={"mailto:" + p.email} style={{ fontSize: "var(--text-sm)", fontWeight: 300,
                  color: "var(--brown-ink)", borderBottom: "1px solid color-mix(in oklab, var(--brown) 45%, transparent)",
                  paddingBottom: 2, justifySelf: "start", overflowWrap: "anywhere" }}>{p.email}</a>
                {/* LinkedIn addresses to follow (actions register, A12). */}
                <a href={p.linkedin || "#"} style={{ fontSize: "var(--text-sm)", fontWeight: 300,
                  color: "var(--brown-ink)", borderBottom: "1px solid color-mix(in oklab, var(--brown) 45%, transparent)",
                  paddingBottom: 2, justifySelf: "start" }}>LinkedIn</a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* the writing, listed as a contents page rather than displayed as cards. */
/* The ledger narrower (decided 7 October 2026): below 1300px the CTA goes; at 900px and below each
   row is kind and date over the title. */
const PAPERS_CSS = `
@media (min-width:901px) and (max-width:1300px){.papers-ledger a{grid-template-columns:10rem 7rem 1fr 5rem!important}.papers-ledger a>span:nth-child(5){display:none}}
@media (max-width:900px){.papers-ledger a{grid-template-columns:auto 1fr!important;column-gap:var(--space-4)!important;row-gap:var(--space-2)!important;padding:var(--space-6) 0!important}
.papers-ledger a>span:nth-child(3){grid-column:1 / -1;font-size:var(--text-xl)!important}
.papers-ledger a>span:nth-child(4),.papers-ledger a>span:nth-child(5){display:none}
.r-stack>*{grid-column:1 / -1!important}}
`;
function PapersSection() {
  return (
    <section id="papers" data-screen-label="What we think" className="on-sand" style={SECTION}>
      <style>{PAPERS_CSS}</style>
      <div style={WRAP}>
        <div className="r-stack" style={{ display: "grid", gap: "var(--space-6)",
          marginBottom: "var(--space-16)" }}>
          <div>
            <Reveal><SectionHeading lines={[L("Notes from", "Noter fra")]} accentLine={L("the desk.", "skrivebordet.")} size="md" /></Reveal>
          </div>
          <Reveal variant="veil" step={1} style={{ maxWidth: "34rem" }}>
            <p style={{ margin: 0, fontSize: "var(--text-base)",
              lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--text-body)" }}>
              {L("Letters, sector notes and quarterly reviews on Nordic transactions and the capital behind them.", "Breve, sektornotater og kvartalsgennemgange om nordiske transaktioner og kapitalen bag dem.")}
            </p>
          </Reveal>
        </div>
        <div className="papers-ledger" style={{ borderBottom: "1px solid var(--border)" }}>
          {publications.map((p, i) => <Reveal key={p.title} step={i}><PublicationRow {...p} cta={L("Read →", "Læs →")} /></Reveal>)}
        </div>
        <Reveal variant="veil" style={{ marginTop: "var(--space-10)" }}><ArrowLink href={ARCHIVE}>{L("All publications", "Alle publikationer")}</ArrowLink></Reveal>
      </div>
    </section>
  );
}

/* How to reach us and the footer, as one: a single band on the Logo Border's gradient. The
   invitation and form on the left, the link columns on the right, one hairline, then the legal line. */
const footLink = { color: "var(--ink-blue)", fontSize: "var(--text-sm)", fontWeight: 300 };
const footHead = { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)",
  color: "var(--navy)", marginBottom: "var(--space-4)" };
const FOOT_COLUMNS = [
  { heading: L("Where we engage", "Hvor vi rådgiver"), links: [[L("Before a transaction", "Før en transaktion"), "#services"], [L("After a transaction", "Efter en transaktion"), "#services"], [L("During ownership", "Under ejerskabet"), "#services"], [L("Before exit", "Før exit"), "#services"]] },
  { heading: L("The house", "Huset"), links: [[L("What we learned", "Hvad vi har lært"), "#learned"], ["Cases", "#cases"], [L("Who we are", "Hvem vi er"), "#people"], [L("What we think", "Hvad vi mener"), "#papers"], [L("Archive", "Arkiv"), ARCHIVE]] },
  { heading: L("Legal", "Juridisk"), links: [[L("Legal notice", "Juridisk information"), LEGAL + "#legal-notice"], [L("Privacy", "Privatliv"), LEGAL + "#privacy"], ["Cookies", LEGAL + "#cookies"], [L("Regulatory disclosures", "Regulatoriske oplysninger"), LEGAL + "#regulatory"]] },
];
/* On the ice ground the form's light-ground hairlines vanish (≈1.1:1); they take navy instead. */
const FOOT_ICE_CSS = `.foot-ice input,.foot-ice textarea,.foot-ice button{border-color:color-mix(in oklab,var(--navy) 42%,transparent)!important}
.foot-ice input,.foot-ice textarea{background:color-mix(in oklab,var(--cream) 55%,transparent)!important;color:var(--ink-blue)!important}
.foot-ice input::placeholder,.foot-ice textarea::placeholder{color:var(--slate)}
.foot-ice button{color:var(--ink-blue)!important}
.foot-ice input:focus,.foot-ice textarea:focus{border-color:var(--navy)!important}
.foot-ice input[aria-invalid="true"],.foot-ice textarea[aria-invalid="true"]{border-color:var(--navy)!important;box-shadow:inset 0 -1px 0 var(--navy)}
.foot-ice form{position:relative}
@media (max-width:900px){.foot-left,.foot-cols{grid-column:1 / -1!important}.foot-cols{grid-template-columns:repeat(2,minmax(0,1fr))!important;row-gap:var(--space-10)!important}
.foot-form{grid-template-columns:1fr!important}.foot-send{justify-content:flex-start!important;padding-top:0!important}}
@media (max-width:560px){.foot-cols{grid-template-columns:1fr!important}}
.foot-ice button:disabled{opacity:.55;cursor:default}`;
/* The form's messages, in the house register (copy-register.md, Form messages). Checked on send, not
   while typing; each error sits under its field and is read by screen readers. A hidden field and a
   three-second floor catch automated sending: a bot is shown "received" and nothing is sent. */
const FORM_COPY = {
  needWeighing: L("Please tell us, briefly, what you are weighing.", "Skriv venligst kort, hvad der overvejes."),
  needAddress: L("Please give an address at which we may reply.", "Angiv venligst en adresse, vi kan svare på."),
  badAddress: L("That address appears incomplete; please look at it again.", "Adressen ser ufuldstændig ud; se den venligst efter igen."),
  sending: L("Sending", "Sender"),
  sent: L("Received, with thanks. A principal will reply in person.", "Modtaget, med tak. En partner svarer personligt."),
  failed: L("The message could not be sent. Please write to contact@capiital.eu directly.", "Beskeden kunne ikke sendes. Skriv venligst direkte til contact@capiital.eu."),
  terms: L("All engagements are governed by separate written terms.", "Alle opgaver er underlagt særskilte skriftlige vilkår."),
};
const FORM_ERR = { margin: "6px 0 0", fontSize: "var(--text-2xs)", lineHeight: 1.5, color: "var(--navy)" };
function ContactFooter() {
  const [weighing, setWeighing] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [trap, setTrap] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState("idle");
  const opened = React.useRef(Date.now());
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (status === "sending" || status === "sent") return;
    const e = {};
    if (!weighing.trim()) e.weighing = FORM_COPY.needWeighing;
    if (!address.trim()) e.address = FORM_COPY.needAddress;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(address.trim())) e.address = FORM_COPY.badAddress;
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.getElementById(e.weighing ? "cf-weighing" : "cf-address");
      if (first) first.focus();
      return;
    }
    if (trap || Date.now() - opened.current < 3000) { setStatus("sent"); return; }
    setStatus("sending");
    setTimeout(() => setStatus(/formfail/.test(location.search) ? "failed" : "sent"), 800);
  };
  const line = status === "sent" ? FORM_COPY.sent : status === "failed" ? FORM_COPY.failed : FORM_COPY.terms;
  return (
    <footer id="contact" data-screen-label="How to reach us" className="foot-ice" style={{ padding: "var(--space-20) var(--gutter-lg) var(--space-10)", color: "var(--ink-blue)",
        background: "linear-gradient(90deg, var(--ice-pale), var(--ice))" }}>
      <style>{FOOT_ICE_CSS}</style>
      <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-12)" }}>
        <Reveal className="foot-left" style={{ gridColumn: "span 6", display: "grid", gap: "var(--space-6)", alignContent: "start" }}>
          <SectionHeading size="md" lines={[L("Every engagement", "Ethvert samarbejde")]} accentLine={L("begins with a letter.", "begynder med et brev.")} />
          <p style={{ margin: 0, maxWidth: "30rem", fontSize: "var(--text-base)",
            lineHeight: "var(--leading-relaxed)", fontWeight: 300, color: "var(--ink-blue)" }}>
            {L("Engagements come to us by introduction or by letter. If you are considering a sale, an acquisition, a capital raise or a succession, we would be glad to hear of it.",
              "Opgaver kommer til os gennem anbefaling eller ved brev. Står et salg, et opkøb, en kapitalrejsning eller et generationsskifte for døren, hører vi gerne om det.")}
          </p>
          <a href="mailto:contact@capiital.eu" style={{ justifySelf: "start", display: "inline-flex",
            alignItems: "center", gap: "var(--space-3)", fontFamily: "var(--font-display)", fontSize: "var(--text-xl)",
            borderBottom: "1px solid color-mix(in oklab, var(--navy) 40%, transparent)", paddingBottom: 6 }}>
            contact@capiital.eu <Icon name="arrow-right" size={18} />
          </a>
          <form className="foot-form" noValidate onSubmit={onSubmit} aria-label={L("Write to the firm", "Skriv til huset")}
            style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "var(--space-4)", maxWidth: "34rem" }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <Label htmlFor="cf-weighing">{L("What you are weighing", "Hvad der overvejes")}</Label>
              <Textarea id="cf-weighing" name="weighing" rows={2} value={weighing} disabled={status === "sent"}
                onChange={(e) => { setWeighing(e.target.value); if (errors.weighing) setErrors({ ...errors, weighing: null }); }}
                aria-invalid={!!errors.weighing} aria-describedby={errors.weighing ? "cf-weighing-err" : undefined}
                placeholder={L("A sale, an acquisition, a raise, a succession", "Et salg, et opkøb, en kapitalrejsning, et generationsskifte")} style={{ marginTop: 8 }} />
              {errors.weighing && <p id="cf-weighing-err" style={FORM_ERR}>{errors.weighing}</p>}
            </div>
            <div>
              <Label htmlFor="cf-address">{L("Where we reply", "Hvor vi svarer")}</Label>
              <Input id="cf-address" name="address" type="email" autoComplete="email" value={address} disabled={status === "sent"}
                onChange={(e) => { setAddress(e.target.value); if (errors.address) setErrors({ ...errors, address: null }); }}
                aria-invalid={!!errors.address} aria-describedby={errors.address ? "cf-address-err" : undefined}
                placeholder={L("name@company.eu", "navn@virksomhed.dk")} style={{ marginTop: 8 }} />
              {errors.address && <p id="cf-address-err" style={FORM_ERR}>{errors.address}</p>}
            </div>
            <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
              <label htmlFor="cf-website">{L("Leave this field empty", "Lad dette felt stå tomt")}</label>
              <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
            </div>
            <div className="foot-send" style={{ alignSelf: "start", paddingTop: 26, display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="editorial" disabled={status === "sending" || status === "sent"}>
                {status === "sending" ? FORM_COPY.sending : L("Message", "Send")} <span aria-hidden>→</span>
              </Button>
            </div>
            <span role="status" aria-live="polite" style={{ gridColumn: "1 / -1", fontSize: "var(--text-2xs)", color: "var(--navy)" }}>
              {line}
            </span>
          </form>
        </Reveal>
        <div className="foot-cols" style={{ gridColumn: "8 / span 5", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "var(--space-8)", alignContent: "start" }}>
          {FOOT_COLUMNS.map((c) => (
            <div key={c.heading}>
              <div style={footHead}>{c.heading}</div>
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                {c.links.map(([label, href]) => <a key={label} href={href[0] === "#" && [...NAV_IDS, "top"].includes(href.slice(1)) ? HOME + href : href} style={footLink}>{label}</a>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...WRAP, marginTop: "var(--space-16)", paddingTop: "var(--space-6)",
        borderTop: "1px solid color-mix(in oklab, var(--navy) 22%, transparent)", display: "grid", gap: "var(--space-2)",
        fontSize: "var(--text-2xs)", lineHeight: "var(--leading-relaxed)", color: "var(--navy)" }}>
        {/* From the Danish Central Business Register (CVR), 30 September 2026. No regulatory line: the
            register lists the firm as business consultancy (NACE 70.20), not a supervised entity. A11. */}
        <div>© MMXXVI Capiital ApS · Dampfærgevej 27, 2100 København Ø, {L("Denmark", "Danmark")} · CVR 42842699</div>
        <div>{L("Information on this site is provided for general informational purposes only and does not constitute investment, legal, tax or accounting advice.", "Oplysningerne på dette websted er alene af generel karakter og udgør ikke investerings-, juridisk, skattemæssig eller regnskabsmæssig rådgivning.")}</div>
      </div>
    </footer>
  );
}

function Home() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    document.title = L("Capiital · M&A Advisory", "Capiital · M&A-rådgivning");
    const md = document.querySelector('meta[name="description"]');
    if (md && LANG === "da") md.setAttribute("content", "Nordisk M&A-rådgivning for virksomheder bygget til at vare: salg, opkøb, kapitalrejsning og generationsskifte, fra den første diagnose til gennemførelsen.");
  }, []);
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
      <LearnedSection />
      <QuoteSection />
      <CasesSection />
      <PeopleSection />
      <PapersSection />
      <ContactFooter />
    </div>
  );
}

Object.assign(window, { Home, QuoteSection, SiteHeader, FrontPage, ServicesSection, PhilosophySection,
  LearnedSection, CasesSection, PeopleSection, PapersSection, ContactFooter });
