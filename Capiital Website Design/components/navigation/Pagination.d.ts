import * as React from "react";
/** Page stepper; current page carries the hairline box. Prev/Next use unicode arrows. */
export interface PaginationProps {
  page?: number; pages?: number;
  onChange?: (page: number) => void;
  style?: React.CSSProperties;
}
export function Pagination(props: PaginationProps): React.ReactElement;
