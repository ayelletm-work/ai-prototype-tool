import type { HTMLAttributes } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'default' | 'strong' | 'muted';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
}
