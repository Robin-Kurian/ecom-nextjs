import * as React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

export interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  className?: string;
}

export function StarRating({ value, onChange, max = 5, readOnly, className }: StarRatingProps) {
  return (
    <div className={"flex items-center gap-1 " + (className || "")}
      aria-label={`Rating: ${value} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type="button"
          className={
            "p-0 bg-transparent border-none focus:outline-none " +
            (i < value ? "text-yellow-400" : "text-gray-300")
          }
          onClick={() => onChange && !readOnly && onChange(i + 1)}
          disabled={readOnly}
          aria-label={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
        >
          <StarIcon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
} 