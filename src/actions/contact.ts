"use server";

import type { BriefAnswer } from "@/types/brief";

export interface SendBriefInput {
  name: string;
  email: string;
  /** Champ piège invisible : rempli uniquement par les robots. */
  website: string;
  answers: BriefAnswer[];
  planTitle: string;
}

export type SendBriefResult = { ok: true } | { ok: false; error: "invalid" | "unavailable" | "failed" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ANSWERS = 20;
const MAX_LENGTH = 300;

const clean = (value: unknown) => (typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "");

/**
 * Envoie le brief par e-mail via Resend.
 * Une action serveur est appelable directement en POST : tout est revalidé ici.
 */
export async function sendBrief(input: SendBriefInput): Promise<SendBriefResult> {
  // Robot : on fait comme si tout allait bien, sans rien envoyer.
  if (clean(input.website)) return { ok: true };

  const name = clean(input.name) || "Sans nom";
  const email = clean(input.email);
  const planTitle = clean(input.planTitle);
  const answers = Array.isArray(input.answers)
    ? input.answers.slice(0, MAX_ANSWERS).map((a) => ({ question: clean(a?.question), answer: clean(a?.answer) }))
    : [];

  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: "invalid" };

  const { RESEND_API_KEY, BRIEF_EMAIL_TO, BRIEF_EMAIL_FROM } = process.env;
  if (!RESEND_API_KEY || !BRIEF_EMAIL_TO || !BRIEF_EMAIL_FROM) {
    console.error("sendBrief : RESEND_API_KEY, BRIEF_EMAIL_TO ou BRIEF_EMAIL_FROM manquant.");
    return { ok: false, error: "unavailable" };
  }

  const text = [
    `Nouveau brief de ${name} (${email})`,
    "",
    ...answers.map(({ question, answer }) => `• ${question} : ${answer}`),
    `• Plan proposé : ${planTitle}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: BRIEF_EMAIL_FROM,
        to: BRIEF_EMAIL_TO,
        reply_to: email,
        subject: `Brief — ${planTitle || "nouveau projet"} — ${name}`,
        text,
      }),
    });
    if (!response.ok) {
      console.error("sendBrief : Resend a répondu", response.status, await response.text());
      return { ok: false, error: "failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("sendBrief : envoi impossible", error);
    return { ok: false, error: "failed" };
  }
}
