import * as React from "react";
/** Segmented tab bar on a bone track; the active tab lifts to the page ground. */
export interface TabsProps {
  tabs: { value: string; label: string }[];
  defaultValue?: string;
  children?: React.ReactNode | ((current: string) => React.ReactNode);
  style?: React.CSSProperties;
}
export function Tabs(props: TabsProps): React.ReactElement;
