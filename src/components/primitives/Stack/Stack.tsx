import './Stack.css';
import type { StackProps } from './Stack.types';
import { STACK_STYLES } from './Stack.styles';
import { STACK_TOKENS } from './Stack.tokens';

export function Stack({
  direction = 'vertical',
  gap = 'md',
  align,
  justify,
  wrap = false,
  fullWidth = false,
  className,
  style,
  children,
  ...rest
}: StackProps) {
  const computedStyle: React.CSSProperties = {
    gap: STACK_TOKENS.gap[gap],
    alignItems: align ? STACK_TOKENS.align[align] : undefined,
    justifyContent: justify ? STACK_TOKENS.justify[justify] : undefined,
    ...style,
  };

  const classes = [
    STACK_STYLES.root,
    direction === 'horizontal' ? STACK_STYLES.horizontal : STACK_STYLES.vertical,
    wrap ? STACK_STYLES.wrap : '',
    fullWidth ? STACK_STYLES.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={computedStyle} {...rest}>
      {children}
    </div>
  );
}
