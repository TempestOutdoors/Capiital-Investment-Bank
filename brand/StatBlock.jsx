import React from "react";

export function StatBlock({ value, label, size = "lg", tone = "auto", style }) {
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
