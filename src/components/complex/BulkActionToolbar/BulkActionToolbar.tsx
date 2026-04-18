import './BulkActionToolbar.css';
import type { BulkActionToolbarProps } from './BulkActionToolbar.types';
import { BULK_ACTION_STYLES } from './BulkActionToolbar.styles';

export function BulkActionToolbar({
  selectedCount,
  actions,
  onClearSelection,
  visible = false,
}: BulkActionToolbarProps) {
  return (
    <div className={[BULK_ACTION_STYLES.root, visible ? BULK_ACTION_STYLES.visible : ''].filter(Boolean).join(' ')}>
      <div className={BULK_ACTION_STYLES.inner}>
        <span className={BULK_ACTION_STYLES.count}>
          {selectedCount} selected
        </span>
        <div className={BULK_ACTION_STYLES.actions}>
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              className={[
                BULK_ACTION_STYLES.action,
                action.variant === 'danger' ? BULK_ACTION_STYLES.actionDanger : '',
              ].filter(Boolean).join(' ')}
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
        {onClearSelection && (
          <button type="button" className={BULK_ACTION_STYLES.clearBtn} onClick={onClearSelection}>
            Clear selection
          </button>
        )}
      </div>
    </div>
  );
}
