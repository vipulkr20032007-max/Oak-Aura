"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "popular";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-[#88624C] shrink-0" />
      <span className="text-xs text-[#736E69] hidden sm:inline">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="text-xs sm:text-sm font-medium bg-[#FFFFFF] border border-[#D8CEBF] rounded-lg px-3 py-2 text-[#231710] focus:outline-none focus:border-[#88624C] cursor-pointer shadow-xs"
        aria-label="Sort products by"
      >
        <option value="featured">Featured Collection</option>
        <option value="newest">New Arrivals</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>
  );
}
