import './NavigationSidebar.css';
import { NAV_SPACES } from '@/config/navigation';
import type { NavigationSidebarProps } from './NavigationSidebar.types';
import { NAV_SIDEBAR_STYLES } from './NavigationSidebar.styles';

function NavIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    home: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    tag: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
    folder: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
    layout: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>,
    cpu: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    activity: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    sliders: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
    default: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/></svg>,
  };
  return <>{icons[name] ?? icons['default']}</>;
}

export function NavigationSidebar({ activePath = '', onNavigate }: NavigationSidebarProps) {
  return (
    <nav className={NAV_SIDEBAR_STYLES.root} aria-label="Main navigation">
      {NAV_SPACES.map((space, index) => (
        <div key={space.id} className={NAV_SIDEBAR_STYLES.spaceSection}>
          {index > 0 && <div className={NAV_SIDEBAR_STYLES.divider} />}
          <div className={NAV_SIDEBAR_STYLES.spaceHeader}>
            <span className={NAV_SIDEBAR_STYLES.spaceLabel}>{space.label}</span>
          </div>
          <div className={NAV_SIDEBAR_STYLES.itemList}>
            {space.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className={[
                  NAV_SIDEBAR_STYLES.item,
                  activePath === item.path || activePath.startsWith(item.path + '/')
                    ? NAV_SIDEBAR_STYLES.itemActive
                    : '',
                ].filter(Boolean).join(' ')}
                onClick={() => onNavigate?.(item.path)}
                aria-current={activePath === item.path ? 'page' : undefined}
              >
                <span className={NAV_SIDEBAR_STYLES.itemIcon}>
                  <NavIcon name={item.icon} />
                </span>
                <span className={NAV_SIDEBAR_STYLES.itemLabel}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
