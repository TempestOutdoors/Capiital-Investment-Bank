/* The archive: every publication of What we think, as a filterable grid of cards. A card opens a
   near-full-screen reading panel over the page, which stays visible beneath an eggshell veil.
   The panel veils in (opacity only) and carries its own address (#slug), so an entry can be sent
   as a link. Entries are placeholders until the firm's own publications are supplied. */
const { Icon: ArcIcon, SectionHeading: ArcHeading, Reveal: ArcReveal } = window.DS;

const ARCHIVE_ENTRIES = [
  { slug: "specialty-chemicals", kind: "Sector note", date: "2026-09-12", sector: "Chemicals", stage: "After a transaction", read: "10 min",
    photo: "Chemical plant, exterior, daylight", title: "Specialty Chemicals and the Patience of Consolidation",
    summary: "Why the sector's mid-sized producers are better sold as platforms than as plants.",
    body: ["The specialty producers of the Nordic region are, for the most part, sound businesses with narrow customer books and long qualification cycles. A purchaser values the qualification; an owner tends to value the plant.", "It is our view that the better course is to assemble before selling: two or three complementary producers, one finance function, one account of the customer book. The premium is earned in the assembly, not in the auction."] },
  { slug: "the-third-quarter", kind: "Quarterly review", date: "2026-09-30", sector: "Across sectors", stage: "Before exit", read: "16 min",
    photo: "Harbour office, morning light", title: "The Third Quarter: Fewer Processes, Firmer Prices",
    summary: "Volumes held below the prior year; terms for prepared companies did not.",
    body: ["Fewer companies came to market in the quarter, and those that did were better prepared. Where a vendor arrived with a clean account and a settled board, terms held; where either was missing, the discount was larger than a year ago.", "We expect the pattern to persist into the new year. Preparation is no longer a refinement of price; it is increasingly the condition of a process at all."] },
  { slug: "sponsor-activity", kind: "Quarterly review", date: "2026-06-30", sector: "Sponsor-backed services", stage: "Before exit", read: "18 min",
    photo: "Boardroom table, empty, natural light", title: "Sponsor Activity and the Return of the Private Company",
    summary: "Sponsors are buying again, and buying from founders rather than from one another.",
    body: ["The secondary market between sponsors has slowed; primary acquisitions from founders and families have not. Those we advise are being approached earlier and more often than at any point in the past three years.", "An approach is not an offer. We set out what a founder should establish before the first conversation, and what may safely wait until the second."] },
  { slug: "selling-a-business", kind: "Owner's letter", date: "2026-03-18", sector: "Industrial manufacturing", stage: "Before a transaction", read: "11 min",
    photo: "Workshop floor, owner at work, side light", title: "On Selling a Business One Did Not Intend to Sell",
    summary: "An unsolicited approach, and the questions an owner should settle before answering it.",
    body: ["Most of the owners we meet did not set out to sell. A letter arrives, a figure is mentioned, and a decision that ought to take a year is asked for in a month.", "We hold that the first answer should be neither yes nor no, but a request for time; and that the time is best spent on an account of the business the owner would be content to defend."] },
  { slug: "energy-transition", kind: "Sector note", date: "2026-02-10", sector: "Energy", stage: "After a transaction", read: "9 min",
    photo: "Wind farm, offshore, overcast", title: "The Energy Transition and the Capital It Will Require",
    summary: "The capital is available; the companies able to receive it are fewer than supposed.",
    body: ["Institutional appetite for transition assets remains strong. What is scarce is the company that can absorb it: a sound order book, a finance function equal to an investor's questions, and a board prepared to share control.", "We describe the work that precedes a raise in this sector, and why it is better begun eighteen months ahead than six."] },
  { slug: "laboratory-to-ledger", kind: "Sector note", date: "2025-11-04", sector: "Life sciences", stage: "Before a transaction", read: "12 min",
    photo: "Laboratory bench, scientist at work", title: "From the Laboratory to the Ledger",
    summary: "Research-led companies are trusted for their science and doubted for their accounts.",
    body: ["An investor will accept scientific risk that it can describe. It will not accept a cost base it cannot follow. The gap between the two is where most life-science raises lose time.", "It is our view that the finance function need not be built before a round; it must only be legible. We set out what legible means in practice."] },
  { slug: "rates-and-rotation", kind: "Market letter", date: "2025-05-15", sector: "Across sectors", stage: "After a transaction", read: "12 min",
    photo: "Trading floor, empty, evening", title: "Rates, Rotation and the Return of Strategic Capital",
    summary: "As rates settle, the strategic purchaser returns, and with it a different kind of process.",
    body: ["A strategic purchaser buys for reasons a financial one does not: a customer, a capability, a territory. The process it prefers is shorter and the diligence deeper.", "We consider how an owner should prepare for a purchaser of this kind, and what it will ask that a sponsor would not."] },
  { slug: "the-second-generation", kind: "Owner's letter", date: "2025-09-22", sector: "Industrial manufacturing", stage: "During ownership", read: "14 min",
    photo: "Family-owned factory, exterior, autumn", title: "The Second Generation and the Question of Custody",
    summary: "Succession is a transaction in all but name, and deserves the same preparation.",
    body: ["Where a business passes within a family, the price is rarely the difficulty. The difficulty is the account: who is owed what, who decides, and on what terms the founder steps back.", "We hold that a succession should be prepared as a sale is prepared, with an independent account of the business and a settled governance, whether or not a purchaser is ever invited."] },
  { slug: "first-hundred-days", kind: "Sector note", date: "2025-03-06", sector: "Sponsor-backed services", stage: "During ownership", read: "8 min",
    photo: "Operations room, team in discussion", title: "The First Hundred Days of Institutional Ownership",
    summary: "What a newly acquired services company should report, and what it should stop reporting.",
    body: ["The first months under a sponsor are often spent producing reports the board does not read. The plan slips while the reporting grows.", "We describe a shorter set of measures, agreed with the board in the first fortnight, and the discipline of holding to it."] },
  { slug: "winter-letter", kind: "Market letter", date: "2024-12-10", sector: "Across sectors", stage: "Before a transaction", read: "10 min",
    photo: "Copenhagen harbour, winter, low sun", title: "A Winter Letter: Valuation After the Correction",
    summary: "The gap between what owners expect and what purchasers will pay has narrowed, though not closed.",
    body: ["Expectations formed in the years of cheap capital are slow to fade. Purchasers have adjusted; many owners have not.", "It is our view that the gap is best closed by evidence rather than negotiation: an account of the business that makes the price self-evident."] },
  { slug: "process-chemicals-carve-out", kind: "Sector note", date: "2024-10-01", sector: "Chemicals", stage: "Before exit", read: "13 min",
    photo: "Process control room, operators at desks", title: "Carving Out a Chemicals Division",
    summary: "A division sold from a group must first be shown to stand on its own.",
    body: ["A purchaser of a carved-out division buys a business that has never existed alone. Shared services, shared customers and shared people must each be accounted for before the price can be.", "We set out the order in which a separation should be prepared, and the points at which a vendor most often concedes value it need not."] },
  { slug: "clinical-stage-capital", kind: "Quarterly review", date: "2024-06-28", sector: "Life sciences", stage: "Before exit", read: "15 min",
    photo: "Research campus, exterior, spring", title: "Clinical-Stage Capital in the Nordic Market",
    summary: "Specialist investors have returned to the region, and are selective in what they fund.",
    body: ["The specialist funds that withdrew from the region have begun to return, with smaller cheques and more questions. They fund programmes, not platforms.", "We review the half-year's financings and the terms on which they were concluded."] },
];

/* Danish (stage 2, 6 October 2026): the entries keep their English values as keys for filtering;
   what is shown passes through arcT (the entry's text) and arcV (a filter value). A draft for Mathias. */
const AL = window.L || ((en) => en), ALANG = window.LANG || "en";
const ARCHIVE_DA = {
 "specialty-chemicals": {
  "photo": "Kemisk fabrik, udefra, dagslys",
  "title": "Specialkemi og konsolideringens tålmodighed",
  "summary": "Hvorfor sektorens mellemstore producenter sælges bedre som platforme end som fabrikker.",
  "body": [
   "Nordens specialproducenter er for størstedelen sunde virksomheder med en smal kundekreds og lange godkendelsesforløb. En køber værdsætter godkendelserne; en ejer værdsætter som regel fabrikken.",
   "Det er vores opfattelse, at den bedre vej er at samle før salget: to eller tre producenter, der supplerer hinanden, én økonomifunktion og ét samlet billede af kundekredsen. Præmien skabes i sammenlægningen, ikke i auktionen."
  ]
 },
 "the-third-quarter": {
  "photo": "Kontor ved havnen, morgenlys",
  "title": "Tredje kvartal: færre processer, fastere priser",
  "summary": "Antallet lå under sidste år; vilkårene for forberedte virksomheder gjorde ikke.",
  "body": [
   "Færre virksomheder kom på markedet i kvartalet, og de, der gjorde, var bedre forberedt. Hvor en sælger mødte op med et klart regnskab og en afklaret bestyrelse, holdt vilkårene; hvor et af delene manglede, var nedslaget større end for et år siden.",
   "Vi forventer, at mønsteret fortsætter ind i det nye år. Forberedelse er ikke længere en justering af prisen; den er i stigende grad forudsætningen for overhovedet at gennemføre en proces."
  ]
 },
 "sponsor-activity": {
  "photo": "Bestyrelsesbord, tomt, naturligt lys",
  "title": "Kapitalfondenes aktivitet og den private virksomheds tilbagekomst",
  "summary": "Kapitalfondene køber igen, og de køber af stiftere frem for af hinanden.",
  "body": [
   "Handlen mellem kapitalfonde er aftaget; de direkte opkøb fra stiftere og familier er ikke. Dem, vi rådgiver, bliver kontaktet tidligere og oftere end på noget tidspunkt i de seneste tre år.",
   "En henvendelse er ikke et tilbud. Vi gennemgår, hvad en stifter bør have afklaret før den første samtale, og hvad der roligt kan vente til den anden."
  ]
 },
 "selling-a-business": {
  "photo": "Værkstedsgulv, ejer i arbejde, sidelys",
  "title": "Om at sælge en virksomhed, man ikke havde tænkt sig at sælge",
  "summary": "En uopfordret henvendelse, og de spørgsmål en ejer bør afklare, før der svares.",
  "body": [
   "De fleste ejere, vi møder, havde ikke sat sig for at sælge. Et brev ankommer, et beløb bliver nævnt, og en beslutning, der burde tage et år, forventes truffet på en måned.",
   "Vi mener, at det første svar hverken bør være ja eller nej, men en anmodning om tid; og at tiden bedst bruges på et billede af virksomheden, som ejeren vil være tryg ved at forsvare."
  ]
 },
 "energy-transition": {
  "photo": "Havvindmøllepark, overskyet",
  "title": "Den grønne omstilling og den kapital, den vil kræve",
  "summary": "Kapitalen er til stede; de virksomheder, der kan tage imod den, er færre end antaget.",
  "body": [
   "Den institutionelle interesse for omstillingsaktiver er fortsat stærk. Det, der er knapt, er virksomheden, der kan rumme den: en sund ordrebog, en økonomifunktion, der kan svare på en investors spørgsmål, og en bestyrelse, der er parat til at dele kontrollen.",
   "Vi beskriver det arbejde, der går forud for en kapitalrejsning i sektoren, og hvorfor det med fordel begyndes atten måneder før frem for seks."
  ]
 },
 "laboratory-to-ledger": {
  "photo": "Laboratoriebord, forsker i arbejde",
  "title": "Fra laboratoriet til regnskabet",
  "summary": "Forskningsdrevne virksomheder har tillid for deres videnskab og mødes med tvivl om deres regnskab.",
  "body": [
   "En investor accepterer en videnskabelig risiko, den kan beskrive. Den accepterer ikke en omkostningsbase, den ikke kan følge. Afstanden mellem de to er der, hvor de fleste kapitalrejsninger i life science taber tid.",
   "Det er vores opfattelse, at økonomifunktionen ikke behøver at være bygget før en runde; den skal blot være til at læse. Vi beskriver, hvad det betyder i praksis."
  ]
 },
 "rates-and-rotation": {
  "photo": "Handelsgulv, tomt, aften",
  "title": "Renter, rotation og den strategiske kapitals tilbagekomst",
  "summary": "Når renterne falder til ro, vender den strategiske køber tilbage, og med den en anden slags proces.",
  "body": [
   "En strategisk køber køber af grunde, en finansiel køber ikke har: en kunde, en kompetence, et marked. Den foretrukne proces er kortere, og due diligence går dybere.",
   "Vi ser på, hvordan en ejer bør forberede sig på en køber af denne art, og hvad den vil spørge om, som en kapitalfond ikke ville."
  ]
 },
 "the-second-generation": {
  "photo": "Familieejet fabrik, udefra, efterår",
  "title": "Anden generation og spørgsmålet om forvaltning",
  "summary": "Et generationsskifte er en transaktion i alt undtagen navnet og fortjener samme forberedelse.",
  "body": [
   "Når en virksomhed går videre inden for en familie, er prisen sjældent det svære. Det svære er opgørelsen: hvem har krav på hvad, hvem træffer beslutningerne, og på hvilke vilkår træder stifteren tilbage.",
   "Vi mener, at et generationsskifte bør forberedes, som et salg forberedes, med en uafhængig gennemgang af virksomheden og en afklaret ledelsesstruktur, uanset om en køber nogensinde bliver inviteret."
  ]
 },
 "first-hundred-days": {
  "photo": "Driftslokale, team i drøftelse",
  "title": "De første hundrede dage under institutionelt ejerskab",
  "summary": "Hvad en nyopkøbt servicevirksomhed bør rapportere, og hvad den bør holde op med at rapportere.",
  "body": [
   "De første måneder under en kapitalfond går ofte med at udarbejde rapporter, bestyrelsen ikke læser. Planen glider, mens rapporteringen vokser.",
   "Vi beskriver et kortere sæt nøgletal, aftalt med bestyrelsen i de første fjorten dage, og disciplinen i at holde fast i det."
  ]
 },
 "winter-letter": {
  "photo": "Københavns havn, vinter, lav sol",
  "title": "Et vinterbrev: værdiansættelse efter korrektionen",
  "summary": "Afstanden mellem det, ejere forventer, og det, købere vil betale, er blevet mindre, men ikke lukket.",
  "body": [
   "Forventninger dannet i årene med billig kapital forsvinder langsomt. Køberne har tilpasset sig; mange ejere har ikke.",
   "Det er vores opfattelse, at afstanden bedst lukkes med dokumentation frem for forhandling: et billede af virksomheden, der gør prisen selvindlysende."
  ]
 },
 "process-chemicals-carve-out": {
  "photo": "Kontrolrum, operatører ved pultene",
  "title": "Udskillelse af en kemidivision",
  "summary": "En division, der sælges ud af en koncern, skal først vises at kunne stå alene.",
  "body": [
   "En køber af en udskilt division køber en virksomhed, der aldrig har eksisteret for sig selv. Fælles funktioner, fælles kunder og fælles medarbejdere skal hver især gøres op, før prisen kan.",
   "Vi beskriver, i hvilken rækkefølge en udskillelse bør forberedes, og de steder, hvor en sælger oftest afgiver værdi, den ikke behøvede."
  ]
 },
 "clinical-stage-capital": {
  "photo": "Forskningscampus, udefra, forår",
  "title": "Kapital til klinisk fase på det nordiske marked",
  "summary": "Specialiserede investorer er vendt tilbage til regionen og er selektive med, hvad de finansierer.",
  "body": [
   "De specialiserede fonde, der trak sig ud af regionen, er begyndt at vende tilbage, med mindre beløb og flere spørgsmål. De finansierer programmer, ikke platforme.",
   "Vi gennemgår halvårets finansieringsrunder og de vilkår, de blev indgået på."
  ]
 }
};
const ARC_VALUES_DA = { "Sector note": "Sektornotat", "Quarterly review": "Kvartalsgennemgang", "Owner's letter": "Ejerbrev",
  "Market letter": "Markedsbrev", "Chemicals": "Kemi", "Across sectors": "Tværgående", "Sponsor-backed services": "Kapitalfondsejet service",
  "Industrial manufacturing": "Industriel produktion", "Energy": "Energi", "Life sciences": "Life science",
  "Before a transaction": "Før en transaktion", "After a transaction": "Efter en transaktion", "During ownership": "Under ejerskabet", "Before exit": "Før exit" };
const arcV = (v) => (ALANG === "da" && ARC_VALUES_DA[v]) || v;
const arcT = (e, k) => (ALANG === "da" && ARCHIVE_DA[e.slug] && ARCHIVE_DA[e.slug][k]) || e[k];

const ARC_GROUPS = [
  { key: "kind", label: AL("Type", "Type") }, { key: "sector", label: AL("Sector", "Sektor") },
  { key: "stage", label: AL("Stage", "Fase"), order: ["Before a transaction", "After a transaction", "During ownership", "Before exit"] },
  { key: "year", label: AL("Year", "År") },
];
const ARC_SORTS = [["new", AL("Newest", "Nyeste")], ["old", AL("Oldest", "Ældste")], ["az", "A–Å"], ["za", "Å–A"]].map(([k, v]) => [k, ALANG === "da" ? v : v.replace("Å", "Z")]);
const arcYear = (e) => e.date.slice(0, 4);
const arcDate = (e) => new Date(e.date + "T12:00:00").toLocaleDateString(ALANG === "da" ? "da-DK" : "en-GB", { month: "long", year: "numeric" }).replace(/^./, (c) => c.toUpperCase());
const arcValue = (e, k) => (k === "year" ? arcYear(e) : e[k]);
const arcOptions = (g) => {
  const vals = [...new Set(ARCHIVE_ENTRIES.map((e) => arcValue(e, g.key)))];
  if (g.order) return g.order.filter((v) => vals.includes(v));
  return g.key === "year" ? vals.sort().reverse() : vals.sort((a, b) => (a === "Across sectors") - (b === "Across sectors") || arcV(a).localeCompare(arcV(b), ALANG));
};

const ARCHIVE_CSS = `
.arc-toggle{background:none;border:0;padding:6px 0;font:inherit;font-size:11px;text-transform:uppercase;letter-spacing:var(--tracking-nav);
  color:var(--muted-foreground);cursor:pointer;border-bottom:1px solid transparent;transition:color var(--duration-fast) var(--ease-standard),border-color var(--duration-fast) var(--ease-standard)}
.arc-toggle:hover{color:var(--ink)}
.arc-toggle[aria-pressed="true"]{color:var(--navy);border-bottom-color:var(--navy)}
.arc-toggle:focus-visible,.arc-close:focus-visible{outline:1px solid var(--ring);outline-offset:2px}
.arc-card:focus-visible{outline-color:var(--ring)}
.arc-bar{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:var(--space-4) var(--space-10);padding:var(--space-4) 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.arc-menus{display:flex;flex-wrap:wrap;gap:var(--space-2) var(--space-10)}
.arc-menu{position:relative}
.arc-menu-btn{background:none;border:0;padding:6px 0;font:inherit;font-size:11px;text-transform:uppercase;letter-spacing:var(--tracking-nav);color:var(--ink);cursor:pointer;display:inline-flex;align-items:center;gap:var(--space-2)}
.arc-menu-btn:hover,.arc-menu-btn[aria-expanded="true"]{color:var(--navy)}
.arc-menu-btn svg{transition:transform var(--duration-fast) var(--ease-standard)}
.arc-menu-btn[aria-expanded="true"] svg{transform:rotate(180deg)}
.arc-menu-btn:focus-visible,.arc-opt:focus-visible{outline:1px solid var(--ring);outline-offset:2px}
.arc-pop{position:absolute;top:calc(100% + var(--space-2));left:0;z-index:20;min-width:15rem;background:var(--cream);padding:var(--space-2) 0}
.arc-menu.is-end .arc-pop{left:auto;right:0}
.arc-opt{all:unset;box-sizing:border-box;width:100%;display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2) var(--space-5);font-size:var(--text-sm);color:var(--ink);cursor:pointer}
.arc-opt:hover{background:var(--eggshell);color:var(--navy)}
.arc-box{width:14px;height:14px;flex-shrink:0;border:1px solid var(--stone);display:grid;place-items:center}
.arc-box.is-radio{border-radius:50%}
.arc-opt[aria-checked="true"] .arc-box{border-color:var(--navy);background:var(--navy);color:var(--cream)}
.arc-opt[aria-checked="true"] .arc-box.is-radio{background:none;box-shadow:inset 0 0 0 3px var(--cream),inset 0 0 0 7px var(--navy)}
.arc-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:var(--space-6)}
.arc-card{all:unset;box-sizing:border-box;position:relative;display:block;overflow:hidden;background:var(--cream);cursor:pointer}
.arc-info{position:absolute;left:0;right:0;bottom:0;display:grid;gap:var(--space-2);padding:var(--space-5);
  background:color-mix(in oklab,var(--ice) 78%,transparent);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);color:var(--ink-blue);opacity:0;transition:opacity var(--duration-veil,600ms) var(--ease-standard)}
.arc-card:hover .arc-info,.arc-card:focus-visible .arc-info{opacity:1}
@media (hover:none){.arc-info{position:static;opacity:1}}
.arc-veil{position:fixed;inset:0;z-index:100;background:color-mix(in oklab,var(--eggshell) 85%,transparent);opacity:0;transition:opacity 420ms var(--ease-standard)}
.arc-veil.is-in{opacity:1}
.arc-panel{position:absolute;top:4vh;bottom:4vh;left:0;right:0;margin:0 auto;width:min(92vw,1320px);background:var(--cream);overflow:auto;overscroll-behavior:contain}
.arc-close{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:var(--space-2);font-size:11px;text-transform:uppercase;letter-spacing:var(--tracking-nav);color:var(--ink)}
.arc-close:hover{color:var(--navy)}
.arc-detail{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--space-12);padding:var(--space-10) var(--space-12) var(--space-16)}
@media (max-width:1280px){.arc-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
@media (max-width:900px){.arc-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.arc-detail{grid-template-columns:1fr;gap:var(--space-8);padding:var(--space-6)}.arc-detail>*{grid-column:auto!important}}
@media (max-width:560px){.arc-grid{grid-template-columns:1fr}.arc-panel{top:0;bottom:0;width:100vw;border:0}}
@media (prefers-reduced-motion:reduce){.arc-veil,.arc-info{transition:none}}
`;

const CAMERA_PATH = <><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path><circle cx="12" cy="13" r="3"></circle></>;

/* Photograph placeholder: never ships. The caption names the photograph wanted (A3). */
function ArcPhoto({ entry, ratio = "4 / 5", large }) {
  if (entry.img) return <img src={entry.img} alt={arcT(entry, "photo")} style={{ display: "block", width: "100%", aspectRatio: ratio, objectFit: "cover" }} />;
  return (
    <div role="img" aria-label={AL("Photograph to follow: ", "Fotografi følger: ") + arcT(entry, "photo")} style={{ aspectRatio: ratio, position: "relative",
      display: "grid", placeItems: "center", background: "color-mix(in oklab, var(--sand) 28%, var(--eggshell))",
      color: "var(--stone)" }}>
      <svg aria-hidden="true" width={large ? 30 : 22} height={large ? 30 : 22} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">{CAMERA_PATH}</svg>
      <span style={{ position: "absolute", left: "var(--space-4)", top: "var(--space-3)", right: "var(--space-4)",
        fontSize: "var(--text-2xs)", lineHeight: 1.4, color: "var(--stone)" }}>{arcT(entry, "photo")}</span>
    </div>
  );
}

const arcCaps = { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--muted-foreground)" };

/* The photograph alone at rest; the particulars veil in over its foot on hover or focus, on a
   band of the skyline's ice at 78% over a 12px blur; ink on ice holds about 9:1. On
   touch screens, which cannot hover, they sit beneath the photograph throughout. */
function ArcCard({ entry, onOpen }) {
  const onNavy = { fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--navy)" };
  return (
    <button type="button" className="arc-card" onClick={(ev) => onOpen(entry.slug, ev.currentTarget)} aria-haspopup="dialog" aria-label={arcT(entry, "title")}>
      <ArcPhoto entry={entry} />
      <div className="arc-info" aria-hidden="true">
        <div style={onNavy}>{arcV(entry.kind)} · {arcDate(entry)}</div>
        <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "var(--text-lg)",
          lineHeight: 1.2, color: "var(--ink-blue)", textWrap: "pretty" }}>{arcT(entry, "title")}</h3>
        <p style={{ margin: 0, fontSize: "var(--text-xs)", lineHeight: 1.5, fontWeight: 400, color: "var(--ink-blue)" }}>{arcT(entry, "summary")}</p>
        <div style={onNavy}>{arcV(entry.sector)}</div>
      </div>
    </button>
  );
}

const ARC_CHEVRON = <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>;
const ARC_TICK = <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>;

/* A dropdown: several choices for a filter (checkboxes), one for the order (radios). */
function ArcMenu({ id, label, options, selected, onPick, single, end, openId, setOpenId }) {
  const open = openId === id;
  const count = single ? "" : selected.length ? " (" + selected.length + ")" : "";
  return (
    <div className={"arc-menu" + (end ? " is-end" : "")} data-arc-menu>
      <button type="button" className="arc-menu-btn" aria-haspopup="true" aria-expanded={open}
        onClick={() => setOpenId(open ? null : id)}>{label}{count} {ARC_CHEVRON}</button>
      {open && (
        <div className="arc-pop" role={single ? "radiogroup" : "group"} aria-label={label}>
          {options.map(([v, text]) => {
            const on = selected.includes(v);
            return (
              <button key={v} type="button" className="arc-opt" role={single ? "radio" : "checkbox"} aria-checked={on}
                onClick={() => { onPick(v); if (single) setOpenId(null); }}>
                <span className={"arc-box" + (single ? " is-radio" : "")}>{!single && on ? ARC_TICK : null}</span>{text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ArcPanel({ entry, onClose }) {
  const [shown, setShown] = React.useState(false);
  const closeRef = React.useRef(null);
  React.useEffect(() => {
    const raf = setTimeout(() => setShown(true), 20);
    closeRef.current && closeRef.current.focus({ preventScroll: true });
    /* Escape closes; Tab is kept within the panel while it is open (decided 7 October 2026). */
    const key = (ev) => {
      if (ev.key === "Escape") return onClose();
      if (ev.key !== "Tab") return;
      const panel = document.querySelector(".arc-panel");
      if (!panel) return;
      const f = [...panel.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (ev.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) { ev.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", key);
    return () => { clearTimeout(raf); window.removeEventListener("keydown", key); };
  }, []);
  const meta = [[AL("Type", "Type"), arcV(entry.kind)], [AL("Sector", "Sektor"), arcV(entry.sector)], [AL("Stage", "Fase"), arcV(entry.stage)],
    [AL("Published", "Udgivet"), arcDate(entry)], [AL("Reading time", "Læsetid"), entry.read]];
  return (
    <div className={"arc-veil" + (shown ? " is-in" : "")} onMouseDown={(ev) => { if (ev.target === ev.currentTarget) onClose(); }}>
      <div className="arc-panel" role="dialog" aria-modal="true" aria-labelledby="arc-title">
        <div style={{ position: "sticky", top: 0, zIndex: 1, background: "var(--cream)", borderBottom: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-6)", padding: "var(--space-5) var(--space-12)" }}>
          <span style={arcCaps}>{arcV(entry.kind)} · {arcDate(entry)}</span>
          <button ref={closeRef} type="button" className="arc-close" onClick={onClose}>{AL("Close", "Luk")} <ArcIcon name="x" size={16} /></button>
        </div>
        <div className="arc-detail">
          <div style={{ gridColumn: "span 7" }}><ArcPhoto entry={entry} ratio="4 / 3" large /></div>
          <div style={{ gridColumn: "span 5", display: "grid", gap: "var(--space-6)", alignContent: "start" }}>
            <h2 id="arc-title" style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "var(--text-5xl)",
              lineHeight: 1.06, letterSpacing: "-0.015em", color: "var(--ink)", textWrap: "balance" }}>{arcT(entry, "title")}</h2>
            <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", lineHeight: 1.4, color: "var(--navy)", textWrap: "pretty" }}>{arcT(entry, "summary")}</p>
            {arcT(entry, "body").map((t, i) => <p key={i} style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)",
              fontWeight: 300, color: "var(--text-body)", textWrap: "pretty" }}>{t}</p>)}
            <dl style={{ margin: "var(--space-4) 0 0", borderTop: "1px solid var(--border)" }}>
              {meta.map(([k, v]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "9rem minmax(0,1fr)", gap: "var(--space-4)",
                  padding: "var(--space-3) 0", borderBottom: "1px solid var(--border)" }}>
                  <dt style={arcCaps}>{k}</dt><dd style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--ink)" }}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function Archive() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => { document.title = AL("Capiital · The archive", "Capiital · Arkivet"); }, []);
  const [filters, setFilters] = React.useState({ kind: [], sector: [], stage: [], year: [] });
  const [sort, setSort] = React.useState("new");
  const [open, setOpen] = React.useState(() => {
    const s = decodeURIComponent(location.hash.slice(1));
    return ARCHIVE_ENTRIES.some((e) => e.slug === s) ? s : null;
  });
  const returnTo = React.useRef(null);
  const [menu, setMenu] = React.useState(null);
  React.useEffect(() => {
    if (!menu) return;
    const away = (ev) => { if (!ev.target.closest("[data-arc-menu]")) setMenu(null); };
    const key = (ev) => { if (ev.key === "Escape") setMenu(null); };
    document.addEventListener("mousedown", away);
    window.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", away); window.removeEventListener("keydown", key); };
  }, [menu]);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  React.useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    history.replaceState(null, "", location.pathname + location.search + (open ? "#" + open : ""));
  }, [open]);
  const openEntry = (slug, el) => { returnTo.current = el; setOpen(slug); };
  const closeEntry = () => { setOpen(null); returnTo.current && returnTo.current.focus({ preventScroll: true }); };
  const toggle = (k, v) => setFilters((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));
  const active = Object.values(filters).some((a) => a.length);
  const list = ARCHIVE_ENTRIES
    .filter((e) => ARC_GROUPS.every((g) => !filters[g.key].length || filters[g.key].includes(arcValue(e, g.key))))
    .sort((a, b) => sort === "new" ? b.date.localeCompare(a.date) : sort === "old" ? a.date.localeCompare(b.date)
      : sort === "az" ? arcT(a, "title").localeCompare(arcT(b, "title"), ALANG) : arcT(b, "title").localeCompare(arcT(a, "title"), ALANG));
  const current = ARCHIVE_ENTRIES.find((e) => e.slug === open);
  return (
    <div style={{ minHeight: "100vh", background: "var(--eggshell)", color: "var(--ink)" }}>
      <style>{ARCHIVE_CSS}</style>
      <SiteHeader scrolled={scrolled} />
      <main data-screen-label="Archive" style={{ padding: "calc(var(--nav-height) + var(--space-20)) var(--gutter-lg) var(--section-y)" }}>
        <div style={{ ...{ maxWidth: "var(--measure-max)", margin: "0 auto", width: "100%" } }}>
          <ArcReveal variant="veil" style={{ display: "grid", gap: "var(--space-6)" }}>
            <div><ArcHeading size="md" lines={[AL("What we think,", "Hvad vi mener,")]} accentLine={AL("in full.", "i sin helhed.")} /></div>
            <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)",
              fontWeight: 300, color: "var(--text-body)", maxWidth: "34rem" }}>
              {AL("Every letter, note and review the house has published, arranged by type, sector, stage of engagement and year.",
                "Alle breve, notater og gennemgange, huset har udgivet, ordnet efter type, sektor, fase og år.")}
            </p>
          </ArcReveal>
          <div style={{ marginTop: "var(--space-16)" }}>
            <div className="arc-bar" role="group" aria-label={AL("Filter and order the archive", "Filtrér og sortér arkivet")}>
              <div className="arc-menus">
                {ARC_GROUPS.map((g) => (
                  <ArcMenu key={g.key} id={g.key} label={g.label} options={arcOptions(g).map((v) => [v, arcV(v)])}
                    selected={filters[g.key]} onPick={(v) => toggle(g.key, v)} openId={menu} setOpenId={setMenu} />
                ))}
              </div>
              <ArcMenu id="order" end single label={AL("Order: ", "Rækkefølge: ") + ARC_SORTS.find(([k]) => k === sort)[1]} options={ARC_SORTS}
                selected={[sort]} onPick={setSort} openId={menu} setOpenId={setMenu} />
            </div>
            <div style={{ display: "flex", gap: "var(--space-6)", alignItems: "baseline", padding: "var(--space-4) 0" }}>
              <span aria-live="polite" style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>{list.length}</span> {AL("of", "af")} {ARCHIVE_ENTRIES.length} {AL("publications", "publikationer")}
              </span>
              {active && <button type="button" className="arc-toggle" onClick={() => setFilters({ kind: [], sector: [], stage: [], year: [] })}>{AL("Clear filters", "Ryd filtre")}</button>}
            </div>
          </div>
          {list.length ? (
            <div className="arc-grid" style={{ marginTop: "var(--space-2)" }}>
              {list.map((e) => <ArcCard key={e.slug} entry={e} onOpen={openEntry} />)}
            </div>
          ) : (
            <div style={{ marginTop: "var(--space-6)", padding: "var(--space-16) 0", borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--muted-foreground)" }}>
              {AL("No publication answers to every filter chosen.", "Ingen publikation svarer til alle de valgte filtre.")}
            </div>
          )}
        </div>
      </main>
      <ContactFooter />
      {current && <ArcPanel key={current.slug} entry={current} onClose={closeEntry} />}
    </div>
  );
}

window.Archive = Archive;
