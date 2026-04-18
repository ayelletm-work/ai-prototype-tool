import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ThemeMode, ThemeContextValue } from './theme.types';
import { THEME_MODE, THEME_STORAGE_KEY, THEME_ATTRIBUTE } from './theme.constants';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (stored === THEME_MODE.light || stored === THEME_MODE.dark) return stored;
  } catch {
    // localStorage unavailable
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEME_MODE.dark
    : THEME_MODE.light;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, themeMode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // localStorage unavailable
    }
  }, [themeMode]);

  function setThemeMode(mode: ThemeMode) {
    setThemeModeState(mode);
  }

  function toggleThemeMode() {
    setThemeModeState((prev) =>
      prev === THEME_MODE.light ? THEME_MODE.dark : THEME_MODE.light
    );
  }

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, toggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
