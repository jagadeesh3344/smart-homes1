/**
 * RatingStars Component
 */

import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  reviewCount?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 'sm',
  showCount = false,
  reviewCount = 0,
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, i) => {
          const filled = i + 1 <= Math.floor(rating);
          const half = i < rating && i + 1 > Math.floor(rating);

          return (
            <Star
              key={i}
              className={`${iconSize} ${
                filled
                  ? 'text-amber-400 fill-amber-400'
                  : half
                  ? 'text-amber-400 fill-amber-400/50'
                  : 'text-slate-700 fill-slate-800'
              }`}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs text-slate-500 font-medium ml-1">
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
};
