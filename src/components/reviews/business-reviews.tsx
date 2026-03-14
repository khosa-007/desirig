"use client";

import { useState, useEffect, useCallback } from "react";
import { ReviewForm } from "./review-form";
import { ReviewList } from "./review-list";
import { createClient } from "@/lib/supabase/client";

interface Review {
  id: number;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  is_driver: boolean;
  created_at: string;
}

interface BusinessReviewsProps {
  businessId: string;
  businessName: string;
  initialReviews: Review[];
  initialAvg: number;
  initialCount: number;
}

export function BusinessReviews({
  businessId,
  businessName,
  initialReviews,
  initialAvg,
  initialCount,
}: BusinessReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [avg, setAvg] = useState(initialAvg);
  const [count, setCount] = useState(initialCount);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("business_id", businessId)
      .eq("status", "verified")
      .order("created_at", { ascending: false })
      .limit(20);

    if (data && data.length > 0) {
      setReviews(data);
      const total = data.reduce((sum: number, r: Review) => sum + r.rating, 0);
      setAvg(total / data.length);
      setCount(data.length);
    }
  }, [businessId]);

  return (
    <div className="mt-6 rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold">Reviews from the community</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Real reviews from real people. No paid placements.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <ReviewList reviews={reviews} averageRating={avg} totalCount={count} />
        </div>
        <div>
          <ReviewForm
            businessId={businessId}
            businessName={businessName}
            onReviewAdded={refresh}
          />
        </div>
      </div>
    </div>
  );
}
