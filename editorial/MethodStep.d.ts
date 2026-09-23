/**
 * One step of the firm's four-part method — numeral, 2D icon, title, body, on eggshell.
 * @startingPoint section="Editorial" subtitle="Roman numeral, line icon, title, body" viewport="700x360"
 */
export interface MethodStepProps {
  /** Roman numeral: "I", "II", "III", "IV". Set in the serif. */
  numeral: string;
  /** Caps meta, e.g. "Step 01". */
  step?: string;
  /** Icon name from the `Icon` set — "search", "blocks", "refresh-cw", "atom". */
  icon?: string;
  title: string;
  body: string;
  style?: React.CSSProperties;
}
export declare function MethodStep(props: MethodStepProps): JSX.Element;
