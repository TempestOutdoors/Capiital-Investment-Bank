import React from "react";

export function Checkbox({ checked, defaultChecked, onCheckedChange, disabled, style }) {
  const [on, setOn] = React.useState(defaultChecked ?? false);
  const val = checked ?? on;
  return (
    <button
      type="button" role="checkbox" aria-checked={val} disabled={disabled}
      onClick={() => { if (disabled) return; setOn(!val); onCheckedChange?.(!val); }}
      style={{ display: "grid", placeContent: "center", height: 16, width: 16, flexShrink: 0,
        borderRadius: "var(--radius-sm)", border: "1px solid var(--primary)", boxShadow: "var(--shadow-xs)",
        background: val ? "var(--primary)" : "transparent", color: "var(--primary-foreground)",
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, padding: 0, ...style }}
    >
      {val && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      )}
    </button>
  );
}
