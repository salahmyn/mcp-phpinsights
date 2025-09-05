#!/usr/bin/env node

/**
 * Basic Usage Example
 * 
 * This example demonstrates how to use the PHP Insights MCP Server
 * programmatically in a Node.js application.
 */

import { PhpInsightsClient, ResultProcessor } from '../dist/index.js';

async function main() {
  console.log('🔍 PHP Insights MCP Server - Basic Usage Example\n');

  // Initialize the client and processor
  const client = new PhpInsightsClient();
  const processor = new ResultProcessor();

  // Example project path (replace with your actual PHP project path)
  const projectRoot = process.argv[2] || '/path/to/your/php/project';

  if (projectRoot === '/path/to/your/php/project') {
    console.log('❌ Please provide a valid PHP project path as an argument:');
    console.log('   node examples/basic-usage.js /path/to/your/php/project');
    process.exit(1);
  }

  try {
    console.log(`📁 Analyzing project: ${projectRoot}\n`);

    // Run PHP Insights analysis
    console.log('🚀 Running PHP Insights analysis...');
    const result = await client.runAnalysis({
      projectRoot,
      timeoutMs: 120000, // 2 minutes timeout
    });

    console.log('✅ Analysis completed!\n');

    // Validate the result
    if (!processor.validateResult(result)) {
      throw new Error('Invalid PHP Insights result format');
    }

    // Generate and display summary
    console.log('📊 Generating summary...');
    const summary = processor.generateSummary(result);

    console.log('\n📈 Code Quality Summary:');
    console.log('========================');
    summary.summary.forEach(line => console.log(`  ${line}`));

    console.log('\n🐛 Top Issues:');
    console.log('==============');
    if (summary.issues.length === 0) {
      console.log('  🎉 No issues found! Your code looks great!');
    } else {
      summary.issues.slice(0, 10).forEach((issue, index) => {
        console.log(`  ${index + 1}. ${issue.file}:${issue.line || '?'} - ${issue.title}`);
        console.log(`     ${issue.insight}`);
        console.log(`     Severity: ${issue.severity}\n`);
      });

      if (summary.issues.length > 10) {
        console.log(`  ... and ${summary.issues.length - 10} more issues`);
      }
    }

    // Display metrics
    console.log('\n📊 Detailed Metrics:');
    console.log('====================');
    if (result.metrics) {
      Object.entries(result.metrics).forEach(([key, value]) => {
        if (typeof value === 'number') {
          console.log(`  ${key}: ${value}%`);
        }
      });
    }

  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
    
    if (error.name === 'ConfigurationError') {
      console.log('\n💡 Configuration Tips:');
      console.log('  - Ensure PHP Insights is installed: composer require nunomaduro/phpinsights');
      console.log('  - Check that the project path is correct');
      console.log('  - Verify PHP and Composer are properly installed');
    } else if (error.name === 'ExecutionError') {
      console.log('\n💡 Execution Tips:');
      console.log('  - Check PHP Insights configuration');
      console.log('  - Ensure the project has valid PHP files');
      console.log('  - Try running PHP Insights manually first');
    }
    
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the example
main().catch(console.error);
