import type { ReactNode } from 'react';

export interface BulkAction {
  id: string;
  label: string;
  icon?: ReactNode;
  variant?: 'default' | 'danger';
  onClick: () => void;
}

export interface BulkActionToolbarProps {
  selectedCount: number;
  actions: BulkAction[];
  onClearSelection?: () => void;
  visible?: boolean;
}
