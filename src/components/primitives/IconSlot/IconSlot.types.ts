import type { HTMLAttributes, ReactNode } from 'react';

export type IconSlotSize = 'xs' | 'sm' | 'md' | 'lg';
export type IconSlotColor = 'inherit' | 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'accent' | 'danger' | 'success' | 'warning';

export interface IconSlotProps extends HTMLAttributes<HTMLSpanElement> {
  size?: IconSlotSize;
  color?: IconSlotColor;
  children: ReactNode;
}
