import { useState, useCallback } from 'react';
import type { SortConfig } from '@/types';

export interface EntityScreenController<T extends object> {
  filterValues: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onFilterReset: () => void;
  sortConfig: SortConfig | undefined;
  onSort: (key: string) => void;
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  activeItem: T | null;
  onRowClick: (item: T) => void;
  onCloseDetails: () => void;
  activeRowId: string | undefined;
}

export interface UseEntityScreenOptions {
  defaultSort?: SortConfig;
}

export function useEntityScreen<T extends object & { id?: string }>(
  options?: UseEntityScreenOptions,
): EntityScreenController<T> {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | undefined>(options?.defaultSort);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<T | null>(null);

  const onFilterChange = useCallback((key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onFilterReset = useCallback(() => {
    setFilterValues({});
    setSelectedIds([]);
  }, []);

  const onSort = useCallback((key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const onSelect = useCallback((ids: string[]) => {
    setSelectedIds(ids);
  }, []);

  const onRowClick = useCallback((item: T) => {
    setActiveItem(item);
  }, []);

  const onCloseDetails = useCallback(() => {
    setActiveItem(null);
  }, []);

  return {
    filterValues,
    onFilterChange,
    onFilterReset,
    sortConfig,
    onSort,
    selectedIds,
    onSelect,
    activeItem,
    onRowClick,
    onCloseDetails,
    activeRowId: activeItem?.id,
  };
}
