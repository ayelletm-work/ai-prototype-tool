import { useMemo, useCallback } from 'react';
import { EntityScreen } from '@/components/templates/EntityScreen';
import { DetailsPanel } from '@/components/complex/DetailsPanel';
import { Badge } from '@/components/core/Badge';
import { Button } from '@/components/core/Button';
import { useTags } from '@/hooks/backend/useTags';
import { useEntityScreen } from '@/hooks/useEntityScreen';
import type { Tag, TableColumn, FilterConfig } from '@/types';

const COLUMNS: TableColumn<Tag>[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    render: (_, row) => (
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: (row as Tag).color,
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        {(row as Tag).name}
      </span>
    ),
  },
  {
    key: 'description',
    label: 'Description',
    render: (v) => (
      <span
        style={{
          color: v ? 'var(--text-secondary)' : 'var(--text-tertiary)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        {String(v ?? '—')}
      </span>
    ),
  },
  {
    key: 'usageCount',
    label: 'Usage',
    sortable: true,
    width: 100,
    render: (v) => (
      <Badge variant="default" size="sm">
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
];

export function TagsPage() {
  const { data: tags, loading, deleteTag } = useTags();
  const screen = useEntityScreen<Tag>({ defaultSort: { key: 'name', direction: 'asc' } });

  const filteredData = useMemo(() => {
    if (!tags) return [];
    const search = (screen.filterValues['search'] ?? '').toLowerCase();
    const result = search
      ? tags.filter(
          (t) =>
            t.name.toLowerCase().includes(search) ||
            (t.description ?? '').toLowerCase().includes(search),
        )
      : [...tags];

    if (screen.sortConfig) {
      const { key, direction } = screen.sortConfig;
      const dir = direction === 'asc' ? 1 : -1;
      result.sort((a, b) =>
        String(a[key as keyof Tag]) < String(b[key as keyof Tag]) ? -dir : dir,
      );
    }
    return result;
  }, [tags, screen.filterValues, screen.sortConfig]);

  const handleBulkDelete = useCallback(async () => {
    await Promise.all(screen.selectedIds.map((id) => deleteTag(id)));
    screen.onSelect([]);
  }, [screen, deleteTag]);

  const activeTag = screen.activeItem;

  const detailFields = activeTag
    ? [
        { label: 'ID', value: activeTag.id },
        {
          label: 'Color',
          value: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activeTag.color,
                  border: '1px solid var(--border-default)',
                  flexShrink: 0,
                }}
              />
              {activeTag.color}
            </span>
          ),
        },
        {
          label: 'Usage count',
          value: <Badge variant="default">{activeTag.usageCount}</Badge>,
        },
        { label: 'Description', value: activeTag.description ?? '—' },
        { label: 'Created', value: new Date(activeTag.createdAt).toLocaleString() },
        { label: 'Updated', value: new Date(activeTag.updatedAt).toLocaleString() },
      ]
    : [];

  return (
    <EntityScreen<Tag>
      title="Tags"
      subtitle="Manage labels and categories across your workspace"
      actions={<Button variant="primary" size="sm">New Tag</Button>}
      filters={FILTERS}
      filterValues={screen.filterValues}
      onFilterChange={screen.onFilterChange}
      onFilterReset={screen.onFilterReset}
      summaryItems={[
        { label: 'total tags', value: tags?.length ?? 0 },
        { label: 'total usage', value: tags?.reduce((s, t) => s + t.usageCount, 0) ?? 0 },
      ]}
      columns={COLUMNS}
      data={filteredData}
      loading={loading}
      selectedIds={screen.selectedIds}
      onSelect={screen.onSelect}
      bulkActions={[
        {
          id: 'delete',
          label: 'Delete selected',
          variant: 'danger',
          onClick: () => {
            void handleBulkDelete();
          },
        },
      ]}
      onRowClick={screen.onRowClick}
      activeRowId={screen.activeRowId}
      sortConfig={screen.sortConfig}
      onSort={screen.onSort}
      detailsPanel={
        <DetailsPanel
          open={!!activeTag}
          onClose={screen.onCloseDetails}
          title={activeTag?.name}
          subtitle={activeTag ? `Used ${activeTag.usageCount} times` : undefined}
          fields={detailFields}
          actions={
            <>
              <Button variant="secondary" size="sm" fullWidth>
                Edit
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
