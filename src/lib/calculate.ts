import {
  carriers,
  llmModels,
  platforms,
  type RealtimeScenario,
  realtimeModels,
  recordingOptions,
  type Scenario,
  sttModels,
  ttsModels,
} from "../data/pricing";

type StackBreakdown = {
  readonly platform: number;
  readonly models: number;
  readonly stt: number;
  readonly llm: number;
  readonly tts: number;
  readonly carrier: number;
  readonly recording: number;
};

export type StackEstimate = {
  readonly monthly: number;
  readonly perMinute: number;
  readonly perCall: number;
  readonly breakdown: StackBreakdown;
};

export class PricingConfigurationError extends Error {
  readonly field: string;
  readonly value: string;

  constructor(field: string, value: string) {
    super(`Unknown pricing configuration for ${field}: ${value}`);
    this.name = "PricingConfigurationError";
    this.field = field;
    this.value = value;
  }
}

function findById<T extends { readonly id: string }>(
  items: readonly T[],
  id: string,
  field: string,
): T {
  const item = items.find((candidate) => candidate.id === id);
  if (item === undefined) {
    throw new PricingConfigurationError(field, id);
  }
  return item;
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateStack(scenario: Scenario): StackEstimate {
  const platform = findById(platforms, scenario.platformId, "platformId");
  const carrier = findById(carriers, scenario.carrierId, "carrierId");
  const recording = findById(recordingOptions, scenario.recordingId, "recordingId");
  const stt = findById(sttModels, scenario.sttId, "sttId");
  const llm = findById(llmModels, scenario.llmId, "llmId");
  const tts = findById(ttsModels, scenario.ttsId, "ttsId");

  const billablePlatformMinutes = Math.max(0, scenario.monthlyMinutes - platform.includedMinutes);
  const platformCost = platform.monthlyBase + billablePlatformMinutes * platform.perMinute;
  const sttCost = platform.bundledModels ? 0 : scenario.monthlyMinutes * stt.perMinute;
  const llmCost = platform.bundledModels ? 0 : scenario.monthlyMinutes * llm.perMinute;
  const ttsCost = platform.bundledModels ? 0 : scenario.monthlyMinutes * tts.perMinute;
  const carrierCost = carrier.monthlyBase + scenario.monthlyMinutes * carrier.perMinute;
  const recordingCost = scenario.monthlyMinutes * recording.perMinute;
  const modelsCost = sttCost + llmCost + ttsCost;
  const monthly = platformCost + modelsCost + carrierCost + recordingCost;
  const perMinute = monthly / scenario.monthlyMinutes;

  return {
    monthly: roundMoney(monthly),
    perMinute,
    perCall: perMinute * scenario.averageCallMinutes,
    breakdown: {
      platform: roundMoney(platformCost),
      models: roundMoney(modelsCost),
      stt: roundMoney(sttCost),
      llm: roundMoney(llmCost),
      tts: roundMoney(ttsCost),
      carrier: roundMoney(carrierCost),
      recording: roundMoney(recordingCost),
    },
  };
}

export type RealtimeVoiceEstimate = {
  readonly monthly: number;
  readonly perMinute: number;
  readonly perCall: number;
  readonly inputAudioMinutes: number;
  readonly outputAudioMinutes: number;
  readonly breakdown: {
    readonly platform: number;
    readonly realtimeInput: number;
    readonly realtimeOutput: number;
    readonly carrier: number;
    readonly recording: number;
  };
};

export function calculateRealtimeVoice(scenario: RealtimeScenario): RealtimeVoiceEstimate {
  const platform = findById(platforms, scenario.platformId, "platformId");
  const model = findById(realtimeModels, scenario.realtimeModelId, "realtimeModelId");
  const carrier = findById(carriers, scenario.carrierId, "carrierId");
  const recording = findById(recordingOptions, scenario.recordingId, "recordingId");

  const inputAudioMinutes = scenario.monthlyMinutes * scenario.callerTalkShare;
  const outputAudioMinutes = scenario.monthlyMinutes - inputAudioMinutes;
  const billablePlatformMinutes = Math.max(0, scenario.monthlyMinutes - platform.includedMinutes);
  const platformCost = platform.monthlyBase + billablePlatformMinutes * platform.perMinute;
  const realtimeInputCost = inputAudioMinutes * model.inputPerAudioMinute;
  const realtimeOutputCost = outputAudioMinutes * model.outputPerAudioMinute;
  const carrierCost = carrier.monthlyBase + scenario.monthlyMinutes * carrier.perMinute;
  const recordingCost = scenario.monthlyMinutes * recording.perMinute;
  const monthly =
    platformCost + realtimeInputCost + realtimeOutputCost + carrierCost + recordingCost;
  const perMinute = monthly / scenario.monthlyMinutes;

  return {
    monthly: roundMoney(monthly),
    perMinute,
    perCall: perMinute * scenario.averageCallMinutes,
    inputAudioMinutes,
    outputAudioMinutes,
    breakdown: {
      platform: roundMoney(platformCost),
      realtimeInput: roundMoney(realtimeInputCost),
      realtimeOutput: roundMoney(realtimeOutputCost),
      carrier: roundMoney(carrierCost),
      recording: roundMoney(recordingCost),
    },
  };
}

export type ConcurrencyInput = {
  readonly callsPerMonth: number;
  readonly averageMinutes: number;
  readonly businessHoursPerDay: number;
  readonly businessDaysPerMonth: number;
  readonly peakFactor: number;
};

export function estimateConcurrency(input: ConcurrencyInput) {
  const monthlyHours = input.businessHoursPerDay * input.businessDaysPerMonth;
  const averageCallsInProgress = (input.callsPerMonth * input.averageMinutes) / (monthlyHours * 60);
  const peakCallsInProgress = averageCallsInProgress * input.peakFactor;

  return {
    averageCallsInProgress,
    peakCallsInProgress,
    requiredLines: Math.ceil(peakCallsInProgress),
  };
}

export type HumanSavingsInput = {
  readonly callsPerMonth: number;
  readonly averageMinutes: number;
  readonly humanHourlyCost: number;
  readonly aiCostPerMinute: number;
  readonly automationRate: number;
};

export function estimateHumanSavings(input: HumanSavingsInput) {
  const totalMinutes = input.callsPerMonth * input.averageMinutes;
  const automatedMinutes = totalMinutes * input.automationRate;
  const humanCostAvoided = (automatedMinutes / 60) * input.humanHourlyCost;
  const aiCost = automatedMinutes * input.aiCostPerMinute;

  return {
    automatedMinutes,
    humanCostAvoided,
    aiCost,
    monthlySavings: humanCostAvoided - aiCost,
  };
}

export type TelephonyCostInput = {
  readonly connectedMinutes: number;
  readonly carrierPerMinute: number;
  readonly recordingPerMinute: number;
  readonly phoneNumbers: number;
  readonly phoneNumberMonthly: number;
  readonly failedAttempts: number;
  readonly failedAttemptCost: number;
};

export function estimateTelephonyCost(input: TelephonyCostInput) {
  const carrier = input.connectedMinutes * input.carrierPerMinute;
  const recording = input.connectedMinutes * input.recordingPerMinute;
  const numbers = input.phoneNumbers * input.phoneNumberMonthly;
  const failedAttempts = input.failedAttempts * input.failedAttemptCost;

  return {
    monthly: roundMoney(carrier + recording + numbers + failedAttempts),
    perConnectedMinute: (carrier + recording + numbers + failedAttempts) / input.connectedMinutes,
    breakdown: {
      carrier: roundMoney(carrier),
      recording: roundMoney(recording),
      numbers: roundMoney(numbers),
      failedAttempts: roundMoney(failedAttempts),
    },
  };
}

export type OutcomeEconomicsInput = {
  readonly attemptedCalls: number;
  readonly connectionRate: number;
  readonly successRate: number;
  readonly averageConnectedMinutes: number;
  readonly aiCostPerMinute: number;
  readonly fixedMonthlyCost: number;
};

export function estimateOutcomeEconomics(input: OutcomeEconomicsInput) {
  const connectedCalls = input.attemptedCalls * input.connectionRate;
  const successfulCalls = connectedCalls * input.successRate;
  const connectedMinutes = connectedCalls * input.averageConnectedMinutes;
  const monthlySpend = connectedMinutes * input.aiCostPerMinute + input.fixedMonthlyCost;

  return {
    connectedCalls,
    successfulCalls,
    connectedMinutes,
    monthlySpend: roundMoney(monthlySpend),
    costPerAttempt: monthlySpend / input.attemptedCalls,
    costPerConnectedCall: monthlySpend / connectedCalls,
    costPerSuccessfulCall: monthlySpend / successfulCalls,
  };
}

export type TurnLatencyInput = {
  readonly endpointingMs: number;
  readonly speechToTextMs: number;
  readonly languageModelMs: number;
  readonly textToSpeechMs: number;
  readonly networkMs: number;
};

const latencyLabels = {
  endpointingMs: "endpointing",
  speechToTextMs: "speech to text",
  languageModelMs: "language model",
  textToSpeechMs: "text to speech",
  networkMs: "network",
} as const;

export function estimateTurnLatency(input: TurnLatencyInput) {
  const components = Object.entries(input) as Array<
    [keyof TurnLatencyInput, TurnLatencyInput[keyof TurnLatencyInput]]
  >;
  const totalMs = components.reduce((total, [, value]) => total + value, 0);
  const [largestKey, largestMs] = components.reduce((largest, candidate) =>
    candidate[1] > largest[1] ? candidate : largest,
  );

  return {
    totalMs,
    band: totalMs <= 500 ? "fast" : totalMs <= 1_000 ? "conversational" : "noticeable",
    largestComponent: latencyLabels[largestKey],
    largestMs,
  } as const;
}
