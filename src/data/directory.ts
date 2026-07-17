export const DIRECTORY_VERIFIED_AT = "2026-07-17";

export const frameworks = [
  {
    slug: "ten-framework",
    name: "TEN Framework",
    language: "C++ / Python / TypeScript",
    license: "Apache 2.0 with project-specific restrictions",
    architecture: "Extension runtime",
    summary:
      "A cross-language framework and runtime for realtime conversational voice agents, with reusable extensions and a visual agent builder.",
    bestFor:
      "Teams that need a compiled realtime core, multimodal extensions, and a visual builder.",
    watchFor:
      "The repository describes itself as open source, but its root license adds restrictions. Review the exact license before commercial redistribution.",
    repoUrl: "https://github.com/TEN-framework/ten-framework",
    docsUrl: "https://theten.ai/docs",
  },
  {
    slug: "pipecat",
    name: "Pipecat",
    language: "Python",
    license: "BSD-2-Clause",
    architecture: "Composable pipelines",
    summary:
      "A vendor-neutral framework for realtime voice and multimodal agents with broad STT, LLM, TTS, transport, and telephony integrations.",
    bestFor: "Provider-neutral orchestration and teams that want to own the full media pipeline.",
    watchFor:
      "Production hosting, scaling, observability, and carrier operations remain your responsibility unless you use Pipecat Cloud.",
    repoUrl: "https://github.com/pipecat-ai/pipecat",
    docsUrl: "https://docs.pipecat.ai/",
  },
  {
    slug: "livekit-agents",
    name: "LiveKit Agents",
    language: "Python / Node.js",
    license: "Apache-2.0",
    architecture: "WebRTC participants",
    summary:
      "A realtime agent framework built around programmable participants, open WebRTC clients, model plugins, turn detection, and media rooms.",
    bestFor:
      "Voice products that also need browser, mobile, video, or multi-participant realtime media.",
    watchFor:
      "The framework is open source, while managed LiveKit Cloud usage and third-party models are separately billed.",
    repoUrl: "https://github.com/livekit/agents",
    docsUrl: "https://docs.livekit.io/agents/",
  },
  {
    slug: "bolna",
    name: "Bolna",
    language: "Python",
    license: "MIT",
    architecture: "Voice orchestration",
    summary:
      "An end-to-end voice-agent orchestration framework for ASR, LLM, TTS, WebSockets, and telephony, with an optional hosted platform.",
    bestFor:
      "Builders who want an India-built OSS orchestrator plus an upgrade path to hosted APIs.",
    watchFor:
      "The open repository is the orchestration layer; Bolna documents its hosted API and no-code UI as separate products.",
    repoUrl: "https://github.com/bolna-ai/bolna",
    docsUrl: "https://docs.bolna.ai/",
  },
  {
    slug: "dograh",
    name: "Dograh",
    language: "Python / TypeScript",
    license: "BSD-2-Clause",
    architecture: "Self-hosted visual platform",
    summary:
      "A self-hostable voice AI platform with a visual workflow builder, BYOK speech stacks, telephony, campaigns, and Docker deployment.",
    bestFor:
      "Teams seeking an open, on-premise alternative to proprietary no-code Voice AI platforms.",
    watchFor:
      "Self-hosting transfers uptime, scaling, security, and carrier operations to your team.",
    repoUrl: "https://github.com/dograh-hq/dograh",
    docsUrl: "https://docs.dograh.com/",
  },
  {
    slug: "videosdk-agents",
    name: "VideoSDK AI Agents",
    language: "Python",
    license: "Apache-2.0",
    architecture: "Realtime room participants",
    summary:
      "A production-oriented framework for voice and multimodal agents that join VideoSDK rooms and connect models, workers, and client devices.",
    bestFor: "Teams already using VideoSDK or building voice plus video agent experiences.",
    watchFor:
      "Managed VideoSDK rooms and external inference services have costs beyond the open framework.",
    repoUrl: "https://github.com/videosdk-live/agents",
    docsUrl: "https://docs.videosdk.live/ai_agents/introduction",
  },
  {
    slug: "vocode-core",
    name: "Vocode Core",
    language: "Python",
    license: "MIT",
    architecture: "Streaming conversations",
    summary:
      "A modular library for streaming LLM conversations across microphones, phone calls, and meetings with replaceable speech providers.",
    bestFor:
      "Learning from a compact, phone-capable voice-agent abstraction or maintaining an existing Vocode stack.",
    watchFor:
      "The repository asks for community maintainers and its latest public release shown by GitHub is from 2024.",
    repoUrl: "https://github.com/vocodedev/vocode-core",
    docsUrl: "https://docs.vocode.dev/",
  },
  {
    slug: "fastrtc",
    name: "FastRTC",
    language: "Python",
    license: "MIT",
    architecture: "Realtime communication library",
    summary:
      "A Python library for adding low-latency WebRTC and WebSocket audio or video streams to applications, including voice-agent patterns.",
    bestFor:
      "Rapid Python prototypes and custom realtime interfaces that do not need a full call-operations platform.",
    watchFor:
      "FastRTC is a media/application library, not a bundled telephony, campaign, analytics, or compliance product.",
    repoUrl: "https://github.com/gradio-app/fastrtc",
    docsUrl: "https://fastrtc.org/",
  },
  {
    slug: "openai-agents-sdk-voice",
    name: "OpenAI Agents SDK — Voice",
    language: "Python / TypeScript",
    license: "MIT",
    architecture: "Agent voice pipelines",
    summary:
      "The open Agents SDK includes voice pipeline patterns for connecting speech input, agent workflows, tools, and streamed audio output.",
    bestFor:
      "Teams already using the Agents SDK that want voice inside a broader tool-using agent workflow.",
    watchFor:
      "The SDK is open source, but OpenAI models and realtime API usage are commercial services.",
    repoUrl: "https://github.com/openai/openai-agents-python",
    docsUrl: "https://openai.github.io/openai-agents-python/voice/quickstart/",
  },
] as const;

export const alternatives = [
  {
    slug: "ringg-ai",
    name: "Ringg AI",
    region: "India",
    market: "India + global",
    model: "Hosted all-in-one",
    priceNote: "$0.10/connected min flexible; enterprise advertised from $0.06/min",
    summary:
      "A Bengaluru-based hosted voice-agent platform focused on business calling, multilingual workflows, campaigns, and integrations.",
    bestFor:
      "Indian enterprises wanting a bundled rate, regional language support, and managed rollout.",
    sourceUrl: "https://www.ringg.ai/",
    pricingUrl: "https://www.ringg.ai/pricing",
  },
  {
    slug: "bolna-ai",
    name: "Bolna AI",
    region: "India",
    market: "India + global",
    model: "OSS + hosted platform",
    priceNote: "$0.02 platform/min plus selected speech, model, and telephony",
    summary:
      "An India-built voice-agent stack with an MIT-licensed orchestrator, hosted APIs, provider choice, and telephony integrations.",
    bestFor: "Developers who value open orchestration, BYOK components, and a hosted path.",
    sourceUrl: "https://www.bolna.ai/",
    pricingUrl: "https://docs.bolna.ai/pricing",
  },
  {
    slug: "smallest-ai",
    name: "Smallest.ai",
    region: "India",
    market: "India / US",
    model: "Hosted modular platform",
    priceNote: "Published agent range about $0.09–$0.21/min; enterprise from $0.05/min",
    summary:
      "A voice AI platform spanning speech models, agent builders, campaigns, BYOT, and region-specific India and US call pricing.",
    bestFor: "Teams comparing one vendor for both speech models and deployable calling agents.",
    sourceUrl: "https://smallest.ai/",
    pricingUrl: "https://smallest.ai/pricing/agents",
  },
  {
    slug: "thinnest-ai",
    name: "ThinnestAI",
    region: "India",
    market: "India-first",
    model: "Hosted BYOK platform",
    priceNote: "₹2/min platform fee plus LLM pass-through on pay-as-you-go",
    summary:
      "An India-first platform advertising INR billing, Indian-language coverage, BYOK models, and its own STT/TTS stack.",
    bestFor: "Indian builders who want INR pricing and explicit local-language positioning.",
    sourceUrl: "https://www.thinnest.ai/",
    pricingUrl: "https://www.thinnest.ai/pricing",
  },
  {
    slug: "yellow-ai",
    name: "Yellow.ai Nexus Vox",
    region: "India",
    market: "India + global enterprise",
    model: "Enterprise agent platform",
    priceNote: "Contact sales",
    summary:
      "An enterprise agent platform with voice, chat, email, workflow tooling, testing, integrations, and multilingual deployment.",
    bestFor:
      "Large CX teams needing omnichannel orchestration and enterprise implementation support.",
    sourceUrl: "https://yellow.ai/nexus-vox/",
    pricingUrl: "https://yellow.ai/contact-us/",
  },
  {
    slug: "skit-ai",
    name: "Skit.ai",
    region: "India",
    market: "India / US enterprise",
    model: "Managed enterprise automation",
    priceNote: "Contact sales",
    summary:
      "A managed Voice AI platform focused on contact-center automation, including inbound, outbound, and collections workflows.",
    bestFor:
      "Enterprise call operations with specialized collections or customer-service workflows.",
    sourceUrl: "https://skit.ai/",
    pricingUrl: "https://skit.ai/contact-us/",
  },
  {
    slug: "vapi",
    name: "Vapi",
    region: "United States",
    market: "US + global developer",
    model: "API-first modular platform",
    priceNote: "$0.05 platform/min plus speech, model, and telephony",
    summary:
      "A developer-oriented Voice AI API with broad provider choice, phone tooling, assistants, and workflow primitives.",
    bestFor: "Product teams that want configurable providers and a large API surface.",
    sourceUrl: "https://vapi.ai/",
    pricingUrl: "https://vapi.ai/pricing",
  },
  {
    slug: "retell-ai",
    name: "Retell AI",
    region: "United States",
    market: "US + global developer",
    model: "Hosted voice infrastructure",
    priceNote: "$0.055/min voice infrastructure plus components",
    summary:
      "A production phone-agent platform with testing, analytics, telephony, model choice, and call-operation features.",
    bestFor:
      "Teams that want production calling operations without owning realtime infrastructure.",
    sourceUrl: "https://www.retellai.com/",
    pricingUrl: "https://www.retellai.com/pricing",
  },
  {
    slug: "bland-ai",
    name: "Bland AI",
    region: "United States",
    market: "US + global developer",
    model: "Bundled calling platform",
    priceNote: "$0.14/min Start snapshot with STT, LLM, and TTS included",
    summary:
      "A hosted platform for inbound and outbound AI phone calls, pathways, campaigns, transfers, and enterprise operations.",
    bestFor: "Teams preferring a bundled agent-minute model and high-volume outbound workflows.",
    sourceUrl: "https://www.bland.ai/",
    pricingUrl: "https://www.bland.ai/pricing",
  },
  {
    slug: "elevenlabs-agents",
    name: "ElevenLabs Agents",
    region: "United States",
    market: "US / Europe / global",
    model: "Voice-first agent platform",
    priceNote: "$0.08/min Speech Engine snapshot; telephony separate",
    summary:
      "A conversational agent platform centered on expressive speech, multilingual voices, tools, knowledge, and telephony.",
    bestFor:
      "Products where voice quality, language coverage, and voice identity lead the decision.",
    sourceUrl: "https://elevenlabs.io/agents",
    pricingUrl: "https://elevenlabs.io/pricing/api?price.platform=api",
  },
  {
    slug: "synthflow",
    name: "Synthflow",
    region: "Europe",
    market: "Germany + global enterprise",
    model: "Managed enterprise platform",
    priceNote: "Enterprise contracts advertised from $30,000/year",
    summary:
      "A Berlin-based enterprise Voice AI platform with telephony, integrations, white-labeling, and managed implementation.",
    bestFor:
      "Enterprise or agency programs that need implementation support and white-label operations.",
    sourceUrl: "https://synthflow.ai/",
    pricingUrl: "https://synthflow.ai/pricing",
  },
  {
    slug: "polyai",
    name: "PolyAI",
    region: "Europe",
    market: "UK + global enterprise",
    model: "Managed contact-center platform",
    priceNote: "Contact sales",
    summary:
      "A London-founded enterprise voice-assistant platform focused on customer-led conversations and contact-center integrations.",
    bestFor:
      "Large contact centers prioritizing managed deployment and complex customer-service conversations.",
    sourceUrl: "https://poly.ai/",
    pricingUrl: "https://poly.ai/contact",
  },
] as const;

export const alternativeRegions = [
  {
    slug: "india",
    name: "India",
    description:
      "India-built and India-first Voice AI platforms, including INR pricing, regional telephony, and multilingual deployment options.",
  },
  {
    slug: "united-states",
    name: "United States",
    description:
      "US-centered developer platforms and hosted Voice AI infrastructure serving global calling products.",
  },
  {
    slug: "europe",
    name: "Europe",
    description:
      "European enterprise Voice AI platforms with managed contact-center and implementation models.",
  },
] as const;
