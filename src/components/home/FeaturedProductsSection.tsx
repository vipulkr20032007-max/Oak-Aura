"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useAdminData } from "@/context/AdminDataContext";

export function FeaturedProductsSection() {
  const [activeTab, setActiveTab] = useState<"featured" | "bestseller" | "new">("featured");
  const { products } = useAdminData();

  const filteredProducts = products.filter((p) => {
    if (activeTab === "bestseller") return p.isBestSeller;
    if (activeTab === "new") return p.isNewArrival;
    return p.isFeatured;
  }).slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-[#FFFFFF] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#88624C] block mb-2">
              Atelier Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight">
              Featured Furnishings
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 bg-[#FAF8F5] border border-[#EAE3D9] rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab("featured")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === "featured"
                  ? "bg-[#231710] text-[#FAF8F5] shadow-xs"
                  : "text-[#736E69] hover:text-[#231710]"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === "bestseller"
                  ? "bg-[#231710] text-[#FAF8F5] shadow-xs"
                  : "text-[#736E69] hover:text-[#231710]"
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === "new"
                  ? "bg-[#231710] text-[#FAF8F5] shadow-xs"
                  : "text-[#736E69] hover:text-[#231710]"
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#231710] text-[#231710] hover:bg-[#231710] hover:text-[#FAF8F5] text-sm font-semibold tracking-wide transition-all group"
          >
            <span>Explore All 24+ Pieces in the Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
