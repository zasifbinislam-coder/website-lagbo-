-- ============================================================
-- Website Lagbo — initial Supabase schema
-- Paste this entire file into Supabase Dashboard → SQL Editor → New
-- query → click RUN. It's idempotent (uses IF NOT EXISTS) so it's
-- safe to run multiple times.
-- ============================================================

-- Pricing form leads (from /api/lead)
create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  ref_id          text unique not null,
  submitted_at    timestamptz default now(),
  name            text not null,
  phone           text not null,
  email           text,
  business        text,
  note            text,
  type            text,
  features        jsonb default '[]'::jsonb,
  duration        int,
  addons          jsonb default '[]'::jsonb,
  pricing         jsonb default '{}'::jsonb,
  lang            text default 'bn',
  status          text default 'new', -- new | called | building | review | live | refunded | cancelled
  ip              text,
  ua              text,
  payload         jsonb -- raw payload backup for debugging
);

create index if not exists idx_leads_ref       on public.leads(ref_id);
create index if not exists idx_leads_status    on public.leads(status);
create index if not exists idx_leads_phone     on public.leads(phone);
create index if not exists idx_leads_submitted on public.leads(submitted_at desc);

-- Contact form messages (from /api/contact)
create table if not exists public.contact_messages (
  id              uuid primary key default gen_random_uuid(),
  submitted_at    timestamptz default now(),
  name            text not null,
  phone           text not null,
  email           text,
  subject         text,
  message         text not null,
  lang            text default 'bn',
  ip              text,
  ua              text,
  status          text default 'new' -- new | replied | closed
);

create index if not exists idx_contact_submitted on public.contact_messages(submitted_at desc);
create index if not exists idx_contact_status    on public.contact_messages(status);

-- Referral attribution (when someone visits with ?ref=CODE)
create table if not exists public.referrals (
  id              uuid primary key default gen_random_uuid(),
  code            text not null,
  visited_at      timestamptz default now(),
  converted       boolean default false,
  lead_id         uuid references public.leads(id) on delete set null,
  ip              text,
  ua              text
);

create index if not exists idx_referrals_code on public.referrals(code);

-- ============================================================
-- Row-Level Security
-- All tables have RLS enabled. Our serverless functions use the
-- `service_role` key which bypasses RLS, so writes from the API
-- always work. No anon-key access — public clients cannot read or
-- write these tables. To expose data to a logged-in user later,
-- add explicit policies.
-- ============================================================

alter table public.leads            enable row level security;
alter table public.contact_messages enable row level security;
alter table public.referrals        enable row level security;

-- Payments (from /api/payment — manual MFS reconciliation flow)
create table if not exists public.payments (
  id              uuid primary key default gen_random_uuid(),
  submitted_at    timestamptz default now(),
  ref_id          text not null,                 -- order ref, e.g. WL-12345
  method          text not null,                 -- 'bkash' | 'nagad' | 'rocket' | 'upay'
  transaction_id  text not null,                 -- customer-pasted MFS TrxID
  amount          numeric,                       -- BDT, what they say they sent
  status          text default 'pending',        -- pending | verified | rejected
  verified_at     timestamptz,
  verified_by     text,
  rejection_reason text,
  customer_name   text,
  customer_phone  text,
  customer_email  text,
  note            text,
  ip              text,
  ua              text
);

create index if not exists idx_payments_ref       on public.payments(ref_id);
create index if not exists idx_payments_status    on public.payments(status);
create index if not exists idx_payments_trxid     on public.payments(transaction_id);
create index if not exists idx_payments_submitted on public.payments(submitted_at desc);

alter table public.payments enable row level security;
