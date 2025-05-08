import React from "react";
import { Star } from "lucide-react";

interface RatingDisplayProps {
  rating: number;
  totalRatings?: number;
  showTotal?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  totalRatings,
  showTotal = false,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      {showTotal && totalRatings !== undefined && (
        <span className="text-sm text-gray-600">
          ({totalRatings} {totalRatings === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
};
