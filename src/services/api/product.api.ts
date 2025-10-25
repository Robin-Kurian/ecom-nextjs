import { products } from "@/data/products";
import { Product } from "@/types/product";

export function getAllProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

export function getProductById(id: number | string): Promise<Product | undefined> {
  return Promise.resolve(products.find(p => p.id === Number(id)));
}

export function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return Promise.resolve([]);
  const q = query.toLowerCase();
  return Promise.resolve(
    products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  );
} 