import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToolHandlers } from './tools.js';
import { PhpInsightsClient } from './phpinsights-client.js';
import { ResultProcessor } from './result-processor.js';

// Mock the PhpInsightsClient
vi.mock('./phpinsights-client.js', () => ({
  PhpInsightsClient: vi.fn().mockImplementation(() => ({
    runAnalysis: vi.fn().mockResolvedValue({
      metrics: {
        code: 90,
        complexity: 80,
        architecture: 85,
        style: 95
      },
      insights: [
        {
          file: 'src/Foo.php',
          line: 10,
          title: 'Unused variable',
          insight: 'Remove unused variable',
          severity: 'minor'
        }
      ]
    }),
    runFix: vi.fn().mockResolvedValue('Fix operation completed successfully')
  }))
}));

// Mock the ResultProcessor
vi.mock('./result-processor.js', () => ({
  ResultProcessor: vi.fn().mockImplementation(() => ({
    generateSummary: vi.fn().mockReturnValue({
      summary: ['code: 90%', 'complexity: 80%', 'architecture: 85%', 'style: 95%'],
      issues: [
        {
          file: 'src/Foo.php',
          line: 10,
          title: 'Unused variable',
          insight: 'Remove unused variable',
          severity: 'minor'
        }
      ]
    }),
    generateResources: vi.fn().mockReturnValue([]),
    validateResult: vi.fn().mockReturnValue(true)
  }))
}));

describe('mcp-phpinsights server', () => {
  let toolHandlers: ToolHandlers;

  beforeEach(() => {
    toolHandlers = new ToolHandlers();
  });

  it('should run phpinsights and return JSON', async () => {
    const args = { projectRoot: '/fake/project' };
    const result = await toolHandlers.handleRun({ params: args });
    
    expect(result.content).toBeDefined();
    expect(result.content.length).toBeGreaterThan(0);
    
    // Check that we have both success message and JSON data
    expect(result.content[0].text).toContain('PHP Insights analysis completed successfully');
    expect(result.content[1].text).toContain('"metrics"');
  });

  it('should summarize results', async () => {
    const args = { projectRoot: '/fake/project' };
    const result = await toolHandlers.handleSummary({ params: args });
    
    expect(result.content).toBeDefined();
    expect(result.content.length).toBeGreaterThan(0);
    
    // Check that we have text content with summary data
    const textContent = result.content.find((c: any) => c.type === 'text');
    expect(textContent).toBeDefined();
    expect(textContent?.text).toContain('code: 90%');
  });
});
