-- MZ ARK MOBILE production schema (run in Supabase SQL editor).
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  role text not null default 'player' check (role in ('player','server_owner','moderator','platform_admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.servers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete restrict,
  name text not null check (char_length(name) between 2 and 80),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  game_version text not null,
  region text not null,
  gameplay_type text not null check (gameplay_type in ('PvE','PvP')),
  rates text not null,
  description text not null check (char_length(description) between 20 and 3000),
  rules text[] not null default '{}',
  discord_invite text,
  website text,
  banner_url text,
  logo_url text,
  connection_instructions text,
  status text not null default 'draft' check (status in ('draft','pending','approved','rejected','hidden')),
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.server_owners (
  id uuid primary key default gen_random_uuid(), server_id uuid not null references public.servers(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner','manager','editor','viewer')),
  created_at timestamptz not null default now(), unique(server_id,user_id)
);
create table if not exists public.staff_memberships (
  id uuid primary key default gen_random_uuid(), server_id uuid not null references public.servers(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  scope text not null default 'read' check (scope in ('read','write','manage')),
  created_at timestamptz not null default now(), unique(server_id,user_id)
);
create table if not exists public.ownership_claims (
  id uuid primary key default gen_random_uuid(), server_id uuid not null references public.servers(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade, evidence text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(), reviewed_at timestamptz
);
create table if not exists public.server_images (
  id uuid primary key default gen_random_uuid(), server_id uuid not null references public.servers(id) on delete cascade,
  url text not null, kind text not null default 'banner' check (kind in ('banner','logo','gallery')),
  created_at timestamptz not null default now()
);
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(), server_id uuid not null references public.servers(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5), content text not null check (char_length(content) between 10 and 2000),
  owner_reply text, status text not null default 'published' check (status in ('published','hidden')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(server_id,user_id)
);
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(), server_id uuid not null references public.servers(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade, created_at timestamptz not null default now(), unique(server_id,user_id)
);
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(), server_id uuid not null references public.servers(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete restrict,
  title text not null check (char_length(title) between 3 and 120), body text not null check (char_length(body) between 10 and 3000),
  published_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(), server_id uuid not null references public.servers(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  event_type text not null check (event_type in ('view','favorite','click','review')),
  metadata jsonb not null default '{}', created_at timestamptz not null default now()
);
create table if not exists public.moderation_reports (
  id uuid primary key default gen_random_uuid(), server_id uuid references public.servers(id) on delete cascade,
  review_id uuid references public.reviews(id) on delete cascade,
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  reason text not null check (char_length(reason) between 10 and 1000),
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now()
);

create index if not exists servers_status_featured_idx on public.servers(status,featured desc,created_at desc);
create index if not exists servers_owner_idx on public.servers(owner_id);
create index if not exists reviews_server_date_idx on public.reviews(server_id,created_at desc) where status='published';
create index if not exists analytics_server_event_date_idx on public.analytics_events(server_id,event_type,created_at desc);
create index if not exists reports_status_date_idx on public.moderation_reports(status,created_at desc);

create or replace function public.is_platform_admin() returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.profiles where id=auth.uid() and role='platform_admin');
$$;
create or replace function public.can_manage_server(target uuid, required_scope text default 'write') returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.servers s where s.id=target and s.owner_id=auth.uid())
    or exists(select 1 from public.server_owners so where so.server_id=target and so.user_id=auth.uid() and so.role in ('owner','manager','editor'))
    or exists(select 1 from public.staff_memberships sm where sm.server_id=target and sm.user_id=auth.uid() and
      (sm.scope='manage' or (required_scope='write' and sm.scope='write') or (required_scope='read' and sm.scope in ('read','write'))));
$$;

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(id,email,full_name,role)
  values(new.id,new.email,coalesce(new.raw_user_meta_data->>'full_name',''),
    case when new.raw_user_meta_data->>'account_type'='server_owner' then 'server_owner' else 'player' end)
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.guard_server_status() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if new.status='approved' and not public.is_platform_admin() then raise exception 'Only platform admins can approve a listing'; end if;
  if new.featured is distinct from old.featured and not public.is_platform_admin() then raise exception 'Only platform admins can feature listings'; end if;
  new.updated_at=now();
  return new;
end;
$$;
drop trigger if exists guard_server_status_trigger on public.servers;
create trigger guard_server_status_trigger before update on public.servers for each row execute procedure public.guard_server_status();

create or replace function public.attach_initial_owner() returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.server_owners(server_id,user_id,role) values(new.id,new.owner_id,'owner') on conflict do nothing;
  return new;
end;
$$;
drop trigger if exists attach_initial_owner_trigger on public.servers;
create trigger attach_initial_owner_trigger after insert on public.servers for each row execute procedure public.attach_initial_owner();

alter table public.profiles enable row level security;
alter table public.servers enable row level security;
alter table public.server_owners enable row level security;
alter table public.staff_memberships enable row level security;
alter table public.ownership_claims enable row level security;
alter table public.server_images enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;
alter table public.announcements enable row level security;
alter table public.analytics_events enable row level security;
alter table public.moderation_reports enable row level security;

-- Idempotently replace prior policies on the managed tables.
do $$ declare p record; begin
  for p in select schemaname,tablename,policyname from pg_policies where schemaname='public' and tablename in ('profiles','servers','server_owners','staff_memberships','ownership_claims','server_images','reviews','favorites','announcements','analytics_events','moderation_reports') loop
    execute format('drop policy if exists %I on %I.%I',p.policyname,p.schemaname,p.tablename);
  end loop;
end $$;

create policy profiles_select_self_or_admin on public.profiles for select using (id=auth.uid() or public.is_platform_admin());
create policy profiles_update_self on public.profiles for update using (id=auth.uid()) with check (id=auth.uid() and role=(select p.role from public.profiles p where p.id=auth.uid()));
create policy profiles_admin_manage on public.profiles for all using (public.is_platform_admin()) with check (public.is_platform_admin());

create policy servers_public_read on public.servers for select using (status='approved' or owner_id=auth.uid() or public.can_manage_server(id,'read') or public.is_platform_admin());
create policy servers_owner_insert on public.servers for insert with check (owner_id=auth.uid() and status in ('draft','pending') and featured=false);
create policy servers_owner_update on public.servers for update using (public.can_manage_server(id,'write') or public.is_platform_admin()) with check ((public.can_manage_server(id,'write') and status in ('draft','pending')) or public.is_platform_admin());
create policy servers_admin_delete on public.servers for delete using (public.is_platform_admin());

create policy server_owners_read on public.server_owners for select using (user_id=auth.uid() or public.can_manage_server(server_id,'manage') or public.is_platform_admin());
create policy server_owners_admin_write on public.server_owners for all using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy staff_read_membership on public.staff_memberships for select using (user_id=auth.uid() or public.can_manage_server(server_id,'manage') or public.is_platform_admin());
create policy staff_manage_membership on public.staff_memberships for all using (public.can_manage_server(server_id,'manage') or public.is_platform_admin()) with check (public.can_manage_server(server_id,'manage') or public.is_platform_admin());

create policy claims_submit_read on public.ownership_claims for select using (user_id=auth.uid() or public.is_platform_admin());
create policy claims_submit on public.ownership_claims for insert with check (user_id=auth.uid() and status='pending');
create policy claims_admin_review on public.ownership_claims for update using (public.is_platform_admin()) with check (public.is_platform_admin());
create policy images_public_read on public.server_images for select using (exists(select 1 from public.servers s where s.id=server_id and s.status='approved') or public.can_manage_server(server_id,'read') or public.is_platform_admin());
create policy images_owner_manage on public.server_images for all using (public.can_manage_server(server_id,'write') or public.is_platform_admin()) with check (public.can_manage_server(server_id,'write') or public.is_platform_admin());

create policy reviews_public_read on public.reviews for select using ((status='published' and exists(select 1 from public.servers s where s.id=server_id and s.status='approved')) or user_id=auth.uid() or public.can_manage_server(server_id,'read') or public.is_platform_admin());
create policy reviews_create_self on public.reviews for insert with check (user_id=auth.uid() and status='published' and exists(select 1 from public.servers s where s.id=server_id and s.status='approved'));
create policy reviews_update_self_or_admin on public.reviews for update using (user_id=auth.uid() or public.can_manage_server(server_id,'write') or public.is_platform_admin()) with check (user_id=auth.uid() or public.can_manage_server(server_id,'write') or public.is_platform_admin());
create policy reviews_delete_self_or_admin on public.reviews for delete using (user_id=auth.uid() or public.is_platform_admin());
create policy favorites_self on public.favorites for all using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy announcements_public_read on public.announcements for select using (published_at is not null and exists(select 1 from public.servers s where s.id=server_id and s.status='approved') or public.can_manage_server(server_id,'read') or public.is_platform_admin());
create policy announcements_owner_manage on public.announcements for all using (public.can_manage_server(server_id,'write') or public.is_platform_admin()) with check ((public.can_manage_server(server_id,'write') and author_id=auth.uid()) or public.is_platform_admin());
create policy analytics_insert on public.analytics_events for insert with check (event_type='view' and exists(select 1 from public.servers s where s.id=server_id and s.status='approved'));
create policy analytics_owner_read on public.analytics_events for select using (public.can_manage_server(server_id,'read') or public.is_platform_admin());
create policy reports_submit on public.moderation_reports for insert with check (reporter_id=auth.uid());
create policy reports_admin_manage on public.moderation_reports for all using (public.is_platform_admin()) with check (public.is_platform_admin());

-- Create a private storage bucket; upload policies restrict objects to their server's authorized owners.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('server-assets','server-assets',false,5242880,array['image/png','image/jpeg','image/webp'])
on conflict (id) do nothing;
drop policy if exists server_assets_read on storage.objects;
drop policy if exists server_assets_insert on storage.objects;
drop policy if exists server_assets_update on storage.objects;
drop policy if exists server_assets_delete on storage.objects;
create policy server_assets_read on storage.objects for select using (bucket_id='server-assets' and (public.can_manage_server((storage.foldername(name))[1]::uuid,'read') or public.is_platform_admin()));
create policy server_assets_insert on storage.objects for insert with check (bucket_id='server-assets' and public.can_manage_server((storage.foldername(name))[1]::uuid,'write'));
create policy server_assets_update on storage.objects for update using (bucket_id='server-assets' and public.can_manage_server((storage.foldername(name))[1]::uuid,'write')) with check (bucket_id='server-assets' and public.can_manage_server((storage.foldername(name))[1]::uuid,'write'));
create policy server_assets_delete on storage.objects for delete using (bucket_id='server-assets' and public.can_manage_server((storage.foldername(name))[1]::uuid,'write'));
