import * as React from "react";

/**
 * Capiital button. Square corners, restrained tracked uppercase for the editorial variant.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** default = solid ink; secondary = taupe; editorial = hairline CTA used in the hero */
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "editorial";
  size?: "sm" | "default" | "lg" | "icon" | "editorial";
}
export function Button(props: ButtonProps): React.ReactElement;
