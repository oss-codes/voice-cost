import { expect, test } from "@playwright/test";

const representativeRoutes = [
  "/",
  "/calculator/",
  "/pricing/",
  "/compare/livekit-vs-pipecat/",
  "/open-source/",
  "/open-source/ten-framework/",
  "/alternatives/",
  "/alternatives/ringg-ai/",
  "/alternatives/regions/india/",
  "/tools/telephony-cost-calculator/",
  "/tools/realtime-voice-cost-calculator/",
  "/tools/voice-ai-latency-calculator/",
  "/tools/cost-per-successful-call-calculator/",
  "/tools/country-telephony-cost-calculator/",
  "/tools/voice-ai-stack-recommender/",
  "/tools/asterisk-config-generator/",
  "/tools/sip-trunk-comparison/",
  "/tools/voice-ai-architecture-builder/",
  "/tools/voice-ai-latency-benchmark/",
  "/tools/voice-ai-production-readiness/",
  "/tools/asterisk-troubleshooter/",
  "/tools/voice-ai-call-flow-builder/",
  "/tools/voice-quality-tester/",
  "/guides/",
  "/guides/voice-ai-cost-guide/",
  "/guides/asterisk-voice-ai-configuration/",
  "/pricing/history/",
  "/compliance/",
  "/compliance/india/",
  "/templates/",
  "/templates/healthcare-appointments/",
  "/about/",
] as const;

test("mobile navigation uses reachable touch targets", async ({ page }) => {
  await page.goto("/");

  const menu = page.locator(".mobile-menu");
  await expect(menu).toBeVisible();
  await menu.locator("summary").click();

  for (const link of await menu.locator("a").all()) {
    const box = await link.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});

test("mobile action, source, and footer links meet the touch-target floor", async ({ page }) => {
  for (const route of ["/calculator/", "/about/"]) {
    await page.goto(route);
    const targets = page.locator(".button:visible, .source-badge:visible, .site-footer a:visible");

    for (const target of await targets.all()) {
      const box = await target.boundingBox();
      expect(box?.height ?? 0, `${route}: ${await target.textContent()}`).toBeGreaterThanOrEqual(
        44,
      );
    }
  }
});

test("global hire callout keeps the phone number private behind an internal redirect", async ({
  page,
}) => {
  await page.goto("/");

  const callout = page.locator(".hire-cta");
  await expect(callout).toBeVisible();
  await expect(callout.locator('[href="mailto:himanshu.indie@gmail.com"]')).toBeVisible();
  await expect(callout).not.toContainText("81499");
  await expect(callout.locator('[href*="918149963853"]')).toHaveCount(0);
  await expect(callout.getByRole("link", { name: "Chat on WhatsApp" })).toHaveAttribute(
    "href",
    "/contact/whatsapp/",
  );
});

test("global layout initializes the configured Clarity project", async ({ page }) => {
  await page.route("https://www.clarity.ms/**", (route) => route.abort());
  await page.goto("/");

  await expect(page.locator('script[src="https://www.clarity.ms/tag/xow8usa0na"]')).toHaveCount(1);
});

test("global layout initializes the configured Cloudflare Web Analytics beacon", async ({
  page,
}) => {
  await page.route("https://static.cloudflareinsights.com/**", (route) => route.abort());
  await page.goto("/");

  const beacon = page.locator('script[src="https://static.cloudflareinsights.com/beacon.min.js"]');
  await expect(beacon).toHaveCount(1);
  await expect(beacon).toHaveAttribute("type", "module");
  await expect(beacon).toHaveAttribute(
    "data-cf-beacon",
    '{"token": "21d4ee10a52b425d8ea3f8eba9521312"}',
  );
});

test("mobile layouts avoid horizontal overflow on every page template", async ({ page }) => {
  for (const route of representativeRoutes) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(dimensions.document, route).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test("dense cards and long cost metadata remain readable", async ({ page }) => {
  await page.goto("/calculator/");
  for (const selector of [".cost-meta", ".breakdown li", ".cost-bar-row"]) {
    const fontSize = await page
      .locator(selector)
      .first()
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    expect(fontSize, selector).toBeGreaterThanOrEqual(12);
  }

  for (const selector of [".stack-status"]) {
    const fontSize = await page
      .locator(selector)
      .first()
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    expect(fontSize, selector).toBeGreaterThanOrEqual(11);
  }

  await page.goto("/");
  const readoutFontSize = await page
    .locator(".live-readout span")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(readoutFontSize, ".live-readout span").toBeGreaterThanOrEqual(11);

  await page.goto("/alternatives/");
  const cardCopy = page.locator(".directory-card p").first();
  const fontSize = await cardCopy.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).fontSize),
  );
  expect(fontSize).toBeGreaterThanOrEqual(13);

  await page.goto("/alternatives/ringg-ai/");
  const columns = await page
    .locator(".data-strip")
    .evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean),
    );
  expect(columns).toHaveLength(1);
});

test("realtime calculator prices caller and agent audio separately", async ({ page }) => {
  await page.goto("/tools/realtime-voice-cost-calculator/");
  await expect(page.locator('[data-output="monthly"]')).toHaveText("$381.00");

  await page.locator('[name="callerTalkShare"]').fill("50");
  await expect(page.locator('[data-output="monthly"]')).toHaveText("$390.00");
  await expect(page.locator('[data-output="input"]')).toContainText("5,000 min");
  await expect(page.locator('[data-output="output"]')).toContainText("5,000 min");

  await page.locator('[name="realtimeModelId"]').selectOption("gemini-3-1-flash-live");
  await expect(page.locator('[data-output="monthly"]')).toHaveText("$355.00");
  await expect(page.locator("[data-model-source]")).toHaveAttribute(
    "href",
    "https://ai.google.dev/gemini-api/docs/pricing",
  );
});
