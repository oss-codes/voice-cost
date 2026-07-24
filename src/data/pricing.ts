import { z } from "zod";

export const VERIFIED_AT = "2026-07-23";

export const platforms = [
  {
    id: "vapi",
    name: "Vapi",
    slug: "vapi",
    perMinute: 0.05,
    monthlyBase: 0,
    includedMinutes: 0,
    bundledModels: false,
    summary: "$0.05/min platform fee, plus model and carrier costs.",
    bestFor: "Teams that want broad provider choice and an API-first workflow.",
    sourceUrl: "https://vapi.ai/pricing",
  },
  {
    id: "retell",
    name: "Retell AI",
    slug: "retell-ai",
    perMinute: 0.055,
    monthlyBase: 0,
    includedMinutes: 0,
    bundledModels: false,
    summary: "$0.055/min voice infrastructure, plus TTS, LLM, and telephony.",
    bestFor: "Production phone agents with built-in testing and call operations.",
    sourceUrl: "https://www.retellai.com/pricing",
  },
  {
    id: "bland-start",
    name: "Bland Start",
    slug: "bland-ai",
    perMinute: 0.14,
    monthlyBase: 0,
    includedMinutes: 0,
    bundledModels: true,
    summary: "$0.14/min including STT, LLM, and TTS; carrier cost is separate.",
    bestFor: "Teams that prefer one bundled AI rate and predictable component costs.",
    sourceUrl: "https://www.bland.ai/pricing",
  },
  {
    id: "elevenlabs",
    name: "ElevenAgents",
    slug: "elevenlabs-agents",
    perMinute: 0.08,
    monthlyBase: 0,
    includedMinutes: 0,
    bundledModels: true,
    summary: "$0.08/min Speech Engine rate, with telephony billed separately.",
    bestFor: "Voice-first experiences that prioritize expressive ElevenLabs voices.",
    sourceUrl: "https://elevenlabs.io/pricing/api?price.platform=api",
  },
  {
    id: "pipecat",
    name: "Pipecat Cloud",
    slug: "pipecat-cloud",
    perMinute: 0.01,
    monthlyBase: 0,
    includedMinutes: 0,
    bundledModels: false,
    summary: "$0.01/min active agent-1x hosting; 1:1 WebRTC voice is included.",
    bestFor: "Open, provider-neutral pipelines with hands-on orchestration control.",
    sourceUrl: "https://www.daily.co/pricing/pipecat-cloud/",
  },
  {
    id: "livekit",
    name: "LiveKit Cloud",
    slug: "livekit-cloud",
    perMinute: 0.01,
    monthlyBase: 50,
    includedMinutes: 5_000,
    bundledModels: false,
    summary: "Ship starts at $50/mo with 5,000 agent minutes, then $0.01/min.",
    bestFor: "WebRTC-native teams combining voice agents with realtime media.",
    sourceUrl: "https://livekit.io/pricing",
  },
  {
    id: "self-hosted",
    name: "Self-hosted baseline",
    slug: "self-hosted-voice-ai",
    perMinute: 0,
    monthlyBase: 143,
    includedMinutes: 0,
    bundledModels: false,
    summary: "$143/mo infrastructure baseline before observability and engineering time.",
    bestFor: "Infrastructure teams that need maximum control and can operate realtime systems.",
    sourceUrl: "https://docs.livekit.io/home/self-hosting/deployment/",
  },
] as const;

export const sttModels = [
  {
    id: "deepgram-nova-3",
    name: "Deepgram Nova-3",
    perMinute: 0.29 / 60,
    detail: "$0.29/hour monolingual streaming.",
    sourceUrl: "https://deepgram.com/pricing",
  },
  {
    id: "elevenlabs-scribe-realtime",
    name: "ElevenLabs Scribe v2 Realtime",
    perMinute: 0.39 / 60,
    detail: "$0.39/hour realtime transcription.",
    sourceUrl: "https://elevenlabs.io/pricing/api?price.platform=api",
  },
  {
    id: "soniox-stt-rt-v5",
    name: "Soniox STT Real-Time v5",
    perMinute: 0.12 / 60,
    detail: "$0.12/hour realtime transcription.",
    sourceUrl: "https://soniox.com/pricing",
  },
] as const;

export const llmModels = [
  {
    id: "gpt-5-mini",
    name: "GPT-5 mini",
    perMinute: 0.012,
    detail: "Conversation estimate based on Retell's published standard rate.",
    sourceUrl: "https://www.retellai.com/pricing",
  },
  {
    id: "gpt-4-1-mini",
    name: "GPT-4.1 mini",
    perMinute: 0.016,
    detail: "Conversation estimate based on Retell's published standard rate.",
    sourceUrl: "https://www.retellai.com/pricing",
  },
  {
    id: "gemini-flash-lite",
    name: "Gemini 2.5 Flash Lite",
    perMinute: 0.006,
    detail: "Conversation estimate based on Retell's published standard rate.",
    sourceUrl: "https://www.retellai.com/pricing",
  },
  {
    id: "gpt-5-2",
    name: "GPT-5.2",
    perMinute: 0.056,
    detail: "Conversation estimate based on Retell's published standard rate.",
    sourceUrl: "https://www.retellai.com/pricing",
  },
] as const;

export const ttsModels = [
  {
    id: "retell-platform",
    name: "Retell / Cartesia voice",
    perMinute: 0.015,
    detail: "Published integrated voice rate.",
    sourceUrl: "https://www.retellai.com/pricing",
  },
  {
    id: "elevenlabs-flash",
    name: "ElevenLabs Flash / Turbo",
    perMinute: 0.05,
    detail: "$0.05 per 1K characters, approximately one minute at provider assumptions.",
    sourceUrl: "https://elevenlabs.io/pricing/api?price.platform=api",
  },
  {
    id: "retell-elevenlabs",
    name: "ElevenLabs via Retell",
    perMinute: 0.04,
    detail: "Published integrated Retell voice rate.",
    sourceUrl: "https://www.retellai.com/pricing",
  },
  {
    id: "soniox-tts",
    name: "Soniox TTS",
    perMinute: 0.011,
    detail: "Approximately $0.70/hour of generated speech.",
    sourceUrl: "https://soniox.com/pricing",
  },
] as const;

export const realtimeModels = [
  {
    id: "gpt-realtime-2",
    name: "GPT-Realtime-2",
    inputPerAudioMinute: 0.0192,
    outputPerAudioMinute: 0.0768,
    detail:
      "$32/M input and $64/M output audio tokens. Minute estimate uses 600 input and 1,200 output audio tokens.",
    sourceUrl: "https://developers.openai.com/api/docs/models/gpt-realtime-2",
  },
  {
    id: "gpt-realtime-2-1-mini",
    name: "GPT-Realtime-2.1 mini",
    inputPerAudioMinute: 0.006,
    outputPerAudioMinute: 0.024,
    detail:
      "$10/M input and $20/M output audio tokens. Minute estimate uses 600 input and 1,200 output audio tokens.",
    sourceUrl: "https://developers.openai.com/api/docs/models/gpt-realtime-2.1-mini",
  },
  {
    id: "gemini-3-1-flash-live",
    name: "Gemini 3.1 Flash Live Preview",
    inputPerAudioMinute: 0.005,
    outputPerAudioMinute: 0.018,
    detail: "Google's published effective audio-minute input and output rates.",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/pricing",
  },
  {
    id: "gemini-3-5-live-translate",
    name: "Gemini 3.5 Live Translate Preview",
    inputPerAudioMinute: 0.0053,
    outputPerAudioMinute: 0.0315,
    detail: "Google's published speech-to-speech translation audio-minute rates.",
    sourceUrl: "https://ai.google.dev/gemini-api/docs/pricing",
  },
] as const;

export const carriers = [
  {
    id: "twilio-outbound-us",
    name: "Twilio US outbound",
    perMinute: 0.014,
    monthlyBase: 0,
    detail: "US local outbound Programmable Voice.",
    sourceUrl: "https://www.twilio.com/en-us/voice/pricing/us",
  },
  {
    id: "twilio-inbound-us",
    name: "Twilio US inbound",
    perMinute: 0.0085,
    monthlyBase: 1.15,
    detail: "US local inbound plus one local number.",
    sourceUrl: "https://www.twilio.com/en-us/voice/pricing/us",
  },
  {
    id: "daily-pstn-us",
    name: "Daily US PSTN",
    perMinute: 0.018,
    monthlyBase: 0,
    detail: "Integrated PSTN dial-in or dial-out, SIP included.",
    sourceUrl: "https://www.daily.co/pricing/pipecat-cloud/",
  },
  {
    id: "custom-sip",
    name: "Custom SIP / app audio",
    perMinute: 0,
    monthlyBase: 0,
    detail: "Carrier charge excluded from this estimate.",
    sourceUrl: "https://www.retellai.com/pricing",
  },
] as const;

export const recordingOptions = [
  {
    id: "none",
    name: "No recording",
    perMinute: 0,
    detail: "No processing or storage charge included.",
    sourceUrl: "https://voice.oss.codes/methodology/",
  },
  {
    id: "twilio-recording",
    name: "Twilio recording",
    perMinute: 0.0025,
    detail: "Recording processing; storage is separate.",
    sourceUrl: "https://www.twilio.com/en-us/voice/pricing/us",
  },
  {
    id: "daily-audio-recording",
    name: "Daily audio recording",
    perMinute: 0.005,
    detail: "Audio recording processing; storage is separate.",
    sourceUrl: "https://www.daily.co/pricing/pipecat-cloud/",
  },
] as const;

export const ScenarioSchema = z.object({
  monthlyMinutes: z.number().int().min(1).max(10_000_000),
  averageCallMinutes: z.number().min(0.1).max(240),
  platformId: z.enum([
    "vapi",
    "retell",
    "bland-start",
    "elevenlabs",
    "pipecat",
    "livekit",
    "self-hosted",
  ]),
  sttId: z.enum(["deepgram-nova-3", "elevenlabs-scribe-realtime", "soniox-stt-rt-v5"]),
  llmId: z.enum(["gpt-5-mini", "gpt-4-1-mini", "gemini-flash-lite", "gpt-5-2"]),
  ttsId: z.enum(["retell-platform", "elevenlabs-flash", "retell-elevenlabs", "soniox-tts"]),
  carrierId: z.enum(["twilio-outbound-us", "twilio-inbound-us", "daily-pstn-us", "custom-sip"]),
  recordingId: z.enum(["none", "twilio-recording", "daily-audio-recording"]),
});

export type Scenario = z.infer<typeof ScenarioSchema>;

export const defaultScenario = {
  monthlyMinutes: 10_000,
  averageCallMinutes: 5,
  platformId: "vapi",
  sttId: "deepgram-nova-3",
  llmId: "gpt-5-mini",
  ttsId: "retell-platform",
  carrierId: "twilio-outbound-us",
  recordingId: "none",
} satisfies Scenario;

export const RealtimeScenarioSchema = z.object({
  monthlyMinutes: z.number().int().min(1).max(10_000_000),
  averageCallMinutes: z.number().min(0.1).max(240),
  callerTalkShare: z.number().min(0).max(1),
  platformId: z.enum(["vapi", "retell", "pipecat", "livekit", "self-hosted"]),
  realtimeModelId: z.enum([
    "gpt-realtime-2",
    "gpt-realtime-2-1-mini",
    "gemini-3-1-flash-live",
    "gemini-3-5-live-translate",
  ]),
  carrierId: z.enum(["twilio-outbound-us", "twilio-inbound-us", "daily-pstn-us", "custom-sip"]),
  recordingId: z.enum(["none", "twilio-recording", "daily-audio-recording"]),
});

export type RealtimeScenario = z.infer<typeof RealtimeScenarioSchema>;

export const defaultRealtimeScenario = {
  monthlyMinutes: 10_000,
  averageCallMinutes: 5,
  callerTalkShare: 0.55,
  platformId: "pipecat",
  realtimeModelId: "gpt-realtime-2-1-mini",
  carrierId: "twilio-outbound-us",
  recordingId: "none",
} satisfies RealtimeScenario;

export const comparisons = [
  {
    slug: "vapi-vs-retell",
    left: "vapi",
    right: "retell",
    title: "Vapi vs Retell AI",
    description: "Compare platform fees, model flexibility, concurrency, and estimated call cost.",
  },
  {
    slug: "livekit-vs-pipecat",
    left: "livekit",
    right: "pipecat",
    title: "LiveKit vs Pipecat",
    description: "Compare two open voice-agent foundations across cloud pricing and ownership.",
  },
  {
    slug: "bland-vs-vapi",
    left: "bland-start",
    right: "vapi",
    title: "Bland AI vs Vapi",
    description: "Compare a bundled minute rate with an unbundled, provider-flexible stack.",
  },
  {
    slug: "retell-vs-bland",
    left: "retell",
    right: "bland-start",
    title: "Retell AI vs Bland AI",
    description: "Compare component pricing, included features, and predictable bundled costs.",
  },
  {
    slug: "elevenlabs-vs-retell",
    left: "elevenlabs",
    right: "retell",
    title: "ElevenAgents vs Retell AI",
    description: "Compare voice-first bundled pricing with a configurable voice-agent platform.",
  },
] as const;
