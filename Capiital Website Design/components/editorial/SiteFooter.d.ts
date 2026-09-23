import * as React from "react";
/**
 * Navy footer: wordmark + blurb on a 4-column span, three 2-column link stacks, then a hairline legal strip.
 */
export interface SiteFooterProps {
  columns?: { heading: string; links: string[] }[];
  blurb?: React.ReactNode;
  /** left-hand legal line, e.g. "© 2026 CAP=TAL Partners LLP · Authorised and regulated" */
  legal?: React.ReactNode;
  /** right-hand office list, middle-dot separated */
  offices?: React.ReactNode;
  style?: React.CSSProperties;
}
export function SiteFooter(props: SiteFooterProps): React.ReactElement;
