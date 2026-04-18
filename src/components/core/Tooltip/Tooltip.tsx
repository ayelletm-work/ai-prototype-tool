import './Tooltip.css';
import type { TooltipProps } from './Tooltip.types';
import { TOOLTIP_STYLES } from './Tooltip.styles';

export function Tooltip({ content, children, placement = 'top', disabled = false }: TooltipProps) {
  if (disabled) return <>{children}</>;

  const placementClass = {
    top: TOOLTIP_STYLES.top,
    bottom: TOOLTIP_STYLES.bottom,
    left: TOOLTIP_STYLES.left,
    right: TOOLTIP_STYLES.right,
  }[placement];

  return (
    <span className={TOOLTIP_STYLES.root}>
      {children}
      <span className={[TOOLTIP_STYLES.content, placementClass].join(' ')} role="tooltip">
        {content}
      </span>
    </span>
  );
}
