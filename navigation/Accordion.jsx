import React from "react";

export function Accordion({ items = [], defaultOpen = null, style }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div style={style}>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
            <button onClick={() => setOpen(on ? null : i)}
              style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between",
                gap: "var(--space-4)", background: "none", border: "none", padding: "var(--space-4) 0",
                fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)",
                color: "var(--foreground)", textAlign: "left", cursor: "pointer" }}>
              {it.title}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0, color: "var(--muted-foreground)", transform: on ? "rotate(180deg)" : "none",
                  transition: "transform 200ms var(--ease-standard)" }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {on && <div style={{ paddingBottom: "var(--space-4)", fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-relaxed)", color: "var(--text-body)" }}>{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
