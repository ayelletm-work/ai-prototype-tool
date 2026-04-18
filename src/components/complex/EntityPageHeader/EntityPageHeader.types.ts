import type { ReactNode } from 'react';

export interface EntityPageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  actions?: ReactNode;
}
