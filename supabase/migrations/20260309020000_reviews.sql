-- Reviews table: drivers leave reviews directly on DesiRig
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  business_id uuid not null references public.businesses(id) on delete cascade,
  reviewer_name text not null,
  rating smallint not null check (rating >= 1 and rating <= 5),
  comment text,
  is_driver boolean default false,
  created_at timestamptz default now() not null
);

-- Index for fast lookups by business
create index idx_reviews_business on public.reviews(business_id);
create index idx_reviews_created on public.reviews(created_at desc);

-- Enable RLS
alter table public.reviews enable row level security;

-- Anyone can read reviews
create policy "Reviews are public" on public.reviews
  for select using (true);

-- Anyone can insert reviews (no auth required for now)
create policy "Anyone can leave a review" on public.reviews
  for insert with check (true);
