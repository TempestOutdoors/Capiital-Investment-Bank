import React from "react";

/* The CAP//TAL wordmark. The name is set in the sans at generous tracking; the doubled "II"
   at the heart of the word is replaced by two slanted bars — the ownable detail, and the only
   part that ever carries the accent colour. `banner` wraps it in the plaque used in the
   artwork: a solid deep-sea field with the right edge cut at the same angle as the bars. */
export function Logo({ tone = "ink", size = 18, banner = false, accent = false, style }) {
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
