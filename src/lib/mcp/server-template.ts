/**
 * MCP Server Reference Implementation
 * 
 * To use this server:
 * 1. Install @modelcontextprotocol/sdk: `npm install @modelcontextprotocol/sdk`
 * 2. Rename this file to `server.ts`
 * 3. Add script to package.json: `"mcp": "tsx src/lib/mcp/server.ts"`
 */

/*
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ScrapingService } from "../services/scraping-service";
import { createClient } from "../supabase/server";

// Initialize MCP Server
const server = new McpServer({
  name: "lead-scraping-platform",
  version: "1.0.0",
});

// Tool: Scrape URL
server.tool(
  "scrape_url",
  {
    url: z.string().url(),
    qualify: z.boolean().optional().default(true),
  },
  async ({ url, qualify }) => {
    try {
      const result = await ScrapingService.scrapeUrl(url, { qualify_leads: qualify });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              company: result.companyName,
              score: result.score,
              signals: result.signals,
              industry: result.industry,
              summary: result.summary,
              emails: result.emails,
            }, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true,
      };
    }
  }
);

// Tool: Search Leads
server.tool(
  "search_leads",
  {
    query: z.string(),
    limit: z.number().optional().default(5),
  },
  async ({ query, limit }) => {
    const supabase = await createClient(); // Note: RLS might need service role key here if running locally
    
    const { data, error } = await supabase
      .from('scraped_leads')
      .select('email, company_name, lead_score, tags')
      .or(`company_name.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(limit);

    if (error) {
      return {
        content: [{ type: "text", text: `Database error: ${error.message}` }],
        isError: true,
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
);

// Start Server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in MCP server:", error);
  process.exit(1);
});
*/
