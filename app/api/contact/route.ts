import { budgets, projectTypes, site } from "@/content/site";

// Envoi du formulaire de contact par e-mail via Resend (https://resend.com).
//
// Variables d'environnement (Vercel → Settings → Environment Variables) :
// - RESEND_API_KEY : clé API Resend (obligatoire pour l'envoi réel).
// - CONTACT_TO     : destinataire. Temporaire : l'adresse personnelle d'Ephrem,
//                    à remplacer par contact@codexworld.site quand le domaine
//                    sera actif et vérifié chez Resend.
// - CONTACT_FROM   : expéditeur. Tant que le domaine n'est pas vérifié chez
//                    Resend, seul « onboarding@resend.dev » est autorisé, et il
//                    ne peut écrire qu'à l'adresse du compte Resend.
//
// Sans RESEND_API_KEY, la route répond 503 et le formulaire bascule sur
// l'ouverture de la messagerie du visiteur (mailto).
const TO = process.env.CONTACT_TO ?? "ephr.kouadio@gmail.com";
const FROM = process.env.CONTACT_FROM ?? `${site.name} <onboarding@resend.dev>`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(v: unknown, max: number) {
  return String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return Response.json({ ok: false, fallback: true }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
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
      console.error("Resend", res.status, await res.text());
      return Response.json({ ok: false, error: "L'envoi a échoué." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Resend", err);
    return Response.json({ ok: false, error: "L'envoi a échoué." }, { status: 502 });
  }
}
