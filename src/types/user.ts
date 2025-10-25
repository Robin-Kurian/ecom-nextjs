// User types for e-commerce

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "customer";
  avatar?: string;
} 