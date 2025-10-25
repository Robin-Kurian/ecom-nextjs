import { carouselSlides } from "@/data/carousel";
import { CarouselSlide } from "@/types/carousel";
 
export function getCarouselSlides(): Promise<CarouselSlide[]> {
  return Promise.resolve(carouselSlides);
} 