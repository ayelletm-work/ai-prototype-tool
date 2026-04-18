export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly path: string;
  readonly showInSidebar?: boolean;
}

export interface NavSpace {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly basePath: string;
  readonly items: readonly NavItem[];
}

export interface RouteMetadata {
  readonly path: string;
  readonly title: string;
  readonly spaceId: string;
  readonly itemId: string;
}
