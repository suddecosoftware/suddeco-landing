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

    // Notify the owner (email → sales@suddeco.com + Google Calendar) for EVERY
    // new registration — this is the hook the mailer/notify route was written
    // for but was never being called, so no booking email ever arrived. The
    // lead is already saved above; the notifier is timeout-guarded and swallows
    // its own errors so a notifier outage never fails or slows registration.
    try {
      const notifyUrl =
        Deno.env.get("OWNER_NOTIFY_URL") ||
        "https://rachel.suddeco.com/api/mailer/notify";
      // Shared secret the notifier accepts. Must be OWNER_NOTIFY_TOKEN — the
      // notifier lives on a DIFFERENT Supabase project, so its service-role key
      // never matched ours and every booking silently 401'd (no email, no
      // calendar). Fall back to the service key only for backwards-compat.
      const notifyToken = Deno.env.get("OWNER_NOTIFY_TOKEN") ||
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
      // Run the notifier in the BACKGROUND so the booking response returns
      // immediately, but the whole notifier finishes — including the Google
      // Calendar insert that runs AFTER the email. A foreground 4s await let the
      // email land (~3s) then severed the connection before the calendar step.
      const notifyTask = (async () => {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 12000);
        try {
          await fetch(notifyUrl, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${notifyToken}`,
            },
            body: JSON.stringify({
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
            }),
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
        edgeRuntime.waitUntil(notifyTask);
      } else {
        await notifyTask;
      }
    } catch (_notifyErr) {
      /* never block registration on notifier failure */
    }

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
