import React from "react";

export function OfficeCard({ city, addr, role, style }) {
  return (
    <div style={{ padding: "var(--pad-card)", background: "var(--ink)", color: "var(--cream)", ...style }}>
      <div style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)", color: "var(--taupe-soft)" }}>{role}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", marginTop: "var(--space-4)" }}>{city}</div>
      <div style={{ marginTop: "var(--space-4)", fontSize: "var(--text-sm)", color: "color-mix(in oklab, var(--cream) 65%, transparent)" }}>{addr}</div>
    </div>
  );
}
