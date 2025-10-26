import { NextResponse } from 'next/server';
import { getMenuGroupsFast } from '@/lib/db/menu-queries';

export async function GET() {
  const groups = await getMenuGroupsFast();
  
  if (groups.length === 0) {
    return NextResponse.json({ error: 'No menu groups available' }, { status: 404 });
  }
  
  // Add cache headers for browser caching
  return NextResponse.json(
    { data: groups },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}

