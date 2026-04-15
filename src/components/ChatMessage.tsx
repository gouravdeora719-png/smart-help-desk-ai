import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isAI = role === "assistant";

  return (
    <div className={`flex gap-4 animate-slide-up ${isAI ? "" : "justify-end"}`}>
      <div className={`max-w-[85%] space-y-1 ${isAI ? "" : ""}`}>
        {isAI ? (
          <div className="inline-block px-5 py-4 rounded-3xl bg-[hsl(var(--chat-surface))] border border-[hsl(var(--chat-border))] text-[hsl(var(--chat-text))] leading-relaxed shadow-[0_0_40px_-15px_hsl(var(--chat-glow)/0.05)]">
            <div className="chat-markdown text-sm leading-relaxed">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="px-5 py-4 rounded-3xl bg-[hsl(var(--chat-moss))]/20 border border-[hsl(var(--chat-moss))]/40 text-[hsl(var(--chat-text))] leading-relaxed">
            <p className="text-sm leading-relaxed text-pretty">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
