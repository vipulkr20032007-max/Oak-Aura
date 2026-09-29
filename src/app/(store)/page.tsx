import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PromotionalBanner } from "@/components/home/PromotionalBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedCategories />
      <FeaturedProductsSection />
      <WhyChooseUs />
      <PromotionalBanner />
      <TestimonialsSection />
    </div>
  );
}
