import { Metadata } from "next";
import { getAllProducts } from "@/services/api/product.api";
import OffersProductGrid from "./OffersProductGrid";

export const metadata: Metadata = {
  title: "Special Offers & Deals | NEXTJS-ECOM",
  description: "Discover amazing deals and special offers on baby products. Limited time discounts, bundles, and clearance items.",
};

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  // Fetch products from database
  const products = await getAllProducts();

  // Filter products that have offers or are in the offers category
  const offerProducts = products.filter(product => 
    product.category === "offers" || product.offer !== null
  );

  // Separate different types of offers
  const flashSales = offerProducts.filter(p => 
    p.offer && p.offer.discount >= 40
  );
  
  const bundles = offerProducts.filter(p => 
    p.name.toLowerCase().includes("bundle") || 
    p.name.toLowerCase().includes("pack")
  );
  
  const clearance = offerProducts.filter(p => 
    p.name.toLowerCase().includes("clearance") ||
    (p.offer && p.offer.discount >= 30 && !flashSales.includes(p) && !bundles.includes(p))
  );
  
  const regularOffers = offerProducts.filter(p => 
    !flashSales.includes(p) && !bundles.includes(p) && !clearance.includes(p)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🔥 Special Offers & Deals
          </h1>
          <p className="text-xl md:text-2xl mb-6 opacity-90">
            Save big on premium baby products with our exclusive deals
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <span className="bg-white/20 px-4 py-2 rounded-full">✨ Limited Time</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">📦 Bundle Deals</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🏷️ Clearance Sale</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <OffersProductGrid
          flashSales={flashSales}
          bundles={bundles}
          clearance={clearance}
          regularOffers={regularOffers}
        />

        {/* Empty State */}
        {offerProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Active Offers
            </h3>
            <p className="text-gray-600 mb-8">
              Check back soon for amazing deals and special promotions!
            </p>
            <a
              href="/products"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Browse All Products
            </a>
          </div>
        )}

        {/* Newsletter Signup */}
        <section className="bg-gray-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Never Miss a Deal! 📧
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get notified about flash sales, exclusive offers, and new arrivals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
} 