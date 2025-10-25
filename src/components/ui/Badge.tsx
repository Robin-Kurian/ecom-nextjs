import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "default" | "success" | "warning" | "danger";
  children: React.ReactNode;
}

const colorClasses = {
  default: "bg-gray-100 text-gray-800",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
};

export function Badge({ color = "default", children, className, ...props }: BadgeProps) {
  return (
    <span
      className={
        `inline-block px-2 py-0.5 rounded text-xs font-semibold ${colorClasses[color]} ` +
        (className || "")
      }
      {...props}
    >
      {children}
    </span>
  );
} 