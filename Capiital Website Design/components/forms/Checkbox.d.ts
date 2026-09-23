import * as React from "react";
/** 16×16 square checkbox, ink border, ink fill when checked, Lucide check glyph. */
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Checkbox(props: CheckboxProps): React.ReactElement;
