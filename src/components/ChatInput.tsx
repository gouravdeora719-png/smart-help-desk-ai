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
    <div className="flex items-end gap-2 p-4 border-t border-border bg-card">
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
        className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none ring-ring focus:ring-2 transition-all placeholder:text-muted-foreground disabled:opacity-50"
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !input.trim()}
        className="flex-shrink-0 w-11 h-11 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ChatInput;
