import { useState, useMemo } from 'react';
import { EntityScreen } from '@/components/templates/EntityScreen';
import { DetailsPanel } from '@/components/complex/DetailsPanel';
import { Badge } from '@/components/core/Badge';
import { Button } from '@/components/core/Button';
import { useWorkspace } from '@/hooks/backend/useWorkspace';
import type { WorkspaceItem, TableColumn, FilterConfig, BadgeVariant } from '@/types';

const STATUS_VARIANT: Record<WorkspaceItem['status'], BadgeVariant> = {
  running: 'success',
  stopped: 'default',
  error: 'danger',
  pending: 'warning',
};

const COLUMNS: TableColumn<WorkspaceItem>[] = [
  { key: 'name', label: 'Name', sortable: true },
  {
    key: 'type',
    label: 'Type',
    width: 130,
    render: (v) => <Badge variant="info" size="sm">{String(v)}</Badge>,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    width: 100,
    render: (v) => (
      <Badge variant={STATUS_VARIANT[v as WorkspaceItem['status']] ?? 'default'} size="sm">
        {String(v)}
      </Badge>
    ),
  },
  {
    key: 'description',
    label: 'Description',
    render: (v) => (
      <span style={{ color: v ? 'var(--text-secondary)' : 'var(--text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        {String(v ?? '—')}
      </span>
    ),
  },
  {
    key: 'updatedAt',
    label: 'Updated',
    sortable: true,
    width: 140,
    render: (v) => (
      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
        {new Date(String(v)).toLocaleDateString()}
      </span>
    ),
  },
];

const FILTERS: FilterConfig[] = [
  { key: 'search', label: 'Search', type: 'text' },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'running', label: 'Running' },
      { value: 'stopped', label: 'Stopped' },
      { value: 'error', label: 'Error' },
      { value: 'pending', label: 'Pending' },
    ],
  },
];

export function OverviewPage() {
  const { data: items, loading } = useWorkspace();
  const [activeItem, setActiveItem] = useState<WorkspaceItem | null>(null);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    if (!items) return [];
    const search = (filterValues['search'] ?? '').toLowerCase();
    const statusFilter = filterValues['status'] ?? '';
    return items.filter(
      (item) =>
        (!search || item.name.toLowerCase().includes(search)) &&
        (!statusFilter || item.status === statusFilter)
    );
  }, [items, filterValues]);

  const runningCount = items?.filter((i) => i.status === 'running').length ?? 0;
  const errorCount = items?.filter((i) => i.status === 'error').length ?? 0;

  const detailFields = activeItem
    ? [
        { label: 'ID', value: activeItem.id },
        { label: 'Type', value: <Badge variant="info">{activeItem.type}</Badge> },
        { label: 'Status', value: <Badge variant={STATUS_VARIANT[activeItem.status]}>{activeItem.status}</Badge> },
        { label: 'Description', value: activeItem.description ?? '—' },
        ...(activeItem.metrics
          ? [
              { label: 'CPU', value: `${activeItem.metrics.cpu}%` },
              { label: 'Memory', value: `${activeItem.metrics.memory}%` },
              { label: 'Requests', value: activeItem.metrics.requests.toLocaleString() },
            ]
          : []),
        { label: 'Updated', value: new Date(activeItem.updatedAt).toLocaleString() },
      ]
    : [];

  return (
    <EntityScreen<WorkspaceItem>
      title="Workspace Overview"
      subtitle="Monitor and manage your workspace services"
      actions={<Button variant="primary" size="sm">Deploy Service</Button>}
      filters={FILTERS}
      filterValues={filterValues}
      onFilterChange={(k, v) => setFilterValues((prev) => ({ ...prev, [k]: v }))}
      onFilterReset={() => setFilterValues({})}
      summaryItems={[
        { label: 'running', value: runningCount, variant: 'success' },
        { label: 'errors', value: errorCount, variant: errorCount > 0 ? 'danger' : 'default' },
      ]}
      columns={COLUMNS}
      data={filteredData}
      loading={loading}
      onRowClick={(row) => setActiveItem(row)}
      activeRowId={activeItem?.id}
      detailsPanel={
        <DetailsPanel
          open={!!activeItem}
          onClose={() => setActiveItem(null)}
          title={activeItem?.name}
          subtitle={activeItem?.type}
          fields={detailFields}
          actions={
            <>
              <Button variant="secondary" size="sm" fullWidth>
                {activeItem?.status === 'running' ? 'Stop' : 'Start'}
              </Button>
              <Button variant="danger" size="sm">Remove</Button>
            </>
          }
        />
      }
    />
  );
}
