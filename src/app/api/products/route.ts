import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductById, searchProducts as dbSearchProducts } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const id = searchParams.get('id');

    if (search) {
      const products = await dbSearchProducts(search);
      return NextResponse.json({ data: products });
    }

    if (id) {
      const product = await getProductById(Number(id));
      return NextResponse.json({ data: product ? [product] : [] });
    }

    const products = await getAllProducts();
    return NextResponse.json({ data: products });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

