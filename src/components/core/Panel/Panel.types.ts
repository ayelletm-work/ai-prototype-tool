import type { HTMLAttributes, ReactNode } from 'react';

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  title?: string;
  actions?: ReactNode;
  border?: boolean;
  shadow?: boolean;
}
