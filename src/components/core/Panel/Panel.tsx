import './Panel.css';
import type { PanelProps } from './Panel.types';
import { PANEL_STYLES } from './Panel.styles';

export function Panel({
  padding = 'md',
  title,
  actions,
  border = true,
  shadow = false,
  className,
  children,
  ...rest
}: PanelProps) {
  const classes = [
    PANEL_STYLES.root,
    border ? PANEL_STYLES.bordered : '',
    shadow ? PANEL_STYLES.shadow : '',
    PANEL_STYLES[padding],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {(title || actions) && (
        <div className={PANEL_STYLES.header}>
          {title && <span className={PANEL_STYLES.title}>{title}</span>}
          {actions && <div className={PANEL_STYLES.actions}>{actions}</div>}
        </div>
      )}
      <div className={PANEL_STYLES.body}>{children}</div>
    </div>
  );
}
