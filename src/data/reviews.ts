import { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 2,
      username: "jane_doe",
      email: "jane@example.com",
      role: "customer",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    product: 101,
    rating: 5,
    comment: "Absolutely love this! The quality is amazing and my baby looks adorable.",
    created_at: "2024-06-01T10:00:00Z",
  },
  {
    id: 2,
    user: {
      id: 3,
      username: "john_smith",
      email: "john@example.com",
      role: "customer",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    product: 101,
    rating: 4,
    comment: "Very comfortable and soft material. Would recommend!",
    created_at: "2024-06-02T12:30:00Z",
  },
  {
    id: 3,
    user: {
      id: 4,
      username: "emma_brown",
      email: "emma@example.com",
      role: "customer",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    product: 102,
    rating: 5,
    comment: "Perfect fit and great value for money.",
    created_at: "2024-06-03T09:15:00Z",
  },
]; 