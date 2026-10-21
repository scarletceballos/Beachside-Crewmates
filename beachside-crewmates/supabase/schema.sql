-- Beachside Crewmates schema.
-- This starter policy set is intentionally public for a classroom demo.
-- Anyone with the project URL/key can read, create, edit, and delete rows.
-- For a real multi-user app, add authentication and owner_id-based RLS policies.

create table if not exists public.villagers (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 40),
  category text not null check (category in ('Gardener', 'Explorer', 'Builder', 'Entertainer')),
  specialty text not null,
  personality text not null,
  favorite_activity text not null default '',
  favorite_phrase text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.villagers enable row level security;

drop policy if exists "Public can read villagers" on public.villagers;
create policy "Public can read villagers"
on public.villagers for select to anon, authenticated
using (true);

drop policy if exists "Public can create villagers" on public.villagers;
create policy "Public can create villagers"
on public.villagers for insert to anon, authenticated
with check (true);

drop policy if exists "Public can update villagers" on public.villagers;
create policy "Public can update villagers"
on public.villagers for update to anon, authenticated
using (true) with check (true);

drop policy if exists "Public can delete villagers" on public.villagers;
create policy "Public can delete villagers"
on public.villagers for delete to anon, authenticated
using (true);

create index if not exists villagers_created_at_idx
on public.villagers (created_at desc);
