import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route(/clarity\.ms|cloudflareinsights\.com/, (route) => route.abort());
});

test("stack calculator keeps every scenario field in a reloadable URL", async ({ page }) => {
  await page.goto("/calculator/");

  await page.locator('[name="averageCallMinutes"]').fill("8");
  await page.locator('[name="a-sttId"]').selectOption("elevenlabs-scribe-realtime");
  await page.locator('[name="a-llmId"]').selectOption("gpt-5-2");
  await page.locator('[name="a-ttsId"]').selectOption("elevenlabs-flash");
  await page.locator('[name="a-carrierId"]').selectOption("daily-pstn-us");
  await page.locator('[name="a-recordingId"]').selectOption("daily-audio-recording");

  await expect(page).toHaveURL(/averageCallMinutes=8/);
  await page.reload();

  await expect(page.locator('[name="averageCallMinutes"]')).toHaveValue("8");
  await expect(page.locator('[name="a-sttId"]')).toHaveValue("elevenlabs-scribe-realtime");
  await expect(page.locator('[name="a-llmId"]')).toHaveValue("gpt-5-2");
  await expect(page.locator('[name="a-ttsId"]')).toHaveValue("elevenlabs-flash");
  await expect(page.locator('[name="a-carrierId"]')).toHaveValue("daily-pstn-us");
  await expect(page.locator('[name="a-recordingId"]')).toHaveValue("daily-audio-recording");
});

test("stack calculator presets, reset, and CSV export are usable", async ({ page }) => {
  await page.goto("/calculator/");

  await page.getByRole("button", { name: "Scale 100k" }).click();
  await expect(page.locator('[name="monthlyMinutes"]')).toHaveValue("100000");
  await expect(page).toHaveURL(/monthlyMinutes=100000/);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export CSV" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("voice-ai-cost-comparison.csv");

  await page.getByRole("button", { name: "Reset scenario" }).click();
  await expect(page.locator('[name="monthlyMinutes"]')).toHaveValue("10000");
});

test("invalid calculator input clears stale results and explains the correction", async ({
  page,
}) => {
  await page.goto("/tools/telephony-cost-calculator/");
  await expect(page.locator("[data-monthly]")).not.toHaveText("Unavailable");

  await page.locator('[name="minutes"]').fill("0");

  await expect(page.locator("[data-form-error]")).toContainText("connected minutes");
  await expect(page.locator("[data-monthly]")).toHaveText("Unavailable");
  await expect(page.locator(".metric-results")).toHaveAttribute("data-invalid", "true");
});

test("realtime talk share is rounded and invalid input does not leave stale results", async ({
  page,
}) => {
  await page.goto("/tools/realtime-voice-cost-calculator/");

  await expect(page.locator('[name="callerTalkShare"]')).toHaveValue("55");
  await expect(page).toHaveURL(/callerTalkShare=55(?:&|$)/);

  await page.locator('[name="monthlyMinutes"]').fill("0");
  await expect(page.locator("[data-form-error]")).toContainText("monthly connected minutes");
  await expect(page.locator('[data-output="monthly"]')).toHaveText("Unavailable");
});

test("new decision tools calculate latency and successful-call economics", async ({ page }) => {
  await page.goto("/tools/voice-ai-latency-calculator/");
  await expect(page.locator("[data-total-latency]")).toHaveText("790 ms");
  await expect(page.locator("[data-latency-band]")).toHaveText("conversational");

  await page.goto("/tools/cost-per-successful-call-calculator/");
  await expect(page.locator("[data-success-cost]")).toHaveText("$1.34");
  await expect(page.locator("[data-successful-calls]")).toHaveText("1,400");
});

test("Asterisk guide exposes the call path, safe config, and downloadable examples", async ({
  page,
  request,
}) => {
  await page.goto("/guides/asterisk-voice-ai-configuration/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Asterisk configuration for Voice AI",
  );
  await expect(page.getByText("SIP carrier", { exact: true })).toBeVisible();
  await expect(page.getByText("ARI control app", { exact: true })).toBeVisible();
  await expect(page.locator("code").filter({ hasText: "external_media_address" })).toHaveCount(1);
  await expect(page.locator("code").filter({ hasText: "Stasis(voice-ai)" })).toHaveCount(2);
  await expect(page.getByText("Never expose ARI")).toBeVisible();
  await expect(page.getByRole("link", { name: "Download configuration pack" })).toHaveAttribute(
    "href",
    "/examples/asterisk-voice-ai-config.zip",
  );

  for (const path of [
    "/examples/asterisk/pjsip.conf.example",
    "/examples/asterisk/extensions.conf.example",
    "/examples/asterisk/rtp.conf.example",
    "/examples/asterisk/ari.conf.example",
    "/examples/asterisk/http.conf.example",
  ]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBe(true);
    expect((await response.text()).length, path).toBeGreaterThan(40);
  }

  const archive = await request.get("/examples/asterisk-voice-ai-config.zip");
  expect(archive.ok()).toBe(true);
  expect((await archive.body()).byteLength).toBeGreaterThan(500);
});

test("Asterisk generator updates files while keeping identities and secrets out of the URL", async ({
  page,
}) => {
  await page.goto("/tools/asterisk-config-generator/");

  await expect(page.locator('[data-config-code="pjsip.conf"]')).toContainText(
    "password=<SIP_PASSWORD>",
  );
  await page.locator('[name="publicAddress"]').fill("203.0.113.20");
  await page.locator('[name="codec"]').selectOption("g722");
  await page.locator('[name="mediaTransport"]').selectOption("websocket");

  await expect(page.locator('[data-config-code="pjsip.conf"]')).toContainText(
    "external_media_address=203.0.113.20",
  );
  await expect(page.locator('[data-config-code="pjsip.conf"]')).toContainText("allow=g722");
  await expect(page.locator('[data-config-code="external-media.txt"]')).toContainText(
    "transport=websocket",
  );
  expect(page.url()).toContain("codec=g722");
  expect(page.url()).not.toContain("203.0.113.20");
  expect(page.url()).not.toContain("sip-user");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download all files" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("asterisk-voice-ai-config.txt");
});

test("country telephony calculator applies dated country and route presets", async ({ page }) => {
  await page.goto("/tools/country-telephony-cost-calculator/");

  await expect(page.locator("[data-monthly]")).toHaveText("$166.15");
  await page.locator('[name="country"]').selectOption("gb");
  await page.locator('[name="route"]').selectOption("outbound-mobile");
  await expect(page.locator('[name="carrierRate"]')).toHaveValue("0.0305");
  await expect(page.locator('[name="numberRate"]')).toHaveValue("3.5");
  await expect(page.locator("[data-monthly]")).toHaveText("$333.50");

  await page.locator('[name="country"]').selectOption("in");
  await expect(page.locator("[data-preset-note]")).toContainText("no local inbound voice number");
  await expect(page.locator('[name="numberRate"]')).toHaveValue("0");
});

test("stack recommender changes from managed launch to self-hosted telephony control", async ({
  page,
}) => {
  await page.goto("/tools/voice-ai-stack-recommender/");
  await expect(page.locator('[data-recommendation="0"] [data-name]')).toHaveText("Retell AI");

  await page.locator('[name="ownership"]').selectOption("self-hosted");
  await page.locator('[name="launch"]').selectOption("control");
  await page.locator('[name="team"]').selectOption("telephony");
  await page.locator('[name="volume"]').selectOption("over-100k");
  await page.locator('[name="requireOpenSource"]').check();
  await page.locator('[name="requireRegionControl"]').check();

  await expect(page.locator('[data-recommendation="0"] [data-name]')).toHaveText(
    "Asterisk + Pipecat",
  );
  await expect(page.locator('[data-recommendation="0"] [data-reasons]')).toContainText(
    "deployment region control",
  );
  await expect(page).toHaveURL(/requireOpenSource=1/);
});

test("desktop tools directory fills its final row without an empty grid cell", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/tools/");

  const cards = page.locator(".tool-grid > .tool-card");
  await expect(cards).toHaveCount(10);
  const grid = await page.locator(".tool-grid").boundingBox();
  const last = await cards.last().boundingBox();
  expect(last?.width ?? 0).toBeGreaterThan((grid?.width ?? 0) * 0.9);
});
