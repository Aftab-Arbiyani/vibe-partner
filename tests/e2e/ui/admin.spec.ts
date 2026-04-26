import { test, expect } from "@playwright/test";
import {
  goToAdminLogin,
  mockAdminLoginApi,
  submitLoginForm,
  authenticateAsAdmin,
} from "../helpers/admin";

// ---------------------------------------------------------------------------
// Admin login page
// ---------------------------------------------------------------------------

test.describe("Admin login — structure", () => {
  test.beforeEach(async ({ page }) => {
    await goToAdminLogin(page);
  });

  test("shows the VibePartner logo link", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "VibePartner" })
    ).toBeVisible();
  });

  test("shows 'Admin access' subtitle", async ({ page }) => {
    await expect(page.getByText("Admin access")).toBeVisible();
  });

  test("shows the password input", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Enter admin password")
    ).toBeVisible();
  });

  test("password input is of type password (masked)", async ({ page }) => {
    const input = page.getByPlaceholder("Enter admin password");
    await expect(input).toHaveAttribute("type", "password");
  });

  test("shows the Sign In button", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /Sign In/ })
    ).toBeVisible();
  });

  test("logo link points to /", async ({ page }) => {
    const logo = page.getByRole("link", { name: "VibePartner" });
    const href = await logo.getAttribute("href");
    expect(href).toBe("/");
  });
});

// ---------------------------------------------------------------------------
// Admin login — form behaviour
// ---------------------------------------------------------------------------

test.describe("Admin login — form behaviour", () => {
  test.beforeEach(async ({ page }) => {
    await goToAdminLogin(page);
  });

  test("submit button is disabled while loading", async ({ page }) => {
    await page.route("/api/admin/login", async (route) => {
      await new Promise((r) => setTimeout(r, 300));
      await route.fulfill({ status: 200, json: {} });
    });

    await page.getByPlaceholder("Enter admin password").fill("secret");
    await page.getByRole("button", { name: /Sign In/ }).click();
    await expect(
      page.getByRole("button", { name: /Signing in/ })
    ).toBeVisible();
  });

  test("wrong password shows 'Invalid password' error", async ({ page }) => {
    await mockAdminLoginApi(page, 401);
    await submitLoginForm(page, "wrong-password");
    await expect(page.getByText("Invalid password.")).toBeVisible();
  });

  test("network failure shows 'Network error' message", async ({ page }) => {
    await page.route("/api/admin/login", (route) => route.abort("failed"));
    await submitLoginForm(page, "any-password");
    await expect(page.getByText(/Network error/)).toBeVisible();
  });

  test("correct password redirects to /admin", async ({ page }) => {
    // mockAdminLoginApi(200) returns a Set-Cookie header with the valid token
    // so the middleware lets /admin through after router.push.
    await mockAdminLoginApi(page, 200);
    await submitLoginForm(page, "playwright-test");
    await page.waitForURL("**/admin");
  });

  test("error is cleared and re-submitted successfully after initial failure", async ({
    page,
  }) => {
    await mockAdminLoginApi(page, 401);
    await submitLoginForm(page, "bad");
    await expect(page.getByText("Invalid password.")).toBeVisible();

    // Second attempt with the correct mock (includes Set-Cookie)
    await mockAdminLoginApi(page, 200);
    await page.getByPlaceholder("Enter admin password").fill("playwright-test");
    await page.getByRole("button", { name: /Sign In/ }).click();
    await page.waitForURL("**/admin");
  });
});

// ---------------------------------------------------------------------------
// Admin dashboard — tab navigation
// ---------------------------------------------------------------------------

test.describe("Admin dashboard — tab navigation", () => {
  test.beforeEach(async ({ page }) => {
    await authenticateAsAdmin(page);
  });

  test("loads the admin dashboard heading", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByText("Admin Dashboard")).toBeVisible();
  });

  test("shows Bookings, Skills, and Custom Requests tabs", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.getByRole("link", { name: "Bookings" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Skills" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Custom Requests" })).toBeVisible();
  });

  test("Bookings tab is active by default", async ({ page }) => {
    await page.goto("/admin");
    const bookingsTab = page.getByRole("link", { name: "Bookings" });
    await expect(bookingsTab).toHaveClass(/bg-indigo-600/);
  });

  test("clicking Skills tab activates it via URL", async ({ page }) => {
    await page.goto("/admin");
    await page.getByRole("link", { name: "Skills" }).click();
    await page.waitForURL("**/admin?tab=skills");
    const skillsTab = page.getByRole("link", { name: "Skills" });
    await expect(skillsTab).toHaveClass(/bg-indigo-600/);
  });

  test("clicking Custom Requests tab activates it via URL", async ({ page }) => {
    await page.goto("/admin");
    await page.getByRole("link", { name: "Custom Requests" }).click();
    await page.waitForURL("**/admin?tab=requests");
    const requestsTab = page.getByRole("link", { name: "Custom Requests" });
    await expect(requestsTab).toHaveClass(/bg-indigo-600/);
  });

  test("navigating to ?tab=skills shows Skills tab as active", async ({
    page,
  }) => {
    await page.goto("/admin?tab=skills");
    const skillsTab = page.getByRole("link", { name: "Skills" });
    await expect(skillsTab).toHaveClass(/bg-indigo-600/);
  });

  test("stat cards for pending, confirmed, completed, cancelled are shown", async ({
    page,
  }) => {
    await page.goto("/admin");
    for (const status of ["pending", "confirmed", "completed", "cancelled"]) {
      await expect(page.getByText(status, { exact: true }).first()).toBeVisible();
    }
  });

  test("logout button is visible on the dashboard", async ({ page }) => {
    await page.goto("/admin");
    await expect(
      page.getByRole("button", { name: /Logout|Log out|Sign out/i })
    ).toBeVisible();
  });
});
