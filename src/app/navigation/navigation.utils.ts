import { NAV_REGISTRY } from './navigation.registry';
import type { NavSpace, NavItem, RouteMetadata } from './navigation.types';

export function getActiveSpace(pathname: string): NavSpace | undefined {
  return NAV_REGISTRY.find((s) => pathname.startsWith(s.basePath));
}

export function getActiveItem(pathname: string): NavItem | undefined {
  for (const space of NAV_REGISTRY) {
    const item = space.items.find(
      (i) => pathname === i.path || pathname.startsWith(i.path + '/')
    );
    if (item) return item;
  }
  return undefined;
}

export function getSpaceById(id: string): NavSpace | undefined {
  return NAV_REGISTRY.find((s) => s.id === id);
}

export function getRouteMetadata(pathname: string): RouteMetadata | undefined {
  for (const space of NAV_REGISTRY) {
    const item = space.items.find(
      (i) => pathname === i.path || pathname.startsWith(i.path + '/')
    );
    if (item) {
      return {
        path: item.path,
        title: item.label,
        spaceId: space.id,
        itemId: item.id,
      };
    }
  }
  return undefined;
}

export function getDefaultPath(): string {
  return '/manage/home';
}
