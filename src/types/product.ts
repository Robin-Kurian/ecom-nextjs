// Product types for e-commerce

export interface Offer {
  id: number;
  title: string;
  discount: number;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  num_reviews: number;
  offer?: Offer | null;
  newArrival?: boolean;
  updatedAt?: string;
} 