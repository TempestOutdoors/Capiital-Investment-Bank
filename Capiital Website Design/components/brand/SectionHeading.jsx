import React from "react";
import { Eyebrow } from "./Eyebrow.jsx";

export function SectionHeading({ eyebrow, lines = [], accentLine, size = "lg", style }) {
  const fs = size === "xl" ? "var(--text-7xl)" : size === "md" ? "var(--text-5xl)" : "var(--text-6xl)";
  return (
    <div style={style}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 style={{ marginTop: "var(--space-6)", fontFamily: "var(--font-display)", fontSize: fs,
        lineHeight: "var(--leading-display)", letterSpacing: "var(--tracking-heading)" }}>
        {lines.map((l, i) => <React.Fragment key={i}>{l}<br /></React.Fragment>)}
        {accentLine && <span style={{ fontStyle: "italic", color: "var(--accent)" }}>{accentLine}</span>}
      </h2>
    </div>
  );
}
