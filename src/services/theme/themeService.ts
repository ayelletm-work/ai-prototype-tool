import { applyTheme, getSystemTheme } from '@/theme';
import type { ThemeMode } from '@/theme';

const STORAGE_KEY = 'ai-prototype-theme';

export const themeService = {
  init(): ThemeMode {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const theme = stored ?? getSystemTheme();
    applyTheme(theme);
    return theme;
  },

  set(theme: ThemeMode): void {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  },

  get(): ThemeMode {
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? getSystemTheme();
  },

  toggle(): ThemeMode {
    const current = this.get();
    const next: ThemeMode = current === 'light' ? 'dark' : 'light';
    this.set(next);
    return next;
  },
};
