/* The legal page: legal notice, privacy, cookies and regulatory disclosures, one page in four parts.
   A pinned index on the left (the sanctioned sticky-column read), the text on the right. Each part
   carries its own address, so the footer links open it at the part named. The text is a draft in
   the house register for the firm's lawyer to review; it is not in force until approved (A11). */
const { SectionHeading: LglHeading } = window.DS;

/* Danish (stage 3, 6 October 2026): each part in both languages, chosen once by the page's language.
   The Danish is a draft for the firm's lawyer as much as the English is (A16). */
const GL = window.L || ((en) => en);
const LEGAL_UPDATED = GL("1 October 2026", "1. oktober 2026");
const LEGAL_PARTS = [
  { id: "legal-notice", title: GL("Legal notice", "Juridisk information"), blocks: [
    { table: [[GL("Company", "Selskab"), "Capiital ApS"], ["CVR", "42842699"],
      [GL("Registered office", "Hjemsted"), GL("Dampfærgevej 27, 2100 København Ø, Denmark", "Dampfærgevej 27, 2100 København Ø, Danmark")],
      [GL("Correspondence", "Henvendelser"), "contact@capiital.eu"],
      [GL("Activity", "Branche"), GL("Business and management consultancy (NACE 70.20)", "Virksomhedsrådgivning og anden rådgivning om driftsledelse (NACE 70.20)")]] },
    { p: GL("This site is published by Capiital ApS, a private limited company registered in Denmark. Its content is provided for general information about the firm and its work.",
      "Dette websted udgives af Capiital ApS, et anpartsselskab registreret i Danmark. Indholdet er alene en generel orientering om selskabet og dets arbejde.") },
    { p: GL("Its text, design and imagery belong to Capiital ApS or are used with permission, and may not be reproduced without written consent. Publications may be quoted briefly with attribution.",
      "Tekst, design og billeder tilhører Capiital ApS eller anvendes med tilladelse og må ikke gengives uden skriftligt samtykke. Publikationer må citeres kortfattet med kildeangivelse.") },
    { p: GL("We take care that what is published here is accurate, but cannot warrant that it is complete or current, and accept no liability for decisions made in reliance on it. Links to other sites are provided for convenience; we are not responsible for their content.",
      "Vi sørger for, at det, der offentliggøres her, er korrekt, men kan ikke indestå for, at det er fuldstændigt eller aktuelt, og påtager os intet ansvar for beslutninger truffet på grundlag af det. Links til andre websteder er en service; vi er ikke ansvarlige for deres indhold.") },
    { p: GL("These terms are governed by Danish law, and any dispute arising from them falls to the courts of Copenhagen.",
      "Disse vilkår er underlagt dansk ret, og enhver tvist, der udspringer af dem, afgøres ved domstolene i København.") },
  ] },
  { id: "privacy", title: GL("Privacy", "Privatliv"), blocks: [
    { h: GL("Who is responsible", "Hvem er ansvarlig") },
    { p: GL("Capiital ApS, at the address above, is the data controller for personal data collected through this site and in correspondence with the firm. Questions about it may be sent to contact@capiital.eu.",
      "Capiital ApS, på ovenstående adresse, er dataansvarlig for de personoplysninger, der indsamles gennem dette websted og i korrespondance med selskabet. Spørgsmål herom kan sendes til contact@capiital.eu.") },
    { h: GL("What we collect, and why", "Hvad vi indsamler, og hvorfor") },
    { p: GL("When you write to us, through the form or by email, we receive your name, your email address and what you choose to tell us. We use it to reply, and to consider whether we can be of assistance. The legal basis is the steps taken at your request before an engagement (GDPR article 6(1)(b)) and our legitimate interest in answering correspondence (article 6(1)(f)).",
      "Når der skrives til os, via formularen eller pr. e-mail, modtager vi navn, e-mailadresse og det, afsenderen vælger at fortælle. Oplysningerne bruges til at svare og til at vurdere, om vi kan være til hjælp. Retsgrundlaget er de skridt, der tages på afsenderens anmodning forud for en opgave (databeskyttelsesforordningens artikel 6, stk. 1, litra b), og vores legitime interesse i at besvare henvendelser (artikel 6, stk. 1, litra f).") },
    { p: GL("Where an engagement follows, its records are kept under the written terms that govern it, and as Danish bookkeeping law requires.",
      "Fører henvendelsen til en opgave, opbevares materialet efter de skriftlige vilkår, der gælder for opgaven, og som bogføringsloven kræver.") },
    { h: GL("How long we keep it", "Hvor længe vi opbevarer oplysningerne") },
    { p: GL("Correspondence that does not lead to an engagement is deleted within [twelve] months of the last exchange. Records of an engagement are kept for five years from the end of the financial year to which they relate.",
      "Korrespondance, der ikke fører til en opgave, slettes senest [tolv] måneder efter den sidste udveksling. Materiale fra en opgave opbevares i fem år fra udgangen af det regnskabsår, det vedrører.") },
    { h: GL("Who else sees it", "Hvem der ellers ser oplysningerne") },
    { p: GL("Your data is not sold or shared for marketing. It is processed on our behalf by the providers of our email and hosting, under data processing agreements. Where a provider is outside the EU and EEA, the transfer rests on the European Commission's standard contractual clauses or an adequacy decision.",
      "Oplysningerne sælges ikke og deles ikke til markedsføring. De behandles på vores vegne af vores leverandører af e-mail og hosting i henhold til databehandleraftaler. Hvor en leverandør befinder sig uden for EU og EØS, sker overførslen på grundlag af Europa-Kommissionens standardkontraktbestemmelser eller en tilstrækkelighedsafgørelse.") },
    { h: GL("Your rights", "Rettigheder") },
    { p: GL("You may ask to see the data we hold about you, to have it corrected or erased, to restrict or object to its use, and to receive it in a portable form. Write to contact@capiital.eu; we answer within one month.",
      "Den registrerede kan anmode om indsigt i de oplysninger, vi har, om berigtigelse eller sletning, om begrænsning af eller indsigelse mod behandlingen og om at modtage oplysningerne i et overførbart format. Skriv til contact@capiital.eu; vi svarer inden for en måned.") },
    { p: GL("You may also complain to the Danish Data Protection Agency (Datatilsynet), Carl Jacobsens Vej 35, 2500 Valby, at dt@datatilsynet.dk.",
      "Der kan også klages til Datatilsynet, Carl Jacobsens Vej 35, 2500 Valby, dt@datatilsynet.dk.") },
  ] },
  { id: "cookies", title: "Cookies", blocks: [
    { p: GL("This site sets no cookies for analytics, advertising or tracking, and keeps no record of your visit beyond what any web server logs as a matter of course.",
      "Dette websted sætter ingen cookies til statistik, annoncering eller sporing og registrerer ikke besøget ud over det, enhver webserver logger som en selvfølge.") },
    { p: GL("Its typefaces are at present loaded from Google Fonts, which receives your device's IP address when the page loads. [We intend to serve the typefaces from our own server, after which no third party is contacted.]",
      "Skrifttyperne hentes i øjeblikket fra Google Fonts, som modtager enhedens IP-adresse, når siden indlæses. [Vi vil levere skrifttyperne fra vores egen server, hvorefter ingen tredjepart kontaktes.]") },
    { p: GL("Should that change, consent will be asked for before any cookie that is not strictly necessary is set, as the Danish cookie order (cookiebekendtgørelsen) requires, and this notice will be revised.",
      "Skulle det ændre sig, indhentes samtykke, før nogen cookie, der ikke er strengt nødvendig, sættes, som cookiebekendtgørelsen kræver, og denne oplysning vil blive revideret.") },
  ] },
  { id: "regulatory", title: GL("Regulatory disclosures", "Regulatoriske oplysninger"), blocks: [
    { p: GL("Capiital ApS advises on sale, acquisition, capital raising and succession. It is registered as a business consultancy and is not authorised or supervised by the Danish Financial Supervisory Authority (Finanstilsynet) as an investment firm or credit institution.",
      "Capiital ApS rådgiver om salg, opkøb, kapitalrejsning og generationsskifte. Selskabet er registreret som virksomhedsrådgivning og har ikke tilladelse fra og er ikke under tilsyn af Finanstilsynet som investeringsselskab eller kreditinstitut.") },
    { p: GL("The firm does not receive or hold client funds, does not grant credit and does not deal in financial instruments. Where a transaction requires a regulated party, that party is engaged separately and on its own terms.",
      "Selskabet modtager og opbevarer ikke klientmidler, yder ikke kredit og handler ikke med finansielle instrumenter. Kræver en transaktion en reguleret part, engageres denne særskilt og på egne vilkår.") },
    { p: GL("Nothing on this site is an offer, a solicitation or investment, legal, tax or accounting advice. Publications set out the firm's general views at the date given; they are not a recommendation to any reader. Advice is given only under a written engagement, to the party named in it.",
      "Intet på dette websted er et tilbud, en opfordring eller investerings-, juridisk, skattemæssig eller regnskabsmæssig rådgivning. Publikationer gengiver selskabets generelle synspunkter på den angivne dato og er ikke en anbefaling til nogen læser. Rådgivning ydes alene i henhold til en skriftlig aftale og til den part, der er nævnt i den.") },
    { h: GL("Conflicts of interest", "Interessekonflikter") },
    { p: GL("[Statement of the firm's policy on identifying and managing conflicts of interest, to be supplied.]",
      "[Redegørelse for selskabets politik for identifikation og håndtering af interessekonflikter følger.]") },
  ] },
];

const LEGAL_CSS = `
.lgl-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:var(--space-16)}
.lgl-index{grid-column:span 4;position:sticky;top:calc(var(--nav-height) + var(--space-12));align-self:start}
.lgl-text{grid-column:6 / span 7}
.lgl-index a{display:block;padding:var(--space-3) 0;border-bottom:1px solid var(--border);font-size:11px;text-transform:uppercase;
  letter-spacing:var(--tracking-nav);color:var(--ink);transition:color var(--duration-fast) var(--ease-standard)}
.lgl-index a:hover,.lgl-index a.is-live{color:var(--navy)}
.lgl-part{scroll-margin-top:var(--nav-height);padding:var(--space-12) 0;border-top:1px solid var(--border)}
.lgl-part:first-child{padding-top:0;border-top:0}
@media (max-width:900px){.lgl-grid{grid-template-columns:1fr;gap:var(--space-10)}.lgl-index{position:static}.lgl-index,.lgl-text{grid-column:auto}}
`;

function useLegalLive(ids) {
  const [live, setLive] = React.useState(ids[0]);
  React.useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      let cur = ids[0];
      for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.34) cur = id; }
      setLive(cur);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", on, { passive: true });
    check();
    return () => { window.removeEventListener("scroll", on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return live;
}

function LegalPart({ part }) {
  return (
    <section id={part.id} className="lgl-part" data-screen-label={part.title}>
      <h2 style={{ margin: "0 0 var(--space-6)", fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "var(--text-4xl)",
        lineHeight: 1.08, letterSpacing: "-0.01em", color: "var(--ink)" }}>{part.title}</h2>
      <div style={{ display: "grid", gap: "var(--space-4)", maxWidth: "40rem" }}>
        {part.blocks.map((b, i) => b.table ? (
          <dl key={i} style={{ margin: "0 0 var(--space-4)", borderTop: "1px solid var(--border)" }}>
            {b.table.map(([k, v]) => (
              <div key={k} style={{ display: "grid", gridTemplateColumns: "11rem minmax(0,1fr)", gap: "var(--space-4)",
                padding: "var(--space-3) 0", borderBottom: "1px solid var(--border)" }}>
                <dt style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--muted-foreground)", paddingTop: 3 }}>{k}</dt>
                <dd style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--ink)" }}>{v}</dd>
              </div>
            ))}
          </dl>
        ) : b.h ? (
          <h3 key={i} style={{ margin: "var(--space-4) 0 0", fontSize: "var(--text-2xs)", fontWeight: 400, textTransform: "uppercase",
            letterSpacing: "var(--tracking-caps)", color: "var(--navy)" }}>{b.h}</h3>
        ) : (
          <p key={i} style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", fontWeight: 300,
            color: "var(--text-body)", textWrap: "pretty" }}>{b.p}</p>
        ))}
      </div>
    </section>
  );
}

function Legal() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => { document.title = GL("Capiital · Legal", "Capiital · Juridisk"); }, []);
  const live = useLegalLive(LEGAL_PARTS.map((p) => p.id));
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "var(--eggshell)", color: "var(--ink)" }}>
      <style>{LEGAL_CSS}</style>
      <SiteHeader scrolled={scrolled} />
      <main data-screen-label="Legal" style={{ padding: "calc(var(--nav-height) + var(--space-20)) var(--gutter-lg) var(--section-y)" }}>
        <div className="lgl-grid" style={{ maxWidth: "var(--measure-max)", margin: "0 auto", width: "100%" }}>
          <aside className="lgl-index">
            <LglHeading size="md" lines={[GL("Legal", "Juridisk")]} accentLine={GL("and disclosures.", "og oplysninger.")} />
            <nav aria-label={GL("Parts of this page", "Sidens afsnit")} style={{ marginTop: "var(--space-10)", borderTop: "1px solid var(--border)" }}>
              {LEGAL_PARTS.map((p) => <a key={p.id} href={"#" + p.id} className={live === p.id ? "is-live" : ""}>{p.title}</a>)}
            </nav>
            <div style={{ marginTop: "var(--space-6)", fontSize: "var(--text-2xs)", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
              {GL("Last updated", "Senest opdateret")} {LEGAL_UPDATED}<br />{GL("[Draft for legal review]", "[Udkast til juridisk gennemgang]")}
            </div>
          </aside>
          <div className="lgl-text">{LEGAL_PARTS.map((p) => <LegalPart key={p.id} part={p} />)}</div>
        </div>
      </main>
      <ContactFooter />
    </div>
  );
}

window.Legal = Legal;
