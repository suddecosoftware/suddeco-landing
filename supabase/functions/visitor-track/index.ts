import { getIp, jsonResponse } from "../_shared/cors.ts";
import { getSupabaseAdmin } from "../_shared/supabase.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return jsonResponse({ ok: true });
  if (req.method !== "POST") return jsonResponse({ error: "method not allowed" }, { status: 405 });

  try {
    const body = await req.json();
    const visitorUuid = String(body.visitor_uuid || body.visitorUuid || "").trim();
    if (!visitorUuid) return jsonResponse({ error: "visitor_uuid required" }, { status: 400 });

    const page = {
      path: body.page || body.path || "/",
      search: body.search || "",
      ts: body.ts || new Date().toISOString(),
      event: body.event || "page_view",
      track: body.track || body.demoTrack || null,
    };

    const supabase = getSupabaseAdmin();
    const { data: existing } = await supabase
      .from("visitor_sessions")
      .select("email, status, abandoned_demo_track, pages_visited")
      .eq("visitor_uuid", visitorUuid)
      .maybeSingle();

    const pages = Array.isArray(existing?.pages_visited) ? existing.pages_visited : [];
    const nextPages = [...pages.slice(-49), page];
    const demoTrack = body.track || body.demoTrack || null;
    const email = body.email || existing?.email || null;
    const status = email ? "identified" : (existing?.status || "anonymous");

    const { error } = await supabase.from("visitor_sessions").upsert({
      visitor_uuid: visitorUuid,
      email,
      last_seen: new Date().toISOString(),
      pages_visited: nextPages,
      utm_source: body.utm_source || body.utmSource || null,
      utm_campaign: body.utm_campaign || body.utmCampaign || null,
      utm_content: body.utm_content || body.utmContent || null,
      abandoned_demo_track: body.event === "demo_abandoned" || body.event === "demo_view" ? demoTrack : existing?.abandoned_demo_track || null,
      status,
      ip_address: getIp(req),
      user_agent: req.headers.get("user-agent"),
      referrer: body.referrer || null,
    }, { onConflict: "visitor_uuid" });

    if (error) throw error;
    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : "tracking failed" }, { status: 500 });
  }
});
