import type { NavSpace } from '@/types';

export interface SpaceSwitcherProps {
  spaces: NavSpace[];
  activeSpaceId?: string;
  onSwitch?: (spaceId: string) => void;
}
