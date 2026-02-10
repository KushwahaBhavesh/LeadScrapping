-- AI Lead Scraping Platform - Initial Schema
-- Migration: 20260210_001_initial_schema.sql
-- Description: Create all core tables with RLS policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- USERS & ORGANIZATIONS
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
  organization_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members (many-to-many)
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
  invited_by UUID REFERENCES public.users(id),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

-- =====================================================
-- SCRAPING & JOBS
-- =====================================================

-- Scraping jobs table
CREATE TABLE public.scraping_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('single', 'bulk', 'sitemap')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  total_urls INTEGER DEFAULT 0,
  processed_urls INTEGER DEFAULT 0,
  successful_urls INTEGER DEFAULT 0,
  failed_urls INTEGER DEFAULT 0,
  leads_found INTEGER DEFAULT 0,
  credits_used INTEGER DEFAULT 0,
  credits_estimated INTEGER DEFAULT 0,
  options JSONB DEFAULT '{}',
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job URLs (for bulk jobs)
CREATE TABLE public.job_urls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES public.scraping_jobs(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  leads_found INTEGER DEFAULT 0,
  error_message TEXT,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- LEADS
-- =====================================================

-- Scraped leads table
CREATE TABLE public.scraped_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.scraping_jobs(id) ON DELETE SET NULL,
  
  -- Contact information
  email TEXT,
  phone TEXT,
  full_name TEXT,
  job_title TEXT,
  company_name TEXT,
  
  -- Social profiles
  linkedin_url TEXT,
  twitter_url TEXT,
  facebook_url TEXT,
  
  -- Lead scoring
  lead_score INTEGER DEFAULT 0 CHECK (lead_score >= 0 AND lead_score <= 100),
  lead_status TEXT DEFAULT 'cold' CHECK (lead_status IN ('hot', 'warm', 'cold')),
  qualification_notes TEXT,
  signals_detected TEXT[],
  
  -- Metadata
  source_url TEXT NOT NULL,
  custom_notes TEXT,
  tags TEXT[],
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint: one lead per email per organization
  UNIQUE(organization_id, email)
);

-- Lead enrichment data
CREATE TABLE public.lead_enrichment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES public.scraped_leads(id) ON DELETE CASCADE,
  
  -- Enriched company data
  company_size TEXT,
  industry TEXT,
  location TEXT,
  revenue_estimate TEXT,
  employee_count INTEGER,
  
  -- Confidence scoring
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  enrichment_source TEXT,
  
  -- Raw data
  raw_data JSONB,
  
  enriched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CREDITS & BILLING
-- =====================================================

-- Credits table
CREATE TABLE public.credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 0 CHECK (balance >= 0),
  total_purchased INTEGER DEFAULT 0,
  total_used INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- One credit record per user or organization
  UNIQUE(user_id, organization_id)
);

-- Credit transactions
CREATE TABLE public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'refund', 'bonus')),
  description TEXT,
  job_id UUID REFERENCES public.scraping_jobs(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'starter', 'pro', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  monthly_credits INTEGER DEFAULT 0,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- API & INTEGRATIONS
-- =====================================================

-- API keys table
CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL,
  scopes TEXT[] DEFAULT ARRAY['read'],
  last_used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Webhooks table
CREATE TABLE public.webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  secret TEXT NOT NULL,
  events TEXT[] NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  last_triggered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Webhook deliveries (for retry tracking)
CREATE TABLE public.webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  webhook_id UUID REFERENCES public.webhooks(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'delivered', 'failed')),
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMP WITH TIME ZONE,
  next_retry_at TIMESTAMP WITH TIME ZONE,
  response_status INTEGER,
  response_body TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Users indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_organization_id ON public.users(organization_id);

-- Organizations indexes
CREATE INDEX idx_organizations_slug ON public.organizations(slug);
CREATE INDEX idx_organizations_owner_id ON public.organizations(owner_id);

-- Team members indexes
CREATE INDEX idx_team_members_organization_id ON public.team_members(organization_id);
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);

-- Scraping jobs indexes
CREATE INDEX idx_scraping_jobs_user_id ON public.scraping_jobs(user_id);
CREATE INDEX idx_scraping_jobs_organization_id ON public.scraping_jobs(organization_id);
CREATE INDEX idx_scraping_jobs_status ON public.scraping_jobs(status);
CREATE INDEX idx_scraping_jobs_created_at ON public.scraping_jobs(created_at DESC);

-- Job URLs indexes
CREATE INDEX idx_job_urls_job_id ON public.job_urls(job_id);
CREATE INDEX idx_job_urls_status ON public.job_urls(status);

-- Scraped leads indexes
CREATE INDEX idx_scraped_leads_user_id ON public.scraped_leads(user_id);
CREATE INDEX idx_scraped_leads_organization_id ON public.scraped_leads(organization_id);
CREATE INDEX idx_scraped_leads_job_id ON public.scraped_leads(job_id);
CREATE INDEX idx_scraped_leads_email ON public.scraped_leads(email);
CREATE INDEX idx_scraped_leads_lead_score ON public.scraped_leads(lead_score DESC);
CREATE INDEX idx_scraped_leads_lead_status ON public.scraped_leads(lead_status);
CREATE INDEX idx_scraped_leads_created_at ON public.scraped_leads(created_at DESC);

-- Full-text search index on leads
CREATE INDEX idx_scraped_leads_search ON public.scraped_leads 
  USING GIN (to_tsvector('english', 
    COALESCE(full_name, '') || ' ' || 
    COALESCE(email, '') || ' ' || 
    COALESCE(company_name, '')
  ));

-- Lead enrichment indexes
CREATE INDEX idx_lead_enrichment_lead_id ON public.lead_enrichment(lead_id);

-- Credits indexes
CREATE INDEX idx_credits_user_id ON public.credits(user_id);
CREATE INDEX idx_credits_organization_id ON public.credits(organization_id);

-- Credit transactions indexes
CREATE INDEX idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_organization_id ON public.credit_transactions(organization_id);
CREATE INDEX idx_credit_transactions_created_at ON public.credit_transactions(created_at DESC);

-- API keys indexes
CREATE INDEX idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX idx_api_keys_organization_id ON public.api_keys(organization_id);
CREATE INDEX idx_api_keys_key_hash ON public.api_keys(key_hash);

-- Webhooks indexes
CREATE INDEX idx_webhooks_organization_id ON public.webhooks(organization_id);
CREATE INDEX idx_webhooks_is_active ON public.webhooks(is_active);

-- Webhook deliveries indexes
CREATE INDEX idx_webhook_deliveries_webhook_id ON public.webhook_deliveries(webhook_id);
CREATE INDEX idx_webhook_deliveries_status ON public.webhook_deliveries(status);
CREATE INDEX idx_webhook_deliveries_next_retry_at ON public.webhook_deliveries(next_retry_at);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scraping_jobs_updated_at BEFORE UPDATE ON public.scraping_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scraped_leads_updated_at BEFORE UPDATE ON public.scraped_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credits_updated_at BEFORE UPDATE ON public.credits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON public.api_keys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhooks_updated_at BEFORE UPDATE ON public.webhooks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraping_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_urls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraped_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_enrichment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_deliveries ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Organizations policies
CREATE POLICY "Users can view own organization" ON public.organizations
  FOR SELECT USING (
    id IN (
      SELECT organization_id FROM public.team_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Organization owners can update" ON public.organizations
  FOR UPDATE USING (owner_id = auth.uid());

-- Scraping jobs policies
CREATE POLICY "Users can view own jobs" ON public.scraping_jobs
  FOR SELECT USING (
    user_id = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM public.team_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create jobs" ON public.scraping_jobs
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own jobs" ON public.scraping_jobs
  FOR UPDATE USING (user_id = auth.uid());

-- Scraped leads policies
CREATE POLICY "Users can view own leads" ON public.scraped_leads
  FOR SELECT USING (
    user_id = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM public.team_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create leads" ON public.scraped_leads
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own leads" ON public.scraped_leads
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own leads" ON public.scraped_leads
  FOR DELETE USING (user_id = auth.uid());

-- Credits policies
CREATE POLICY "Users can view own credits" ON public.credits
  FOR SELECT USING (
    user_id = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM public.team_members
      WHERE user_id = auth.uid()
    )
  );

-- API keys policies
CREATE POLICY "Users can view own API keys" ON public.api_keys
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create API keys" ON public.api_keys
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own API keys" ON public.api_keys
  FOR DELETE USING (user_id = auth.uid());

-- Webhooks policies
CREATE POLICY "Users can view own webhooks" ON public.webhooks
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create webhooks" ON public.webhooks
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own webhooks" ON public.webhooks
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own webhooks" ON public.webhooks
  FOR DELETE USING (user_id = auth.uid());
