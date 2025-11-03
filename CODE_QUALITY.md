# Code Quality & Formatting Guide

This project uses Prettier and ESLint for consistent code formatting and quality checks across both frontend and backend code.

## 🎨 Formatting (Prettier)

### Format All Files

```bash
npm run format
```

### Check Formatting (without changing files)

```bash
npm run format:check
```

### Format Specific Areas

```bash
# Frontend only
npm run format:frontend

# Backend only
npm run format:backend
```

## 🔍 Linting (ESLint)

### Lint All Files

```bash
npm run lint
```

### Auto-fix Linting Issues

```bash
npm run lint:fix
```

### Lint Specific Areas

```bash
# Frontend only
npm run lint:frontend

# Backend only
npm run lint:backend
```

## ✅ Quality Checks

### Run All Quality Checks

```bash
npm run quality
```

This checks:

- ✅ Code formatting (Prettier)
- ✅ Code quality (ESLint)

### Auto-fix All Issues

```bash
npm run quality:fix
```

This will:

- ✅ Format all files
- ✅ Fix all auto-fixable linting issues

## 📋 Configuration Files

### `.prettierrc`

Prettier configuration for consistent code formatting.

### `.prettierignore`

Files and directories excluded from Prettier formatting.

### `.eslintrc.json`

ESLint configuration with:

- React/TypeScript support
- Node.js backend support
- Prettier integration
- Custom rules for code quality

### `.editorconfig`

Editor configuration for consistent file formatting across different editors.

## 🔄 Pre-commit Hooks

This project uses `lint-staged` and `husky` to automatically format and lint code before commits.

### Setup (if not already done)

```bash
npm run prepare
```

### What Happens on Commit

When you commit code:

1. **Staged files** are automatically formatted with Prettier
2. **Staged files** are automatically linted with ESLint
3. **Auto-fixable issues** are fixed automatically
4. **Commit proceeds** if all checks pass

### Bypass Pre-commit Hooks (if needed)

```bash
git commit --no-verify -m "your message"
```

⚠️ **Only use `--no-verify` in emergencies!**

## 📝 Code Style Guidelines

### JavaScript/TypeScript

- **Single quotes** for strings
- **Semicolons** required
- **2 spaces** for indentation
- **100 characters** max line length
- **Trailing commas** in arrays/objects

### React/JSX

- **Functional components** preferred
- **TypeScript** for type safety
- **React Hooks** for state management

### Backend (Node.js)

- **ES modules** (import/export)
- **Async/await** preferred over callbacks
- **Error handling** required

## 🚀 Integration with CI/CD

The GitHub Actions workflow includes quality checks:

```yaml
- name: Check formatting
  run: npm run format:check

- name: Run linter
  run: npm run lint
```

## 🛠️ IDE Integration

### VS Code

1. Install extensions:
   - ESLint
   - Prettier - Code formatter
   - EditorConfig

2. Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Other IDEs

- Configure Prettier and ESLint plugins
- Enable format on save
- Enable auto-fix on save

## 📊 Quality Metrics

### Current Status

Run quality checks to see:

- ✅ Number of files formatted correctly
- ✅ Number of linting errors/warnings
- ✅ Auto-fixable issues

### Best Practices

1. **Format before committing**: `npm run format`
2. **Fix linting issues**: `npm run lint:fix`
3. **Run quality checks**: `npm run quality`
4. **Let pre-commit hooks do their job**

## 🔧 Troubleshooting

### Formatting Issues

```bash
# Force format all files
npm run format

# Check what would change
npm run format:check
```

### Linting Errors

```bash
# See all errors
npm run lint

# Auto-fix what can be fixed
npm run lint:fix
```

### Pre-commit Hook Issues

```bash
# Reinstall husky
npm run prepare

# Or manually run lint-staged
npx lint-staged
```

## 📚 Additional Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [EditorConfig Documentation](https://editorconfig.org/)

---

**Remember:** Consistent code formatting makes the codebase easier to read, maintain, and collaborate on! 🎉
