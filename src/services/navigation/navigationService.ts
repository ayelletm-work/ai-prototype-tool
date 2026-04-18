import { NAV_SPACES, getActiveSpace, getActiveItem } from '@/config/navigation';
import type { NavSpace, NavItem } from '@/app/navigation/navigation.types';

export const navigationService = {
  getSpaces(): readonly NavSpace[] {
    return NAV_SPACES;
  },

  getActiveSpace(pathname: string): NavSpace | undefined {
    return getActiveSpace(pathname);
  },

  getActiveItem(pathname: string): NavItem | undefined {
    return getActiveItem(pathname);
  },

  getDefaultPath(): string {
    return '/manage/home';
  },
};
