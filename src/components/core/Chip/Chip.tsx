import './Chip.css';
import type { ChipProps } from './Chip.types';
import { CHIP_STYLES } from './Chip.styles';

export function Chip({
  onRemove,
  color,
  size = 'md',
  className,
  children,
  ...rest
}: ChipProps) {
  const classes = [
    CHIP_STYLES.root,
    CHIP_STYLES[size],
    onRemove ? CHIP_STYLES.removable : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...rest}>
      {color && <span className={CHIP_STYLES.dot} style={{ backgroundColor: color }} />}
      <span className={CHIP_STYLES.label}>{children}</span>
      {onRemove && (
        <button
          type="button"
          className={CHIP_STYLES.removeBtn}
          onClick={onRemove}
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
}
