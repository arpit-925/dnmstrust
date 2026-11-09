import { Star } from 'lucide-react'

export default function StarRating({ rating, onRate, size = 20, interactive = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={() => interactive && onRate?.(star)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
          disabled={!interactive}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            size={size}
            className={
              star <= rating
                ? 'fill-saffron text-saffron'
                : 'fill-gray-200 text-gray-200'
            }
          />
        </button>
      ))}
    </div>
  )
}
