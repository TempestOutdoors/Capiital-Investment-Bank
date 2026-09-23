import React from "react";

export function TransactionRow({ value, sub, desc, sector, year, style }) {
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
