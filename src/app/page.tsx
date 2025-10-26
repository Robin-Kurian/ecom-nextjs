"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getCarouselSlides } from "@/services/api/carousel.api";
import { CarouselSlide } from "@/types/carousel";
import { getAllProducts } from "@/services/api/product.api";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getCarouselSlides().then(setSlides);
    getAllProducts().then((products) => {
      const arrivals = products
        .filter((p) => p.newArrival)
        .sort((a, b) => (b.updatedAt && a.updatedAt ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime() : 0))
        .slice(0, 4);
      setNewArrivals(arrivals);
    });
  }, []);

  const prev = () => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  };
  const next = () => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      // next();
      setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
    }, 4000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current, slides.length]);

  return (
    <div className="w-full">
      {/* Hero Carousel */}
      <div className="relative w-full aspect-[3/1] bg-gray-200 overflow-hidden">
        {slides.map((slide, idx) => (
          <Image
            key={slide.img}
            src={slide.img}
            alt={slide.alt}
            fill
            className={`object-cover transition-all duration-500 ${idx === current ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 z-0 translate-x-4'}`}
            style={{ pointerEvents: idx === current ? 'auto' : 'none' }}
          />
        ))}
        
        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-black/70 transition z-20"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-3 hover:bg-black/70 transition z-20"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>
        
        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-200 ${idx === current ? "bg-white" : "bg-white/50"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* New Arrivals Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-12">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">New Arrivals</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the latest in baby fashion & care essentials
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center pt-8">
              <a 
                href="/products" 
                className="inline-flex items-center px-8 py-3 bg-primary text-gray-700 font-semibold rounded-lg hover:bg-blue-400 hover:text-white transition-colors shadow-lg hover:shadow-xl"
              >
                Shop All Baby Products
                <FiChevronRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Safe & Certified</h3>
              <p className="text-gray-600">All products meet safety standards and are certified for baby use</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Quality Assured</h3>
              <p className="text-gray-600">Premium quality products that parents trust</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
