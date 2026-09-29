"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Heart, Check, Plus, Minus, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { RatingStars } from "@/components/common/RatingStars";
import { PriceDisplay } from "@/components/common/PriceDisplay";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(product.mainImage);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Default");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const isLiked = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#191716]/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Card */}
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-[#FAF8F5] border border-[#EAE3D9] rounded-3xl shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#736E69] hover:text-[#231710] bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] rounded-full backdrop-blur-xs transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Gallery */}
            <div className="p-6 md:p-8 bg-[#F4EFEB] flex flex-col justify-between">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FFFFFF] shadow-sm mb-4">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImage === img
                          ? "border-[#88624C] scale-105"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info & Purchase Controls */}
            <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#88624C]">
                    {product.category} • {product.material}
                  </span>
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231710]">
                  {product.name}
                </h2>

                <PriceDisplay price={product.price} oldPrice={product.oldPrice} size="lg" />

                <p className="text-xs sm:text-sm text-[#413D3A] leading-relaxed">
                  {product.description}
                </p>

                {/* Dimensions info */}
                <div className="text-xs text-[#736E69] p-3 rounded-xl bg-[#FFFFFF] border border-[#EAE3D9] grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="block text-[#9C9690]">Width</span>
                    <span className="font-semibold text-[#231710]">{product.dimensions.widthCm} cm</span>
                  </div>
                  <div>
                    <span className="block text-[#9C9690]">Depth</span>
                    <span className="font-semibold text-[#231710]">{product.dimensions.depthCm} cm</span>
                  </div>
                  <div>
                    <span className="block text-[#9C9690]">Height</span>
                    <span className="font-semibold text-[#231710]">{product.dimensions.heightCm} cm</span>
                  </div>
                </div>

                {/* Color Swatches */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-semibold text-[#231710] uppercase tracking-wider">
                      Finish / Upholstery: <span className="text-[#88624C]">{selectedColor}</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                            selectedColor === c.name
                              ? "border-[#231710] bg-[#FFFFFF] text-[#231710] font-semibold shadow-xs"
                              : "border-[#D8CEBF] bg-transparent text-[#736E69] hover:border-[#88624C]"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-[#D8CEBF]"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="space-y-3 pt-4 border-t border-[#EAE3D9]">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#D8CEBF] rounded-xl bg-[#FFFFFF] px-2 py-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1.5 text-[#413D3A] hover:text-[#231710]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#231710]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-1.5 text-[#413D3A] hover:text-[#231710]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                      isAdded
                        ? "bg-[#266E56] text-[#FAF8F5]"
                        : "bg-[#231710] text-[#FAF8F5] hover:bg-[#332218]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3 rounded-xl border border-[#D8CEBF] transition-colors ${
                      isLiked ? "bg-[#88624C] text-[#FAF8F5] border-[#88624C]" : "bg-[#FFFFFF] text-[#413D3A] hover:bg-[#F4EFEB]"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#266E56]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>In Stock • Ready to dispatch</span>
                  </div>
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={onClose}
                    className="text-xs font-semibold text-[#88624C] hover:text-[#231710] flex items-center gap-1 group"
                  >
                    <span>View full specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
