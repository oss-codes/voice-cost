# Voice OSS

Open, source-linked Voice AI pricing calculators, framework research, and global platform directories for `voice.oss.codes`.

The Astro site includes static pipeline, realtime speech-to-speech, latency, concurrency, telephony, ROI, and successful-call calculators; provider pricing and head-to-head comparisons; open-source framework and platform-alternative directories; and long-form cost and Asterisk deployment guides. `/llms.txt` provides an LLM-readable index.

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
