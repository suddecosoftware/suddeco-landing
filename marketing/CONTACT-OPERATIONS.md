# Marketing enquiries

The static homepage uses POST `/api/contact`. This landing-only service stores an enquiry privately before sending one plain-text notification to the fixed recipient sales@suddeco.com. It does not create demo appointments, access product data or send customer acknowledgements.

Run with Node 20+: `node --test marketing/contact-service.test.mjs`. Deploy the service and unit separately from the static build. Copy only RESEND_API_KEY and RESEND_FROM from the existing authorised mail configuration into the root-owned 0600 `/opt/suddeco/env/landing-contact.env`; never place credentials in git or browser code. No new subscription, payment or auto-recharge is required by this code. Existing mail account allowance and mailbox receipt must be checked separately.

The systemd unit runs read-only code from `/usr/local/lib/suddeco-contact/contact-service.mjs` and binds port 3187 on loopback with private 0700 state under `/var/lib/suddeco-contact`. Keep the executable outside the restricted `/opt/suddeco` tree so the dynamic service user does not need access to other applications. Include `contact-nginx.conf` only in the existing suddeco.com HTTPS virtual host; preserve a dated backup, run `nginx -t` and reload. `/health` is loopback-only. It confirms that configuration loaded, not inbox delivery. Preserve the previous service and nginx files for rollback; do not remove files.

Per-IP limit: six requests/hour, bounded in-memory buckets. Persistent global limit: 25 distinct enquiry references per UTC day, including reservations that later fail. This cap survives restart. It limits abuse, not total account charges from other applications. No public enquiry lookup exists. State contains personal contact information: restrict access to the operator; never attach it to public reports or logs. Records are retained for operator review; a lawful retention schedule remains an owner decision.

Retries retain a browser-generated UUID until fields change or success. A reused UUID with changed content is rejected. Provider idempotency prevents a duplicate within its 24-hour window; ambiguous sends older than 23 hours require operator review and are never resent automatically. An accepted response means the notification provider accepted the message, not that the destination mailbox delivered it. Never tell a visitor delivery succeeded after an error.

On a failed send, the stored record stays pending and the visitor retains their fields plus the explicit email-draft fallback. No unattended resend loop runs. Review pending records privately, check the matching provider reference before retrying, and confirm the owner mailbox can receive mail. Do not invoke a real submission just for testing without approval to send that test message.

Staging must use a mock sender, never production credentials. Test a real internal message only after approval, with an obvious QA label. Deployment checks may call health and invalid submissions without sending mail.

Mail API contract: https://resend.com/docs/api-reference/emails/send-email and https://resend.com/docs/dashboard/emails/idempotency-keys .
