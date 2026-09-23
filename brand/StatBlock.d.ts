import * as React from "react";
/** Big Cormorant figure over an 11px tracked caps label. Used in the hero stat row and firm facts. */
export interface StatBlockProps {
  value: React.ReactNode;
  label: React.ReactNode;
  size?: "sm" | "md" | "lg";
  /** cream on the navy ground (label goes taupe-soft) */
  tone?: "auto" | "cream";
  style?: React.CSSProperties;
}
export function StatBlock(props: StatBlockProps): React.ReactElement;
