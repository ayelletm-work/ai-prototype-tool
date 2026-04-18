import './NavigatorPanel.css';
import type { NavigatorPanelProps } from './NavigatorPanel.types';
import { NAVIGATOR_PANEL_STYLES } from './NavigatorPanel.styles';

export function NavigatorPanel({ space, activePath = '', onNavigate }: NavigatorPanelProps) {
  return (
    <div className={NAVIGATOR_PANEL_STYLES.root}>
      <div className={NAVIGATOR_PANEL_STYLES.header}>
        <span className={NAVIGATOR_PANEL_STYLES.title}>{space.label}</span>
      </div>
      <div className={NAVIGATOR_PANEL_STYLES.items}>
        {space.items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={[
              NAVIGATOR_PANEL_STYLES.item,
              activePath === item.path ? NAVIGATOR_PANEL_STYLES.itemActive : '',
            ].filter(Boolean).join(' ')}
            onClick={() => onNavigate?.(item.path)}
            aria-current={activePath === item.path ? 'page' : undefined}
          >
            <span className={NAVIGATOR_PANEL_STYLES.itemLabel}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
