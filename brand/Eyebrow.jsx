import React from "react";

export function Eyebrow({ children, style }) {
  return (
    <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-eyebrow)",
      letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase",
      color: "var(--taupe)", fontWeight: "var(--weight-medium)", ...style }}>{children}</div>
  );
}
