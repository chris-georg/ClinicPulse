import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Back to Home Button */}
      <div className="max-w-7xl mx-auto px-6 pt-8 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <div className="h-10 w-10 flex items-center justify-center group-hover:border-teal-500/30 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back to Home</span>
        </button>
      </div>

      {/* Premium Background Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-teal-500/8 blur-[140px] pointer-events-none" />
      <div className="absolute -left-48 top-1/3 w-[420px] h-[420px] rounded-full bg-cyan-500/6 blur-[120px] pointer-events-none" />
      <div className="absolute -right-48 bottom-0 w-[420px] h-[420px] rounded-full bg-indigo-500/6 blur-[120px] pointer-events-none" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="hidden lg:block">
            <div className="max-w-lg">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm mb-6">
                Welcome Back
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                Continue Delivering
                <span className="block gradient-text">
                  Better Patient Retention
                </span>
              </h1>

              <p className="mt-6 text-slate-400 text-lg leading-relaxed">
                Sign in to access your ClinicPulse dashboard, monitor patient
                engagement, identify at-risk patients, and keep every treatment
                journey moving forward.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-300">
                    ✔ Secure Authentication
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-300">✔ Encrypted Sessions</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-300">
                    ✔ Trusted by Modern Clinics
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-lg mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-4xl font-bold">
                  Clinic
                  <span className="gradient-text">Pulse</span>
                </h2>

                <p className="text-slate-400 mt-2">
                  Sign in to access your clinic dashboard
                </p>
              </div>

              {error && (
                <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="clinic@example.com"
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      bg-slate-900/70
                      border
                      border-slate-700
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:border-teal-500
                      focus:ring-2
                      focus:ring-teal-500/20
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="
                      w-full
                      px-4
                      py-3
                      rounded-xl
                      bg-slate-900/70
                      border
                      border-slate-700
                      text-white
                      placeholder:text-slate-500
                      focus:outline-none
                      focus:border-teal-500
                      focus:ring-2
                      focus:ring-teal-500/20
                    "
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    py-3
                    rounded-xl
                    font-semibold
                    bg-linear-to-r
                    gradient-button
                    hover:scale-[1.02]
                    hover:shadow-lg
                    hover:shadow-teal-500/20
                    transition-all
                    duration-300
                    disabled:opacity-50
                    disabled:hover:scale-100
                  "
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  Don't have an account?{" "}
                  <a href="/register" className="gradient-text font-medium">
                    Register your clinic
                  </a>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-xs text-slate-500">
                  Protected by enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
