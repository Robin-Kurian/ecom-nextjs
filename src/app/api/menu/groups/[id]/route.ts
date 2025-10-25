import { NextResponse } from 'next/server';

// This would typically fetch from a database
// For now, we'll import the mock data from the navigation endpoint
const mockGroups = [
  {
    id: 'newborn-group',
    label: 'NEWBORN (0-3M)',
    slug: 'newborn',
    description: 'Products for newborns',
    image: 'https://placehold.co/600/FF69B4/FFFFFF.png',
    imageAlt: 'Newborn Products 0-3 Months',
    ageGroup: 'newborn',
    isActive: true,
    sortOrder: 1,
    displayOptions: {
      showInNavbar: true,
      navbarLabel: 'NEWBORN (0-3M)',
      promotionalText: 'Welcome your little miracle',
    },
    sections: [
      {
        id: 'newborn-clothing',
        heading: 'Clothing',
        description: 'Soft and comfortable clothing for newborns',
        sortOrder: 1,
        categories: [
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
        ],
      },
    ],
  },
  // Add other groups as needed
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const groupId = params.id;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const group = mockGroups.find(g => g.id === groupId);
    
    if (!group) {
      return NextResponse.json(
        { error: 'Menu group not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(group);
  } catch (error) {
    console.error('Error fetching menu group:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu group' },
      { status: 500 }
    );
  }
} 