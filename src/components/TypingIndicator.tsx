import { Bot } from "lucide-react";

const TypingIndicator = () => (
  <div className="flex gap-3 animate-fade-in">
    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center gradient-primary">
      <Bot className="w-4 h-4 text-primary-foreground" />
    </div>
    <div className="gradient-chat-ai rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: "0s" }} />
      <span className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: "0.2s" }} />
      <span className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: "0.4s" }} />
    </div>
  </div>
);

export default TypingIndicator;
