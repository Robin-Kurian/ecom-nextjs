import { NextResponse } from 'next/server';

// Mock featured categories data
const mockFeaturedCategories = [
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
    image: 'https://placehold.co/200x200/FF69B4/FFFFFF.png',
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
    image: 'https://placehold.co/200x200/0000FF/FFFFFF.png',
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
    image: 'https://placehold.co/200x200/00FF00/FFFFFF.png',
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
    image: 'https://placehold.co/200x200/FF0000/FFFFFF.png',
  },
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    return NextResponse.json(mockFeaturedCategories);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch featured categories' },
      { status: 500 }
    );
  }
} 