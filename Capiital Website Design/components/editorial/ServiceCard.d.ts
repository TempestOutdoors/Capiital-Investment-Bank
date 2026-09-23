/**
 * A service on the deep-sea ground: icon or number, title, body, and an optional client quote.
 * @startingPoint section="Editorial" subtitle="Deep-sea service card with quote" viewport="700x380"
 */
export interface ServiceCardProps {
  /** Two-digit ordinal, shown when no icon is given. */
  number?: string;
  /** Icon name from the `Icon` set. Takes the place of the number. */
  icon?: string;
  title: string;
  body: string;
  /** One sentence in the client's words, set in the serif italic under a hairline. */
  quote?: string;
  style?: React.CSSProperties;
}
export declare function ServiceCard(props: ServiceCardProps): JSX.Element;
