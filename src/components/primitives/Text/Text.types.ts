import type { HTMLAttributes, ElementType } from 'react';

export type TextSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'inverse' | 'link' | 'danger' | 'success' | 'warning';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  truncate?: boolean;
  mono?: boolean;
}
