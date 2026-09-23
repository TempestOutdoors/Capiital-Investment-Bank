import React from "react";

export function RadioGroup({ value, defaultValue, onValueChange, options = [], name = "radio", style }) {
  const [v, setV] = React.useState(defaultValue);
  const cur = value ?? v;
  return (
    <div role="radiogroup" style={{ display: "grid", gap: "var(--space-3)", ...style }}>
      {options.map((o) => {
        const on = cur === o.value;
        return (
          <label key={o.value} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", cursor: "pointer", fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)" }}>
            <span
              onClick={() => { setV(o.value); onValueChange?.(o.value); }}
              style={{ display: "grid", placeContent: "center", height: 16, width: 16, borderRadius: "var(--radius-pill)",
                border: "1px solid var(--primary)", boxShadow: "var(--shadow-xs)" }}
            >
              {on && <span style={{ height: 8, width: 8, borderRadius: "var(--radius-pill)", background: "var(--primary)" }} />}
            </span>
            <input type="radio" name={name} value={o.value} checked={on} onChange={() => {}} style={{ display: "none" }} />
            {o.label}
          </label>
        );
      })}
    </div>
  );
}
