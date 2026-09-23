import React from "react";
import { Icon } from "../brand/Icon.jsx";

/* One step of the four-part method. Roman numeral, flat 2D icon, title, body — set on
   eggshell. The numeral is always in the serif; the icon is always line-only. */
export function MethodStep({ numeral, step, icon, title, body, style }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-8)", alignContent: "start",
      padding: "var(--pad-card)", background: "var(--bone)", ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: 1,
          color: "var(--taupe)" }}>{numeral}</span>
        <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-caps)", color: "var(--stone)" }}>{step}</span>
      </div>
      {icon && <Icon name={icon} size={44} stroke={1.1} style={{ color: "var(--taupe)" }} />}
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", lineHeight: 1.05 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)",
        fontWeight: 300, color: "var(--text-body)" }}>{body}</p>
    </div>
  );
}
