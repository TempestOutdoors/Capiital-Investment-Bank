import React from "react";

export function Input({ style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <input
      onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
      onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
      {...rest}
      style={{ display: "flex", height: 36, width: "100%", borderRadius: "var(--radius-md)",
        border: "1px solid var(--input)", background: "transparent", padding: "var(--space-1) var(--space-3)",
        fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--foreground)",
        boxShadow: "var(--shadow-xs)", outline: "none",
        borderColor: focus ? "var(--ring)" : "var(--input)",
        opacity: rest.disabled ? 0.5 : 1, ...style }}
    />
  );
}
