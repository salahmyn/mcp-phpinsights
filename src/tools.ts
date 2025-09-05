import { PhpInsightsClient } from "./phpinsights-client.js";
import { ResultProcessor } from "./result-processor.js";
import {
  ResourceConfigSchema,
  type RunConfig,
  type FixConfig,
  type ResourceConfig,
} from "./types.js";

/**
 * Tool handlers for PHP Insights MCP server
 */
export class ToolHandlers {
  private readonly client: PhpInsightsClient;
  private readonly processor: ResultProcessor;

  constructor() {
    this.client = new PhpInsightsClient();
    this.processor = new ResultProcessor();
  }

  /**
   * Handles the phpinsights.run tool
   */
  async handleRun(
    request: { params: RunConfig }
  ): Promise<{ content: Array<{ type: "text"; text: string }> }> {
    const args = request.params;
    
    try {
      const result = await this.client.runAnalysis(args);
      
      if (!this.processor.validateResult(result)) {
        throw new Error("Invalid PHP Insights result format");
      }

      return {
        content: [
          { type: "text", text: "PHP Insights analysis completed successfully" },
          { type: "text", text: JSON.stringify(result, null, 2) },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          { type: "text", text: `PHP Insights analysis failed: ${errorMessage}` },
        ],
      };
    }
  }

  /**
   * Handles the phpinsights.summary tool
   */
  async handleSummary(
    request: { params: RunConfig }
  ): Promise<{ content: Array<{ type: "text"; text: string }> }> {
    const args = request.params;
    
    try {
      // First run the analysis
      const result = await this.client.runAnalysis(args);
      
      if (!this.processor.validateResult(result)) {
        throw new Error("Invalid PHP Insights result format");
      }

      // Generate summary
      const summary = this.processor.generateSummary(result);

      return {
        content: [
          { type: "text", text: ["Summary:", ...summary.summary].join("\n") },
          { type: "text", text: JSON.stringify(summary, null, 2) },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          { type: "text", text: `PHP Insights summary failed: ${errorMessage}` },
        ],
      };
    }
  }

  /**
   * Handles the phpinsights.fix tool
   */
  async handleFix(
    request: { params: FixConfig }
  ): Promise<{ content: Array<{ type: "text"; text: string }> }> {
    const args = request.params;
    
    try {
      const output = await this.client.runFix(args);
      
      return {
        content: [
          { type: "text", text: output },
        ],
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          { type: "text", text: `PHP Insights fix failed: ${errorMessage}` },
        ],
      };
    }
  }

  /**
   * Handles the phpinsights:problems resource
   */
  async handleProblemsResource(
    request: { params: ResourceConfig }
  ): Promise<{ resources: Array<{ uri: string; name: string; mimeType: string; description: string; byteLength: number }> }> {
    const args = ResourceConfigSchema.parse(request.params);
    
    try {
      const result = await this.client.runAnalysis(args);
      
      if (!this.processor.validateResult(result)) {
        throw new Error("Invalid PHP Insights result format");
      }

      const resources = this.processor.generateResources(result, args.projectRoot);
      
      return { resources };
    } catch (error) {
      // Return empty resources on error rather than failing completely
      console.error("Failed to generate problems resource:", error);
      return { resources: [] };
    }
  }
}
