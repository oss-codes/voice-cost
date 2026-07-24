export const architectureOptions = {
  telephony: [
    { id: "twilio", label: "Twilio SIP" },
    { id: "telnyx", label: "Telnyx SIP" },
    { id: "plivo", label: "Plivo SIP" },
    { id: "exotel", label: "Exotel / India carrier" },
    { id: "asterisk", label: "Asterisk + owned SIP trunk" },
  ],
  runtime: [
    { id: "pipecat", label: "Pipecat" },
    { id: "livekit", label: "LiveKit Agents" },
    { id: "ten", label: "TEN Framework" },
    { id: "bolna", label: "Bolna" },
    { id: "managed", label: "Managed Voice AI API" },
  ],
  intelligence: [
    { id: "pipeline", label: "STT + LLM + TTS pipeline" },
    { id: "realtime", label: "Native realtime speech model" },
  ],
  deployment: [
    { id: "managed", label: "Managed cloud" },
    { id: "regional", label: "Regional VM or Kubernetes" },
    { id: "self-hosted", label: "Self-hosted infrastructure" },
  ],
  region: [
    { id: "us", label: "United States" },
    { id: "eu", label: "European Union" },
    { id: "india", label: "India" },
    { id: "apac", label: "Asia Pacific" },
  ],
} as const;

export type ReadinessCheck = {
  readonly id: string;
  readonly category: string;
  readonly label: string;
  readonly weight: 1 | 2 | 3;
  readonly critical: boolean;
};

export const readinessChecks = [
  {
    id: "consent",
    category: "Compliance",
    label: "Consent and lawful-contact rules are documented",
    weight: 3,
    critical: true,
  },
  {
    id: "identity",
    category: "Compliance",
    label: "The agent identifies the business and AI nature where required",
    weight: 3,
    critical: true,
  },
  {
    id: "dnc",
    category: "Compliance",
    label: "Do-not-call and opt-out suppression runs before dialing",
    weight: 3,
    critical: true,
  },
  {
    id: "recording",
    category: "Compliance",
    label: "Recording disclosure and retention policy are approved",
    weight: 3,
    critical: true,
  },
  {
    id: "secrets",
    category: "Security",
    label: "Carrier, model, and ARI secrets are outside source control",
    weight: 3,
    critical: true,
  },
  {
    id: "network",
    category: "Security",
    label: "SIP, RTP, ARI, and admin interfaces use narrow network rules",
    weight: 3,
    critical: true,
  },
  {
    id: "pii",
    category: "Security",
    label: "Logs redact phone numbers, credentials, and sensitive transcript fields",
    weight: 2,
    critical: false,
  },
  {
    id: "fallback",
    category: "Reliability",
    label: "Carrier, model, and TTS failure paths have explicit fallbacks",
    weight: 3,
    critical: true,
  },
  {
    id: "timeout",
    category: "Reliability",
    label: "Every external call has a timeout and bounded retry policy",
    weight: 2,
    critical: false,
  },
  {
    id: "transfer",
    category: "Reliability",
    label: "Human transfer has a tested failure and after-hours path",
    weight: 2,
    critical: false,
  },
  {
    id: "idempotency",
    category: "Reliability",
    label: "Webhooks and tool actions are idempotent",
    weight: 2,
    critical: false,
  },
  {
    id: "trace",
    category: "Observability",
    label: "Each call has trace IDs across carrier, runtime, models, and tools",
    weight: 3,
    critical: true,
  },
  {
    id: "latency",
    category: "Observability",
    label: "Endpointing, transcript, first token, and first audio are measured",
    weight: 2,
    critical: false,
  },
  {
    id: "outcome",
    category: "Observability",
    label: "Connected, successful, transferred, and failed outcomes are separate",
    weight: 2,
    critical: false,
  },
  {
    id: "alerts",
    category: "Observability",
    label: "Alerts cover call failure, one-way audio, cost spikes, and queue depth",
    weight: 2,
    critical: false,
  },
  {
    id: "load",
    category: "Capacity",
    label: "Peak concurrency and calls-per-second have been load tested",
    weight: 3,
    critical: true,
  },
  {
    id: "limits",
    category: "Capacity",
    label: "Carrier, platform, model, and database limits are recorded",
    weight: 2,
    critical: false,
  },
  {
    id: "pilot",
    category: "Launch",
    label: "A paid real-number pilot passed in every target country",
    weight: 3,
    critical: true,
  },
  {
    id: "rollback",
    category: "Launch",
    label: "A rollback or kill switch can stop outbound traffic immediately",
    weight: 3,
    critical: true,
  },
  {
    id: "owner",
    category: "Launch",
    label: "An on-call owner and escalation path exist for the first launch",
    weight: 2,
    critical: false,
  },
] as const satisfies readonly ReadinessCheck[];

export const asteriskSymptoms = [
  {
    id: "one-way-audio",
    label: "One-way or no audio",
    likely: [
      "Wrong external media address in SDP",
      "RTP firewall range does not match rtp.conf",
      "Carrier sends media from an unallowed network",
      "Direct media bypasses Asterisk",
    ],
    checks: [
      'asterisk -rx "rtp set debug on"',
      'asterisk -rx "pjsip set logger on"',
      "Confirm external_media_address and external_signaling_address",
      "Verify the same UDP range at host firewall and upstream NAT",
    ],
  },
  {
    id: "registration-failed",
    label: "SIP registration rejected",
    likely: [
      "Incorrect auth username or realm",
      "Wrong server URI",
      "Source IP restriction",
      "Clock or DNS failure",
    ],
    checks: [
      'asterisk -rx "pjsip show registrations"',
      'asterisk -rx "pjsip set logger on"',
      "Compare client_uri, server_uri, outbound_auth, and carrier documentation",
      "Resolve the carrier hostname from the Asterisk host",
    ],
  },
  {
    id: "sip-404",
    label: "Inbound call returns 404",
    likely: [
      "DID does not match the dialplan extension",
      "Endpoint context is wrong",
      "Registration contact_user differs from the Request-URI",
    ],
    checks: [
      'asterisk -rx "dialplan show from-carrier"',
      'asterisk -rx "pjsip show endpoint carrier-endpoint"',
      "Inspect the INVITE Request-URI and To header",
      "Add the exact DID, contact_user, or s extension required by the carrier",
    ],
  },
  {
    id: "ari-no-events",
    label: "ARI app receives no Stasis events",
    likely: [
      "Dialplan never reaches Stasis",
      "App name mismatch",
      "HTTP or ARI user disabled",
      "WebSocket connection uses the wrong credentials",
    ],
    checks: [
      'asterisk -rx "dialplan show from-carrier"',
      'asterisk -rx "http show status"',
      'asterisk -rx "ari show users"',
      "Match Stasis(app-name) to the ARI WebSocket application parameter",
    ],
  },
  {
    id: "codec",
    label: "Codec or distorted-audio problem",
    likely: [
      "Carrier and adapter disagree on codec",
      "Sample rate is interpreted incorrectly",
      "Signed PCM and μ-law are confused",
      "Transcoding module is missing",
    ],
    checks: [
      'asterisk -rx "core show codecs"',
      'asterisk -rx "pjsip show endpoint carrier-endpoint"',
      "Start with ulaw end to end",
      "Inspect the negotiated codec in SDP and the external-media format",
    ],
  },
] as const;

export type CallFlowNode = {
  readonly id: string;
  readonly type: "say" | "listen" | "tool" | "decision" | "transfer" | "end";
  readonly label: string;
};

export const defaultCallFlow = [
  { id: "greeting", type: "say", label: "Identify the business and reason for calling" },
  { id: "permission", type: "decision", label: "Caller agrees to continue" },
  { id: "qualification", type: "listen", label: "Collect the required details" },
  { id: "lookup", type: "tool", label: "Check CRM or booking availability" },
  { id: "transfer", type: "transfer", label: "Transfer when policy or caller asks" },
  { id: "finish", type: "end", label: "Confirm next step and end the call" },
] as const satisfies readonly CallFlowNode[];

export const pricingHistory = [
  {
    date: "2026-07-18",
    title: "Initial normalized pricing baseline",
    detail:
      "Published platform, STT, LLM, TTS, realtime, carrier, and recording assumptions with primary-source links.",
    commit: "f8a51ac",
  },
  {
    date: "2026-07-23",
    title: "Soniox speech pricing added",
    detail:
      "Added Soniox STT Real-Time v5 at $0.12/hour and Soniox TTS at an estimated $0.011/minute from its public pricing page.",
    commit: "e00aaa9",
  },
  {
    date: "2026-07-24",
    title: "Country telephony snapshots added",
    detail:
      "Added dated Twilio local-route examples for the US, UK, Australia, India, and Singapore plus US Telnyx and Plivo SIP comparisons.",
    commit: "pending",
  },
] as const;
