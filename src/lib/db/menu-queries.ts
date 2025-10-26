import { sql } from "./index";
import { NavigationMenu, MenuGroup, MenuSection, MenuCategory } from "@/services/api/menu.api";
import { menuCache, getCacheKey } from "./menu-cache";

// Step 1: Get menu groups with sections (cached for fast loads)
export async function getMenuGroupsFast(): Promise<MenuGroup[]> {
  if (!sql) return [];

  const cacheKey = getCacheKey('groups');
  
  // Check cache first
  const cached = menuCache.get<MenuGroup[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    // Get groups
    const groups = await sql`
      SELECT 
        id,
        label,
        slug,
        description,
        image,
        image_alt,
        age_group,
        is_active,
        sort_order,
        display_options
      FROM menu_groups
      WHERE is_active = true
      ORDER BY sort_order ASC
    `;

    // Load sections for all groups in parallel
    const groupsWithSections = await Promise.all(
      (groups as Array<{
        id: string;
        label: string;
        slug: string;
        description: string;
        image: string;
        image_alt: string;
        age_group: string;
        is_active: boolean;
        sort_order: number;
        display_options: Record<string, unknown>;
      }>).map(async (group) => {
        const sections = await getGroupSections(group.id);
        
        return {
          id: group.id,
          label: group.label,
          slug: group.slug,
          description: group.description,
          image: group.image,
          imageAlt: group.image_alt,
          ageGroup: group.age_group,
          isActive: group.is_active,
          sortOrder: group.sort_order,
          displayOptions: {
            showInNavbar: (group.display_options as { showInNavbar?: boolean })?.showInNavbar ?? false,
            navbarLabel: (group.display_options as { navbarLabel?: string })?.navbarLabel,
            promotionalText: (group.display_options as { promotionalText?: string })?.promotionalText,
          },
          sections, // Loaded immediately
        };
      })
    );

    // Cache for 1 hour
    menuCache.set(cacheKey, groupsWithSections, 60 * 60 * 1000);
    
    return groupsWithSections;
  } catch {
    return [];
  }
}

// Step 2: Get sections for a specific group with caching
export async function getGroupSections(groupId: string): Promise<MenuSection[]> {
  if (!sql) return [];

  const cacheKey = getCacheKey('sections', groupId);
  
  // Check cache first
  const cached = menuCache.get<MenuSection[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const sections = await sql`
      SELECT 
        id,
        heading,
        description,
        sort_order
      FROM menu_sections
      WHERE group_id = ${groupId}
      ORDER BY sort_order ASC
    `;

    const menuSections: MenuSection[] = [];

    for (const section of sections) {
      // Get categories for this section
      const categories = await sql`
        SELECT 
          id,
          name,
          slug,
          description,
          product_count,
          is_active,
          sort_order,
          featured,
          promotional_badge,
          image
      FROM menu_categories
      WHERE section_id = ${section.id} AND is_active = true
      ORDER BY sort_order ASC
    `;

    const menuCategories: MenuCategory[] = (categories as Array<{
      id: string;
      name: string;
      slug: string;
      description: string;
      product_count: number;
      is_active: boolean;
      sort_order: number;
      featured: boolean;
      promotional_badge: string | null;
      image: string;
    }>).map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      productCount: cat.product_count || 0,
      isActive: cat.is_active,
      sortOrder: cat.sort_order,
      featured: cat.featured || false,
      promotionalBadge: cat.promotional_badge ?? undefined,
      image: cat.image,
    }));

      menuSections.push({
        id: section.id,
        heading: section.heading,
        description: section.description,
        sortOrder: section.sort_order,
        categories: menuCategories,
      });
    }

    // Cache for 1 hour (cache will persist until server restart)
    menuCache.set(cacheKey, menuSections, 60 * 60 * 1000);
    
    return menuSections;
  } catch {
    return [];
  }
}

/**
 * Clear menu cache (useful for admin updates)
 */
export function clearMenuCache() {
  menuCache.clear();
}

/**
 * Invalidate specific group cache
 */
export function invalidateGroupCache(groupId: string) {
  menuCache.invalidate(getCacheKey('sections', groupId));
  menuCache.invalidate(getCacheKey('groups'));
}

// Full navigation menu (for fallback or initial load)
export async function getNavigationMenu(): Promise<NavigationMenu> {
  if (!sql) {
    return {
      id: 'main-menu-v1',
      name: 'Main Navigation Menu',
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      groups: [],
    };
  }

  try {
    // Get menu groups with display options
    const groups = await sql`
      SELECT 
        id,
        label,
        slug,
        description,
        image,
        image_alt,
        age_group,
        is_active,
        sort_order,
        display_options
      FROM menu_groups
      WHERE is_active = true
      ORDER BY sort_order ASC
    `;

    const menuGroups: MenuGroup[] = [];

    for (const group of groups) {
      // Get sections for this group
      const sections = await sql`
        SELECT 
          id,
          heading,
          description,
          sort_order
        FROM menu_sections
        WHERE group_id = ${group.id}
        ORDER BY sort_order ASC
      `;

      const menuSections: MenuSection[] = [];

      for (const section of sections) {
        // Get categories for this section
        const categories = await sql`
          SELECT 
            id,
            name,
            slug,
            description,
            product_count,
            is_active,
            sort_order,
            featured,
            promotional_badge,
            image
          FROM menu_categories
          WHERE section_id = ${section.id} AND is_active = true
          ORDER BY sort_order ASC
        `;

        const menuCategories: MenuCategory[] = (categories as Array<{
          id: string;
          name: string;
          slug: string;
          description: string;
          product_count: number;
          is_active: boolean;
          sort_order: number;
          featured: boolean;
          promotional_badge: string | null;
          image: string;
        }>).map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          productCount: cat.product_count || 0,
          isActive: cat.is_active,
          sortOrder: cat.sort_order,
          featured: cat.featured || false,
          promotionalBadge: cat.promotional_badge ?? undefined,
          image: cat.image,
        }));

        menuSections.push({
          id: section.id,
          heading: section.heading,
          description: section.description,
          sortOrder: section.sort_order,
          categories: menuCategories,
        });
      }

      const displayOptions = group.display_options || {};
      menuGroups.push({
        id: group.id,
        label: group.label,
        slug: group.slug,
        description: group.description,
        image: group.image,
        imageAlt: group.image_alt,
        ageGroup: group.age_group,
        isActive: group.is_active,
        sortOrder: group.sort_order,
        displayOptions: {
          showInNavbar: displayOptions.showInNavbar || false,
          navbarLabel: displayOptions.navbarLabel,
          promotionalText: displayOptions.promotionalText,
        },
        sections: menuSections,
      });
    }

    return {
      id: 'main-menu-v1',
      name: 'Main Navigation Menu',
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      groups: menuGroups,
      globalSettings: {
        maxCategoriesPerSection: 10,
        showProductCounts: true,
        enablePromotionalBadges: true,
      },
    };
  } catch {
    return {
      id: 'main-menu-v1',
      name: 'Main Navigation Menu',
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      groups: [],
    };
  }
}
