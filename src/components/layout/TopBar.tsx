"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

const announcements = [
  "Looking for your wishlisted styles? We got you!",
  "To know more click <a href=\"#\" class=\"underline text-blue-200 hover:text-white transition\">here</a>",
  "Free shipping on orders over ₹999!",
  "New arrivals dropping every week. Stay tuned!",
  "Looking for your wishlisted styles? We got you!",
  "To know more click <a href=\"#\" class=\"underline text-blue-200 hover:text-white transition\">here</a>",
  "Free shipping on orders over ₹999!",
  "New arrivals dropping every week. Stay tuned!",
];

export default function TopBar() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handlePrev() {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c === 0 ? announcements.length - 1 : c - 1));
      setAnimating(false);
    }, 250);
  }
  function handleNext() {
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c) => (c === announcements.length - 1 ? 0 : c + 1));
      setAnimating(false);
    }, 250);
  }

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 5000);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [current]);

  return (
    <div className="w-full bg-black text-white text-xs md:text-sm py-0 px-4">
      <div className="grid grid-cols-3 items-center max-w-7xl mx-auto">
        {/* Left chevron - minimal spacing */}
        <div className="flex justify-end pr-0.5 sm:pr-1 md:pr-1">
          <button
            onClick={handlePrev}
            className="p-1 hover:text-blue-200 transition-colors cursor-pointer"
            aria-label="Previous announcement"
          >
            <FiChevronLeft size={18} />
          </button>
        </div>
        
        {/* Center content - maximum space */}
        <div className="flex justify-center px-1 sm:px-1 md:px-2">
          <span
            className={`truncate text-center text-xs md:text-sm transition-all duration-300 inline-block max-w-full ${animating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
            dangerouslySetInnerHTML={{ __html: announcements[current] }}
          />
        </div>
        
        {/* Right chevron - minimal spacing */}
        <div className="flex justify-start pl-0.5 sm:pl-1 md:pl-1">
          <button
            onClick={handleNext}
            className="p-1 hover:text-blue-200 transition-colors cursor-pointer"
            aria-label="Next announcement"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
} 