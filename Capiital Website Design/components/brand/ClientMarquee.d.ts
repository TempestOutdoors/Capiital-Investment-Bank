import * as React from "react";
/** Bone band of client names set in Cormorant at 0.2em tracking, scrolling 40s linear, doubled for a seamless loop. */
export interface ClientMarqueeProps {
  /** client names in caps; the list is rendered twice */
  names: string[];
  style?: React.CSSProperties;
}
export function ClientMarquee(props: ClientMarqueeProps): React.ReactElement;
