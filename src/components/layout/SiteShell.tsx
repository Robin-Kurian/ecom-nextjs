"use client";

import React from "react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import SearchOverlay from "@/components/layout/SearchOverlay";
import SidebarDrawer from "@/components/layout/SidebarDrawer";
import UserProvider from "@/components/UserProvider";
import { FiSearch, FiX } from "react-icons/fi";
import { useSidebarStore } from "@/components/layout/sidebarStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function CartSidebarContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
        <p className="text-gray-600">Manage your shopping cart and checkout</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <div className="text-gray-500 mb-4">Your cart is empty</div>
        <p className="text-sm text-gray-400">Add some products to get started</p>
      </div>
      
      <div className="space-y-4">
        <Button className="w-full" disabled>
          Checkout
        </Button>
        <Button variant="outline" className="w-full">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

function WishlistSidebarContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Your Wishlist</h2>
        <p className="text-gray-600">Save items for later purchase</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <div className="text-gray-500 mb-4">Your wishlist is empty</div>
        <p className="text-sm text-gray-400">Start adding items you love</p>
      </div>
      
      <Button variant="outline" className="w-full">
        Browse Products
      </Button>
    </div>
  );
}

function LoginSidebarContent({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your account</p>
      </div>
      
      <form className="space-y-4">
        <Input 
          label="Email" 
          type="email" 
          name="email" 
          required 
          autoComplete="username"
          placeholder="Enter your email"
        />
        <Input 
          label="Password" 
          type="password" 
          name="password" 
          required 
          autoComplete="current-password"
          placeholder="Enter your password"
        />
        <Button type="submit" className="w-full" variant="outline" size="lg">
          Sign In
        </Button>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <button 
            className="text-primary hover:text-blue-700 font-medium underline" 
            onClick={onSwitch} 
            type="button"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

function SignupSidebarContent({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600">Join us and start shopping</p>
      </div>
      
      <form className="space-y-4">
        <Input 
          label="Username" 
          name="username" 
          required 
          autoComplete="username"
          placeholder="Choose a username"
        />
        <Input 
          label="Email" 
          type="email" 
          name="email" 
          required 
          autoComplete="email"
          placeholder="Enter your email"
        />
        <Input 
          label="Password" 
          type="password" 
          name="password" 
          required 
          autoComplete="new-password"
          placeholder="Create a password"
        />
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            className="text-primary hover:text-blue-700 font-medium underline" 
            onClick={onSwitch} 
            type="button"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [showSearch, setShowSearch] = React.useState(false);
  const { open, mode, openSidebar, closeSidebar, switchSidebar } = useSidebarStore();

  // Handler for the search icon in the header
  const handleSearchClick = () => setShowSearch((v) => !v);

  return (
    <>
      <TopBar />
      <Header
        onSearchClick={handleSearchClick}
        searchOpen={showSearch}
        searchIcon={showSearch ? <FiX size={20} className="cursor-pointer" /> : <FiSearch size={20} className="cursor-pointer" />}
        onCartClick={() => openSidebar('cart')}
        onWishlistClick={() => openSidebar('wishlist')}
        onLoginClick={() => openSidebar('login')}
      />
      <NavBar />
      <SearchOverlay show={showSearch} onClose={() => setShowSearch(false)} />
      <SidebarDrawer open={open} onClose={closeSidebar}>
        {mode === 'cart' && <CartSidebarContent />}
        {mode === 'wishlist' && <WishlistSidebarContent />}
        {mode === 'login' && <LoginSidebarContent onSwitch={() => switchSidebar('signup')} />}
        {mode === 'signup' && <SignupSidebarContent onSwitch={() => switchSidebar('login')} />}
      </SidebarDrawer>
      <UserProvider>
        {children}
      </UserProvider>
    </>
  );
} 