import { getIp, isValidEmail, jsonResponse, normaliseEmail } from "../_shared/cors.ts";
import { getSupabaseAdmin } from "../_shared/supabase.ts";

type RegisterBody = {
  track?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  audience_type?: string;
  audienceType?: string;
  pain_point?: string;
  painPoint?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  visitor_uuid?: string;
  visitorUuid?: string;
};

// Notify the owner (email → sales@suddeco.com + Google Calendar) in the
// BACKGROUND for EVERY booking — new OR returning. The lead is already saved by
// the caller; this never throws and never blocks/slows the booking response.
// waitUntil keeps the isolate alive so the calendar insert (which runs after the
// email inside the notifier) isn't cut off. Auth is the shared OWNER_NOTIFY_TOKEN
// — the notifier is on a DIFFERENT Supabase project, so its service-role key
// never matched ours and every booking used to silently 401 (no email/calendar).
function notifyOwner(payload: Record<string, unknown>): void {
  try {
    const notifyUrl = Deno.env.get("OWNER_NOTIFY_URL") ||
      "https://rachel.suddeco.com/api/mailer/notify";
    const notifyToken = Deno.env.get("OWNER_NOTIFY_TOKEN") ||
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const task = (async () => {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);
      try {
        await fetch(notifyUrl, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${notifyToken}`,
          },
          body: JSON.stringify(payload),
          signal: ctrl.signal,
        });
      } catch (_e) {
        /* swallow — the lead is already saved */
      } finally {
        clearTimeout(timer);
      }
    })();
    const edgeRuntime = (globalThis as {
      EdgeRuntime?: { waitUntil?: (p: Promise<unknown>) => void };
    }).EdgeRuntime;
    if (edgeRuntime && typeof edgeRuntime.waitUntil === "function") {
      edgeRuntime.waitUntil(task);
    } else {
      void task;
    }
  } catch (_notifyErr) {
    /* never block registration on notifier failure */
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return jsonResponse({ ok: true });
  if (req.method !== "POST") return jsonResponse({ error: "method not allowed" }, { status: 405 });

  try {
    const body = await req.json() as RegisterBody;
    const track = body.track;
    const email = normaliseEmail(body.email);
    const name = String(body.name || "").trim();
    const visitorUuid = String(body.visitor_uuid || body.visitorUuid || "").trim() || null;

    if (!track || !["pro", "homeowner"].includes(track)) {
      return jsonResponse({ error: "invalid track" }, { status: 400 });
    }
    if (!name) return jsonResponse({ error: "name required" }, { status: 400 });
    if (!isValidEmail(email)) return jsonResponse({ error: "valid email required" }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const { data: existing, error: existingError } = await supabase
      .from("webinar_registrations")
      .select("id, created_at, batch_id, status")
      .eq("track", track)
      .eq("email", email)
      .is("batch_id", null)
      .maybeSingle();

    if (existingError) throw existingError;

    if (existing) {
      // Returning registrant — refresh their contact details with anything new
      // and STILL notify the owner. Previously this returned early, so a
      // re-booking sent no email + no calendar event and dropped any updated
      // phone/address. The calendar event id is deterministic per registration,
      // so re-notifying updates the same event instead of duplicating it.
      const patch: Record<string, string> = {};
      const p = (body.phone || "").toString().trim();
      if (p) patch.phone = p;
      const a = (body.address || "").toString().trim();
      if (a) patch.address = a;
      const co = (body.company || "").toString().trim();
      if (co) patch.company = co;
      const at = (body.audience_type || body.audienceType || "").toString().trim();
      if (at) patch.audience_type = at;
      const pp = (body.pain_point || body.painPoint || "").toString().trim();
      if (pp) patch.pain_point = pp;
      if (Object.keys(patch).length) {
        await supabase.from("webinar_registrations").update(patch).eq("id", existing.id);
      }
      notifyOwner({
        registrationId: existing.id,
        track,
        name,
        email,
        phone: patch.phone ?? null,
        address: patch.address ?? null,
        company: patch.company ?? null,
        audienceType: patch.audience_type ?? null,
        painPoint: patch.pain_point ?? null,
        utmSource: body.utm_source || null,
        utmCampaign: body.utm_campaign || null,
        utmContent: body.utm_content || null,
      });

      const { count, error: countError } = await supabase
        .from("webinar_registrations")
        .select("*", { count: "exact", head: true })
        .eq("track", track)
        .is("batch_id", null)
        .lte("created_at", existing.created_at);
      if (countError) throw countError;
      return jsonResponse({
        success: true,
        already_registered: true,
        registration_id: existing.id,
        position: count || 1,
        threshold: 10,
        remaining: Math.max(0, 10 - (count || 1)),
      });
    }

    const ip = getIp(req);
    const registration = {
      track,
      name,
      email,
      phone: (body.phone || "").toString().trim() || null,
      address: (body.address || "").toString().trim() || null,
      company: body.company || null,
      audience_type: body.audience_type || body.audienceType || null,
      pain_point: body.pain_point || body.painPoint || null,
      utm_source: body.utm_source || null,
      utm_campaign: body.utm_campaign || null,
      utm_content: body.utm_content || null,
      visitor_uuid: visitorUuid,
      ip_address: ip,
      user_agent: req.headers.get("user-agent"),
    };

    const { data, error } = await supabase
      .from("webinar_registrations")
      .insert(registration)
      .select("id")
      .single();
    if (error) throw error;

    notifyOwner({
      registrationId: String(data.id),
      track,
      name,
      email,
      phone: registration.phone,
      address: registration.address,
      company: registration.company,
      audienceType: registration.audience_type,
      painPoint: registration.pain_point,
      utmSource: registration.utm_source,
      utmCampaign: registration.utm_campaign,
      utmContent: registration.utm_content,
    });

    if (visitorUuid) {
      await supabase.from("visitor_sessions").upsert({
        visitor_uuid: visitorUuid,
        email,
        last_seen: new Date().toISOString(),
        status: "registered",
        ip_address: ip,
        user_agent: req.headers.get("user-agent"),
      }, { onConflict: "visitor_uuid" });
    }

    const { count, error: countError } = await supabase
      .from("webinar_registrations")
      .select("*", { count: "exact", head: true })
      .eq("track", track)
      .is("batch_id", null);
    if (countError) throw countError;

    return jsonResponse({
      success: true,
      registration_id: data.id,
      position: count || 1,
      threshold: 10,
      remaining: Math.max(0, 10 - (count || 1)),
    });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "registration failed" }, { status: 500 });
  }
});
