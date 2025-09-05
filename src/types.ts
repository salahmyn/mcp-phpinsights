import { z } from "zod";

/**
 * Configuration schema for PHP Insights analysis
 */
export const RunConfigSchema = {
  projectRoot: z.string().describe("Absolute path to the PHP project root"),
  paths: z.array(z.string()).optional().describe("Optional paths/files to analyze"),
  configPath: z.string().optional().describe("Optional phpinsights.php config path"),
  timeoutMs: z.number().optional().default(120000).describe("Timeout in milliseconds"),
};

/**
 * Configuration schema for PHP Insights fix operations
 */
export const FixConfigSchema = {
  projectRoot: z.string().describe("Absolute path to the PHP project root"),
  paths: z.array(z.string()).optional().describe("Optional paths/files to fix"),
  timeoutMs: z.number().optional().default(180000).describe("Timeout in milliseconds"),
};

/**
 * Configuration schema for resource operations
 */
export const ResourceConfigSchema = z.object({
  projectRoot: z.string().describe("Absolute path to the PHP project root"),
});

/**
 * Type definitions for PHP Insights analysis results
 */
export interface PhpInsightsMetrics {
  code?: number;
  complexity?: number;
  architecture?: number;
  style?: number;
  [key: string]: unknown;
}

export interface PhpInsightsIssue {
  file?: string;
  target?: string;
  line?: number;
  title?: string;
  description?: string;
  insight?: string;
  message?: string;
  severity?: "info" | "warning" | "error";
}

export interface PhpInsightsResult {
  metrics?: PhpInsightsMetrics;
  summary?: PhpInsightsMetrics;
  insights?: PhpInsightsIssue[];
  [key: string]: unknown;
}

export interface AnalysisSummary {
  summary: string[];
  issues: Array<{
    file: string;
    line: number | null;
    title: string;
    insight: string;
    severity: string;
  }>;
}

/**
 * Type definitions for tool arguments
 */
export type RunConfig = {
  projectRoot: string;
  paths?: string[] | undefined;
  configPath?: string | undefined;
  timeoutMs?: number | undefined;
};

export type FixConfig = {
  projectRoot: string;
  paths?: string[] | undefined;
  timeoutMs?: number | undefined;
};

export type ResourceConfig = z.infer<typeof ResourceConfigSchema>;

/**
 * Custom error types for better error handling
 */
export class PhpInsightsError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public override readonly cause?: Error
  ) {
    super(message);
    this.name = "PhpInsightsError";
  }
}

export class ConfigurationError extends PhpInsightsError {
  constructor(message: string, cause?: Error) {
    super(message, "CONFIG_ERROR", cause);
    this.name = "ConfigurationError";
  }
}

export class ExecutionError extends PhpInsightsError {
  constructor(message: string, cause?: Error) {
    super(message, "EXECUTION_ERROR", cause);
    this.name = "ExecutionError";
  }
}
