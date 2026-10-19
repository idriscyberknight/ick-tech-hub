
-- Sprint 05: data structure only. Do not expose public access or enable intake.
create table public.project_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null
    constraint project_inquiries_full_name_length check (char_length(btrim(full_name)) between 1 and 120),
  email text not null
    constraint project_inquiries_email_length check (char_length(btrim(email)) between 3 and 254),
  organization text
    constraint project_inquiries_organization_length check (organization is null or char_length(organization) <= 180),
  service_category text not null
    constraint project_inquiries_service_category_valid check (
      service_category in ('Software Development', 'Artificial Intelligence', 'Cybersecurity & ICT', 'General Inquiry')
    ),
  project_description text not null
    constraint project_inquiries_description_length check (
      char_length(btrim(project_description)) between 1 and 3000
    ),
  budget_range text
    constraint project_inquiries_budget_length check (budget_range is null or char_length(budget_range) <= 80),
  timeline text
    constraint project_inquiries_timeline_length check (timeline is null or char_length(timeline) <= 80),
  privacy_consent_at timestamptz not null,
  privacy_notice_version text not null
    constraint project_inquiries_privacy_version_length check (
      char_length(btrim(privacy_notice_version)) between 1 and 40
    ),
  status text not null default 'new'
    constraint project_inquiries_status_valid check (status in ('new', 'reviewing', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.project_inquiries is
  'ICK Technologies confidential project inquiries. Sprint 05 schema only. Intake is disabled until separately approved and secured.';
comment on column public.project_inquiries.privacy_consent_at is
  'Recorded server-side only after explicit consent to the approved privacy notice; the Sprint 04 preview acknowledgment does not qualify.';

create index project_inquiries_status_created_at_idx
  on public.project_inquiries (status, created_at desc);

create function public.project_inquiries_touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $body$
begin
  new.updated_at = now();
  return new;
end;
$body$;

create trigger project_inquiries_touch_updated_at_trigger
before update on public.project_inquiries
for each row execute function public.project_inquiries_touch_updated_at();

-- Default deny: no public insert/select/update/delete policy is created.
alter table public.project_inquiries enable row level security;
alter table public.project_inquiries force row level security;

revoke all on table public.project_inquiries from public, anon, authenticated;
revoke all on function public.project_inquiries_touch_updated_at() from public, anon, authenticated;
