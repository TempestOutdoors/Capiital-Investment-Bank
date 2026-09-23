export interface ScrollProgressProps { tone?: "light" | "dark"; style?: React.CSSProperties }
export declare function ScrollProgress(props: ScrollProgressProps): JSX.Element;
export declare function useScrollProgress(ref: React.RefObject<HTMLElement>): number;
export declare function useActiveSection(ids: string[]): string | null;
