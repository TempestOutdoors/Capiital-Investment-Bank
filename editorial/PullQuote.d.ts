import * as React from "react";
/**
 * Centred partner quotation with an italic taupe clause, a 64px hairline, and attribution.
 */
export interface PullQuoteProps {
  children?: React.ReactNode;
  /** the clause to italicise in taupe — the emphasis is always a phrase, never a whole sentence */
  accent?: React.ReactNode;
  attribution?: string;
  /** role line under the name */
  title?: string;
  style?: React.CSSProperties;
}
export function PullQuote(props: PullQuoteProps): React.ReactElement;
