import type { HTMLAttributes } from 'react';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  color?: string;
  size?: 'sm' | 'md';
}
