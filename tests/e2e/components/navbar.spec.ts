import { test, expect } from "@playwright/test";

// Tests run against the homepage since Navbar is rendered on every page.
// Mobile viewport tests use a separate project config (iPhone 13 → 390px wide).

test.describe("Navbar — desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("logo is visible and links to /", async ({ page }) => {
    const logo = page.getByRole("link", { name: "VibePartner" }).first();
    await expect(logo).toBeVisible();
    const href = await logo.getAttribute("href");
    expect(href).toBe("/");
  });

  test("Services nav link is visible", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Services" }).first()
    ).toBeVisible();
  });

  test("How It Works nav link is visible", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "How It Works" }).first()
    ).toBeVisible();
  });

  test("Pricing nav link is visible", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Pricing" }).first()
    ).toBeVisible();
  });

  test("Skills nav link is visible and points to /skills", async ({ page }) => {
    const link = page.getByRole("link", { name: "Skills" }).first();
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(href).toBe("/skills");
  });

  test("FAQ nav link is visible", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "FAQ" }).first()
    ).toBeVisible();
  });

  test("'Get Started' CTA button is visible and links to /book", async ({
    page,
  }) => {
    const cta = page.getByRole("link", { name: "Get Started" }).first();
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute("href");
    expect(href).toBe("/book");
  });

  test("clicking 'Get Started' navigates to /book", async ({ page }) => {
    await page.getByRole("link", { name: "Get Started" }).first().click();
    await page.waitForURL("**/book");
  });

  test("clicking Skills link navigates to /skills", async ({ page }) => {
    await page.getByRole("link", { name: "Skills" }).first().click();
    await page.waitForURL("**/skills");
  });
});

// ---------------------------------------------------------------------------
// Navbar — mobile menu (viewport ≤ 767 px)
// ---------------------------------------------------------------------------

test.describe("Navbar — mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hamburger menu button is visible on mobile", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Toggle menu/ })).toBeVisible();
  });

  test("desktop nav links are hidden on mobile", async ({ page }) => {
    // The desktop links container has hidden md:flex — on mobile it's not visible
    const desktopNav = page.locator(".hidden.md\\:flex");
    await expect(desktopNav).toBeHidden();
  });

  test("clicking hamburger opens the mobile menu", async ({ page }) => {
    await page.getByRole("button", { name: /Toggle menu/ }).click();
    await expect(
      page.getByRole("link", { name: "Get Started" }).last()
    ).toBeVisible();
  });

  test("mobile menu contains all nav links", async ({ page }) => {
    await page.getByRole("button", { name: /Toggle menu/ }).click();
    for (const name of ["Services", "How It Works", "Pricing", "Skills", "FAQ"]) {
      await expect(page.getByRole("link", { name }).last()).toBeVisible();
    }
  });

  test("clicking a mobile menu link closes the menu", async ({ page }) => {
    await page.getByRole("button", { name: /Toggle menu/ }).click();
    await page.getByRole("link", { name: "Skills" }).last().click();
    // After navigation, menu should be closed (component state resets on navigate)
    await page.waitForURL("**/skills");
  });

  test("clicking hamburger again closes the mobile menu", async ({ page }) => {
    const toggle = page.getByRole("button", { name: /Toggle menu/ });
    await toggle.click();
    await expect(
      page.getByRole("link", { name: "Get Started" }).last()
    ).toBeVisible();
    await toggle.click();
    await expect(
      page.getByRole("link", { name: "Get Started" }).last()
    ).not.toBeVisible();
  });

  test("'Get Started' in mobile menu links to /book", async ({ page }) => {
    await page.getByRole("button", { name: /Toggle menu/ }).click();
    const cta = page.getByRole("link", { name: "Get Started" }).last();
    const href = await cta.getAttribute("href");
    expect(href).toBe("/book");
  });
});
