import * as React from "react";
/** Range control: 6px track, square 16px handle with ink hairline border. */
export interface SliderProps {
  min?: number; max?: number; step?: number;
  defaultValue?: number; value?: number;
  onValueChange?: (value: number) => void;
  style?: React.CSSProperties;
}
export function Slider(props: SliderProps): React.ReactElement;
