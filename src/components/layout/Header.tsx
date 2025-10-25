"use client";

import Link from "next/link";

export default function Header({ onSearchClick, searchOpen, searchIcon, onCartClick, onWishlistClick, onLoginClick }: {
  onSearchClick?: () => void;
  searchOpen?: boolean;
  searchIcon?: React.ReactNode;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onLoginClick?: () => void;
}) {
  return (
    <header className="w-full bg-white border-b border-gray-400 flex items-center justify-between px-4 md:px-8 h-14 relative z-50">
      {/* Left spacer for symmetry */}
      <div className="flex-1 flex items-center justify-start min-w-0" />
      {/* Centered Logo */}
      <div className="flex-1 flex items-center justify-center min-w-0">
        <Link href="/" className="text-3xl font-extrabold tracking-widest text-gray-900 select-none">NEXTJS-ECOM</Link>
      </div>
      {/* Right Icons */}
      <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
        <button
          className="p-1 hover:text-primary"
          aria-label={searchOpen ? "Close search" : "Open search"}
          onClick={onSearchClick}
        >
          {searchIcon}
        </button>
        <button
          className="relative p-1 hover:text-primary cursor-pointer"
          aria-label="Open wishlist"
          onClick={onWishlistClick}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-.5.5-.5-.5a5.5 5.5 0 0 0-7.8 7.8l.5.5L12 21.3l7.3-8.4.5-.5a5.5 5.5 0 0 0 0-7.8z"/></svg>
          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white text-[10px] rounded-full px-1">0</span>
        </button>
        <button
          className="relative p-1 hover:text-primary cursor-pointer"
          aria-label="Open login"
          onClick={onLoginClick}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
        </button>
        <button
          className="relative p-1 hover:text-primary cursor-pointer"
          aria-label="Open cart"
          onClick={onCartClick}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white text-[10px] rounded-full px-1">0</span>
        </button>
      </div>
    </header>
  );
} 