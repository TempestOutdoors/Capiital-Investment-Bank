import * as React from "react";
/** Centred modal, max-width 512px, 80%-black scrim, Cormorant title, Lucide X close. */
export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}
export function Dialog(props: DialogProps): React.ReactElement | null;
