"use client";

import { useEffect, useRef } from "react";
import { RestartIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import { BriefMessageItem } from "./BriefMessageItem";
import { useBriefContext } from "./BriefProvider";
import { BriefReplies } from "./BriefReplies";
import { TypingIndicator } from "./TypingIndicator";

/** En-tête, fil de la conversation et réponses proposées. */
export function BriefPanel() {
  const { messages, node, nodeId, isTyping, choose, submitText, submitContact, restart } = useBriefContext();
  const threadRef = useRef<HTMLDivElement>(null);
  const repliesRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);

  // Suit la conversation dans le fil, sans faire défiler la page.
  useEffect(() => {
    const thread = threadRef.current;
    thread?.scrollTo({ top: thread.scrollHeight, behavior: "smooth" });
  }, [messages.length, isTyping]);

  // Au clavier, le focus revient sur les nouvelles réponses proposées.
  useEffect(() => {
    if (!nodeId || !hasInteracted.current) return;
    repliesRef.current?.querySelector<HTMLElement>("button, input")?.focus({ preventScroll: true });
  }, [nodeId]);

  const interact =
    <T,>(handler: (value: T) => void) =>
    (value: T) => {
      hasInteracted.current = true;
      handler(value);
    };

  return (
    <>
      <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-pill border border-line-strong font-display text-lg font-light italic text-accent"
          >
            A
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[15px] font-semibold leading-none">A&apos;s CHAAM</span>
            <Label className="text-[10px]">Votre plan à la fin</Label>
          </div>
        </div>
        <button
          type="button"
          onClick={restart}
          aria-label="Recommencer le brief"
          className="grid size-11 place-items-center rounded-pill border border-line text-muted transition-colors hover:text-text"
        >
          <RestartIcon />
        </button>
      </header>

      <div ref={threadRef} role="log" aria-live="polite" className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-5 py-5">
        {messages.map((message) => (
          <BriefMessageItem key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div ref={repliesRef} className="flex flex-col justify-end gap-3 border-t border-line px-5 pt-3 pb-4">
        {node && (
          <BriefReplies
            node={node}
            onChoose={interact(choose)}
            onText={interact(submitText)}
            onContact={interact(submitContact)}
          />
        )}
        <Label className="self-center text-[10px]">Brief guidé · je vous réponds en personne</Label>
      </div>
    </>
  );
}
