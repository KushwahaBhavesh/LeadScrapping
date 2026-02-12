# System Runtime Documentation

## AI Lead Scraping Platform

**Document Version**: 1.0  
**Last Updated**: 2026-02-10 11:29 IST  
**Environment**: Development (Planning Phase)  
**Status**: 🟡 Pre-Production (Documentation & Planning Complete)

---

## 1. Project Overview

### Purpose of the System

The AI Lead Scraping Platform is an intelligent web-based lead generation and qualification system designed to automate the discovery, extraction, and analysis of leads from web sources. The platform combines advanced web scraping capabilities with AI-driven lead qualification to help B2B businesses generate high-quality leads 10x faster than manual research.

### Core Business Logic

1. **Lead Extraction**: Automated scraping of contact information (emails, phones, company data, social profiles) from web pages
2. **AI Qualification**: Machine learning-based lead scoring and qualification using LLM APIs (Claude/GPT)
3. **Data Enrichment**: Enhancement of lead data with third-party APIs (Clearbit, Hunter.io)
4. **Lead Management**: CRM-lite functionality for organizing, filtering, and exporting leads
5. **Credit System**: Usage-based pricing model with credit deduction per scraping job

### Main Features Currently Active

**✅ Active (Documentation Phase)**:

- Complete product requirements documentation (PRD)
- System architecture design
- Database schema design
- Application flow documentation
- Development roadmap (12-week timeline)
- API documentation
- MCP server integration planning

**🔄 In Development**:

- None (awaiting Phase 1 implementation)

**⏳ Planned**:

- Next.js 14 application (Week 1-4)
- Supabase database setup (Week 2)
- MCP servers implementation (Week 5-7)
- Lead scraping engine (Week 5-8)
- Analytics dashboard (Week 9)
- Public API (Week 10)

---

## 2. Runtime Environment

### Current State: Planning Phase

**Status**: The project is currently in the **planning and documentation phase**. No production code has been written yet. The development environment is being prepared with MCP servers for AI integration.

### Tech Stack (Planned)

#### Frontend Layer

| Component         | Technology      | Version | Status     |
| ----------------- | --------------- | ------- | ---------- |
| Framework         | Next.js         | 14.1.0+ | 📋 Planned |
| UI Library        | React           | 18.2.0+ | 📋 Planned |
| Styling           | Tailwind CSS    | v4      | 📋 Planned |
| Component Library | shadcn/ui       | Latest  | 📋 Planned |
| State Management  | Zustand         | 4.4.7+  | 📋 Planned |
| Type Safety       | TypeScript      | 5.3.3+  | 📋 Planned |
| Form Handling     | React Hook Form | 7.49.3+ | 📋 Planned |
| Validation        | Zod             | 3.22.4+ | 📋 Planned |

#### Backend Layer

| Component         | Technology         | Version     | Status     |
| ----------------- | ------------------ | ----------- | ---------- |
| Runtime           | Node.js            | 20.11.0 LTS | 📋 Planned |
| API               | Next.js API Routes | 14.1.0+     | 📋 Planned |
| Database          | PostgreSQL         | 16.1        | 📋 Planned |
| Database Provider | Supabase           | Latest      | 📋 Planned |
| Authentication    | Supabase Auth      | Latest      | 📋 Planned |
| Job Queue         | Inngest            | Latest      | 📋 Planned |
| Caching           | Upstash Redis      | Latest      | 📋 Planned |

#### AI/MCP Layer

| Component               | Technology             | Version | Status                |
| ----------------------- | ---------------------- | ------- | --------------------- |
| MCP Framework           | Model Context Protocol | Latest  | ✅ Active (Dev Tools) |
| Magic Component Builder | @21st-dev/magic        | Latest  | ✅ Running            |
| MongoDB MCP Server      | mongodb-mcp-server     | Latest  | ✅ Running            |
| Prisma MCP Server       | prisma-mcp             | Latest  | ✅ Running            |
| Shadcn MCP Server       | shadcn-mcp             | Latest  | ✅ Running            |
| Lead Scraper MCP        | Custom (Puppeteer)     | -       | 📋 Planned (Week 5)   |
| Lead Qualifier MCP      | Custom (Claude/GPT)    | -       | 📋 Planned (Week 6)   |
| Data Enrichment MCP     | Custom (APIs)          | -       | 📋 Planned (Week 7)   |

### Runtime Versions

**Current Development Environment**:

- **OS**: Linux (Ubuntu/Debian-based)
- **Node.js**: Available (version detected from running processes)
- **npm**: Available (npx commands running)
- **Package Manager**: npm (with npx for MCP servers)

### Deployment Environment

**Current**: Local Development  
**Planned Production**:

- **Frontend**: Vercel (Edge Network)
- **Backend Services**: Railway / Fly.io
- **Database**: Supabase (Managed PostgreSQL)
- **Caching**: Upstash Redis (Serverless)
- **CDN**: Vercel Edge Network

### Environment Variables (Grouped)

**Current**: Not configured (planning phase)

**Planned Groups**:

```bash
# Database
DATABASE_URL=postgresql://...
DIRECT_DATABASE_URL=postgresql://...

# Authentication
JWT_SECRET=...
JWT_REFRESH_SECRET=...
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# AI/LLM APIs
ANTHROPIC_API_KEY=...
OPENAI_API_KEY=...

# Data Enrichment
CLEARBIT_API_KEY=...
HUNTER_API_KEY=...

# Job Queue
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...

# Caching
UPSTASH_REDIS_URL=...
UPSTASH_REDIS_TOKEN=...

# Monitoring
SENTRY_DSN=...
POSTHOG_API_KEY=...

# Application
NEXT_PUBLIC_API_URL=...
NODE_ENV=development|production
```

---

## 3. Running Services & Processes

### Currently Running Services

**MCP Servers (Development Tools)**:

| Service                 | Process                     | PID            | Purpose                         | Status     |
| ----------------------- | --------------------------- | -------------- | ------------------------------- | ---------- |
| Magic Component Builder | npm exec @21st-dev/magic    | 150098, 150141 | UI component generation         | ✅ Running |
| MongoDB MCP Server      | npm exec mongodb-mcp-server | 150152, 150167 | MongoDB integration             | ✅ Running |
| Prisma MCP Server       | npm exec prisma mcp         | 150197, 150221 | Prisma ORM integration          | ✅ Running |
| Shadcn MCP Server       | npm exec shadcn@latest mcp  | 150243, 150257 | shadcn/ui component integration | ✅ Running |

**Development Tools**:

| Service                    | Purpose                          | Status                   |
| -------------------------- | -------------------------------- | ------------------------ |
| TypeScript Language Server | Code intelligence, type checking | ✅ Running (2 instances) |
| JSON Language Server       | JSON file validation             | ✅ Running               |
| Typings Installer          | TypeScript type definitions      | ✅ Running               |

### Planned Services (Not Yet Running)

**Backend Services**:

- [ ] Next.js Development Server (Port 3000)
- [ ] Supabase Local Instance (Port 54321)
- [ ] Redis Local Instance (Port 6379)
- [ ] Lead Scraper MCP Server
- [ ] Lead Qualifier MCP Server
- [ ] Data Enrichment MCP Server

**Frontend Apps**:

- [ ] Next.js Application (SSR + Client Components)
- [ ] Dashboard Interface
- [ ] Landing Page

**Workers / Cron Jobs / Queues**:

- [ ] Inngest Job Queue (Scraping jobs)
- [ ] Webhook Delivery Worker
- [ ] Credit Deduction Worker
- [ ] Email Notification Worker

**Background Processors**:

- [ ] Lead Qualification Processor
- [ ] Data Enrichment Processor
- [ ] Export Generation Processor

**Real-time Services**:

- [ ] WebSocket Server (Job progress updates)
- [ ] Supabase Realtime (Database subscriptions)

**Third-party Integrations**:

- [ ] Anthropic Claude API (Lead qualification)
- [ ] OpenAI GPT API (Lead qualification fallback)
- [ ] Clearbit API (Company data enrichment)
- [ ] Hunter.io API (Email verification)
- [ ] Stripe API (Payment processing)

---

## 4. Server & Infrastructure

### Current Infrastructure

**Hosting Platform**: Local Development Machine  
**Environment**: Development workstation running Linux

### Planned Infrastructure

#### Hosting Platform

- **Frontend**: Vercel
  - Automatic deployments from Git
  - Edge Network (100+ locations)
  - Serverless Functions
  - Preview deployments for PRs

- **Backend Services**: Railway / Fly.io
  - Container-based deployment
  - Auto-scaling
  - Health checks
  - Zero-downtime deployments

#### Containers / VM / Serverless Details

- **Frontend**: Serverless (Vercel Edge Functions)
- **API Routes**: Serverless (Next.js API Routes on Vercel)
- **MCP Servers**: Containerized (Docker on Railway/Fly.io)
- **Database**: Managed (Supabase)
- **Cache**: Serverless (Upstash Redis)

#### Reverse Proxy / Gateway

- **Vercel Edge Network**: Automatic routing, SSL termination
- **API Gateway**: Next.js built-in routing
- **Rate Limiting**: Implemented at API route level

#### Load Balancing

- **Vercel**: Automatic load balancing across edge nodes
- **Database**: Connection pooling via PgBouncer
- **Horizontal Scaling**: Stateless design for easy scaling

#### Scaling Strategy

**MVP (10K Users)**:

- Single PostgreSQL instance (Supabase)
- Vercel auto-scaling for frontend
- Basic Redis caching
- 100 concurrent scraping jobs

**Scale (100K Users)**:

- Database read replicas
- Advanced caching strategy (80%+ hit rate)
- CDN for all static assets
- 1,000 concurrent scraping jobs

**Enterprise (1M Users)**:

- Database sharding or distributed DB (CockroachDB)
- Redis cluster
- Multi-region deployment
- 10,000 concurrent scraping jobs

---

## 5. Database Layer

### Current State

**Status**: Not yet configured (planning phase)

### Planned Databases

#### Primary Database

- **Type**: PostgreSQL 16.1
- **Provider**: Supabase (Managed)
- **Purpose**: Primary data store
- **Features**:
  - Row-Level Security (RLS)
  - Real-time subscriptions
  - Full-text search
  - JSON support (JSONB)
  - pgvector extension (for embeddings)

#### Schemas/Modules

**Core Tables**:

1. **Users & Organizations**
   - `users` - User accounts
   - `organizations` - Team workspaces
   - `team_members` - Team membership (many-to-many)

2. **Scraping & Jobs**
   - `scraping_jobs` - Job metadata and status
   - `job_urls` - URLs for bulk jobs
   - `scraped_leads` - Extracted lead data
   - `lead_enrichment` - Enriched data from APIs

3. **Credits & Billing**
   - `credits` - Credit balance per user/org
   - `credit_transactions` - Credit usage history
   - `subscriptions` - Subscription plans

4. **API & Integrations**
   - `api_keys` - API key management
   - `webhooks` - Webhook endpoints
   - `webhook_deliveries` - Delivery logs

**Indexes** (Performance):

- User email (unique)
- Job status + user_id (composite)
- Lead score (descending)
- Lead email (unique per user)
- Full-text search on leads (GIN index)

#### Active Connections

**Current**: None (database not yet set up)

**Planned**:

- **Application Pool**: 10-20 connections (via PgBouncer)
- **Direct Connections**: 2-5 (for migrations, admin)
- **Connection Pooling**: PgBouncer (port 6432)
- **Max Connections**: 100 (Supabase Pro tier)

#### Caching Layers

**Planned**:

1. **Upstash Redis** (Primary Cache)
   - **Purpose**: API response caching, session storage, rate limiting
   - **TTL Strategy**:
     - API responses: 1 hour
     - User sessions: 7 days
     - Rate limit counters: 1 minute
   - **Eviction Policy**: LRU (Least Recently Used)

2. **Next.js Cache** (Application Cache)
   - **Purpose**: Server Component caching, static page caching
   - **Strategy**: Incremental Static Regeneration (ISR)

3. **CDN Cache** (Edge Cache)
   - **Purpose**: Static assets, images
   - **Provider**: Vercel Edge Network
   - **TTL**: 1 year for immutable assets

---

## 6. API Layer

### Current State

**Status**: Not yet implemented (planning phase)

### Planned Active APIs

#### Internal APIs (Next.js API Routes)

**Authentication**:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/verify-email` - Email verification

**Scraping**:

- `POST /api/scrape` - Create scraping job (internal)
- `GET /api/jobs/:id` - Get job status (internal)
- `POST /api/jobs/:id/cancel` - Cancel job (internal)

**Leads**:

- `GET /api/leads` - List leads (internal)
- `GET /api/leads/:id` - Get lead details (internal)
- `PATCH /api/leads/:id` - Update lead (internal)
- `DELETE /api/leads/:id` - Delete lead (internal)

#### Public APIs (External Access)

**Base URL**: `https://api.leadscraper.com/v1`

**Scraping Endpoints**:

- `POST /v1/scrape` - Create scraping job
- `GET /v1/jobs/:id` - Get job status
- `GET /v1/jobs` - List jobs
- `POST /v1/jobs/:id/cancel` - Cancel job

**Leads Endpoints**:

- `GET /v1/leads` - List leads (with filters)
- `GET /v1/leads/:id` - Get lead details
- `PATCH /v1/leads/:id` - Update lead
- `DELETE /v1/leads/:id` - Delete lead
- `POST /v1/leads/export` - Export leads

**Webhooks**:

- `POST /v1/webhooks` - Register webhook
- `GET /v1/webhooks` - List webhooks
- `DELETE /v1/webhooks/:id` - Delete webhook

**API Keys**:

- `POST /v1/api-keys` - Generate API key
- `GET /v1/api-keys` - List API keys
- `DELETE /v1/api-keys/:id` - Revoke API key

**Account**:

- `GET /v1/account` - Get account info
- `GET /v1/credits/usage` - Get credit usage

### Authentication Method

**Planned**:

- **Internal**: JWT tokens in HTTP-only cookies
  - Access token: 15 minutes expiry
  - Refresh token: 7 days expiry
  - Secure, SameSite=Strict

- **Public API**: Bearer token authentication
  - API keys with scoped permissions (read, write, delete)
  - HMAC signature for webhooks

### Rate Limits / Guards

**Planned**:

| User Type    | Limit           | Window |
| ------------ | --------------- | ------ |
| Free Plan    | 100 requests    | 1 hour |
| Starter Plan | 1,000 requests  | 1 hour |
| Pro Plan     | 10,000 requests | 1 hour |
| Enterprise   | Custom          | Custom |

**Implementation**:

- Redis-based rate limiting
- Per API key tracking
- 429 response when exceeded
- `X-RateLimit-*` headers in response

**Guards**:

- Input validation (Zod schemas)
- SQL injection prevention (parameterized queries)
- XSS protection (sanitize HTML)
- CSRF tokens (state-changing operations)
- Bot detection (rate patterns, user-agent)

---

## 7. Background Jobs & Schedulers

### Current State

**Status**: Not yet implemented (planning phase)

### Planned Scheduled Tasks

**Daily Tasks**:

- Database backup (2:00 AM UTC)
- Credit balance check (3:00 AM UTC)
- Inactive user cleanup (4:00 AM UTC)
- Analytics aggregation (5:00 AM UTC)

**Hourly Tasks**:

- Webhook delivery retry (every hour)
- Failed job retry (every hour)

**Weekly Tasks**:

- Usage report generation (Monday 9:00 AM UTC)
- Subscription renewal check (Sunday 11:00 PM UTC)

### Queue Workers

**Planned (Inngest)**:

1. **Scraping Job Worker**
   - **Queue**: `scraping-jobs`
   - **Concurrency**: 100 jobs
   - **Timeout**: 5 minutes per job
   - **Priority**: High

2. **Lead Qualification Worker**
   - **Queue**: `lead-qualification`
   - **Concurrency**: 50 jobs
   - **Timeout**: 30 seconds per lead
   - **Priority**: Medium

3. **Data Enrichment Worker**
   - **Queue**: `data-enrichment`
   - **Concurrency**: 20 jobs
   - **Timeout**: 10 seconds per lead
   - **Priority**: Low

4. **Webhook Delivery Worker**
   - **Queue**: `webhook-deliveries`
   - **Concurrency**: 100 jobs
   - **Timeout**: 10 seconds per webhook
   - **Priority**: High

5. **Export Generation Worker**
   - **Queue**: `exports`
   - **Concurrency**: 10 jobs
   - **Timeout**: 2 minutes per export
   - **Priority**: Medium

### Retry Policies

**Planned**:

| Job Type      | Max Retries | Backoff Strategy         | Timeout |
| ------------- | ----------- | ------------------------ | ------- |
| Scraping      | 3           | Exponential (1s, 2s, 4s) | 5 min   |
| Qualification | 2           | Linear (5s, 10s)         | 30s     |
| Enrichment    | 3           | Exponential (2s, 4s, 8s) | 10s     |
| Webhook       | 3           | Exponential (1s, 2s, 4s) | 10s     |
| Export        | 1           | None                     | 2 min   |

### Failure Handling

**Planned**:

1. **Dead Letter Queue (DLQ)**
   - Failed jobs moved to DLQ after max retries
   - Manual review and retry capability
   - Automatic cleanup after 30 days

2. **Error Notifications**
   - Sentry error tracking
   - Slack alerts for critical failures
   - Email notifications to users (job failures)

3. **Graceful Degradation**
   - If AI qualification fails → Use rule-based scoring
   - If enrichment fails → Continue with scraped data
   - If webhook fails → Log and retry later

---

## 8. Storage & Assets

### Current State

**Status**: Not yet configured (planning phase)

### Planned File Storage

**Provider**: Supabase Storage (S3-compatible)

**Buckets**:

1. **`exports`** (Private)
   - **Purpose**: CSV/JSON export files
   - **Access**: Authenticated users only
   - **Retention**: 7 days
   - **Size Limit**: 100 MB per file

2. **`screenshots`** (Private)
   - **Purpose**: Scraped page screenshots
   - **Access**: Authenticated users only
   - **Retention**: 30 days
   - **Size Limit**: 5 MB per file

3. **`avatars`** (Public)
   - **Purpose**: User profile pictures
   - **Access**: Public (CDN)
   - **Retention**: Permanent
   - **Size Limit**: 2 MB per file

4. **`uploads`** (Private)
   - **Purpose**: CSV uploads for bulk scraping
   - **Access**: Authenticated users only
   - **Retention**: 24 hours
   - **Size Limit**: 10 MB per file

### CDN Usage

**Provider**: Vercel Edge Network

**Cached Assets**:

- Static files (JS, CSS)
- Images (Next.js Image optimization)
- Public avatars
- Landing page assets

**Cache Strategy**:

- Immutable assets: 1 year cache
- Dynamic images: 1 hour cache
- HTML pages: No cache (ISR)

### Media Processing Services

**Planned**:

1. **Image Optimization**
   - **Service**: Next.js Image component
   - **Features**: Automatic WebP conversion, responsive images, lazy loading
   - **CDN**: Vercel Image Optimization

2. **Screenshot Capture**
   - **Service**: Puppeteer (in Lead Scraper MCP)
   - **Format**: PNG, JPEG
   - **Compression**: Enabled

3. **CSV Processing**
   - **Service**: Custom parser (Papa Parse)
   - **Validation**: URL format, max 10,000 rows
   - **Streaming**: For large files

---

## 9. Security & Access Control

### Current State

**Status**: Not yet implemented (planning phase)

### Planned Auth System

**Provider**: Supabase Auth

**Authentication Methods**:

- Email/Password (bcrypt hashing, 12 rounds)
- OAuth (Google, GitHub)
- Magic Link (passwordless)

**Token Flow**:

1. User logs in → Server validates credentials
2. Server generates JWT access token (15 min expiry)
3. Server generates JWT refresh token (7 days expiry)
4. Tokens stored in HTTP-only cookies (secure, SameSite=Strict)
5. Client includes cookies in all requests
6. Server validates token on each request
7. On access token expiry → Use refresh token to get new access token

### Roles & Permissions

**Role-Based Access Control (RBAC)**:

| Role       | Permissions                                                 |
| ---------- | ----------------------------------------------------------- |
| **Admin**  | Full access to organization, manage team, billing, API keys |
| **Member** | Create jobs, view leads, export, manage own API keys        |
| **Viewer** | Read-only access to leads and jobs                          |

**Permission Matrix**:

| Action              | Admin | Member | Viewer |
| ------------------- | ----- | ------ | ------ |
| Create scraping job | ✅    | ✅     | ❌     |
| View leads          | ✅    | ✅     | ✅     |
| Export leads        | ✅    | ✅     | ❌     |
| Delete leads        | ✅    | ✅     | ❌     |
| Manage team         | ✅    | ❌     | ❌     |
| Manage billing      | ✅    | ❌     | ❌     |
| Generate API keys   | ✅    | ✅     | ❌     |

### Token/Session Flow

**Session Management**:

- Sessions stored in Redis (7 days TTL)
- Session ID in HTTP-only cookie
- Automatic session refresh on activity
- Logout invalidates session

**API Key Flow**:

1. User generates API key in dashboard
2. Server creates key, hashes with bcrypt, stores hash
3. Full key shown once (user must save)
4. API requests include `Authorization: Bearer <key>` header
5. Server hashes incoming key, compares with stored hash
6. If valid → Grant access based on key scopes

**Security Measures**:

- Password strength requirements (8+ chars, 1 uppercase, 1 number)
- Rate limiting on auth endpoints (5 attempts per 15 min)
- Email verification required for full access
- 2FA (planned for future)
- Account lockout after 10 failed login attempts

---

## 10. Monitoring & Logging

### Current State

**Status**: Not yet configured (planning phase)

### Planned Logging Services

**Structured Logging**:

- **Library**: Better-logging (JSON format)
- **Levels**: DEBUG, INFO, WARN, ERROR, FATAL
- **Output**: stdout (captured by hosting platform)

**Log Aggregation**:

- **Service**: Vercel Logs (frontend)
- **Service**: Railway/Fly.io Logs (backend)
- **Retention**: 7 days (free tier), 30 days (paid)

**Log Categories**:

- Application logs (requests, responses)
- Error logs (exceptions, stack traces)
- Audit logs (user actions, data changes)
- Security logs (auth attempts, API key usage)

### Metrics Collection

**Application Metrics**:

- **Service**: Vercel Analytics
- **Metrics**:
  - Request rate (requests/second)
  - Response time (p50, p95, p99)
  - Error rate (%)
  - Core Web Vitals (LCP, FID, CLS)

**Business Metrics**:

- **Service**: PostHog / Mixpanel
- **Metrics**:
  - Active users (DAU, MAU)
  - Scraping jobs created
  - Leads generated
  - Credits consumed
  - API usage
  - Conversion funnel

**Infrastructure Metrics**:

- **Service**: Vercel Dashboard, Railway/Fly.io Dashboard
- **Metrics**:
  - CPU usage (%)
  - Memory usage (%)
  - Database connections
  - Cache hit rate (%)
  - Queue depth

### Error Tracking

**Service**: Sentry

**Features**:

- Error grouping and deduplication
- Source maps for stack traces
- Release tracking
- User context (email, user ID)
- Breadcrumbs (user actions before error)
- Performance monitoring

**Alert Thresholds**:

- Error rate > 5% → Critical alert
- Error rate > 2% → Warning alert
- Response time p95 > 5s → Critical alert
- Response time p95 > 2s → Warning alert

### Alerting

**Channels**:

- **Critical**: PagerDuty (on-call rotation)
- **Warning**: Slack (#alerts channel)
- **Info**: Email (daily digest)

**Alert Rules**:

| Condition              | Severity | Channel   | Response Time |
| ---------------------- | -------- | --------- | ------------- |
| Error rate > 5%        | Critical | PagerDuty | 15 min        |
| Response time p95 > 5s | Critical | PagerDuty | 15 min        |
| Database CPU > 80%     | Critical | PagerDuty | 30 min        |
| Queue depth > 10,000   | Warning  | Slack     | 1 hour        |
| Error rate > 2%        | Warning  | Slack     | 1 hour        |
| Cache hit rate < 70%   | Info     | Email     | 24 hours      |

---

## 11. DevOps & CI/CD

### Current State

**Status**: Not yet configured (planning phase)

### Planned Build Pipeline

**Platform**: GitHub Actions

**Workflow Stages**:

1. **Lint & Type Check**
   - ESLint (code quality)
   - TypeScript compiler (type errors)
   - Prettier (formatting)

2. **Unit Tests**
   - Vitest (unit tests)
   - Coverage threshold: 80%

3. **Integration Tests**
   - Supertest (API tests)
   - Database integration tests

4. **E2E Tests**
   - Playwright (browser tests)
   - Critical user flows

5. **Build**
   - Next.js production build
   - Bundle size analysis
   - Lighthouse CI (performance)

6. **Security Scan**
   - Dependency vulnerability scan (Dependabot)
   - OWASP security checks
   - Secret scanning

### Deployment Steps

**Staging Deployment** (on merge to `develop`):

1. Run full CI pipeline
2. Deploy to Vercel preview environment
3. Run smoke tests
4. Notify team in Slack

**Production Deployment** (on merge to `main`):

1. Run full CI pipeline
2. Manual approval required
3. Database migrations (if any)
4. Deploy to Vercel production
5. Run smoke tests
6. Monitor error rates for 1 hour
7. Notify team in Slack

**Deployment Checklist**:

- [ ] All tests pass (unit, integration, E2E)
- [ ] Code review approved (2 approvals required)
- [ ] Security scan passed
- [ ] Performance benchmarks met (Lighthouse score > 90)
- [ ] Database migrations tested on staging
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured

### Rollback Strategy

**Automatic Rollback**:

- Error rate > 10% within 5 minutes → Auto-rollback
- Response time p95 > 10s within 5 minutes → Auto-rollback

**Manual Rollback**:

1. Revert Git commit
2. Trigger deployment pipeline
3. Verify rollback successful
4. Post-mortem analysis

**Database Rollback**:

- Migrations are reversible (down migrations)
- Database backup before each migration
- Point-in-time recovery available (Supabase)

---

## 12. Current System Status Summary

### What is Actively Running Now

**✅ Running Services**:

1. **MCP Servers (Development Tools)**:
   - Magic Component Builder (UI generation)
   - MongoDB MCP Server (database integration)
   - Prisma MCP Server (ORM integration)
   - Shadcn MCP Server (component library integration)

2. **Development Tools**:
   - TypeScript Language Server (2 instances)
   - JSON Language Server
   - Typings Installer

**📋 Documentation Complete**:

- Product Requirements Document (PRD)
- System Design & Architecture
- Application Flow & User Journeys
- Development Roadmap (12 weeks)
- API Documentation
- Task Breakdown (20 major tasks, 3 phases)

### What is Optional/Disabled

**⏸️ Not Yet Started**:

- Next.js application
- Supabase database
- Redis cache
- Custom MCP servers (Lead Scraper, Qualifier, Enrichment)
- Job queue (Inngest)
- Webhooks
- Public API
- Analytics dashboard
- Payment integration

### Known Limitations

**Current Phase Limitations**:

1. **No Production Code**: Project is in planning/documentation phase
2. **No Database**: Schema designed but not deployed
3. **No API**: Endpoints documented but not implemented
4. **No Frontend**: UI/UX designed but not built
5. **No Deployment**: Infrastructure planned but not provisioned

**Planned Limitations (MVP)**:

1. **Scalability**: MVP targets 10K users (not 1M)
2. **Features**: Only P0 features in MVP (P1/P2 post-launch)
3. **Integrations**: Limited third-party integrations initially
4. **Regions**: Single region deployment (multi-region post-launch)
5. **Support**: Email support only (no live chat initially)

### Next Steps

**Immediate (Week 1)**:

1. Initialize Next.js 14 project
2. Configure TypeScript, ESLint, Prettier
3. Setup Tailwind CSS v4 + shadcn/ui
4. Create Git repository with branch strategy

**Short-term (Week 2-4)**:

1. Setup Supabase project and database
2. Implement authentication system
3. Build design system and component library
4. Create dashboard layout

**Medium-term (Week 5-8)**:

1. Implement MCP servers (Scraper, Qualifier, Enrichment)
2. Build scraping job queue
3. Create leads management interface
4. Implement credit system

**Long-term (Week 9-12)**:

1. Add analytics dashboard
2. Implement webhooks and public API
3. Security hardening and scalability enhancements
4. E2E testing and performance optimization

---

## 📊 System Health Dashboard

### Current Status: 🟡 Planning Phase

| Component               | Status         | Notes                   |
| ----------------------- | -------------- | ----------------------- |
| Documentation           | 🟢 Complete    | All 6 documents created |
| Development Environment | 🟡 Partial     | MCP servers running     |
| Application Code        | 🔴 Not Started | Week 1-4 planned        |
| Database                | 🔴 Not Started | Week 2 planned          |
| Authentication          | 🔴 Not Started | Week 2 planned          |
| API                     | 🔴 Not Started | Week 10 planned         |
| Deployment              | 🔴 Not Started | Week 12 planned         |

### Timeline Progress

- **Planning Phase**: ✅ Complete (Week 0)
- **Phase 1 (Foundation)**: ⏳ Starting Week 1
- **Phase 2 (Core Features)**: ⏳ Starting Week 5
- **Phase 3 (Scale)**: ⏳ Starting Week 9
- **MVP Launch**: 🎯 Week 12 (2026-05-12)

---

**Document Status**: ✅ Complete  
**Last Updated**: 2026-02-10 11:29 IST  
**Next Review**: After Phase 1 completion (Week 4)

---

## 🔗 Related Documentation

- [Product Requirements Document (PRD)](./PRD.md)
- [System Design & Architecture](./SYSTEM_DESIGN.md)
- [Application Flow & User Journeys](./APP_FLOW.md)
- [Development Roadmap](./ROADMAP.md)
- [API Documentation](./API_DOCS.md)
- [Task Breakdown](../brain/9156c6f9-1b6b-4d12-8a8f-e338ca0966ec/task.md)
