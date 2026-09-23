import * as React from "react";
/**
 * One tombstone: value + deal type, description, sector, year on a 12-column baseline-aligned row.
 */
export interface TransactionRowProps {
  /** headline consideration, e.g. "$4.2B" */
  value: string;
  /** deal type under the figure, e.g. "Sell-side M&A" */
  sub: string;
  desc: React.ReactNode;
  sector: string;
  year: string;
  style?: React.CSSProperties;
}
export function TransactionRow(props: TransactionRowProps): React.ReactElement;
