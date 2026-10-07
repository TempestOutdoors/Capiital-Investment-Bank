/* The design-system components v3 renders with (Reveal, RuleDraw, ScrollProgress, SectionHeading,
   ArrowLink, Button, Input, Textarea, Label, PullQuote, PublicationRow, KnotMark …), extracted verbatim
   from ui_kits/website-dev/standalone-src.html on 6 October 2026. Reference only. */

(function(){

const base = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)",
  whiteSpace: "nowrap", borderRadius: "var(--radius-md)", fontFamily: "var(--font-sans)",
  fontWeight: "var(--weight-medium)", cursor: "pointer", border: "1px solid transparent",
  transition: "color var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
};

const sizes = {
  sm: { height: 32, padding: "0 var(--space-3)", fontSize: "var(--text-xs)" },
  default: { height: 36, padding: "var(--space-2) var(--space-4)", fontSize: "var(--text-sm)" },
  lg: { height: 40, padding: "0 var(--space-8)", fontSize: "var(--text-sm)" },
  icon: { height: 36, width: 36, padding: 0, fontSize: "var(--text-sm)" },
  editorial: { padding: "var(--space-5) var(--space-8)", fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-button)", textTransform: "uppercase" },
};

const variants = {
  default: { background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: "var(--shadow-sm)" },
  secondary: { background: "var(--secondary)", color: "var(--secondary-foreground)", boxShadow: "var(--shadow-xs)" },
  destructive: { background: "var(--destructive)", color: "var(--destructive-foreground)", boxShadow: "var(--shadow-xs)" },
  outline: { background: "var(--background)", color: "var(--foreground)", borderColor: "var(--input)", boxShadow: "var(--shadow-xs)" },
  ghost: { background: "transparent", color: "var(--foreground)" },
  link: { background: "transparent", color: "var(--primary)", textUnderlineOffset: "4px", padding: 0, height: "auto" },
  editorial: { background: "transparent", color: "inherit", borderColor: "color-mix(in oklab, var(--taupe-soft) 40%, transparent)" },
};

const hovers = {
  default: { background: "color-mix(in oklab, var(--primary) 90%, transparent)" },
  secondary: { background: "color-mix(in oklab, var(--secondary) 80%, transparent)" },
  destructive: { background: "color-mix(in oklab, var(--destructive) 90%, transparent)" },
  outline: { background: "var(--accent)", color: "var(--accent-foreground)", borderColor: "var(--accent)" },
  ghost: { background: "var(--accent)", color: "var(--accent-foreground)" },
  link: { textDecoration: "underline" },
  editorial: { background: "var(--taupe)", borderColor: "var(--taupe)", color: "var(--cream)" },
};

function Button({ variant = "default", size, children, disabled, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const key = size || (variant === "editorial" ? "editorial" : "default");
  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...sizes[key], ...variants[variant], ...(hover && !disabled ? hovers[variant] : null),
        opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer", ...style }}
      {...rest}
    >{children}</button>
  );
}


function Input({ style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <input
      onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
      {...rest}
      style={{ display: "flex", height: 36, width: "100%", borderRadius: "var(--radius-md)",
        border: "1px solid var(--input)", background: "transparent", padding: "var(--space-1) var(--space-3)",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--foreground)",
        boxShadow: "var(--shadow-xs)", outline: "none",
        borderColor: focus ? "var(--ring)" : "var(--input)",
        opacity: rest.disabled ? 0.5 : 1, ...style }}
    />
  );
}


function Textarea({ style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      {...rest}
      style={{ display: "flex", minHeight: 60, width: "100%", borderRadius: "var(--radius-md)",
        border: "1px solid var(--input)", background: "transparent", padding: "var(--space-2) var(--space-3)",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--foreground)",
        boxShadow: "var(--shadow-xs)", outline: "none", resize: "vertical",
        borderColor: focus ? "var(--ring)" : "var(--input)", ...style }}
    />
  );
}


function Label({ children, style, ...rest }) {
  return (
    <label style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)", lineHeight: 1, color: "var(--foreground)", ...style }} {...rest}>
      {children}
    </label>
  );
}


/* Scroll-entry wrapper. One IntersectionObserver per element, fired once, never reversed —
   the page settles as it is read and then stays put. Three variants only:
   "settle" (14px + fade), "veil" (opacity only, for prose), "draw" (a hairline growing
   from its left edge). `step` stages a group: delay = step x --stagger-row. */
function Reveal({ variant = "settle", step = 0, as = "div", threshold = 0.2,
  margin = "0px 0px -12% 0px", className, style, children, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold, rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, margin]);
  const Tag = as;
  return (
    <Tag ref={ref} data-reveal={variant} className={className}
      style={{ transitionDelay: step ? "calc(" + step + " * var(--stagger-row))" : undefined, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

/* The hairline that draws itself. Used in place of a plain 1px border wherever a rule
   should arrive with the content it separates. */
function RuleDraw({ tone = "light", step = 0, style }) {
  return (
    <Reveal variant="draw" step={step} threshold={0.05}
      style={{ height: 1, background: tone === "dark" ? "var(--rule-on-ink)" : "var(--border)",
        ...(tone === "ink" ? { background: "var(--ink)" } : null), ...style }} />
  );
}


/* A headline figure that arrives by counting. Set in the display serif with tabular
   figures so the width never jitters; `value` is written exactly as it should read
   ("90%", "3x", "18 mo") and the numeric part is what animates. One pass, on entry. */
function Counter({ value, duration = 1400, style, className }) {
  const ref = React.useRef(null);
  const m = String(value).match(/^([^0-9.-]*)(-?[0-9]+(?:\.[0-9]+)?)(.*)$/);
  const [pre, target, post] = m ? [m[1], parseFloat(m[2]), m[3]] : ["", null, String(value)];
  const decimals = m && m[2].includes(".") ? m[2].split(".")[1].length : 0;
  const [n, setN] = React.useState(target === null ? null : 0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || target === null) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setN(target); return; }
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / duration);
          setN(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);
  return (
    <span ref={ref} className={className}
      style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "tabular-nums", ...style }}>
      {pre}{n === null ? "" : n.toFixed(decimals)}{post}
    </span>
  );
}


/* A 1px rule across the top of the page showing read progress. Institutional rather than
   decorative: no glow, no gradient, the accent at a single weight. */
function ScrollProgress({ tone = "light", style }) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return (
    <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, ...style }}>
      <div style={{ height: 1, width: (p * 100).toFixed(2) + "%",
        background: tone === "dark" ? "var(--taupe-soft)" : "var(--taupe)",
        transition: "width 120ms linear" }} />
    </div>
  );
}

/* How far a given element has travelled through the viewport, 0 to 1. Drives scroll-linked
   figures — the waterline band in the thesis section — without a library. */
function useScrollProgress(ref) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const span = r.height + window.innerHeight;
      setP(Math.max(0, Math.min(1, (window.innerHeight - r.top) / span)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [ref]);
  return p;
}

/* Which section currently owns the viewport — used to mark the live item in the nav. */
function useActiveSection(ids) {
  const [active, setActive] = React.useState(null);
  React.useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (vis) setActive(vis.target.id);
    }, { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.6] });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids.join(",")]);
  return active;
}


/* Icons are Lucide, unmodified geometry, inlined so no icon package is required.
   The brand uses them flat and 2D — line only, currentColor, never filled, never
   rendered as glossy 3D objects. Editorial sizes run 20–56px at stroke 1.25;
   inside form and navigation primitives they stay 16px at stroke 2. */
const PATHS = {
  "menu": `<path d="M4 5h16"></path> <path d="M4 12h16"></path> <path d="M4 19h16"></path>`,
  "arrow-right": `<path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path>`,
  "arrow-up-right": `<path d="M7 7h10v10"></path> <path d="M7 17 17 7"></path>`,
  "atom": `<circle cx="12" cy="12" r="1"></circle> <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"></path> <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"></path>`,
  "blocks": `<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"></path> <rect x="14" y="2" width="8" height="8" rx="1"></rect>`,
  "chart-line": `<path d="M3 3v16a2 2 0 0 0 2 2h16"></path> <path d="m19 9-5 5-4-4-3 3"></path>`,
  "check": `<path d="M20 6 9 17l-5-5"></path>`,
  "chevron-down": `<path d="m6 9 6 6 6-6"></path>`,
  "chevron-up": `<path d="m18 15-6-6-6 6"></path>`,
  "cog": `<path d="M11 10.27 7 3.34"></path> <path d="m11 13.73-4 6.93"></path> <path d="M12 22v-2"></path> <path d="M12 2v2"></path> <path d="M14 12h8"></path> <path d="m17 20.66-1-1.73"></path> <path d="m17 3.34-1 1.73"></path> <path d="M2 12h2"></path> <path d="m20.66 17-1.73-1"></path> <path d="m20.66 7-1.73 1"></path> <path d="m3.34 17 1.73-1"></path> <path d="m3.34 7 1.73 1"></path> <circle cx="12" cy="12" r="2"></circle> <circle cx="12" cy="12" r="8"></circle>`,
  "gauge": `<path d="m12 14 4-4"></path> <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>`,
  "lightbulb": `<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path> <path d="M9 18h6"></path> <path d="M10 22h4"></path>`,
  "mail": `<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path> <rect x="2" y="4" width="20" height="16" rx="2"></rect>`,
  "minus": `<path d="M5 12h14"></path>`,
  "network": `<rect x="16" y="16" width="6" height="6" rx="1"></rect> <rect x="2" y="16" width="6" height="6" rx="1"></rect> <rect x="9" y="2" width="6" height="6" rx="1"></rect> <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path> <path d="M12 12V8"></path>`,
  "plus": `<path d="M5 12h14"></path> <path d="M12 5v14"></path>`,
  "refresh-cw": `<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path> <path d="M21 3v5h-5"></path> <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path> <path d="M8 16H3v5"></path>`,
  "search": `<path d="m21 21-4.34-4.34"></path> <circle cx="11" cy="11" r="8"></circle>`,
  "triangle": `<path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>`,
  "users": `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <path d="M16 3.128a4 4 0 0 1 0 7.744"></path> <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path> <circle cx="9" cy="7" r="4"></circle>`,
  "x": `<path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path>`
};

function Icon({ name, size = 24, stroke = 1.25, style, ...rest }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden
      style={{ display: "block", flexShrink: 0, ...style }} {...rest}
      dangerouslySetInnerHTML={{ __html: d }} />
  );
}

Icon.names = Object.keys(PATHS);


/* The CAP//TAL wordmark. The name is set in the sans at generous tracking; the doubled "II"
   at the heart of the word is replaced by two slanted bars — the ownable detail, and the only
   part that ever carries the accent colour. `banner` wraps it in the plaque used in the
   artwork: a solid deep-sea field with the right edge cut at the same angle as the bars. */
function Logo({ tone = "ink", size = 18, banner = false, accent = false, style }) {
  const color = tone === "cream" ? "var(--cream)" : tone === "sea" ? "var(--sea)" : tone === "current" ? "currentColor" : "var(--ink)";
  const barColor = !accent ? color : tone === "cream" ? "var(--mist)" : "var(--sea)";
  const bar = { display: "inline-block", width: "0.15em", height: "0.98em", background: barColor,
    transform: "skewX(-16deg)", verticalAlign: "-0.06em" };
  const mark = (
    <span style={{ color, fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: size,
      letterSpacing: "var(--tracking-wordmark)", lineHeight: 1, whiteSpace: "nowrap",
      display: "inline-flex", alignItems: "baseline", ...(banner ? null : style) }}>
      CAP
      <span aria-hidden style={{ display: "inline-flex", gap: "0.11em", margin: "0 0.30em 0 0.16em" }}>
        <i style={bar} /><i style={bar} />
      </span>
      TAL
    </span>
  );
  if (!banner) return mark;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", background: "var(--sea-deep)",
      padding: `${size * 0.62}px ${size * 1.5}px ${size * 0.62}px ${size * 1.15}px`,
      clipPath: `polygon(0 0, 100% 0, calc(100% - ${size * 0.62}px) 100%, 0 100%)`, ...style }}>
      {mark}
    </span>
  );
}


function Eyebrow({ children, style }) {
  return (
    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-eyebrow)",
      letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase",
      color: "var(--taupe)", fontWeight: "var(--weight-medium)", ...style }}>{children}</div>
  );
}


function ArrowLink({ children, href = "#", underline = true, style, ...rest }) {
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)",
      fontSize: 12, textTransform: "uppercase", letterSpacing: "var(--tracking-button)",
      borderBottom: underline ? "1px solid color-mix(in oklab, var(--taupe) 60%, transparent)" : "none",
      paddingBottom: 4, ...style }} {...rest}>
      {children} <span aria-hidden>→</span>
    </a>
  );
}



function SectionHeading({ eyebrow, lines = [], accentLine, size = "lg", style }) {
  const fs = size === "xl" ? "var(--text-7xl)" : size === "md" ? "var(--text-5xl)" : "var(--text-6xl)";
  return (
    <div style={style}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 style={{ marginTop: "var(--space-6)", fontFamily: "var(--font-display)", fontSize: fs,
        lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-heading)" }}>
        {lines.map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}
        {accentLine && <span style={{ fontStyle: "italic", color: "var(--accent)" }}>{accentLine}</span>}
      </h2>
    </div>
  );
}


function StatBlock({ value, label, size = "lg", tone = "auto", style }) {
  const fs = size === "sm" ? "var(--text-3xl)" : size === "md" ? "var(--text-4xl)" : "var(--text-5xl)";
  return (
    <div style={style}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: fs, lineHeight: 1,
        color: tone === "cream" ? "var(--cream)" : "inherit" }}>{value}</div>
      <div style={{ marginTop: "var(--space-2)", fontSize: "var(--text-2xs)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-caps)", color: tone === "cream" ? "var(--taupe-soft)" : "var(--muted-foreground)" }}>{label}</div>
    </div>
  );
}


function ClientMarquee({ names = [], style }) {
  const row = (k) => (
    <div key={k} style={{ display: "flex", alignItems: "center", gap: "var(--space-16)", flexShrink: 0 }}>
      {names.map((n) => (
        <span key={n} style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", letterSpacing: "0.2em" }}>{n}</span>
      ))}
    </div>
  );
  return (
    <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      overflow: "hidden", padding: "var(--space-8) 0", background: "var(--surface-band)", ...style }}>
      <div className="animate-marquee" style={{ display: "flex", alignItems: "center", gap: "var(--space-16)",
        whiteSpace: "nowrap", color: "color-mix(in oklab, var(--foreground) 55%, transparent)", width: "max-content" }}>
        {row(0)}{row(1)}
      </div>
    </section>
  );
}


/* The knot mark, written in. Strands dash-draw along their own direction; the lying loop starts a
   beat after the standing one; each crossing is ploughed: a ground-coloured blade, then the
   over-strand on top of it, drawn along the over-strand as it arrives, so the under-strand is
   seen to pass beneath. Fires once, when half the mark is in view, on its own clock, and holds.
   Scroll speed and direction play no part. Complete at once under reduced motion.

   The blade must be the ground the mark sits on. On any other ground the crossings show as
   stripes, so `ground` is required in practice, not decoration. */

const SOLOMON = {
  strands: ["M51.2,94 L35,94 L35,6 L51.2,6", "M48.8,94 L65,94 L65,6 L48.8,6",
    "M51.2,65 L6,65 L6,35 L51.2,35", "M48.8,65 L94,65 L94,35 L48.8,35"],
  /* start offset per strand, in units of --knot-lag (0 = standing loop, 1 = lying loop) */
  lag: [0, 0, 1, 1],
  /* each crossing: the over-strand's path across it, which strand carries it, and the eased
     progress window (0–1) in which that strand crosses */
  crossings: [{ d: "M58.4,65 L71.6,65", s: 3, e0: .0797, e1: .1894 },
    { d: "M35,71.6 L35,58.4", s: 0, e0: .3206, e1: .4302 },
    { d: "M65,41.6 L65,28.4", s: 1, e0: .5698, e1: .6794 },
    { d: "M28.4,35 L41.6,35", s: 2, e0: .8106, e1: .9203 }],
};

const knotEase = (() => {
  const x1 = .15, y1 = .12, x2 = .85, y2 = .88;
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx, cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = s => ((ax * s + bx) * s + cx) * s, Y = s => ((ay * s + by) * s + cy) * s;
  const solve = (f, v) => { let lo = 0, hi = 1, s = v; for (let i = 0; i < 32; i++) { s = (lo + hi) / 2; if (f(s) < v) lo = s; else hi = s; } return s; };
  return { ease: x => Y(solve(X, x)), timeAt: y => X(solve(Y, y)) };
})();
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const msToken = (name, fallback) => {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(v); if (!isFinite(n)) return fallback;
  return /ms$/.test(v) ? n : /s$/.test(v) ? n * 1000 : n;
};

function KnotMark({ knot = SOLOMON, ink = "var(--ink)", ground = "var(--bone)", animate = true,
  width = "62%", maxWidth = "12rem", style }) {
  const box = React.useRef(null);
  React.useEffect(() => {
    const root = box.current; if (!root) return;
    const D = msToken("--duration-knot", 1900), LAG = msToken("--knot-lag", 220);
    const sd = knot.lag.map(l => l * LAG), total = D + Math.max(...sd);
    const strands = [...root.querySelectorAll("[data-strand]")].map(p => ({ p, L: p.getTotalLength() }));
    const cas = knot.crossings.map((c, i) => ({
      a: sd[c.s] + knotEase.timeAt(c.e0) * D, b: sd[c.s] + knotEase.timeAt(c.e1) * D,
      paths: [...root.querySelectorAll('[data-cross="' + i + '"]')].map(p => ({ p, L: p.getTotalLength() })),
    }));
    const all = [...strands, ...cas.flatMap(c => c.paths)];
    all.forEach(o => { o.p.style.strokeDasharray = o.L; o.p.style.strokeDashoffset = o.L; });
    const paint = t => {
      strands.forEach((o, i) => { o.p.style.strokeDashoffset = o.L * (1 - knotEase.ease(clamp01((t - sd[i]) / D))); });
      cas.forEach(c => { const f = clamp01((t - c.a) / (c.b - c.a)); c.paths.forEach(o => { o.p.style.strokeDashoffset = o.L * (1 - f); }); });
    };
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduced) { paint(total); return; }
    let raf = 0;
    const play = () => {
      const t0 = performance.now();
      const step = now => { const t = now - t0; paint(t); if (t < total) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); play(); } }, { threshold: 0.5 });
    io.observe(root);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [knot, animate]);
  return (
    <svg ref={box} viewBox="0 0 100 100" aria-hidden="true"
      style={{ width, maxWidth, height: "auto", display: "block", ...style }}>
      {knot.strands.map((d, i) => (
        <path key={i} data-strand d={d} fill="none" stroke={ink} strokeWidth="7.6"
          strokeLinejoin="miter" strokeMiterlimit="6" strokeLinecap="butt" />
      ))}
      {knot.crossings.map((c, i) => (
        <g key={i}>
          <path data-cross={i} d={c.d} fill="none" stroke={ground} strokeWidth="12.4" strokeLinecap="butt" />
          <path data-cross={i} d={c.d} fill="none" stroke={ink} strokeWidth="7.6" strokeLinecap="square"
            strokeLinejoin="miter" strokeMiterlimit="6" />
        </g>
      ))}
    </svg>
  );
}


function Card({ children, style, ...rest }) {
  return (
    <div style={{ borderRadius: "var(--radius-xl)", border: "1px solid var(--border)",
      background: "var(--card)", color: "var(--card-foreground)", boxShadow: "var(--shadow-sm)", ...style }} {...rest}>
      {children}
    </div>
  );
}
function CardHeader({ children, style }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "var(--space-6)", ...style }}>{children}</div>;
}
function CardTitle({ children, style }) {
  return <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: 1, letterSpacing: "var(--tracking-heading)", ...style }}>{children}</div>;
}
function CardDescription({ children, style }) {
  return <div style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)", lineHeight: "var(--leading-relaxed)", ...style }}>{children}</div>;
}
function CardContent({ children, style }) {
  return <div style={{ padding: "0 var(--space-6) var(--space-6)", ...style }}>{children}</div>;
}
function CardFooter({ children, style }) {
  return <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "0 var(--space-6) var(--space-6)", ...style }}>{children}</div>;
}


const v = {
  default: { background: "var(--primary)", color: "var(--primary-foreground)", borderColor: "transparent", boxShadow: "var(--shadow-xs)" },
  secondary: { background: "var(--secondary)", color: "var(--secondary-foreground)", borderColor: "transparent" },
  destructive: { background: "var(--destructive)", color: "var(--destructive-foreground)", borderColor: "transparent" },
  outline: { background: "transparent", color: "var(--foreground)", borderColor: "var(--border)" },
};

function Badge({ variant = "default", children, style, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", borderRadius: "var(--radius-md)",
      border: "1px solid", padding: "2px 10px", fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)", ...v[variant], ...style }} {...rest}>{children}</span>
  );
}


function Separator({ orientation = "horizontal", style }) {
  return <div role="separator" style={{ flexShrink: 0, background: "var(--border)",
    height: orientation === "horizontal" ? 1 : "100%",
    width: orientation === "horizontal" ? "100%" : 1, ...style }} />;
}



/* A service, on the deep-sea ground: optional flat icon, title, body, and the
   client sentence the firm quotes underneath. Hover moves the type, never the box. */
function ServiceCard({ number, icon, title, body, quote, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ padding: "var(--pad-card-lg)", cursor: "pointer", background: "var(--sea-deep)", color: "var(--cream)",
        transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "var(--space-10)" }}>
        {icon
          ? <Icon name={icon} size={40} stroke={1.1} style={{ color: "var(--taupe-soft)" }} />
          : <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--taupe-soft)" }}>{number}</span>}
        <span style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)",
          color: "var(--taupe-soft)", opacity: hover ? 1 : 0, transition: "opacity var(--duration-fast) var(--ease-standard)" }}>Explore →</span>
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-5xl)", lineHeight: 1.1,
        marginBottom: "var(--space-6)", color: hover ? "var(--taupe-soft)" : "var(--cream)",
        transition: "color var(--duration-fast) var(--ease-standard)" }}>{title}</h3>
      <p style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", maxWidth: "28rem",
        margin: 0, color: "color-mix(in oklab, var(--cream) 65%, transparent)" }}>{body}</p>
      {quote && (
        <p style={{ marginTop: "var(--space-8)", paddingTop: "var(--space-6)", maxWidth: "28rem",
          borderTop: "1px solid var(--rule-on-ink)", fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: "var(--text-lg)", lineHeight: 1.4, color: "var(--taupe-soft)" }}>“{quote}”</p>
      )}
    </div>
  );
}



/* One step of the four-part method. Roman numeral, flat 2D icon, title, body — set on
   eggshell. The numeral is always in the serif; the icon is always line-only. */
function MethodStep({ numeral, step, icon, title, body, style }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-8)", alignContent: "start",
      padding: "var(--pad-card)", background: "var(--bone)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: 1,
          color: "var(--taupe)" }}>{numeral}</span>
        <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-caps)", color: "var(--stone)" }}>{step}</span>
      </div>
      {icon && <Icon name={icon} size={44} stroke={1.1} style={{ color: "var(--taupe)" }} />}
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", lineHeight: 1.05 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)",
        fontWeight: 300, color: "var(--text-body)" }}>{body}</p>
    </div>
  );
}


/* A numbered ledger row: ordinal, title, body, optional meta — separated by hairlines
   rather than boxed. The institutional alternative to a grid of cards, and the pattern
   the lower half of the site is built from. */
function IndexRow({ index, title, body, meta, onSelect, tone = "light", style }) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === "dark";
  const Tag = onSelect ? "button" : "div";
  return (
    <Tag type={onSelect ? "button" : undefined} onClick={onSelect}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ appearance: "none", border: 0, borderTop: "1px solid " + (dark ? "var(--rule-on-ink)" : "var(--border)"),
        width: "100%", textAlign: "left", font: "inherit", color: "inherit", cursor: onSelect ? "pointer" : "default",
        display: "grid", gridTemplateColumns: "2.5rem minmax(9rem, 14rem) 1fr auto", gap: "var(--space-8)",
        alignItems: "baseline", padding: "var(--space-8) var(--space-6) var(--space-8) 0",
        background: hover ? (dark ? "color-mix(in oklab, var(--sea-ink) 55%, transparent)" : "var(--bone)") : "transparent",
        transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)",
        color: dark ? "var(--taupe-soft)" : "var(--taupe)" }}>{index}</span>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", lineHeight: 1.1,
        color: hover ? (dark ? "var(--taupe-soft)" : "var(--taupe)") : "inherit",
        transition: "color var(--duration-fast) var(--ease-standard)" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", fontWeight: 300,
        maxWidth: "34rem", color: dark ? "var(--on-ink-body)" : "var(--text-body)" }}>{body}</p>
      <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)",
        whiteSpace: "nowrap", color: dark ? "var(--taupe-soft)" : "var(--taupe)",
        opacity: meta ? 1 : (hover ? 1 : 0), transition: "opacity var(--duration-fast) var(--ease-standard)" }}>
        {meta || "Read →"}
      </span>
    </Tag>
  );
}


/* The publications ledger: category, date, title, reading time. Column widths are fixed
   so a stack of rows aligns like a printed contents page. */
function PublicationRow({ kind, date, title, read, cta, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "grid", gridTemplateColumns: "12rem 8rem 1fr 6rem 4rem", gap: "var(--space-8)",
        alignItems: "baseline", padding: "var(--space-8) var(--space-6) var(--space-8) 0",
        borderTop: "1px solid var(--border)",
        background: hover ? "var(--white)" : "transparent",
        transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}>
      <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-caps)", color: "var(--taupe)" }}>{kind}</span>
      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-quiet)" }}>{date}</span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: 1.15,
        color: hover ? "var(--taupe)" : "inherit", transition: "color var(--duration-fast) var(--ease-standard)" }}>{title}</span>
      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-quiet)", whiteSpace: "nowrap" }}>{read}</span>
      <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)",
        color: hover ? "var(--taupe)" : "var(--text-quiet)", textAlign: "right" }}>{cta || "Read →"}</span>
    </a>
  );
}


/* A field note: memo number, a claim stated plainly, and the link to the memo.
   Three across on the warm ground, separated by hairlines rather than boxes. */
function FieldNote({ memo, title, body, cta = "Read the memo", style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "grid", gap: "var(--space-6)", alignContent: "start", padding: "var(--pad-card)",
        background: hover ? "var(--white)" : "transparent", cursor: "pointer",
        transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}>
      <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-caps)", color: "var(--stone)" }}>{memo}</span>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", lineHeight: 1.12,
        color: hover ? "var(--taupe)" : "inherit", transition: "color var(--duration-fast) var(--ease-standard)" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)",
        fontWeight: 300, color: "var(--text-body)" }}>{body}</p>
      <span style={{ fontSize: "var(--text-xs)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-caps)", color: hover ? "var(--taupe)" : "var(--text-quiet)" }}>{cta} →</span>
    </article>
  );
}


function InsightCard({ kind, date, title, read, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: hover ? "var(--cream)" : "var(--background)", padding: "var(--pad-card)",
        cursor: "pointer", transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-12)" }}>
        <span className="eyebrow">{kind}</span>
        <span style={{ fontSize: "var(--text-xs)", color: "var(--muted-foreground)" }}>{date}</span>
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", lineHeight: 1.15,
        marginBottom: "var(--space-12)", color: hover ? "var(--taupe)" : "inherit",
        transition: "color var(--duration-fast) var(--ease-standard)" }}>{title}</h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-meta)",
        color: "var(--muted-foreground)", borderTop: "1px solid var(--border)", paddingTop: "var(--space-6)" }}>
        <span>{read} read</span>
        <span style={{ color: hover ? "var(--taupe)" : "inherit" }}>Read →</span>
      </div>
    </article>
  );
}


function TransactionRow({ value, sub, desc, sector, year, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-6)",
        padding: "var(--space-10) var(--space-4)", margin: "0 calc(-1 * var(--space-4))",
        borderBottom: "1px solid var(--border)", alignItems: "baseline",
        background: hover ? "color-mix(in oklab, var(--bone) 50%, transparent)" : "transparent",
        transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}>
      <div style={{ gridColumn: "span 3" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-5xl)", lineHeight: 1, color: "var(--ink)" }}>{value}</div>
        <div className="eyebrow" style={{ marginTop: "var(--space-2)" }}>{sub}</div>
      </div>
      <div style={{ gridColumn: "span 6", fontSize: "var(--text-lg)", fontWeight: "var(--weight-light)",
        lineHeight: "var(--leading-relaxed)", color: "var(--text-body-strong)" }}>{desc}</div>
      <div style={{ gridColumn: "span 2", fontSize: "var(--text-xs)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-meta)", color: "var(--muted-foreground)" }}>{sector}</div>
      <div style={{ gridColumn: "span 1", textAlign: "right", fontFamily: "var(--font-display)",
        fontSize: "var(--text-base)", color: "var(--muted-foreground)" }}>{year}</div>
    </div>
  );
}


function OfficeCard({ city, addr, role, style }) {
  return (
    <div style={{ padding: "var(--pad-card)", background: "var(--ink)", color: "var(--cream)", ...style }}>
      <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--taupe-soft)" }}>{role}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", marginTop: "var(--space-4)" }}>{city}</div>
      <div style={{ marginTop: "var(--space-4)", fontSize: "var(--text-sm)", color: "color-mix(in oklab, var(--cream) 65%, transparent)" }}>{addr}</div>
    </div>
  );
}


/* Team entry as it appears in the artwork: a cut-out portrait over the page ground,
   a full-width rule, then name, role and direct contact details. The portrait is
   optional — where a photograph is missing the rule and type stand alone. */
function PersonCard({ name, role, photo, email, phone, note, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={style}>
      {photo !== undefined && (
        <div style={{ aspectRatio: "1 / 1.12", display: "flex", alignItems: "flex-end", justifyContent: "center",
          overflow: "hidden", marginBottom: "var(--space-6)",
          background: "color-mix(in oklab, var(--sea) 8%, transparent)" }}>
          {photo
            ? <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center",
                filter: hover ? "none" : "saturate(0.85)", transition: "filter var(--duration-fast) var(--ease-standard)" }} />
            : <span style={{ alignSelf: "center", fontSize: "var(--text-2xs)", textTransform: "uppercase",
                letterSpacing: "var(--tracking-caps)", color: "var(--muted-foreground)", textAlign: "center", padding: "0 var(--space-4)" }}>{note || "Portrait to come"}</span>}
        </div>
      )}
      <div style={{ borderTop: "1px solid var(--ink)", paddingTop: "var(--space-4)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", lineHeight: 1.1,
          color: hover ? "var(--taupe)" : "inherit", transition: "color var(--duration-fast) var(--ease-standard)" }}>{name}</div>
        <div style={{ marginTop: "var(--space-2)", fontSize: "var(--text-2xs)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-nav)", color: "var(--muted-foreground)" }}>{role}</div>
        {(phone || email) && (
          <div style={{ marginTop: "var(--space-4)", display: "grid", gap: 2, fontSize: "var(--text-xs)",
            color: "var(--text-quiet)", fontWeight: 300 }}>
            {phone && <span>{phone}</span>}
            {email && <a href={"mailto:" + email}>{email}</a>}
          </div>
        )}
      </div>
    </div>
  );
}


function PullQuote({ children, accent, attribution, title, style }) {
  return (
    <div style={{ maxWidth: "var(--measure-quote)", margin: "0 auto", textAlign: "center", ...style }}>
      <blockquote style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-6xl)",
        lineHeight: "var(--leading-quote)", color: "var(--ink)" }}>
        “{children} {accent && <span style={{ fontStyle: "italic", color: "var(--taupe)" }}>{accent}</span>}”
      </blockquote>
      {attribution && (
        <div style={{ marginTop: "var(--space-12)", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
          <div className="hairline" style={{ width: 64, marginBottom: "var(--space-6)", color: "var(--taupe)" }} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)",
            whiteSpace: "nowrap", lineHeight: 1.2 }}>{attribution}</div>
          {title && <div style={{ marginTop: "var(--space-2)", fontSize: "var(--text-xs)", textTransform: "uppercase",
            letterSpacing: "var(--tracking-caps)", color: "var(--muted-foreground)" }}>{title}</div>}
        </div>
      )}
    </div>
  );
}



function SiteFooter({ columns = [], blurb, legal, offices, style }) {
  return (
    <footer style={{ padding: "var(--space-16) var(--gutter-lg)", background: "var(--ink)", color: "var(--cream)",
      borderTop: "1px solid var(--rule-on-ink)", ...style }}>
      <div style={{ maxWidth: "var(--measure-max)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-12)", marginBottom: "var(--space-16)" }}>
          <div style={{ gridColumn: "span 4" }}>
            <Logo tone="cream" size={16} />
            <p style={{ marginTop: "var(--space-8)", maxWidth: "20rem", fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-relaxed)", color: "color-mix(in oklab, var(--cream) 60%, transparent)" }}>{blurb}</p>
          </div>
          {columns.map((c) => (
            <div key={c.heading} style={{ gridColumn: "span 2" }}>
              <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)",
                marginBottom: "var(--space-6)", color: "var(--taupe-soft)" }}>{c.heading}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-3)",
                fontSize: "var(--text-sm)", color: "color-mix(in oklab, var(--cream) 75%, transparent)" }}>
                {c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: "var(--space-8)", borderTop: "1px solid var(--rule-on-ink)",
          display: "flex", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap",
          fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-nav)",
          color: "color-mix(in oklab, var(--cream) 55%, transparent)" }}>
          <div>{legal}</div>
          <div>{offices}</div>
        </div>
      </div>
    </footer>
  );
}


window.DS = {Button,Input,Textarea,Label,Reveal,RuleDraw,Counter,ScrollProgress,useScrollProgress,useActiveSection,Icon,Logo,Eyebrow,ArrowLink,SectionHeading,StatBlock,ClientMarquee,KnotMark,SOLOMON,Card,CardHeader,CardTitle,CardDescription,CardContent,CardFooter,Badge,Separator,ServiceCard,MethodStep,IndexRow,PublicationRow,FieldNote,InsightCard,TransactionRow,OfficeCard,PersonCard,PullQuote,SiteFooter};

})();
</script>
<script type="text/babel" data-presets="react">
(function(){
