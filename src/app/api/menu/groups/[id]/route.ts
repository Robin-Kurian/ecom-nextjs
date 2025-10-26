import { NextRequest, NextResponse } from 'next/server';
import { getGroupSections } from '@/lib/db/menu-queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sections = await getGroupSections(id);
  return NextResponse.json({ data: sections });
}
