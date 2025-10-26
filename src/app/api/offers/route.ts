import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/db/queries';

export async function GET() {
  try {
    const products = await getAllProducts();
    
    // Filter products that have offers or are in the offers category
    const offerProducts = products.filter(product => 
      product.category === "offers" || product.offer !== null
    );
    
    return NextResponse.json(offerProducts);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}

