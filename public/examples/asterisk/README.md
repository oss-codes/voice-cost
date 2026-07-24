# Voice OSS Asterisk examples

These files are starting points for Asterisk 20 or 22 using `res_pjsip` and ARI.
They are not drop-in production credentials.

1. Replace every value inside angle brackets.
2. Confirm the SIP host, authentication mode, codecs, number format, signaling
   CIDRs, and registration requirements with the carrier.
3. Bind ARI to loopback or a private interface. Do not expose port 8088 to the
   public internet.
4. Permit only the required SIP signaling sources and UDP RTP range.
5. Run `asterisk -rx "core reload"` and the checks in the Voice OSS guide.

Guide: https://voice.oss.codes/guides/asterisk-voice-ai-configuration/
