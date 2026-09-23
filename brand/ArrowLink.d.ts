import * as React from "react";
/** Tracked uppercase link with a unicode → and a taupe underline. The brand's default text CTA. */
export interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  underline?: boolean;
}
export function ArrowLink(props: ArrowLinkProps): React.ReactElement;
