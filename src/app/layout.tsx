// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "Ecom Next.js",
  description: "A modern e-commerce platform built with Next.js, Tailwind, and Django DRF backend.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
