-- Community submissions: truckers submit hidden desi stops, businesses, etc.
create table if not exists public.submissions (
  id bigint generated always as identity primary key,
  -- What type of submission
  type text not null default 'business',  -- business, truck_stop, desi_spot, correction
  -- Business/stop info
  name text not null,
  category text,                          -- free text: "Indian restaurant", "Truck stop with desi food"
  address text,
  city text,
  province_state text,
  country text default 'CA',
  phone text,
  website text,
  -- Location
  latitude double precision,
  longitude double precision,
  -- Desi-specific
  is_desi_owned boolean default false,
  has_desi_food boolean default false,
  languages text,                         -- "Punjabi, Hindi"
  -- Submitter info
  submitter_name text,
  submitter_email text,
  submitter_phone text,
  -- Details
  description text,                       -- "Hidden dhaba behind the truck stop, amazing butter chicken"
  -- Admin
  status text default 'pending',          -- pending, approved, rejected
  admin_notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Indexes
create index idx_submissions_status on public.submissions(status);
create index idx_submissions_type on public.submissions(type);
create index idx_submissions_created on public.submissions(created_at desc);

-- RLS
alter table public.submissions enable row level security;

-- Anyone can submit (no auth required)
create policy "Anyone can submit" on public.submissions
  for insert with check (true);

-- Only service role can read/update (admin)
create policy "Service role reads submissions" on public.submissions
  for select using (auth.role() = 'service_role');
