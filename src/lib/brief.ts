import { briefPlans, briefTree, campaignStep } from "@/content/brief";
import { siteConfig } from "@/config/site";
import { getProjectBySlug } from "@/lib/projects";
import type {
  BriefAnswer,
  BriefContext,
  BriefNode,
  BriefNodeId,
  BriefPlan,
  BriefProof,
  BriefTarget,
  DraftMessage,
} from "@/types/brief";

/** Résout les étapes qui dépendent du parcours (ex. pas de question « campagnes » pour « Faire grandir »). */
export function resolveTarget(target: BriefTarget, context: BriefContext): BriefNodeId {
  if (target === "apresDelai") return context.goal === "grandir" ? "plan" : "campagnes";
  return target;
}

export function buildPlan(context: BriefContext): BriefPlan {
  const plan = briefPlans[context.plan ?? "autre"];
  const withCampaigns = context.wantsCampaigns && context.goal !== "grandir";
  return withCampaigns ? { ...plan, steps: [...plan.steps, campaignStep] } : plan;
}

export function proofMessage(proof: BriefProof): DraftMessage | null {
  const project = getProjectBySlug(proof.projectSlug);
  if (!project) return null;
  return { kind: "proof", name: project.nom, meta: proof.meta, href: `/projets/${project.slug}` };
}

/** Ce que A's CHAAM envoie en arrivant sur un nœud : intro, plan, aperçu WhatsApp, puis la question. */
export function nodeMessages(node: BriefNode, context: BriefContext, answers: BriefAnswer[]): DraftMessage[] {
  const messages: DraftMessage[] = (node.intro ?? []).map((text) => ({ kind: "bot", text }));
  if (node.showPlan) messages.push({ kind: "plan", plan: buildPlan(context) });
  if (node.showWhatsappPreview) {
    messages.push({ kind: "whatsapp", answers, planTitle: buildPlan(context).title });
  }
  if (node.ask) messages.push({ kind: "ask", text: node.ask });
  return messages;
}

export function getNode(id: BriefNodeId): BriefNode {
  return briefTree[id];
}

export function briefSummary(answers: BriefAnswer[], context: BriefContext): string {
  const lines = answers.map(({ question, answer }) => `• ${question} : ${answer}`);
  return [...lines, `• Plan proposé : ${buildPlan(context).title}`].join("\n");
}

export function whatsappUrl(answers: BriefAnswer[], context: BriefContext): string {
  const text = `Bonjour A's CHAAM, voici mon projet :\n${briefSummary(answers, context)}`;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
