import React from "react";

/* A field note: memo number, a claim stated plainly, and the link to the memo.
   Three across on the warm ground, separated by hairlines rather than boxes. */
export function FieldNote({ memo, title, body, cta = "Read the memo", style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "grid", gap: "var(--space-6)", alignContent: "start", padding: "var(--pad-card)",
        background: hover ? "var(--white)" : "transparent", cursor: "pointer",
        transition: "background-color var(--duration-fast) var(--ease-standard)", ...style }}>
      <span style={{ fontSize: "var(--text-2xs)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-caps)", color: "var(--stone)" }}>{memo}</span>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", lineHeight: 1.12,
        color: hover ? "var(--taupe)" : "inherit", transition: "color var(--duration-fast) var(--ease-standard)" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-relaxed)",
        fontWeight: 300, color: "var(--text-body)" }}>{body}</p>
      <span style={{ fontSize: "var(--text-xs)", textTransform: "uppercase",
        letterSpacing: "var(--tracking-caps)", color: hover ? "var(--taupe)" : "var(--text-quiet)" }}>{cta} →</span>
    </article>
  );
}
