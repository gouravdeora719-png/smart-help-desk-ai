import { useNavigate } from "react-router-dom";
import { MessageSquare, LogIn, Info, Bot, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col gradient-hero text-primary-foreground relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 -left-20 w-60 h-60 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10">
        {/* Logo */}
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center shadow-glow mb-6 animate-slide-up">
          <Bot className="w-10 h-10" />
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          👋 Welcome to GD AI
        </h1>
        <p className="font-heading text-lg text-primary-foreground/80 mb-2 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          Your Smart HelpDesk
        </p>
        <p className="text-sm text-primary-foreground/60 max-w-md leading-relaxed mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          GD AI aapka personal AI assistant hai jo aapke sawalon ka jawab Hindi aur English dono me deta hai.
          Bina login ke bhi chat karo ya login karke chat history save karo. 💬✨
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-accent text-secondary-foreground font-heading font-semibold shadow-soft hover:opacity-90 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
            🚀 Start Chat
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-primary-foreground/20 text-primary-foreground/90 font-heading font-medium hover:bg-primary-foreground/5 transition-all"
          >
            <LogIn className="w-4 h-4" />
            🔐 Login / Sign Up
          </button>
          <button
            onClick={() => navigate("/about")}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-primary-foreground/60 font-medium hover:text-primary-foreground/90 transition-all"
          >
            <Info className="w-4 h-4" />
            ℹ️ About GD AI
          </button>
        </div>
      </main>

      {/* Footer tagline */}
      <footer className="text-center py-4 text-xs text-primary-foreground/40 flex items-center justify-center gap-1.5 relative z-10">
        <Sparkles className="w-3 h-3" />
        Your Smart Assistant, Anytime, Anywhere 🌐🤖
      </footer>
    </div>
  );
};

export default Index;
