import './SummaryToolbar.css';
import type { SummaryToolbarProps } from './SummaryToolbar.types';
import { SUMMARY_TOOLBAR_STYLES } from './SummaryToolbar.styles';

export function SummaryToolbar({ items, actions, total, selectedCount }: SummaryToolbarProps) {
  return (
    <div className={SUMMARY_TOOLBAR_STYLES.root}>
      <div className={SUMMARY_TOOLBAR_STYLES.inner}>
        <div className={SUMMARY_TOOLBAR_STYLES.left}>
          {total !== undefined && (
            <>
              <span className={SUMMARY_TOOLBAR_STYLES.totalCount}>
                {selectedCount !== undefined && selectedCount > 0
                  ? `${selectedCount} of ${total} selected`
                  : `${total} item${total !== 1 ? 's' : ''}`}
              </span>
              {items.length > 0 && <span className={SUMMARY_TOOLBAR_STYLES.divider} />}
            </>
          )}
          {items.map((item, i) => (
            <div key={i} className={SUMMARY_TOOLBAR_STYLES.stat}>
              <span className={[
                SUMMARY_TOOLBAR_STYLES.statValue,
                item.variant === 'success' ? SUMMARY_TOOLBAR_STYLES.statValueSuccess : '',
                item.variant === 'warning' ? SUMMARY_TOOLBAR_STYLES.statValueWarning : '',
                item.variant === 'danger' ? SUMMARY_TOOLBAR_STYLES.statValueDanger : '',
              ].filter(Boolean).join(' ')}>
                {item.value}
              </span>
              <span className={SUMMARY_TOOLBAR_STYLES.statLabel}>{item.label}</span>
              {i < items.length - 1 && <span className={SUMMARY_TOOLBAR_STYLES.divider} />}
            </div>
          ))}
        </div>
        {actions && <div className={SUMMARY_TOOLBAR_STYLES.right}>{actions}</div>}
      </div>
    </div>
  );
}
