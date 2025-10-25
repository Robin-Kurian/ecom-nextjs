import * as React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
}

export function Avatar({ src, alt, name, className }: AvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";
  return (
    <div
      className={
        "inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold overflow-hidden " +
        (className || "")
      }
      style={{ width: 40, height: 40 }}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
} 