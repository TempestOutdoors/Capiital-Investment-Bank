import React from "react";

export function Card({ children, style, ...rest }) {
  return (
    <div style={{ borderRadius: "var(--radius-xl)", border: "1px solid var(--border)",
      background: "var(--card)", color: "var(--card-foreground)", boxShadow: "var(--shadow-sm)", ...style }} {...rest}>
      {children}
    </div>
  );
}
export function CardHeader({ children, style }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "var(--space-6)", ...style }}>{children}</div>;
}
export function CardTitle({ children, style }) {
  return <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: 1, letterSpacing: "var(--tracking-heading)", ...style }}>{children}</div>;
}
export function CardDescription({ children, style }) {
  return <div style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)", lineHeight: "var(--leading-relaxed)", ...style }}>{children}</div>;
}
export function CardContent({ children, style }) {
  return <div style={{ padding: "0 var(--space-6) var(--space-6)", ...style }}>{children}</div>;
}
export function CardFooter({ children, style }) {
  return <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", padding: "0 var(--space-6) var(--space-6)", ...style }}>{children}</div>;
}
