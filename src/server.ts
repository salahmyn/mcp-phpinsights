#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ToolHandlers } from "./tools.js";
import { RunConfigSchema, FixConfigSchema } from "./types.js";

/**
 * PHP Insights MCP Server
 * 
 * A Model Context Protocol server that provides tools for analyzing PHP code
 * using PHP Insights. This server offers comprehensive code analysis, summary
 * generation, and automated fixing capabilities.
 * 
 * @version 1.0.0
 * @author Professional Architecture Team
 */

// Initialize the MCP server
const server = new McpServer({
  name: "mcp-phpinsights",
  version: "1.0.0",
});

// Initialize tool handlers
const toolHandlers = new ToolHandlers();

/**
 * Register tools with the server
 */
server.registerTool(
  "phpinsights_run",
  {
    title: "PHP Insights Analysis",
    description: "Run PHP Insights analysis on a PHP project and return raw JSON results",
    inputSchema: RunConfigSchema,
  },
  async (args) => {
    return await toolHandlers.handleRun({ params: args as any }) as any;
  }
);

server.registerTool(
  "phpinsights_summary",
  {
    title: "PHP Insights Summary",
    description: "Run PHP Insights analysis and return a human-readable summary with top issues",
    inputSchema: RunConfigSchema,
  },
  async (args) => {
    return await toolHandlers.handleSummary({ params: args as any }) as any;
  }
);

server.registerTool(
  "phpinsights_fix",
  {
    title: "PHP Insights Fix",
    description: "Run PHP Insights with automatic fixes (experimental feature)",
    inputSchema: FixConfigSchema,
  },
  async (args) => {
    return await toolHandlers.handleFix({ params: args as any }) as any;
  }
);

/**
 * Register resources with the server
 */
server.registerResource(
  "phpinsights:problems",
  "phpinsights:problems",
  {
    title: "PHP Insights Problems",
    description: "List of code quality issues found by PHP Insights",
    mimeType: "application/json",
  },
  async (uri) => {
    // Extract project root from URI parameters
    const url = new URL(uri.href);
    const projectRoot = url.searchParams.get("projectRoot");
    
    if (!projectRoot) {
      throw new Error("projectRoot parameter is required for phpinsights:problems resource");
    }

    const result = await toolHandlers.handleProblemsResource({
      params: { projectRoot },
    });

    return {
      contents: result.resources.map(resource => ({
        uri: resource.uri,
        text: JSON.stringify(resource, null, 2),
      })),
    };
  }
);

/**
 * Start the server
 */
async function main(): Promise<void> {
  // Handle version flag
  if (process.argv.includes("--version") || process.argv.includes("-v")) {
    console.log("1.0.0");
    process.exit(0);
  }

  // Handle help flag
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(`
PHP Insights MCP Server v1.0.0

A Model Context Protocol server that provides comprehensive PHP code analysis using PHP Insights.

Usage:
  mcp-phpinsights [options]

Options:
  --version, -v    Show version number
  --help, -h       Show this help message

For more information, visit: https://github.com/your-username/mcp-phpinsights
`);
    process.exit(0);
  }

  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("PHP Insights MCP Server started successfully");
  } catch (error) {
    console.error("Failed to start PHP Insights MCP Server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.error("Shutting down PHP Insights MCP Server...");
  await server.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.error("Shutting down PHP Insights MCP Server...");
  await server.close();
  process.exit(0);
});

// Start the server
main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
