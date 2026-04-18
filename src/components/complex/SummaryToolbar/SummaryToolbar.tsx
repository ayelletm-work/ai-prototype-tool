import './SummaryToolbar.css';
import type { SummaryToolbarProps } from './SummaryToolbar.types';
import { SUMMARY_TOOLBAR_STYLES } from './SummaryToolbar.styles';

export function SummaryToolbar({ items, actions, total, selectedCount }: SummaryToolbarProps) {
  const showSelection = selectedCount !== undefined && selectedCount > 0;

  return (
    <div className={SUMMARY_TOOLBAR_STYLES.root}>
      <div className={SUMMARY_TOOLBAR_STYLES.inner}>
        <div className={SUMMARY_TOOLBAR_STYLES.left}>
          {total !== undefined && (
            <span className={SUMMARY_TOOLBAR_STYLES.total}>
              {showSelection
                ? `${selectedCount} of ${total} selected`
                : `${total} item${total !== 1 ? 's' : ''}`}
            </span>
          )}

          {items.map((item, i) => (
            <div key={i} style={{ display: 'contents' }}>
              <span className={SUMMARY_TOOLBAR_STYLES.sep} />
              <div className={SUMMARY_TOOLBAR_STYLES.stat}>
                <span
                  className={[
                    SUMMARY_TOOLBAR_STYLES.statValue,
                    item.variant === 'success' ? SUMMARY_TOOLBAR_STYLES.statValueSuccess : '',
                    item.variant === 'warning' ? SUMMARY_TOOLBAR_STYLES.statValueWarning : '',
                    item.variant === 'danger' ? SUMMARY_TOOLBAR_STYLES.statValueDanger : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {item.value}
                </span>
                <span className={SUMMARY_TOOLBAR_STYLES.statLabel}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {actions && <div className={SUMMARY_TOOLBAR_STYLES.right}>{actions}</div>}
      </div>
    </div>
  );
}
