import { briefAcks } from "@/content/brief";
import { getNode, nodeMessages, proofMessage, resolveTarget } from "@/lib/brief";
import type {
  BriefAnswer,
  BriefContext,
  BriefMessage,
  BriefNodeId,
  BriefOption,
  BriefTarget,
  DraftMessage,
} from "@/types/brief";

export interface BriefState {
  messages: BriefMessage[];
  /** Messages en attente : révélés un par un, précédés de l'indicateur de saisie. */
  queue: DraftMessage[];
  /** Nœud dont les réponses sont proposées ; `null` pendant que A's CHAAM « écrit ». */
  nodeId: BriefNodeId | null;
  pendingNodeId: BriefNodeId | null;
  context: BriefContext;
  answers: BriefAnswer[];
  ackCount: number;
  nextId: number;
  /** Nombre de messages déjà révélés dans la salve en cours. */
  revealed: number;
  isSending: boolean;
}

export type BriefAction =
  | { type: "choose"; option: BriefOption }
  /** Repart de zéro et répond d'emblée à la première question (lien « Démarrer ce brief »). */
  | { type: "startWith"; option: BriefOption }
  | { type: "submitText"; text: string }
  | { type: "contactSubmitted"; label: string }
  | { type: "contactResult"; ok: boolean }
  | { type: "reveal" }
  | { type: "restart" };

export function createInitialState(): BriefState {
  const start = getNode("start");
  return {
    messages: [{ id: 0, kind: "ask", text: start.ask ?? "" }],
    queue: [],
    nodeId: "start",
    pendingNodeId: null,
    context: { wantsCampaigns: false },
    answers: [],
    ackCount: 0,
    nextId: 1,
    revealed: 0,
    isSending: false,
  };
}

function withMessage(state: BriefState, message: DraftMessage): BriefState {
  return {
    ...state,
    messages: [...state.messages, { ...message, id: state.nextId } as BriefMessage],
    nextId: state.nextId + 1,
  };
}

/** Programme la salve suivante : messages d'amorce, puis ceux du nœud cible. */
function enqueue(state: BriefState, lead: DraftMessage[], target: BriefTarget): BriefState {
  const nodeId = resolveTarget(target, state.context);
  return {
    ...state,
    queue: [...lead, ...nodeMessages(getNode(nodeId), state.context, state.answers)],
    nodeId: null,
    pendingNodeId: nodeId,
    revealed: 0,
  };
}

/** Enregistre la réponse du visiteur et prépare la réaction enchaînée. */
function respond(state: BriefState, label: string, option?: BriefOption): BriefState {
  if (!state.nodeId) return state;
  const node = getNode(state.nodeId);
  const target = option?.next ?? node.next;
  if (!target) return state;

  let next = withMessage(state, { kind: "user", text: label });
  if (node.key) next = { ...next, answers: [...next.answers, { question: node.key, answer: label }] };
  if (option?.set) next = { ...next, context: { ...next.context, ...option.set } };

  const lead: DraftMessage[] = [];
  const reaction = option?.react ?? node.react;
  if (reaction) {
    lead.push(...reaction.map((text): DraftMessage => ({ kind: "bot", text })));
  } else if (node.ack) {
    lead.push({ kind: "bot", text: briefAcks[next.ackCount % briefAcks.length] });
    next = { ...next, ackCount: next.ackCount + 1 };
  }
  const proof = option?.proof && proofMessage(option.proof);
  if (proof) lead.push(proof);

  return enqueue(next, lead, target);
}

export function briefReducer(state: BriefState, action: BriefAction): BriefState {
  switch (action.type) {
    case "choose":
      return action.option.action === "restart" ? createInitialState() : respond(state, action.option.label, action.option);

    case "startWith":
      return respond(createInitialState(), action.option.label, action.option);

    case "submitText":
      return respond(state, action.text);

    case "contactSubmitted":
      return { ...withMessage(state, { kind: "user", text: action.label }), nodeId: null, isSending: true };

    case "contactResult":
      return enqueue({ ...state, isSending: false }, [], action.ok ? "contactEnvoye" : "contactErreur");

    case "reveal": {
      const [message, ...rest] = state.queue;
      if (!message) return state;
      const next = { ...withMessage(state, message), queue: rest, revealed: state.revealed + 1 };
      return rest.length ? next : { ...next, nodeId: state.pendingNodeId, pendingNodeId: null };
    }

    case "restart":
      return createInitialState();
  }
}
