import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isAI = role === "assistant";

  return (
    <div className={`flex gap-3 animate-slide-up ${isAI ? "" : "flex-row-reverse"}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isAI ? "gradient-primary" : "bg-secondary"
        }`}
      >
        {isAI ? (
          <Bot className="w-4 h-4 text-primary-foreground" />
        ) : (
          <User className="w-4 h-4 text-secondary-foreground" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isAI
            ? "gradient-chat-ai text-foreground rounded-tl-sm"
            : "gradient-primary text-primary-foreground rounded-tr-sm"
        }`}
      >
        {isAI ? (
          <div className="chat-markdown text-sm leading-relaxed">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
