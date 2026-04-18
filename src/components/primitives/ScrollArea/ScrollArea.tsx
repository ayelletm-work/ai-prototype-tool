import './ScrollArea.css';
import type { ScrollAreaProps } from './ScrollArea.types';
import { SCROLL_AREA_STYLES } from './ScrollArea.styles';

export function ScrollArea({
  direction = 'vertical',
  maxHeight,
  maxWidth,
  className,
  style,
  children,
  ...rest
}: ScrollAreaProps) {
  const dirClass = {
    vertical: SCROLL_AREA_STYLES.vertical,
    horizontal: SCROLL_AREA_STYLES.horizontal,
    both: SCROLL_AREA_STYLES.both,
  }[direction];

  const computedStyle: React.CSSProperties = {
    ...(maxHeight !== undefined && {
      maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    }),
    ...(maxWidth !== undefined && {
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    }),
    ...style,
  };

  return (
    <div
      className={[SCROLL_AREA_STYLES.root, dirClass, className].filter(Boolean).join(' ')}
      style={computedStyle}
      {...rest}
    >
      {children}
    </div>
  );
}
