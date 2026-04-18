export interface NavigationSidebarProps {
  activeSpaceId?: string;
  activePath?: string;
  onNavigate?: (path: string) => void;
}
