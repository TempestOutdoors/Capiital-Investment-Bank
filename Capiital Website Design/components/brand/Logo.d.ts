/**
 * The CAP//TAL typographic wordmark: tracked sans caps with two slanted bars for the "II".
 * @startingPoint section="Brand" subtitle="Wordmark, plain or in the banner plaque" viewport="700x160"
 */
export interface LogoProps {
  /** Colour of the letterforms. "ink" on light grounds, "cream" on deep sea, "current" inherits. */
  tone?: "ink" | "cream" | "sea" | "current";
  /** Cap height in px. 18 in navigation, 28–40 in a footer or cover. */
  size?: number;
  /** Wrap the mark in the deep-sea plaque with the angled right edge. */
  banner?: boolean;
  /** Colour the two bars with the accent instead of the letter colour. Off by default. */
  accent?: boolean;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;
