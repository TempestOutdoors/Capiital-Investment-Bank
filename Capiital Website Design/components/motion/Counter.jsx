import React from "react";

/* A headline figure that arrives by counting. Set in the display serif with tabular
   figures so the width never jitters; `value` is written exactly as it should read
   ("90%", "3x", "18 mo") and the numeric part is what animates. One pass, on entry. */
export function Counter({ value, duration = 1400, style, className }) {
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
