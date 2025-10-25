"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { searchProducts } from "@/services/api/product.api";
import { Product } from "@/types/product";
import { Loader } from "@/components/ui/Loader";
import Image from "next/image";
import Link from "next/link";

export default function SearchOverlay({ show, onClose }: { show: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Focus input when search opens
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  // Close search on Escape key and when clicking outside
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function handleClick(e: MouseEvent) {
      if (show && searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (show) {
      window.addEventListener("keydown", handleKey);
      document.addEventListener("mousedown", handleClick);
      return () => {
        window.removeEventListener("keydown", handleKey);
        document.removeEventListener("mousedown", handleClick);
      };
    }
  }, [show, onClose]);

  // Debounced search
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setTouched(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(() => {
      searchProducts(value).then((res) => {
        setResults(res);
        setLoading(false);
      });
    }, 400);
  }, []);

  return (
    <div
      ref={searchBarRef}
      className={`sticky top-0 left-0 w-full z-50 bg-white border-b border-t border-gray-200 px-6 flex flex-col items-stretch overflow-hidden transition-all duration-300 ease-in-out
        ${show ? 'opacity-100' : 'h-0 opacity-0'}
      `}
      style={{
        maxHeight: '80vh',
        height: show ? 'auto' : '0px',
      }}
    >
      <div className="flex items-center py-3">
        <FiSearch size={20} className="text-gray-500 mr-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="SEARCH FOR..."
          className="flex-1 text-base font-medium outline-none border-none bg-transparent placeholder-gray-400"
          value={query}
          onChange={handleInput}
        />
        <button
          className="ml-4 p-2 text-xl text-gray-500 hover:text-black"
          aria-label="Close search"
          onClick={onClose}
        >
          <FiX />
        </button>
      </div>
      {/* Results Section */}
      <div className="overflow-y-auto">
        {loading && (
          <div className="flex justify-center py-8">
            <Loader className="w-6 h-6" />
          </div>
        )}
        {!loading && touched && query.trim() && results.length === 0 && (
          <div className="text-center text-gray-500 py-8">No products found for &quot;{query}&quot;</div>
        )}
        {!loading && results.length > 0 && (
          <div className="space-y-3">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors group"
                onClick={onClose}
              >
                <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-primary text-base">₹{product.price}</div>
                  {product.offer && (
                    <div className="text-sm text-gray-400 line-through">
                      ₹{Math.round(product.price / (1 - product.offer.discount / 100))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 