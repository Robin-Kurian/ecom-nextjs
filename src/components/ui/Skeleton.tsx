import * as React from "react";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ width = "100%", height = 20, className }: SkeletonProps) {
  return (
    <div
      className={
        `bg-gray-200 animate-pulse rounded ${className || ""}`
      }
      style={{ width, height }}
    />
  );
} 