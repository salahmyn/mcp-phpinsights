import * as path from "node:path";
import type { PhpInsightsResult, PhpInsightsIssue, AnalysisSummary } from "./types.js";

/**
 * Processes PHP Insights results and generates summaries
 */
export class ResultProcessor {
  /**
   * Generates a human-readable summary from PHP Insights results
   */
  generateSummary(result: PhpInsightsResult): AnalysisSummary {
    const metrics = result.metrics ?? result.summary ?? {};
    const categories = ["code", "complexity", "architecture", "style"];
    const summaryLines: string[] = [];

    // Generate summary lines for each category
    for (const category of categories) {
      const value = metrics[category];
      if (typeof value === "number") {
        summaryLines.push(`${category}: ${value}%`);
      }
    }

    // Process top issues (limit to 20 for readability)
    const issues = this.processIssues(result.insights ?? []);

    return {
      summary: summaryLines,
      issues: issues.slice(0, 20),
    };
  }

  /**
   * Processes and normalizes issues from PHP Insights results
   */
  private processIssues(insights: PhpInsightsIssue[]): Array<{
    file: string;
    line: number | null;
    title: string;
    insight: string;
    severity: string;
  }> {
    return insights.map(this.normalizeIssue);
  }

  /**
   * Normalizes a single issue to a consistent format
   */
  private normalizeIssue(issue: PhpInsightsIssue): {
    file: string;
    line: number | null;
    title: string;
    insight: string;
    severity: string;
  } {
    return {
      file: this.getIssueFile(issue),
      line: this.getIssueLine(issue),
      title: this.getIssueTitle(issue),
      insight: this.getIssueInsight(issue),
      severity: this.getIssueSeverity(issue),
    };
  }

  private getIssueFile(issue: PhpInsightsIssue): string {
    return issue.file ?? issue.target ?? "unknown";
  }

  private getIssueLine(issue: PhpInsightsIssue): number | null {
    return issue.line ?? null;
  }

  private getIssueTitle(issue: PhpInsightsIssue): string {
    return issue.title ?? issue.description ?? "Issue";
  }

  private getIssueInsight(issue: PhpInsightsIssue): string {
    return issue.insight ?? issue.message ?? "";
  }

  private getIssueSeverity(issue: PhpInsightsIssue): string {
    return issue.severity ?? "info";
  }

  /**
   * Converts issues to resource format for MCP
   */
  generateResources(result: PhpInsightsResult, projectRoot: string): Array<{
    uri: string;
    name: string;
    mimeType: string;
    description: string;
    byteLength: number;
  }> {
    const issues = result.insights ?? [];
    return issues.map((issue) => this.convertIssueToResource(issue, projectRoot));
  }

  /**
   * Converts a single issue to resource format
   */
  private convertIssueToResource(
    issue: PhpInsightsIssue,
    projectRoot: string
  ): {
    uri: string;
    name: string;
    mimeType: string;
    description: string;
    byteLength: number;
  } {
    return {
      uri: this.getIssueUri(issue, projectRoot),
      name: this.getIssueTitle(issue),
      mimeType: "text/plain",
      description: this.getIssueInsight(issue),
      byteLength: 0,
    };
  }

  private getIssueUri(issue: PhpInsightsIssue, projectRoot: string): string {
    const filePath = this.getIssueFile(issue);
    if (!filePath || filePath === "unknown") {
      return "";
    }
    const fullPath = path.join(projectRoot, filePath);
    return `file://${fullPath}`;
  }

  /**
   * Validates PHP Insights result structure
   */
  validateResult(result: unknown): result is PhpInsightsResult {
    if (!this.isValidObject(result)) {
      return false;
    }

    const obj = result as Record<string, unknown>;
    
    if (!this.hasValidMetrics(obj)) {
      return false;
    }

    if (!this.hasValidInsights(obj)) {
      return false;
    }

    return true;
  }

  /**
   * Checks if the result is a valid object
   */
  private isValidObject(result: unknown): result is Record<string, unknown> {
    return result !== null && typeof result === "object";
  }

  /**
   * Checks if the object has valid metrics or summary
   */
  private hasValidMetrics(obj: Record<string, unknown>): boolean {
    const hasMetrics = obj['metrics'] && typeof obj['metrics'] === "object";
    const hasSummary = obj['summary'] && typeof obj['summary'] === "object";
    return Boolean(hasMetrics || hasSummary);
  }

  /**
   * Checks if the object has valid insights array
   */
  private hasValidInsights(obj: Record<string, unknown>): boolean {
    return !obj['insights'] || Array.isArray(obj['insights']);
  }
}
