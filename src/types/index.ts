export type ID = string;
export type Timestamp = string;

export interface BaseEntity {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Tag extends BaseEntity {
  name: string;
  color: string;
  description?: string;
  usageCount: number;
}

export interface Asset extends BaseEntity {
  name: string;
  type: 'image' | 'video' | 'document' | 'code';
  url: string;
  size: number;
  tags: ID[];
  status: 'active' | 'archived' | 'processing';
}

export interface WorkspaceItem extends BaseEntity {
  name: string;
  description?: string;
  status: 'running' | 'stopped' | 'error' | 'pending';
  type: string;
  metrics?: WorkspaceMetrics;
}

export interface WorkspaceMetrics {
  cpu: number;
  memory: number;
  requests: number;
}

export interface AgentEntity extends BaseEntity {
  name: string;
  type: 'builder' | 'validator' | 'explorer';
  status: 'active' | 'idle' | 'error';
  lastRun?: Timestamp;
  config: Record<string, unknown>;
  description?: string;
}

export interface CoraInsight {
  id: ID;
  type: 'suggestion' | 'warning' | 'info' | 'action';
  title: string;
  content: string;
  context?: string;
  actions?: CoraAction[];
  timestamp: Timestamp;
}

export interface CoraAction {
  id: string;
  label: string;
  action: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface CoraContext {
  pageId: string;
  pageTitle: string;
  selectedItem?: unknown;
  filters?: Record<string, unknown>;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface NavSpace {
  id: string;
  label: string;
  icon: string;
  basePath: string;
  items: NavItem[];
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  width?: number | string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date';
  options?: Array<{ value: string; label: string }>;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
