import React from "react";

export function Table({ children, style }) {
  return (
    <div style={{ position: "relative", width: "100%", overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-sm)", ...style }}>{children}</table>
    </div>
  );
}
export function TableHeader({ children }) { return <thead>{children}</thead>; }
export function TableBody({ children }) { return <tbody>{children}</tbody>; }
export function TableRow({ children, style }) {
  return <tr style={{ borderBottom: "1px solid var(--border)", ...style }}>{children}</tr>;
}
export function TableHead({ children, style }) {
  return <th style={{ height: 40, padding: "0 var(--space-2)", textAlign: "left", verticalAlign: "middle",
    fontWeight: "var(--weight-medium)", color: "var(--muted-foreground)", ...style }}>{children}</th>;
}
export function TableCell({ children, style }) {
  return <td style={{ padding: "var(--space-2)", verticalAlign: "middle", ...style }}>{children}</td>;
}
