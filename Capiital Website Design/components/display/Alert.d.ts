import * as React from "react";
/** Inline notice; hairline border, no icon by default. */
export interface AlertProps {
  variant?: "default" | "destructive";
  title?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Alert(props: AlertProps): React.ReactElement;
