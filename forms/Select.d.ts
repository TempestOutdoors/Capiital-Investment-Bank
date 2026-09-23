import * as React from "react";
/** Trigger + popover list. Trigger matches Input geometry; chevron is Lucide chevron-down at 50% opacity. */
export interface SelectProps {
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Select(props: SelectProps): React.ReactElement;
