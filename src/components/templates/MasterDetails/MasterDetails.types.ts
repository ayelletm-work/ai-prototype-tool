import type { ReactNode } from 'react';

export interface MasterDetailsProps {
  master: ReactNode;
  details: ReactNode;
  detailsOpen: boolean;
  detailsWidth?: number | string;
}
