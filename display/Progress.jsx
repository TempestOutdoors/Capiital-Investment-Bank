import React from "react";

export function Progress({ value = 0, style }) {
  return (
    <div style={{ position: "relative", height: 8, width: "100%", overflow: "hidden",
      borderRadius: "var(--radius-sm)", background: "var(--muted)", ...style }}>
      <div style={{ height: "100%", width: value + "%", background: "var(--primary)",
        transition: "width var(--duration-fast) var(--ease-standard)" }} />
    </div>
  );
}
