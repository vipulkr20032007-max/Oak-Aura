import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { mockCategories } from "@/data/mockCategories";

export default function CategoriesPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumbs items={[{ label: "Room Collections & Categories" }]} />

        <div className="py-6 border-b border-[#EAE3D9] mb-12">
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#231710] tracking-tight">
            Furniture Collections by Space
          </h1>
          <p className="text-sm sm:text-base text-[#736E69] mt-2 max-w-2xl">
            Explore handcrafted pieces tailored for harmonious living. From deep-seated bouclé sectionals to live-edge solid teak dining tables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative h-96 rounded-3xl overflow-hidden border border-[#EAE3D9] shadow-sm flex flex-col justify-end p-8 bg-[#FFFFFF]"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#191716]/90 via-[#191716]/30 to-transparent transition-opacity group-hover:opacity-95" />

              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-3xl font-bold text-[#FFFFFF]">
                    {category.name}
                  </h2>
                  <span className="w-9 h-9 rounded-full bg-[#FFFFFF]/25 backdrop-blur-md text-[#FFFFFF] flex items-center justify-center group-hover:bg-[#FFFFFF] group-hover:text-[#231710] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-xs text-[#D8CEBF] line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#BE9A78] uppercase tracking-wider">
                    {category.productCount} Handcrafted Pieces
                  </span>
                  <span className="text-[#FAF8F5] underline underline-offset-4 group-hover:text-[#BE9A78] transition-colors">
                    View Catalog →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
