import React from "react";

export function InsightCard({ kind, date, title, read, style }) {
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
