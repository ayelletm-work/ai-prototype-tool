import './FilterToolbar.css';
import type { FilterToolbarProps } from './FilterToolbar.types';
import { FILTER_TOOLBAR_STYLES } from './FilterToolbar.styles';

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

export function FilterToolbar({
  filters,
  values,
  onChange,
  onReset,
  searchPlaceholder = 'Search...',
}: FilterToolbarProps) {
  const searchFilter = filters.find((f) => f.type === 'text');
  const selectFilters = filters.filter((f) => f.type === 'select');
  const hasActiveFilters = Object.values(values).some(Boolean);

  return (
    <div className={FILTER_TOOLBAR_STYLES.root}>
      <div className={FILTER_TOOLBAR_STYLES.inner}>
        {searchFilter && (
          <div className={FILTER_TOOLBAR_STYLES.searchWrapper}>
            <span className={FILTER_TOOLBAR_STYLES.searchIcon}><SearchIcon /></span>
            <input
              type="text"
              className={FILTER_TOOLBAR_STYLES.searchInput}
              placeholder={searchPlaceholder}
              value={values[searchFilter.key] ?? ''}
              onChange={(e) => onChange(searchFilter.key, e.target.value)}
            />
          </div>
        )}
        {selectFilters.length > 0 && (
          <div className={FILTER_TOOLBAR_STYLES.filters}>
            {selectFilters.map((filter) => (
              <div key={filter.key} className={FILTER_TOOLBAR_STYLES.filterItem}>
                <select
                  value={values[filter.key] ?? ''}
                  onChange={(e) => onChange(filter.key, e.target.value)}
                  aria-label={filter.label}
                >
                  <option value="">{filter.label}: All</option>
                  {filter.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
        {hasActiveFilters && onReset && (
          <button type="button" className={FILTER_TOOLBAR_STYLES.resetBtn} onClick={onReset}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
