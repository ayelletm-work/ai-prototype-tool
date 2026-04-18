export const STACK_TOKENS = {
  gap: {
    none: '0',
    xs: 'var(--space-1)',
    sm: 'var(--space-2)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
    xl: 'var(--space-8)',
  },
  align: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline',
  },
  justify: {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly',
  },
} as const;
