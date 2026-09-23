import * as React from "react";
/**
 * Square white card on the cream ground. Structure comes from the hairline border, not shadow.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export function Card(props: CardProps): React.ReactElement;
export function CardHeader(props: CardProps): React.ReactElement;
export function CardTitle(props: CardProps): React.ReactElement;
export function CardDescription(props: CardProps): React.ReactElement;
export function CardContent(props: CardProps): React.ReactElement;
export function CardFooter(props: CardProps): React.ReactElement;
