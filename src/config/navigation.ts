/**
 * Backward-compatibility shim.
 * All navigation truth lives in src/app/navigation/navigation.registry.ts.
 */
export {
  NAV_REGISTRY as NAV_SPACES,
} from '@/app/navigation/navigation.registry';

export {
  getActiveSpace,
  getActiveItem,
  getSpaceById,
} from '@/app/navigation/navigation.utils';

export type { NavSpace, NavItem } from '@/app/navigation/navigation.types';
