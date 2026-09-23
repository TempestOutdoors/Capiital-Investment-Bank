import React from "react";

export function Label({ children, style, ...rest }) {
  return (
    <label style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-medium)", lineHeight: 1, color: "var(--foreground)", ...style }} {...rest}>
      {children}
    </label>
  );
}
