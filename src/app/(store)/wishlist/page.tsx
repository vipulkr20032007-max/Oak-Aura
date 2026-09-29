"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { useWishlist } from "@/context/WishlistContext";
import { formatINR } from "@/lib/utils";
import { RatingStars } from "@/components/common/RatingStars";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart, totalWishlist } = useWishlist();

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Saved Wishlist" }]} />

        <div className="py-6 border-b border-[#EAE3D9] flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight">
              Curated Wishlist
            </h1>
            <p className="text-sm text-[#736E69] mt-1">
              {totalWishlist} {totalWishlist === 1 ? "piece" : "pieces"} saved for later review
            </p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#EFE4D6] flex items-center justify-center text-[#88624C] mx-auto mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-medium text-[#231710] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-[#736E69] mb-8 leading-relaxed">
              Tap the heart icon on any piece while exploring our catalog to save it to your private portfolio.
            </p>
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-xl bg-[#231710] text-[#FAF8F5] hover:bg-[#332218] text-sm font-semibold tracking-wide shadow-md transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pt-8 pb-16">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col bg-[#FFFFFF] rounded-2xl border border-[#EAE3D9] overflow-hidden shadow-xs hover:shadow-md transition-shadow justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFEB]">
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-[#FFFFFF]/90 text-[#9C9690] hover:text-[#C2410C] backdrop-blur-xs transition-colors shadow-xs"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs text-[#231710] border border-[#EAE3D9]">
                      {product.material}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#88624C] block">
                      {product.category}
                    </span>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="font-serif text-lg font-medium text-[#231710] hover:text-[#88624C] transition-colors block line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                    <p className="font-serif text-lg font-bold text-[#231710] pt-1">
                      {formatINR(product.price)}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => moveToCart(product)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#231710] hover:bg-[#332218] text-[#FAF8F5] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Shopping Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
