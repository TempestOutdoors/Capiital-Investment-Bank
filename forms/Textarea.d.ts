import * as React from "react";
/** Multi-line field, min-height 60px, matches Input's border and focus treatment. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function Textarea(props: TextareaProps): React.ReactElement;
