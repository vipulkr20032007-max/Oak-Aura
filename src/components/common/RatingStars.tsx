import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export function RatingStars({
  rating,
  reviewCount,
  size = "md",
  showCount = true,
}: RatingStarsProps) {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="flex items-center text-[#BE9A78]">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const half = !filled && star === Math.ceil(rating) && rating % 1 >= 0.3;
          return (
            <Star
              key={star}
              className={`${iconSizes[size]} ${
                filled
                  ? "fill-[#BE9A78] text-[#BE9A78]"
                  : half
                  ? "fill-[#BE9A78]/50 text-[#BE9A78]"
                  : "text-[#D8CEBF]"
              }`}
            />
          );
        })}
      </div>
      {showCount && (
        <span className={`${textSizes[size]} font-medium text-[#736E69]`}>
          {rating.toFixed(1)} {reviewCount !== undefined && `(${reviewCount})`}
        </span>
      )}
    </div>
  );
}
