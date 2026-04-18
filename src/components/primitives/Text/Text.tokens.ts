export const TEXT_TOKENS = {
  size: {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    base: 'var(--font-size-base)',
    md: 'var(--font-size-md)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
  },
  weight: {
    normal: 'var(--font-weight-normal)',
    medium: 'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold: 'var(--font-weight-bold)',
  },
  color: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    tertiary: 'var(--text-tertiary)',
    disabled: 'var(--text-disabled)',
    inverse: 'var(--text-inverse)',
    link: 'var(--text-link)',
    danger: 'var(--text-danger)',
    success: 'var(--text-success)',
    warning: 'var(--text-warning)',
  },
} as const;
