import type { ReactNode } from 'react';

export interface SummaryItem {
  label: string;
  value: string | number;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export interface SummaryToolbarProps {
  items: SummaryItem[];
  actions?: ReactNode;
  total?: number;
  selectedCount?: number;
}
