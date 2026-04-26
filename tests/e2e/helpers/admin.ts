import { createHash } from "crypto";
import { Page } from "@playwright/test";

const TEST_ADMIN_PASSWORD = "playwright-test";

export const ADMIN_TOKEN = createHash("sha256")
  .update(`admin-session:${TEST_ADMIN_PASSWORD}`)
  .digest("hex");

/** Sets the admin_auth cookie directly — bypasses the login form for dashboard tests. */
export async function authenticateAsAdmin(page: Page) {
  await page.context().addCookies([
    {
      name: "admin_auth",
      value: ADMIN_TOKEN,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Strict",
    },
  ]);
}

export async function goToAdminLogin(page: Page) {
  await page.goto("/admin/login");
}

export async function mockAdminLoginApi(
  page: Page,
  status: 200 | 401 | 500 = 200
) {
  if (status === 200) {
    // Return the real cookie so router.push("/admin") succeeds through middleware.
    await page.route("/api/admin/login", (route) =>
      route.fulfill({
        status: 200,
        json: { success: true },
        headers: {
          "Set-Cookie": `admin_auth=${ADMIN_TOKEN}; Path=/; HttpOnly; SameSite=Strict`,
        },
      })
    );
  } else {
    await page.route("/api/admin/login", (route) =>
      route.fulfill({ status, json: { error: "Unauthorized" } })
    );
  }
}

export async function submitLoginForm(page: Page, password: string) {
  await page.getByPlaceholder("Enter admin password").fill(password);
  await page.getByRole("button", { name: /Sign In/ }).click();
}
