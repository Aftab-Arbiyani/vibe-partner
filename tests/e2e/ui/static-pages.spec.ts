import { test, expect } from "@playwright/test";

// ---------------------------------------------------------------------------
// Privacy Policy page
// ---------------------------------------------------------------------------

test.describe("Privacy Policy page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/privacy");
  });

  test("shows the Privacy Policy heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Privacy Policy" })
    ).toBeVisible();
  });

  test("shows the last-updated date", async ({ page }) => {
    // Exact text avoids strict-mode violation — section 11 body also contains
    // "updated" which causes /Last updated/ to match two elements.
    await expect(
      page.getByText("Last updated: April 21, 2026", { exact: true })
    ).toBeVisible();
  });

  test("renders all 12 section headings", async ({ page }) => {
    const sections = [
      "1. Overview",
      "2. Information We Collect",
      "3. How We Use Your Information",
      "4. Third-Party Services",
      "5. Code and Repository Access",
      "6. Data Retention",
      "7. Cookies",
      "8. Your Rights",
      "9. Security",
      "10. Children's Privacy",
      "11. Changes to This Policy",
      "12. Contact",
    ];
    for (const heading of sections) {
      await expect(
        page.getByRole("heading", { name: heading })
      ).toBeVisible();
    }
  });

  test("contact email link is present", async ({ page }) => {
    const emailLinks = page.getByRole("link", {
      name: "hello@vibepartner.com",
    });
    await expect(emailLinks.first()).toBeVisible();
  });

  test("Stripe privacy policy link opens in new tab", async ({ page }) => {
    const stripeLink = page.getByRole("link", { name: /Stripe.*Privacy Policy/i });
    await expect(stripeLink).toHaveAttribute("target", "_blank");
  });

  test("navbar is rendered on the page", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "VibePartner" }).first()
    ).toBeVisible();
  });

  test("footer is rendered on the page", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Terms of Service page
// ---------------------------------------------------------------------------

test.describe("Terms of Service page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/terms");
  });

  test("shows the Terms of Service heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Terms of Service" })
    ).toBeVisible();
  });

  test("shows the last-updated date", async ({ page }) => {
    await expect(page.getByText(/Last updated/)).toBeVisible();
  });

  test("renders all 14 section headings", async ({ page }) => {
    const sections = [
      "1. Agreement",
      "2. Services",
      "3. Eligibility",
      "4. Pricing and Payments",
      "5. Cancellations and Refunds",
      "6. Your Responsibilities",
      "7. Deliverables and Intellectual Property",
      "8. Confidentiality",
      "9. No Guarantee of Outcome",
      "10. Disclaimer of Warranties",
      "11. Limitation of Liability",
      "12. Governing Law",
      "13. Changes to These Terms",
      "14. Contact",
    ];
    for (const heading of sections) {
      await expect(
        page.getByRole("heading", { name: heading })
      ).toBeVisible();
    }
  });

  test("contact email link is present", async ({ page }) => {
    const emailLinks = page.getByRole("link", {
      name: "hello@vibepartner.com",
    });
    await expect(emailLinks.first()).toBeVisible();
  });

  test("navbar is rendered on the page", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "VibePartner" }).first()
    ).toBeVisible();
  });

  test("footer is rendered on the page", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// 404 not-found page
// ---------------------------------------------------------------------------

test.describe("404 Not Found page", () => {
  test("shows a not-found page for an unknown route", async ({ page }) => {
    const response = await page.goto("/this-page-definitely-does-not-exist");
    expect(response?.status()).toBe(404);
  });

  test("404 page renders some content (not a blank screen)", async ({
    page,
  }) => {
    await page.goto("/this-page-definitely-does-not-exist");
    // Next.js not-found pages always render something
    const body = page.locator("body");
    await expect(body).not.toBeEmpty();
  });
});

// ---------------------------------------------------------------------------
// API Docs page
// ---------------------------------------------------------------------------

test.describe("API Docs page", () => {
  test("renders the Swagger UI", async ({ page }) => {
    await page.goto("/api-docs");
    // swagger-ui-react renders a div with id="swagger-ui" or class containing swagger
    await expect(
      page.locator(".swagger-ui, #swagger-ui, [class*='swagger']").first()
    ).toBeVisible({ timeout: 10_000 });
  });
});
