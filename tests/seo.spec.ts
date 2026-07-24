import { expect, test } from "@playwright/test";
import { z } from "zod";

const linkedDataSchema = z.object({
  "@graph": z.array(z.object({ "@type": z.string() })),
});

test.beforeEach(async ({ page }) => {
  await page.route(/clarity\.ms|cloudflareinsights\.com/, (route) => route.abort());
});

test("every indexable page exposes unique crawl metadata and structured data", async ({
  page,
  request,
}) => {
  const sitemapIndex = await request.get("/sitemap-index.xml");
  expect(sitemapIndex.ok()).toBe(true);
  const sitemapUrl = (await sitemapIndex.text()).match(/<loc>(.*?)<\/loc>/)?.[1] ?? "";
  expect(sitemapUrl).not.toBe("");

  const sitemap = await request.get(new URL(sitemapUrl).pathname);
  expect(sitemap.ok()).toBe(true);
  const sitemapText = await sitemap.text();
  expect(sitemapText).toContain("<lastmod>2026-07-24T00:00:00.000Z</lastmod>");
  const routes = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1] ?? "https://voice.oss.codes/").pathname,
  );
  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(200);

    const metadata = await page.evaluate(() => ({
      title: document.title,
      description:
        document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
      robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
      h1Count: document.querySelectorAll("h1").length,
      ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? "",
      ogType: document.querySelector('meta[property="og:type"]')?.getAttribute("content") ?? "",
      ogDescription:
        document.querySelector('meta[property="og:description"]')?.getAttribute("content") ?? "",
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? "",
      articleModifiedTime:
        document.querySelector('meta[property="article:modified_time"]')?.getAttribute("content") ??
        "",
      twitterCard:
        document.querySelector('meta[name="twitter:card"]')?.getAttribute("content") ?? "",
      structuredData:
        document.querySelector('script[type="application/ld+json"]')?.textContent ?? "",
    }));

    expect(metadata.title, route).not.toBe("");
    expect(metadata.description, route).not.toBe("");
    expect(metadata.canonical, route).toBe(new URL(route, "https://voice.oss.codes").href);
    expect(metadata.robots, route).toContain("index");
    expect(metadata.h1Count, route).toBe(1);
    expect(metadata.ogTitle, route).toBe(metadata.title);
    expect(metadata.ogDescription, route).toBe(metadata.description);
    expect(metadata.ogUrl, route).toBe(metadata.canonical);
    expect(metadata.twitterCard, route).toBe("summary_large_image");
    expect(metadata.structuredData, route).not.toBe("");
    expect(titles.has(metadata.title), `duplicate title: ${metadata.title}`).toBe(false);
    expect(
      descriptions.has(metadata.description),
      `duplicate description: ${metadata.description}`,
    ).toBe(false);
    titles.add(metadata.title);
    descriptions.add(metadata.description);

    const graph = linkedDataSchema.parse(JSON.parse(metadata.structuredData));
    const types = graph["@graph"].map((entity) => entity["@type"]);
    expect(types, route).toContain("Organization");
    expect(types, route).toContain("WebSite");
    expect(types, route).toContain("WebPage");
    if (route !== "/") {
      expect(types, route).toContain("BreadcrumbList");
    }
    if (types.some((type) => ["Article", "BlogPosting", "TechArticle"].includes(type))) {
      expect(metadata.ogType, route).toBe("article");
      expect(metadata.articleModifiedTime, route).not.toBe("");
    } else {
      expect(metadata.ogType, route).toBe("website");
    }
  }
});

test("visible breadcrumbs and footer expose meaningful internal navigation", async ({ page }) => {
  await page.goto("/alternatives/ringg-ai/");

  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb).toContainText("home");
  await expect(breadcrumb).toContainText("alternatives");
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText("Ringg AI.");
  await expect(breadcrumb).not.toContainText("current");

  const footer = page.getByRole("contentinfo");
  for (const href of [
    "/calculator/",
    "/pricing/",
    "/compare/",
    "/open-source/",
    "/alternatives/",
    "/tools/",
    "/guides/",
    "/guides/voice-ai-cost-guide/",
    "/guides/asterisk-voice-ai-configuration/",
    "/methodology/",
    "/about/",
  ]) {
    await expect(footer.locator(`a[href="${href}"]`), href).toHaveCount(1);
  }
});
