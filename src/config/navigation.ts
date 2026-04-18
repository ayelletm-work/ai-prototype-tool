import type { NavSpace } from '@/types';

export const NAV_SPACES: NavSpace[] = [
  {
    id: 'manage',
    label: 'Manage',
    icon: 'grid',
    basePath: '/manage',
    items: [
      { id: 'home', label: 'Home', icon: 'home', path: '/manage/home' },
      { id: 'tags', label: 'Tags', icon: 'tag', path: '/manage/tags' },
      { id: 'assets', label: 'Assets', icon: 'folder', path: '/manage/assets' },
    ],
  },
  {
    id: 'workspace',
    label: 'Workspace',
    icon: 'layers',
    basePath: '/workspace',
    items: [
      { id: 'overview', label: 'Overview', icon: 'layout', path: '/workspace/overview' },
      { id: 'runtime', label: 'Runtime', icon: 'cpu', path: '/workspace/runtime' },
    ],
  },
  {
    id: 'agents',
    label: 'Agents',
    icon: 'zap',
    basePath: '/agents',
    items: [
      { id: 'overview', label: 'Overview', icon: 'activity', path: '/agents/overview' },
    ],
  },
  {
    id: 'setup',
    label: 'Setup',
    icon: 'settings',
    basePath: '/setup',
    items: [
      { id: 'preferences', label: 'Preferences', icon: 'sliders', path: '/setup/preferences' },
    ],
  },
];

export function getSpaceById(id: string): NavSpace | undefined {
  return NAV_SPACES.find((s) => s.id === id);
}

export function getActiveSpace(pathname: string): NavSpace | undefined {
  return NAV_SPACES.find((s) => pathname.startsWith(s.basePath));
}

export function getActiveItem(pathname: string): NavItem | undefined {
  for (const space of NAV_SPACES) {
    const item = space.items.find((i) => pathname === i.path || pathname.startsWith(i.path + '/'));
    if (item) return item;
  }
  return undefined;
}

// Keep NavItem imported from types — re-export for convenience
import type { NavItem } from '@/types';
export type { NavItem, NavSpace };
