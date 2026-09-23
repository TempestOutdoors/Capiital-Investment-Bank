import React from "react";

export function Tabs({ tabs = [], defaultValue, children, style }) {
  const [cur, setCur] = React.useState(defaultValue ?? tabs[0]?.value);
  return (
    <div style={style}>
      <div style={{ display: "inline-flex", height: 36, alignItems: "center", borderRadius: "var(--radius-lg)",
        background: "var(--muted)", padding: 4, color: "var(--muted-foreground)", gap: 2 }}>
        {tabs.map((t) => (
          <button key={t.value} onClick={() => setCur(t.value)}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap",
              borderRadius: "var(--radius-md)", border: "none", padding: "4px var(--space-3)",
              fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", cursor: "pointer",
              transition: "all var(--duration-fast) var(--ease-standard)",
              background: cur === t.value ? "var(--background)" : "transparent",
              color: cur === t.value ? "var(--foreground)" : "inherit",
              boxShadow: cur === t.value ? "var(--shadow-sm)" : "none" }}>{t.label}</button>
        ))}
      </div>
      <div style={{ marginTop: "var(--space-2)" }}>{typeof children === "function" ? children(cur) : children}</div>
    </div>
  );
}
