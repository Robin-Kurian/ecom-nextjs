"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getNavbarGroups, MenuGroup } from "@/services/api/menu.api";
import { usePathname } from 'next/navigation';

type CategoryItem = {
  label: string;
  href: string;
  subcategories: { label: string; href: string }[];
  megaMenu?: MenuGroup;
};

const staticCategories: CategoryItem[] = [
  { label: "ALL PRODUCTS", href: "/products", subcategories: [] },
  { label: "OFFERS", href: "/offers", subcategories: [] },
  { label: "TRACK ORDER", href: "/track-order", subcategories: [] },
];

export default function NavBar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCat, setMobileCat] = useState<number | null>(null);
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const groups = await getNavbarGroups();
        setMenuGroups(groups);
      } catch (error) {
        console.error('Failed to load menu data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Compose categories for nav: static + dynamic menu groups  
  const dynamicCategories: CategoryItem[] = menuGroups.map((group) => ({
    label: group.displayOptions?.navbarLabel || group.label,
    href: `/products?cat=${group.slug}`,
    megaMenu: group,
    subcategories: [],
  }));

  const categories: CategoryItem[] = [
    ...staticCategories.slice(0, 1), // ALL PRODUCTS
    ...dynamicCategories,
    ...staticCategories.slice(1),
  ];

  // Find index of static nav items that should be highlighted
  const staticActiveIndex = categories.findIndex(cat => {
    if (cat.label === 'OFFERS' && pathname.startsWith('/offers')) return true;
    if (cat.label === 'TRACK ORDER' && pathname.startsWith('/track-order')) return true;
    return false;
  });

  const currentCat = openIndex !== null ? categories[openIndex] : null;
  const hasDropdown = currentCat && (currentCat.megaMenu || currentCat.subcategories.length > 0);

  // Handle hover with delay to prevent glitch
  const handleMouseEnter = (idx: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    
    // If switching to a different category, trigger content transition
    if (openIndex !== null && openIndex !== idx) {
      setContentKey(prev => prev + 1);
    }
    
    setIsClosing(false);
    setOpenIndex(idx);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setOpenIndex(null);
        setIsClosing(false);
      }, 300); // Match the exit animation duration
    }, 200);
  };

  // Handle category click to close dropdown
  const handleCategoryClick = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenIndex(null);
      setIsClosing(false);
    }, 300);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <nav className="w-full bg-white sticky top-0 z-30">
        <div className="hidden md:flex items-center justify-center gap-2 h-11">
          <div className="animate-pulse flex space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-20"></div>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-white sticky top-0 z-30">
      {/* Desktop Nav */}
      <div
        className="relative"
        onMouseEnter={() => {
          if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
          }
        }}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hidden md:flex items-center justify-center gap-2 h-11">
          {categories.map((cat, idx) => (
            <div
              key={cat.label}
              className={`relative h-full flex items-center group${(staticActiveIndex === idx) ? ' bg-blue-50 text-primary font-bold' : ''}`}
              onMouseEnter={() => handleMouseEnter(idx)}
            >
              <Link 
                href={cat.href} 
                className={`px-3 py-2 font-medium text-sm transition-all duration-300 rounded-md hover:bg-blue-50 relative${(staticActiveIndex === idx) ? ' text-primary' : ' text-gray-700 hover:text-primary'}`}
              >
                {cat.label}
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full${(staticActiveIndex === idx) ? ' w-full' : ''}`}></div>
              </Link>
            </div>
          ))}
        </div>
        {/* Enhanced Mega Menu Dropdown for Toys & Play */}
        <div
          className={`absolute left-0 top-full w-full z-40 transition-all duration-500 ease-out
            ${openIndex !== null && hasDropdown && !isClosing ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}
          `}
        >
          {currentCat && hasDropdown && !isClosing && (
            <div 
              key={`${openIndex}-${contentKey}`} 
              className="bg-white shadow-xl border-t border-gray-100 rounded-b-xl py-6 px-8 min-h-[280px] flex flex-col mega-menu-container content-crossfade"
            >
              {currentCat.megaMenu ? (
                <div className="flex gap-8 max-w-6xl mx-auto w-full">
                  {/* Left: Image and category info */}
                  <div className="flex flex-col items-center min-w-[200px] animate-slide-in-left">
                    <div className="relative overflow-hidden rounded-xl mb-3 group">
                      <Image
                        src={currentCat.megaMenu.image}
                        alt={currentCat.megaMenu.imageAlt}
                        width={160}
                        height={200}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <span className="font-bold text-lg text-gray-900 text-center animate-fade-in-delayed">{currentCat.label}</span>
                    <span className="text-sm text-gray-500 mt-1 animate-fade-in-delayed-2">{currentCat.megaMenu.displayOptions?.promotionalText || "Perfect for your little one"}</span>
                  </div>
                  
                  {/* Right: Sections */}
                  <div className="flex-1 grid grid-cols-3 gap-8 animate-slide-in-right">
                    {currentCat.megaMenu.sections.map((section, sectionIndex) => (
                      <div key={section.heading} className="space-y-3 animate-fade-in-staggered" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
                        <div className="font-bold text-lg text-primary border-b border-gray-200 pb-2">
                          {section.heading}
                        </div>
                        <ul className="space-y-2">
                          {section.categories.map((category, categoryIndex) => (
                            <li key={category.id} className="relative animate-fade-in-staggered" style={{ animationDelay: `${(sectionIndex * 100) + (categoryIndex * 50)}ms` }}>
                              <Link 
                                href={`/products?cat=${category.slug}`}
                                onClick={handleCategoryClick}
                                className="text-gray-700 hover:text-primary text-sm transition-all duration-300 flex items-center group hover:translate-x-1"
                              >
                                <span className="transition-all duration-300 group-hover:translate-x-1">
                                  {category.name}
                                  {category.promotionalBadge && (
                                    <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full transition-all duration-300 group-hover:bg-red-200 group-hover:scale-105">
                                      {category.promotionalBadge}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto w-full animate-fade-in">
                  <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-1 animate-slide-in-left">
                      <div className="font-bold text-lg text-primary mb-4">{currentCat.label}</div>
                      <p className="text-sm text-gray-600">Everything your baby needs</p>
                    </div>
                    <div className="col-span-3 animate-slide-in-right">
                      <div className="grid grid-cols-3 gap-6">
                        {currentCat.subcategories.map((sub, index) => (
                          <Link 
                            key={sub.label} 
                            href={sub.href} 
                            onClick={handleCategoryClick}
                            className="text-gray-700 hover:text-primary text-sm transition-all duration-300 p-2 rounded-md hover:bg-blue-50 hover:translate-x-1 animate-fade-in-staggered"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Nav */}
      <div className="md:hidden flex flex-col">
        <button
          className="flex items-center justify-between px-4 py-3 border-b text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span>BABY SHOP MENU</span>
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {mobileOpen && (
          <div className="flex flex-col bg-white border-b shadow-lg">
            {categories.map((cat, idx) => (
              <div key={cat.label} className="border-b border-gray-100 last:border-b-0">
                <button
                  className="w-full text-left px-4 py-3 font-medium text-gray-900 flex items-center justify-between hover:bg-blue-50 transition-colors"
                  onClick={() => setMobileCat(mobileCat === idx ? null : idx)}
                >
                  <span>{cat.label}</span>
                  {(cat.subcategories.length > 0 || cat.megaMenu) && (
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${mobileCat === idx ? 'rotate-90' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
                
                {(cat.subcategories.length > 0 || cat.megaMenu) && mobileCat === idx && (
                  <div className="flex flex-col bg-gray-50 border-t border-gray-100">
                                            {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => {
                              setTimeout(() => {
                                setMobileOpen(false);
                                setMobileCat(null);
                              }, 150);
                            }}
                            className="block px-8 py-3 text-gray-700 hover:bg-blue-100 text-sm transition-all duration-300 border-b border-gray-100 last:border-b-0"
                          >
                            {sub.label}
                          </Link>
                        ))}
                    {cat.megaMenu && cat.megaMenu.sections.map((section) => (
                      <div key={section.heading}>
                        <div className="px-8 py-2 font-semibold text-primary text-sm bg-blue-100">
                          {section.heading}
                        </div>
                        {section.categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/products?cat=${category.slug}`}
                            onClick={() => {
                              setTimeout(() => {
                                setMobileOpen(false);
                                setMobileCat(null);
                              }, 150);
                            }}
                            className="block px-12 py-2 text-gray-700 hover:bg-blue-100 text-sm transition-all duration-300"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
} 