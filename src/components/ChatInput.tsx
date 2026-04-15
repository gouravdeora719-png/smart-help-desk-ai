import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <div className="p-4 shrink-0">
      <div className="relative group">
        <div className="absolute -inset-1 bg-[hsl(var(--chat-glow))]/5 rounded-[2.5rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-end gap-2 p-2 rounded-[2.5rem] bg-[hsl(var(--chat-surface))] border border-[hsl(var(--chat-border))] shadow-2xl focus-within:border-[hsl(var(--chat-glow))]/30 transition-all">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Apna sawal yahan likho... 💬"
            rows={1}
            disabled={disabled}
            className="flex-1 resize-none bg-transparent border-none outline-none px-4 py-3 text-sm text-[hsl(var(--chat-text))] placeholder:text-[hsl(var(--chat-text-dim))] disabled:opacity-50"
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
            className="shrink-0 size-11 rounded-full bg-gradient-to-br from-[hsl(var(--chat-glow))] to-[hsl(var(--chat-moss))] flex items-center justify-center transition-opacity disabled:opacity-30 hover:opacity-90"
          >
            <Send className="w-4 h-4 text-[hsl(var(--chat-bg))]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
