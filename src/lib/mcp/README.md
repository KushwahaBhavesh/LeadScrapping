# MCP Server Implementation

This directory contains the files related to the **Model Context Protocol (MCP)** integration for the Lead Scraping Platform.

## Status: Planned (Phase 2)

The goal is to expose the platform's capabilities (scraping, lead management) as tools for AI agents.

## Files
- `server-template.ts`: A reference implementation using the `@modelcontextprotocol/sdk`. This file is commented out until the dependency is added.

## Getting Started

1. **Install SDK**:
   ```bash
   npm install @modelcontextprotocol/sdk
   ```

2. **Rename Template**:
   Rename `server-template.ts` to `server.ts` and uncomment the code.

3. **Run Server**:
   You can run the server using `tsx`:
   ```bash
   npx tsx src/lib/mcp/server.ts
   ```

4. **Connect to Cursor/Claude**:
   Configure your AI editor to use the command above as a custom MCP server.

## Security Note
This server runs with the local environment's permissions. Ensure `.env.local` contains the necessary Supabase and AI API keys.
If running locally, it will use your local Supabase credentials.
