import React from "react";
import { Icon } from "../brand/Icon.jsx";

/* A service, on the deep-sea ground: optional flat icon, title, body, and the
   client sentence the firm quotes underneath. Hover moves the type, never the box. */
export function ServiceCard({ number, icon, title, body, quote, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ padding: "var(--pad-card-lg)", cursor: "pointer", background: "var(--sea-deep)", color: "var(--cream)",
        transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "var(--space-10)" }}>
        {icon
          ? <Icon name={icon} size={40} stroke={1.1} style={{ color: "var(--taupe-soft)" }} />
          : <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", color: "var(--taupe-soft)" }}>{number}</span>}
        <span style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-caps)",
          color: "var(--taupe-soft)", opacity: hover ? 1 : 0, transition: "opacity var(--duration-fast) var(--ease-standard)" }}>Explore →</span>
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-5xl)", lineHeight: 1.1,
        marginBottom: "var(--space-6)", color: hover ? "var(--taupe-soft)" : "var(--cream)",
        transition: "color var(--duration-fast) var(--ease-standard)" }}>{title}</h3>
      <p style={{ fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)", maxWidth: "28rem",
        margin: 0, color: "color-mix(in oklab, var(--cream) 65%, transparent)" }}>{body}</p>
      {quote && (
        <p style={{ marginTop: "var(--space-8)", paddingTop: "var(--space-6)", maxWidth: "28rem",
          borderTop: "1px solid var(--rule-on-ink)", fontFamily: "var(--font-display)", fontStyle: "italic",
          fontSize: "var(--text-lg)", lineHeight: 1.4, color: "var(--taupe-soft)" }}>“{quote}”</p>
      )}
    </div>
  );
}
