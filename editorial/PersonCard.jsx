import React from "react";

/* Team entry as it appears in the artwork: a cut-out portrait over the page ground,
   a full-width rule, then name, role and direct contact details. The portrait is
   optional — where a photograph is missing the rule and type stand alone. */
export function PersonCard({ name, role, photo, email, phone, note, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={style}>
      {photo !== undefined && (
        <div style={{ aspectRatio: "1 / 1.12", display: "flex", alignItems: "flex-end", justifyContent: "center",
          overflow: "hidden", marginBottom: "var(--space-6)",
          background: "color-mix(in oklab, var(--sea) 8%, transparent)" }}>
          {photo
            ? <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center",
                filter: hover ? "none" : "saturate(0.85)", transition: "filter var(--duration-fast) var(--ease-standard)" }} />
            : <span style={{ alignSelf: "center", fontSize: "var(--text-2xs)", textTransform: "uppercase",
                letterSpacing: "var(--tracking-caps)", color: "var(--muted-foreground)", textAlign: "center", padding: "0 var(--space-4)" }}>{note || "Portrait to come"}</span>}
        </div>
      )}
      <div style={{ borderTop: "1px solid var(--ink)", paddingTop: "var(--space-4)" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", lineHeight: 1.1,
          color: hover ? "var(--taupe)" : "inherit", transition: "color var(--duration-fast) var(--ease-standard)" }}>{name}</div>
        <div style={{ marginTop: "var(--space-2)", fontSize: "var(--text-2xs)", textTransform: "uppercase",
          letterSpacing: "var(--tracking-nav)", color: "var(--muted-foreground)" }}>{role}</div>
        {(phone || email) && (
          <div style={{ marginTop: "var(--space-4)", display: "grid", gap: 2, fontSize: "var(--text-xs)",
            color: "var(--text-quiet)", fontWeight: 300 }}>
            {phone && <span>{phone}</span>}
            {email && <a href={"mailto:" + email}>{email}</a>}
          </div>
        )}
      </div>
    </div>
  );
}
