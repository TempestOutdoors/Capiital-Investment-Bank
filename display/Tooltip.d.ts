import * as React from "react";
/** Hover label: ink ground, cream 12px text, 4px offset. */
export interface TooltipProps {
  label: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom";
}
export function Tooltip(props: TooltipProps): React.ReactElement;
