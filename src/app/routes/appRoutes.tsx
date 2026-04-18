import { Navigate, type RouteObject } from 'react-router-dom';
import { AppShell } from '@/components/layouts/AppShell';
import { HomePage } from '@/pages/manage/HomePage';
import { TagsPage } from '@/pages/manage/TagsPage';
import { AssetsPage } from '@/pages/manage/AssetsPage';
import { OverviewPage } from '@/pages/workspace/OverviewPage';
import { RuntimePage } from '@/pages/workspace/RuntimePage';
import { AgentsOverviewPage } from '@/pages/agents/AgentsOverviewPage';
import { PreferencesPage } from '@/pages/setup/PreferencesPage';

function Shell({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}

export const appRoutes: RouteObject[] = [
  { path: '/', element: <Navigate to="/manage/home" replace /> },
  { path: '/manage',              element: <Shell><Navigate to="/manage/home" replace /></Shell> },
  { path: '/manage/home',         element: <Shell><HomePage /></Shell> },
  { path: '/manage/tags',         element: <Shell><TagsPage /></Shell> },
  { path: '/manage/assets',       element: <Shell><AssetsPage /></Shell> },
  { path: '/workspace',           element: <Shell><Navigate to="/workspace/overview" replace /></Shell> },
  { path: '/workspace/overview',  element: <Shell><OverviewPage /></Shell> },
  { path: '/workspace/runtime',   element: <Shell><RuntimePage /></Shell> },
  { path: '/agents',              element: <Shell><Navigate to="/agents/overview" replace /></Shell> },
  { path: '/agents/overview',     element: <Shell><AgentsOverviewPage /></Shell> },
  { path: '/setup',               element: <Shell><Navigate to="/setup/preferences" replace /></Shell> },
  { path: '/setup/preferences',   element: <Shell><PreferencesPage /></Shell> },
  { path: '*',                    element: <Navigate to="/manage/home" replace /> },
];
