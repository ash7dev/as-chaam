import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/Label";
import type { BriefMessage } from "@/types/brief";

const botBubble = "max-w-[86%] self-start rounded-[18px_18px_18px_6px] border bg-bg px-4 py-3";

export function BriefMessageItem({ message }: { message: BriefMessage }) {
  switch (message.kind) {
    case "bot":
      return <p className={`${botBubble} border-line text-[15px] leading-normal`}>{message.text}</p>;

    case "ask":
      return (
        <p className={`${botBubble} border-line-strong font-display text-[19px] leading-snug tracking-[-0.01em]`}>
          {message.text}
        </p>
      );

    case "user":
      return (
        <p className="ml-auto max-w-[80%] rounded-[18px_18px_6px_18px] bg-text px-4 py-2.5 text-[15px] font-medium leading-normal text-bg">
          {message.text}
        </p>
      );

    case "proof":
      return (
        <Link
          href={message.href}
          className="group flex w-[86%] max-w-md items-center gap-3 rounded-inner border border-line bg-bg p-2 transition-colors hover:border-line-strong"
        >
          <span aria-hidden="true" className="bg-dots size-13 shrink-0 rounded-[10px] border border-line bg-surface" />
          <span className="flex flex-1 flex-col gap-1">
            <span className="font-display text-[19px] leading-tight">{message.name}</span>
            <Label className="text-[10px]">{message.meta}</Label>
          </span>
          <ArrowUpRightIcon className="text-muted transition-colors group-hover:text-accent" />
        </Link>
      );

    case "plan":
      return (
        <div className="flex w-full flex-col gap-3.5 rounded-card border border-line-strong bg-bg p-5">
          <Label className="text-[10px] text-accent">Votre plan</Label>
          <p className="font-display text-2xl leading-tight tracking-[-0.02em]">{message.plan.title}</p>
          <ol>
            {message.plan.steps.map((step, index) => (
              <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 border-t border-line py-2.5 text-sm">
                <span className="pt-0.5 font-mono text-[11px] text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-muted">Projet comparable : {message.plan.proof}</p>
        </div>
      );

    case "whatsapp":
      return (
        <div className="ml-auto flex w-[88%] flex-col gap-2 rounded-[18px_18px_6px_18px] border border-dashed border-line-strong p-4">
          <Label className="text-[10px]">Message pré-rédigé</Label>
          <p className="text-sm">Bonjour A&apos;s CHAAM, voici mon projet :</p>
          <ul className="flex flex-col gap-1 font-mono text-xs leading-normal">
            {message.answers.map(({ question, answer }) => (
              <li key={question}>
                <span className="text-muted">{question} :</span> {answer}
              </li>
            ))}
            <li>
              <span className="text-muted">Plan :</span> {message.planTitle}
            </li>
          </ul>
        </div>
      );
  }
}
