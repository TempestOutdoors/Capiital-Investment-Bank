import * as React from "react";
/** 36×20 toggle; ink track when on, --input track when off. */
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export function Switch(props: SwitchProps): React.ReactElement;
