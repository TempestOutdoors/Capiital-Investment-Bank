import React from "react";

/* Icons are Lucide, unmodified geometry, inlined so no icon package is required.
   The brand uses them flat and 2D — line only, currentColor, never filled, never
   rendered as glossy 3D objects. Editorial sizes run 20–56px at stroke 1.25;
   inside form and navigation primitives they stay 16px at stroke 2. */
const PATHS = {
  "arrow-right": `<path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path>`,
  "arrow-up-right": `<path d="M7 7h10v10"></path> <path d="M7 17 17 7"></path>`,
  "atom": `<circle cx="12" cy="12" r="1"></circle> <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"></path> <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"></path>`,
  "blocks": `<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"></path> <rect x="14" y="2" width="8" height="8" rx="1"></rect>`,
  "chart-line": `<path d="M3 3v16a2 2 0 0 0 2 2h16"></path> <path d="m19 9-5 5-4-4-3 3"></path>`,
  "check": `<path d="M20 6 9 17l-5-5"></path>`,
  "chevron-down": `<path d="m6 9 6 6 6-6"></path>`,
  "chevron-up": `<path d="m18 15-6-6-6 6"></path>`,
  "cog": `<path d="M11 10.27 7 3.34"></path> <path d="m11 13.73-4 6.93"></path> <path d="M12 22v-2"></path> <path d="M12 2v2"></path> <path d="M14 12h8"></path> <path d="m17 20.66-1-1.73"></path> <path d="m17 3.34-1 1.73"></path> <path d="M2 12h2"></path> <path d="m20.66 17-1.73-1"></path> <path d="m20.66 7-1.73 1"></path> <path d="m3.34 17 1.73-1"></path> <path d="m3.34 7 1.73 1"></path> <circle cx="12" cy="12" r="2"></circle> <circle cx="12" cy="12" r="8"></circle>`,
  "gauge": `<path d="m12 14 4-4"></path> <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>`,
  "lightbulb": `<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path> <path d="M9 18h6"></path> <path d="M10 22h4"></path>`,
  "mail": `<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path> <rect x="2" y="4" width="20" height="16" rx="2"></rect>`,
  "minus": `<path d="M5 12h14"></path>`,
  "network": `<rect x="16" y="16" width="6" height="6" rx="1"></rect> <rect x="2" y="16" width="6" height="6" rx="1"></rect> <rect x="9" y="2" width="6" height="6" rx="1"></rect> <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path> <path d="M12 12V8"></path>`,
  "plus": `<path d="M5 12h14"></path> <path d="M12 5v14"></path>`,
  "refresh-cw": `<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path> <path d="M21 3v5h-5"></path> <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path> <path d="M8 16H3v5"></path>`,
  "search": `<path d="m21 21-4.34-4.34"></path> <circle cx="11" cy="11" r="8"></circle>`,
  "triangle": `<path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>`,
  "users": `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <path d="M16 3.128a4 4 0 0 1 0 7.744"></path> <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path> <circle cx="9" cy="7" r="4"></circle>`,
  "x": `<path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path>`
};

export function Icon({ name, size = 24, stroke = 1.25, style, ...rest }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden
      style={{ display: "block", flexShrink: 0, ...style }} {...rest}
      dangerouslySetInnerHTML={{ __html: d }} />
  );
}

Icon.names = Object.keys(PATHS);
