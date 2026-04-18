import type { NavSpace } from './navigation.types';

/**
 * Single source of truth for all navigation spaces, items, and paths.
 * Sidebar, router, and breadcrumbs all derive from this registry.
 */
export const NAV_REGISTRY = [
  {
    id: 'manage',
    label: 'Manage',
    icon: 'grid',
    basePath: '/manage',
    items: [
      { id: 'home',   label: 'Home',   icon: 'home',   path: '/manage/home',   showInSidebar: true },
      { id: 'tags',   label: 'Tags',   icon: 'tag',    path: '/manage/tags',   showInSidebar: true },
      { id: 'assets', label: 'Assets', icon: 'folder', path: '/manage/assets', showInSidebar: true },
    ],
  },
  {
    id: 'workspace',
    label: 'Workspace',
    icon: 'layers',
    basePath: '/workspace',
    items: [
      { id: 'overview', label: 'Overview', icon: 'layout', path: '/workspace/overview', showInSidebar: true },
      { id: 'runtime',  label: 'Runtime',  icon: 'cpu',    path: '/workspace/runtime',  showInSidebar: true },
    ],
  },
  {
    id: 'agents',
    label: 'Agents',
    icon: 'zap',
    basePath: '/agents',
    items: [
      { id: 'overview', label: 'Overview', icon: 'activity', path: '/agents/overview', showInSidebar: true },
    ],
  },
  {
    id: 'setup',
    label: 'Setup',
    icon: 'settings',
    basePath: '/setup',
    items: [
      { id: 'preferences', label: 'Preferences', icon: 'sliders', path: '/setup/preferences', showInSidebar: true },
    ],
  },
] as const satisfies NavSpace[];

export type { NavSpace };
