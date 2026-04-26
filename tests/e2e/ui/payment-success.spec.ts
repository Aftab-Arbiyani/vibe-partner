import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Custom request success (?type=custom)
// ---------------------------------------------------------------------------

test.describe("Payment success — custom request", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/payment-success?type=custom");
  });

  test("shows 'Request received!' heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Request received/ })
    ).toBeVisible();
  });

  test("shows confirmation copy about advance payment", async ({ page }) => {
    await expect(page.getByText(/Your advance payment went through/)).toBeVisible();
  });

  test("shows the 24–48 hour response window", async ({ page }) => {
    await expect(page.getByText(/24–48 hours/)).toBeVisible();
  });

  test("'Back to Home' link navigates to /", async ({ page }) => {
    await page.getByRole("link", { name: /Back to Home/ }).click();
    await page.waitForURL("**/");
  });

  test("'Browse More Skills' link navigates to /skills", async ({ page }) => {
    await page.getByRole("link", { name: /Browse More Skills/ }).click();
    await page.waitForURL("**/skills");
  });
});

// ---------------------------------------------------------------------------
// Skill purchase — loading state (polling in progress)
// ---------------------------------------------------------------------------

test.describe("Payment success — skill purchase (loading)", () => {
  test("shows loading spinner while polling for download link", async ({
    page,
  }) => {
    // Delay the download-link response so we can observe the loading state
    await page.route("/api/get-download-link**", async (route) => {
      await new Promise((r) => setTimeout(r, 3000));
      await route.fulfill({ json: { status: "pending" } });
    });

    await page.goto("/payment-success?session_id=sess_test_123");
    await expect(
      page.getByRole("heading", { name: /Payment confirmed/ })
    ).toBeVisible();
    await expect(
      page.getByText(/Preparing your download/)
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Skill purchase — download ready
// ---------------------------------------------------------------------------

test.describe("Payment success — skill purchase (download ready)", () => {
  test.beforeEach(async ({ page }) => {
    // Use a same-origin download URL so the programmatic <a> click stays on
    // localhost and doesn't navigate the page to an external domain.
    await page.route("**/api/skills/download/test-id", (route) =>
      route.fulfill({
        status: 200,
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": 'attachment; filename="skill.md"',
        },
        body: "# Test Skill Content",
      })
    );
    await page.route("**/api/get-download-link**", (route) =>
      route.fulfill({
        json: {
          status: "ready",
          skillTitle: "Claude Blueprint Skill",
          downloadUrl: "http://localhost:9002/api/skills/download/test-id",
        },
      })
    );
    await page.goto("/payment-success?session_id=sess_test_ready");
  });

  test("shows 'Download started!' heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Download started/ })
    ).toBeVisible();
  });

  test("shows the skill title", async ({ page }) => {
    await expect(page.getByText("Claude Blueprint Skill")).toBeVisible();
  });

  test("shows 'Download Again' link", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /Download Again/ })
    ).toBeVisible();
  });

  test("'Download Again' link points to the download URL", async ({ page }) => {
    const link = page.getByRole("link", { name: /Download Again/ });
    const href = await link.getAttribute("href");
    expect(href).toBe("http://localhost:9002/api/skills/download/test-id");
  });
});

// ---------------------------------------------------------------------------
// Skill purchase — all polls exhausted (email fallback)
// ---------------------------------------------------------------------------

test.describe("Payment success — skill purchase (email fallback)", () => {
  test.beforeEach(async ({ page }) => {
    // Always return a non-ready response so polling exhausts all 5 attempts
    await page.route("/api/get-download-link**", (route) =>
      route.fulfill({ json: { status: "pending" } })
    );

    // Speed up by going to the page; the component retries with back-off
    // We'll wait up to 30 s for the fallback state to appear
    await page.goto("/payment-success?session_id=sess_fail");
  });

  test("shows 'Check your email' heading after all retries fail", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: /Check your email/ })
    ).toBeVisible({ timeout: 30_000 });
  });

  test("fallback shows payment confirmed message", async ({ page }) => {
    await expect(
      page.getByText(/Payment confirmed/)
    ).toBeVisible({ timeout: 30_000 });
  });

  test("fallback 'Back to Home' link navigates to /", async ({ page }) => {
    await page.getByRole("link", { name: /Back to Home/ }).click();
    await page.waitForURL("**/");
  });

  test("fallback 'Browse More Skills' link navigates to /skills", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /Browse More Skills/ }).click();
    await page.waitForURL("**/skills");
  });
});

// ---------------------------------------------------------------------------
// Skill purchase — no session_id (shows loading spinner indefinitely)
// ---------------------------------------------------------------------------

test.describe("Payment success — no session_id", () => {
  test("visiting without session_id stays in loading state", async ({
    page,
  }) => {
    // Without a session_id the useEffect short-circuits — still shows loading UI
    await page.goto("/payment-success");
    // The Suspense fallback or loading state should be visible
    await expect(page.getByText(/Loading|Payment confirmed/i)).toBeVisible();
  });
});
