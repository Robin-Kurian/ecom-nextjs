"use client";

import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";

interface OffersProductGridProps {
  flashSales: Product[];
  bundles: Product[];
  clearance: Product[];
  regularOffers: Product[];
}

export default function OffersProductGrid({ flashSales, bundles, clearance, regularOffers }: OffersProductGridProps) {
  return (
    <>
      {/* Flash Sales Section */}
      {flashSales.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg mr-4">
              ⚡ FLASH SALE
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Up to {Math.max(...flashSales.map(p => p.offer?.discount || 0))}% Off
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {flashSales.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Bundle Deals Section */}
      {bundles.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-lg mr-4">
              📦 BUNDLES
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Bundle & Save More
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bundles.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Clearance Section */}
      {clearance.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-lg mr-4">
              🏷️ CLEARANCE
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Final Markdowns
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {clearance.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Regular Offers Section */}
      {regularOffers.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-lg mr-4">
              💰 DEALS
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Special Discounts
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </>
  );
} 