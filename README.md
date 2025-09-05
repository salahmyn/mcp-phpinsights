# PHP Insights MCP Server

[![npm version](https://badge.fury.io/js/mcp-phpinsights.svg)](https://badge.fury.io/js/mcp-phpinsights)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![GitHub](https://img.shields.io/badge/GitHub-salahmyn%2Fmcp--phpinsights-blue.svg)](https://github.com/salahmyn/mcp-phpinsights)

A Model Context Protocol (MCP) server that brings [PHP Insights](https://phpinsights.com/) code analysis directly into **Cursor** and **VS Code**. Get AI-powered PHP code quality insights, automated fixes, and detailed analysis reports right in your favorite editor.

## 🎯 Perfect for AI-Powered Development

- **🤖 Cursor Integration**: Get PHP code analysis suggestions from Claude
- **💻 VS Code Support**: Use with any MCP-compatible VS Code extension
- **🔍 Real-time Analysis**: Analyze PHP code quality as you develop
- **📊 Smart Summaries**: Get AI-friendly summaries of code issues
- **🔧 Automated Fixes**: Let AI suggest and apply code improvements
- **⚡ Fast & Reliable**: Optimized for large PHP projects

## 🚀 Quick Setup

### 1. Install the MCP Server

```bash
# Install globally
npm install -g mcp-phpinsights

# Or install locally in your project (recommended for development)
pnpm add mcp-phpinsights
```

### 2. Set Up PHP Insights in Your Project

```bash
# Navigate to your PHP project
cd /path/to/your/php/project

# Install PHP Insights via Composer
composer require nunomaduro/phpinsights --dev

# Optional: Create a custom configuration
cp node_modules/mcp-phpinsights/examples/phpinsights.config.php phpinsights.php
```

### 3. Configure Cursor

Add this to your Cursor MCP settings:

**For Cursor (Settings → Features → Model Context Protocol):**

```json
{
  "mcpServers": {
    "phpinsights": {
      "command": "mcp-phpinsights",
      "args": []
    }
  }
}
```

**For VS Code with MCP Extension:**

```json
{
  "mcp.servers": {
    "phpinsights": {
      "command": "mcp-phpinsights",
      "args": []
    }
  }
}
```

## 💬 How to Use with Cursor & VS Code

### In Cursor

Once configured, you can ask Claude to analyze your PHP code:

**Example Prompts:**

- *"Analyze the code quality of my PHP project"*
- *"What are the main issues in my Laravel application?"*
- *"Can you fix the code quality issues in the src/ directory?"*
- *"Generate a summary of PHP Insights analysis for this project"*

**What Claude Can Do:**

- 🔍 Run comprehensive code analysis
- 📊 Generate detailed quality reports
- 🔧 Suggest and apply automated fixes
- 📈 Track code quality metrics over time
- 🎯 Focus analysis on specific directories

### In VS Code

With an MCP-compatible extension, you can:

1. **Right-click** on PHP files → "Analyze with PHP Insights"
2. **Command Palette** → "PHP Insights: Run Analysis"
3. **Status Bar** → Click PHP Insights icon for quick analysis
4. **Problems Panel** → View issues found by PHP Insights

## 🛠️ Available Tools

### `phpinsights_run`

Runs comprehensive PHP code analysis and returns detailed results.

**Use Cases:**

- Get complete code quality metrics
- Analyze specific directories or files
- Generate detailed reports for documentation

**Example Usage in Cursor:**

```
"Run PHP Insights analysis on my project and show me the results"
```

### `phpinsights_summary`

Generates human-readable summaries perfect for AI conversations.

**Use Cases:**

- Quick overview of code quality
- Identify top issues to focus on
- Get AI-friendly summaries for further analysis

**Example Output:**

```
📊 Code Quality Summary:
- Overall Score: 85/100
- Code Quality: 90%
- Architecture: 88%
- Style: 92%
- Complexity: 80%

🚨 Top Issues:
1. src/User.php:15 - Unused variable $temp
2. app/Controller.php:25 - Method too long (15 lines)
3. models/Product.php:8 - Missing type declaration
```

### `phpinsights_fix`

Applies automated fixes to common code quality issues.

**Use Cases:**

- Automatically fix style issues
- Apply PSR standards
- Clean up unused imports and variables

**Example Usage:**

```
"Fix all the code quality issues in my src/ directory"
```

### `phpinsights:problems` Resource

Provides structured access to all found issues for IDE integration.

**Use Cases:**

- IDE problem markers
- Quick navigation to issues
- Integration with other development tools

## ⚙️ Configuration

### PHP Insights Configuration

Create a `phpinsights.php` file in your project root to customize analysis:

```php
<?php
// phpinsights.php
return [
    'preset' => 'laravel', // or 'symfony', 'magento2', 'drupal', 'default'
    'ide' => 'vscode',     // for better IDE integration
    'exclude' => [
        'vendor',
        'storage',
        'bootstrap/cache',
        'node_modules',
        'tests',           // exclude test files if desired
    ],
    'config' => [
        // Customize specific rules
        \NunoMaduro\PhpInsights\Domain\Insights\CyclomaticComplexityIsHigh::class => [
            'maxComplexity' => 10, // Allow higher complexity
        ],
    ],
];
```

### Advanced MCP Configuration

For more control, you can configure the MCP server with custom settings:

```json
{
  "mcpServers": {
    "phpinsights": {
      "command": "mcp-phpinsights",
      "args": [],
      "env": {
        "PHPINSIGHTS_TIMEOUT": "300000",  // 5 minutes
        "PHPINSIGHTS_CONFIG": "/custom/path/phpinsights.php"
      }
    }
  }
}
```

## 🎯 Real-World Examples

### Example 1: Laravel Project Analysis

**Prompt in Cursor:**

```
"Analyze my Laravel project and tell me what needs improvement"
```

**Claude's Response:**

```
I'll analyze your Laravel project for code quality issues...

📊 Analysis Results:
- Overall Score: 78/100
- Code Quality: 85%
- Architecture: 80%
- Style: 75%
- Complexity: 70%

🚨 Priority Issues:
1. app/Http/Controllers/UserController.php:45 - Method too long (25 lines)
2. app/Models/Product.php:12 - Missing return type declaration
3. resources/views/users/index.blade.php:8 - Unused variable $temp

💡 Recommendations:
- Break down the long controller method into smaller functions
- Add proper type hints to model methods
- Remove unused variables in Blade templates

Would you like me to help fix any of these issues?
```

### Example 2: Automated Code Fixes

**Prompt in Cursor:**

```
"Fix all the style issues in my src/ directory"
```

**Claude's Response:**

```
I'll run PHP Insights with automatic fixes on your src/ directory...

🔧 Fixing Issues:
✅ Fixed 12 PSR-12 style violations
✅ Removed 3 unused imports
✅ Fixed 5 missing type declarations
✅ Corrected 2 indentation issues

📈 Results:
- Before: 75% style score
- After: 92% style score

The fixes have been applied automatically. Your code now follows PSR-12 standards!
```

### Example 3: Focused Analysis

**Prompt in Cursor:**

```
"Analyze only the app/Models directory and show me the complexity issues"
```

**Claude's Response:**

```
I'll analyze the Models directory for complexity issues...

📁 Analyzing: app/Models/
🔍 Found 3 complexity issues:

1. User.php:45 - calculateUserScore() method
   - Complexity: 12 (recommended: ≤10)
   - Issues: Multiple nested conditions
   - Suggestion: Extract validation logic to separate methods

2. Product.php:78 - processOrder() method  
   - Complexity: 15 (recommended: ≤10)
   - Issues: Long switch statement
   - Suggestion: Use strategy pattern or extract to service class

3. Order.php:123 - validateOrderData() method
   - Complexity: 11 (recommended: ≤10)
   - Issues: Multiple validation rules in one method
   - Suggestion: Split into individual validation methods

Would you like me to help refactor any of these methods?
```

## 🚨 Troubleshooting

### Common Issues

**"PHP Insights not found"**

```bash
# Make sure PHP Insights is installed
composer require nunomaduro/phpinsights --dev

# Verify installation
./vendor/bin/phpinsights --version
```

**"Permission denied"**

```bash
# Fix permissions
chmod +x vendor/bin/phpinsights
```

**"Timeout errors"**

- Increase timeout in MCP configuration
- Analyze smaller directories at a time
- Check if PHP Insights is properly configured

**"No issues found"**

- Verify your project has PHP files
- Check if directories are excluded in phpinsights.php
- Ensure PHP Insights can access your files

### Debug Mode

Enable debug logging to troubleshoot issues:

```json
{
  "mcpServers": {
    "phpinsights": {
      "command": "mcp-phpinsights",
      "args": [],
      "env": {
        "DEBUG": "mcp-phpinsights:*"
      }
    }
  }
}
```

## 🎉 Getting Started Checklist

- [ ] Install the MCP server: `npm install -g mcp-phpinsights`
- [ ] Install PHP Insights in your project: `composer require nunomaduro/phpinsights --dev`
- [ ] Configure Cursor/VS Code with MCP settings
- [ ] Test with a simple prompt: *"Analyze my PHP project"*
- [ ] Create a custom `phpinsights.php` config (optional)
- [ ] Start using AI-powered PHP code analysis! 🚀

## 📚 Additional Resources

- **[Examples](examples/)** - Complete usage examples and configurations
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to this project
- **[Changelog](CHANGELOG.md)** - Version history and updates
- **[PHP Insights Documentation](https://phpinsights.com/)** - Official PHP Insights docs
- **[Model Context Protocol](https://modelcontextprotocol.io/)** - MCP specification

## 🛠️ Development

This project uses **pnpm** as the recommended package manager for development. While npm works for installation, pnpm provides faster installs and better dependency management.

**For contributors:**
```bash
# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install

# Run development commands
pnpm run build
pnpm test
pnpm run lint
```

## 🤝 Contributing

We welcome contributions! Whether you're fixing bugs, adding features, or improving documentation, your help makes this project better for everyone.

**Quick Start:**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run tests: `pnpm test`
5. Submit a pull request

See our [Contributing Guide](CONTRIBUTING.md) for detailed information.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[PHP Insights](https://phpinsights.com/)** - The amazing PHP code analysis tool
- **[Model Context Protocol](https://modelcontextprotocol.io/)** - The MCP specification
- **[Cursor](https://cursor.sh/)** - AI-powered code editor
- **[VS Code](https://code.visualstudio.com/)** - Popular code editor with MCP support

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/salahmyn/mcp-phpinsights/issues)
- 💡 **Feature Requests**: [Open an issue](https://github.com/salahmyn/mcp-phpinsights/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/salahmyn/mcp-phpinsights/discussions)
- 📖 **Documentation**: Check the [examples](examples/) folder for more usage examples

When reporting issues, please include:

- PHP version and framework (Laravel, Symfony, etc.)
- Node.js version
- PHP Insights version
- Error logs and steps to reproduce

---

**Made with ❤️ for the PHP and AI development communities**
