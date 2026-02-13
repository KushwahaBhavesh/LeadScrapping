# Phase 2: MCP Server & Leads Intelligence Strategy

This document outlines the strategy for implementing the Model Context Protocol (MCP) server for the Lead Scraping Platform.

## 1. Objective
To expose the platform's core capabilities (Scraping, Lead Qualification, CRM Sync) as standardized MCP tools. This allows AI agents (like Claude Desktop, Cursor, or custom agents) to interact with our platform programmatically.

## 2. Architecture

### Server Type
We will implement a **Stdio MCP Server** using Node.js. This is the simplest way to integrate with local AI tools like Cursor or Claude Desktop.
Later, we can expose an **SSE (Server-Sent Events) Endpoint** for remote agents.

### Core Components
- **Server**: Entry point that handles protocol communication (`scrapping-mcp-server`).
- **Tools**: Functions exposed to the AI agent.
- **Resources**: Data exposed to the AI agent (e.g., specific leads, job logs).

## 3. Planned Tools

| Tool Name | Description | Inputs |
|-----------|-------------|--------|
| `scrape_url` | Scrape a single URL and qualify leads | `url`: string, `qualify`: boolean |
| `start_batch_job` | Start a bulk scraping job | `urls`: string[], `job_name`: string |
| `get_job_status` | Check status of a scraping job | `job_id`: string |
| `search_leads` | Search for leads in the database | `query`: string, `limit`: number |
| `get_lead_details` | Get full details including AI analysis | `email`: string |

## 4. Implementation Steps

### Step 1: Dependencies
Add the official SDK:
```bash
npm install @modelcontextprotocol/sdk
```

### Step 2: Server Implementation (`src/lib/mcp/server.ts`)
Create a standalone script that initializes the `McpServer` and registers tools.
We will reuse the existing services (`ScrapingService`, `JobService`) to keep logic centralized.

### Step 3: Integration
- Create a script in `package.json` to run the server: `"mcp": "tsx src/lib/mcp/server.ts"`.
- Configure the AI client (e.g., Cursor) to run this command.

## 5. Security
ensure that the MCP server respects the same RLS policies as the API. Since it runs locally or via API, we must ensure API keys or user context are handled correctly.

## 6. Future Enhancements (Phase 3)
- **Agentic Workflows**: Allow the MCP server to autonomously decide to crawl deeper based on initial findings.
- **CRM Integration**: Tools to push leads directly to Salesforce/HubSpot via MCP.
