-- Add email, status, and verification token to reviews
-- Reviews now require email and are pending until verified

-- Add new columns
alter table public.reviews add column if not exists email text;
alter table public.reviews add column if not exists status text not null default 'verified';
alter table public.reviews add column if not exists verification_token uuid;
alter table public.reviews add column if not exists verified_at timestamptz;
alter table public.reviews add column if not exists ip_hash text;

-- Add check constraint for status
alter table public.reviews add constraint reviews_status_check
  check (status in ('pending', 'verified', 'rejected'));

-- Index for verification token lookups
create index if not exists idx_reviews_verification_token on public.reviews(verification_token) where verification_token is not null;

-- Index for email rate limiting
create index if not exists idx_reviews_email on public.reviews(email, created_at desc) where email is not null;

-- Drop old permissive insert policy
drop policy if exists "Anyone can leave a review" on public.reviews;

-- Drop old select policy and create one that only shows verified reviews
drop policy if exists "Reviews are public" on public.reviews;

create policy "Only verified reviews are public" on public.reviews
  for select using (status = 'verified');

-- Only the service role (API route) can insert reviews now
-- No anon insert policy = anon users cannot insert directly
-- The API route uses service role key to insert

-- Mark all existing reviews as verified (they're already published)
update public.reviews set status = 'verified' where status != 'verified';
