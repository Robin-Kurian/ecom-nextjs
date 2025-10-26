import { NextRequest, NextResponse } from 'next/server';
import { clearMenuCache, invalidateGroupCache } from '@/lib/db/menu-queries';

/**
 * Clear menu cache
 * POST /api/menu/clear-cache
 * Optional: groupId in body to clear specific group
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    
    if (body.groupId) {
      invalidateGroupCache(body.groupId);
      return NextResponse.json({ 
        message: `Cache cleared for group: ${body.groupId}` 
      });
    }
    
    clearMenuCache();
    return NextResponse.json({ message: 'All menu cache cleared' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}

