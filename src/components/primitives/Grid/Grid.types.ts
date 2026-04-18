import type { HTMLAttributes } from 'react';

export type GapScale = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AlignItems = 'start' | 'center' | 'end' | 'stretch';
export type JustifyItems = 'start' | 'center' | 'end' | 'stretch';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  gap?: GapScale;
  columnGap?: GapScale;
  rowGap?: GapScale;
  align?: AlignItems;
  justify?: JustifyItems;
  minColumnWidth?: string;
}
