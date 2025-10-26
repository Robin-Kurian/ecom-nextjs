import { Product } from "@/types/product";
import { apiClient } from "./base";

/**
 * Product API functions that fetch from database via API routes
 */
export async function getAllProducts(): Promise<Product[]> {
  const products = await apiClient.get<Product[]>('/products');
  return Array.isArray(products) ? products : [];
}

export async function getProductById(id: number | string): Promise<Product | undefined> {
  const products = await apiClient.get<Product[]>(`/products?id=${id}`);
  return Array.isArray(products) ? products.find(p => p.id === Number(id)) : undefined;
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return [];
  const products = await apiClient.get<Product[]>(`/products?search=${encodeURIComponent(query)}`);
  return Array.isArray(products) ? products : [];
} 