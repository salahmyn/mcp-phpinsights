# Examples

This directory contains examples demonstrating how to use the PHP Insights MCP Server in various scenarios.

## 📁 Files

### `basic-usage.js`
A simple example showing how to:
- Initialize the PHP Insights client
- Run basic code analysis
- Generate and display summaries
- Handle errors gracefully

**Usage:**
```bash
node examples/basic-usage.js /path/to/your/php/project
```

### `advanced-usage.js`
An advanced example demonstrating:
- Analyzing specific paths only
- Using custom PHP Insights configuration
- Generating MCP resources for IDE integration
- Attempting automated fixes (experimental)
- Detailed metrics analysis and reporting

**Usage:**
```bash
node examples/advanced-usage.js /path/to/your/php/project
```

### `phpinsights.config.php`
An example PHP Insights configuration file showing:
- How to configure PHP Insights for different presets
- Excluding directories from analysis
- Customizing rules and thresholds
- Setting quality requirements

**Usage:**
1. Copy this file to your PHP project root as `phpinsights.php`
2. Customize the configuration for your project
3. Use the MCP server with the custom configuration

## 🚀 Getting Started

1. **Build the project:**
   ```bash
   pnpm run build
   ```

2. **Run an example:**
   ```bash
   # Basic usage
   node examples/basic-usage.js /path/to/your/php/project
   
   # Advanced usage
   node examples/advanced-usage.js /path/to/your/php/project
   ```

3. **Set up PHP Insights in your project:**
   ```bash
   cd /path/to/your/php/project
   composer require nunomaduro/phpinsights
   ```

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PHP 7.4+ with Composer
- PHP Insights installed in your PHP project
- A valid PHP project to analyze

## 🔧 Configuration

### Custom PHP Insights Configuration

Create a `phpinsights.php` file in your project root:

```php
<?php
return [
    'preset' => 'laravel', // or 'symfony', 'magento2', 'drupal', 'default'
    'exclude' => [
        'vendor',
        'storage',
        'tests',
    ],
    'config' => [
        // Custom rule configurations
    ],
];
```

### MCP Server Configuration

The MCP server supports various configuration options:

```javascript
const result = await client.runAnalysis({
  projectRoot: '/path/to/php/project',
  paths: ['src/', 'app/'], // Optional: analyze specific paths
  configPath: '/path/to/custom/phpinsights.php', // Optional: custom config
  timeoutMs: 120000, // Optional: timeout in milliseconds
});
```

## 🎯 Use Cases

### 1. CI/CD Integration

Use the MCP server in your CI/CD pipeline to analyze code quality:

```javascript
const { PhpInsightsClient } = require('mcp-phpinsights');

async function analyzeCodeQuality(projectPath) {
  const client = new PhpInsightsClient();
  const result = await client.runAnalysis({ projectRoot: projectPath });
  
  // Check if quality meets requirements
  if (result.metrics?.code < 80) {
    throw new Error('Code quality below threshold');
  }
  
  return result;
}
```

### 2. IDE Integration

Generate MCP resources for IDE integration:

```javascript
const { PhpInsightsClient, ResultProcessor } = require('mcp-phpinsights');

async function generateIDEResources(projectPath) {
  const client = new PhpInsightsClient();
  const processor = new ResultProcessor();
  
  const result = await client.runAnalysis({ projectRoot: projectPath });
  const resources = processor.generateResources(result, projectPath);
  
  // Use resources in your IDE
  return resources;
}
```

### 3. Automated Code Fixes

Attempt to automatically fix code quality issues:

```javascript
const { PhpInsightsClient } = require('mcp-phpinsights');

async function fixCodeIssues(projectPath) {
  const client = new PhpInsightsClient();
  
  try {
    const fixResult = await client.runFix({
      projectRoot: projectPath,
      paths: ['src/'], // Only fix issues in src/ directory
    });
    
    console.log('Fixes applied:', fixResult);
  } catch (error) {
    console.log('Automatic fixes failed:', error.message);
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **PHP Insights not found:**
   ```
   Error: PHP Insights binary not found
   ```
   **Solution:** Install PHP Insights via Composer:
   ```bash
   composer require nunomaduro/phpinsights
   ```

2. **Permission errors:**
   ```
   Error: Permission denied
   ```
   **Solution:** Check file permissions for the PHP Insights binary:
   ```bash
   chmod +x vendor/bin/phpinsights
   ```

3. **Timeout errors:**
   ```
   Error: PHP Insights execution failed: timeout
   ```
   **Solution:** Increase the timeout for large projects:
   ```javascript
   const result = await client.runAnalysis({
     projectRoot: projectPath,
     timeoutMs: 300000, // 5 minutes
   });
   ```

4. **Invalid result format:**
   ```
   Error: Invalid PHP Insights result format
   ```
   **Solution:** Check PHP Insights configuration and ensure valid PHP files exist.

### Debug Mode

Enable debug logging to troubleshoot issues:

```bash
DEBUG=mcp-phpinsights:* node examples/basic-usage.js /path/to/php/project
```

## 📚 Additional Resources

- [PHP Insights Documentation](https://phpinsights.com/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [MCP Server Documentation](../README.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

## 🤝 Contributing

Found an issue with the examples? Have a suggestion for a new example?

1. Check the [existing issues](https://github.com/your-username/mcp-phpinsights/issues)
2. Create a new issue or pull request
3. Follow the [contributing guidelines](../CONTRIBUTING.md)

---

**Happy coding! 🎉**
