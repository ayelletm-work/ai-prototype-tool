import { useMemo } from 'react';
import { EntityScreen } from '@/components/templates/EntityScreen';
import { DetailsPanel } from '@/components/complex/DetailsPanel';
import { Badge } from '@/components/core/Badge';
import { Button } from '@/components/core/Button';
import { useAssets } from '@/hooks/backend/useAssets';
import { useEntityScreen } from '@/hooks/useEntityScreen';
import type { Asset, TableColumn, FilterConfig, BadgeVariant } from '@/types';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const STATUS_VARIANT: Record<Asset['status'], BadgeVariant> = {
  active: 'success',
  archived: 'default',
  processing: 'warning',
};

const COLUMNS: TableColumn<Asset>[] = [
  { key: 'name', label: 'Name', sortable: true },
  {
    key: 'type',
    label: 'Type',
    sortable: true,
    width: 110,
    render: (v) => (
      <Badge variant="info" size="sm">
        {String(v)}
      </Badge>
    ),
  },
  {
    key: 'size',
    label: 'Size',
    sortable: true,
    width: 100,
    render: (v) => (
      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
        {formatSize(Number(v))}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    width: 120,
    render: (v) => (
      <Badge variant={STATUS_VARIANT[v as Asset['status']] ?? 'default'} size="sm">
        {String(v)}
      </Badge>
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
    key: 'type',
    label: 'Type',
    type: 'select',
    options: [
      { value: 'image', label: 'Image' },
      { value: 'video', label: 'Video' },
      { value: 'document', label: 'Document' },
      { value: 'code', label: 'Code' },
    ],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'archived', label: 'Archived' },
      { value: 'processing', label: 'Processing' },
    ],
  },
];

export function AssetsPage() {
  const { data: assets, loading } = useAssets();
  const screen = useEntityScreen<Asset>({ defaultSort: { key: 'name', direction: 'asc' } });

  const filteredData = useMemo(() => {
    if (!assets) return [];
    const search = (screen.filterValues['search'] ?? '').toLowerCase();
    const typeFilter = screen.filterValues['type'] ?? '';
    const statusFilter = screen.filterValues['status'] ?? '';

    let result = [...assets];
    if (search) result = result.filter((a) => a.name.toLowerCase().includes(search));
    if (typeFilter) result = result.filter((a) => a.type === typeFilter);
    if (statusFilter) result = result.filter((a) => a.status === statusFilter);

    if (screen.sortConfig) {
      const { key, direction } = screen.sortConfig;
      const dir = direction === 'asc' ? 1 : -1;
      result.sort((a, b) =>
        String(a[key as keyof Asset]) < String(b[key as keyof Asset]) ? -dir : dir,
      );
    }
    return result;
  }, [assets, screen.filterValues, screen.sortConfig]);

  const activeCount = assets?.filter((a) => a.status === 'active').length ?? 0;
  const processingCount = assets?.filter((a) => a.status === 'processing').length ?? 0;

  const activeAsset = screen.activeItem;

  const detailFields = activeAsset
    ? [
        { label: 'ID', value: activeAsset.id },
        { label: 'Type', value: <Badge variant="info">{activeAsset.type}</Badge> },
        { label: 'Size', value: formatSize(activeAsset.size) },
        {
          label: 'Status',
          value: (
            <Badge variant={STATUS_VARIANT[activeAsset.status]}>{activeAsset.status}</Badge>
          ),
        },
        {
          label: 'URL',
          value: (
            <span
              style={{
                fontFamily: 'var(--font-family-mono)',
                fontSize: 'var(--font-size-xs)',
                wordBreak: 'break-all',
              }}
            >
              {activeAsset.url}
            </span>
          ),
        },
        { label: 'Created', value: new Date(activeAsset.createdAt).toLocaleString() },
        { label: 'Updated', value: new Date(activeAsset.updatedAt).toLocaleString() },
      ]
    : [];

  return (
    <EntityScreen<Asset>
      title="Assets"
      subtitle="Manage files, media, and resources"
      actions={<Button variant="primary" size="sm">Upload Asset</Button>}
      filters={FILTERS}
      filterValues={screen.filterValues}
      onFilterChange={screen.onFilterChange}
      onFilterReset={screen.onFilterReset}
      summaryItems={[
        { label: 'active', value: activeCount, variant: 'success' },
        {
          label: 'processing',
          value: processingCount,
          variant: processingCount > 0 ? 'warning' : 'default',
        },
      ]}
      columns={COLUMNS}
      data={filteredData}
      loading={loading}
      selectedIds={screen.selectedIds}
      onSelect={screen.onSelect}
      bulkActions={[
        { id: 'archive', label: 'Archive', onClick: () => screen.onSelect([]) },
        {
          id: 'delete',
          label: 'Delete',
          variant: 'danger',
          onClick: () => screen.onSelect([]),
        },
      ]}
      onRowClick={screen.onRowClick}
      activeRowId={screen.activeRowId}
      sortConfig={screen.sortConfig}
      onSort={screen.onSort}
      detailsPanel={
        <DetailsPanel
          open={!!activeAsset}
          onClose={screen.onCloseDetails}
          title={activeAsset?.name}
          subtitle={activeAsset ? formatSize(activeAsset.size) : undefined}
          fields={detailFields}
          actions={
            <>
              <Button variant="secondary" size="sm" fullWidth>
                Download
              </Button>
              <Button variant="danger" size="sm">
                Delete
              </Button>
            </>
          }
        />
      }
    />
  );
}
