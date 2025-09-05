import { execa } from "execa";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import type {
  RunConfig,
  FixConfig,
  PhpInsightsResult,
} from "./types.js";
import {
  ConfigurationError,
  ExecutionError,
} from "./types.js";

/**
 * PHP Insights client for executing analysis and fix operations
 */
export class PhpInsightsClient {
  private readonly defaultTimeout = 120000; // 2 minutes
  private readonly fixTimeout = 180000; // 3 minutes

  /**
   * Validates that the project root exists and contains PHP Insights
   */
  private async validateProjectRoot(projectRoot: string): Promise<void> {
    try {
      const stats = await fs.stat(projectRoot);
      if (!stats.isDirectory()) {
        throw new ConfigurationError(`Project root is not a directory: ${projectRoot}`);
      }

      const phpInsightsPath = path.join(projectRoot, "vendor", "bin", "phpinsights");
      const phpInsightsStats = await fs.stat(phpInsightsPath);
      if (!phpInsightsStats.isFile()) {
        throw new ConfigurationError(
          `PHP Insights binary not found at: ${phpInsightsPath}. Please ensure PHP Insights is installed via Composer.`
        );
      }
    } catch (error) {
      if (error instanceof ConfigurationError) {
        throw error;
      }
      throw new ConfigurationError(
        `Failed to validate project root: ${projectRoot}`,
        error as Error
      );
    }
  }

  /**
   * Builds command arguments for PHP Insights analysis
   */
  private buildAnalysisArgs(config: RunConfig): string[] {
    const args = ["analyse", "--format=json"];
    
    if (config.configPath) {
      args.push(`--config-path=${config.configPath}`);
    }
    
    if (config.paths?.length) {
      args.push(...config.paths);
    }
    
    return args;
  }

  /**
   * Builds command arguments for PHP Insights fix operations
   */
  private buildFixArgs(config: FixConfig): string[] {
    const args = ["analyse", "--fix"];
    
    if (config.paths?.length) {
      args.push(...config.paths);
    }
    
    return args;
  }

  /**
   * Executes PHP Insights analysis and returns parsed JSON result
   */
  async runAnalysis(config: RunConfig): Promise<PhpInsightsResult> {
    await this.validateProjectRoot(config.projectRoot);

    const binPath = path.join(config.projectRoot, "vendor", "bin", "phpinsights");
    const args = this.buildAnalysisArgs(config);
    const timeout = config.timeoutMs ?? this.defaultTimeout;

    try {
      const result = await execa(binPath, args, {
        cwd: config.projectRoot,
        timeout,
        encoding: "utf8",
      });

      if (!result.stdout) {
        throw new ExecutionError("PHP Insights returned empty output");
      }

      return JSON.parse(result.stdout) as PhpInsightsResult;
    } catch (error) {
      if (error instanceof ExecutionError) {
        throw error;
      }
      
      if (error && typeof error === 'object' && 'stderr' in error) {
        const execaError = error as any;
        const message = execaError.stderr || execaError.message || "Unknown execution error";
        throw new ExecutionError(
          `PHP Insights execution failed: ${message}`,
          error as unknown as Error
        );
      }
      
      throw new ExecutionError(
        "Failed to execute PHP Insights analysis",
        error as Error
      );
    }
  }

  /**
   * Executes PHP Insights fix operations
   */
  async runFix(config: FixConfig): Promise<string> {
    await this.validateProjectRoot(config.projectRoot);

    const binPath = path.join(config.projectRoot, "vendor", "bin", "phpinsights");
    const args = this.buildFixArgs(config);
    const timeout = config.timeoutMs ?? this.fixTimeout;

    try {
      const result = await execa(binPath, args, {
        cwd: config.projectRoot,
        timeout,
        encoding: "utf8",
      });

      return result.stdout || "Fix operation completed successfully";
    } catch (error) {
      if (error && typeof error === 'object' && 'stderr' in error) {
        const execaError = error as any;
        const message = execaError.stderr || execaError.message || "Unknown execution error";
        throw new ExecutionError(
          `PHP Insights fix failed: ${message}`,
          error as unknown as Error
        );
      }
      
      throw new ExecutionError(
        "Failed to execute PHP Insights fix",
        error as Error
      );
    }
  }
}
