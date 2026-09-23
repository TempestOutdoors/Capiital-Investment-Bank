/**
 * A numbered ledger row — ordinal, title, body, meta — separated by hairlines, not boxed.
 * @startingPoint section="Editorial" subtitle="Hairline ledger row, light or deep-sea" viewport="900x160"
 */
export interface IndexRowProps {
  /** Ordinal, set in the serif: "01", "I". */
  index: string;
  title: string;
  body: string;
  /** Right-hand meta. When omitted a "Read →" appears on hover. */
  meta?: string;
  /** Makes the whole row a target. */
  onSelect?: () => void;
  /** "dark" for deep-sea bands. */
  tone?: "light" | "dark";
  style?: React.CSSProperties;
}
export declare function IndexRow(props: IndexRowProps): JSX.Element;
