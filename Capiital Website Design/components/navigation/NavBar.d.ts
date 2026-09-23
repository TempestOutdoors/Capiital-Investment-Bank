import * as React from "react";
/**
 * The site header: 80px tall, transparent over the hero, then 95% ground + 12px blur + hairline once scrolled.
 */
export interface NavBarProps {
  links?: { label: string; href: string }[];
  /** true after ~40px of scroll: adds ground, blur and bottom hairline */
  solid?: boolean;
  cta?: string;
  style?: React.CSSProperties;
}
export function NavBar(props: NavBarProps): React.ReactElement;
