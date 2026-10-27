import { budgets, projectTypes, site } from "@/content/site";
import { checkBotId } from "botid/server";

// Envoi du formulaire de contact par e-mail via Resend (https://resend.com).
//
// Variables d'environnement (Vercel → Settings → Environment Variables) :
// - RESEND_API_KEY : clé API Resend (obligatoire pour l'envoi réel).
// - CONTACT_TO     : destinataire des demandes de contact.
// - CONTACT_FROM   : expéditeur vérifié sur codexworld.site.
//
// Sans RESEND_API_KEY, la route répond 503 et le formulaire bascule sur
// l'ouverture de la messagerie du visiteur (mailto).
const TO = process.env.CONTACT_TO ?? "ephr.kouadio@gmail.com";
const FROM = process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 32 * 1024;
const JSON_CONTENT_TYPE_RE = /^application\/json(?:\s*;\s*charset\s*=\s*(?:utf-8|"utf-8"))?$/i;

function clean(v: unknown, max: number) {
  return String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

export async function POST(req: Request) {
  if (!JSON_CONTENT_TYPE_RE.test(req.headers.get("content-type")?.trim() ?? "")) {
    return Response.json({ ok: false, error: "Type de contenu invalide." }, { status: 415 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json({ ok: false, fallback: true }, { status: 503 });
  }

  // BotID Basic valide le défi du navigateur à chaque envoi. Un échec du
  // service ferme l'API sans envoyer d'e-mail ; le formulaire propose mailto.
  try {
    const verification = await checkBotId({ advancedOptions: { checkLevel: "basic" } });
    if (verification.isBot) {
      return Response.json({ ok: false, error: "Envoi non autorisé." }, { status: 403 });
    }
  } catch {
    return Response.json({ ok: false, fallback: true }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    const reader = req.body?.getReader();
    if (!reader) {
      return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
    }

    // Lire au plus 32 Kio, même si Content-Length est absent ou mensonger.
    const bytes = new Uint8Array(MAX_BODY_BYTES);
    let length = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value.byteLength > MAX_BODY_BYTES - length) {
          void reader.cancel().catch(() => {});
          return Response.json({ ok: false, error: "Requête trop volumineuse." }, { status: 413 });
        }
        bytes.set(value, length);
        length += value.byteLength;
      }
    } finally {
      reader.releaseLock();
    }

    const parsed: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes.subarray(0, length)));
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Piège anti-spam : un bot qui remplit le champ caché reçoit un faux succès.
  if (clean(body._gotcha, 10) !== "") return Response.json({ ok: true });

  const nom = clean(body.nom, 100);
  const email = clean(body.email, 200);
  const type = clean(body.type_de_projet, 100);
  const budget = clean(body.budget, 100);
  const message = clean(body.message, 5000);
  const consent = body.consentement === true || body.consentement === "on";

  if (nom.length < 2 || !EMAIL_RE.test(email) || !projectTypes.includes(type) || message.length < 10 || !consent) {
    return Response.json({ ok: false, error: "Merci de vérifier les champs obligatoires." }, { status: 400 });
  }
  if (budget && !budgets.includes(budget)) {
    return Response.json({ ok: false, error: "Budget invalide." }, { status: 400 });
  }

  const text = [
    `Nom : ${nom}`,
    `E-mail : ${email}`,
    `Type de projet : ${type}`,
    `Budget : ${budget || "non précisé"}`,
    "",
    message,
    "",
    `— Envoyé depuis ${site.url}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Nouveau projet : ${type} — ${nom}`,
        text,
      }),
    });
    if (!res.ok) {
      // Éviter de conserver dans les journaux une réponse fournisseur pouvant
      // contenir les données personnelles du formulaire.
      const requestId = res.headers.get("x-request-id");
      console.error("Resend email request failed", {
        status: res.status,
        ...(requestId && /^[A-Za-z0-9_-]{1,128}$/.test(requestId) ? { requestId } : {}),
      });
      return Response.json({ ok: false, error: "L'envoi a échoué." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    console.error("Resend email request failed before an HTTP response");
    return Response.json({ ok: false, error: "L'envoi a échoué." }, { status: 502 });
  }
}
