"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { RatingStars } from "@/components/common/RatingStars";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { QuickViewModal } from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1600);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const isLiked = isInWishlist(product.id);

  return (
    <>
      <div className="group relative flex flex-col bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#D8CEBF]">
        
        {/* Image Container with Badges & Hover Overlays */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFEB]">
          <Link href={`/shop/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.mainImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>

          {/* Badges: Best Seller, New, Material */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.isBestSeller && (
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#231710] text-[#FAF8F5] shadow-xs">
                Best Seller
              </span>
            )}
            {product.isNewArrival && !product.isBestSeller && (
              <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#266E56] text-[#FAF8F5] shadow-xs">
                New Arrival
              </span>
            )}
            <span className="text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs text-[#413D3A] border border-[#EAE3D9]">
              {product.material}
            </span>
          </div>

          {/* Top-Right Action: Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-xs ${
              isLiked
                ? "bg-[#88624C] text-[#FAF8F5]"
                : "bg-[#FFFFFF]/90 text-[#413D3A] hover:bg-[#FFFFFF] hover:text-[#C2410C]"
            }`}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>

          {/* Bottom Floating Hover Actions */}
          <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              onClick={handleQuickView}
              className="flex-1 py-2 px-3 rounded-lg bg-[#FFFFFF]/95 backdrop-blur-md text-[#231710] hover:bg-[#FFFFFF] text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-colors border border-[#EAE3D9]"
            >
              <Eye className="w-3.5 h-3.5 text-[#88624C]" />
              <span>Quick View</span>
            </button>
            <button
              onClick={handleAddToCart}
              className={`p-2 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center ${
                isAddedFeedback
                  ? "bg-[#266E56] text-[#FAF8F5]"
                  : "bg-[#231710] text-[#FAF8F5] hover:bg-[#332218]"
              }`}
              aria-label="Add to cart"
            >
              {isAddedFeedback ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Card Content & Details */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#88624C]">
                {product.category}
              </span>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
            </div>

            <Link href={`/shop/${product.slug}`} className="block">
              <h3 className="font-serif text-lg font-medium text-[#231710] hover:text-[#88624C] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-[#736E69] line-clamp-1 mt-1">
              {product.tagline}
            </p>
          </div>

          <div className="pt-2 border-t border-[#F4EFEB] flex items-center justify-between">
            <PriceDisplay price={product.price} oldPrice={product.oldPrice} size="md" />

            {/* Subtle Color Swatches preview */}
            <div className="flex items-center gap-1">
              {product.colors.map((color) => (
                <span
                  key={color.name}
                  className="w-2.5 h-2.5 rounded-full border border-[#D8CEBF]"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal instance */}
      {isQuickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}
