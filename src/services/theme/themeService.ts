import { applyTheme, getSystemTheme } from '@/theme';
import type { Theme } from '@/theme';

const STORAGE_KEY = 'ai-prototype-theme';

export const themeService = {
  init(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const theme = stored ?? getSystemTheme();
    applyTheme(theme);
    return theme;
  },

  set(theme: Theme): void {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  },

  get(): Theme {
    return (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? getSystemTheme();
  },

  toggle(): Theme {
    const current = this.get();
    const next: Theme = current === 'light' ? 'dark' : 'light';
    this.set(next);
    return next;
  },
};
