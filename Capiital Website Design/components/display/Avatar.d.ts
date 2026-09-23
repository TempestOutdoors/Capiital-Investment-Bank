import * as React from "react";
/** Square portrait or initials tile. Initials are set in the display serif. */
export interface AvatarProps {
  src?: string;
  initials?: string;
  size?: number;
  style?: React.CSSProperties;
}
export function Avatar(props: AvatarProps): React.ReactElement;
