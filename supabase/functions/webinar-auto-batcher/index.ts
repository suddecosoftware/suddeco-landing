import { jsonResponse } from "../_shared/cors.ts";
import { attendeesText, nextSuggestedSlot, postSlack, sendEmail } from "../_shared/notify.ts";
import { getSupabaseAdmin } from "../_shared/supabase.ts";

const TRACKS = ["pro", "homeowner"] as const;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return jsonResponse({ ok: true });
  if (!["GET", "POST"].includes(req.method)) return jsonResponse({ error: "method not allowed" }, { status: 405 });

  try {
    const supabase = getSupabaseAdmin();
    const results = [];

    for (const track of TRACKS) {
      const { data: attendees, error: attendeeError } = await supabase
        .from("webinar_registrations")
        .select("id, name, email, company, audience_type, pain_point, created_at")
        .eq("track", track)
        .is("batch_id", null)
        .eq("status", "pending")
        .order("created_at", { ascending: true })
        .limit(10);
      if (attendeeError) throw attendeeError;

      if (!attendees || attendees.length < 10) {
        results.push({ track, batched: false, count: attendees?.length || 0 });
        continue;
      }

      const suggestedSlot = nextSuggestedSlot();
      const { data: batch, error: batchError } = await supabase
        .from("webinar_batches")
        .insert({
          track,
          attendee_count: attendees.length,
          scheduled_at: suggestedSlot,
          status: "pending_saimir",
        })
        .select("id")
        .single();
      if (batchError) throw batchError;

      const ids = attendees.map((attendee) => attendee.id);
      const { error: updateError } = await supabase
        .from("webinar_registrations")
        .update({ batch_id: batch.id })
        .in("id", ids);
      if (updateError) throw updateError;

      const confirmBase = Deno.env.get("SUPABASE_URL") || "https://hvpsxeytbvbytyjudtyb.supabase.co";
      const confirmUrl = `${confirmBase}/functions/v1/webinar-batch-confirm?batch_id=${batch.id}&scheduled_at=${encodeURIComponent(suggestedSlot)}`;
      const list = attendeesText(attendees);
      const subject = `[${track.toUpperCase()}] webinar bucket full — 10 registered`;
      const text = `${subject}\n\nSuggested slot: ${suggestedSlot}\n\nAttendees:\n${list}\n\nConfirm link (add meet_link query parameter):\n${confirmUrl}&meet_link=PASTE_MEET_LINK`;
      const html = `<h1>${subject}</h1><p><strong>Suggested slot:</strong> ${suggestedSlot}</p><pre>${list}</pre><p><a href="${confirmUrl}&meet_link=PASTE_MEET_LINK">Confirm batch</a></p>`;
      const email = await sendEmail(subject, html, text);
      const slack = await postSlack(`[CODEX-AUTOBATCHER] ${track} bucket full — 10 attendees ready. Batch ${batch.id}. Email notification attempted.`);

      await supabase
        .from("webinar_batches")
        .update({
          saimir_notified_at: new Date().toISOString(),
          notification_payload: { subject, suggestedSlot, attendees, email, slack, confirmUrl },
        })
        .eq("id", batch.id);

      results.push({ track, batched: true, batch_id: batch.id, email, slack });
    }

    return jsonResponse({ success: true, results });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "batcher failed" }, { status: 500 });
  }
});
