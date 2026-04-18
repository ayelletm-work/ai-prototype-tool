export const SURFACE_TOKENS = {
  background: {
    default: 'var(--bg-surface)',
    elevated: 'var(--bg-elevated)',
    sunken: 'var(--bg-subtle)',
    overlay: 'var(--bg-overlay)',
  },
  padding: {
    none: '0',
    sm: 'var(--space-3)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)',
  },
  radius: {
    none: 'var(--radius-none)',
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
  },
  shadow: {
    none: 'var(--shadow-none)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  },
  border: 'var(--border-default)',
} as const;
