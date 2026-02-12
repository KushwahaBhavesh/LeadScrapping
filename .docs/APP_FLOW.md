# Application Flow & User Journey Document

## AI Lead Scraping Platform

**Version**: 1.0  
**Last Updated**: 2026-02-10  
**Status**: Planning Phase

---

## 1. Entry Points

### Primary Entry Points

#### 1.1 Direct URL Access

- **URL**: `https://app.leadscraper.com`
- **Behavior**:
  - If NOT logged in → Redirect to landing page
  - If logged in → Redirect to dashboard
- **Use Case**: Returning users typing URL directly

#### 1.2 Landing Page

- **URL**: `https://leadscraper.com`
- **Elements**: Hero section, features, pricing, testimonials, CTA
- **CTAs**: "Start Free Trial", "Sign In", "View Demo"
- **Use Case**: New users discovering the product

#### 1.3 Deep Links

- **Email Verification**: `https://app.leadscraper.com/verify?token=...`
- **Password Reset**: `https://app.leadscraper.com/reset-password?token=...`
- **Shared Lead**: `https://app.leadscraper.com/leads/:id`
- **Use Case**: Email notifications, password recovery

#### 1.4 OAuth/Social Login

- **Providers**: Google, GitHub
- **Flow**: OAuth redirect → Callback → Create/login user → Dashboard
- **Use Case**: Quick signup without password

### Secondary Entry Points

#### 1.5 Search Engine

- **SEO Landing Pages**: `/use-cases/sales`, `/use-cases/marketing`
- **Behavior**: Show use case content + CTA to sign up
- **Use Case**: Organic discovery

#### 1.6 Marketing Campaigns

- **Campaign URLs**: `/?ref=campaign_name&utm_source=...`
- **Behavior**: Track campaign source, show targeted messaging
- **Use Case**: Paid ads, email campaigns

---

## 2. Core User Flows

### Flow 1: User Registration & Onboarding

**Goal**: New user creates account and completes first scraping job  
**Entry Point**: Landing page  
**Frequency**: Once per user  
**Duration**: 5-10 minutes

#### Happy Path

**Step 1: Landing Page**

- **Page**: `/`
- **Elements**:
  - Hero section with value proposition
  - "Start Free Trial" CTA button (primary)
  - "Sign In" link (secondary)
- **User Action**: Clicks "Start Free Trial"
- **Trigger**: Navigate to `/register`

**Step 2: Registration Form**

- **Page**: `/register`
- **Elements**:
  - Email input (with validation)
  - Password input (with strength indicator)
  - "Create Account" button
  - "Or sign up with Google/GitHub" buttons
  - "Already have an account? Sign in" link
- **Validation**:
  - Email format check (real-time)
  - Password strength requirements (8+ chars, 1 uppercase, 1 number)
  - Check if email already exists
- **User Actions**:
  1. Enters email
  2. Enters password (sees strength indicator)
  3. Clicks "Create Account"
- **System Action**:
  - Creates user account
  - Sends verification email
  - Generates JWT tokens
  - Sets HTTP-only cookies
- **Trigger**: Navigate to `/verify-email`

**Step 3: Email Verification Prompt**

- **Page**: `/verify-email`
- **Elements**:
  - "Check your email" message
  - Email address displayed
  - "Resend verification email" link
  - "Change email address" link
- **User Action**: Opens email, clicks verification link
- **Trigger**: Navigate to `/verify?token=...`

**Step 4: Email Verification**

- **Page**: `/verify?token=...`
- **System Actions**:
  - Validates token
  - Marks email as verified
  - Logs user in
- **Trigger**: Navigate to `/dashboard` with welcome modal

**Step 5: Welcome Modal (Onboarding)**

- **Page**: `/dashboard` (with modal overlay)
- **Elements**:
  - "Welcome to LeadScraper!" heading
  - "Get started in 3 steps" checklist:
    1. ✅ Create account (completed)
    2. ⏳ Scrape your first lead
    3. ⏳ Export your leads
  - "Start Scraping" CTA button
  - "Skip tutorial" link
- **User Action**: Clicks "Start Scraping"
- **Trigger**: Close modal, highlight scraping button in sidebar

**Step 6: First Scraping Job**

- **Page**: `/dashboard/scrape`
- **Elements**:
  - URL input field (highlighted with tooltip)
  - "Scrape Now" button
  - Credit cost estimate: "1 credit"
- **User Action**:
  1. Enters URL (e.g., competitor's contact page)
  2. Clicks "Scrape Now"
- **System Actions**:
  - Validates URL
  - Creates scraping job
  - Deducts 1 credit
  - Starts scraping
- **Trigger**: Navigate to `/dashboard/jobs/:id` (job detail page)

**Step 7: Job Progress**

- **Page**: `/dashboard/jobs/:id`
- **Elements**:
  - Progress bar (0% → 100%)
  - Status: "Processing..."
  - Real-time updates via WebSocket
  - Estimated time remaining
- **System Actions**:
  - Scrapes page
  - Extracts data (emails, phones, company info)
  - Qualifies lead with AI
  - Saves to database
- **Duration**: 5-15 seconds
- **Trigger**: Job completes, show results

**Step 8: Results Preview**

- **Page**: `/dashboard/jobs/:id` (completed state)
- **Elements**:
  - Success message: "Found 3 leads!"
  - Lead preview cards:
    - Email, phone, company name
    - Lead score badge (Hot/Warm/Cold)
    - AI qualification notes
  - "Save to Dashboard" button (primary)
  - "Export CSV" button (secondary)
- **User Action**: Clicks "Save to Dashboard"
- **Trigger**: Navigate to `/dashboard/leads` with success toast

**Step 9: Leads Dashboard**

- **Page**: `/dashboard/leads`
- **Elements**:
  - Success toast: "3 leads saved!"
  - Leads table with new leads highlighted
  - Onboarding checklist updated:
    1. ✅ Create account
    2. ✅ Scrape your first lead
    3. ⏳ Export your leads
  - "Export" button highlighted
- **User Action**: Selects leads, clicks "Export"
- **Trigger**: Download CSV file

**Step 10: Onboarding Complete**

- **Elements**:
  - Confetti animation 🎉
  - Success modal: "You're all set!"
  - Onboarding checklist:
    1. ✅ Create account
    2. ✅ Scrape your first lead
    3. ✅ Export your leads
  - "Explore Dashboard" button
- **User Action**: Clicks "Explore Dashboard"
- **Trigger**: Close modal, onboarding complete

#### Error States

**Error 1: Email Already Exists**

- **Display**: Inline error below email input
- **Message**: "This email is already registered. [Sign in instead](#)"
- **Action**: User clicks "Sign in instead" → Navigate to `/login`

**Error 2: Weak Password**

- **Display**: Password strength indicator (red)
- **Message**: "Password must be at least 8 characters with 1 uppercase and 1 number"
- **Action**: User strengthens password, indicator turns green

**Error 3: Email Verification Link Expired**

- **Display**: Error page
- **Message**: "Verification link expired. [Resend verification email](#)"
- **Action**: User clicks link, new email sent

**Error 4: Invalid URL in Scraping**

- **Display**: Inline error below URL input
- **Message**: "Please enter a valid URL (e.g., https://example.com)"
- **Action**: User corrects URL, error clears

**Error 5: Insufficient Credits**

- **Display**: Modal overlay
- **Message**: "You don't have enough credits. [Buy credits](#) or [Upgrade plan](#)"
- **Action**: User buys credits or upgrades plan

#### Edge Cases

**Edge 1: User Closes Browser Mid-Registration**

- **Behavior**: Form data NOT saved (security)
- **Recovery**: User must re-enter information

**Edge 2: User Doesn't Verify Email**

- **Behavior**:
  - Can still access dashboard (limited features)
  - Banner at top: "Please verify your email to unlock all features"
  - Reminder email sent after 24 hours
- **Recovery**: User clicks verification link anytime

**Edge 3: User Abandons Onboarding**

- **Behavior**:
  - Onboarding checklist persists across sessions
  - Can resume anytime from dashboard
- **Recovery**: User completes steps at their own pace

**Edge 4: Scraping Job Fails**

- **Display**: Error message on job detail page
- **Message**: "Scraping failed: [reason]. [Retry](#) or [Contact support](#)"
- **Action**: User retries or contacts support

#### Exit Points

- **Success**: Dashboard with leads saved
- **Abandonment**: User closes browser (can resume later)
- **Error**: Support contact or retry

---

### Flow 2: Bulk URL Scraping

**Goal**: User scrapes 100+ URLs at once  
**Entry Point**: Dashboard  
**Frequency**: Weekly  
**Duration**: 15-20 minutes

#### Happy Path

**Step 1: Navigate to Scraping Interface**

- **Page**: `/dashboard`
- **User Action**: Clicks "New Scraping Job" button in sidebar
- **Trigger**: Navigate to `/dashboard/scrape`

**Step 2: Select Bulk Input Method**

- **Page**: `/dashboard/scrape`
- **Elements**:
  - Tab navigation: "Single URL" | "Bulk URLs" | "Sitemap"
  - User selects "Bulk URLs" tab
- **Trigger**: Show bulk input interface

**Step 3: Bulk Input Interface**

- **Elements**:
  - **Option 1**: "Upload CSV" button
  - **Option 2**: Textarea for pasted URLs
  - Format instructions: "One URL per line or upload CSV with 'url' column"
  - Example shown
- **User Action**: Clicks "Upload CSV"
- **Trigger**: File picker opens

**Step 4: Upload CSV File**

- **User Action**: Selects CSV file (500 URLs)
- **System Actions**:
  - Validates file format
  - Parses CSV
  - Validates each URL
  - Shows preview
- **Trigger**: Display validation results

**Step 5: Validation Results**

- **Elements**:
  - Summary: "500 URLs found, 495 valid, 5 invalid"
  - Invalid URLs table (expandable):
    - Row 23: "htp://example.com" → Error: "Invalid protocol"
    - Row 156: "example" → Error: "Missing protocol"
    - Row 289: "" → Error: "Empty URL"
  - Actions:
    - "Fix Invalid URLs" (opens editor)
    - "Remove Invalid URLs"
    - "Cancel"
- **User Action**: Clicks "Remove Invalid URLs"
- **Trigger**: Invalid URLs removed, show 495 valid URLs

**Step 6: Credit Estimate**

- **Elements**:
  - Credit calculation:
    - Base: 495 URLs × 1 credit = 495 credits
    - Estimated data: 495 URLs × 0.5 MB avg × 1 credit/MB = ~248 credits
    - **Total estimate**: ~743 credits
  - Current balance: 1,000 credits
  - Remaining after: ~257 credits
  - Warning (if low): "This will use 74% of your credits"
- **User Action**: Reviews estimate, clicks "Confirm & Start Scraping"
- **Trigger**: Create bulk scraping job

**Step 7: Job Creation**

- **System Actions**:
  - Creates scraping job in database
  - Deducts estimated credits (refund if less used)
  - Queues URLs in job queue (Inngest)
  - Assigns job ID
- **Trigger**: Navigate to `/dashboard/jobs/:id`

**Step 8: Job Progress Tracking**

- **Page**: `/dashboard/jobs/:id`
- **Elements**:
  - Job header:
    - Status badge: "Processing"
    - Created: "2 minutes ago"
  - Progress bar: 45/495 complete (9%)
  - Estimated time remaining: "8 minutes"
  - Real-time stats:
    - Processed: 45
    - Successful: 42
    - Failed: 3
    - Leads found: 127
  - Recent activity feed (live updates):
    - "✅ example.com - 3 leads found"
    - "✅ company.com - 2 leads found"
    - "❌ blocked-site.com - Failed: Rate limited"
  - Actions:
    - "Pause Job" button
    - "Cancel Job" button
- **System Actions**:
  - Processes URLs concurrently (10 at a time)
  - Updates progress in real-time (WebSocket)
  - Handles failures gracefully (retry 3x)
- **Duration**: 8-10 minutes for 495 URLs

**Step 9: Job Completion**

- **Page**: `/dashboard/jobs/:id` (completed state)
- **Elements**:
  - Status badge: "Completed" (green)
  - Completion time: "Completed in 9 minutes 23 seconds"
  - Final stats:
    - Total URLs: 495
    - Successful: 487 (98.4%)
    - Failed: 8 (1.6%)
    - Leads found: 1,243
    - Credits used: 712 (refund: 31 credits)
  - Failed URLs table (expandable):
    - Shows 8 failed URLs with error reasons
    - "Retry Failed" button
  - Actions:
    - "View Leads" button (primary)
    - "Export CSV" button
    - "Download Report" button
- **User Action**: Clicks "View Leads"
- **Trigger**: Navigate to `/dashboard/leads?job_id=:id`

**Step 10: Filter and Review Leads**

- **Page**: `/dashboard/leads?job_id=:id`
- **Elements**:
  - Filter bar:
    - Job filter: "Bulk Job #123" (pre-selected)
    - Score filter: "All" | "Hot (70-100)" | "Warm (40-69)" | "Cold (0-39)"
    - Date filter: "Today"
  - Leads table (1,243 rows):
    - Columns: Email, Phone, Company, Score, Status, Source, Date
    - Sortable by any column
    - Bulk select checkbox
  - Stats cards:
    - Hot leads: 312 (25%)
    - Warm leads: 623 (50%)
    - Cold leads: 308 (25%)
- **User Action**:
  1. Filters by "Hot" leads (312 results)
  2. Selects all hot leads
  3. Clicks "Export Selected"
- **Trigger**: Download CSV with 312 hot leads

**Step 11: Export Complete**

- **Elements**:
  - Success toast: "312 leads exported successfully"
  - Download starts automatically
  - CSV filename: `hot-leads-2026-02-10.csv`
- **User Action**: Opens CSV in Excel/Google Sheets
- **Result**: User has qualified leads ready for outreach

#### Error States

**Error 1: CSV Format Invalid**

- **Display**: Error modal
- **Message**: "Invalid CSV format. Please ensure your file has a 'url' column."
- **Action**: User fixes CSV, re-uploads

**Error 2: File Too Large**

- **Display**: Error toast
- **Message**: "File too large. Maximum 10,000 URLs per job."
- **Action**: User splits file, uploads in batches

**Error 3: Insufficient Credits**

- **Display**: Modal overlay (before job starts)
- **Message**: "You need 743 credits but only have 500. [Buy 500 credits for $50](#)"
- **Action**: User buys credits or reduces URL count

**Error 4: Job Fails Mid-Processing**

- **Display**: Error banner on job page
- **Message**: "Job paused due to system error. [Resume](#) or [Contact support](#)"
- **Action**: User resumes job (continues from last successful URL)

#### Edge Cases

**Edge 1: User Closes Browser During Job**

- **Behavior**: Job continues processing in background
- **Recovery**: User returns, sees updated progress

**Edge 2: Some URLs Block Scraper**

- **Behavior**:
  - Mark as failed
  - Continue with remaining URLs
  - Show failed URLs in report
- **Recovery**: User can retry failed URLs separately

**Edge 3: User Runs Out of Credits Mid-Job**

- **Behavior**:
  - Job pauses
  - Modal: "Out of credits. [Buy credits](#) to resume"
- **Recovery**: User buys credits, job resumes

---

### Flow 3: Lead Management & Export

**Goal**: User filters, reviews, and exports qualified leads  
**Entry Point**: Dashboard  
**Frequency**: Daily  
**Duration**: 5-10 minutes

#### Happy Path

**Step 1: Navigate to Leads**

- **Page**: `/dashboard`
- **User Action**: Clicks "Leads" in sidebar
- **Trigger**: Navigate to `/dashboard/leads`

**Step 2: Leads Table View**

- **Page**: `/dashboard/leads`
- **Elements**:
  - Header:
    - Total leads count: "1,243 leads"
    - Search bar (placeholder: "Search by email, company, or phone")
    - Filter button
    - Export button
  - Filters (collapsible):
    - Score range slider (0-100)
    - Status: Hot | Warm | Cold
    - Date range picker
    - Source (job selector)
  - Leads table:
    - Columns: [Checkbox] | Email | Phone | Company | Score | Status | Source | Date | Actions
    - Pagination: 50 per page
    - Sort indicators on headers
- **User Action**: Clicks filter button
- **Trigger**: Expand filter panel

**Step 3: Apply Filters**

- **User Actions**:
  1. Sets score range: 70-100 (Hot leads)
  2. Sets date range: Last 7 days
  3. Clicks "Apply Filters"
- **System Actions**:
  - Queries database with filters
  - Updates table (312 results)
  - Updates URL: `/dashboard/leads?score_min=70&date_range=7d`
- **Trigger**: Table refreshes with filtered results

**Step 4: Review Lead Details**

- **User Action**: Clicks on a lead row
- **Trigger**: Open lead detail modal

**Step 5: Lead Detail Modal**

- **Elements**:
  - Header:
    - Lead score badge: "85 - Hot Lead"
    - Actions: Edit | Delete | Export
  - Contact Information:
    - Email: john.doe@example.com (verified ✅)
    - Phone: +1-555-0100
    - Name: John Doe
    - Job Title: VP of Sales
    - Company: Example Corp
  - Social Profiles:
    - LinkedIn: [link]
    - Twitter: [link]
  - AI Qualification:
    - Score: 85/100
    - Notes: "Company recently raised Series A funding. Hiring for sales roles. High buying intent."
    - Signals detected:
      - 🔥 Hiring (3 open sales positions)
      - 💰 Recent funding ($5M Series A)
      - 📈 Growing company (50-100 employees)
  - Enrichment Data:
    - Company size: 75 employees
    - Industry: SaaS
    - Location: San Francisco, CA
    - Revenue: $5M-$10M (estimated)
  - Source:
    - Scraped from: example.com/about
    - Job: Bulk Job #123
    - Date: 2026-02-10 10:30 AM
- **User Action**: Reviews data, closes modal
- **Trigger**: Return to leads table

**Step 6: Bulk Select Leads**

- **User Actions**:
  1. Clicks "Select all" checkbox (selects all 312 filtered leads)
  2. Clicks "Export" button
- **Trigger**: Open export modal

**Step 7: Export Modal**

- **Elements**:
  - Export format:
    - ○ CSV (default)
    - ○ JSON
    - ○ Excel (.xlsx)
  - Fields to include (checkboxes):
    - ✅ Email
    - ✅ Phone
    - ✅ Name
    - ✅ Company
    - ✅ Job Title
    - ✅ Lead Score
    - ✅ AI Notes
    - ☐ Social Profiles
    - ☐ Enrichment Data
  - Filename: `leads-export-2026-02-10.csv` (editable)
  - "Export" button
- **User Action**:
  1. Selects CSV format
  2. Checks all fields
  3. Clicks "Export"
- **Trigger**: Generate and download CSV

**Step 8: Export Complete**

- **System Actions**:
  - Generates CSV file
  - Logs export event
  - Triggers download
- **Elements**:
  - Success toast: "312 leads exported successfully"
  - Download starts automatically
- **User Action**: Opens CSV file
- **Result**: User has leads ready for CRM import or outreach

#### Error States

**Error 1: No Leads Selected**

- **Display**: Warning toast
- **Message**: "Please select at least one lead to export"
- **Action**: User selects leads

**Error 2: Export Too Large**

- **Display**: Warning modal
- **Message**: "Exporting 10,000+ leads may take a few minutes. [Continue](#) or [Filter results](#)"
- **Action**: User waits or filters

#### Edge Cases

**Edge 1: User Exports Same Leads Multiple Times**

- **Behavior**: Allow (no restriction)
- **Tracking**: Log each export event

**Edge 2: User Deletes Leads**

- **Behavior**:
  - Confirmation modal: "Delete 5 leads? This cannot be undone."
  - On confirm: Soft delete (mark as deleted, keep in DB for 30 days)
- **Recovery**: Contact support within 30 days

---

## 3. Navigation Map

### Primary Navigation (Sidebar)

```
Dashboard (/)
├── Overview (/dashboard)
│   ├── Stats cards
│   ├── Recent jobs
│   └── Quick actions
│
├── Scraping (/dashboard/scrape)
│   ├── Single URL
│   ├── Bulk URLs
│   └── Sitemap
│
├── Jobs (/dashboard/jobs)
│   ├── Active jobs
│   ├── Completed jobs
│   └── Failed jobs
│   └── Job detail (/dashboard/jobs/:id)
│
├── Leads (/dashboard/leads)
│   ├── All leads
│   ├── Hot leads (filter)
│   ├── Warm leads (filter)
│   ├── Cold leads (filter)
│   └── Lead detail (modal)
│
├── Analytics (/dashboard/analytics)
│   ├── Overview
│   ├── Lead quality trends
│   ├── Success rates
│   └── Usage statistics
│
└── Settings (/dashboard/settings)
    ├── Profile (/dashboard/settings/profile)
    ├── Team (/dashboard/settings/team)
    ├── API Keys (/dashboard/settings/api-keys)
    ├── Webhooks (/dashboard/settings/webhooks)
    ├── Integrations (/dashboard/settings/integrations)
    └── Billing (/dashboard/settings/billing)
```

### Top Navigation (Header)

```
[Logo] [Search] [Credits: 257] [Notifications] [User Menu]
                                                    ├── Profile
                                                    ├── Settings
                                                    ├── Help
                                                    └── Logout
```

### Navigation Rules

**Authentication Required**:

- All `/dashboard/*` routes require authentication
- Unauthenticated users redirected to `/login`

**Redirect Logic**:

- After login → `/dashboard`
- After registration → `/verify-email`
- After email verification → `/dashboard` (with welcome modal)
- After logout → `/` (landing page)

**Back Button Behavior**:

- Preserves filters and pagination state
- Modal close returns to previous page
- Form abandonment shows confirmation dialog

---

## 4. Screen Inventory

### Screen: Dashboard Overview

- **Route**: `/dashboard`
- **Access**: Authenticated users
- **Purpose**: High-level overview of account activity
- **Key Elements**:
  - Stats cards: Total leads, Success rate, Credits remaining, Active jobs
  - Recent jobs table (5 most recent)
  - Quick actions: "New Scraping Job", "View All Leads", "Buy Credits"
  - Activity feed (real-time updates)
- **Actions**:
  - Click stat card → Navigate to relevant page
  - Click "New Scraping Job" → `/dashboard/scrape`
  - Click job row → `/dashboard/jobs/:id`
- **State Variants**:
  - **Empty**: No jobs yet (show onboarding)
  - **Loading**: Skeleton screens
  - **Error**: Error message with retry button

### Screen: Scraping Interface

- **Route**: `/dashboard/scrape`
- **Access**: Authenticated users
- **Purpose**: Create new scraping jobs
- **Key Elements**:
  - Tab navigation: Single | Bulk | Sitemap
  - URL input (single) or CSV upload (bulk)
  - Advanced options (collapsible)
  - Credit cost estimate
  - "Start Scraping" button
- **Actions**:
  - Submit form → Create job → `/dashboard/jobs/:id`
  - Upload CSV → Validate → Show preview
- **State Variants**:
  - **Empty**: Clean form
  - **Validating**: Loading spinner
  - **Error**: Inline error messages
  - **Success**: Job created, redirect

### Screen: Job Detail

- **Route**: `/dashboard/jobs/:id`
- **Access**: Authenticated users (own jobs only)
- **Purpose**: Monitor scraping job progress
- **Key Elements**:
  - Job status badge
  - Progress bar
  - Real-time stats
  - Activity feed
  - Actions: Pause, Cancel, View Leads, Export
- **Actions**:
  - "View Leads" → `/dashboard/leads?job_id=:id`
  - "Export" → Download CSV
  - "Pause" → Pause job
  - "Cancel" → Cancel job (confirmation modal)
- **State Variants**:
  - **Pending**: Queued, waiting to start
  - **Processing**: Progress bar, real-time updates
  - **Completed**: Final stats, view leads
  - **Failed**: Error message, retry option
  - **Cancelled**: Cancelled message, partial results

### Screen: Leads Table

- **Route**: `/dashboard/leads`
- **Access**: Authenticated users
- **Purpose**: View, filter, and export leads
- **Key Elements**:
  - Search bar
  - Filters (score, status, date, source)
  - Sortable table
  - Bulk actions
  - Pagination
- **Actions**:
  - Click row → Open lead detail modal
  - Select leads + Export → Download CSV
  - Select leads + Delete → Delete confirmation
  - Apply filters → Update table
- **State Variants**:
  - **Empty**: No leads yet (CTA to scrape)
  - **Loading**: Skeleton table
  - **Error**: Error message with retry
  - **Filtered**: Show active filters, clear button

### Screen: Analytics Dashboard

- **Route**: `/dashboard/analytics`
- **Access**: Authenticated users
- **Purpose**: View usage and performance metrics
- **Key Elements**:
  - Date range picker
  - Charts: Leads over time, Quality distribution, Success rate, Top sources
  - Export analytics button
- **Actions**:
  - Change date range → Update charts
  - Export → Download analytics report
- **State Variants**:
  - **Loading**: Skeleton charts
  - **Empty**: No data yet
  - **Error**: Error message

### Screen: Settings

- **Route**: `/dashboard/settings/*`
- **Access**: Authenticated users
- **Purpose**: Manage account, team, integrations
- **Sub-pages**:
  - Profile: Edit name, email, password, avatar
  - Team: Invite members, manage roles
  - API Keys: Generate, revoke, view usage
  - Webhooks: Register endpoints, view logs
  - Integrations: Connect CRM, Zapier, etc.
  - Billing: View plan, usage, payment method
- **Actions**: Vary by sub-page
- **State Variants**: Vary by sub-page

---

## 5. Decision Points

### Decision: User Authentication Status

```
IF user is NOT logged in
  THEN show: Landing page OR Login page
  AND redirect: Protected routes → /login
ELSE IF user IS logged in
  THEN show: Dashboard
  AND enable: All features
  AND redirect: /login → /dashboard
```

### Decision: Email Verification Status

```
IF user email is NOT verified
  THEN show: Verification banner in dashboard
  AND limit: Some features (e.g., API access)
  AND send: Reminder email after 24 hours
ELSE IF user email IS verified
  THEN enable: All features
```

### Decision: Credit Balance

```
IF credits < job cost
  THEN show: "Insufficient credits" modal
  AND disable: "Start Scraping" button
  AND suggest: Buy credits OR Upgrade plan
ELSE IF credits >= job cost
  THEN enable: "Start Scraping" button
  AND deduct: Credits on job creation
```

### Decision: Job Status

```
IF job status = 'pending'
  THEN show: "Queued" badge
  AND display: Position in queue
ELSE IF job status = 'processing'
  THEN show: Progress bar
  AND update: Real-time via WebSocket
ELSE IF job status = 'completed'
  THEN show: "Completed" badge
  AND enable: "View Leads" button
ELSE IF job status = 'failed'
  THEN show: "Failed" badge
  AND display: Error message
  AND enable: "Retry" button
```

### Decision: Lead Score

```
IF lead_score >= 70
  THEN status = 'hot'
  AND badge_color = 'red'
ELSE IF lead_score >= 40
  THEN status = 'warm'
  AND badge_color = 'yellow'
ELSE
  THEN status = 'cold'
  AND badge_color = 'blue'
```

---

## 6. Error Handling Flows

### 404 Not Found

- **Display**: Custom 404 page
- **Elements**:
  - Heading: "Page not found"
  - Message: "The page you're looking for doesn't exist."
  - Actions:
    - "Go to Dashboard" button
    - Search bar
    - Popular pages links
- **Logging**: Log 404 errors for fixing broken links

### 500 Server Error

- **Display**: Custom 500 page
- **Elements**:
  - Heading: "Something went wrong"
  - Message: "We're working on fixing this. Please try again."
  - Actions:
    - "Retry" button
    - "Contact Support" link
- **Fallback**: Save user's work if possible (e.g., form data)

### Network Offline

- **Display**: Offline banner (top of page)
- **Elements**:
  - Icon: WiFi off
  - Message: "You're offline. Some features may not work."
- **Actions**:
  - Queue actions for later (if applicable)
  - Auto-retry when online
- **Recovery**: Banner disappears when online

### Rate Limit Exceeded

- **Display**: Modal overlay
- **Elements**:
  - Heading: "Rate limit exceeded"
  - Message: "You've made too many requests. Please wait 60 seconds."
  - Countdown timer
- **Actions**: Wait for cooldown, then retry

---

## 7. Responsive Behavior

### Mobile-Specific Flows (< 640px)

**Navigation**:

- Hamburger menu instead of sidebar
- Bottom navigation bar for primary actions
- Swipe gestures for navigation

**Forms**:

- One field per screen (wizard-style)
- Large touch targets (48px minimum)
- Native mobile keyboards (email, tel, url)

**Tables**:

- Card view instead of table
- Swipe to reveal actions
- Infinite scroll instead of pagination

**Modals**:

- Full-screen modals
- Slide up from bottom

### Tablet-Specific Flows (640px - 1024px)

**Navigation**:

- Collapsible sidebar
- Hybrid navigation (sidebar + top bar)

**Forms**:

- Two-column layouts
- Larger touch targets

**Tables**:

- Responsive table (horizontal scroll)
- Sticky headers

### Desktop-Specific Flows (> 1024px)

**Navigation**:

- Full sidebar visible
- Breadcrumbs for deep navigation

**Forms**:

- Multi-column layouts
- Inline validation

**Tables**:

- Full-width tables
- Hover states
- Keyboard shortcuts

---

## 8. Animation & Transitions

### Page Transitions

- **Navigation**: Fade in/out (300ms, ease-in-out)
- **Modal**: Slide up from bottom (200ms, ease-out)
- **Drawer**: Slide from side (250ms, ease-in-out)
- **Toast**: Slide in from top-right (150ms, ease-out)

### Micro-interactions

- **Button Click**: Scale(0.95) + Ripple effect
- **Form Focus**: Border highlight (blue, 2px)
- **Success**: Checkmark animation (500ms)
- **Loading**: Spinner or skeleton screens
- **Hover**: Subtle scale(1.02) + shadow

### Real-time Updates

- **New Lead**: Fade in + highlight (green background, fade out after 3s)
- **Job Progress**: Smooth progress bar animation
- **Notification**: Badge pulse animation

---

**Document Status**: ✅ Complete  
**Next Review**: After implementation plan approval
