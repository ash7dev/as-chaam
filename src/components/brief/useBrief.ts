"use client";

import { useCallback, useEffect, useReducer } from "react";
import { sendBrief } from "@/actions/contact";
import { buildPlan, getNode, whatsappUrl } from "@/lib/brief";
import type { BriefOption, Goal } from "@/types/brief";
import { briefReducer, createInitialState } from "./briefReducer";

/** Délais de « saisie » : un peu plus long pour le premier message d'une salve. */
const FIRST_MESSAGE_DELAY = 750;
const NEXT_MESSAGE_DELAY = 550;

export interface ContactFields {
  name: string;
  email: string;
  website: string;
}

export function useBrief() {
  const [state, dispatch] = useReducer(briefReducer, undefined, createInitialState);
  const { queue, revealed } = state;

  useEffect(() => {
    if (!queue.length) return;
    const timer = setTimeout(
      () => dispatch({ type: "reveal" }),
      revealed === 0 ? FIRST_MESSAGE_DELAY : NEXT_MESSAGE_DELAY,
    );
    return () => clearTimeout(timer);
  }, [queue, revealed]);

  const choose = useCallback(
    (option: BriefOption) => {
      // Ouvert pendant le clic, sinon le navigateur bloque la fenêtre.
      if (option.action === "whatsapp") {
        window.open(whatsappUrl(state.answers, state.context), "_blank", "noopener,noreferrer");
      }
      dispatch({ type: "choose", option });
    },
    [state.answers, state.context],
  );

  const submitText = useCallback((text: string) => {
    const value = text.trim();
    if (value) dispatch({ type: "submitText", text: value });
  }, []);

  const submitContact = useCallback(
    async (fields: ContactFields) => {
      const name = fields.name.trim();
      const email = fields.email.trim();
      dispatch({ type: "contactSubmitted", label: name ? `${name} · ${email}` : email });
      const ok = await sendBrief({
        ...fields,
        answers: state.answers,
        planTitle: buildPlan(state.context).title,
      })
        .then((result) => result.ok)
        .catch(() => false);
      dispatch({ type: "contactResult", ok });
    },
    [state.answers, state.context],
  );

  const restart = useCallback(() => dispatch({ type: "restart" }), []);

  const startWith = useCallback((goal: Goal) => {
    const option = getNode("start").options?.find((candidate) => candidate.set?.goal === goal);
    if (option) dispatch({ type: "startWith", option });
  }, []);

  return {
    messages: state.messages,
    node: state.nodeId ? getNode(state.nodeId) : null,
    nodeId: state.nodeId,
    isTyping: queue.length > 0 || state.isSending,
    choose,
    submitText,
    submitContact,
    restart,
    startWith,
  };
}
