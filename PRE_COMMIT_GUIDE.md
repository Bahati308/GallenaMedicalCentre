# Pre-commit Hook Guide

This project uses **lint-staged** and **husky** to automatically format and lint your code before every commit.

## 🚀 How It Works

When you commit code, the pre-commit hook automatically:

1. **Formats** staged files with Prettier
2. **Lints** staged files with ESLint
3. **Auto-fixes** any fixable linting issues
4. **Adds** the formatted files back to the commit
5. **Proceeds** with the commit if all checks pass

## ✅ Normal Usage (Automatic)

Just commit normally - the hook runs automatically:

```bash
# Stage your changes
git add .

# Commit - pre-commit hook runs automatically
git commit -m "Your commit message"
```

**What happens:**

- Prettier formats your staged files
- ESLint checks and fixes issues
- Formatted files are automatically staged
- Commit proceeds if everything passes

## 🧪 Test the Pre-commit Hook

Test it manually without committing:

```bash
# Run lint-staged manually
npx lint-staged
```

This will format and lint your staged files exactly as the pre-commit hook would.

## 📝 Example Workflow

```bash
# 1. Make changes to your files
# Edit src/components/Header.tsx

# 2. Stage your changes
git add src/components/Header.tsx

# 3. Commit (pre-commit hook runs automatically)
git commit -m "Update header component"

# Output you'll see:
# ✔ Preparing...
# ✔ Running tasks...
# ✔ Applying modifications...
# ✔ Cleaning up...
# [main abc1234] Update header component
```

## ⚠️ If Pre-commit Fails

If the pre-commit hook finds unfixable errors:

```bash
# You'll see errors like:
✖ eslint found some problems

# Fix the errors manually, then:
git add .
git commit -m "Your message"  # Try again
```

## 🚫 Bypass Pre-commit Hook (Emergency Only)

**⚠️ Only use this in emergencies!**

```bash
git commit --no-verify -m "Your commit message"
```

This skips all pre-commit hooks. **Use sparingly** - it's better to fix the issues.

## 🔧 Manual Commands

### Format and lint before committing (optional)

```bash
# Format all files
npm run format

# Fix linting issues
npm run lint:fix

# Or do both
npm run quality:fix
```

### Check what would be changed

```bash
# Check formatting without changing files
npm run format:check

# Check linting without fixing
npm run lint
```

## 📋 What Gets Checked

The pre-commit hook only checks **staged files**:

- **JavaScript/TypeScript** (`*.js`, `*.jsx`, `*.ts`, `*.tsx`)
  - ESLint check and auto-fix
  - Prettier formatting

- **JSON, CSS, Markdown** (`*.json`, `*.css`, `*.md`)
  - Prettier formatting only

## 🛠️ Troubleshooting

### Pre-commit hook not running?

1. **Check if husky is installed:**

   ```bash
   ls -la .husky/
   ```

2. **Reinitialize husky:**

   ```bash
   npm run prepare
   ```

3. **Make sure pre-commit file is executable:**
   ```bash
   chmod +x .husky/pre-commit
   ```

### Hook takes too long?

The hook only processes staged files, so it should be fast. If it's slow:

- Check how many files you're staging
- Consider committing smaller chunks

### ESLint errors that can't be auto-fixed?

Fix them manually:

```bash
npm run lint  # See the errors
# Fix them in your code
git add .
git commit -m "Your message"
```

## 📚 Configuration

### `.lintstagedrc.json`

Controls what runs on staged files:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"]
}
```

### `.husky/pre-commit`

The actual Git hook that runs lint-staged:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npx lint-staged
```

## 💡 Best Practices

1. **Let the hook do its job** - Don't manually format before committing
2. **Commit often** - Smaller commits = faster hooks
3. **Fix errors** - Don't bypass hooks unless absolutely necessary
4. **Review changes** - The hook may format code differently than you expect

## 🎯 Quick Reference

```bash
# Normal commit (hook runs automatically)
git add . && git commit -m "Message"

# Test hook manually
npx lint-staged

# Bypass hook (emergency only)
git commit --no-verify -m "Message"

# Manual format/lint
npm run quality:fix
```

---

**Remember:** The pre-commit hook is your friend! It ensures consistent code quality across the project. 🎉
