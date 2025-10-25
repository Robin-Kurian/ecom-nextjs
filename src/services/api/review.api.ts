import { reviews } from "@/data/reviews";
import { Review } from "@/types";

export function getReviewsByProduct(productId: number | string): Promise<Review[]> {
  return Promise.resolve(reviews.filter(r => r.product === Number(productId)));
} 