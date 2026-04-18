import './Tabs.css';
import type { TabsProps } from './Tabs.types';
import { TABS_STYLES } from './Tabs.styles';

export function Tabs({ items, value, onChange, variant = 'underline' }: TabsProps) {
  return (
    <div className={[TABS_STYLES.root, variant === 'underline' ? TABS_STYLES.underline : TABS_STYLES.pill].join(' ')}>
      <div className={TABS_STYLES.list} role="tablist">
        {items.map((item) => (
          <button
            key={item.value}
            role="tab"
            aria-selected={item.value === value}
            className={[
              TABS_STYLES.tab,
              item.value === value ? TABS_STYLES.tabActive : '',
              item.disabled ? TABS_STYLES.tabDisabled : '',
            ].filter(Boolean).join(' ')}
            onClick={() => !item.disabled && onChange(item.value)}
            disabled={item.disabled}
          >
            {item.label}
            {item.count !== undefined && (
              <span className={TABS_STYLES.count}>{item.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
