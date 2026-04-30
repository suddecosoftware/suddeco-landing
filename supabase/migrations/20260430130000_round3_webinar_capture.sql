create extension if not exists pgcrypto;
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron with schema extensions;

create table if not exists public.webinar_registrations (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  track text not null check (track in ('pro', 'homeowner')),
  name text not null,
  email text not null,
  company text,
  audience_type text,
  pain_point text,
  batch_id uuid,
  status text default 'pending' check (status in ('pending', 'confirmed', 'attended', 'no_show', 'unsubscribed')),
  utm_source text,
  utm_campaign text,
  utm_content text,
  visitor_uuid text,
  ip_address inet,
  user_agent text,
  notes text
);

create index if not exists idx_webinar_track_batch on public.webinar_registrations(track, batch_id);
create index if not exists idx_webinar_email on public.webinar_registrations(email);
create index if not exists idx_webinar_created on public.webinar_registrations(created_at desc);

create table if not exists public.visitor_sessions (
  id uuid default gen_random_uuid() primary key,
  visitor_uuid text not null unique,
  email text,
  first_seen timestamptz default now(),
  last_seen timestamptz default now(),
  pages_visited jsonb default '[]'::jsonb,
  utm_source text,
  utm_campaign text,
  utm_content text,
  abandoned_demo_track text,
  status text default 'anonymous' check (status in ('anonymous', 'identified', 'registered', 'attended', 'converted')),
  ip_address inet,
  user_agent text,
  referrer text
);

create index if not exists idx_visitor_uuid on public.visitor_sessions(visitor_uuid);
create index if not exists idx_visitor_email on public.visitor_sessions(email);
create index if not exists idx_visitor_status on public.visitor_sessions(status);

create table if not exists public.webinar_batches (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  track text not null check (track in ('pro', 'homeowner')),
  attendee_count int not null,
  scheduled_at timestamptz,
  meet_link text,
  saimir_notified_at timestamptz,
  saimir_confirmed_at timestamptz,
  status text default 'pending_saimir' check (status in ('pending_saimir', 'scheduled', 'completed', 'cancelled')),
  notification_payload jsonb default '{}'::jsonb
);

alter table public.webinar_registrations enable row level security;
alter table public.visitor_sessions enable row level security;
alter table public.webinar_batches enable row level security;

drop policy if exists "Anonymous inserts webinar regs" on public.webinar_registrations;
create policy "Anonymous inserts webinar regs"
  on public.webinar_registrations
  for insert
  to anon
  with check (true);

drop policy if exists "Anonymous inserts visitors" on public.visitor_sessions;
create policy "Anonymous inserts visitors"
  on public.visitor_sessions
  for insert
  to anon
  with check (true);

drop policy if exists "Anonymous updates visitors" on public.visitor_sessions;
create policy "Anonymous updates visitors"
  on public.visitor_sessions
  for update
  to anon
  using (true)
  with check (true);

select cron.unschedule(jobid)
from cron.job
where jobname = 'webinar_auto_batcher_15min';

select cron.schedule(
  'webinar_auto_batcher_15min',
  '*/15 * * * *',
  $$
  select net.http_post(
    url := 'https://hvpsxeytbvbytyjudtyb.supabase.co/functions/v1/webinar-auto-batcher',
    headers := '{"Content-Type":"application/json"}'::jsonb,
    body := '{"source":"pg_cron"}'::jsonb,
    timeout_milliseconds := 30000
  );
  $$
);
