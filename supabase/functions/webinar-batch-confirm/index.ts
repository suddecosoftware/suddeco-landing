import { jsonResponse } from "../_shared/cors.ts";
import { postSlack, sendEmail } from "../_shared/notify.ts";
import { getSupabaseAdmin } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return jsonResponse({ ok: true });
  if (!["GET", "POST"].includes(req.method)) return jsonResponse({ error: "method not allowed" }, { status: 405 });

  try {
    const url = new URL(req.url);
    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const batchId = String(body.batch_id || url.searchParams.get("batch_id") || "").trim();
    const meetLink = String(body.meet_link || url.searchParams.get("meet_link") || "").trim();
    const scheduledAt = String(body.scheduled_at || url.searchParams.get("scheduled_at") || "").trim();

    if (!batchId) return jsonResponse({ error: "batch_id required" }, { status: 400 });
    if (!meetLink || meetLink === "PASTE_MEET_LINK") return jsonResponse({ error: "meet_link required" }, { status: 400 });
    if (!scheduledAt) return jsonResponse({ error: "scheduled_at required" }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const { data: batch, error: batchError } = await supabase
      .from("webinar_batches")
      .update({
        meet_link: meetLink,
        scheduled_at: scheduledAt,
        saimir_confirmed_at: new Date().toISOString(),
        status: "scheduled",
      })
      .eq("id", batchId)
      .select("id, track")
      .single();
    if (batchError) throw batchError;

    const { data: attendees, error: attendeesError } = await supabase
      .from("webinar_registrations")
      .select("name, email")
      .eq("batch_id", batchId);
    if (attendeesError) throw attendeesError;

    const subject = `Your Suddeco ${batch.track} demo is scheduled`;
    const text = `Your live demo is scheduled for ${scheduledAt}.\n\nJoin link: ${meetLink}\n\nBring a real project or question if you have one.`;
    const html = `<p>Your live demo is scheduled for <strong>${scheduledAt}</strong>.</p><p><a href="${meetLink}">Join the demo</a></p><p>Bring a real project or question if you have one.</p>`;
    const emailResults = [];
    for (const attendee of attendees || []) {
      const apiKey = Deno.env.get("RESEND_API_KEY");
      if (!apiKey) {
        emailResults.push({ to: attendee.email, sent: false, reason: "RESEND_API_KEY missing" });
        continue;
      }
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: Deno.env.get("WEBINAR_FROM_EMAIL") || "Suddeco <sales@suddeco.com>",
          to: attendee.email,
          subject,
          html,
          text,
        }),
      });
      emailResults.push({ to: attendee.email, sent: response.ok });
    }

    await postSlack(`[CODEX-AUTOBATCHER] Batch ${batchId} confirmed for ${scheduledAt}. Attendee email sends attempted.`);
    await supabase.from("webinar_batches").update({
      notification_payload: { confirmed: true, scheduledAt, meetLink, emailResults },
    }).eq("id", batchId);

    return jsonResponse({ success: true, batch_id: batchId, attendees: attendees?.length || 0, emailResults });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "confirmation failed" }, { status: 500 });
  }
});
