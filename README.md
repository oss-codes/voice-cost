# Voice OSS

Open, source-linked Voice AI pricing calculators, framework research, and global platform directories for `voice.oss.codes`.

The Astro site includes pipeline and realtime cost calculators, country telephony and SIP comparisons, concurrency and ROI planning, an architecture builder, a latency benchmark lab, a production-readiness checker, an Asterisk generator and troubleshooter, a call-flow builder, and a local audio quality tester. Crawlable research covers provider pricing history, open-source frameworks, platform alternatives, country compliance starting points, industry templates, and long-form cost and deployment guides. `/llms.txt` provides an LLM-readable index.

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

Pricing data lives in `src/data/pricing.ts` and `src/data/sip-comparison.ts`. Framework and alternative data lives in `src/data/directory.ts`; compliance and industry content have dedicated data modules. Every published rate includes a primary-source URL and the site shows the snapshot date. Update the data and verification constants together after checking official repositories, regulators, and provider pages.
