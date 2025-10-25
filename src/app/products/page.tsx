"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { getAllProducts } from "@/services/api/product.api";
import { Loader } from "@/components/ui/Loader";
import { Dropdown } from "@/components/ui/Dropdown";
import { Alert } from "@/components/ui/Alert";
import { ProductCard } from "@/components/ProductCard";
import PageContainer from "@/components/layout/PageContainer";

const sortOptions = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState(sortOptions[0].value);
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((data) => {
        let filtered = [...data];
        if (category) {
          filtered = filtered.filter(product => product.category.includes(category));
        }
        if (sort === "price_asc") filtered.sort((a, b) => a.price - b.price);
        else if (sort === "price_desc") filtered.sort((a, b) => b.price - a.price);
        else if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
        setProducts(filtered);
      })
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, [sort, category]);

  const validSort = sortOptions.some(opt => opt.value === sort) ? sort : sortOptions[0].value;

  return (
    <PageContainer>
      <div className="space-y-2">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 transition-all duration-300">
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Products'}
            </h1>
            {!loading && !error && (
              <div className="text-sm text-gray-500 transition-all duration-300 mt-2">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
                {category && ` in category "${category}"`}
              </div>
            )}
          </div>
          <div className="w-full sm:w-auto">
            <Dropdown
              label="Sort by"
              options={sortOptions}
              value={validSort}
              onChange={setSort}
            />
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8" />
          </div>
        )}
        {error && (
          <div className="py-4">
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="space-y-6">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className="card-appear"
                    style={{ animationDelay: `${index * 120}ms` }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                    <p className="text-gray-500 mt-1">Try a different category or browse all products</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
} 