import React from "react";

const base = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-2)",
  whiteSpace: "nowrap", borderRadius: "var(--radius-md)", fontFamily: "var(--font-sans)",
  fontWeight: "var(--weight-medium)", cursor: "pointer", border: "1px solid transparent",
  transition: "color var(--duration-fast) var(--ease-standard), background-color var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
};

const sizes = {
  sm: { height: 32, padding: "0 var(--space-3)", fontSize: "var(--text-xs)" },
  default: { height: 36, padding: "var(--space-2) var(--space-4)", fontSize: "var(--text-sm)" },
  lg: { height: 40, padding: "0 var(--space-8)", fontSize: "var(--text-sm)" },
  icon: { height: 36, width: 36, padding: 0, fontSize: "var(--text-sm)" },
  editorial: { padding: "var(--space-5) var(--space-8)", fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-button)", textTransform: "uppercase" },
};

const variants = {
  default: { background: "var(--primary)", color: "var(--primary-foreground)", boxShadow: "var(--shadow-sm)" },
  secondary: { background: "var(--secondary)", color: "var(--secondary-foreground)", boxShadow: "var(--shadow-xs)" },
  destructive: { background: "var(--destructive)", color: "var(--destructive-foreground)", boxShadow: "var(--shadow-xs)" },
  outline: { background: "var(--background)", color: "var(--foreground)", borderColor: "var(--input)", boxShadow: "var(--shadow-xs)" },
  ghost: { background: "transparent", color: "var(--foreground)" },
  link: { background: "transparent", color: "var(--primary)", textUnderlineOffset: "4px", padding: 0, height: "auto" },
  editorial: { background: "transparent", color: "inherit", borderColor: "color-mix(in oklab, var(--taupe-soft) 40%, transparent)" },
};

const hovers = {
  default: { background: "color-mix(in oklab, var(--primary) 90%, transparent)" },
  secondary: { background: "color-mix(in oklab, var(--secondary) 80%, transparent)" },
  destructive: { background: "color-mix(in oklab, var(--destructive) 90%, transparent)" },
  outline: { background: "var(--accent)", color: "var(--accent-foreground)", borderColor: "var(--accent)" },
  ghost: { background: "var(--accent)", color: "var(--accent-foreground)" },
  link: { textDecoration: "underline" },
  editorial: { background: "var(--taupe)", borderColor: "var(--taupe)", color: "var(--cream)" },
};

export function Button({ variant = "default", size, children, disabled, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const key = size || (variant === "editorial" ? "editorial" : "default");
  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...sizes[key], ...variants[variant], ...(hover && !disabled ? hovers[variant] : null),
        opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer", ...style }}
      {...rest}
    >{children}</button>
  );
}
