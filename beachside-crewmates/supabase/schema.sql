-- Beachside Crewmates: per-browser anonymous ownership with RLS.
-- Enable Anonymous Sign-Ins in Supabase Dashboard > Authentication > Sign In / Providers.
-- Run this in the Supabase SQL Editor. Existing rows are assigned no owner and should be
-- exported/recreated, or manually assigned to a trusted account before using this schema.

create table if not exists public.villagers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 40),
  category text not null check (category in ('Gardener', 'Explorer', 'Builder', 'Entertainer')),
  specialty text not null check (char_length(trim(specialty)) between 1 and 100),
  personality text not null check (personality in ('Normal', 'Peppy', 'Lazy', 'Jock', 'Snooty', 'Cranky', 'Smug')),
  favorite_activity text not null default '' check (char_length(favorite_activity) <= 100),
  favorite_phrase text not null default '' check (char_length(favorite_phrase) <= 100),
  image_url text not null default '' check (image_url = '' or image_url ~* '^https?://'),
  color text not null default 'mint',
  emoji text not null default '🐻',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint villagers_category_specialty_check check (
    (category = 'Gardener' and specialty in ('Flower Care', 'Tree Planting', 'Landscaping')) or
    (category = 'Explorer' and specialty in ('Bug Hunting', 'Fossil Finding', 'Fishing')) or
    (category = 'Builder' and specialty in ('Furniture Design', 'Home Design', 'Island Construction')) or
    (category = 'Entertainer' and specialty in ('Music', 'Fashion', 'Events'))
  )
);

alter table public.villagers add column if not exists owner_id uuid references auth.users(id) on delete cascade;
alter table public.villagers add column if not exists color text not null default 'mint';
alter table public.villagers add column if not exists emoji text not null default '🐻';

alter table public.villagers enable row level security;

-- Remove legacy classroom policies that allowed any visitor to change any row.
drop policy if exists "Public can read villagers" on public.villagers;
drop policy if exists "Public can create villagers" on public.villagers;
drop policy if exists "Public can update villagers" on public.villagers;
drop policy if exists "Public can delete villagers" on public.villagers;
drop policy if exists "Owners can read their villagers" on public.villagers;
drop policy if exists "Owners can create their villagers" on public.villagers;
drop policy if exists "Owners can update their villagers" on public.villagers;
drop policy if exists "Owners can delete their villagers" on public.villagers;

create policy "Owners can read their villagers"
on public.villagers for select to authenticated
using (owner_id = (select auth.uid()));

create policy "Owners can create their villagers"
on public.villagers for insert to authenticated
with check (owner_id = (select auth.uid()));

create policy "Owners can update their villagers"
on public.villagers for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "Owners can delete their villagers"
on public.villagers for delete to authenticated
using (owner_id = (select auth.uid()));

grant select, insert, update, delete on public.villagers to authenticated;
revoke all on public.villagers from anon;
create index if not exists villagers_owner_created_idx
on public.villagers (owner_id, created_at desc);
notify pgrst, 'reload schema';
