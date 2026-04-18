import './Badge.css';
import type { BadgeProps } from './Badge.types';
import { BADGE_STYLES } from './Badge.styles';

export function Badge({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...rest
}: BadgeProps) {
  const classes = [
    BADGE_STYLES.root,
    BADGE_STYLES[size],
    BADGE_STYLES[variant],
    className,
  ].filter(Boolean).join(' ');

  return <span className={classes} {...rest}>{children}</span>;
}
