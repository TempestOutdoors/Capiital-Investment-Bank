import * as React from "react";
/** Vertical radio list. The dot is the one intentionally round control in the system. */
export interface RadioGroupProps {
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  style?: React.CSSProperties;
}
export function RadioGroup(props: RadioGroupProps): React.ReactElement;
