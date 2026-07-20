import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/clarity\.ms|cloudflareinsights\.com/, (route) => route.abort());
});

test("comparison pillar answers the buying decision with source-backed data", async ({ page }) => {
  await page.goto("/compare/");

  await expect(page).toHaveTitle(/Voice AI Platform Comparison 2026/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Compare voice AI platforms");

  for (const heading of [
    "The short answer",
    "One workload, six public pricing models",
    "What the total includes",
    "Pick the operating model first",
    "Realtime voice changes the model bill",
    "How this comparison was built",
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }

  await expect(page.locator("[data-platform-row]")).toHaveCount(6);
  await expect(page.locator('[data-comparison-source][href^="https://"]')).toHaveCount(6);
  await expect(page.locator("[data-lowest]:visible")).toHaveCount(2);
  for (const platform of ["pipecat", "livekit"]) {
    await expect(page.locator(`[data-platform-row="${platform}"] [data-lowest]`)).toBeVisible();
  }
  await expect(page.locator("main")).not.toContainText("—");
});

test("comparison cost table recalculates the normalized workload", async ({ page }) => {
  await page.goto("/compare/");

  const vapiCost = page.locator('[data-platform-row="vapi"] [data-monthly-cost]');
  await expect(vapiCost).toHaveText("$958");
  await page.getByLabel("Monthly connected minutes").fill("20000");

  await expect(vapiCost).toHaveText("$1,917");
  await expect(page.locator("[data-volume-label]")).toHaveText("20,000 minutes");
  await expect(page.locator("[data-lowest]:visible")).toHaveCount(2);
});
