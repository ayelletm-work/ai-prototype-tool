export interface ShellHeaderProps {
  onThemeToggle?: () => void;
  onCoraToggle?: () => void;
  coraOpen?: boolean;
  currentTheme?: 'light' | 'dark';
}
