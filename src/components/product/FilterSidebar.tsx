"use client";

import React from "react";
import { ProductCategory, WoodType } from "@/types";
import { formatINR } from "@/lib/utils";
import { Filter, RotateCcw, Check } from "lucide-react";

export interface FilterState {
  search: string;
  category: ProductCategory | "All";
  material: WoodType | "All";
  maxPrice: number;
  inStockOnly: boolean;
  minRating: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

const CATEGORIES: (ProductCategory | "All")[] = [
  "All",
  "Sofas",
  "Chairs",
  "Tables",
  "Beds",
  "Dining",
  "Storage",
  "Lighting",
  "Decor",
];

const MATERIALS: (WoodType | "All")[] = [
  "All",
  "Solid Teak",
  "American Walnut",
  "White Oak",
  "Natural Ash",
];

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  totalResults,
}: FilterSidebarProps) {
  const handleCategoryChange = (cat: ProductCategory | "All") => {
    onChange({ ...filters, category: cat });
  };

  const handleMaterialChange = (mat: WoodType | "All") => {
    onChange({ ...filters, material: mat });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  return (
    <aside className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#EAE3D9] shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F4EFEB]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#88624C]" />
          <h3 className="font-serif text-lg font-bold text-[#231710]">
            Filters
          </h3>
          <span className="text-xs text-[#736E69]">({totalResults})</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-[#88624C] hover:text-[#231710] flex items-center gap-1 font-medium transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Selection */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase font-bold tracking-wider text-[#231710]">
          Room & Category
        </h4>
        <div className="flex flex-col space-y-1.5">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                  isSelected
                    ? "bg-[#231710] text-[#FAF8F5] font-semibold"
                    : "text-[#413D3A] hover:bg-[#FAF8F5] hover:text-[#231710]"
                }`}
              >
                <span>{cat}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Wood Species / Material */}
      <div className="space-y-3 pt-4 border-t border-[#F4EFEB]">
        <h4 className="text-xs uppercase font-bold tracking-wider text-[#231710]">
          Timber & Species
        </h4>
        <div className="flex flex-col space-y-1.5">
          {MATERIALS.map((mat) => {
            const isSelected = filters.material === mat;
            return (
              <button
                key={mat}
                onClick={() => handleMaterialChange(mat)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                  isSelected
                    ? "bg-[#EFE4D6] text-[#231710] font-semibold border border-[#BE9A78]"
                    : "text-[#413D3A] hover:bg-[#FAF8F5]"
                }`}
              >
                <span>{mat}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#88624C]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-3 pt-4 border-t border-[#F4EFEB]">
        <div className="flex items-center justify-between">
          <h4 className="text-xs uppercase font-bold tracking-wider text-[#231710]">
            Max Price
          </h4>
          <span className="text-xs font-bold text-[#88624C]">
            {formatINR(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="15000"
          max="130000"
          step="5000"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-[#231710] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#9C9690]">
          <span>₹15,000</span>
          <span>₹1,30,000+</span>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="pt-4 border-t border-[#F4EFEB]">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              onChange({ ...filters, inStockOnly: e.target.checked })
            }
            className="w-4 h-4 rounded text-[#266E56] focus:ring-[#266E56] accent-[#266E56]"
          />
          <span className="text-xs font-medium text-[#413D3A]">
            In Stock Only (Immediate dispatch)
          </span>
        </label>
      </div>

      {/* Customer Rating Filter */}
      <div className="space-y-2 pt-4 border-t border-[#F4EFEB]">
        <h4 className="text-xs uppercase font-bold tracking-wider text-[#231710]">
          Minimum Rating
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {[0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              onClick={() => onChange({ ...filters, minRating: rating })}
              className={`py-1.5 px-2 text-xs rounded-lg border text-center transition-all ${
                filters.minRating === rating
                  ? "bg-[#231710] text-[#FAF8F5] border-[#231710] font-semibold"
                  : "bg-transparent text-[#736E69] border-[#D8CEBF] hover:border-[#88624C]"
              }`}
            >
              {rating === 0 ? "All" : `${rating}★+`}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
}
