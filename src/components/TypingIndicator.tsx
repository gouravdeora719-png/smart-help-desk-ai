const TypingIndicator = () => (
  <div className="flex gap-4 animate-fade-in">
    <div className="inline-block px-5 py-4 rounded-3xl bg-[hsl(var(--chat-surface))] border border-[hsl(var(--chat-border))] flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-[hsl(var(--chat-glow))] animate-typing" style={{ animationDelay: "0s" }} />
      <span className="w-2 h-2 rounded-full bg-[hsl(var(--chat-glow))] animate-typing" style={{ animationDelay: "0.2s" }} />
      <span className="w-2 h-2 rounded-full bg-[hsl(var(--chat-glow))] animate-typing" style={{ animationDelay: "0.4s" }} />
    </div>
  </div>
);

export default TypingIndicator;
