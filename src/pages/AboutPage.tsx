import { useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, MessageSquare, Sparkles, GraduationCap, Building2, Hospital, Landmark } from "lucide-react";

const features = [
  { icon: MessageSquare, title: "Bilingual Support", desc: "Hindi, English aur Hinglish — sab samajhta hai!" },
  { icon: Sparkles, title: "Smart AI", desc: "Beginner se advanced level tak ke questions handle karta hai." },
  { icon: Globe, title: "Anytime, Anywhere", desc: "24/7 available — kabhi bhi, kahin bhi poochho." },
];

const useCases = [
  { icon: GraduationCap, label: "Colleges" },
  { icon: Building2, label: "Companies" },
  { icon: Hospital, label: "Hospitals" },
  { icon: Landmark, label: "Government" },
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-semibold">About GD AI</h1>
      </header>

      <main className="max-w-2xl mx-auto p-6 space-y-10 animate-slide-up">
        <section className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-heading text-2xl font-bold">GD AI – Smart HelpDesk</h2>
          <p className="text-muted-foreground leading-relaxed">
            GD AI ek intelligent AI Chatbot platform hai jo aapke questions ko Hindi + English me samajh kar instant, accurate aur polite answers deta hai. 🤖
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-heading font-semibold text-lg">Features</h3>
          <div className="grid gap-4">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 p-4 rounded-xl bg-card border border-border shadow-soft">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-sm">{f.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-heading font-semibold text-lg">Use Cases</h3>
          <div className="grid grid-cols-2 gap-3">
            {useCases.map((u) => (
              <div key={u.label} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <u.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{u.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center text-sm text-muted-foreground pb-8">
          Made with ❤️ by GD AI Team
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
