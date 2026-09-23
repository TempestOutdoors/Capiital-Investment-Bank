import * as React from "react";
/** Office tile on navy: role caps, Cormorant city, street address. Sits in a gap-px grid. */
export interface OfficeCardProps {
  city: string;
  addr: string;
  /** coverage label, e.g. "Global Headquarters", "EMEA" */
  role: string;
  style?: React.CSSProperties;
}
export function OfficeCard(props: OfficeCardProps): React.ReactElement;
