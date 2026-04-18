import type { ReactNode } from 'react';
import type { TableColumn, SortConfig } from '@/types';

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  onRowClick?: (row: T) => void;
  activeRowId?: string;
  getRowId?: (row: T) => string;
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  emptyMessage?: ReactNode;
}
