import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:9002",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  // Auto-start Next.js dev server before tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:9002",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      // Fixed password so admin E2E tests can compute a valid auth token.
      // Admin tests set the admin_auth cookie directly rather than going
      // through the login form, so this only needs to match the cookie value.
      ADMIN_PASSWORD: "playwright-test",
    },
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    ...(process.env.CI
      ? [{ name: "mobile", use: { ...devices["iPhone 13"] } }]
      : []),
  ],
});
