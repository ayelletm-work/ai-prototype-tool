import './SpaceSwitcher.css';
import type { SpaceSwitcherProps } from './SpaceSwitcher.types';
import { SPACE_SWITCHER_STYLES } from './SpaceSwitcher.styles';

export function SpaceSwitcher({ spaces, activeSpaceId, onSwitch }: SpaceSwitcherProps) {
  return (
    <div className={SPACE_SWITCHER_STYLES.root}>
      {spaces.map((space) => (
        <button
          key={space.id}
          type="button"
          className={[
            SPACE_SWITCHER_STYLES.item,
            space.id === activeSpaceId ? SPACE_SWITCHER_STYLES.itemActive : '',
          ].filter(Boolean).join(' ')}
          onClick={() => onSwitch?.(space.id)}
        >
          <span className={SPACE_SWITCHER_STYLES.label}>{space.label}</span>
        </button>
      ))}
    </div>
  );
}
