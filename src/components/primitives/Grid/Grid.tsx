import './Grid.css';
import type { GridProps } from './Grid.types';
import { GRID_STYLES } from './Grid.styles';
import { GRID_TOKENS } from './Grid.tokens';

export function Grid({
  columns,
  gap = 'md',
  columnGap,
  rowGap,
  align,
  justify,
  minColumnWidth,
  className,
  style,
  children,
  ...rest
}: GridProps) {
  const computedStyle: React.CSSProperties = {
    gridTemplateColumns: minColumnWidth
      ? `repeat(auto-fill, minmax(${minColumnWidth}, 1fr))`
      : columns
        ? typeof columns === 'number'
          ? `repeat(${columns}, 1fr)`
          : columns
        : undefined,
    gap: columnGap === undefined && rowGap === undefined ? GRID_TOKENS.gap[gap] : undefined,
    columnGap: columnGap ? GRID_TOKENS.gap[columnGap] : undefined,
    rowGap: rowGap ? GRID_TOKENS.gap[rowGap] : undefined,
    alignItems: align,
    justifyItems: justify,
    ...style,
  };

  return (
    <div
      className={[GRID_STYLES.root, className].filter(Boolean).join(' ')}
      style={computedStyle}
      {...rest}
    >
      {children}
    </div>
  );
}
