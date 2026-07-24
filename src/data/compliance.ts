export const COMPLIANCE_VERIFIED_AT = "2026-07-24";

export type ComplianceGuide = {
  readonly slug: string;
  readonly name: string;
  readonly title: string;
  readonly summary: string;
  readonly checks: readonly { readonly title: string; readonly detail: string }[];
  readonly sources: readonly { readonly label: string; readonly url: string }[];
};

export const complianceGuides = [
  {
    slug: "united-states",
    name: "United States",
    title: "US Voice AI calling compliance starting checklist",
    summary:
      "A practical starting point for TCPA consent, AI-generated voice treatment, caller identity, opt-outs, recording review, and campaign evidence.",
    checks: [
      {
        title: "Classify every call",
        detail:
          "Separate informational, transactional, marketing, debt collection, healthcare, and political traffic before selecting a consent rule.",
      },
      {
        title: "Treat AI voice as artificial voice",
        detail:
          "FCC rulings place AI-generated human voices within TCPA artificial or prerecorded voice restrictions.",
      },
      {
        title: "Capture the required consent",
        detail:
          "Telemarketing artificial-voice calls generally require prior express written consent. Other calls can follow different rules or exemptions.",
      },
      {
        title: "Identify the caller",
        detail:
          "Give the responsible business identity and a usable contact method, and preserve lawful caller ID.",
      },
      {
        title: "Honor revocation and suppression",
        detail:
          "Maintain an internal do-not-call list and make opt-out processing fast, traceable, and effective across campaigns.",
      },
      {
        title: "Review recording law separately",
        detail:
          "Call-recording consent can vary by state and context. Obtain counsel for every state in scope.",
      },
    ],
    sources: [
      {
        label: "FCC AI-generated voice declaratory ruling",
        url: "https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf",
      },
      {
        label: "FCC AI transparency proceeding",
        url: "https://docs.fcc.gov/public/attachments/FCC-24-84A1.pdf",
      },
      { label: "47 CFR 64.1200", url: "https://www.ecfr.gov/current/title-47/section-64.1200" },
    ],
  },
  {
    slug: "india",
    name: "India",
    title: "India Voice AI calling compliance starting checklist",
    summary:
      "Plan commercial calls around TRAI TCCCPR, principal-entity registration, preference and consent, numbering-series requirements, DLT records, and carrier approval.",
    checks: [
      {
        title: "Register the principal entity",
        detail:
          "TRAI materials require senders of commercial communication to use the DLT framework through an access provider.",
      },
      {
        title: "Classify the communication",
        detail:
          "Separate service, transactional, and promotional communication and use the permitted route and template for that class.",
      },
      {
        title: "Use the allocated numbering series",
        detail:
          "Confirm the current 140 or 160 series requirement and rollout status with the carrier before making commercial voice calls.",
      },
      {
        title: "Prove preference and consent",
        detail:
          "Keep consent, preference, campaign, header, and complaint records tied to the dialed number.",
      },
      {
        title: "Support complaints and opt-outs",
        detail:
          "Stop future traffic promptly and reconcile suppression across the business, vendor, and telecom provider.",
      },
      {
        title: "Pilot on an India carrier",
        detail:
          "Number availability, CLI, media streaming, and international routing can differ from global CPaaS documentation.",
      },
    ],
    sources: [
      { label: "TRAI TCCCPR 2018 hub", url: "https://www.trai.gov.in/tcccpr" },
      {
        label: "TRAI unsolicited commercial communication",
        url: "https://trai.gov.in/telecom/consumer-initiatives/unsolicited-commercial-communication",
      },
      {
        label: "TRAI Voice DLT direction",
        url: "https://www.trai.gov.in/sites/default/files/2024-08/Direction_04052024.pdf",
      },
    ],
  },
  {
    slug: "european-union",
    name: "European Union",
    title: "EU Voice AI privacy and transparency starting checklist",
    summary:
      "Combine GDPR legal-basis, transparency, minimization, processor, retention, data-subject rights, and AI Act review for each member state and use case.",
    checks: [
      {
        title: "Choose and document a legal basis",
        detail:
          "Identify the GDPR legal basis for contact data, transcripts, recordings, tool results, and model processing before launch.",
      },
      {
        title: "Inform the caller",
        detail:
          "Explain the purpose, responsible controller, recipients, retention, rights, and recording behavior in an accessible notice.",
      },
      {
        title: "Disclose AI interaction",
        detail:
          "Review AI Act Article 50 transparency duties and effective dates for direct interaction with natural persons.",
      },
      {
        title: "Minimize and retain deliberately",
        detail:
          "Do not keep raw audio, full transcripts, or tool payloads merely because storage is inexpensive.",
      },
      {
        title: "Map processors and transfers",
        detail:
          "Record every carrier, model vendor, hosting region, subprocessor, and international transfer mechanism.",
      },
      {
        title: "Test rights handling",
        detail:
          "Make access, objection, erasure, and restriction requests executable across recordings, transcripts, embeddings, and analytics.",
      },
    ],
    sources: [
      {
        label: "GDPR official text",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32016R0679",
      },
      {
        label: "EDPB legal basis guidance",
        url: "https://www.edpb.europa.eu/topics/key-gdpr-concepts/legal-basis_en",
      },
      {
        label: "EDPB telephone recording FAQ",
        url: "https://www.edpb.europa.eu/contact/frequently-asked-questions_en",
      },
      {
        label: "EU AI Act Article 50",
        url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50",
      },
    ],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    title: "UK Voice AI marketing and recording starting checklist",
    summary:
      "Review PECR live-call and automated-call rules, TPS and CTPS screening, specific consent, caller identity, UK GDPR, recording, and suppression.",
    checks: [
      {
        title: "Decide whether the call is live or automated",
        detail:
          "PECR applies different rules. A partly automated call can still fall within automated-call treatment.",
      },
      {
        title: "Screen live marketing lists",
        detail:
          "Check TPS, CTPS, and your own suppression records unless a valid consent exception applies.",
      },
      {
        title: "Obtain specific automated-call consent",
        detail:
          "ICO guidance states that general marketing or live-call consent is not enough for automated marketing calls.",
      },
      {
        title: "Identify the business",
        detail:
          "Display a contact number and provide the caller identity and contact details required for the call type.",
      },
      {
        title: "Apply UK GDPR to personal data",
        detail:
          "Document legal basis, transparency, retention, processor contracts, and rights handling for audio and transcripts.",
      },
      {
        title: "Recheck current ICO guidance",
        detail:
          "ICO notes that direct-marketing guidance is under review after the Data (Use and Access) Act 2025.",
      },
    ],
    sources: [
      {
        label: "ICO live-call guidance",
        url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-live-calls/",
      },
      {
        label: "ICO direct-marketing plan guidance",
        url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/plan-direct-marketing/",
      },
      {
        label: "ICO direct-marketing checklist",
        url: "https://ico.org.uk/for-organisations/advice-for-small-organisations/getting-started-with-gdpr/data-protection-self-assessment-medium-businesses/direct-marketing-checklist/",
      },
    ],
  },
] as const satisfies readonly ComplianceGuide[];
