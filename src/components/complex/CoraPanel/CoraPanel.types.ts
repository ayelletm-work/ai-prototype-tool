import type { CoraContext } from '@/types';

export interface CoraPanelProps {
  open: boolean;
  context?: Partial<CoraContext>;
}
