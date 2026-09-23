import React from "react";

export function Slider({ min = 0, max = 100, step = 1, defaultValue = 50, value, onValueChange, style }) {
  const [v, setV] = React.useState(defaultValue);
  const cur = value ?? v;
  const pct = ((cur - min) / (max - min)) * 100;
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%", height: 16, ...style }}>
      <div style={{ position: "absolute", left: 0, right: 0, height: 6, background: "var(--muted)", borderRadius: "var(--radius-sm)" }} />
      <div style={{ position: "absolute", left: 0, width: pct + "%", height: 6, background: "var(--primary)", borderRadius: "var(--radius-sm)" }} />
      <div style={{ position: "absolute", left: "calc(" + pct + "% - 8px)", height: 16, width: 16,
        border: "1px solid var(--primary)", background: "var(--background)", boxShadow: "var(--shadow-xs)" }} />
      <input type="range" min={min} max={max} step={step} value={cur}
        onChange={(e) => { const n = Number(e.target.value); setV(n); onValueChange?.(n); }}
        style={{ position: "absolute", inset: 0, width: "100%", opacity: 0, cursor: "pointer", margin: 0 }} />
    </div>
  );
}
