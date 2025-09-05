# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-05

### Added

- **Initial Release**: Complete MCP server implementation for PHP Insights
- **Core Tools**:
  - `phpinsights.run`: Execute PHP Insights analysis and return raw JSON results
  - `phpinsights.summary`: Generate human-readable summaries with top issues
  - `phpinsights.fix`: Apply automatic fixes to code quality issues (experimental)
- **Resource Support**:
  - `phpinsights:problems`: Access analysis results as MCP resources
- **Professional Architecture**:
  - Modular design with separation of concerns
  - Comprehensive TypeScript type definitions
  - Custom error handling with specific error types
  - Input validation using Zod schemas
- **Configuration Support**:
  - Custom PHP Insights configuration file paths
  - Configurable timeouts for large codebases
  - Path filtering for targeted analysis
- **Error Handling**:
  - `ConfigurationError`: Invalid project setup or missing dependencies
  - `ExecutionError`: PHP Insights execution failures
  - `PhpInsightsError`: General PHP Insights related errors
- **Development Tools**:
  - Complete test suite with mocked PHP Insights
  - TypeScript configuration with strict type checking
  - ESLint and code quality checks
  - Build system with proper module exports
- **Documentation**:
  - Comprehensive README with usage examples
  - API documentation with JSDoc comments
  - Contributing guidelines
  - MIT License

### Technical Details

- **Module System**: Full ESM support with proper imports/exports
- **Dependencies**:
  - `@modelcontextprotocol/sdk`: Latest MCP SDK for server implementation
  - `execa`: Secure process execution for PHP Insights
  - `zod`: Runtime type validation and schema definition
- **Build System**: TypeScript compilation with declaration files
- **Testing**: Vitest with coverage reporting
- **Code Quality**: Passes all linting and complexity checks

### Performance

- Optimized for large PHP codebases
- Configurable timeouts (default: 2 minutes for analysis, 3 minutes for fixes)
- Efficient result processing and formatting
- Memory-conscious implementation

### Compatibility

- **Node.js**: 18+ (ESM support required)
- **PHP**: 7.4+ with Composer
- **PHP Insights**: Latest version via Composer
- **MCP Clients**: Compatible with all MCP-compatible clients

---

## Version History

### 1.0.0 (Initial Release)

- Complete MCP server implementation
- All core tools and resources
- Professional architecture and error handling
- Comprehensive documentation and testing

---

## Release Notes

### 1.0.0 - Initial Release

This is the initial release of the PHP Insights MCP Server, providing a complete integration between PHP Insights code analysis and the Model Context Protocol.

**Key Features:**

- Full MCP server implementation with tools and resources
- Professional TypeScript architecture with comprehensive error handling
- Support for all major PHP Insights features
- Extensive documentation and testing

**Getting Started:**

1. Install PHP Insights in your PHP project via Composer
2. Install this MCP server: `npm install -g mcp-phpinsights`
3. Start the server: `mcp-phpinsights`
4. Connect with any MCP-compatible client

**Breaking Changes:**

- None (initial release)

**Migration Guide:**

- Not applicable (initial release)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for information on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
