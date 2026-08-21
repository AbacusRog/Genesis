-- Run this in the Supabase SQL editor for the "carglass wages" project
-- (the same project already used by the timesheet app and onboarding form).

create table if not exists invoices (
  id text primary key,
  invoice_number text not null,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists invoices_invoice_number_idx
  on invoices (invoice_number);

alter table invoices enable row level security;

-- Only signed-in users can read/write invoices.
create policy "Authenticated users can manage invoices"
  on invoices
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
