import type { ReactNode } from 'react';
import type { FilterConfig, TableColumn, SortConfig } from '@/types';
import type { SummaryItem } from '@/components/complex/SummaryToolbar';
import type { BulkAction } from '@/components/complex/BulkActionToolbar';

export type { SummaryItem, BulkAction };

export interface EntityScreenProps<T extends object> {
  title: string;
  subtitle?: string;
  eyebrow?: string;
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
