import React from "react";

export function Tooltip({ label, children, side = "top" }) {
  const [open, setOpen] = React.useState(false);
  const pos = side === "bottom" ? { top: "calc(100% + 4px)" } : { bottom: "calc(100% + 4px)" };
  return (
    <span style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open && (
        <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", ...pos,
          zIndex: 50, whiteSpace: "nowrap", borderRadius: "var(--radius-md)", background: "var(--primary)",
          color: "var(--primary-foreground)", padding: "6px var(--space-3)", fontSize: "var(--text-xs)" }}>{label}</span>
      )}
    </span>
  );
}
