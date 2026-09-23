import React from "react";

/* Scroll-entry wrapper. One IntersectionObserver per element, fired once, never reversed —
   the page settles as it is read and then stays put. Three variants only:
   "settle" (14px + fade), "veil" (opacity only, for prose), "draw" (a hairline growing
   from its left edge). `step` stages a group: delay = step x --stagger-row. */
export function Reveal({ variant = "settle", step = 0, as = "div", threshold = 0.2,
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
export function RuleDraw({ tone = "light", step = 0, style }) {
  return (
    <Reveal variant="draw" step={step} threshold={0.05}
      style={{ height: 1, background: tone === "dark" ? "var(--rule-on-ink)" : "var(--border)",
        ...(tone === "ink" ? { background: "var(--ink)" } : null), ...style }} />
  );
}
