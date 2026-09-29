import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { mockCategories } from "@/data/mockCategories";

export function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#88624C] block mb-2">
              Curated Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#231710] tracking-tight">
              Explore by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="mt-4 md:mt-0 text-sm font-semibold text-[#88624C] hover:text-[#231710] flex items-center gap-1 group transition-colors"
          >
            <span>View All 8 Categories</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative h-80 rounded-2xl overflow-hidden border border-[#EAE3D9] shadow-xs flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#191716]/85 via-[#191716]/30 to-transparent transition-opacity group-hover:opacity-95" />

              {/* Card Content */}
              <div className="relative z-10 space-y-1.5 transform transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl font-bold text-[#FFFFFF]">
                    {category.name}
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-[#FFFFFF]/20 backdrop-blur-md text-[#FFFFFF] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-xs text-[#D8CEBF] line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
                <span className="text-[11px] font-semibold text-[#BE9A78] tracking-wider uppercase block pt-1">
                  {category.productCount} Handcrafted Pieces
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
