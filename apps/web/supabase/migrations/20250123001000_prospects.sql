/*
 * -------------------------------------------------------
 * DMARCEngine Prospects Schema
 * This migration creates the prospects table for tracking
 * discovered companies with DMARC vulnerabilities
 * -------------------------------------------------------
 */

-- Create prospects table
create table public.prospects (
  id uuid default gen_random_uuid() primary key,
  domain text not null unique,
  company_name text not null,
  email_service text not null,
  industry text,
  estimated_monthly_emails integer not null default 0,
  estimated_revenue integer not null default 0,
  dmarc_status text not null check (dmarc_status in ('none', 'quarantine', 'reject', 'missing')),
  spf_status text not null check (spf_status in ('pass', 'fail', 'missing')),
  dkim_status text not null check (dkim_status in ('pass', 'fail', 'missing')),
  estimated_monthly_loss integer not null default 0,
  discovery_source text not null default 'builtwith',
  contact_email text,
  company_size text check (company_size in ('Small', 'Medium', 'Large')),
  status text not null default 'active' check (status in ('active', 'contacted', 'converted', 'ignored')),
  contacted_at timestamp with time zone,
  converted_at timestamp with time zone,
  notes text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create indexes for efficient querying
create index prospects_domain_idx on public.prospects (domain);
create index prospects_status_idx on public.prospects (status);
create index prospects_estimated_monthly_loss_idx on public.prospects (estimated_monthly_loss desc);
create index prospects_email_service_idx on public.prospects (email_service);
create index prospects_dmarc_status_idx on public.prospects (dmarc_status);
create index prospects_created_at_idx on public.prospects (created_at desc);
create index prospects_discovery_source_idx on public.prospects (discovery_source);

-- Create composite index for common queries
create index prospects_status_loss_idx on public.prospects (status, estimated_monthly_loss desc);

-- Add updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger prospects_updated_at
  before update on public.prospects
  for each row
  execute function public.handle_updated_at();

-- Create prospect_campaigns table for tracking outreach campaigns
create table public.prospect_campaigns (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  email_template_id text,
  target_criteria jsonb default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'active', 'paused', 'completed')),
  scheduled_at timestamp with time zone,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  prospects_count integer default 0,
  emails_sent integer default 0,
  emails_opened integer default 0,
  emails_clicked integer default 0,
  responses_received integer default 0,
  conversions integer default 0,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create indexes for campaigns
create index prospect_campaigns_status_idx on public.prospect_campaigns (status);
create index prospect_campaigns_created_by_idx on public.prospect_campaigns (created_by);
create index prospect_campaigns_created_at_idx on public.prospect_campaigns (created_at desc);

-- Add updated_at trigger for campaigns
create trigger prospect_campaigns_updated_at
  before update on public.prospect_campaigns
  for each row
  execute function public.handle_updated_at();

-- Create prospect_campaign_members table for tracking which prospects are in which campaigns
create table public.prospect_campaign_members (
  id uuid default gen_random_uuid() primary key,
  campaign_id uuid references public.prospect_campaigns(id) on delete cascade,
  prospect_id uuid references public.prospects(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'sent', 'opened', 'clicked', 'responded', 'converted', 'bounced', 'unsubscribed')),
  email_sent_at timestamp with time zone,
  email_opened_at timestamp with time zone,
  email_clicked_at timestamp with time zone,
  response_received_at timestamp with time zone,
  converted_at timestamp with time zone,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  unique(campaign_id, prospect_id)
);

-- Create indexes for campaign members
create index prospect_campaign_members_campaign_idx on public.prospect_campaign_members (campaign_id);
create index prospect_campaign_members_prospect_idx on public.prospect_campaign_members (prospect_id);
create index prospect_campaign_members_status_idx on public.prospect_campaign_members (status);

-- Add updated_at trigger for campaign members
create trigger prospect_campaign_members_updated_at
  before update on public.prospect_campaign_members
  for each row
  execute function public.handle_updated_at();

-- Create email_templates table for managing outreach templates
create table public.email_templates (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  subject text not null,
  body text not null,
  template_type text not null check (template_type in ('scare_bot', 'revenue_recovery', 'follow_up', 'competitive', 'educational')),
  variables jsonb default '[]'::jsonb, -- Array of variable names used in template
  target_services text[] default '{}', -- Which email services this template targets
  is_active boolean default true,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create indexes for email templates
create index email_templates_type_idx on public.email_templates (template_type);
create index email_templates_active_idx on public.email_templates (is_active);
create index email_templates_created_by_idx on public.email_templates (created_by);

-- Add updated_at trigger for email templates
create trigger email_templates_updated_at
  before update on public.email_templates
  for each row
  execute function public.handle_updated_at();

-- Create prospect_interactions table for tracking all touchpoints
create table public.prospect_interactions (
  id uuid default gen_random_uuid() primary key,
  prospect_id uuid references public.prospects(id) on delete cascade,
  interaction_type text not null check (interaction_type in ('email_sent', 'email_opened', 'email_clicked', 'website_visit', 'demo_requested', 'trial_started', 'phone_call', 'meeting', 'converted')),
  campaign_id uuid references public.prospect_campaigns(id) on delete set null,
  details jsonb default '{}'::jsonb,
  user_agent text,
  ip_address inet,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now() not null
);

-- Create indexes for interactions
create index prospect_interactions_prospect_idx on public.prospect_interactions (prospect_id);
create index prospect_interactions_type_idx on public.prospect_interactions (interaction_type);
create index prospect_interactions_created_at_idx on public.prospect_interactions (created_at desc);
create index prospect_interactions_campaign_idx on public.prospect_interactions (campaign_id);

-- Create RLS policies

-- Enable RLS on all tables
alter table public.prospects enable row level security;
alter table public.prospect_campaigns enable row level security;
alter table public.prospect_campaign_members enable row level security;
alter table public.email_templates enable row level security;
alter table public.prospect_interactions enable row level security;

-- Prospects policies
create policy "Prospects viewable by authenticated users"
  on public.prospects for select
  using (auth.role() = 'authenticated');

create policy "Prospects manageable by super-admins"
  on public.prospects for all
  using (
    exists (
      select 1 from public.memberships m
      join public.accounts_roles ar on m.account_role = ar.id
      where m.user_id = auth.uid()
      and ar.name = 'super-admin'
    )
  );

-- Campaigns policies  
create policy "Campaigns viewable by authenticated users"
  on public.prospect_campaigns for select
  using (auth.role() = 'authenticated');

create policy "Campaigns manageable by super-admins"
  on public.prospect_campaigns for all
  using (
    exists (
      select 1 from public.memberships m
      join public.accounts_roles ar on m.account_role = ar.id
      where m.user_id = auth.uid()
      and ar.name = 'super-admin'
    )
  );

-- Campaign members policies
create policy "Campaign members viewable by authenticated users"
  on public.prospect_campaign_members for select
  using (auth.role() = 'authenticated');

create policy "Campaign members manageable by super-admins"
  on public.prospect_campaign_members for all
  using (
    exists (
      select 1 from public.memberships m
      join public.accounts_roles ar on m.account_role = ar.id
      where m.user_id = auth.uid()
      and ar.name = 'super-admin'
    )
  );

-- Email templates policies
create policy "Email templates viewable by authenticated users"
  on public.email_templates for select
  using (auth.role() = 'authenticated');

create policy "Email templates manageable by super-admins"
  on public.email_templates for all
  using (
    exists (
      select 1 from public.memberships m
      join public.accounts_roles ar on m.account_role = ar.id
      where m.user_id = auth.uid()
      and ar.name = 'super-admin'
    )
  );

-- Interactions policies
create policy "Interactions viewable by authenticated users"
  on public.prospect_interactions for select
  using (auth.role() = 'authenticated');

create policy "Interactions insertable by authenticated users"
  on public.prospect_interactions for insert
  with check (auth.role() = 'authenticated');

-- Grant appropriate permissions
grant usage on schema public to authenticated;
grant all on public.prospects to service_role;
grant all on public.prospect_campaigns to service_role;
grant all on public.prospect_campaign_members to service_role;
grant all on public.email_templates to service_role;
grant all on public.prospect_interactions to service_role;

-- Insert some sample email templates
insert into public.email_templates (name, subject, body, template_type, variables, target_services) values
(
  'SendGrid Revenue Loss Alert',
  '{{company}} losing ${{revenueLoss}}/month to blocked order emails',
  'Hi {{firstName}},

Bad news: {{company}}.com is losing approximately ${{revenueLoss}} per month to blocked order confirmation and shipping emails.

Our automated scan found:
💰 {{blockedEmails}} order emails blocked last month
💰 {{avgOrderValue}} average order value × 23% email failure impact  
💰 Total revenue loss: ${{revenueLoss}}/month (${{annualLoss}}/year)

The issue: Your DMARC policy is set to "none" which means:
❌ Gmail/Yahoo block your SendGrid transactional emails
❌ Customers don''t receive order confirmations
❌ Support tickets increase from "Where''s my order?" 
❌ Lost sales from abandoned carts due to missing recovery emails

→ See your exact email failures: {{revenueAnalysisLink}}

This shows which emails are being blocked and the revenue impact.

Best,
{{senderName}}
Revenue Recovery Specialist, DMARCEngine

P.S. {{competitorExample}} fixed this same issue and recovered ${{competitorRecovery}}/month. Your numbers could be similar.',
  'scare_bot',
  '["company", "firstName", "revenueLoss", "blockedEmails", "avgOrderValue", "annualLoss", "revenueAnalysisLink", "senderName", "competitorExample", "competitorRecovery"]'::jsonb,
  '{"sendgrid"}'
),
(
  'Amazon SES Infrastructure Waste',
  '{{company}} SES emails failing despite Amazon infrastructure',
  'Hi {{firstName}},

Despite using Amazon SES, {{company}}.com emails are still getting blocked by Gmail and Yahoo.

The issue: SES handles delivery infrastructure perfectly, but you''re missing DMARC authentication required since Feb 2024.

Without DMARC:
❌ Gmail blocks emails from SES users
❌ Your ${{monthlySesSpend}}/month SES investment is wasted
❌ Customers aren''t receiving critical notifications

→ Free SES + DMARC integration: {{setupLink}}
Takes 5 minutes to protect your SES investment.

Best,
{{senderName}}

P.S. Don''t let missing DMARC waste your AWS infrastructure.',
  'scare_bot',
  '["company", "firstName", "monthlySesSpend", "setupLink", "senderName"]'::jsonb,
  '{"amazonses"}'
);

-- Create a function to calculate prospect statistics
create or replace function public.get_prospect_stats()
returns json as $$
declare
  result json;
begin
  select json_build_object(
    'total_prospects', count(*),
    'active_prospects', count(*) filter (where status = 'active'),
    'contacted_prospects', count(*) filter (where status = 'contacted'),
    'converted_prospects', count(*) filter (where status = 'converted'),
    'total_estimated_loss', coalesce(sum(estimated_monthly_loss), 0),
    'average_loss_per_prospect', coalesce(avg(estimated_monthly_loss), 0),
    'prospects_by_service', json_object_agg(email_service, service_count)
  )
  into result
  from (
    select 
      *,
      count(*) over (partition by email_service) as service_count
    from public.prospects
  ) t;
  
  return result;
end;
$$ language plpgsql security definer;