# Project: Vibe Partner

## Stack: Next.js App Router, TypeScript, Firestore

## Testing

- Framework: Playwright
- Test dir: tests/e2e
- Base URL: http://localhost:3000
- Config: playwright.config.ts

## Test Writing Rules

- Use Page Object Model for reusable UI interactions
- API route tests use `request` fixture (no browser needed)
- Always use `data-testid` attributes for selectors — never CSS classes
- Group related tests with `test.describe`
- Use `test.beforeEach` for login/auth setup

## Commands

- Run all tests: npm run test:e2e
- Run specific file: npx playwright test tests/e2e/ui/login.spec.ts
- Debug mode: npm run test:e2e:debug
- View report: npm run test:e2e:report
