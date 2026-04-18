import './Surface.css';
import type { SurfaceProps } from './Surface.types';
import { SURFACE_STYLES } from './Surface.styles';
import { SURFACE_TOKENS } from './Surface.tokens';

export function Surface({
  variant = 'default',
  padding = 'md',
  radius = 'md',
  border = true,
  shadow,
  className,
  style,
  children,
  ...rest
}: SurfaceProps) {
  const computedStyle: React.CSSProperties = {
    background: SURFACE_TOKENS.background[variant],
    padding: SURFACE_TOKENS.padding[padding],
    borderRadius: SURFACE_TOKENS.radius[radius],
    boxShadow: shadow ? SURFACE_TOKENS.shadow[shadow] : undefined,
    ...style,
  };

  const classes = [
    SURFACE_STYLES.root,
    border ? SURFACE_STYLES.bordered : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={computedStyle} {...rest}>
      {children}
    </div>
  );
}
