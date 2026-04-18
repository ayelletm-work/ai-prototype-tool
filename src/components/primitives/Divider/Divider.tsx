import './Divider.css';
import type { DividerProps } from './Divider.types';
import { DIVIDER_STYLES } from './Divider.styles';
import { DIVIDER_TOKENS } from './Divider.tokens';

export function Divider({
  orientation = 'horizontal',
  variant = 'default',
  className,
  style,
  ...rest
}: DividerProps) {
  const computedStyle: React.CSSProperties = {
    backgroundColor: DIVIDER_TOKENS.color[variant],
    ...style,
  };

  const classes = [
    DIVIDER_STYLES.root,
    orientation === 'horizontal' ? DIVIDER_STYLES.horizontal : DIVIDER_STYLES.vertical,
    className,
  ].filter(Boolean).join(' ');

  return <hr className={classes} style={computedStyle} {...(rest as React.HTMLAttributes<HTMLHRElement>)} />;
}
