import './DataTable.css';
import type { DataTableProps } from './DataTable.types';
import { DATA_TABLE_STYLES } from './DataTable.styles';
import { Spinner } from '@/components/core';

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  selectedIds = [],
  onSelect,
  onRowClick,
  activeRowId,
  getRowId = (row) => String(row['id'] ?? ''),
  sortConfig,
  onSort,
  emptyMessage = 'No items found',
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  function toggleAll() {
    if (!onSelect) return;
    onSelect(allSelected ? [] : data.map(getRowId));
  }

  function toggleRow(id: string) {
    if (!onSelect) return;
    onSelect(
      selectedIds.includes(id)
        ? selectedIds.filter((s) => s !== id)
        : [...selectedIds, id]
    );
  }

  return (
    <div className={DATA_TABLE_STYLES.root}>
      <table className={DATA_TABLE_STYLES.table}>
        <thead className={DATA_TABLE_STYLES.thead}>
          <tr>
            {onSelect && (
              <th className={[DATA_TABLE_STYLES.th, DATA_TABLE_STYLES.thCheckbox].join(' ')}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={[DATA_TABLE_STYLES.th, col.sortable ? DATA_TABLE_STYLES.thSortable : ''].filter(Boolean).join(' ')}
                style={col.width ? { width: col.width } : undefined}
                onClick={() => col.sortable && onSort?.(String(col.key))}
              >
                {col.label}
                {col.sortable && sortConfig?.key === String(col.key) && (
                  <span className={DATA_TABLE_STYLES.sortIcon}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={DATA_TABLE_STYLES.tbody}>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (onSelect ? 1 : 0)} className={DATA_TABLE_STYLES.loadingRow}>
                <Spinner size="md" />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onSelect ? 1 : 0)} className={DATA_TABLE_STYLES.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const id = getRowId(row);
              const isSelected = selectedIds.includes(id);
              const isActive = activeRowId === id;

              return (
                <tr
                  key={id}
                  className={[
                    DATA_TABLE_STYLES.tr,
                    onRowClick ? DATA_TABLE_STYLES.trClickable : '',
                    isActive ? DATA_TABLE_STYLES.trActive : '',
                    isSelected ? DATA_TABLE_STYLES.trSelected : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => onRowClick?.(row)}
                >
                  {onSelect && (
                    <td className={[DATA_TABLE_STYLES.td, DATA_TABLE_STYLES.tdCheckbox].join(' ')}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select row ${id}`}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={String(col.key)} className={DATA_TABLE_STYLES.td}>
                      {col.render
                        ? col.render(row[col.key as keyof T], row)
                        : String(row[col.key as keyof T] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
