import { type StackProfile, stackProfiles } from "../data/stack-recommendations";

export type StackPreference = {
  readonly ownership: "managed" | "hybrid" | "self-hosted";
  readonly channel: "phone" | "web" | "multimodal";
  readonly launch: "days" | "weeks" | "control";
  readonly team: "app" | "realtime" | "telephony";
  readonly volume: "under-10k" | "10k-100k" | "over-100k";
  readonly requireOpenSource: boolean;
  readonly requireRegionControl: boolean;
};

export type StackRecommendation = {
  readonly profile: StackProfile;
  readonly score: number;
  readonly reasons: readonly string[];
};

function ownershipScore(profile: StackProfile, ownership: StackPreference["ownership"]) {
  if (profile.kind === ownership) return 5;
  if (profile.kind === "hybrid") return 3;
  if (ownership === "hybrid") return 2;
  return 0;
}

export function recommendStacks(preference: StackPreference): readonly StackRecommendation[] {
  return stackProfiles
    .map((profile) => {
      let score = ownershipScore(profile, preference.ownership);
      const reasons: string[] = [];

      if (profile.kind === preference.ownership) reasons.push(`${profile.kind} ownership match`);
      else if (profile.kind === "hybrid") reasons.push("hybrid deployment flexibility");

      if (profile.channels.some((channel) => channel === preference.channel)) {
        score += 4;
        reasons.push(`${preference.channel} channel support`);
      } else {
        score -= 5;
      }

      if (profile.launch === preference.launch) {
        score += 3;
        reasons.push(`${preference.launch} launch preference`);
      } else if (profile.launch === "weeks" || preference.launch === "weeks") {
        score += 1;
      }

      if (profile.teams.some((team) => team === preference.team)) {
        score += 2;
        reasons.push(`${preference.team} team fit`);
      }

      if (preference.requireOpenSource) {
        score += profile.openSource ? 5 : -7;
        if (profile.openSource) reasons.push("source available");
      }

      if (preference.requireRegionControl) {
        score += profile.regionControl ? 4 : -6;
        if (profile.regionControl) reasons.push("deployment region control");
      }

      if (preference.volume === "under-10k" && profile.kind === "managed") {
        score += 1;
        reasons.push("low-volume launch fit");
      }
      if (preference.volume === "over-100k" && profile.kind !== "managed") {
        score += 2;
        reasons.push("high-volume control path");
      }

      return { profile, score, reasons };
    })
    .sort(
      (left, right) =>
        right.score - left.score || left.profile.name.localeCompare(right.profile.name),
    );
}
