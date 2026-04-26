import { test, expect } from "@playwright/test";

test.describe("Homepage — Hero", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the main headline", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /vibe-coded/ })
    ).toBeVisible();
  });

  test("shows the 'Human support for AI builders' badge", async ({ page }) => {
    // exact:true avoids strict-mode violation — another section has the same
    // phrase ending with a period ("Human support for AI builders.")
    await expect(
      page.getByText("Human support for AI builders", { exact: true })
    ).toBeVisible();
  });

  test("'Book a Free Hour' CTA navigates to /book", async ({ page }) => {
    await page.getByRole("link", { name: /Book a Free Hour/ }).click();
    await page.waitForURL("**/book");
  });

  test("'See How It Works' CTA links to the how-it-works section", async ({
    page,
  }) => {
    const link = page.getByRole("link", { name: /See How It Works/ });
    const href = await link.getAttribute("href");
    expect(href).toBe("#how-it-works");
  });

  test("shows all five tool badges (Cursor, Lovable, Bolt, v0, Replit)", async ({
    page,
  }) => {
    for (const tool of ["Cursor", "Lovable", "Bolt", "v0", "Replit"]) {
      await expect(page.getByText(tool, { exact: true })).toBeVisible();
    }
  });

  test("shows social proof line", async ({ page }) => {
    await expect(
      page.getByText(/Trusted by indie hackers/)
    ).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Pricing section
// ---------------------------------------------------------------------------

test.describe("Homepage — Pricing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#pricing");
  });

  test("shows the Pricing section heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Simple, honest pricing/ })
    ).toBeVisible();
  });

  test("displays all three plans", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Pay-as-you-go", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Starter", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Pro", exact: true })
    ).toBeVisible();
  });

  test("Pro plan shows 'Most Popular' badge", async ({ page }) => {
    // Scoped to #pricing — the Services section also has a "Most Popular" label
    await expect(
      page.locator("#pricing").getByText("Most Popular")
    ).toBeVisible();
  });

  test("'Book a Session' CTA links to /book", async ({ page }) => {
    const link = page.getByRole("link", { name: "Book a Session" });
    const href = await link.getAttribute("href");
    expect(href).toBe("/book");
  });

  test("'Start Starter' CTA links to /book?service=monthly", async ({
    page,
  }) => {
    const link = page.getByRole("link", { name: "Start Starter" });
    const href = await link.getAttribute("href");
    expect(href).toBe("/book?service=monthly");
  });

  test("'Go Pro' CTA links to /book?service=pro", async ({ page }) => {
    const link = page.getByRole("link", { name: "Go Pro" });
    const href = await link.getAttribute("href");
    expect(href).toBe("/book?service=pro");
  });
});

// ---------------------------------------------------------------------------
// FAQ section
// ---------------------------------------------------------------------------

test.describe("Homepage — FAQ accordion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#faq");
  });

  test("FAQ heading is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Questions answered/ })
    ).toBeVisible();
  });

  test("renders all six FAQ questions", async ({ page }) => {
    const questions = [
      "What AI tools do you support?",
      "How fast will I get a response?",
      "What if my problem is too complex?",
      "Do I need to know how to code?",
      "Can I cancel my monthly plan?",
      "What's the AI-Guided Build service exactly?",
    ];
    for (const q of questions) {
      await expect(page.getByText(q)).toBeVisible();
    }
  });

  test("FAQ answers are hidden by default", async ({ page }) => {
    await expect(
      page.getByText(/We work with all major vibe-coding tools/)
    ).not.toBeVisible();
  });

  test("clicking a question reveals its answer", async ({ page }) => {
    await page.getByText("What AI tools do you support?").click();
    await expect(
      page.getByText(/We work with all major vibe-coding tools/)
    ).toBeVisible();
  });

  test("clicking the same question again hides the answer", async ({
    page,
  }) => {
    await page.getByText("What AI tools do you support?").click();
    await expect(
      page.getByText(/We work with all major vibe-coding tools/)
    ).toBeVisible();
    await page.getByText("What AI tools do you support?").click();
    await expect(
      page.getByText(/We work with all major vibe-coding tools/)
    ).not.toBeVisible();
  });

  test("opening a second question closes the first", async ({ page }) => {
    await page.getByText("What AI tools do you support?").click();
    await expect(
      page.getByText(/We work with all major vibe-coding tools/)
    ).toBeVisible();

    await page.getByText("Do I need to know how to code?").click();
    await expect(
      page.getByText(/Not at all\. We explain everything/)
    ).toBeVisible();
    await expect(
      page.getByText(/We work with all major vibe-coding tools/)
    ).not.toBeVisible();
  });

  test("clicking every question eventually expands it", async ({ page }) => {
    const answers = [
      { question: "How fast will I get a response?", answer: /within 24 hours/ },
      { question: "What if my problem is too complex?", answer: /scope it upfront/ },
      { question: "Can I cancel my monthly plan?", answer: /cancel anytime/ },
    ];
    for (const { question, answer } of answers) {
      await page.getByText(question).click();
      await expect(page.getByText(answer)).toBeVisible();
    }
  });
});

// ---------------------------------------------------------------------------
// Page sections presence
// ---------------------------------------------------------------------------

test.describe("Homepage — sections present", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("How It Works section is present", async ({ page }) => {
    await expect(page.locator("#how-it-works")).toBeVisible();
  });

  test("Services section is present", async ({ page }) => {
    await expect(page.locator("#services")).toBeVisible();
  });

  test("Pricing section is present", async ({ page }) => {
    await expect(page.locator("#pricing")).toBeVisible();
  });

  test("FAQ section is present", async ({ page }) => {
    await expect(page.locator("#faq")).toBeVisible();
  });
});
