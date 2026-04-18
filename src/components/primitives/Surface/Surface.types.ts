import type { HTMLAttributes } from 'react';

export type SurfaceVariant = 'default' | 'elevated' | 'sunken' | 'overlay';
export type SurfacePadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type SurfaceRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SurfaceVariant;
  padding?: SurfacePadding;
  radius?: SurfaceRadius;
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}
