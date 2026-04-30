type Attendee = {
  name: string;
  email: string;
  company?: string | null;
  audience_type?: string | null;
  pain_point?: string | null;
};

export function nextSuggestedSlot() {
  const slot = new Date();
  slot.setUTCDate(slot.getUTCDate() + 1);
  slot.setUTCHours(12, 0, 0, 0);
  return slot.toISOString();
}

export function attendeesText(attendees: Attendee[]) {
  return attendees.map((attendee, index) => {
    const bits = [
      `${index + 1}. ${attendee.name} <${attendee.email}>`,
      attendee.company ? `Company: ${attendee.company}` : null,
      attendee.audience_type ? `Audience: ${attendee.audience_type}` : null,
      attendee.pain_point ? `Pain: ${attendee.pain_point}` : null,
    ].filter(Boolean);
    return bits.join("\n   ");
  }).join("\n");
}

export async function sendEmail(subject: string, html: string, text: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY missing" };

  const to = Deno.env.get("SAIMIR_NOTIFY_EMAIL") || "saimir@suddeco.com";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: Deno.env.get("WEBINAR_FROM_EMAIL") || "Suddeco <sales@suddeco.com>",
      to,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    return { sent: false, reason: await response.text() };
  }
  return { sent: true, response: await response.json() };
}

export async function postSlack(message: string) {
  const webhook = Deno.env.get("SLACK_WEBHOOK_URL");
  if (!webhook) return { sent: false, reason: "SLACK_WEBHOOK_URL missing" };
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: message }),
  });
  return response.ok
    ? { sent: true }
    : { sent: false, reason: await response.text() };
}
