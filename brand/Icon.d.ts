/**
 * A flat, 2D line icon from the Lucide set, inlined — the brand's only icon system.
 * @startingPoint section="Brand" subtitle="Lucide line icons, flat and 2D" viewport="700x180"
 */
export interface IconProps {
  /** Icon name, e.g. "search", "atom", "refresh-cw". `Icon.names` lists the inlined set. */
  name: string;
  /** Square size in px. 16 inside controls, 20–56 in editorial use. */
  size?: number;
  /** Stroke width. 1.25 editorial (default), 2 inside form and navigation primitives. */
  stroke?: number;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element | null;
