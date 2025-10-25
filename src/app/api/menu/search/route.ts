import { NextResponse } from 'next/server';

// Mock categories data for search
const mockCategories = [
  {
    id: 'newborn-bodysuits',
    name: 'Bodysuits & Onesies',
    slug: 'newborn',
    description: 'Essential bodysuits for everyday wear',
    productCount: 5,
    isActive: true,
    sortOrder: 1,
    featured: true,
    promotionalBadge: 'Essential',
  },
  {
    id: 'newborn-swaddles',
    name: 'Swaddles & Blankets',
    slug: 'newborn-swaddles',
    description: 'Cozy swaddles for peaceful sleep',
    productCount: 3,
    isActive: true,
    sortOrder: 2,
    featured: false,
  },
  {
    id: 'baby-toys',
    name: 'Toys & Play',
    slug: 'toys',
    description: 'Educational and fun toys',
    productCount: 8,
    isActive: true,
    sortOrder: 1,
    featured: true,
    promotionalBadge: 'Best Sellers',
  },
  {
    id: 'baby-rompers',
    name: 'Rompers & Jumpsuits',
    slug: 'baby-rompers',
    description: 'Perfect for active babies',
    productCount: 4,
    isActive: true,
    sortOrder: 1,
    featured: true,
    promotionalBadge: 'Trending',
  },
  {
    id: 'baby-bottles',
    name: 'Bottles & Sippy Cups',
    slug: 'feeding',
    description: 'BPA-free bottles and training cups',
    productCount: 6,
    isActive: true,
    sortOrder: 1,
    featured: true,
    promotionalBadge: 'Essential',
  },
  {
    id: 'baby-bibs',
    name: 'Bibs & Feeding Accessories',
    slug: 'feeding-accessories',
    description: 'Mess-free feeding solutions',
    productCount: 4,
    isActive: true,
    sortOrder: 2,
    featured: false,
  },
  {
    id: 'toddler-casual',
    name: 'Casual Wear',
    slug: 'toddler-casual',
    description: 'Comfortable everyday clothing',
    productCount: 5,
    isActive: true,
    sortOrder: 1,
    featured: false,
  },
  {
    id: 'toddler-party',
    name: 'Party & Formal',
    slug: 'toddler-party',
    description: 'Special occasion outfits',
    productCount: 2,
    isActive: true,
    sortOrder: 2,
    featured: true,
    promotionalBadge: 'Special',
  },
  {
    id: 'toddler-utensils',
    name: 'Utensils & Plates',
    slug: 'feeding',
    description: 'Self-feeding utensils and dishware',
    productCount: 5,
    isActive: true,
    sortOrder: 1,
    featured: false,
  },
  {
    id: 'toddler-snacks',
    name: 'Snack Containers',
    slug: 'snack-containers',
    description: 'Portable snack and lunch solutions',
    productCount: 3,
    isActive: true,
    sortOrder: 2,
    featured: false,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    if (!query) {
      return NextResponse.json([]);
    }
    
    // Simple search implementation
    const filteredCategories = mockCategories.filter(category => 
      category.name.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query) ||
      category.slug.toLowerCase().includes(query)
    );
    
    return NextResponse.json(filteredCategories);
  } catch (error) {
    console.error('Error searching menu categories:', error);
    return NextResponse.json(
      { error: 'Failed to search menu categories' },
      { status: 500 }
    );
  }
} 