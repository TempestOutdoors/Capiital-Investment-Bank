import React from "react";

export function Alert({ variant = "default", title, children, style }) {
  const dest = variant === "destructive";
  return (
    <div role="alert" style={{ position: "relative", width: "100%", borderRadius: "var(--radius-lg)",
      border: "1px solid " + (dest ? "color-mix(in oklab, var(--destructive) 50%, transparent)" : "var(--border)"),
      padding: "var(--space-4)", background: "var(--background)",
      color: dest ? "var(--destructive)" : "var(--foreground)", ...style }}>
      {title && <div style={{ fontFamily: "var(--font-sans)", fontWeight: "var(--weight-medium)", fontSize: "var(--text-sm)", marginBottom: 4 }}>{title}</div>}
      <div style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-relaxed)", color: dest ? "inherit" : "var(--muted-foreground)" }}>{children}</div>
    </div>
  );
}
