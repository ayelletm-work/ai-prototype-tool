export { ThemeProvider, useTheme } from './ThemeProvider';
export type { ThemeMode, ThemeContextValue } from './theme.types';
export { THEME_MODE, THEME_STORAGE_KEY, THEME_ATTRIBUTE } from './theme.constants';

import type { ThemeMode } from './theme.types';

// Legacy helpers retained for backward compatibility
export function applyTheme(theme: ThemeMode): void {
  document.documentElement.setAttribute('data-theme', theme);
}

export function getSystemTheme(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
