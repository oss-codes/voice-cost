import { describe, expect, test } from "bun:test";
import {
  defaultAsteriskConfig,
  generateAsteriskConfig,
  serializeAsteriskBundle,
} from "./asterisk-config";
import { estimateTelephonyCost } from "./calculate";
import { recommendStacks } from "./recommend-stack";

describe("generateAsteriskConfig", () => {
  test("creates the SIP, dialplan, RTP, ARI, and media files without collecting secrets", () => {
    const bundle = generateAsteriskConfig({
      ...defaultAsteriskConfig,
      publicAddress: "203.0.113.20",
      codec: "g722",
      mediaTransport: "websocket",
    });
    const serialized = serializeAsteriskBundle(bundle);

    expect(bundle["pjsip.conf"]).toContain("external_media_address=203.0.113.20");
    expect(bundle["pjsip.conf"]).toContain("allow=g722");
    expect(bundle["pjsip.conf"]).toContain("password=<SIP_PASSWORD>");
    expect(bundle["extensions.conf"]).toContain("Stasis(voice-ai)");
    expect(bundle["ari.conf"]).toContain("password=<CRYPT_PASSWORD_HASH>");
    expect(bundle["external-media.txt"]).toContain("transport=websocket");
    expect(serialized).not.toContain("super-secret");
  });
});

describe("country telephony estimate", () => {
  test("includes custom fixed monthly carrier costs", () => {
    const result = estimateTelephonyCost({
      connectedMinutes: 10_000,
      carrierPerMinute: 0.0158,
      recordingPerMinute: 0.0025,
      phoneNumbers: 2,
      phoneNumberMonthly: 3.5,
      failedAttempts: 500,
      failedAttemptCost: 0.01,
      fixedMonthly: 25,
    });

    expect(result.monthly).toBe(220);
    expect(result.breakdown.fixedMonthly).toBe(25);
    expect(result.perConnectedMinute).toBeCloseTo(0.022, 4);
  });
});

describe("recommendStacks", () => {
  test("selects a managed phone stack for a fast application-team launch", () => {
    const results = recommendStacks({
      ownership: "managed",
      channel: "phone",
      launch: "days",
      team: "app",
      volume: "under-10k",
      requireOpenSource: false,
      requireRegionControl: false,
    });

    expect(results[0]?.profile.id).toBe("retell");
    expect(results[0]?.reasons).toContain("phone channel support");
  });

  test("selects the self-hosted telephony path when ownership and region control matter", () => {
    const results = recommendStacks({
      ownership: "self-hosted",
      channel: "phone",
      launch: "control",
      team: "telephony",
      volume: "over-100k",
      requireOpenSource: true,
      requireRegionControl: true,
    });

    expect(results[0]?.profile.id).toBe("asterisk-pipecat");
    expect(results[0]?.reasons).toContain("deployment region control");
  });
});
