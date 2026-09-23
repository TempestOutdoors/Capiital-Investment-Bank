import React from "react";

const v = {
  default: { background: "var(--primary)", color: "var(--primary-foreground)", borderColor: "transparent", boxShadow: "var(--shadow-xs)" },
  secondary: { background: "var(--secondary)", color: "var(--secondary-foreground)", borderColor: "transparent" },
  destructive: { background: "var(--destructive)", color: "var(--destructive-foreground)", borderColor: "transparent" },
  outline: { background: "transparent", color: "var(--foreground)", borderColor: "var(--border)" },
};

export function Badge({ variant = "default", children, style, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", borderRadius: "var(--radius-md)",
      border: "1px solid", padding: "2px 10px", fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)", ...v[variant], ...style }} {...rest}>{children}</span>
  );
}
