-- Run this in Supabase Dashboard → SQL Editor.
create table if not exists public.study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject text not null check (char_length(subject) between 1 and 100),
  study_date date not null,
  study_time time not null,
  duration_minutes integer not null check (duration_minutes between 1 and 1440),
  notes text check (notes is null or char_length(notes) <= 1000),
  created_at timestamptz not null default now()
);

create table if not exists public.study_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  deadline date not null,
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.study_plans enable row level security;
alter table public.study_tasks enable row level security;

drop policy if exists "Users manage their own study plans" on public.study_plans;
create policy "Users manage their own study plans" on public.study_plans
for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users manage their own study tasks" on public.study_tasks;
create policy "Users manage their own study tasks" on public.study_tasks
for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

grant select, insert, update, delete on public.study_plans to authenticated;
grant select, insert, update, delete on public.study_tasks to authenticated;
