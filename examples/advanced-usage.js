#!/usr/bin/env node

/**
 * Advanced Usage Example
 * 
 * This example demonstrates advanced features of the PHP Insights MCP Server,
 * including custom configuration, path filtering, and automated fixes.
 */

import { PhpInsightsClient, ResultProcessor } from '../dist/index.js';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';

async function main() {
  console.log('🔍 PHP Insights MCP Server - Advanced Usage Example\n');

  const client = new PhpInsightsClient();
  const processor = new ResultProcessor();

  // Example project path
  const projectRoot = process.argv[2] || '/path/to/your/php/project';

  if (projectRoot === '/path/to/your/php/project') {
    console.log('❌ Please provide a valid PHP project path as an argument:');
    console.log('   node examples/advanced-usage.js /path/to/your/php/project');
    process.exit(1);
  }

  try {
    console.log(`📁 Analyzing project: ${projectRoot}\n`);

    // Example 1: Analyze specific paths only
    console.log('🎯 Example 1: Analyzing specific paths...');
    const specificPathsResult = await client.runAnalysis({
      projectRoot,
      paths: ['src/', 'app/'], // Only analyze these directories
      timeoutMs: 60000, // 1 minute timeout
    });

    console.log('✅ Specific paths analysis completed!');
    const specificSummary = processor.generateSummary(specificPathsResult);
    console.log(`   Found ${specificSummary.issues.length} issues in specified paths\n`);

    // Example 2: Use custom configuration
    console.log('⚙️  Example 2: Using custom configuration...');
    const customConfigPath = path.join(projectRoot, 'phpinsights.custom.php');
    
    // Check if custom config exists
    try {
      await fs.access(customConfigPath);
      console.log(`   Using custom config: ${customConfigPath}`);
      
      const customConfigResult = await client.runAnalysis({
        projectRoot,
        configPath: customConfigPath,
        timeoutMs: 120000,
      });

      console.log('✅ Custom configuration analysis completed!');
      const customSummary = processor.generateSummary(customConfigResult);
      console.log(`   Found ${customSummary.issues.length} issues with custom config\n`);
    } catch {
      console.log('   No custom config found, using default configuration\n');
    }

    // Example 3: Generate resources for IDE integration
    console.log('🔗 Example 3: Generating MCP resources...');
    const fullResult = await client.runAnalysis({
      projectRoot,
      timeoutMs: 180000, // 3 minutes for full analysis
    });

    const resources = processor.generateResources(fullResult, projectRoot);
    console.log(`✅ Generated ${resources.length} MCP resources`);
    
    // Display first few resources
    console.log('\n📋 Sample Resources:');
    resources.slice(0, 5).forEach((resource, index) => {
      console.log(`  ${index + 1}. ${resource.name}`);
      console.log(`     URI: ${resource.uri}`);
      console.log(`     Description: ${resource.description}\n`);
    });

    // Example 4: Automated fixes (experimental)
    console.log('🔧 Example 4: Attempting automated fixes...');
    try {
      const fixResult = await client.runFix({
        projectRoot,
        paths: ['src/'], // Only fix issues in src/ directory
        timeoutMs: 300000, // 5 minutes for fixes
      });

      console.log('✅ Automated fixes completed!');
      console.log('Fix output:');
      console.log(fixResult);
    } catch (fixError) {
      console.log('⚠️  Automated fixes failed (this is experimental):');
      console.log(`   ${fixError.message}\n`);
    }

    // Example 5: Detailed analysis with metrics
    console.log('📊 Example 5: Detailed metrics analysis...');
    const detailedResult = await client.runAnalysis({
      projectRoot,
      timeoutMs: 240000, // 4 minutes for detailed analysis
    });

    if (processor.validateResult(detailedResult)) {
      const detailedSummary = processor.generateSummary(detailedResult);
      
      console.log('\n📈 Comprehensive Code Quality Report:');
      console.log('=====================================');
      
      // Display all metrics
      if (detailedResult.metrics) {
        console.log('\n🎯 Quality Metrics:');
        Object.entries(detailedResult.metrics).forEach(([key, value]) => {
          if (typeof value === 'number') {
            const emoji = value >= 90 ? '🟢' : value >= 70 ? '🟡' : '🔴';
            console.log(`  ${emoji} ${key}: ${value}%`);
          }
        });
      }

      // Categorize issues by severity
      const issuesBySeverity = detailedSummary.issues.reduce((acc, issue) => {
        acc[issue.severity] = (acc[issue.severity] || 0) + 1;
        return acc;
      }, {});

      console.log('\n🚨 Issues by Severity:');
      Object.entries(issuesBySeverity).forEach(([severity, count]) => {
        const emoji = severity === 'error' ? '🔴' : severity === 'warning' ? '🟡' : '🔵';
        console.log(`  ${emoji} ${severity}: ${count} issues`);
      });

      // Show files with most issues
      const issuesByFile = detailedSummary.issues.reduce((acc, issue) => {
        acc[issue.file] = (acc[issue.file] || 0) + 1;
        return acc;
      }, {});

      const topProblemFiles = Object.entries(issuesByFile)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);

      console.log('\n📁 Files with Most Issues:');
      topProblemFiles.forEach(([file, count], index) => {
        console.log(`  ${index + 1}. ${file}: ${count} issues`);
      });
    }

    console.log('\n🎉 Advanced analysis completed successfully!');

  } catch (error) {
    console.error('❌ Error during advanced analysis:', error.message);
    
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
      console.log('  - Consider increasing timeout for large projects');
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
