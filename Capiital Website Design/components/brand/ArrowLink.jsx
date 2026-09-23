import React from "react";

export function ArrowLink({ children, href = "#", underline = true, style, ...rest }) {
  return (
    <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)",
      fontSize: 12, textTransform: "uppercase", letterSpacing: "var(--tracking-button)",
      borderBottom: underline ? "1px solid color-mix(in oklab, var(--taupe) 60%, transparent)" : "none",
      paddingBottom: 4, ...style }} {...rest}>
      {children} <span aria-hidden>→</span>
    </a>
  );
}
