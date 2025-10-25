import { apiClient } from './base';
import type { Product } from '@/types/product';

export const getOffers = async (): Promise<Product[]> => {
  const response = await apiClient.get('/offers');
  return response.data as Product[];
}; 