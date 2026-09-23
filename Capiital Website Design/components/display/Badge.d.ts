import * as React from "react";
/** Small status pill (square). 12px semibold, padding 2/10. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}
export function Badge(props: BadgeProps): React.ReactElement;
