import type { FilterConfig } from '@/types';

export interface FilterToolbarProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onReset?: () => void;
  searchPlaceholder?: string;
}
