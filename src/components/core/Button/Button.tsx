import './Button.css';
import type { ButtonProps } from './Button.types';
import { BUTTON_STYLES } from './Button.styles';

export function Button({
  variant = 'secondary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    BUTTON_STYLES.root,
    BUTTON_STYLES[variant],
    BUTTON_STYLES[size],
    loading ? BUTTON_STYLES.loading : '',
    fullWidth ? BUTTON_STYLES.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {leftIcon && <span className={BUTTON_STYLES.icon}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={BUTTON_STYLES.icon}>{rightIcon}</span>}
    </button>
  );
}
