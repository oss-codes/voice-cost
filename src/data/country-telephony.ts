export const COUNTRY_TELEPHONY_VERIFIED_AT = "2026-07-24";

export type TelephonyRoute = {
  readonly id: string;
  readonly label: string;
  readonly perMinute: number;
  readonly phoneNumberMonthly: number;
};

export type CountryTelephonyPreset = {
  readonly id: string;
  readonly country: string;
  readonly provider: string;
  readonly currency: "USD";
  readonly sourceUrl: string;
  readonly note: string;
  readonly routes: readonly TelephonyRoute[];
};

export const countryTelephonyPresets = [
  {
    id: "us",
    country: "United States",
    provider: "Twilio",
    currency: "USD",
    sourceUrl: "https://www.twilio.com/en-us/voice/pricing/us",
    note: "Local numbers are publicly listed at $1.15 per month.",
    routes: [
      { id: "outbound-local", label: "Outbound local", perMinute: 0.014, phoneNumberMonthly: 1.15 },
      { id: "inbound-local", label: "Inbound local", perMinute: 0.0085, phoneNumberMonthly: 1.15 },
      {
        id: "inbound-toll-free",
        label: "Inbound toll-free",
        perMinute: 0.022,
        phoneNumberMonthly: 2.15,
      },
    ],
  },
  {
    id: "gb",
    country: "United Kingdom",
    provider: "Twilio",
    currency: "USD",
    sourceUrl: "https://www.twilio.com/en-us/voice/pricing/gb",
    note: "Local numbers are publicly listed at $3.50 per month.",
    routes: [
      { id: "outbound-local", label: "Outbound local", perMinute: 0.0158, phoneNumberMonthly: 3.5 },
      {
        id: "outbound-mobile",
        label: "Outbound mobile",
        perMinute: 0.0305,
        phoneNumberMonthly: 3.5,
      },
      { id: "inbound-local", label: "Inbound local", perMinute: 0.01, phoneNumberMonthly: 3.5 },
    ],
  },
  {
    id: "au",
    country: "Australia",
    provider: "Twilio",
    currency: "USD",
    sourceUrl: "https://www.twilio.com/en-us/voice/pricing/au",
    note: "Local numbers are publicly listed at $3.00 per month.",
    routes: [
      { id: "outbound-local", label: "Outbound local", perMinute: 0.0252, phoneNumberMonthly: 3 },
      { id: "outbound-mobile", label: "Outbound mobile", perMinute: 0.075, phoneNumberMonthly: 3 },
      { id: "inbound-local", label: "Inbound local", perMinute: 0.01, phoneNumberMonthly: 3 },
    ],
  },
  {
    id: "in",
    country: "India",
    provider: "Twilio",
    currency: "USD",
    sourceUrl: "https://www.twilio.com/en-us/voice/pricing/in",
    note: "The public page lists outbound termination but no local inbound voice number. Number cost defaults to $0 so you can enter your own carrier quote.",
    routes: [
      { id: "outbound-local", label: "Outbound local", perMinute: 0.0699, phoneNumberMonthly: 0 },
      { id: "outbound-mobile", label: "Outbound mobile", perMinute: 0.0496, phoneNumberMonthly: 0 },
    ],
  },
  {
    id: "sg",
    country: "Singapore",
    provider: "Twilio",
    currency: "USD",
    sourceUrl: "https://www.twilio.com/en-us/voice/pricing/sg",
    note: "The public page lists outbound termination but no local inbound voice number. Number cost defaults to $0 so you can enter your own carrier quote.",
    routes: [
      { id: "outbound-local", label: "Outbound local", perMinute: 0.0423, phoneNumberMonthly: 0 },
      { id: "outbound-mobile", label: "Outbound mobile", perMinute: 0.0578, phoneNumberMonthly: 0 },
    ],
  },
] as const satisfies readonly CountryTelephonyPreset[];
