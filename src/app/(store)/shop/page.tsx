"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar, FilterState } from "@/components/product/FilterSidebar";
import { SortDropdown, SortOption } from "@/components/product/SortDropdown";
import { useAdminData } from "@/context/AdminDataContext";
import { ProductCategory, WoodType } from "@/types";
import { Search, SlidersHorizontal, X } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  const { products } = useAdminData();

  const [filters, setFilters] = useState<FilterState>({
    search: searchParam || "",
    category: (categoryParam as ProductCategory) || "All",
    material: "All",
    maxPrice: 130000,
    inStockOnly: false,
    minRating: 0,
  });

  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "All",
      material: "All",
      maxPrice: 130000,
      inStockOnly: false,
      minRating: 0,
    });
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchMat = p.material.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchDesc && !matchMat) return false;
        }

        // Category filter
        if (filters.category !== "All" && p.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }

        // Material filter
        if (filters.material !== "All" && p.material !== filters.material) {
          return false;
        }

        // Price filter
        if (p.price > filters.maxPrice) {
          return false;
        }

        // Availability filter
        if (filters.inStockOnly && p.stock <= 0) {
          return false;
        }

        // Rating filter
        if (filters.minRating > 0 && p.rating < filters.minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === "popular") return b.reviewCount - a.reviewCount;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, filters, sortBy]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Shop Catalog", href: "/shop" },
            ...(filters.category !== "All" ? [{ label: filters.category }] : []),
          ]}
        />

        {/* Page Title & Search Bar Header */}
        <div className="py-6 border-b border-[#EAE3D9] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#231710] tracking-tight">
              {filters.category === "All" ? "The Atelier Catalog" : `${filters.category} Collection`}
            </h1>
            <p className="text-sm text-[#736E69] mt-1.5">
              Showing {filteredAndSortedProducts.length} handcrafted pieces in solid wood
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#88624C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by piece, wood, finish..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#D8CEBF] rounded-xl text-xs sm:text-sm text-[#231710] placeholder:text-[#9C9690] focus:outline-none focus:border-[#88624C] shadow-xs"
            />
            {filters.search && (
              <button
                onClick={() => setFilters({ ...filters, search: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C9690] hover:text-[#231710]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Control Bar: Mobile Filter Button & Sort Dropdown */}
        <div className="py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFFFFF] border border-[#D8CEBF] text-xs font-semibold text-[#231710] shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#88624C]" />
            <span>Filter Pieces</span>
          </button>

          <div className="ml-auto">
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Catalog Layout: Filter Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
              totalResults={filteredAndSortedProducts.length}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            <ProductGrid products={filteredAndSortedProducts} />
          </div>

        </div>

      </div>

      {/* Mobile Filter Slide-out Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-[#191716]/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FFFFFF] p-6 overflow-y-auto shadow-2xl z-10 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE3D9] mb-4">
              <span className="font-serif text-xl font-bold text-[#231710]">
                Filters
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-[#736E69] hover:bg-[#F4EFEB]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={(f) => {
                setFilters(f);
                setIsMobileFilterOpen(false);
              }}
              onReset={() => {
                resetFilters();
                setIsMobileFilterOpen(false);
              }}
              totalResults={filteredAndSortedProducts.length}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-[#736E69]">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
