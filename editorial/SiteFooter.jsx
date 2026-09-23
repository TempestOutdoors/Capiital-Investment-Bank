import React from "react";
import { Logo } from "../brand/Logo.jsx";

export function SiteFooter({ columns = [], blurb, legal, offices, style }) {
  return (
    <footer style={{ padding: "var(--space-16) var(--gutter-lg)", background: "var(--ink)", color: "var(--cream)",
      borderTop: "1px solid var(--rule-on-ink)", ...style }}>
      <div style={{ maxWidth: "var(--measure-max)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "var(--space-12)", marginBottom: "var(--space-16)" }}>
          <div style={{ gridColumn: "span 4" }}>
            <Logo tone="cream" size={16} />
            <p style={{ marginTop: "var(--space-8)", maxWidth: "20rem", fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-relaxed)", color: "color-mix(in oklab, var(--cream) 60%, transparent)" }}>{blurb}</p>
          </div>
          {columns.map((c) => (
            <div key={c.heading} style={{ gridColumn: "span 2" }}>
              <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)",
                marginBottom: "var(--space-6)", color: "var(--taupe-soft)" }}>{c.heading}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--space-3)",
                fontSize: "var(--text-sm)", color: "color-mix(in oklab, var(--cream) 75%, transparent)" }}>
                {c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: "var(--space-8)", borderTop: "1px solid var(--rule-on-ink)",
          display: "flex", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap",
          fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-nav)",
          color: "color-mix(in oklab, var(--cream) 55%, transparent)" }}>
          <div>{legal}</div>
          <div>{offices}</div>
        </div>
      </div>
    </footer>
  );
}
