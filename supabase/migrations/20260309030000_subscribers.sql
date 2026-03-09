-- Email subscribers for trucking news
create table if not exists public.subscribers (
  id bigint generated always as identity primary key,
  email text not null unique,
  name text,
  is_driver boolean default false,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.subscribers enable row level security;

-- Anyone can subscribe (insert only, no read)
create policy "Anyone can subscribe" on public.subscribers
  for insert with check (true);
