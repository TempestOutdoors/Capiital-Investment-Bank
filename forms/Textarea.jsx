import React from "react";

export function Textarea({ style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      {...rest}
      style={{ display: "flex", minHeight: 60, width: "100%", borderRadius: "var(--radius-md)",
        border: "1px solid var(--input)", background: "transparent", padding: "var(--space-2) var(--space-3)",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--foreground)",
        boxShadow: "var(--shadow-xs)", outline: "none", resize: "vertical",
        borderColor: focus ? "var(--ring)" : "var(--input)", ...style }}
    />
  );
}
