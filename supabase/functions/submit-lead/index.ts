import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface LeadPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  package?: string;
  message: string;
}

const TO_EMAIL = "lucasmourainfotech@gmail.com";

function sanitize(s: unknown, max = 1000): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, max);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

// Best-effort in-memory rate limiter (per edge instance).
// Limits: max 3 submissions per IP per 60s, and 10 per 10min.
const ipHits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  const recent = hits.filter((t) => now - t < 60_000);
  if (recent.length >= 3 || hits.length >= 10) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      const kept = v.filter((t) => now - t < 10 * 60_000);
      if (kept.length === 0) ipHits.delete(k);
      else ipHits.set(k, kept);
    }
  }
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    if (rateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Muitas requisições. Tente novamente em instantes." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as LeadPayload;

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 255).toLowerCase();
    const phone = sanitize(body.phone, 30);
    const service = sanitize(body.service, 80);
    const pkg = sanitize(body.package, 80);
    const message = sanitize(body.message, 2000);

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Campos obrigatórios faltando." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "E-mail inválido." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save to DB
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      service: service || null,
      package: pkg || null,
      message,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(JSON.stringify({ error: "Falha ao salvar." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const html = `
        <h2 style="font-family:Arial,sans-serif;color:#1a6aff;">Nova mensagem do site LM InfoTech</h2>
        <table style="font-family:Arial,sans-serif;font-size:14px;color:#222;border-collapse:collapse;">
          <tr><td style="padding:6px 12px;color:#666;">Nome:</td><td style="padding:6px 12px;"><strong>${escapeHtml(name)}</strong></td></tr>
          <tr><td style="padding:6px 12px;color:#666;">E-mail:</td><td style="padding:6px 12px;">${escapeHtml(email)}</td></tr>
          ${phone ? `<tr><td style="padding:6px 12px;color:#666;">WhatsApp:</td><td style="padding:6px 12px;">${escapeHtml(phone)}</td></tr>` : ""}
          ${service ? `<tr><td style="padding:6px 12px;color:#666;">Serviço:</td><td style="padding:6px 12px;">${escapeHtml(service)}</td></tr>` : ""}
          ${pkg ? `<tr><td style="padding:6px 12px;color:#666;">Pacote:</td><td style="padding:6px 12px;">${escapeHtml(pkg)}</td></tr>` : ""}
        </table>
        <h3 style="font-family:Arial,sans-serif;margin-top:24px;">Mensagem</h3>
        <p style="font-family:Arial,sans-serif;font-size:14px;color:#222;white-space:pre-wrap;background:#f6f8fb;padding:16px;border-radius:8px;border-left:3px solid #1a6aff;">${escapeHtml(message)}</p>
      `;

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "LM InfoTech <onboarding@resend.dev>",
          to: [TO_EMAIL],
          reply_to: email,
          subject: `Novo lead — ${name}${pkg ? ` (${pkg})` : ""}`,
          html,
        }),
      });

      if (!resendRes.ok) {
        const errText = await resendRes.text();
        console.error("Resend error:", errText);
        // Não falhamos a request — o lead já está salvo
      }
    } else {
      console.warn("RESEND_API_KEY not configured — e-mail not sent.");
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Erro interno." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
