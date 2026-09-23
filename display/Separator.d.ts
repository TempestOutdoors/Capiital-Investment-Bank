import * as React from "react";
/** 1px rule in --border. For the editorial 18%-opacity rule use the .hairline class instead. */
export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  style?: React.CSSProperties;
}
export function Separator(props: SeparatorProps): React.ReactElement;
