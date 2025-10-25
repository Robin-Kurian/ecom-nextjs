"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/api/product.api";
import { getReviewsByProduct } from "@/services/api/review.api";
import { Product } from "@/types/product";
import { Review } from "@/types";
import { Loader } from "@/components/ui/Loader";
import { Alert } from "@/components/ui/Alert";
import { StarRating } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import PageContainer from "@/components/layout/PageContainer";
import Image from "next/image";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getProductById(id),
      getReviewsByProduct(id),
    ])
      .then(([prod, revs]) => {
        setProduct(prod || null);
        setReviews(revs);
      })
      .catch(() => setError("Failed to load product details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <PageContainer>
      <div className="flex justify-center py-8">
        <div className="text-center space-y-4">
          <Loader className="w-8 h-8" />
          <p className="text-gray-500">Loading baby product details...</p>
        </div>
      </div>
    </PageContainer>
  );
  
  if (error) return (
    <PageContainer>
      <div className="flex justify-center py-8">
        <Alert variant="error">{error}</Alert>
      </div>
    </PageContainer>
  );
  
  if (!product) return (
    <PageContainer>
      <div className="flex justify-center py-8">
        <Alert variant="error">Product not found.</Alert>
      </div>
    </PageContainer>
  );

  return (
    <PageContainer>
      <div className="space-y-6 lg:space-y-8">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.offer && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.offer.title}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-5">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-3">
                <div className="text-2xl sm:text-3xl font-bold text-primary">₹{product.price}</div>
                {product.offer && (
                  <div className="text-lg text-gray-500 line-through">
                    ₹{Math.round(product.price / (1 - product.offer.discount / 100))}
                  </div>
                )}
      </div>
              
              <div className="flex items-center gap-3">
          <StarRating value={product.rating} readOnly />
          <span className="text-sm text-gray-500">({product.num_reviews} reviews)</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">SKU: {product.id}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">Availability:</span>
                  <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
      </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">Category:</span>
                  <span className="text-sm text-gray-600 capitalize">{product.category}</span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button 
                  disabled={product.stock === 0}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="flex-1 sm:flex-none"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Add to Wishlist
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="flex-1 sm:flex-none"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 pt-6 lg:pt-8">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Reviews</h2>
              <span className="text-sm text-gray-500">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="text-gray-500 mb-2">No reviews yet</div>
                <p className="text-sm text-gray-400">Be the first to review this baby product!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <StarRating value={review.rating} readOnly />
                          <span className="font-medium text-gray-900">{review.user.username}</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-gray-700 leading-relaxed">{review.comment}</div>
                    </div>
                  </div>
                ))}
          </div>
        )}
      </div>
    </div>
      </div>
    </PageContainer>
  );
} 