import React from "react";

/* A numbered ledger row: ordinal, title, body, optional meta — separated by hairlines
   rather than boxed. The institutional alternative to a grid of cards, and the pattern
   the lower half of the site is built from. */
export function IndexRow({ index, title, body, meta, onSelect, tone = "light", style }) {
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
