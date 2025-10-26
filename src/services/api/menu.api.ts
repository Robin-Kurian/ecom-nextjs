import { apiClient } from './base';

// Menu API Types
export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
  isActive: boolean;
  sortOrder: number;
  featured: boolean;
  promotionalBadge?: string;
  image?: string;
}

export interface MenuSection {
  id: string;
  heading: string;
  description?: string;
  sortOrder: number;
  categories: MenuCategory[];
}

export interface MenuGroup {
  id: string;
  label: string;
  slug: string;
  description?: string;
  image: string;
  imageAlt: string;
  ageGroup: string;
  isActive: boolean;
  sortOrder: number;
  sections: MenuSection[];
  displayOptions?: {
    showInNavbar: boolean;
    navbarLabel?: string;
    promotionalText?: string;
  };
}

export interface NavigationMenu {
  id: string;
  name: string;
  version: string;
  lastUpdated: string;
  groups: MenuGroup[];
  globalSettings?: {
    maxCategoriesPerSection: number;
    showProductCounts: boolean;
    enablePromotionalBadges: boolean;
  };
}

// API Functions
export const getNavigationMenu = async (): Promise<NavigationMenu> => {
  const response = await apiClient.get<NavigationMenu>('/menu/navigation');
  if (response && response.groups) {
    return response;
  }
  return {
    id: 'fallback-menu',
    name: 'Fallback Menu',
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    groups: [],
  };
};

export const getMenuGroup = async (groupId: string): Promise<MenuGroup | null> => {
  try {
    const response = await apiClient.get<MenuGroup>(`/menu/groups/${groupId}`);
    return response;
  } catch {
    return null;
  }
};

export const getNavbarGroups = async (): Promise<MenuGroup[]> => {
  try {
    const menu = await getNavigationMenu();
    if (!menu || !Array.isArray(menu.groups)) return [];
    return menu.groups
      .filter(group => group.isActive && group.displayOptions?.showInNavbar)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return [];
  }
};

export const getFeaturedCategories = async (): Promise<MenuCategory[]> => {
  try {
    const response = await apiClient.get<MenuCategory[]>('/menu/featured');
    return Array.isArray(response) ? response : [];
  } catch {
    return [];
  }
};

export const searchMenuCategories = async (query: string): Promise<MenuCategory[]> => {
  if (!query.trim()) return [];
  try {
    const response = await apiClient.get<MenuCategory[]>(`/menu/search?q=${encodeURIComponent(query)}`);
    return Array.isArray(response) ? response : [];
  } catch {
    return [];
  }
}; 