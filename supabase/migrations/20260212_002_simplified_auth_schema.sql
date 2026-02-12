-- AI Lead Scraping Platform - Updated Schema
-- Migration: 20260212_002_simplified_auth_schema.sql
-- Description: Simplified schema matching current Supabase Auth implementation

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- USERS (Simplified - Using Supabase Auth)
-- =====================================================

-- Users table (extends Supabase auth.users)
-- Supabase Auth handles: email, password, email_confirmed, etc.
-- We only store additional profile data
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  
  -- User preferences
  preferences JSONB DEFAULT '{}',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CREDITS (Per User - No Organizations Yet)
-- =====================================================

-- Credits table (simplified - per user only)
CREATE TABLE IF NOT EXISTS public.credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  balance INTEGER DEFAULT 100 CHECK (balance >= 0), -- Start with 100 free credits
  total_purchased INTEGER DEFAULT 0,
  total_used INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit transactions
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'usage', 'refund', 'bonus', 'initial')),
  description TEXT,
  job_id UUID, -- Will reference scraping_jobs
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SCRAPING & JOBS
-- =====================================================

-- Scraping jobs table (simplified - no organization)
CREATE TABLE IF NOT EXISTS public.scraping_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('single', 'bulk', 'sitemap')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  
  -- Progress tracking
  total_urls INTEGER DEFAULT 0,
  processed_urls INTEGER DEFAULT 0,
  successful_urls INTEGER DEFAULT 0,
  failed_urls INTEGER DEFAULT 0,
  leads_found INTEGER DEFAULT 0,
  
  -- Credits
  credits_used INTEGER DEFAULT 0,
  credits_estimated INTEGER DEFAULT 0,
  
  -- Configuration
  options JSONB DEFAULT '{}',
  
  -- Error handling
  error_message TEXT,
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job URLs (for bulk jobs)
CREATE TABLE IF NOT EXISTS public.job_urls (
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

-- Scraped leads table (simplified)
CREATE TABLE IF NOT EXISTS public.scraped_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
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
  
  -- Unique constraint: one lead per email per user
  UNIQUE(user_id, email)
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Credits indexes
CREATE INDEX IF NOT EXISTS idx_credits_user_id ON public.credits(user_id);

-- Credit transactions indexes
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON public.credit_transactions(created_at DESC);

-- Scraping jobs indexes
CREATE INDEX IF NOT EXISTS idx_scraping_jobs_user_id ON public.scraping_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_scraping_jobs_status ON public.scraping_jobs(status);
CREATE INDEX IF NOT EXISTS idx_scraping_jobs_created_at ON public.scraping_jobs(created_at DESC);

-- Job URLs indexes
CREATE INDEX IF NOT EXISTS idx_job_urls_job_id ON public.job_urls(job_id);
CREATE INDEX IF NOT EXISTS idx_job_urls_status ON public.job_urls(status);

-- Scraped leads indexes
CREATE INDEX IF NOT EXISTS idx_scraped_leads_user_id ON public.scraped_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_scraped_leads_job_id ON public.scraped_leads(job_id);
CREATE INDEX IF NOT EXISTS idx_scraped_leads_email ON public.scraped_leads(email);
CREATE INDEX IF NOT EXISTS idx_scraped_leads_lead_score ON public.scraped_leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_scraped_leads_lead_status ON public.scraped_leads(lead_status);
CREATE INDEX IF NOT EXISTS idx_scraped_leads_created_at ON public.scraped_leads(created_at DESC);

-- Full-text search index on leads
CREATE INDEX IF NOT EXISTS idx_scraped_leads_search ON public.scraped_leads 
  USING GIN (to_tsvector('english', 
    COALESCE(full_name, '') || ' ' || 
    COALESCE(email, '') || ' ' || 
    COALESCE(company_name, '')
  ));

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
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_scraping_jobs_updated_at ON public.scraping_jobs;
CREATE TRIGGER update_scraping_jobs_updated_at BEFORE UPDATE ON public.scraping_jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_scraped_leads_updated_at ON public.scraped_leads;
CREATE TRIGGER update_scraped_leads_updated_at BEFORE UPDATE ON public.scraped_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_credits_updated_at ON public.credits;
CREATE TRIGGER update_credits_updated_at BEFORE UPDATE ON public.credits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNCTION: Auto-create user profile on signup
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Create credits account with 100 free credits
  INSERT INTO public.credits (user_id, balance, total_purchased)
  VALUES (NEW.id, 100, 0);
  
  -- Log initial credit grant
  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (NEW.id, 100, 'initial', 'Welcome bonus - 100 free credits');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraping_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_urls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraped_leads ENABLE ROW LEVEL SECURITY;

-- Users policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Credits policies
DROP POLICY IF EXISTS "Users can view own credits" ON public.credits;
CREATE POLICY "Users can view own credits" ON public.credits
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own credit transactions" ON public.credit_transactions;
CREATE POLICY "Users can view own credit transactions" ON public.credit_transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Scraping jobs policies
DROP POLICY IF EXISTS "Users can view own jobs" ON public.scraping_jobs;
CREATE POLICY "Users can view own jobs" ON public.scraping_jobs
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create jobs" ON public.scraping_jobs;
CREATE POLICY "Users can create jobs" ON public.scraping_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own jobs" ON public.scraping_jobs;
CREATE POLICY "Users can update own jobs" ON public.scraping_jobs
  FOR UPDATE USING (auth.uid() = user_id);

-- Job URLs policies (inherit from parent job)
DROP POLICY IF EXISTS "Users can view own job URLs" ON public.job_urls;
CREATE POLICY "Users can view own job URLs" ON public.job_urls
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.scraping_jobs
      WHERE id = job_urls.job_id AND user_id = auth.uid()
    )
  );

-- Scraped leads policies
DROP POLICY IF EXISTS "Users can view own leads" ON public.scraped_leads;
CREATE POLICY "Users can view own leads" ON public.scraped_leads
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create leads" ON public.scraped_leads;
CREATE POLICY "Users can create leads" ON public.scraped_leads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own leads" ON public.scraped_leads;
CREATE POLICY "Users can update own leads" ON public.scraped_leads
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own leads" ON public.scraped_leads;
CREATE POLICY "Users can delete own leads" ON public.scraped_leads
  FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant permissions on tables
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.credits TO authenticated;
GRANT ALL ON public.credit_transactions TO authenticated;
GRANT ALL ON public.scraping_jobs TO authenticated;
GRANT ALL ON public.job_urls TO authenticated;
GRANT ALL ON public.scraped_leads TO authenticated;

-- Grant select to anon for public data (if needed in future)
GRANT SELECT ON public.users TO anon;
