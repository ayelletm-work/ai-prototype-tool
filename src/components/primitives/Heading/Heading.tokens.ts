export const HEADING_TOKENS = {
  size: {
    sm: 'var(--font-size-base)',
    md: 'var(--font-size-lg)',
    lg: 'var(--font-size-xl)',
    xl: 'var(--font-size-2xl)',
    '2xl': 'var(--font-size-3xl)',
    '3xl': 'var(--font-size-4xl)',
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
  },
  lineHeight: 'var(--line-height-tight)',
} as const;
