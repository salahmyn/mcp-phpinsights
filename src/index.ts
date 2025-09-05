/**
 * PHP Insights MCP Server
 * 
 * A Model Context Protocol server that provides tools for analyzing PHP code
 * using PHP Insights. This server offers comprehensive code analysis, summary
 * generation, and automated fixing capabilities.
 * 
 * @packageDocumentation
 */

export { PhpInsightsClient } from "./phpinsights-client.js";
export { ResultProcessor } from "./result-processor.js";
export { ToolHandlers } from "./tools.js";
export * from "./types.js";

// Re-export the main server for programmatic usage
// Export all modules for programmatic usage
export * from "./server.js";
export * from "./phpinsights-client.js";
export * from "./result-processor.js";
export * from "./tools.js";
export * from "./types.js";
