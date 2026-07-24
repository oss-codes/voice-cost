export type IndustryTemplate = {
  readonly slug: string;
  readonly name: string;
  readonly title: string;
  readonly goal: string;
  readonly opening: string;
  readonly flow: readonly string[];
  readonly integrations: readonly string[];
  readonly metrics: readonly string[];
  readonly watch: readonly string[];
};

export const industryTemplates = [
  {
    slug: "healthcare-appointments",
    name: "Healthcare appointments",
    title: "Voice AI call template for healthcare appointments",
    goal: "Confirm, reschedule, or cancel an appointment without exposing unnecessary clinical information.",
    opening:
      "Identify the organization, disclose recording or AI use where required, and verify only the minimum identity fields needed for scheduling.",
    flow: [
      "Confirm permitted contact and identity",
      "State appointment date without sensitive detail",
      "Capture confirm, reschedule, or cancel",
      "Check scheduling availability",
      "Escalate clinical or urgent questions",
      "Send an approved confirmation",
    ],
    integrations: [
      "Scheduling system",
      "Patient identity service",
      "SMS confirmation",
      "Human queue",
    ],
    metrics: [
      "Confirmed appointments",
      "Reschedule completion",
      "Human escalation",
      "No-show reduction",
    ],
    watch: [
      "HIPAA or local health-data rules",
      "Do not put diagnosis details in prompts",
      "Emergency-language detection must transfer safely",
    ],
  },
  {
    slug: "real-estate-lead-qualification",
    name: "Real-estate lead qualification",
    title: "Voice AI call template for real-estate lead qualification",
    goal: "Qualify intent and book a viewing without turning the conversation into a long survey.",
    opening:
      "Reference the property or inquiry that created the lead, state the agency, and ask whether this is a useful time.",
    flow: [
      "Confirm property or location interest",
      "Ask budget and timing",
      "Ask purchase, rent, or investment intent",
      "Check agent and viewing availability",
      "Book or transfer",
      "Write structured notes to CRM",
    ],
    integrations: ["CRM", "Property inventory", "Calendar", "WhatsApp or SMS"],
    metrics: [
      "Qualified-lead rate",
      "Viewing-booked rate",
      "Cost per viewing",
      "Lead response time",
    ],
    watch: [
      "Fair-housing constraints",
      "Consent source and lead age",
      "Never invent property availability",
    ],
  },
  {
    slug: "collections-and-payment-reminders",
    name: "Collections and payment reminders",
    title: "Voice AI call template for payment reminders",
    goal: "Deliver a compliant reminder, verify identity, and offer approved next steps without pressure or disclosure to third parties.",
    opening: "Use a neutral identity-safe opening until the correct person is verified.",
    flow: [
      "Verify the correct party",
      "State the approved account context",
      "Offer payment or callback options",
      "Handle dispute or hardship triggers",
      "Transfer protected cases",
      "Record disposition and suppression",
    ],
    integrations: [
      "Account system",
      "Payment link service",
      "Consent and suppression store",
      "Specialist queue",
    ],
    metrics: ["Right-party contact", "Promise-to-pay", "Dispute escalation", "Complaint rate"],
    watch: [
      "Debt-collection laws vary",
      "No account detail before verification",
      "Human review for vulnerability or dispute",
    ],
  },
  {
    slug: "restaurant-reservations",
    name: "Restaurant reservations",
    title: "Voice AI call template for restaurant reservations",
    goal: "Answer quickly, check real inventory, and complete a reservation or change.",
    opening:
      "State the restaurant name and ask whether the caller wants a new reservation, change, cancellation, or common information.",
    flow: [
      "Collect date, time, and party size",
      "Check live availability",
      "Offer nearby alternatives",
      "Capture name and contact",
      "Confirm special accessibility needs",
      "Send confirmation",
    ],
    integrations: [
      "Reservation system",
      "Opening-hours data",
      "SMS confirmation",
      "Human host phone",
    ],
    metrics: [
      "Booking completion",
      "Containment rate",
      "Average call duration",
      "Missed-call recovery",
    ],
    watch: [
      "Never promise unavailable inventory",
      "Escalate allergy questions",
      "Keep hours and closure dates current",
    ],
  },
  {
    slug: "recruiting-screen",
    name: "Recruiting screen",
    title: "Voice AI call template for candidate screening",
    goal: "Confirm objective job requirements and availability without making hiring decisions.",
    opening:
      "Name the employer and role, explain the screening purpose, and give the candidate a human-contact option.",
    flow: [
      "Confirm continued interest",
      "Ask role-specific objective requirements",
      "Capture location and work authorization where lawful",
      "Ask notice period and interview availability",
      "Answer approved role questions",
      "Schedule or route to recruiter",
    ],
    integrations: ["ATS", "Calendar", "Job description knowledge", "Recruiter queue"],
    metrics: [
      "Completed screens",
      "Interview-booked rate",
      "Candidate opt-out",
      "Recruiter review time",
    ],
    watch: [
      "Avoid protected-characteristic questions",
      "Do not autonomously reject ambiguous answers",
      "Audit transcription and language bias",
    ],
  },
  {
    slug: "customer-support-triage",
    name: "Customer-support triage",
    title: "Voice AI call template for customer-support triage",
    goal: "Resolve narrow repetitive issues and reach the right human with useful context when automation stops helping.",
    opening:
      "Identify the company, offer a human route, and ask for the problem in the caller’s own words.",
    flow: [
      "Authenticate only when account data is needed",
      "Classify issue and urgency",
      "Run approved diagnostic or lookup",
      "Confirm the result in plain language",
      "Transfer on policy, sentiment, or failure",
      "Attach summary and trace to the ticket",
    ],
    integrations: ["Help desk", "Identity provider", "Status page", "Order or account API"],
    metrics: ["First-contact resolution", "Transfer accuracy", "Repeat contact", "Customer effort"],
    watch: [
      "Do not hide the human option",
      "Never fabricate account actions",
      "Mask sensitive tool output in transcripts",
    ],
  },
] as const satisfies readonly IndustryTemplate[];
