export interface CounterProps {
  /** Written exactly as it should read: "90%", "3x", "18 mo". The numeric part animates. */
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Counter(props: CounterProps): JSX.Element;
