import React from "react";
import { formatINR, calculateDiscount } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  oldPrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  showDiscountBadge?: boolean;
}

export function PriceDisplay({
  price,
  oldPrice,
  size = "md",
  showDiscountBadge = true,
}: PriceDisplayProps) {
  const discount = calculateDiscount(price, oldPrice);

  const priceSizes = {
    sm: "text-sm font-semibold",
    md: "text-base font-semibold",
    lg: "text-xl font-bold",
    xl: "text-3xl font-bold tracking-tight",
  };

  const oldPriceSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`${priceSizes[size]} text-[#231710]`}>
        {formatINR(price)}
      </span>
      {oldPrice && oldPrice > price && (
        <span
          className={`${oldPriceSizes[size]} line-through text-[#9C9690] font-normal`}
        >
          {formatINR(oldPrice)}
        </span>
      )}
      {showDiscountBadge && discount > 0 && (
        <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#E4F0EC] text-[#266E56]">
          {discount}% off
        </span>
      )}
    </div>
  );
}
