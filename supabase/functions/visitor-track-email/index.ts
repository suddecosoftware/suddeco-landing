import { getIp, isValidEmail, jsonResponse, normaliseEmail } from "../_shared/cors.ts";
import { getSupabaseAdmin } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return jsonResponse({ ok: true });
  if (req.method !== "POST") return jsonResponse({ error: "method not allowed" }, { status: 405 });

  try {
    const body = await req.json();
    const visitorUuid = String(body.visitor_uuid || body.visitorUuid || "").trim();
    const email = normaliseEmail(body.email);
    if (!visitorUuid) return jsonResponse({ error: "visitor_uuid required" }, { status: 400 });
    if (!isValidEmail(email)) return jsonResponse({ error: "valid email required" }, { status: 400 });

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("visitor_sessions").upsert({
      visitor_uuid: visitorUuid,
      email,
      last_seen: new Date().toISOString(),
      status: "identified",
      ip_address: getIp(req),
      user_agent: req.headers.get("user-agent"),
    }, { onConflict: "visitor_uuid" });

    if (error) throw error;
    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "email tracking failed" }, { status: 500 });
  }
});
