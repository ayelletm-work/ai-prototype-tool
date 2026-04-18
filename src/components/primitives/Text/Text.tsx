import './Text.css';
import type { TextProps } from './Text.types';
import { TEXT_STYLES } from './Text.styles';
import { TEXT_TOKENS } from './Text.tokens';

export function Text({
  as: Tag = 'span',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  truncate = false,
  mono = false,
  className,
  style,
  children,
  ...rest
}: TextProps) {
  const computedStyle: React.CSSProperties = {
    fontSize: TEXT_TOKENS.size[size],
    fontWeight: TEXT_TOKENS.weight[weight],
    color: TEXT_TOKENS.color[color],
    ...style,
  };

  const classes = [
    TEXT_STYLES.root,
    truncate ? TEXT_STYLES.truncate : '',
    mono ? TEXT_STYLES.mono : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} style={computedStyle} {...rest}>
      {children}
    </Tag>
  );
}
