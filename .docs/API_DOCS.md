# API Documentation
## AI Lead Scraping Platform

**Version**: 1.0  
**Last Updated**: 2026-02-10  
**Base URL**: `https://api.leadscraper.com/v1`  
**Status**: Planning Phase

---

## 1. API Overview

### Introduction

The LeadScraper API provides programmatic access to all platform features, allowing you to:
- Create and manage scraping jobs
- Retrieve and filter leads
- Configure webhooks for real-time notifications
- Manage API keys and access control

### Authentication

All API requests require authentication using an API key.

**Header Format**:
```
Authorization: Bearer YOUR_API_KEY
```

**Example**:
```bash
curl -H "Authorization: Bearer ls_1234567890abcdef" \
  https://api.leadscraper.com/v1/leads
```

### Rate Limiting

**Limits**:
- **Free Plan**: 100 requests/hour
- **Starter Plan**: 1,000 requests/hour
- **Pro Plan**: 10,000 requests/hour
- **Enterprise Plan**: Custom limits

**Headers**:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1612137600
```

**Rate Limit Exceeded Response**:
```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Retry after 60 seconds.",
    "retry_after": 60
  }
}
```

### Pagination

All list endpoints support cursor-based pagination.

**Query Parameters**:
- `limit` (integer): Number of results per page (default: 50, max: 100)
- `cursor` (string): Cursor for next page (from previous response)

**Example Request**:
```bash
GET /v1/leads?limit=50&cursor=eyJpZCI6MTIzfQ==
```

**Example Response**:
```json
{
  "data": [...],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6MTczfQ=="
  }
}
```

### Error Handling

**Error Response Format**:
```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid URL format",
    "details": {
      "field": "url",
      "reason": "Missing protocol (http/https)"
    }
  }
}
```

**Error Codes**:
| Code | HTTP Status | Description |
|------|-------------|-------------|
| `invalid_request` | 400 | Invalid request parameters |
| `unauthorized` | 401 | Missing or invalid API key |
| `forbidden` | 403 | Insufficient permissions |
| `not_found` | 404 | Resource not found |
| `rate_limit_exceeded` | 429 | Too many requests |
| `internal_error` | 500 | Server error |
| `service_unavailable` | 503 | Service temporarily unavailable |

---

## 2. Scraping Endpoints

### Create Scraping Job

Create a new scraping job for one or more URLs.

**Endpoint**: `POST /v1/scrape`

**Request Body**:
```json
{
  "type": "single",
  "urls": ["https://example.com/contact"],
  "options": {
    "depth": 1,
    "extract_emails": true,
    "extract_phones": true,
    "extract_social": true,
    "qualify_leads": true
  }
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | string | Yes | Job type: `single`, `bulk`, or `sitemap` |
| `urls` | array | Yes | Array of URLs to scrape (max 10,000) |
| `options.depth` | integer | No | Scraping depth (default: 1, max: 3) |
| `options.extract_emails` | boolean | No | Extract emails (default: true) |
| `options.extract_phones` | boolean | No | Extract phones (default: true) |
| `options.extract_social` | boolean | No | Extract social profiles (default: true) |
| `options.qualify_leads` | boolean | No | AI lead qualification (default: true) |

**Response** (201 Created):
```json
{
  "id": "job_1234567890",
  "type": "single",
  "status": "pending",
  "total_urls": 1,
  "processed_urls": 0,
  "credits_estimated": 2,
  "created_at": "2026-02-10T10:30:00Z",
  "estimated_completion": "2026-02-10T10:30:15Z"
}
```

**Example**:
```bash
curl -X POST https://api.leadscraper.com/v1/scrape \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "bulk",
    "urls": [
      "https://example.com/contact",
      "https://company.com/about"
    ],
    "options": {
      "qualify_leads": true
    }
  }'
```

---

### Get Job Status

Retrieve the status and progress of a scraping job.

**Endpoint**: `GET /v1/jobs/:id`

**Path Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Job ID |

**Response** (200 OK):
```json
{
  "id": "job_1234567890",
  "type": "bulk",
  "status": "processing",
  "total_urls": 100,
  "processed_urls": 45,
  "successful_urls": 42,
  "failed_urls": 3,
  "leads_found": 127,
  "credits_used": 68,
  "created_at": "2026-02-10T10:30:00Z",
  "started_at": "2026-02-10T10:30:05Z",
  "estimated_completion": "2026-02-10T10:38:00Z",
  "progress_percentage": 45
}
```

**Status Values**:
- `pending`: Job queued, waiting to start
- `processing`: Job in progress
- `completed`: Job finished successfully
- `failed`: Job failed
- `cancelled`: Job cancelled by user

**Example**:
```bash
curl https://api.leadscraper.com/v1/jobs/job_1234567890 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### List Jobs

List all scraping jobs for your account.

**Endpoint**: `GET /v1/jobs`

**Query Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Filter by status: `pending`, `processing`, `completed`, `failed` |
| `type` | string | Filter by type: `single`, `bulk`, `sitemap` |
| `limit` | integer | Results per page (default: 50, max: 100) |
| `cursor` | string | Pagination cursor |

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "job_1234567890",
      "type": "bulk",
      "status": "completed",
      "total_urls": 100,
      "leads_found": 287,
      "credits_used": 152,
      "created_at": "2026-02-10T10:30:00Z",
      "completed_at": "2026-02-10T10:38:23Z"
    },
    ...
  ],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6MTczfQ=="
  }
}
```

**Example**:
```bash
curl "https://api.leadscraper.com/v1/jobs?status=completed&limit=20" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### Cancel Job

Cancel a running scraping job.

**Endpoint**: `POST /v1/jobs/:id/cancel`

**Path Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Job ID |

**Response** (200 OK):
```json
{
  "id": "job_1234567890",
  "status": "cancelled",
  "processed_urls": 45,
  "leads_found": 127,
  "message": "Job cancelled successfully. Partial results saved."
}
```

**Example**:
```bash
curl -X POST https://api.leadscraper.com/v1/jobs/job_1234567890/cancel \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## 3. Leads Endpoints

### List Leads

Retrieve all leads for your account with optional filters.

**Endpoint**: `GET /v1/leads`

**Query Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `job_id` | string | Filter by job ID |
| `score_min` | integer | Minimum lead score (0-100) |
| `score_max` | integer | Maximum lead score (0-100) |
| `status` | string | Filter by status: `hot`, `warm`, `cold` |
| `search` | string | Search by email, company, or phone |
| `created_after` | string | ISO 8601 date (e.g., `2026-02-01T00:00:00Z`) |
| `created_before` | string | ISO 8601 date |
| `sort` | string | Sort field: `created_at`, `score`, `company` |
| `order` | string | Sort order: `asc`, `desc` (default: `desc`) |
| `limit` | integer | Results per page (default: 50, max: 100) |
| `cursor` | string | Pagination cursor |

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "lead_1234567890",
      "email": "john.doe@example.com",
      "phone": "+1-555-0100",
      "full_name": "John Doe",
      "job_title": "VP of Sales",
      "company_name": "Example Corp",
      "linkedin_url": "https://linkedin.com/in/johndoe",
      "twitter_url": "https://twitter.com/johndoe",
      "lead_score": 85,
      "lead_status": "hot",
      "qualification_notes": "Company recently raised Series A funding. Hiring for sales roles. High buying intent.",
      "source_url": "https://example.com/about",
      "job_id": "job_1234567890",
      "created_at": "2026-02-10T10:35:12Z"
    },
    ...
  ],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6MTczfQ=="
  }
}
```

**Example**:
```bash
curl "https://api.leadscraper.com/v1/leads?score_min=70&status=hot&limit=50" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### Get Lead Details

Retrieve detailed information about a specific lead.

**Endpoint**: `GET /v1/leads/:id`

**Path Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Lead ID |

**Response** (200 OK):
```json
{
  "id": "lead_1234567890",
  "email": "john.doe@example.com",
  "phone": "+1-555-0100",
  "full_name": "John Doe",
  "job_title": "VP of Sales",
  "company_name": "Example Corp",
  "linkedin_url": "https://linkedin.com/in/johndoe",
  "twitter_url": "https://twitter.com/johndoe",
  "facebook_url": null,
  "lead_score": 85,
  "lead_status": "hot",
  "qualification_notes": "Company recently raised Series A funding. Hiring for sales roles. High buying intent.",
  "signals_detected": [
    "hiring",
    "recent_funding",
    "growing_company"
  ],
  "enrichment_data": {
    "company_size": "50-100",
    "industry": "SaaS",
    "location": "San Francisco, CA",
    "revenue_estimate": "$5M-$10M",
    "confidence_score": 0.92
  },
  "source_url": "https://example.com/about",
  "job_id": "job_1234567890",
  "created_at": "2026-02-10T10:35:12Z",
  "enriched_at": "2026-02-10T10:35:15Z"
}
```

**Example**:
```bash
curl https://api.leadscraper.com/v1/leads/lead_1234567890 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### Update Lead

Update lead information (e.g., custom notes, tags).

**Endpoint**: `PATCH /v1/leads/:id`

**Path Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Lead ID |

**Request Body**:
```json
{
  "custom_notes": "Contacted on 2026-02-10. Follow up next week.",
  "tags": ["high-priority", "q1-campaign"]
}
```

**Response** (200 OK):
```json
{
  "id": "lead_1234567890",
  "custom_notes": "Contacted on 2026-02-10. Follow up next week.",
  "tags": ["high-priority", "q1-campaign"],
  "updated_at": "2026-02-10T11:00:00Z"
}
```

**Example**:
```bash
curl -X PATCH https://api.leadscraper.com/v1/leads/lead_1234567890 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "custom_notes": "Contacted on 2026-02-10. Follow up next week.",
    "tags": ["high-priority", "q1-campaign"]
  }'
```

---

### Delete Lead

Delete a lead from your account.

**Endpoint**: `DELETE /v1/leads/:id`

**Path Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Lead ID |

**Response** (204 No Content):
```
(Empty response body)
```

**Example**:
```bash
curl -X DELETE https://api.leadscraper.com/v1/leads/lead_1234567890 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### Export Leads

Export leads in CSV or JSON format.

**Endpoint**: `POST /v1/leads/export`

**Request Body**:
```json
{
  "format": "csv",
  "filters": {
    "score_min": 70,
    "status": "hot",
    "created_after": "2026-02-01T00:00:00Z"
  },
  "fields": [
    "email",
    "phone",
    "full_name",
    "company_name",
    "lead_score",
    "qualification_notes"
  ]
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `format` | string | Yes | Export format: `csv` or `json` |
| `filters` | object | No | Same filters as GET /v1/leads |
| `fields` | array | No | Fields to include (default: all) |

**Response** (200 OK):
```json
{
  "export_id": "export_1234567890",
  "status": "processing",
  "estimated_completion": "2026-02-10T11:05:00Z"
}
```

**Get Export Status**: `GET /v1/exports/:id`

**Response** (200 OK):
```json
{
  "export_id": "export_1234567890",
  "status": "completed",
  "download_url": "https://storage.leadscraper.com/exports/export_1234567890.csv",
  "expires_at": "2026-02-11T11:05:00Z",
  "total_leads": 312
}
```

**Example**:
```bash
curl -X POST https://api.leadscraper.com/v1/leads/export \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "format": "csv",
    "filters": {
      "score_min": 70,
      "status": "hot"
    }
  }'
```

---

## 4. Webhooks

### Register Webhook

Register a webhook endpoint to receive real-time notifications.

**Endpoint**: `POST /v1/webhooks`

**Request Body**:
```json
{
  "url": "https://your-app.com/webhooks/leadscraper",
  "events": [
    "job.completed",
    "job.failed",
    "lead.qualified",
    "credit.low"
  ],
  "description": "Production webhook for CRM integration"
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | Webhook endpoint URL (must be HTTPS) |
| `events` | array | Yes | Events to subscribe to |
| `description` | string | No | Webhook description |

**Available Events**:
- `job.completed`: Scraping job completed
- `job.failed`: Scraping job failed
- `lead.qualified`: New lead qualified (score ≥ 70)
- `credit.low`: Credit balance below 20%

**Response** (201 Created):
```json
{
  "id": "webhook_1234567890",
  "url": "https://your-app.com/webhooks/leadscraper",
  "events": [
    "job.completed",
    "job.failed",
    "lead.qualified",
    "credit.low"
  ],
  "secret": "whsec_1234567890abcdef",
  "is_active": true,
  "created_at": "2026-02-10T11:00:00Z"
}
```

**Example**:
```bash
curl -X POST https://api.leadscraper.com/v1/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhooks/leadscraper",
    "events": ["job.completed", "lead.qualified"]
  }'
```

---

### Webhook Payload

**Example Payload** (`job.completed` event):
```json
{
  "event": "job.completed",
  "timestamp": "2026-02-10T10:38:23Z",
  "data": {
    "job_id": "job_1234567890",
    "type": "bulk",
    "total_urls": 100,
    "successful_urls": 97,
    "failed_urls": 3,
    "leads_found": 287,
    "credits_used": 152,
    "completed_at": "2026-02-10T10:38:23Z"
  }
}
```

**Webhook Signature Verification**:

All webhook requests include an `X-Webhook-Signature` header with an HMAC SHA-256 signature.

**Verify Signature** (Node.js example):
```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Usage
const isValid = verifyWebhookSignature(
  req.body,
  req.headers['x-webhook-signature'],
  'whsec_1234567890abcdef'
);
```

---

### List Webhooks

List all registered webhooks.

**Endpoint**: `GET /v1/webhooks`

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "webhook_1234567890",
      "url": "https://your-app.com/webhooks/leadscraper",
      "events": ["job.completed", "lead.qualified"],
      "is_active": true,
      "last_triggered_at": "2026-02-10T10:38:25Z",
      "created_at": "2026-02-10T11:00:00Z"
    },
    ...
  ]
}
```

---

### Delete Webhook

Delete a webhook endpoint.

**Endpoint**: `DELETE /v1/webhooks/:id`

**Path Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Webhook ID |

**Response** (204 No Content):
```
(Empty response body)
```

---

## 5. API Keys

### Generate API Key

Generate a new API key.

**Endpoint**: `POST /v1/api-keys`

**Request Body**:
```json
{
  "name": "Production API Key",
  "scopes": ["read", "write"],
  "expires_at": "2027-02-10T00:00:00Z"
}
```

**Parameters**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | API key name (for identification) |
| `scopes` | array | Yes | Permissions: `read`, `write`, `delete` |
| `expires_at` | string | No | Expiry date (ISO 8601) |

**Response** (201 Created):
```json
{
  "id": "key_1234567890",
  "name": "Production API Key",
  "key": "ls_1234567890abcdef",
  "key_prefix": "ls_12345",
  "scopes": ["read", "write"],
  "expires_at": "2027-02-10T00:00:00Z",
  "created_at": "2026-02-10T11:00:00Z"
}
```

> **⚠️ Important**: The full API key (`key` field) is only shown once. Store it securely.

---

### List API Keys

List all API keys for your account.

**Endpoint**: `GET /v1/api-keys`

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "key_1234567890",
      "name": "Production API Key",
      "key_prefix": "ls_12345",
      "scopes": ["read", "write"],
      "last_used_at": "2026-02-10T10:30:00Z",
      "expires_at": "2027-02-10T00:00:00Z",
      "created_at": "2026-02-10T11:00:00Z"
    },
    ...
  ]
}
```

---

### Revoke API Key

Revoke an API key (cannot be undone).

**Endpoint**: `DELETE /v1/api-keys/:id`

**Path Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `id` | string | API key ID |

**Response** (204 No Content):
```
(Empty response body)
```

---

## 6. Account & Credits

### Get Account Info

Retrieve account information and credit balance.

**Endpoint**: `GET /v1/account`

**Response** (200 OK):
```json
{
  "id": "user_1234567890",
  "email": "user@example.com",
  "full_name": "John Doe",
  "plan": "pro",
  "credits": {
    "balance": 1250,
    "total_purchased": 5000,
    "total_used": 3750
  },
  "subscription": {
    "status": "active",
    "current_period_start": "2026-02-01T00:00:00Z",
    "current_period_end": "2026-03-01T00:00:00Z",
    "monthly_credits": 1000
  },
  "created_at": "2026-01-15T10:00:00Z"
}
```

---

### Get Credit Usage

Retrieve credit usage history.

**Endpoint**: `GET /v1/credits/usage`

**Query Parameters**:
| Field | Type | Description |
|-------|------|-------------|
| `start_date` | string | Start date (ISO 8601) |
| `end_date` | string | End date (ISO 8601) |
| `limit` | integer | Results per page (default: 50, max: 100) |
| `cursor` | string | Pagination cursor |

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "txn_1234567890",
      "amount": -152,
      "type": "usage",
      "description": "Scraping job #job_1234567890",
      "job_id": "job_1234567890",
      "created_at": "2026-02-10T10:38:23Z"
    },
    {
      "id": "txn_1234567891",
      "amount": 1000,
      "type": "purchase",
      "description": "Credit purchase - Pro Plan",
      "created_at": "2026-02-01T00:00:00Z"
    },
    ...
  ],
  "pagination": {
    "has_more": true,
    "next_cursor": "eyJpZCI6MTczfQ=="
  }
}
```

---

## 7. Code Examples

### Node.js / TypeScript

```typescript
import axios from 'axios';

const API_KEY = 'ls_1234567890abcdef';
const BASE_URL = 'https://api.leadscraper.com/v1';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Create scraping job
async function createScrapingJob(urls: string[]) {
  const response = await client.post('/scrape', {
    type: 'bulk',
    urls: urls,
    options: {
      qualify_leads: true
    }
  });
  return response.data;
}

// Get job status
async function getJobStatus(jobId: string) {
  const response = await client.get(`/jobs/${jobId}`);
  return response.data;
}

// List leads
async function listLeads(filters: any) {
  const response = await client.get('/leads', {
    params: filters
  });
  return response.data;
}

// Usage
const job = await createScrapingJob([
  'https://example.com/contact',
  'https://company.com/about'
]);

console.log('Job created:', job.id);

// Poll for completion
let status = await getJobStatus(job.id);
while (status.status === 'processing') {
  await new Promise(resolve => setTimeout(resolve, 5000));
  status = await getJobStatus(job.id);
}

console.log('Job completed:', status.leads_found, 'leads found');

// Get leads
const leads = await listLeads({
  job_id: job.id,
  score_min: 70
});

console.log('Hot leads:', leads.data.length);
```

---

### Python

```python
import requests
import time

API_KEY = 'ls_1234567890abcdef'
BASE_URL = 'https://api.leadscraper.com/v1'

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

# Create scraping job
def create_scraping_job(urls):
    response = requests.post(
        f'{BASE_URL}/scrape',
        headers=headers,
        json={
            'type': 'bulk',
            'urls': urls,
            'options': {
                'qualify_leads': True
            }
        }
    )
    return response.json()

# Get job status
def get_job_status(job_id):
    response = requests.get(
        f'{BASE_URL}/jobs/{job_id}',
        headers=headers
    )
    return response.json()

# List leads
def list_leads(filters):
    response = requests.get(
        f'{BASE_URL}/leads',
        headers=headers,
        params=filters
    )
    return response.json()

# Usage
job = create_scraping_job([
    'https://example.com/contact',
    'https://company.com/about'
])

print(f'Job created: {job["id"]}')

# Poll for completion
status = get_job_status(job['id'])
while status['status'] == 'processing':
    time.sleep(5)
    status = get_job_status(job['id'])

print(f'Job completed: {status["leads_found"]} leads found')

# Get leads
leads = list_leads({
    'job_id': job['id'],
    'score_min': 70
})

print(f'Hot leads: {len(leads["data"])}')
```

---

### cURL

```bash
# Create scraping job
curl -X POST https://api.leadscraper.com/v1/scrape \
  -H "Authorization: Bearer ls_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "bulk",
    "urls": [
      "https://example.com/contact",
      "https://company.com/about"
    ],
    "options": {
      "qualify_leads": true
    }
  }'

# Get job status
curl https://api.leadscraper.com/v1/jobs/job_1234567890 \
  -H "Authorization: Bearer ls_1234567890abcdef"

# List leads
curl "https://api.leadscraper.com/v1/leads?score_min=70&status=hot" \
  -H "Authorization: Bearer ls_1234567890abcdef"

# Export leads
curl -X POST https://api.leadscraper.com/v1/leads/export \
  -H "Authorization: Bearer ls_1234567890abcdef" \
  -H "Content-Type: application/json" \
  -d '{
    "format": "csv",
    "filters": {
      "score_min": 70
    }
  }'
```

---

## 8. Changelog

### Version 1.0 (2026-02-10)
- Initial API release
- Scraping endpoints
- Leads endpoints
- Webhooks
- API key management
- Account & credits endpoints

---

**Document Status**: ✅ Complete  
**OpenAPI Spec**: Coming soon  
**Postman Collection**: Coming soon
