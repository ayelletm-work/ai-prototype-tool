import './DetailsPanel.css';
import type { DetailsPanelProps } from './DetailsPanel.types';
import { DETAILS_PANEL_STYLES } from './DetailsPanel.styles';

export function DetailsPanel({
  open,
  onClose,
  title,
  subtitle,
  fields = [],
  children,
  actions,
}: DetailsPanelProps) {
  return (
    <div
      className={DETAILS_PANEL_STYLES.root}
      aria-hidden={!open}
      aria-label={title ? `${title} details` : 'Details'}
    >
      <div className={DETAILS_PANEL_STYLES.header}>
        <div className={DETAILS_PANEL_STYLES.headerContent}>
          {title && <div className={DETAILS_PANEL_STYLES.title}>{title}</div>}
          {subtitle && <div className={DETAILS_PANEL_STYLES.subtitle}>{subtitle}</div>}
        </div>
        <button
          type="button"
          className={DETAILS_PANEL_STYLES.closeBtn}
          onClick={onClose}
          aria-label="Close details"
        >
          ×
        </button>
      </div>

      <div className={DETAILS_PANEL_STYLES.body}>
        {fields.length > 0 && (
          <div className={DETAILS_PANEL_STYLES.fields}>
            {fields.map((field, i) => (
              <div key={i} className={DETAILS_PANEL_STYLES.field}>
                <span className={DETAILS_PANEL_STYLES.fieldLabel}>{field.label}</span>
                <span className={DETAILS_PANEL_STYLES.fieldValue}>{field.value}</span>
              </div>
            ))}
          </div>
        )}
        {children}
      </div>

      {actions && <div className={DETAILS_PANEL_STYLES.actions}>{actions}</div>}
    </div>
  );
}
