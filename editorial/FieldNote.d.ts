/**
 * An observation from the desk: memo number, a plainly stated claim, and the link to the memo.
 * @startingPoint section="Editorial" subtitle="Memo number, claim, read link" viewport="700x300"
 */
export interface FieldNoteProps {
  /** Memo reference as the firm numbers them, e.g. "Memo · 014". */
  memo: string;
  title: string;
  body: string;
  /** Link label. Defaults to "Read the memo". */
  cta?: string;
  style?: React.CSSProperties;
}
export declare function FieldNote(props: FieldNoteProps): JSX.Element;
