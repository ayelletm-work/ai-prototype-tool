import './EntityScreen.css';
import type { EntityScreenProps } from './EntityScreen.types';
import { ENTITY_SCREEN_STYLES } from './EntityScreen.styles';
import { EntityPageHeader } from '@/components/complex/EntityPageHeader';
import { Tabs } from '@/components/core/Tabs';
import { FilterToolbar } from '@/components/complex/FilterToolbar';
import { SummaryToolbar } from '@/components/complex/SummaryToolbar';
import { BulkActionToolbar } from '@/components/complex/BulkActionToolbar';
import { DataTable } from '@/components/complex/DataTable';

export function EntityScreen<T extends object>({
  title,
  subtitle,
  eyebrow,
  actions,
  tabs,
  activeTab,
  onTabChange,
  filters = [],
  filterValues = {},
  onFilterChange,
  onFilterReset,
  summaryItems = [],
  summaryActions,
  columns,
  data,
  loading = false,
  selectedIds = [],
  onSelect,
  bulkActions = [],
  onRowClick,
  activeRowId,
  getRowId,
  sortConfig,
  onSort,
  detailsPanel,
  emptyMessage,
}: EntityScreenProps<T>) {
  const detailsOpen = !!activeRowId && !!detailsPanel;
  const bodyClass = [
    ENTITY_SCREEN_STYLES.body,
    detailsOpen ? ENTITY_SCREEN_STYLES.bodyDetailsOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={ENTITY_SCREEN_STYLES.root}>
      {/* Zone 1 — Page header: title, subtitle, primary actions */}
      <EntityPageHeader
        title={title}
        subtitle={subtitle}
        eyebrow={eyebrow}
        actions={actions}
      />

      {/* Zone 2 — Tabs (optional) */}
      {tabs && onTabChange && (
        <div className={ENTITY_SCREEN_STYLES.tabsZone}>
          <Tabs items={tabs} value={activeTab ?? tabs[0]?.value ?? ''} onChange={onTabChange} />
        </div>
      )}

      {/* Zone 3 — Filter toolbar (optional) */}
      {filters.length > 0 && onFilterChange && (
        <FilterToolbar
          filters={filters}
          values={filterValues}
          onChange={onFilterChange}
          onReset={onFilterReset}
        />
      )}

      {/* Zone 4 — Summary / selection toolbar */}
      <SummaryToolbar
        items={summaryItems}
        actions={summaryActions}
        total={data.length}
        selectedCount={selectedIds.length}
      />

      {/* Zone 5 — Content: grid(table | details) */}
      <div className={bodyClass}>
        <div className={ENTITY_SCREEN_STYLES.tableArea}>
          <div className={ENTITY_SCREEN_STYLES.tableScroll}>
            <DataTable
              columns={columns}
              data={data}
              loading={loading}
              selectedIds={selectedIds}
              onSelect={onSelect}
              onRowClick={onRowClick}
              activeRowId={activeRowId}
              getRowId={getRowId}
              sortConfig={sortConfig}
              onSort={onSort}
              emptyMessage={emptyMessage}
            />
          </div>
          {onSelect && bulkActions.length > 0 && (
            <BulkActionToolbar
              selectedCount={selectedIds.length}
              actions={bulkActions}
              onClearSelection={() => onSelect([])}
              visible={selectedIds.length > 0}
            />
          )}
        </div>

        {/* Details slot — DetailsPanel renders here and owns its open/close */}
        <div className={ENTITY_SCREEN_STYLES.detailsArea}>{detailsPanel}</div>
      </div>
    </div>
  );
}
