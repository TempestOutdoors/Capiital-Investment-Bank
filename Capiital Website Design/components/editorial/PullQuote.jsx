import React from "react";

export function PullQuote({ children, accent, attribution, title, style }) {
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
