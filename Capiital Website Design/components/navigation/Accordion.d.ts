import * as React from "react";
/** Hairline-ruled disclosure list; chevron rotates 180° on open. */
export interface AccordionProps {
  items: { title: React.ReactNode; content: React.ReactNode }[];
  defaultOpen?: number | null;
  style?: React.CSSProperties;
}
export function Accordion(props: AccordionProps): React.ReactElement;
