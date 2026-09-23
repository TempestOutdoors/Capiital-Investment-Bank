import React from "react";

export function Pagination({ page = 1, pages = 5, onChange, style }) {
  const cell = (active) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center",
    height: 36, minWidth: 36, padding: "0 var(--space-2)", border: "1px solid " + (active ? "var(--input)" : "transparent"),
    background: active ? "var(--background)" : "transparent", fontFamily: "var(--font-sans)",
    fontSize: "var(--text-sm)", cursor: "pointer", color: "var(--foreground)" });
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-1)", ...style }}>
      <button style={{ ...cell(false), letterSpacing: "var(--tracking-meta)", textTransform: "uppercase", fontSize: "var(--text-xs)" }}
        onClick={() => onChange?.(Math.max(1, page - 1))}>← Prev</button>
      {Array.from({ length: pages }).map((_, i) => (
        <button key={i} style={cell(page === i + 1)} onClick={() => onChange?.(i + 1)}>{i + 1}</button>
      ))}
      <button style={{ ...cell(false), letterSpacing: "var(--tracking-meta)", textTransform: "uppercase", fontSize: "var(--text-xs)" }}
        onClick={() => onChange?.(Math.min(pages, page + 1))}>Next →</button>
    </nav>
  );
}
