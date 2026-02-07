import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bot, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({ title: "Account created! 🎉", description: "Please check your email to verify." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back! 👋" });
        navigate("/chat");
      }
    } catch (err: any) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
        <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-heading font-semibold">
          {isSignUp ? "Create Account" : "Login to GD AI"}
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6 animate-slide-up">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <Bot className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="font-heading text-xl font-bold">
              🔐 {isSignUp ? "Sign Up" : "Login"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isSignUp
                ? "Account bana kar personalized experience paao."
                : "Login karke apni chat history aur feedback access karo."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm outline-none ring-ring focus:ring-2 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm outline-none ring-ring focus:ring-2 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-primary-foreground font-heading font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="text-center space-y-3">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
            <div>
              <button
                onClick={() => navigate("/chat")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                👉 Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
