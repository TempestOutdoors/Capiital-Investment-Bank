export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  /** settle = 14px + fade (default) · veil = opacity only · draw = hairline from left */
  variant?: "settle" | "veil" | "draw";
  /** Stage index within a group; delay = step x --stagger-row */
  step?: number;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
  margin?: string;
}
export declare function Reveal(props: RevealProps): JSX.Element;

export interface RuleDrawProps { tone?: "light" | "dark" | "ink"; step?: number; style?: React.CSSProperties }
export declare function RuleDraw(props: RuleDrawProps): JSX.Element;
