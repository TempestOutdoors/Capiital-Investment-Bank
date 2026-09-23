import React from "react";

export function Dialog({ open, onClose, title, description, children, footer }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "var(--scrim)" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
        width: "100%", maxWidth: 512, display: "grid", gap: "var(--space-4)",
        border: "1px solid var(--border)", background: "var(--background)", padding: "var(--space-6)",
        boxShadow: "var(--shadow-lg)", borderRadius: "var(--radius-lg)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {title && <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: 1 }}>{title}</div>}
          {description && <div style={{ fontSize: "var(--text-sm)", color: "var(--muted-foreground)" }}>{description}</div>}
        </div>
        {children}
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-2)" }}>{footer}</div>}
        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", right: "var(--space-4)",
          top: "var(--space-4)", background: "none", border: "none", opacity: 0.7, cursor: "pointer", color: "inherit" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}
