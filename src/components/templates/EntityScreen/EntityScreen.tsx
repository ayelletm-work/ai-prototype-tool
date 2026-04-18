import './EntityScreen.css';
import type { EntityScreenProps } from './EntityScreen.types';
import { ENTITY_SCREEN_STYLES } from './EntityScreen.styles';
import { Tabs } from '@/components/core/Tabs';
import { FilterToolbar } from '@/components/complex/FilterToolbar';
import { SummaryToolbar } from '@/components/complex/SummaryToolbar';
import { BulkActionToolbar } from '@/components/complex/BulkActionToolbar';
import { DataTable } from '@/components/complex/DataTable';

export function EntityScreen<T extends Record<string, unknown>>({
  title,
  subtitle,
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
  return (
    <div className={ENTITY_SCREEN_STYLES.root}>
      <div className={ENTITY_SCREEN_STYLES.header}>
        <div className={ENTITY_SCREEN_STYLES.headerContent}>
          <h1 className={ENTITY_SCREEN_STYLES.title}>{title}</h1>
          {subtitle && <p className={ENTITY_SCREEN_STYLES.subtitle}>{subtitle}</p>}
        </div>
        {actions && (
          <div className={ENTITY_SCREEN_STYLES.headerActions}>{actions}</div>
        )}
      </div>

      {tabs && onTabChange && (
        <Tabs items={tabs} value={activeTab ?? tabs[0]?.value ?? ''} onChange={onTabChange} />
      )}

      {filters.length > 0 && onFilterChange && (
        <FilterToolbar
          filters={filters}
          values={filterValues}
          onChange={onFilterChange}
          onReset={onFilterReset}
        />
      )}

      <SummaryToolbar
        items={summaryItems}
        actions={summaryActions}
        total={data.length}
        selectedCount={selectedIds.length}
      />

      <div className={ENTITY_SCREEN_STYLES.body}>
        <div className={ENTITY_SCREEN_STYLES.tableArea}>
          <div className={ENTITY_SCREEN_STYLES.tableWrapper}>
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
        {detailsPanel}
      </div>
    </div>
  );
}
