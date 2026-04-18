import './IconSlot.css';
import type { IconSlotProps } from './IconSlot.types';
import { ICON_SLOT_STYLES } from './IconSlot.styles';
import { ICON_SLOT_TOKENS } from './IconSlot.tokens';

export function IconSlot({
  size = 'md',
  color = 'inherit',
  className,
  style,
  children,
  ...rest
}: IconSlotProps) {
  const computedStyle: React.CSSProperties = {
    fontSize: ICON_SLOT_TOKENS.size[size],
    color: ICON_SLOT_TOKENS.color[color],
    ...style,
  };

  return (
    <span
      className={[ICON_SLOT_STYLES.root, className].filter(Boolean).join(' ')}
      style={computedStyle}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </span>
  );
}
