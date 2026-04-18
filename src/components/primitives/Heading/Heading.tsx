import './Heading.css';
import type { HeadingProps } from './Heading.types';
import { HEADING_STYLES } from './Heading.styles';
import { HEADING_TOKENS } from './Heading.tokens';

export function Heading({
  as: Tag = 'h2',
  size = 'lg',
  weight = 'semibold',
  color = 'primary',
  className,
  style,
  children,
  ...rest
}: HeadingProps) {
  const computedStyle: React.CSSProperties = {
    fontSize: HEADING_TOKENS.size[size],
    fontWeight: HEADING_TOKENS.weight[weight],
    color: HEADING_TOKENS.color[color],
    ...style,
  };

  return (
    <Tag
      className={[HEADING_STYLES.root, className].filter(Boolean).join(' ')}
      style={computedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
