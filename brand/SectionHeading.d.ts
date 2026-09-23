import * as React from "react";
/**
 * Eyebrow + multi-line serif heading whose last line is italic in the accent (forest on light, teal on deep blue).
 */
export interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  /** each entry becomes its own line (hard breaks are deliberate on this brand) */
  lines?: React.ReactNode[];
  /** final line, rendered italic in the accent colour */
  accentLine?: React.ReactNode;
  size?: "md" | "lg" | "xl";
  style?: React.CSSProperties;
}
export function SectionHeading(props: SectionHeadingProps): React.ReactElement;
