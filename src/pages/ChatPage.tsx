import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Sparkles } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import { streamChat, type ChatMessage as Msg } from "@/lib/streamChat";
import { toast } from "@/hooks/use-toast";

const INITIAL_MESSAGE: Msg = {
  role: "assistant",
  content:
    "Namaste 🙏 / Hello 👋\nMain **GD AI** hoon, aapka smart AI assistant.\nAap apna sawal Hindi ya English me pooch sakte ho — main poori koshish karunga aapko sahi aur simple jawab dene ki 😊\n\n💡 **Ask me anything!**",
};

const SUGGESTIONS = [
  "What is AI?",
  "Admission process kya hai?",
  "Resume kaise banaye?",
  "Python kya hai?",
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  const send = async (input: string) => {
    const userMsg: Msg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    let assistantSoFar = "";
    const historyForAPI = newMessages.filter((m) => m !== INITIAL_MESSAGE);

    try {
      await streamChat({
        messages: historyForAPI,
        onDelta: (chunk) => {
          assistantSoFar += chunk;
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && last !== INITIAL_MESSAGE) {
              return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
            }
            return [...prev, { role: "assistant", content: assistantSoFar }];
          });
        },
        onDone: () => setIsLoading(false),
        onError: (err) => {
          setIsLoading(false);
          toast({ variant: "destructive", title: "Error", description: err });
        },
      });
    } catch {
      setIsLoading(false);
      toast({ variant: "destructive", title: "Connection Error", description: "Could not reach GD AI." });
    }
  };

  const showSuggestions = messages.length === 1;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card shadow-soft">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h1 className="font-heading font-semibold text-sm">GD AI – Smart HelpDesk</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
            Online
          </p>
        </div>
        <Sparkles className="w-5 h-5 text-secondary" />
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && !messages[messages.length - 1]?.content && <TypingIndicator />}

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pt-2 animate-fade-in">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-accent transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={send} disabled={isLoading} />
    </div>
  );
};

export default ChatPage;
