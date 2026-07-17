# Voice OSS

Open, source-linked Voice AI pricing calculators, framework research, and global platform directories for `voice.oss.codes`.

The Astro site includes 52 static pages: pipeline and realtime speech-to-speech calculators, provider pricing, head-to-head comparisons, a long-form cost guide, nine open-source framework profiles, twelve platform-alternative profiles, regional India/US/Europe pages, methodology, and creator/project context. `/llms.txt` provides an LLM-readable index.

## Commands

```sh
bun install
bun run dev
bun test
bun run test:e2e
bun run check
bun run build
bun run preview
```

Pricing data lives in `src/data/pricing.ts`; framework and alternative data lives in `src/data/directory.ts`. Every published rate includes a primary-source URL and the site shows the snapshot date. Update the data and verification constants together after checking official repositories and provider pages.
