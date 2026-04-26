import { Page } from "@playwright/test";

export async function goToSkills(page: Page) {
  await page.goto("/skills");
}

export async function searchSkills(page: Page, query: string) {
  await page
    .getByPlaceholder("Search skills by name, tag, or description…")
    .fill(query);
}

export async function clearSearch(page: Page) {
  await page
    .getByPlaceholder("Search skills by name, tag, or description…")
    .clear();
}

export async function selectTypeFilter(
  page: Page,
  filter: "All" | "Skills" | "Agents"
) {
  await page.getByRole("button", { name: filter, exact: true }).click();
}

export async function fillCustomRequestForm(
  page: Page,
  fields: { name: string; email: string; phone: string; requirement: string }
) {
  await page.getByPlaceholder("Jane Smith").fill(fields.name);
  await page.getByPlaceholder("jane@example.com").fill(fields.email);
  await page.getByPlaceholder("+1 555 000 0000").fill(fields.phone);
  await page
    .getByPlaceholder(/Describe the skill or AI agent/)
    .fill(fields.requirement);
}

export async function mockCustomCheckoutApi(
  page: Page,
  body: { url?: string; error?: string },
  status = 200
) {
  await page.route("/api/create-custom-checkout-session", (route) =>
    route.fulfill({ status, json: body })
  );
}

export async function mockSkillCheckoutApi(
  page: Page,
  body: { url?: string; error?: string },
  status = 200
) {
  await page.route("/api/create-checkout-session", (route) =>
    route.fulfill({ status, json: body })
  );
}

export const VALID_CUSTOM_REQUEST = {
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+1 555 000 0000",
  requirement:
    "I need a Claude skill file that reads my Notion database and creates a daily summary email.",
};
