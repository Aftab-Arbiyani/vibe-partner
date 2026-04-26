import { Page } from "@playwright/test";

export type ServiceId = "async" | "live" | "monthly" | "pro";

export interface Slot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export const MOCK_SLOTS: Slot[] = [
  { id: "slot-1", date: "2026-05-01", startTime: "10:00", endTime: "11:00" },
  { id: "slot-2", date: "2026-05-02", startTime: "14:00", endTime: "15:00" },
];

export async function goToBook(page: Page) {
  await page.goto("/book");
}

export async function goToBookWithService(page: Page, service: ServiceId) {
  await page.goto(`/book?service=${service}`);
}

export async function selectServiceCard(page: Page, titlePattern: RegExp) {
  await page.getByRole("button", { name: titlePattern }).click();
}

export async function clickContinue(page: Page) {
  await page.getByRole("button", { name: /Continue/ }).click();
}

export async function clickBack(page: Page) {
  await page.getByRole("button", { name: /Back/ }).click();
}

export async function fillDescription(page: Page, text: string) {
  await page.locator("textarea").fill(text);
}

export async function fillContactFields(
  page: Page,
  name: string,
  email: string
) {
  await page.getByPlaceholder("Jane Smith").fill(name);
  await page.getByPlaceholder("jane@example.com").fill(email);
}

export async function mockAvailabilityApi(
  page: Page,
  slots: Slot[] = MOCK_SLOTS
) {
  await page.route("/api/availability", (route) =>
    route.fulfill({ json: slots })
  );
}

export async function mockCheckoutApi(
  page: Page,
  body: { url?: string; error?: string },
  status = 200
) {
  await page.route("/api/checkout", (route) =>
    route.fulfill({ status, json: body })
  );
}

/** Advances from step 1 to step 2 for the given service. */
export async function advanceToStep2(page: Page, service: ServiceId) {
  const labels: Record<ServiceId, RegExp> = {
    async: /Async Bug Fix/,
    live: /Live Pair Programming/,
    monthly: /Monthly Retainer.*Starter/,
    pro: /Monthly Retainer.*Pro/,
  };
  await selectServiceCard(page, labels[service]);
}

/** Advances from step 2 to step 3 (assumes description already filled). */
export async function advanceToStep3(page: Page) {
  await clickContinue(page);
}
