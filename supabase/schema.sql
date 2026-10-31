-- Run in the Supabase SQL Editor. Create your first Auth user separately,
-- then add its UUID to public.portfolio_admins and ADMIN_USER_IDS.

create extension if not exists pgcrypto;

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.portfolio_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to anon, authenticated;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  category text not null default 'PROJECT / OTHER',
  summary text not null default '',
  body text not null default '',
  status text not null default 'In progress',
  year text not null default '',
  image_url text,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  dek text not null default '',
  body text not null default '',
  category text not null default 'FIELD NOTE',
  published_at date not null default current_date,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at before update on public.projects
for each row execute function public.touch_updated_at();
drop trigger if exists articles_touch_updated_at on public.articles;
create trigger articles_touch_updated_at before update on public.articles
for each row execute function public.touch_updated_at();
drop trigger if exists settings_touch_updated_at on public.site_settings;
create trigger settings_touch_updated_at before update on public.site_settings
for each row execute function public.touch_updated_at();

alter table public.portfolio_admins enable row level security;
alter table public.projects enable row level security;
alter table public.articles enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Admins can read admin list" on public.portfolio_admins;
create policy "Admins can read admin list" on public.portfolio_admins
for select to authenticated using (public.is_portfolio_admin());

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects" on public.projects
for select to anon, authenticated using (published or public.is_portfolio_admin());
drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects" on public.projects
for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles" on public.articles
for select to anon, authenticated using (published or public.is_portfolio_admin());
drop policy if exists "Admins can manage articles" on public.articles;
create policy "Admins can manage articles" on public.articles
for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

drop policy if exists "Public can read settings" on public.site_settings;
create policy "Public can read settings" on public.site_settings
for select to anon, authenticated using (true);
drop policy if exists "Admins can manage settings" on public.site_settings;
create policy "Admins can manage settings" on public.site_settings
for all to authenticated using (public.is_portfolio_admin()) with check (public.is_portfolio_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media', 'portfolio-media', true, 8388608, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view portfolio media" on storage.objects;
create policy "Public can view portfolio media" on storage.objects
for select to anon, authenticated using (bucket_id = 'portfolio-media');
drop policy if exists "Admins can upload portfolio media" on storage.objects;
create policy "Admins can upload portfolio media" on storage.objects
for insert to authenticated with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());
drop policy if exists "Admins can update portfolio media" on storage.objects;
create policy "Admins can update portfolio media" on storage.objects
for update to authenticated using (bucket_id = 'portfolio-media' and public.is_portfolio_admin()) with check (bucket_id = 'portfolio-media' and public.is_portfolio_admin());
drop policy if exists "Admins can delete portfolio media" on storage.objects;
create policy "Admins can delete portfolio media" on storage.objects
for delete to authenticated using (bucket_id = 'portfolio-media' and public.is_portfolio_admin());

-- After creating your Auth user, run this with that user's UUID:
-- insert into public.portfolio_admins (user_id) values ('YOUR_AUTH_USER_UUID');
