import * as React from "react";

export interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: "info" | "success" | "error" | "warning";
  className?: string;
}

const variantClasses = {
  info: "bg-blue-50 text-blue-800 border-blue-200",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  error: "bg-red-50 text-red-800 border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
};

export function Alert({ title, children, variant = "info", className }: AlertProps) {
  return (
    <div
      className={`border-l-4 p-4 sm:p-6 rounded-lg ${variantClasses[variant]} ${className || ""}`}
      role="alert"
    >
      {title && (
        <div className="font-semibold mb-2">{title}</div>
      )}
      <div className="text-sm sm:text-base">{children}</div>
    </div>
  );
} 