export function TypingIndicator() {
  return (
    <p
      role="status"
      aria-label="A's CHAAM écrit…"
      className="inline-flex gap-1.5 self-start rounded-[18px_18px_18px_6px] border border-line bg-bg px-4 py-3.5"
    >
      {[0, 150, 300].map((delay) => (
        <span key={delay} className="typing-dot" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </p>
  );
}
