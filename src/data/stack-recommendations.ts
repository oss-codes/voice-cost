export type StackProfile = {
  readonly id: string;
  readonly name: string;
  readonly kind: "managed" | "hybrid" | "self-hosted";
  readonly channels: readonly ("phone" | "web" | "multimodal")[];
  readonly launch: "days" | "weeks" | "control";
  readonly teams: readonly ("app" | "realtime" | "telephony")[];
  readonly openSource: boolean;
  readonly regionControl: boolean;
  readonly summary: string;
  readonly tradeoff: string;
  readonly href: string;
};

export const stackProfiles = [
  {
    id: "vapi",
    name: "Vapi",
    kind: "managed",
    channels: ["phone", "web"],
    launch: "days",
    teams: ["app"],
    openSource: false,
    regionControl: false,
    summary: "Managed API-first platform with broad model and carrier choices.",
    tradeoff: "Platform, model, and carrier charges remain separate.",
    href: "/pricing/vapi/",
  },
  {
    id: "retell",
    name: "Retell AI",
    kind: "managed",
    channels: ["phone", "web"],
    launch: "days",
    teams: ["app", "telephony"],
    openSource: false,
    regionControl: false,
    summary: "Managed phone-agent platform with testing and call operations.",
    tradeoff: "The runtime and control plane stay provider-managed.",
    href: "/pricing/retell-ai/",
  },
  {
    id: "pipecat",
    name: "Pipecat",
    kind: "hybrid",
    channels: ["phone", "web", "multimodal"],
    launch: "weeks",
    teams: ["realtime", "app"],
    openSource: true,
    regionControl: true,
    summary: "Composable open pipeline with broad STT, LLM, TTS, and transport integrations.",
    tradeoff: "Your team owns deployment, scaling, and production observability.",
    href: "/open-source/pipecat/",
  },
  {
    id: "livekit-agents",
    name: "LiveKit Agents",
    kind: "hybrid",
    channels: ["phone", "web", "multimodal"],
    launch: "weeks",
    teams: ["realtime", "app"],
    openSource: true,
    regionControl: true,
    summary: "Realtime agents built around WebRTC rooms, participants, and model plugins.",
    tradeoff: "Telephony and agent hosting choices still need architecture work.",
    href: "/open-source/livekit-agents/",
  },
  {
    id: "ten-framework",
    name: "TEN Framework",
    kind: "self-hosted",
    channels: ["phone", "web", "multimodal"],
    launch: "control",
    teams: ["realtime"],
    openSource: true,
    regionControl: true,
    summary: "Cross-language realtime runtime with extensions and visual tooling.",
    tradeoff: "Review the project-specific license terms before commercial redistribution.",
    href: "/open-source/ten-framework/",
  },
  {
    id: "bolna",
    name: "Bolna",
    kind: "self-hosted",
    channels: ["phone"],
    launch: "weeks",
    teams: ["telephony", "app"],
    openSource: true,
    regionControl: true,
    summary: "Open phone-agent orchestration with telephony workflows and provider integrations.",
    tradeoff: "You operate the service and verify carrier support for each target country.",
    href: "/open-source/bolna/",
  },
  {
    id: "asterisk-pipecat",
    name: "Asterisk + Pipecat",
    kind: "self-hosted",
    channels: ["phone"],
    launch: "control",
    teams: ["telephony", "realtime"],
    openSource: true,
    regionControl: true,
    summary: "Self-hosted SIP edge with an open media and model pipeline.",
    tradeoff: "This path requires PBX, RTP, security, and realtime operations experience.",
    href: "/guides/asterisk-voice-ai-configuration/",
  },
] as const satisfies readonly StackProfile[];
