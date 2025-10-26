import { sql } from "./index";
import { Product } from "@/types/product";

/**
 * Database query functions for ecom-nextjs
 * All queries handle database connection failures gracefully
 */

// Check if database is available
export function isDbAvailable(): boolean {
  return sql !== null;
}

// Products queries
export async function getAllProducts(): Promise<Product[]> {
  if (!sql) return [];
  
  try {
    const products = await sql`
      SELECT 
        p.*,
        o.title as offer_title,
        o.discount as offer_discount,
        o.description as offer_description
      FROM products p
      LEFT JOIN offers o ON p.offer_id = o.id AND o.active = true
      ORDER BY p.created_at DESC
    `;
    return (products as Array<{
      id: number;
      name: string;
      description: string | null;
      price: number;
      image: string;
      category: string;
      stock: number;
      rating: number | null;
      num_reviews: number;
      offer_title: string | null;
      offer_discount: number | null;
      offer_description: string | null;
      new_arrival: boolean;
      updated_at: Date | null;
    }>).map(formatProduct);
  } catch {
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | undefined> {
  if (!sql) return undefined;
  
  try {
    const [product] = await sql`
      SELECT 
        p.*,
        o.title as offer_title,
        o.discount as offer_discount,
        o.description as offer_description
      FROM products p
      LEFT JOIN offers o ON p.offer_id = o.id AND o.active = true
      WHERE p.id = ${id}
    `;
    return product ? formatProduct(product as {
      id: number;
      name: string;
      description: string | null;
      price: number;
      image: string;
      category: string;
      stock: number;
      rating: number | null;
      num_reviews: number;
      offer_title: string | null;
      offer_discount: number | null;
      offer_description: string | null;
      new_arrival: boolean;
      updated_at: Date | null;
    }) : undefined;
  } catch {
    return undefined;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!sql) return [];
  
  try {
    const searchTerm = `%${query}%`;
    const products = await sql`
      SELECT 
        p.*,
        o.title as offer_title,
        o.discount as offer_discount,
        o.description as offer_description
      FROM products p
      LEFT JOIN offers o ON p.offer_id = o.id AND o.active = true
      WHERE p.name ILIKE ${searchTerm} OR p.description ILIKE ${searchTerm}
      ORDER BY p.created_at DESC
    `;
    return (products as Array<{
      id: number;
      name: string;
      description: string | null;
      price: number;
      image: string;
      category: string;
      stock: number;
      rating: number | null;
      num_reviews: number;
      offer_title: string | null;
      offer_discount: number | null;
      offer_description: string | null;
      new_arrival: boolean;
      updated_at: Date | null;
    }>).map(formatProduct);
  } catch {
    return [];
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (!sql) return [];
  
  try {
    const products = await sql`
      SELECT 
        p.*,
        o.title as offer_title,
        o.discount as offer_discount,
        o.description as offer_description
      FROM products p
      LEFT JOIN offers o ON p.offer_id = o.id AND o.active = true
      WHERE p.category = ${category}
      ORDER BY p.created_at DESC
    `;
    return (products as Array<{
      id: number;
      name: string;
      description: string | null;
      price: number;
      image: string;
      category: string;
      stock: number;
      rating: number | null;
      num_reviews: number;
      offer_title: string | null;
      offer_discount: number | null;
      offer_description: string | null;
      new_arrival: boolean;
      updated_at: Date | null;
    }>).map(formatProduct);
  } catch {
    return [];
  }
}

export async function getNewArrivals(limit: number = 4): Promise<Product[]> {
  if (!sql) return [];
  
  try {
    const products = await sql`
      SELECT 
        p.*,
        o.title as offer_title,
        o.discount as offer_discount,
        o.description as offer_description
      FROM products p
      LEFT JOIN offers o ON p.offer_id = o.id AND o.active = true
      WHERE p.new_arrival = true
      ORDER BY p.updated_at DESC
      LIMIT ${limit}
    `;
    return products.map(formatProduct);
  } catch {
    return [];
  }
}

// Helper function to format product from database row
function formatProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as number,
    name: row.name as string,
    description: (row.description as string) || "",
    price: Number(row.price),
    image: row.image as string,
    category: row.category as string,
    stock: row.stock as number,
    rating: Number(row.rating || 0),
    num_reviews: row.num_reviews as number || 0,
    offer: row.offer_title ? {
      id: 1,
      title: row.offer_title as string,
      discount: row.offer_discount as number || 0,
      description: row.offer_description as string
    } : null,
    newArrival: row.new_arrival as boolean || false,
    updatedAt: (row.updated_at as Date)?.toISOString()
  };
}

