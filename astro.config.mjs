import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://voice.oss.codes",
  integrations: [
    sitemap({
      filter: (page) => page !== "https://voice.oss.codes/system/",
      lastmod: new Date("2026-07-20"),
    }),
  ],
  trailingSlash: "always",
});
