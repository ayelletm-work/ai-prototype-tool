export const BUTTON_TOKENS = {
  variants: {
    primary: {
      bg: 'var(--accent-primary)',
      bgHover: 'var(--accent-primary-hover)',
      bgActive: 'var(--accent-primary-active)',
      text: 'var(--text-inverse)',
      border: 'transparent',
    },
    secondary: {
      bg: 'var(--bg-surface)',
      bgHover: 'var(--bg-subtle)',
      bgActive: 'var(--bg-muted)',
      text: 'var(--text-primary)',
      border: 'var(--border-default)',
    },
    ghost: {
      bg: 'transparent',
      bgHover: 'var(--bg-subtle)',
      bgActive: 'var(--bg-muted)',
      text: 'var(--text-secondary)',
      border: 'transparent',
    },
    danger: {
      bg: 'var(--accent-danger)',
      bgHover: 'var(--accent-danger-hover)',
      bgActive: 'var(--accent-danger)',
      text: 'var(--text-inverse)',
      border: 'transparent',
    },
  },
  size: {
    sm: { height: '28px', padding: '0 var(--space-3)', fontSize: 'var(--font-size-sm)', radius: 'var(--radius-sm)' },
    md: { height: '32px', padding: '0 var(--space-4)', fontSize: 'var(--font-size-base)', radius: 'var(--radius-md)' },
    lg: { height: '40px', padding: '0 var(--space-5)', fontSize: 'var(--font-size-lg)', radius: 'var(--radius-md)' },
  },
} as const;
