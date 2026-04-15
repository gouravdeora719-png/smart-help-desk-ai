import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
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
    <div className="flex flex-col h-screen bg-[hsl(var(--chat-bg))] text-[hsl(var(--chat-text))]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--chat-border))] bg-[hsl(var(--chat-bg))]/80 backdrop-blur-xl">
        <div className="flex items-center gap-4 px-5 h-16">
          <button
            onClick={() => navigate("/")}
            className="size-10 flex items-center justify-center rounded-full bg-[hsl(var(--chat-surface))] border border-[hsl(var(--chat-border))] hover:border-[hsl(var(--chat-glow))]/40 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[hsl(var(--chat-text-dim))]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-10 rounded-2xl bg-gradient-to-br from-[hsl(var(--chat-moss))] to-[hsl(var(--chat-surface))] flex items-center justify-center border border-[hsl(var(--chat-border))]">
                <div className="size-5 rounded-full bg-[hsl(var(--chat-glow))] blur-[8px] opacity-40 animate-pulse" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-[hsl(var(--chat-glow))] border-2 border-[hsl(var(--chat-bg))]" />
            </div>
            <div>
              <h1 className="text-sm font-heading font-semibold tracking-tight text-[hsl(var(--chat-text))]">GD AI – Smart HelpDesk</h1>
              <p className="text-[11px] uppercase tracking-widest text-[hsl(var(--chat-glow))]/70 font-medium">Online</p>
            </div>
          </div>
          <div className="flex-1" />
          <Sparkles className="w-5 h-5 text-[hsl(var(--chat-glow))]/60" />
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto chat-scroll p-5 space-y-6">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {isLoading && !messages[messages.length - 1]?.content && <TypingIndicator />}

        {showSuggestions && (
          <div className="flex flex-wrap gap-3 pt-4 animate-fade-in">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="shrink-0 px-4 py-2 rounded-full border border-[hsl(var(--chat-border))] bg-[hsl(var(--chat-surface))]/50 text-[hsl(var(--chat-text-dim))] text-xs font-medium hover:border-[hsl(var(--chat-glow))]/50 hover:text-[hsl(var(--chat-glow))] transition-all"
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
