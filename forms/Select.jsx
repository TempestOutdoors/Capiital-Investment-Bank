import React from "react";

export function Select({ options = [], value, defaultValue, placeholder = "Select", onValueChange, disabled, style }) {
  const [open, setOpen] = React.useState(false);
  const [v, setV] = React.useState(defaultValue);
  const cur = value ?? v;
  const label = options.find((o) => o.value === cur)?.label;
  return (
    <div style={{ position: "relative", ...style }}>
      <button
        type="button" disabled={disabled} onClick={() => setOpen(!open)}
        style={{ display: "flex", height: 36, width: "100%", alignItems: "center", justifyContent: "space-between",
          gap: "var(--space-2)", borderRadius: "var(--radius-md)", border: "1px solid var(--input)",
          background: "transparent", padding: "var(--space-2) var(--space-3)", fontFamily: "var(--font-sans)",
          fontSize: "var(--text-sm)", color: label ? "var(--foreground)" : "var(--muted-foreground)",
          boxShadow: "var(--shadow-xs)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }}
      >
        <span>{label || placeholder}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="m6 9 6 6 6-6" /></svg>
      </button>
      {open && (
        <div style={{ position: "absolute", zIndex: 50, marginTop: 4, minWidth: "100%", maxHeight: 240, overflowY: "auto",
          borderRadius: "var(--radius-md)", border: "1px solid var(--border)", background: "var(--popover)",
          color: "var(--popover-foreground)", boxShadow: "var(--shadow-md)", padding: 4 }}>
          {options.map((o) => (
            <div key={o.value} onClick={() => { setV(o.value); onValueChange?.(o.value); setOpen(false); }}
              style={{ position: "relative", display: "flex", alignItems: "center", padding: "6px 32px 6px 8px",
                fontSize: "var(--text-sm)", cursor: "pointer",
                background: cur === o.value ? "var(--accent)" : "transparent",
                color: cur === o.value ? "var(--accent-foreground)" : "inherit" }}>
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
