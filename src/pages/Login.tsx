import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="hidden lg:block">
            <div className="max-w-lg">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm mb-6">
                GLP-1 Patient Retention Platform
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                Stop Losing Patients
                <span className="block text-teal-400">After Month Two</span>
              </h1>

              <p className="mt-6 text-slate-400 text-lg leading-relaxed">
                ClinicPulse automatically monitors your GLP-1 patients, detects
                dropout risk early, and triggers the right follow-up before they
                disappear.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-300">AI-Powered Dropout Risk Detection</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-300">Automated Patient Check-In Sequences</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-300">Real-Time Retention Dashboard</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-300">
                    Medication Adherence Tracking
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <h3 className="text-3xl font-bold">47%</h3>
                  <p className="text-slate-500 text-sm">Avg Patient Dropout</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">2x</h3>
                  <p className="text-slate-500 text-sm">Retention Improvement</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">24/7</h3>
                  <p className="text-slate-500 text-sm">Auto Follow-Up</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-4xl font-bold">
                  Clinic
                  <span className="text-teal-400">Pulse</span>
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
                      focus:ring-2
                      focus:ring-teal-500/20
                      focus:border-teal-500
                      transition
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
                      focus:ring-2
                      focus:ring-teal-500/20
                      focus:border-teal-500
                      transition
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
                    bg-gradient-to-r
                    from-teal-500
                    to-emerald-500
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
                  <a
                    href="/register"
                    className="text-teal-400 hover:text-teal-300 font-medium transition"
                  >
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
