import type { HTMLAttributes } from 'react';

export type GapScale = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical';
  gap?: GapScale;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  fullWidth?: boolean;
}
