// User
export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "customer";
  avatar?: string;
}

// Product
export interface ProductOffer {
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
  offer?: ProductOffer | null;
  newArrival?: boolean;
  updatedAt?: string;
}

// Order
export interface Order {
  id: number;
  user: User;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  updated_at: string;
}
export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

// Review
export interface Review {
  id: number;
  user: User;
  product: number;
  rating: number;
  comment: string;
  created_at: string;
}

// Promotion Offer
export interface PromotionOffer {
  id: number;
  title: string;
  description: string;
  discount_percent: number;
  active: boolean;
  start_date: string;
  end_date: string;
}

// Auth
export interface AuthTokens {
  access: string;
  refresh: string;
} 