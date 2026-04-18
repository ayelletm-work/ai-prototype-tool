export const BADGE_TOKENS = {
  variants: {
    default: { bg: 'var(--bg-muted)', text: 'var(--text-secondary)', border: 'var(--border-default)' },
    primary: { bg: 'var(--accent-primary-subtle)', text: 'var(--accent-primary)', border: 'transparent' },
    success: { bg: 'var(--accent-success-subtle)', text: 'var(--accent-success)', border: 'transparent' },
    warning: { bg: 'var(--accent-warning-subtle)', text: 'var(--accent-warning)', border: 'transparent' },
    danger: { bg: 'var(--accent-danger-subtle)', text: 'var(--accent-danger)', border: 'transparent' },
    info: { bg: 'var(--bg-accent)', text: 'var(--text-link)', border: 'transparent' },
    purple: { bg: 'var(--color-purple-50)', text: 'var(--color-purple-600)', border: 'transparent' },
  },
} as const;
