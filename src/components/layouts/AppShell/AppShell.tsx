import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AppShell.css';
import type { AppShellProps } from './AppShell.types';
import { APP_SHELL_STYLES } from './AppShell.styles';
import { ShellHeader } from '@/components/complex/ShellHeader';
import { NavigationSidebar } from '@/components/complex/NavigationSidebar';
import { CoraPanel } from '@/components/complex/CoraPanel';
import { themeService } from '@/services/theme/themeService';
import { getActiveSpace } from '@/config/navigation';

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [coraOpen, setCoraOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => themeService.get());
  const activeSpace = getActiveSpace(location.pathname);

  const handleThemeToggle = useCallback(() => {
    const next = themeService.toggle();
    setTheme(next);
  }, []);

  const handleCoraToggle = useCallback(() => {
    setCoraOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return (
    <div className={APP_SHELL_STYLES.root}>
      <ShellHeader
        onThemeToggle={handleThemeToggle}
        onCoraToggle={handleCoraToggle}
        coraOpen={coraOpen}
        currentTheme={theme}
      />
      <div className={APP_SHELL_STYLES.body}>
        <div className={APP_SHELL_STYLES.sidebar}>
          <NavigationSidebar
            activePath={location.pathname}
            activeSpaceId={activeSpace?.id}
            onNavigate={handleNavigate}
          />
        </div>
        <div className={APP_SHELL_STYLES.main}>
          <div className={APP_SHELL_STYLES.content}>
            {children}
          </div>
          <CoraPanel
            open={coraOpen}
            context={{
              pageId: activeSpace?.id ?? 'default',
              pageTitle: activeSpace?.label,
            }}
          />
        </div>
      </div>
    </div>
  );
}
