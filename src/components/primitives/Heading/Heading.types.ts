import type { HTMLAttributes } from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
  color?: 'primary' | 'secondary' | 'tertiary';
}
