import React from "react";

export function Separator({ orientation = "horizontal", style }) {
  return <div role="separator" style={{ flexShrink: 0, background: "var(--border)",
    height: orientation === "horizontal" ? 1 : "100%",
    width: orientation === "horizontal" ? "100%" : 1, ...style }} />;
}
