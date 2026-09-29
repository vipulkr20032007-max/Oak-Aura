import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Sparkles } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No handcrafted furniture found matching your criteria.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] flex flex-col items-center justify-center max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-[#EFE4D6] flex items-center justify-center text-[#88624C] mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-medium text-[#231710] mb-2">
          No Pieces Found
        </h3>
        <p className="text-sm text-[#736E69] leading-relaxed mb-6">
          {emptyMessage} Try adjusting your price filters, selecting a different wood species, or clearing search keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
