import { Star, Truck } from "lucide-react";

interface Review {
  id: number;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  is_driver: boolean;
  created_at: string;
}

interface ReviewListProps {
  reviews: Review[];
  averageRating?: number;
  totalCount?: number;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function ReviewList({ reviews, averageRating, totalCount }: ReviewListProps) {
  if (reviews.length === 0 && !totalCount) {
    return (
      <div className="rounded-xl border bg-muted/30 p-8 text-center">
        <Star className="mx-auto h-8 w-8 text-muted-foreground/40" />
        <p className="mt-3 font-medium text-muted-foreground">No reviews yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Be the first to share your experience.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary bar */}
      {averageRating && totalCount && totalCount > 0 && (
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-orange-50 px-4 py-3">
          <div className="text-2xl font-bold text-orange-700">{averageRating.toFixed(1)}</div>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-4 w-4 ${
                  s <= Math.round(averageRating) ? "fill-orange-500 text-orange-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-orange-600">
            {totalCount} {totalCount === 1 ? "review" : "reviews"} on DesiRig
          </span>
        </div>
      )}

      {/* Individual reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-700">
                  {review.reviewer_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{review.reviewer_name}</span>
                    {review.is_driver && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                        <Truck className="h-3 w-3" />
                        Driver
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{timeAgo(review.created_at)}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${
                      s <= review.rating ? "fill-orange-500 text-orange-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            {review.comment && (
              <p className="mt-3 text-sm leading-relaxed">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
