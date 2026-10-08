import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export default function RatingStars({
  rating,
  maxStars = 5,
  size = 'md',
  showNumber = false,
}: RatingStarsProps) {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const half = !filled && index < rating;

          return (
            <div key={index} className="relative">
              <Star
                className={`${sizeClasses[size]} ${
                  filled
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300 fill-gray-100'
                }`}
              />
              {half && (
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star
                    className={`${sizeClasses[size]} text-amber-400 fill-amber-400`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-xs font-semibold text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
