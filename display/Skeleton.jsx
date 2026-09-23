import React from "react";

export function Skeleton({ style }) {
  return <div style={{ background: "var(--muted)", borderRadius: "var(--radius-md)", height: 16, width: "100%", opacity: 0.8, ...style }} />;
}
