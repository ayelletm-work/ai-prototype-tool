import type { HTMLAttributes, ReactNode } from 'react';

export type ScrollDirection = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  direction?: ScrollDirection;
  maxHeight?: string | number;
  maxWidth?: string | number;
  children: ReactNode;
}
