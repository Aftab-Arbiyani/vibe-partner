import { test, expect } from "@playwright/test";
import {
  goToBook,
  goToBookWithService,
  advanceToStep2,
  advanceToStep3,
  clickBack,
  clickContinue,
  fillDescription,
  fillContactFields,
  mockAvailabilityApi,
  mockCheckoutApi,
  MOCK_SLOTS,
} from "../helpers/book";

// ---------------------------------------------------------------------------
// Step 1 — Service selection
// ---------------------------------------------------------------------------

test.describe("Step 1 — service selection", () => {
  test.beforeEach(async ({ page }) => {
    await goToBook(page);
  });

  test("renders page heading and subtitle", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Book Your Session" })
    ).toBeVisible();
    await expect(
      page.getByText("Secure payment via Stripe")
    ).toBeVisible();
  });

  test("shows the step indicator starting at step 1", async ({ page }) => {
    const stepBubbles = page.locator(
      "div.rounded-full.flex.items-center.justify-center"
    );
    // first bubble should contain "1" and be highlighted (indigo)
    await expect(stepBubbles.first()).toContainText("1");
  });

  test("displays all four service cards", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /Async Bug Fix/ })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Live Pair Programming/ })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Monthly Retainer.*Starter/ })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Monthly Retainer.*Pro/ })
    ).toBeVisible();
  });

  test("each service card shows its price", async ({ page }) => {
    // prices are rendered as indigo spans next to the titles
    const cards = page.locator("button").filter({ hasText: /\$/ });
    await expect(cards).toHaveCount(4);
  });

  test("clicking Async Bug Fix advances to step 2 with correct header", async ({
    page,
  }) => {
    await advanceToStep2(page, "async");
    await expect(
      page.getByRole("heading", { name: /Describe the problem/ })
    ).toBeVisible();
  });

  test("clicking Monthly Retainer — Starter advances to step 2 with project header", async ({
    page,
  }) => {
    await advanceToStep2(page, "monthly");
    await expect(
      page.getByRole("heading", { name: /Tell us about your project/ })
    ).toBeVisible();
  });

  test("clicking Monthly Retainer — Pro advances to step 2 with project header", async ({
    page,
  }) => {
    await advanceToStep2(page, "pro");
    await expect(
      page.getByRole("heading", { name: /Tell us about your project/ })
    ).toBeVisible();
  });

  test("clicking Live Pair Programming advances to step 2", async ({
    page,
  }) => {
    await mockAvailabilityApi(page, []);
    await advanceToStep2(page, "live");
    await expect(page.getByRole("button", { name: /Back/ })).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Step 2 — Async Bug Fix
// ---------------------------------------------------------------------------

test.describe("Step 2 — Async Bug Fix", () => {
  test.beforeEach(async ({ page }) => {
    await goToBook(page);
    await advanceToStep2(page, "async");
  });

  test("back button returns to step 1", async ({ page }) => {
    await clickBack(page);
    await expect(
      page.getByRole("heading", { name: /What do you need help with/ })
    ).toBeVisible();
  });

  test("description textarea is visible", async ({ page }) => {
    await expect(page.locator("textarea")).toBeVisible();
  });

  test("shows validation warning when description is fewer than 10 characters", async ({
    page,
  }) => {
    await fillDescription(page, "too short");
    await expect(
      page.getByText("Please enter at least 10 characters")
    ).toBeVisible();
  });

  test("hides validation warning when description is 10+ characters", async ({
    page,
  }) => {
    await fillDescription(page, "This is a valid description.");
    await expect(
      page.getByText("Please enter at least 10 characters")
    ).not.toBeVisible();
  });

  test("Continue button is disabled when description is too short", async ({
    page,
  }) => {
    await fillDescription(page, "short");
    await expect(page.getByRole("button", { name: /Continue/ })).toBeDisabled();
  });

  test("Continue button is enabled when description is valid", async ({
    page,
  }) => {
    await fillDescription(page, "This is a valid description.");
    await expect(
      page.getByRole("button", { name: /Continue/ })
    ).not.toBeDisabled();
  });

  test("shows optional repo link / error paste field", async ({ page }) => {
    await expect(
      page.getByPlaceholder(/https:\/\/github\.com/)
    ).toBeVisible();
  });

  test("does not show country selector", async ({ page }) => {
    await expect(page.locator("select")).not.toBeVisible();
  });

  test("does not show slot picker", async ({ page }) => {
    await expect(page.getByText(/Pick a time slot/)).not.toBeVisible();
  });

  test("valid description advances to step 3", async ({ page }) => {
    await fillDescription(page, "My deployment pipeline keeps failing on step 3.");
    await advanceToStep3(page);
    await expect(
      page.getByRole("heading", { name: /Almost done/ })
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Step 2 — Live Pair Programming (slots available)
// ---------------------------------------------------------------------------

test.describe("Step 2 — Live Pair Programming (slots available)", () => {
  test.beforeEach(async ({ page }) => {
    await mockAvailabilityApi(page);
    await goToBook(page);
    await advanceToStep2(page, "live");
  });

  test("shows slot picker heading", async ({ page }) => {
    await expect(page.getByText(/Pick a time slot/)).toBeVisible();
  });

  test("renders a button for each available slot", async ({ page }) => {
    for (const slot of MOCK_SLOTS) {
      await expect(
        page.getByRole("button", { name: new RegExp(slot.startTime) })
      ).toBeVisible();
    }
  });

  test("Continue is disabled before description and slot are filled", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: /Continue/ })).toBeDisabled();
  });

  test("Continue is still disabled with description but no slot selected", async ({
    page,
  }) => {
    await fillDescription(page, "Need help debugging an auth flow in my Next.js app.");
    await expect(page.getByRole("button", { name: /Continue/ })).toBeDisabled();
  });

  test("selecting a slot highlights it", async ({ page }) => {
    const firstSlot = page
      .getByRole("button", { name: new RegExp(MOCK_SLOTS[0].startTime) })
      .first();
    await firstSlot.click();
    await expect(firstSlot).toHaveClass(/border-indigo-500/);
  });

  test("Continue is enabled once description and slot are both filled", async ({
    page,
  }) => {
    await fillDescription(page, "Need help debugging an auth flow in my Next.js app.");
    await page
      .getByRole("button", { name: new RegExp(MOCK_SLOTS[0].startTime) })
      .first()
      .click();
    await expect(
      page.getByRole("button", { name: /Continue/ })
    ).not.toBeDisabled();
  });

  test("shows country selector", async ({ page }) => {
    await expect(page.locator("select")).toBeVisible();
  });

  test("country selector contains options", async ({ page }) => {
    const options = page.locator("select option");
    await expect(options).not.toHaveCount(1); // more than just the placeholder
  });

  test("shows repo link field (visible for live, same as async)", async ({
    page,
  }) => {
    await expect(
      page.getByPlaceholder(/https:\/\/github\.com/)
    ).toBeVisible();
  });

  test("back button returns to step 1", async ({ page }) => {
    await clickBack(page);
    await expect(
      page.getByRole("button", { name: /Async Bug Fix/ })
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Step 2 — Live Pair Programming (no slots)
// ---------------------------------------------------------------------------

test.describe("Step 2 — Live Pair Programming (no slots)", () => {
  test.beforeEach(async ({ page }) => {
    await mockAvailabilityApi(page, []);
    await goToBook(page);
    await advanceToStep2(page, "live");
  });

  test("shows no-slots message", async ({ page }) => {
    await expect(
      page.getByText(/No slots available right now/)
    ).toBeVisible();
  });

  test("Continue is enabled with valid description even without a slot", async ({
    page,
  }) => {
    await fillDescription(page, "Need help with a tricky React state bug.");
    await expect(
      page.getByRole("button", { name: /Continue/ })
    ).not.toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Step 2 — Monthly Retainer (Starter & Pro)
// ---------------------------------------------------------------------------

test.describe("Step 2 — Monthly Retainer", () => {
  test.beforeEach(async ({ page }) => {
    await goToBook(page);
    await advanceToStep2(page, "monthly");
  });

  test("shows project-focused label", async ({ page }) => {
    await expect(
      page.getByText(/What are you building\? What's your goal\?/)
    ).toBeVisible();
  });

  test("does not show repo link field", async ({ page }) => {
    await expect(
      page.getByPlaceholder(/https:\/\/github\.com/)
    ).not.toBeVisible();
  });

  test("shows country selector", async ({ page }) => {
    await expect(page.locator("select")).toBeVisible();
  });

  test("does not show slot picker", async ({ page }) => {
    await expect(page.getByText(/Pick a time slot/)).not.toBeVisible();
  });

  test("Continue is enabled with valid description", async ({ page }) => {
    await fillDescription(
      page,
      "Building a SaaS dashboard with Cursor, need ongoing guidance."
    );
    await expect(
      page.getByRole("button", { name: /Continue/ })
    ).not.toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Step 3 — Contact details & checkout
// ---------------------------------------------------------------------------

test.describe("Step 3 — Contact details", () => {
  // No checkout mock here — tests that need specific checkout behaviour
  // register their own route. A shared success mock registered in beforeEach
  // would be picked up first (Playwright routes are FIFO) and would prevent
  // error/abort handlers added inside individual tests from ever firing.
  test.beforeEach(async ({ page }) => {
    await goToBook(page);
    await advanceToStep2(page, "async");
    await fillDescription(page, "Getting a 500 error when deploying my Next.js app to Vercel.");
    await advanceToStep3(page);
  });

  test("shows the 'Almost done' heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Almost done/ })
    ).toBeVisible();
  });

  test("back button returns to step 2", async ({ page }) => {
    await clickBack(page);
    await expect(page.locator("textarea")).toBeVisible();
  });

  test("shows name and email inputs", async ({ page }) => {
    await expect(page.getByPlaceholder("Jane Smith")).toBeVisible();
    await expect(page.getByPlaceholder("jane@example.com")).toBeVisible();
  });

  test("shows service summary with selected service", async ({ page }) => {
    await expect(page.getByText("Async Bug Fix")).toBeVisible();
  });

  test("submit button is disabled when name and email are empty", async ({
    page,
  }) => {
    await expect(
      page.getByRole("button", { name: /Pay & Confirm/ })
    ).toBeDisabled();
  });

  test("submit button is disabled when only name is filled", async ({
    page,
  }) => {
    await page.getByPlaceholder("Jane Smith").fill("Jane Smith");
    await expect(
      page.getByRole("button", { name: /Pay & Confirm/ })
    ).toBeDisabled();
  });

  test("submit button is disabled when only email is filled", async ({
    page,
  }) => {
    await page.getByPlaceholder("jane@example.com").fill("jane@example.com");
    await expect(
      page.getByRole("button", { name: /Pay & Confirm/ })
    ).toBeDisabled();
  });

  test("submit button is enabled when both name and email are filled", async ({
    page,
  }) => {
    await fillContactFields(page, "Jane Smith", "jane@example.com");
    await expect(
      page.getByRole("button", { name: /Pay & Confirm/ })
    ).not.toBeDisabled();
  });

  test("shows 'Redirecting to payment' while submitting", async ({ page }) => {
    // Delay checkout response to capture the submitting state
    await page.route("/api/checkout", async (route) => {
      await new Promise((r) => setTimeout(r, 300));
      await route.fulfill({ json: { url: "/book/success" } });
    });

    await fillContactFields(page, "Jane Smith", "jane@example.com");
    await page.getByRole("button", { name: /Pay & Confirm/ }).click();
    await expect(
      page.getByRole("button", { name: /Redirecting to payment/ })
    ).toBeVisible();
  });

  test("redirects to the URL returned by the checkout API", async ({
    page,
  }) => {
    await mockCheckoutApi(page, { url: "/book/success" });
    await fillContactFields(page, "Jane Smith", "jane@example.com");
    await page.getByRole("button", { name: /Pay & Confirm/ }).click();
    await page.waitForURL("**/book/success");
    await expect(
      page.getByRole("heading", { name: /You're booked/ })
    ).toBeVisible();
  });

  test("displays API error message when checkout returns an error", async ({
    page,
  }) => {
    await page.route("/api/checkout", (route) =>
      route.fulfill({
        status: 400,
        json: { error: "Invalid email address provided." },
      })
    );

    await fillContactFields(page, "Jane Smith", "jane@example.com");
    await page.getByRole("button", { name: /Pay & Confirm/ }).click();
    await expect(
      page.getByText("Invalid email address provided.")
    ).toBeVisible();
  });

  test("displays network error when request fails", async ({ page }) => {
    await page.route("/api/checkout", (route) => route.abort("failed"));

    await fillContactFields(page, "Jane Smith", "jane@example.com");
    await page.getByRole("button", { name: /Pay & Confirm/ }).click();
    await expect(page.getByText(/Network error/)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Step 3 — Slot shown in summary (Live service)
// ---------------------------------------------------------------------------

test.describe("Step 3 — slot shown in summary for Live service", () => {
  test("summary includes selected slot when service is live", async ({
    page,
  }) => {
    await mockAvailabilityApi(page);
    await mockCheckoutApi(page, { url: "/book/success" });
    await goToBook(page);
    await advanceToStep2(page, "live");

    await fillDescription(
      page,
      "Need help debugging a tricky async bug in my Express API."
    );
    await page
      .getByRole("button", { name: new RegExp(MOCK_SLOTS[0].startTime) })
      .first()
      .click();
    await clickContinue(page);

    await expect(page.getByText(/Slot:/)).toBeVisible();
    await expect(
      page.getByText(new RegExp(MOCK_SLOTS[0].startTime))
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// URL query-param preselection
// ---------------------------------------------------------------------------

test.describe("URL query-param preselection", () => {
  test("?service=async skips step 1 and lands on step 2", async ({ page }) => {
    await goToBookWithService(page, "async");
    await expect(
      page.getByRole("heading", { name: /Describe the problem/ })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Async Bug Fix/ })
    ).not.toBeVisible();
  });

  test("?service=monthly skips step 1 with project-focused header", async ({
    page,
  }) => {
    await goToBookWithService(page, "monthly");
    await expect(
      page.getByRole("heading", { name: /Tell us about your project/ })
    ).toBeVisible();
  });

  test("?service=pro skips step 1 with project-focused header", async ({
    page,
  }) => {
    await goToBookWithService(page, "pro");
    await expect(
      page.getByRole("heading", { name: /Tell us about your project/ })
    ).toBeVisible();
  });

  test("?service=live skips step 1 and triggers slot loading", async ({
    page,
  }) => {
    await mockAvailabilityApi(page);
    await goToBookWithService(page, "live");
    await expect(page.getByText(/Pick a time slot/)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Cancelled booking page
// ---------------------------------------------------------------------------

test.describe("/book/cancelled page", () => {
  test("shows cancellation message", async ({ page }) => {
    await page.goto("/book/cancelled");
    await expect(
      page.getByRole("heading", { name: /Payment cancelled/ })
    ).toBeVisible();
    await expect(page.getByText(/nothing was charged/)).toBeVisible();
  });

  test("'Try Again' link navigates back to /book", async ({ page }) => {
    await page.goto("/book/cancelled");
    await page.getByRole("link", { name: /Try Again/ }).click();
    await page.waitForURL("**/book");
    await expect(
      page.getByRole("heading", { name: /Book Your Session/ })
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Booking success page
// ---------------------------------------------------------------------------

test.describe("/book/success page", () => {
  test("shows confirmation message", async ({ page }) => {
    await page.goto("/book/success");
    await expect(
      page.getByRole("heading", { name: /You're booked/ })
    ).toBeVisible();
    await expect(page.getByText(/confirmation email/)).toBeVisible();
  });

  test("'Back to Home' link navigates to homepage", async ({ page }) => {
    await page.goto("/book/success");
    await page.getByRole("link", { name: /Back to Home/ }).click();
    await page.waitForURL("**/");
  });
});
