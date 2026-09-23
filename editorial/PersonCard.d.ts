/**
 * A team member: optional cut-out portrait, rule, name, role and direct contact details.
 * @startingPoint section="Editorial" subtitle="Portrait, rule, name, role, direct line" viewport="700x420"
 */
export interface PersonCardProps {
  name: string;
  /** Title as the firm writes it: "CEO", "Senior Analyst", "Data specialist". */
  role: string;
  /** Portrait src. Pass an empty string to reserve the frame with a placeholder note. */
  photo?: string;
  email?: string;
  phone?: string;
  /** Placeholder line shown when `photo` is an empty string. */
  note?: string;
  style?: React.CSSProperties;
}
export declare function PersonCard(props: PersonCardProps): JSX.Element;
