import React from "react";

export function ClientMarquee({ names = [], style }) {
  const row = (k) => (
    <div key={k} style={{ display: "flex", alignItems: "center", gap: "var(--space-16)", flexShrink: 0 }}>
      {names.map((n) => (
        <span key={n} style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", letterSpacing: "0.2em" }}>{n}</span>
      ))}
    </div>
  );
  return (
    <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      overflow: "hidden", padding: "var(--space-8) 0", background: "var(--surface-band)", ...style }}>
      <div className="animate-marquee" style={{ display: "flex", alignItems: "center", gap: "var(--space-16)",
        whiteSpace: "nowrap", color: "color-mix(in oklab, var(--foreground) 55%, transparent)", width: "max-content" }}>
        {row(0)}{row(1)}
      </div>
    </section>
  );
}
