import React from "react";
import { Logo } from "../brand/Logo.jsx";

export function NavBar({ links = [], cta = "Client Portal", solid = false, style }) {
  return (
    <header style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all var(--duration-nav) var(--ease-standard)",
      background: solid ? "color-mix(in oklab, var(--background) 95%, transparent)" : "transparent",
      backdropFilter: solid ? "blur(var(--backdrop-blur))" : "none",
      borderBottom: solid ? "1px solid var(--border)" : "1px solid transparent", ...style }}>
      <div style={{ maxWidth: "var(--measure-max)", margin: "0 auto", padding: "0 var(--gutter-lg)",
        height: "var(--nav-height)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top" style={{ flexShrink: 0 }}><Logo size={16} /></a>
        <nav style={{ display: "flex", alignItems: "center", gap: "clamp(var(--space-4), 2.1vw, var(--space-10))", fontSize: 12, minWidth: 0, whiteSpace: "nowrap",
          textTransform: "uppercase", letterSpacing: "var(--tracking-nav)",
          color: "color-mix(in oklab, currentColor 80%, transparent)" }}>
          {links.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        </nav>
        <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)",
          fontSize: 12, textTransform: "uppercase", letterSpacing: "var(--tracking-nav)",
          borderBottom: "1px solid var(--taupe)", paddingBottom: 4, whiteSpace: "nowrap", flexShrink: 0 }}>{cta} <span aria-hidden>→</span></a>
      </div>
    </header>
  );
}
