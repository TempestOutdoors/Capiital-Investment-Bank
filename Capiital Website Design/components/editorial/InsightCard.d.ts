import * as React from "react";
/**
 * A research item: kind + date, Cormorant title, then a hairline footer with read time and "Read →".
 */
export interface InsightCardProps {
  /** "Market Letter" | "Sector Note" | "Quarterly Review" */
  kind: string;
  /** e.g. "Q2 · 2026" */
  date: string;
  title: React.ReactNode;
  /** e.g. "12 min" */
  read: string;
  style?: React.CSSProperties;
}
export function InsightCard(props: InsightCardProps): React.ReactElement;
