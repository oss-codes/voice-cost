import { describe, expect, test } from "bun:test";
import {
  defaultRealtimeScenario,
  defaultScenario,
  type RealtimeScenario,
  type Scenario,
} from "../data/pricing";
import {
  calculateRealtimeVoice,
  calculateStack,
  estimateConcurrency,
  estimateHumanSavings,
  estimateOutcomeEconomics,
  estimateTelephonyCost,
  estimateTurnLatency,
} from "./calculate";

describe("calculateRealtimeVoice", () => {
  test("prices caller and agent audio independently", () => {
    const result = calculateRealtimeVoice(defaultRealtimeScenario);

    expect(result.inputAudioMinutes).toBe(5_500);
    expect(result.outputAudioMinutes).toBe(4_500);
    expect(result.breakdown.realtimeInput).toBe(33);
    expect(result.breakdown.realtimeOutput).toBe(108);
    expect(result.monthly).toBe(381);
  });

  test("supports a balanced realtime conversation", () => {
    const scenario = {
      ...defaultRealtimeScenario,
      callerTalkShare: 0.5,
      realtimeModelId: "gpt-realtime-2",
    } satisfies RealtimeScenario;

    const result = calculateRealtimeVoice(scenario);

    expect(result.breakdown.realtimeInput).toBe(96);
    expect(result.breakdown.realtimeOutput).toBe(384);
    expect(result.perMinute).toBeCloseTo(0.072, 4);
  });
});

describe("calculateStack", () => {
  test("adds platform, speech, model, carrier, and recording costs for an unbundled stack", () => {
    // Given
    const scenario = {
      ...defaultScenario,
      monthlyMinutes: 1_000,
      recordingId: "daily-audio-recording",
    } satisfies Scenario;

    // When
    const result = calculateStack(scenario);

    // Then
    expect(result.monthly).toBeCloseTo(100.83, 2);
  });

  test("does not add separate model costs to a bundled platform", () => {
    // Given
    const scenario = {
      ...defaultScenario,
      monthlyMinutes: 1_000,
      platformId: "bland-start",
    } satisfies Scenario;

    // When
    const result = calculateStack(scenario);

    // Then
    expect(result.breakdown.models).toBe(0);
    expect(result.monthly).toBeCloseTo(154, 2);
  });
});

describe("estimateConcurrency", () => {
  test("applies peak factor and rounds required lines upward", () => {
    // Given / When
    const result = estimateConcurrency({
      callsPerMonth: 12_000,
      averageMinutes: 5,
      businessHoursPerDay: 10,
      businessDaysPerMonth: 22,
      peakFactor: 2.4,
    });

    // Then
    expect(result.requiredLines).toBe(11);
  });
});

describe("estimateHumanSavings", () => {
  test("returns positive monthly savings when automation costs less", () => {
    // Given / When
    const result = estimateHumanSavings({
      callsPerMonth: 2_000,
      averageMinutes: 5,
      humanHourlyCost: 28,
      aiCostPerMinute: 0.12,
      automationRate: 0.7,
    });

    // Then
    expect(result.monthlySavings).toBeCloseTo(2_426.67, 2);
  });
});

describe("estimateTelephonyCost", () => {
  test("includes connected minutes, recording, phone numbers, and failed attempts", () => {
    // Given / When
    const result = estimateTelephonyCost({
      connectedMinutes: 10_000,
      carrierPerMinute: 0.014,
      recordingPerMinute: 0.0025,
      phoneNumbers: 3,
      phoneNumberMonthly: 1.15,
      failedAttempts: 500,
      failedAttemptCost: 0.015,
    });

    // Then
    expect(result.monthly).toBeCloseTo(175.95, 2);
  });
});

describe("estimateOutcomeEconomics", () => {
  test("models spend and cost per successful outcome from the full funnel", () => {
    const result = estimateOutcomeEconomics({
      attemptedCalls: 10_000,
      connectionRate: 0.35,
      successRate: 0.4,
      averageConnectedMinutes: 4,
      aiCostPerMinute: 0.12,
      fixedMonthlyCost: 200,
    });

    expect(result.connectedCalls).toBe(3_500);
    expect(result.successfulCalls).toBe(1_400);
    expect(result.connectedMinutes).toBe(14_000);
    expect(result.monthlySpend).toBe(1_880);
    expect(result.costPerSuccessfulCall).toBeCloseTo(1.3429, 4);
  });
});

describe("estimateTurnLatency", () => {
  test("adds each turn component and returns a readable latency band", () => {
    const result = estimateTurnLatency({
      endpointingMs: 220,
      speechToTextMs: 90,
      languageModelMs: 280,
      textToSpeechMs: 120,
      networkMs: 80,
    });

    expect(result.totalMs).toBe(790);
    expect(result.band).toBe("conversational");
    expect(result.largestComponent).toBe("language model");
  });
});
