import type { ReactNode } from 'react';
import type { FilterConfig, TableColumn, SortConfig, SummaryItem, BulkAction } from '@/types';

export interface EntityScreenProps<T extends Record<string, unknown>> {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  tabs?: Array<{ value: string; label: string; count?: number }>;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  filters?: FilterConfig[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onFilterReset?: () => void;
  summaryItems?: SummaryItem[];
  summaryActions?: ReactNode;
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  bulkActions?: BulkAction[];
  onRowClick?: (row: T) => void;
  activeRowId?: string;
  getRowId?: (row: T) => string;
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  detailsPanel?: ReactNode;
  emptyMessage?: ReactNode;
}
