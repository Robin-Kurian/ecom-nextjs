import { Product } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

export function ProductCard({ product, className = "", style = {}, fadeInDelay = 0 }: { product: Product, className?: string, style?: React.CSSProperties, fadeInDelay?: number }) {
  // Prevent overlay button clicks from triggering card link
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Card
      className={`p-0 flex flex-col h-full group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-primary/20 cursor-pointer ${className}`}
      style={{ ...style, animationDelay: style.animationDelay || `${fadeInDelay}ms` }}
    >
      <Link href={`/product/${product.id}`} className="flex flex-col h-full" tabIndex={-1}>
        {/* Image wrapper with fixed aspect ratio (4:5) */}
        <div className="w-full aspect-[4/5] bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.offer && (
            <div className="absolute top-2 left-2 z-10">
              <Badge color="success" className="text-xs px-2 py-1">
                {product.offer.title}
              </Badge>
            </div>
          )}
          {/* Quick action overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-3">
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary transition-colors cursor-pointer" onClick={stopPropagation}>
                <FiHeart size={14} className="text-primary" />
              </button>
              <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary transition-colors cursor-pointer" onClick={stopPropagation}>
                <FiShoppingCart size={14} className="text-primary" />
              </button>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="text-lg sm:text-xl font-bold text-primary">₹{product.price}</div>
              {product.offer && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{Math.round(product.price / (1 - product.offer.discount / 100))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex items-center gap-1">
              <StarRating value={product.rating} readOnly className="scale-75 sm:scale-90" />
              <span className="text-xs text-gray-500">({product.num_reviews})</span>
            </div>
            <div className="text-xs text-gray-500">
              {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
} 