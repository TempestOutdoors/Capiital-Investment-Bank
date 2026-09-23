import React from "react";

export function Breadcrumb({ items = [], style }) {
  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-2)",
      fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", textTransform: "uppercase",
      letterSpacing: "var(--tracking-meta)", color: "var(--muted-foreground)", ...style }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span aria-hidden style={{ opacity: 0.5 }}>/</span>}
          {it.href && i < items.length - 1
            ? <a href={it.href}>{it.label}</a>
            : <span style={{ color: "var(--foreground)" }}>{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
