import { Star } from 'lucide-react';

type StarsProps = {
  rating: number;
  className?: string;
};

export function Stars({ rating, className = '' }: StarsProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block">
            <Star className="h-4 w-4 text-navy-200" strokeWidth={1.5} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
