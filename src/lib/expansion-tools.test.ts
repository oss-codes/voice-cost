import { describe, expect, test } from "bun:test";
import { defaultCallFlow, readinessChecks } from "../data/planning";
import {
  analyzeAudioSamples,
  analyzeLatencyTrace,
  buildArchitectureMermaid,
  buildCallFlowMermaid,
  estimateSipQuote,
  scoreReadiness,
} from "./expansion-tools";

describe("estimateSipQuote", () => {
  test("adds inbound, outbound, and number rental", () => {
    const result = estimateSipQuote({
      outboundMinutes: 10_000,
      inboundMinutes: 5_000,
      phoneNumbers: 2,
      outboundPerMinute: 0.005,
      inboundPerMinute: 0.0032,
      numberMonthly: 1,
    });
    expect(result?.monthly).toBe(68);
  });

  test("does not rank a missing carrier quote", () => {
    expect(
      estimateSipQuote({
        outboundMinutes: 1,
        inboundMinutes: 0,
        phoneNumbers: 0,
        outboundPerMinute: null,
        inboundPerMinute: null,
        numberMonthly: null,
      }),
    ).toBeNull();
  });
});

describe("analyzeLatencyTrace", () => {
  test("calculates the slowest measured boundary", () => {
    const result = analyzeLatencyTrace({
      speechEndMs: 0,
      endpointMs: 180,
      transcriptMs: 260,
      firstTokenMs: 540,
      firstAudioMs: 690,
      playableAudioMs: 760,
    });
    expect(result.totalMs).toBe(760);
    expect(result.slowest.label).toBe("model first token");
  });
});

describe("scoreReadiness", () => {
  test("reports missing critical launch gates", () => {
    const result = scoreReadiness(readinessChecks, new Set(["consent", "identity"]));
    expect(result.score).toBeGreaterThan(0);
    expect(result.missingCritical.some((check) => check.id === "pilot")).toBe(true);
  });
});

describe("exports", () => {
  test("builds architecture and call-flow Mermaid text", () => {
    expect(
      buildArchitectureMermaid({
        telephony: "Asterisk",
        runtime: "Pipecat",
        intelligence: "Realtime",
        deployment: "Self-hosted",
        region: "India",
      }),
    ).toContain('carrier["Asterisk"]');
    expect(buildCallFlowMermaid(defaultCallFlow)).toContain("n0 --> n1");
  });
});

describe("analyzeAudioSamples", () => {
  test("detects clipping and silence from decoded samples", () => {
    const result = analyzeAudioSamples({
      samples: new Float32Array([0, 0, 1, -1, 0.5, -0.5]),
      sampleRate: 16_000,
      durationSeconds: 1,
      channels: 1,
    });
    expect(result.clippingPercent).toBeCloseTo(33.333, 2);
    expect(result.silencePercent).toBeCloseTo(33.333, 2);
    expect(result.peakDbfs).toBe(0);
  });
});
