import React from "react";

/* The publications ledger: category, date, title, reading time. Column widths are fixed
   so a stack of rows aligns like a printed contents page. */
export function PublicationRow({ kind, date, title, read, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "grid", gridTemplateColumns: "12rem 8rem 1fr 6rem 4rem", gap: "var(--space-8)",
        alignItems: "baseline", padding: "var(--space-8) var(--space-6) var(--space-8) 0",
        borderTop: "1px solid var(--border)",
        background: hover ? "var(--white)" : "transparent",
        transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}>
      <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-caps)", color: "var(--taupe)" }}>{kind}</span>
      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-quiet)" }}>{date}</span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", lineHeight: 1.15,
        color: hover ? "var(--taupe)" : "inherit", transition: "color var(--duration-fast) var(--ease-standard)" }}>{title}</span>
      <span style={{ fontSize: "var(--text-xs)", color: "var(--text-quiet)", whiteSpace: "nowrap" }}>{read}</span>
      <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)",
        color: hover ? "var(--taupe)" : "var(--text-quiet)", textAlign: "right" }}>Read →</span>
    </a>
  );
}
