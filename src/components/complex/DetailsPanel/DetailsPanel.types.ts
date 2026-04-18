import type { ReactNode } from 'react';

export interface DetailField {
  label: string;
  value: ReactNode;
}

export interface DetailsPanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  fields?: DetailField[];
  children?: ReactNode;
  actions?: ReactNode;
  width?: number;
}
