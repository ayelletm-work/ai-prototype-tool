import type { NavSpace } from '@/types';

export interface NavigatorPanelProps {
  space: NavSpace;
  activePath?: string;
  onNavigate?: (path: string) => void;
}
