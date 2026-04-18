import { useEffect } from 'react';
import './Drawer.css';
import type { DrawerProps } from './Drawer.types';
import { DRAWER_STYLES } from './Drawer.styles';

export function Drawer({
  open,
  onClose,
  title,
  width = 400,
  children,
  placement = 'right',
  footer,
}: DrawerProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={[DRAWER_STYLES.overlay, open ? DRAWER_STYLES.overlayVisible : ''].filter(Boolean).join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={[
          DRAWER_STYLES.drawer,
          placement === 'right' ? DRAWER_STYLES.drawerRight : DRAWER_STYLES.drawerLeft,
          open ? DRAWER_STYLES.drawerOpen : '',
        ].filter(Boolean).join(' ')}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <div className={DRAWER_STYLES.header}>
            <span className={DRAWER_STYLES.title}>{title}</span>
            <button type="button" className={DRAWER_STYLES.closeBtn} onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        )}
        <div className={DRAWER_STYLES.body}>{children}</div>
        {footer && <div className={DRAWER_STYLES.footer}>{footer}</div>}
      </div>
    </>
  );
}
