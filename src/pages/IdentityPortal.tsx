import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuthStore } from "@/features/auth/authStore";

export default function IdentityPortal() {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const { isAuthenticated, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");

  // If already authenticated, just go where they intended
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = redirectUrl;
    }
  }, [isAuthenticated, redirectUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-jp-pearl flex items-center justify-center font-serif text-jp-plum">
        Welcoming you to the JewelPetal Club...
      </div>
    );
  }

  const handleJoinCollective = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the BFF login endpoint
    window.location.href = `/api/auth/login?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen bg-jp-pearl flex flex-col items-center justify-center relative overflow-hidden px-6 selection:bg-jp-rosegold selection:text-jp-pearl">
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] noise-overlay" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-jp-rosegold/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-md w-full space-y-16 relative z-10 text-center">
        {/* Brand Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center bg-jp-blush/20 rounded-full">
            <Sparkles className="w-6 h-6 text-jp-plum" />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl text-jp-plum leading-tight">
            Welcome to the Club
          </h1>
          <p className="font-serif text-lg text-jp-deep/60 italic max-w-sm mx-auto">
            Order your custom gift arrangements and track your deliveries with an account. Enter your email to begin.
          </p>
        </div>

        <form onSubmit={handleJoinCollective} className="space-y-8 max-w-sm mx-auto">
          <div className="space-y-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent border-b border-jp-blush py-3 font-serif text-xl focus:outline-none focus:border-jp-rosegold transition-colors text-center text-jp-deep"
            />
          </div>
          
          <button
            type="submit"
            className="group inline-flex items-center gap-4 font-sans text-xs uppercase tracking-widest text-jp-plum hover:text-jp-rosegold transition-all font-semibold"
          >
            Continue
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform text-jp-rosegold" />
          </button>
        </form>

        <div className="pt-12 border-t border-jp-blush grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs uppercase tracking-widest text-jp-deep/50 font-medium">
          {['Track Orders', 'Custom Curations', 'Member Perks'].map((perk, i) => (
            <span key={i} className="block">
              {perk}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
