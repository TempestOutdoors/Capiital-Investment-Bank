/**
 * A row in the publications ledger — category, date, title, reading time.
 * @startingPoint section="Editorial" subtitle="Contents-page row for notes and letters" viewport="900x140"
 */
export interface PublicationRowProps {
  /** Category in caps: "Market letter", "Sector note", "Quarterly review". */
  kind: string;
  /** "Q2 · 2025", "June 2026". */
  date: string;
  title: string;
  /** "12 min". */
  read: string;
  style?: React.CSSProperties;
}
export declare function PublicationRow(props: PublicationRowProps): JSX.Element;
