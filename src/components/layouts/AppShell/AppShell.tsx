import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AppShell.css';
import type { AppShellProps } from './AppShell.types';
import { APP_SHELL_STYLES } from './AppShell.styles';
import { ShellHeader } from '@/components/complex/ShellHeader';
import { NavigationSidebar } from '@/components/complex/NavigationSidebar';
import { CoraPanel } from '@/components/complex/CoraPanel';
import { useTheme } from '@/theme/ThemeProvider';
import { getActiveSpace } from '@/app/navigation/navigation.utils';

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeMode, toggleThemeMode } = useTheme();
  const [coraOpen, setCoraOpen] = useState(false);
  const activeSpace = getActiveSpace(location.pathname);

  const handleCoraToggle = useCallback(() => {
    setCoraOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return (
    <div className={APP_SHELL_STYLES.root}>
      <ShellHeader
        onThemeToggle={toggleThemeMode}
        onCoraToggle={handleCoraToggle}
        coraOpen={coraOpen}
        currentTheme={themeMode}
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
