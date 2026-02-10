# System Design & Architecture Document
## AI Lead Scraping Platform

**Version**: 1.0  
**Last Updated**: 2026-02-10  
**Status**: Planning Phase

---

## 1. System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Browser    │  │  Mobile Web  │  │  API Clients │          │
│  │  (Desktop)   │  │   (Touch)    │  │  (External)  │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          └──────────────────┴──────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────────┐
│                    EDGE NETWORK (Vercel)                         │
│  ┌─────────────────────────┴──────────────────────────┐         │
│  │         Next.js 14 Application (App Router)        │         │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │         │
│  │  │   Server     │  │    Server    │  │   API    │ │         │
│  │  │  Components  │  │   Actions    │  │  Routes  │ │         │
│  │  └──────┬───────┘  └──────┬───────┘  └────┬─────┘ │         │
│  └─────────┼──────────────────┼───────────────┼───────┘         │
└────────────┼──────────────────┼───────────────┼─────────────────┘
             │                  │               │
             ├──────────────────┴───────────────┤
             │                                  │
┌────────────┼──────────────────────────────────┼─────────────────┐
│            │      APPLICATION LAYER           │                 │
│  ┌─────────┴─────────┐           ┌───────────┴──────────┐      │
│  │  Authentication   │           │   Business Logic     │      │
│  │  (Supabase Auth)  │           │   (Server Actions)   │      │
│  └─────────┬─────────┘           └───────────┬──────────┘      │
│            │                                  │                 │
│  ┌─────────┴──────────────────────────────────┴──────────┐     │
│  │              MCP Integration Layer                     │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │     │
│  │  │ Lead Scraper │  │    Lead      │  │    Data     │ │     │
│  │  │  MCP Server  │  │  Qualifier   │  │ Enrichment  │ │     │
│  │  │  (Puppeteer) │  │ MCP (AI/LLM) │  │ MCP (APIs)  │ │     │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │     │
│  └─────────┼──────────────────┼──────────────────┼────────┘     │
└────────────┼──────────────────┼──────────────────┼──────────────┘
             │                  │                  │
┌────────────┼──────────────────┼──────────────────┼──────────────┐
│            │      DATA LAYER  │                  │              │
│  ┌─────────┴─────────┐  ┌─────┴──────────┐  ┌───┴──────────┐  │
│  │   PostgreSQL      │  │  Redis Cache   │  │  Job Queue   │  │
│  │   (Supabase)      │  │  (Upstash)     │  │  (Inngest)   │  │
│  │  - Users          │  │  - Sessions    │  │  - Scraping  │  │
│  │  - Leads          │  │  - API Cache   │  │  - Enrichment│  │
│  │  - Jobs           │  │  - Rate Limits │  │  - Webhooks  │  │
│  └───────────────────┘  └────────────────┘  └──────────────┘  │
└──────────────────────────────────────────────────────────────────┘
             │                  │                  │
┌────────────┼──────────────────┼──────────────────┼──────────────┐
│            │   EXTERNAL SERVICES                 │              │
│  ┌─────────┴─────────┐  ┌─────┴──────────┐  ┌───┴──────────┐  │
│  │   AI/LLM APIs     │  │  Enrichment    │  │  Monitoring  │  │
│  │  - Claude/GPT     │  │  - Clearbit    │  │  - Sentry    │  │
│  │  - Embeddings     │  │  - Hunter.io   │  │  - PostHog   │  │
│  └───────────────────┘  └────────────────┘  └──────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### Architecture Pattern
- **Type**: Monolithic (MVP) → Microservices (Scale)
- **Pattern**: Server-Side Rendering (SSR) + API Routes
- **Deployment**: Edge-first (Vercel) + Serverless Functions
- **Scalability**: Horizontal scaling with stateless design

---

## 2. Technology Stack Deep Dive

### Frontend Layer

#### Core Framework
- **Next.js 14.1.0+** (App Router)
  - **Why**: Built-in SSR, file-based routing, automatic code splitting, edge runtime support
  - **Features Used**: Server Components, Server Actions, Streaming, Parallel Routes
  - **Performance**: Automatic image optimization, font optimization, bundle analysis

#### UI Framework
- **React 18.2.0+**
  - **Why**: Component-based architecture, concurrent features, Suspense
  - **Patterns**: Server Components (default), Client Components (interactive)

#### Styling System
- **Tailwind CSS v4**
  - **Why**: Utility-first, fast development, consistent design, tree-shaking
  - **Configuration**: Custom design tokens, CSS variables for theming
  - **Components**: shadcn/ui (headless, accessible, customizable)

#### State Management
- **Client State**: Zustand 4.4.7
  - **Why**: Lightweight (1KB), TypeScript-first, minimal boilerplate
  - **Use Cases**: UI state, user preferences, temporary data
- **Server State**: React Query / SWR
  - **Why**: Automatic caching, revalidation, optimistic updates
  - **Use Cases**: API data, leads, jobs, analytics

#### Form Handling
- **React Hook Form 7.49.3+**
  - **Why**: Performance (minimal re-renders), TypeScript support
  - **Validation**: Zod 3.22.4 (type-safe schema validation)

#### Type Safety
- **TypeScript 5.3.3+**
  - **Configuration**: Strict mode enabled, path aliases
  - **Why**: Catch errors at compile time, better IDE support, self-documenting code

---

### Backend Layer

#### Runtime
- **Node.js 20.11.0 LTS**
  - **Why**: Long-term support, modern features, large ecosystem
  - **Package Manager**: pnpm 8.14.1 (faster, disk-efficient)

#### API Layer
- **Next.js API Routes + Server Actions**
  - **Why**: Unified codebase, type-safe, automatic API generation
  - **Pattern**: RESTful API for external clients, Server Actions for internal

#### Database
- **PostgreSQL 16.1** (via Supabase)
  - **Why**: ACID compliance, JSON support, full-text search, mature
  - **Features**: Row-Level Security (RLS), real-time subscriptions, pgvector for embeddings
  - **Connection**: Connection pooling via PgBouncer (6432 port)

#### Authentication
- **Supabase Auth**
  - **Strategy**: JWT (JSON Web Tokens)
  - **Token Storage**: HTTP-only cookies (secure)
  - **Token Expiry**: Access (15 min), Refresh (7 days)
  - **Providers**: Email/password, OAuth (Google, GitHub)
  - **Security**: bcrypt hashing (12 rounds), rate limiting

#### Job Queue
- **Inngest** (Primary choice)
  - **Why**: Serverless-friendly, built-in retries, observability, type-safe
  - **Use Cases**: Scraping jobs, enrichment, webhooks, scheduled tasks
  - **Alternative**: BullMQ (if self-hosted needed)

#### Caching
- **Upstash Redis**
  - **Why**: Edge-compatible, serverless, pay-per-request
  - **Use Cases**: 
    - API response caching (1 hour TTL)
    - Session storage (7 days TTL)
    - Rate limiting counters
    - Job status tracking

#### File Storage
- **Supabase Storage** (S3-compatible)
  - **Why**: Integrated with Supabase, automatic CDN, image transformations
  - **Use Cases**: Exported CSV files, scraped page screenshots, user uploads

---

### AI/MCP Layer

#### MCP Framework
- **Model Context Protocol SDK**
  - **Why**: Standardized AI integration, modular, maintainable, upgradeable

#### Custom MCP Servers

##### 1. Lead Scraper MCP Server
- **Technology**: Puppeteer/Playwright
- **Language**: TypeScript
- **Tools**:
  - `scrape_url(url, options)` - Scrape single URL
  - `scrape_sitemap(sitemap_url)` - Parse and scrape sitemap
  - `extract_emails(html)` - Extract email addresses
  - `extract_phones(html)` - Extract phone numbers
  - `extract_social(html)` - Extract social media links
- **Features**:
  - Headless browser automation
  - Anti-bot detection bypass
  - Rate limiting and retry logic
  - Proxy rotation support

##### 2. Lead Qualifier MCP Server
- **Technology**: Claude/GPT API
- **Language**: TypeScript
- **Tools**:
  - `qualify_lead(lead_data, rules)` - Qualify single lead
  - `batch_qualify(leads, rules)` - Qualify multiple leads
  - `generate_score(lead_data)` - Calculate lead score (0-100)
  - `detect_signals(content)` - Detect intent/buying signals
- **Features**:
  - Advanced prompt engineering
  - Custom scoring rules engine
  - Batch processing for efficiency
  - Confidence scoring

##### 3. Data Enrichment MCP Server
- **Technology**: External API integrations
- **Language**: TypeScript
- **Tools**:
  - `enrich_company(domain)` - Get company data (Clearbit)
  - `verify_email(email)` - Verify email validity (Hunter.io)
  - `lookup_linkedin(name, company)` - Find LinkedIn profile
  - `enrich_batch(leads)` - Batch enrichment
- **Features**:
  - Multi-provider support
  - Caching to reduce costs
  - Confidence scoring
  - Fallback providers

---

### Infrastructure

#### Hosting
- **Frontend**: Vercel
  - **Why**: Automatic deployments, edge network, zero-config
  - **Features**: Preview deployments, analytics, Web Vitals monitoring
- **Backend Services**: Railway / Fly.io
  - **Why**: Easy deployment, auto-scaling, good DX
  - **Use Cases**: MCP servers, background workers

#### Database Hosting
- **Supabase**
  - **Why**: Managed PostgreSQL, built-in auth, real-time, storage
  - **Plan**: Pro tier for production (99.9% SLA)
  - **Backup**: Daily automated backups, point-in-time recovery

#### Monitoring & Observability
- **Error Tracking**: Sentry
  - **Features**: Error grouping, source maps, release tracking
- **Analytics**: PostHog / Mixpanel
  - **Features**: Event tracking, funnels, cohorts, A/B testing
- **Logging**: Better-logging (structured JSON logs)
- **Performance**: Vercel Analytics (Core Web Vitals)

#### CDN
- **Vercel Edge Network**
  - **Why**: Global distribution, automatic caching, edge functions
  - **Coverage**: 100+ edge locations worldwide

---

## 3. Database Schema Design

### Core Tables

#### Users & Organizations
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'viewer'))
);

-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members (many-to-many)
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('admin', 'member', 'viewer')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);
```

#### Scraping Jobs & Leads
```sql
-- Scraping jobs table
CREATE TABLE scraping_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('single', 'bulk', 'sitemap')),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  total_urls INTEGER DEFAULT 0,
  processed_urls INTEGER DEFAULT 0,
  successful_urls INTEGER DEFAULT 0,
  failed_urls INTEGER DEFAULT 0,
  leads_found INTEGER DEFAULT 0,
  credits_used INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job URLs (for bulk jobs)
CREATE TABLE job_urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES scraping_jobs(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  leads_found INTEGER DEFAULT 0,
  processed_at TIMESTAMPTZ,
  error_message TEXT
);

-- Scraped leads table
CREATE TABLE scraped_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES scraping_jobs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  
  -- Contact information
  email VARCHAR(255),
  phone VARCHAR(50),
  full_name VARCHAR(255),
  company_name VARCHAR(255),
  job_title VARCHAR(255),
  
  -- Social profiles
  linkedin_url TEXT,
  twitter_url TEXT,
  facebook_url TEXT,
  
  -- Lead qualification
  lead_score INTEGER CHECK (lead_score >= 0 AND lead_score <= 100),
  lead_status VARCHAR(50) DEFAULT 'cold' CHECK (lead_status IN ('hot', 'warm', 'cold')),
  qualification_notes TEXT,
  
  -- Metadata
  source_url TEXT NOT NULL,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  enriched_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead enrichment data
CREATE TABLE lead_enrichment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES scraped_leads(id) ON DELETE CASCADE,
  provider VARCHAR(100) NOT NULL, -- 'clearbit', 'hunter', 'linkedin'
  enrichment_type VARCHAR(100) NOT NULL, -- 'company', 'email_verification', 'profile'
  data JSONB NOT NULL,
  confidence_score DECIMAL(3,2), -- 0.00 to 1.00
  enriched_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Credits & Subscriptions
```sql
-- Credits table
CREATE TABLE credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 0,
  total_purchased INTEGER DEFAULT 0,
  total_used INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Credit transactions
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- Positive for purchase, negative for usage
  transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('purchase', 'usage', 'refund', 'bonus')),
  description TEXT,
  job_id UUID REFERENCES scraping_jobs(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  plan_name VARCHAR(100) NOT NULL, -- 'free', 'starter', 'pro', 'enterprise'
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  monthly_credits INTEGER DEFAULT 0,
  stripe_subscription_id VARCHAR(255),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### API Keys & Webhooks
```sql
-- API keys
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  key_hash VARCHAR(255) UNIQUE NOT NULL, -- Hashed API key
  key_prefix VARCHAR(10) NOT NULL, -- First 8 chars for display
  scopes JSONB DEFAULT '["read"]', -- ['read', 'write', 'delete']
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhooks
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  secret VARCHAR(255) NOT NULL, -- For HMAC signature
  events TEXT[] DEFAULT ARRAY['job.completed'], -- Event types to listen for
  is_active BOOLEAN DEFAULT TRUE,
  last_triggered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhook deliveries (for debugging)
CREATE TABLE webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webhook_id UUID REFERENCES webhooks(id) ON DELETE CASCADE,
  event_type VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  response_status INTEGER,
  response_body TEXT,
  delivered_at TIMESTAMPTZ DEFAULT NOW(),
  retry_count INTEGER DEFAULT 0
);
```

### Indexes for Performance

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Scraping jobs
CREATE INDEX idx_jobs_user_id ON scraping_jobs(user_id);
CREATE INDEX idx_jobs_status ON scraping_jobs(status);
CREATE INDEX idx_jobs_created_at ON scraping_jobs(created_at DESC);
CREATE INDEX idx_jobs_user_status ON scraping_jobs(user_id, status);

-- Scraped leads
CREATE INDEX idx_leads_user_id ON scraped_leads(user_id);
CREATE INDEX idx_leads_job_id ON scraped_leads(job_id);
CREATE INDEX idx_leads_email ON scraped_leads(email);
CREATE INDEX idx_leads_company ON scraped_leads(company_name);
CREATE INDEX idx_leads_score ON scraped_leads(lead_score DESC);
CREATE INDEX idx_leads_created_at ON scraped_leads(created_at DESC);
CREATE INDEX idx_leads_user_score ON scraped_leads(user_id, lead_score DESC);

-- Full-text search on leads
CREATE INDEX idx_leads_fulltext ON scraped_leads 
  USING GIN(to_tsvector('english', coalesce(full_name, '') || ' ' || coalesce(company_name, '')));

-- Credits
CREATE INDEX idx_credits_user_id ON credits(user_id);
CREATE INDEX idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_created_at ON credit_transactions(created_at DESC);

-- API keys
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
```

### Row-Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraping_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraped_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_select_own ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can only see jobs they created or their organization's jobs
CREATE POLICY jobs_select_own ON scraping_jobs
  FOR SELECT USING (
    auth.uid() = user_id OR 
    organization_id IN (
      SELECT organization_id FROM team_members WHERE user_id = auth.uid()
    )
  );

-- Users can only see leads they scraped or their organization's leads
CREATE POLICY leads_select_own ON scraped_leads
  FOR SELECT USING (
    auth.uid() = user_id OR 
    organization_id IN (
      SELECT organization_id FROM team_members WHERE user_id = auth.uid()
    )
  );
```

---

## 4. Scalability Strategy

### MVP (10K Users) - Phase 1-2

**Architecture**: Monolithic Next.js application

**Infrastructure**:
- **Frontend**: Vercel (automatic scaling)
- **Database**: Supabase (single PostgreSQL instance)
- **Cache**: Upstash Redis (basic caching)
- **Queue**: Inngest (managed)

**Expected Load**:
- 100 concurrent scraping jobs
- 1,000 API requests/minute
- 50GB database storage
- 10,000 leads/day

**Optimizations**:
- Server Components for reduced client JS
- API route caching (1 hour TTL)
- Database query optimization
- Connection pooling (PgBouncer)

---

### Scale (100K Users) - Phase 3

**Enhancements**:
- **Database**: Read replicas for queries
- **Cache**: Advanced Redis caching strategy
- **CDN**: All static assets on edge
- **Queue**: Distributed job processing

**Expected Load**:
- 1,000 concurrent scraping jobs
- 10,000 API requests/minute
- 500GB database storage
- 100,000 leads/day

**Optimizations**:
- Database sharding by organization_id
- Multi-region deployment
- Edge functions for API routes
- Aggressive caching (80%+ hit rate)

---

### Enterprise (1M Users) - Post-Launch

**Architecture**: Microservices (if needed)

**Infrastructure**:
- **Database**: Distributed (CockroachDB or Citus)
- **Cache**: Redis cluster
- **Queue**: Distributed queue system
- **Deployment**: Multi-region, multi-cloud

**Expected Load**:
- 10,000 concurrent scraping jobs
- 100,000 API requests/minute
- 5TB+ database storage
- 1,000,000 leads/day

**Optimizations**:
- Microservices for scraping, qualification, enrichment
- Event-driven architecture
- CQRS pattern (separate read/write databases)
- GraphQL federation

---

## 5. Security Architecture

### Authentication Flow

```
1. User submits email + password
2. Server validates credentials
3. Server generates JWT access token (15 min expiry)
4. Server generates JWT refresh token (7 days expiry)
5. Tokens stored in HTTP-only cookies
6. Client includes cookies in all requests
7. Server validates token on each request
8. On access token expiry, refresh token used to get new access token
```

### Authorization (RBAC)

**Roles**:
- **Admin**: Full access to organization
- **Member**: Can create jobs, view leads, export
- **Viewer**: Read-only access

**Permissions Matrix**:
| Action | Admin | Member | Viewer |
|--------|-------|--------|--------|
| Create scraping job | ✅ | ✅ | ❌ |
| View leads | ✅ | ✅ | ✅ |
| Export leads | ✅ | ✅ | ❌ |
| Delete leads | ✅ | ✅ | ❌ |
| Manage team | ✅ | ❌ | ❌ |
| Manage billing | ✅ | ❌ | ❌ |
| API keys | ✅ | ✅ | ❌ |

### API Security

**Rate Limiting**:
- **Authenticated users**: 100 requests/minute
- **API keys**: 1,000 requests/minute (paid plans)
- **Unauthenticated**: 10 requests/minute

**API Key Security**:
- Keys hashed with bcrypt before storage
- Only first 8 characters shown in UI
- Scoped permissions (read, write, delete)
- Automatic expiry (configurable)
- Revocation capability

**Request Validation**:
- All inputs validated with Zod schemas
- SQL injection prevention (parameterized queries)
- XSS protection (sanitize HTML)
- CSRF tokens for state-changing operations

### Data Encryption

**At Rest**:
- Database: AES-256 encryption (Supabase default)
- File storage: AES-256 encryption (S3 default)
- Secrets: Encrypted environment variables

**In Transit**:
- TLS 1.3 for all connections
- HTTPS only (HSTS enabled)
- Certificate pinning for critical APIs

### OWASP Top 10 Mitigation

1. **Broken Access Control**: RLS policies, RBAC
2. **Cryptographic Failures**: TLS 1.3, AES-256, bcrypt
3. **Injection**: Parameterized queries, input validation
4. **Insecure Design**: Threat modeling, security reviews
5. **Security Misconfiguration**: Automated security scans
6. **Vulnerable Components**: Dependency scanning (Dependabot)
7. **Authentication Failures**: JWT, rate limiting, MFA (future)
8. **Software and Data Integrity**: Code signing, SRI
9. **Logging Failures**: Structured logging, Sentry
10. **SSRF**: URL validation, allowlist

---

## 6. MCP Server Integration Pattern

### MCP Server Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              MCP Client (TypeScript)                  │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │  Scraper   │  │ Qualifier  │  │ Enrichment │     │  │
│  │  │  Client    │  │  Client    │  │  Client    │     │  │
│  │  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘     │  │
│  └────────┼───────────────┼───────────────┼────────────┘  │
└───────────┼───────────────┼───────────────┼───────────────┘
            │               │               │
            │ MCP Protocol  │ MCP Protocol  │ MCP Protocol
            │ (stdio/HTTP)  │ (stdio/HTTP)  │ (stdio/HTTP)
            │               │               │
┌───────────┼───────────────┼───────────────┼───────────────┐
│  ┌────────┴──────┐  ┌─────┴──────┐  ┌─────┴──────┐       │
│  │ Lead Scraper  │  │   Lead     │  │    Data    │       │
│  │  MCP Server   │  │ Qualifier  │  │ Enrichment │       │
│  │               │  │ MCP Server │  │ MCP Server │       │
│  │  - Puppeteer  │  │ - Claude   │  │ - Clearbit │       │
│  │  - Playwright │  │ - GPT-4    │  │ - Hunter   │       │
│  │  - Regex      │  │ - Prompts  │  │ - LinkedIn │       │
│  └───────────────┘  └────────────┘  └────────────┘       │
│                   MCP Servers (Separate Processes)        │
└──────────────────────────────────────────────────────────┘
```

### MCP Communication Pattern

**Connection**: stdio (local) or HTTP (remote)

**Request/Response Flow**:
```typescript
// Client (Next.js)
const result = await mcpClient.callTool('scrape_url', {
  url: 'https://example.com',
  options: { depth: 1 }
});

// Server (MCP)
// Receives request, executes scraping, returns result
{
  success: true,
  data: {
    emails: ['contact@example.com'],
    phones: ['+1-555-0100'],
    company: 'Example Corp'
  }
}
```

### Error Handling

**Retry Strategy**:
- Automatic retry on network errors (3 attempts)
- Exponential backoff (1s, 2s, 4s)
- Circuit breaker pattern (fail fast after 5 consecutive errors)

**Fallback Mechanisms**:
- If AI qualification fails → Use rule-based scoring
- If enrichment fails → Continue with scraped data
- If scraping fails → Mark job as failed, notify user

---

## 7. Deployment Architecture

### Development Environment
```
Local Machine
├── Next.js dev server (localhost:3000)
├── Supabase local (localhost:54321)
├── Redis local (localhost:6379)
└── MCP servers (stdio)
```

### Staging Environment
```
Vercel Preview Deployment
├── Next.js (preview-*.vercel.app)
├── Supabase staging project
├── Upstash Redis staging
└── MCP servers (Railway staging)
```

### Production Environment
```
Vercel Production
├── Next.js (app.example.com)
├── Supabase production project
├── Upstash Redis production
├── MCP servers (Railway production)
└── CDN (Vercel Edge Network)
```

### CI/CD Pipeline

```
GitHub Push
    ↓
GitHub Actions
    ├── Lint (ESLint)
    ├── Type Check (TypeScript)
    ├── Unit Tests (Vitest)
    ├── Integration Tests
    └── E2E Tests (Playwright)
    ↓
Deploy to Staging (on merge to develop)
    ↓
Manual Approval
    ↓
Deploy to Production (on merge to main)
    ↓
Post-Deploy Checks
    ├── Smoke tests
    ├── Health checks
    └── Rollback if needed
```

---

## 8. Monitoring & Observability

### Metrics to Track

**Application Metrics**:
- Request rate (requests/second)
- Response time (p50, p95, p99)
- Error rate (%)
- Scraping success rate (%)
- Lead quality score (average)

**Infrastructure Metrics**:
- CPU usage (%)
- Memory usage (%)
- Database connections
- Cache hit rate (%)
- Queue depth

**Business Metrics**:
- Active users (DAU, MAU)
- Scraping jobs created
- Leads generated
- Credits consumed
- API usage

### Alerting Rules

**Critical Alerts** (PagerDuty):
- Error rate > 5%
- Response time p95 > 5s
- Database CPU > 80%
- Queue depth > 10,000

**Warning Alerts** (Slack):
- Error rate > 2%
- Response time p95 > 2s
- Cache hit rate < 70%
- Scraping success rate < 90%

---

**Document Status**: ✅ Complete  
**Next Review**: After implementation plan approval
