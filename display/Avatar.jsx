import React from "react";

export function Avatar({ src, initials, size = 40, style }) {
  return (
    <span style={{ display: "inline-grid", placeItems: "center", height: size, width: size, overflow: "hidden",
      borderRadius: "var(--radius-sm)", background: "var(--muted)", color: "var(--muted-foreground)",
      fontFamily: "var(--font-display)", fontSize: size * 0.4, ...style }}>
      {src ? <img src={src} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} /> : initials}
    </span>
  );
}
