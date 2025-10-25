import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export default function PageContainer({ 
  children, 
  className = "", 
  maxWidth = "2xl" 
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md", 
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 ${maxWidthClasses[maxWidth]} ${className}`}>
        {children}
      </div>
    </div>
  );
} 