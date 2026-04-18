import type { ReactNode } from 'react';

export type DrawerPlacement = 'left' | 'right';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
  children: ReactNode;
  placement?: DrawerPlacement;
  footer?: ReactNode;
}
