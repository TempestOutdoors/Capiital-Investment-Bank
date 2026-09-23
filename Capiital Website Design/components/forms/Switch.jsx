import React from "react";

export function Switch({ checked, defaultChecked, onCheckedChange, disabled, style }) {
  const [on, setOn] = React.useState(defaultChecked ?? false);
  const val = checked ?? on;
  return (
    <button
      type="button" role="switch" aria-checked={val} disabled={disabled}
      onClick={() => { if (disabled) return; setOn(!val); onCheckedChange?.(!val); }}
      style={{ display: "inline-flex", alignItems: "center", height: 20, width: 36, flexShrink: 0,
        borderRadius: "var(--radius-pill)", border: "2px solid transparent", padding: 0,
        boxShadow: "var(--shadow-xs)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1,
        background: val ? "var(--primary)" : "var(--input)",
        transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}
    >
      <span style={{ display: "block", height: 16, width: 16, borderRadius: "var(--radius-pill)",
        background: "var(--background)", boxShadow: "var(--shadow-lg)",
        transform: val ? "translateX(16px)" : "translateX(0)",
        transition: "transform var(--duration-fast) var(--ease-standard)" }} />
    </button>
  );
}
