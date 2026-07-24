export type AsteriskMediaTransport = "rtp" | "websocket";
export type AsteriskCodec = "ulaw" | "alaw" | "g722";

export type AsteriskConfigInput = {
  readonly sipHost: string;
  readonly accountId: string;
  readonly sipUsername: string;
  readonly contactUser: string;
  readonly publicAddress: string;
  readonly privateCidr: string;
  readonly carrierCidr: string;
  readonly sipPort: number;
  readonly rtpStart: number;
  readonly rtpEnd: number;
  readonly codec: AsteriskCodec;
  readonly appName: string;
  readonly ariUsername: string;
  readonly inboundExtension: string;
  readonly callerId: string;
  readonly mediaTransport: AsteriskMediaTransport;
};

export const defaultAsteriskConfig = {
  sipHost: "sip.provider.example",
  accountId: "account-id",
  sipUsername: "sip-user",
  contactUser: "voice-ai",
  publicAddress: "203.0.113.10",
  privateCidr: "10.0.0.0/8",
  carrierCidr: "198.51.100.0/24",
  sipPort: 5060,
  rtpStart: 10000,
  rtpEnd: 20000,
  codec: "ulaw",
  appName: "voice-ai",
  ariUsername: "voice-ai-app",
  inboundExtension: "voice-ai",
  callerId: "+12025550123",
  mediaTransport: "rtp",
} as const satisfies AsteriskConfigInput;

export type AsteriskConfigBundle = {
  readonly "pjsip.conf": string;
  readonly "extensions.conf": string;
  readonly "rtp.conf": string;
  readonly "http.conf": string;
  readonly "ari.conf": string;
  readonly "external-media.txt": string;
};

export function generateAsteriskConfig(input: AsteriskConfigInput): AsteriskConfigBundle {
  const externalMedia =
    input.mediaTransport === "websocket"
      ? `POST /ari/channels/externalMedia
  ?app=${input.appName}
  &transport=websocket
  &encapsulation=none
  &external_host=<WEBSOCKET_CLIENT_ID>
  &format=${input.codec}`
      : `POST /ari/channels/externalMedia
  ?app=${input.appName}
  &external_host=127.0.0.1%3A60000
  &format=${input.codec}`;

  return {
    "pjsip.conf": `[transport-udp-nat]
type=transport
protocol=udp
bind=0.0.0.0:${input.sipPort}
local_net=${input.privateCidr}
external_signaling_address=${input.publicAddress}
external_media_address=${input.publicAddress}

[carrier-registration]
type=registration
transport=transport-udp-nat
outbound_auth=carrier-auth
server_uri=sip:${input.sipHost}
client_uri=sip:${input.accountId}@${input.sipHost}
contact_user=${input.contactUser}
retry_interval=60

[carrier-auth]
type=auth
auth_type=userpass
username=${input.sipUsername}
password=<SIP_PASSWORD>

[carrier-aor]
type=aor
contact=sip:${input.sipHost}:${input.sipPort}
qualify_frequency=30

[carrier-endpoint]
type=endpoint
transport=transport-udp-nat
context=from-carrier
disallow=all
allow=${input.codec}
outbound_auth=carrier-auth
aors=carrier-aor
direct_media=no
rtp_symmetric=yes
force_rport=yes
rewrite_contact=yes

[carrier-identify]
type=identify
endpoint=carrier-endpoint
match=${input.carrierCidr}`,
    "extensions.conf": `[from-carrier]
exten => ${input.inboundExtension},1,NoOp(Inbound Voice AI call)
 same => n,Answer()
 same => n,Stasis(${input.appName})
 same => n,Hangup()

[voice-ai-outbound]
exten => _+X.,1,NoOp(Outbound Voice AI call to \${EXTEN})
 same => n,Set(CALLERID(num)=${input.callerId})
 same => n,Dial(PJSIP/\${EXTEN}@carrier-endpoint,45)
 same => n,Hangup()`,
    "rtp.conf": `[general]
rtpstart=${input.rtpStart}
rtpend=${input.rtpEnd}`,
    "http.conf": `[general]
enabled=yes
bindaddr=127.0.0.1
bindport=8088`,
    "ari.conf": `[general]
enabled=yes
pretty=no

[${input.ariUsername}]
type=user
read_only=no
password_format=crypt
password=<CRYPT_PASSWORD_HASH>`,
    "external-media.txt": externalMedia,
  };
}

export function serializeAsteriskBundle(bundle: AsteriskConfigBundle): string {
  return Object.entries(bundle)
    .map(([filename, content]) => `### ${filename}\n\n${content}`)
    .join("\n\n");
}
