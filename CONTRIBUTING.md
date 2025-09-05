# Contributing to PHP Insights MCP Server

Thank you for your interest in contributing to the PHP Insights MCP Server! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Check the documentation** to ensure it's not a configuration issue
3. **Provide detailed information** including:
   - PHP version
   - Node.js version
   - PHP Insights version
   - Operating system
   - Error logs
   - Steps to reproduce

### Suggesting Features

We welcome feature suggestions! Please:

1. **Check existing issues** for similar requests
2. **Describe the use case** and why it would be valuable
3. **Provide examples** of how the feature would work
4. **Consider implementation complexity** and maintenance burden

### Code Contributions

#### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/mcp-phpinsights.git
   cd mcp-phpinsights
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Workflow

1. **Make your changes** following our coding standards
2. **Add tests** for new functionality
3. **Run tests** to ensure everything works:
   ```bash
   pnpm test
   pnpm run lint
   ```
4. **Build the project** to check for TypeScript errors:
   ```bash
   pnpm run build
   ```
5. **Commit your changes** with a clear commit message
6. **Push to your fork** and create a Pull Request

#### Coding Standards

##### TypeScript/JavaScript

- **Use TypeScript** for all new code
- **Follow existing patterns** and architecture
- **Add JSDoc comments** for public APIs
- **Use meaningful variable names**
- **Keep functions small** and focused
- **Handle errors gracefully**

##### Code Style

- **Use 2 spaces** for indentation
- **Use semicolons** consistently
- **Use single quotes** for strings
- **Use trailing commas** in objects and arrays
- **Use const/let** instead of var
- **Use arrow functions** where appropriate

##### Testing

- **Write unit tests** for new functionality
- **Test error cases** and edge cases
- **Maintain test coverage** above 80%
- **Use descriptive test names**
- **Mock external dependencies**

#### Commit Message Format

Use clear, descriptive commit messages:

```
feat: add support for custom PHP Insights config paths
fix: resolve timeout issues with large codebases
docs: update README with new installation instructions
test: add unit tests for result processor
refactor: simplify error handling in phpinsights-client
```

#### Pull Request Process

1. **Ensure tests pass** and coverage is maintained
2. **Update documentation** if needed
3. **Add changelog entry** for user-facing changes
4. **Request review** from maintainers
5. **Address feedback** promptly
6. **Keep PRs focused** and reasonably sized

## 🏗️ Project Structure

```
src/
├── index.ts              # Main entry point and exports
├── server.ts             # MCP server implementation
├── types.ts              # TypeScript type definitions
├── phpinsights-client.ts # PHP Insights client wrapper
├── result-processor.ts   # Result processing and formatting
├── tools.ts              # Tool handlers
└── server.test.ts        # Test suite
```

### Key Components

- **`server.ts`**: Main MCP server implementation using the MCP SDK
- **`phpinsights-client.ts`**: Handles execution of PHP Insights commands
- **`result-processor.ts`**: Processes and formats PHP Insights results
- **`tools.ts`**: Tool handlers for MCP tools
- **`types.ts`**: TypeScript type definitions and schemas

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with coverage
pnpm run test:coverage

# Run tests in watch mode
pnpm run test:watch

# Run specific test file
pnpm test -- server.test.ts
```

### Test Structure

- **Unit tests** for individual components
- **Integration tests** for MCP server functionality
- **Mock PHP Insights** for consistent testing
- **Error handling tests** for edge cases

### Adding Tests

When adding new functionality:

1. **Create test files** following the naming pattern `*.test.ts`
2. **Test happy paths** and error cases
3. **Mock external dependencies** (file system, PHP Insights)
4. **Use descriptive test names** that explain the behavior
5. **Keep tests focused** and independent

## 📚 Documentation

### Code Documentation

- **JSDoc comments** for all public APIs
- **Inline comments** for complex logic
- **Type annotations** for better IDE support
- **README updates** for new features

### API Documentation

When adding new tools or changing existing ones:

1. **Update README.md** with new tool documentation
2. **Add examples** showing usage
3. **Document parameters** and return values
4. **Include error cases** and handling

## 🐛 Debugging

### Common Issues

1. **PHP Insights not found**: Ensure PHP Insights is installed via Composer
2. **Permission errors**: Check file permissions for PHP Insights binary
3. **Timeout issues**: Increase timeout for large codebases
4. **Type errors**: Ensure TypeScript types are properly defined

### Debug Mode

Enable debug logging by setting environment variables:

```bash
DEBUG=mcp-phpinsights:* pnpm start
```

## 🚀 Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

1. **Update version** in package.json
2. **Update CHANGELOG.md** with new features/fixes
3. **Run full test suite** to ensure stability
4. **Build and test** the release
5. **Create GitHub release** with release notes
6. **Publish to npm** (maintainers only)

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check README.md and inline docs
- **Code Review**: Ask questions in Pull Request comments

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

- **Performance improvements** for large codebases
- **Additional PHP Insights features** support
- **Better error messages** and debugging
- **Documentation improvements**
- **Test coverage** improvements
- **CI/CD pipeline** enhancements

## 📋 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:

- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience, education
- Nationality, personal appearance
- Race, religion, sexual orientation

### Expected Behavior

- **Be respectful** and inclusive
- **Be constructive** in feedback
- **Be patient** with newcomers
- **Be collaborative** and helpful

### Unacceptable Behavior

- Harassment, trolling, or discrimination
- Personal attacks or inappropriate language
- Spam or off-topic discussions
- Any behavior that makes others feel unwelcome

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to PHP Insights MCP Server! 🎉
