import React from "react";

/* A 1px rule across the top of the page showing read progress. Institutional rather than
   decorative: no glow, no gradient, the accent at a single weight. */
export function ScrollProgress({ tone = "light", style }) {
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
export function useScrollProgress(ref) {
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
export function useActiveSection(ids) {
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
