import type { ThemeMode } from './theme.types';

export const THEME_MODE = {
  light: 'light' as ThemeMode,
  dark: 'dark' as ThemeMode,
} as const;

export const THEME_STORAGE_KEY = 'ai-prototype-theme';

export const THEME_ATTRIBUTE = 'data-theme';
