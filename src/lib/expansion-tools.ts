import type { CallFlowNode, ReadinessCheck } from "../data/planning";

export type SipQuoteInput = {
  readonly outboundMinutes: number;
  readonly inboundMinutes: number;
  readonly phoneNumbers: number;
  readonly outboundPerMinute: number | null;
  readonly inboundPerMinute: number | null;
  readonly numberMonthly: number | null;
};

export function estimateSipQuote(input: SipQuoteInput) {
  if (
    (input.outboundMinutes > 0 && input.outboundPerMinute === null) ||
    (input.inboundMinutes > 0 && input.inboundPerMinute === null) ||
    (input.phoneNumbers > 0 && input.numberMonthly === null)
  ) {
    return null;
  }
  const outbound = input.outboundMinutes * (input.outboundPerMinute ?? 0);
  const inbound = input.inboundMinutes * (input.inboundPerMinute ?? 0);
  const numbers = input.phoneNumbers * (input.numberMonthly ?? 0);
  const monthly = outbound + inbound + numbers;
  const minutes = input.outboundMinutes + input.inboundMinutes;
  return {
    monthly,
    perMinute: minutes > 0 ? monthly / minutes : 0,
    outbound,
    inbound,
    numbers,
  };
}

export type LatencyTrace = {
  readonly speechEndMs: number;
  readonly endpointMs: number;
  readonly transcriptMs: number;
  readonly firstTokenMs: number;
  readonly firstAudioMs: number;
  readonly playableAudioMs: number;
};

export function analyzeLatencyTrace(trace: LatencyTrace) {
  const ordered = [
    trace.speechEndMs,
    trace.endpointMs,
    trace.transcriptMs,
    trace.firstTokenMs,
    trace.firstAudioMs,
    trace.playableAudioMs,
  ];
  if (ordered.some((value, index) => index > 0 && value < (ordered[index - 1] ?? value))) {
    throw new Error("Trace timestamps must be chronological.");
  }
  const components = [
    { label: "endpointing", ms: trace.endpointMs - trace.speechEndMs },
    { label: "final transcript", ms: trace.transcriptMs - trace.endpointMs },
    { label: "model first token", ms: trace.firstTokenMs - trace.transcriptMs },
    { label: "speech first byte", ms: trace.firstAudioMs - trace.firstTokenMs },
    { label: "playback buffer", ms: trace.playableAudioMs - trace.firstAudioMs },
  ] as const;
  const slowest = components.reduce((largest, item) => (item.ms > largest.ms ? item : largest));
  return {
    totalMs: trace.playableAudioMs - trace.speechEndMs,
    components,
    slowest,
  };
}

export function scoreReadiness(
  checks: readonly ReadinessCheck[],
  selectedIds: ReadonlySet<string>,
) {
  const totalWeight = checks.reduce((total, check) => total + check.weight, 0);
  const earnedWeight = checks.reduce(
    (total, check) => total + (selectedIds.has(check.id) ? check.weight : 0),
    0,
  );
  const missingCritical = checks.filter((check) => check.critical && !selectedIds.has(check.id));
  return {
    score: Math.round((earnedWeight / totalWeight) * 100),
    earnedWeight,
    totalWeight,
    missingCritical,
  };
}

export type ArchitectureInput = {
  readonly telephony: string;
  readonly runtime: string;
  readonly intelligence: string;
  readonly deployment: string;
  readonly region: string;
};

function mermaidLabel(value: string) {
  return value.replaceAll('"', "'");
}

export function buildArchitectureMermaid(input: ArchitectureInput) {
  return `flowchart LR
  caller["Caller"]
  carrier["${mermaidLabel(input.telephony)}"]
  runtime["${mermaidLabel(input.runtime)}"]
  intelligence["${mermaidLabel(input.intelligence)}"]
  tools["Business tools"]
  deploy["${mermaidLabel(input.deployment)} / ${mermaidLabel(input.region)}"]
  caller --> carrier --> runtime --> intelligence
  runtime <--> tools
  deploy -. hosts .-> runtime`;
}

export function buildCallFlowMermaid(nodes: readonly CallFlowNode[]) {
  const definitions = nodes.map((node, index) => `  n${index}["${mermaidLabel(node.label)}"]`);
  const links = nodes.slice(1).map((_, index) => `  n${index} --> n${index + 1}`);
  return ["flowchart TD", ...definitions, ...links].join("\n");
}

export type AudioAnalysisInput = {
  readonly samples: Float32Array;
  readonly sampleRate: number;
  readonly durationSeconds: number;
  readonly channels: number;
};

export function analyzeAudioSamples(input: AudioAnalysisInput) {
  if (input.samples.length === 0) throw new Error("Audio contains no samples.");
  let sumSquares = 0;
  let sum = 0;
  let peak = 0;
  let clipped = 0;
  let silent = 0;
  for (const sample of input.samples) {
    const absolute = Math.abs(sample);
    sumSquares += sample * sample;
    sum += sample;
    peak = Math.max(peak, absolute);
    if (absolute >= 0.99) clipped += 1;
    if (absolute < 0.01) silent += 1;
  }
  const rms = Math.sqrt(sumSquares / input.samples.length);
  const db = (value: number) => (value > 0 ? 20 * Math.log10(value) : Number.NEGATIVE_INFINITY);
  return {
    durationSeconds: input.durationSeconds,
    sampleRate: input.sampleRate,
    channels: input.channels,
    peak,
    peakDbfs: db(peak),
    rms,
    rmsDbfs: db(rms),
    clippingPercent: (clipped / input.samples.length) * 100,
    silencePercent: (silent / input.samples.length) * 100,
    dcOffset: sum / input.samples.length,
  };
}
