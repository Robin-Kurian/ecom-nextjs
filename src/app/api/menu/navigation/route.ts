import { NextResponse } from 'next/server';
import { getNavigationMenu as fetchNavigationMenu } from '@/lib/db/menu-queries';

export async function GET() {
  const menuData = await fetchNavigationMenu();
  
  if (!menuData.groups || menuData.groups.length === 0) {
    return NextResponse.json(
      { error: 'No menu data available' },
      { status: 404 }
    );
  }
  
  // Add cache headers for browser caching
  return NextResponse.json(menuData, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
