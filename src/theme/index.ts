export const THEMES = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = typeof THEMES[keyof typeof THEMES];

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? THEMES.dark
    : THEMES.light;
}
