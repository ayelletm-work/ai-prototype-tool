import './ShellHeader.css';
import type { ShellHeaderProps } from './ShellHeader.types';
import { SHELL_HEADER_STYLES } from './ShellHeader.styles';

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
    </svg>
  );
}

function CoraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

export function ShellHeader({
  onThemeToggle,
  onCoraToggle,
  coraOpen = false,
  currentTheme = 'light',
}: ShellHeaderProps) {
  return (
    <header className={SHELL_HEADER_STYLES.root}>
      <div className={SHELL_HEADER_STYLES.inner}>
        <a href="/manage/home" className={SHELL_HEADER_STYLES.brand}>
          <div className={SHELL_HEADER_STYLES.brandLogo}>AI</div>
          <span className={SHELL_HEADER_STYLES.brandName}>AI Prototype Tool</span>
        </a>
        <div className={SHELL_HEADER_STYLES.actions}>
          <button
            type="button"
            className={SHELL_HEADER_STYLES.actionBtn}
            onClick={onThemeToggle}
            aria-label={currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            type="button"
            className={[
              SHELL_HEADER_STYLES.actionBtn,
              coraOpen ? SHELL_HEADER_STYLES.actionBtnActive : '',
            ].filter(Boolean).join(' ')}
            onClick={onCoraToggle}
            aria-label="Toggle Cora AI assistant"
          >
            <CoraIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
