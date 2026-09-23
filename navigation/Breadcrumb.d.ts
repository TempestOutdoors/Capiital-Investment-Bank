import * as React from "react";
/** Uppercase tracked trail separated by slashes; current page in --foreground. */
export interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  style?: React.CSSProperties;
}
export function Breadcrumb(props: BreadcrumbProps): React.ReactElement;
