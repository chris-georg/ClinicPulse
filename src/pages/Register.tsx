import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function Register() {
  const [clinicName, setClinicName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          clinic_name: clinicName,
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex items-center justify-center px-6">

        <div className="absolute top-0 left-0 w-125 h-125] bg-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-emerald-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center">

            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-emerald-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold mb-3">
              Check Your Email
            </h2>

            <p className="text-slate-400 leading-relaxed">
              We've sent a confirmation link to your email address.
              Click the link to activate your ClinicPulse account.
            </p>

            <a
              href="/login"
              className="inline-block mt-8 px-6 py-3 rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 font-semibold"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-teal-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-emerald-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div className="hidden lg:block">
            <div className="max-w-lg">

              <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm mb-6">
                Join Leading GLP-1 Clinics
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                Every Patient You Keep
                <span className="block text-teal-400">
                  Is Revenue You Earned
                </span>
              </h1>

              <p className="mt-6 text-slate-400 text-lg leading-relaxed">
                Set up automated check-ins, track adherence signals,
                and get alerted the moment a patient shows signs of
                dropping off.
              </p>

              <div className="mt-10 space-y-4">

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-300">
                    Automated SMS Check-In Sequences
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-300">
                    Patient Risk Scoring & Alerts
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-300">
                    Clinic Dashboard with Live Insights
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-300">
                     Per-Clinic Workflow Automation
                  </span>
                </div>

              </div>

              <div className="mt-12 p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-slate-300 text-sm leading-relaxed">
                  "We were losing patients in month 2 and had no system
                  to catch them. ClinicPulse flags at-risk patients before
                  they ghost us completely."
                </p>

                <p className="text-teal-400 text-sm mt-3 font-medium">
                  — GLP-1 Clinic Owner, Texas
                </p>
              </div>

            </div>
          </div>

          {/* Register Card */}
          <div className="w-full max-w-lg mx-auto">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

              <div className="mb-8">
                <h2 className="text-4xl font-bold">
                  Clinic
                  <span className="text-teal-400">
                    Pulse
                  </span>
                </h2>

                <p className="text-slate-400 mt-2">
                  Create your clinic account
                </p>
              </div>

              {error && (
                <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Clinic Name
                  </label>

                  <input
                    type="text"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    placeholder="Wellness Weight Loss Clinic"
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
                    placeholder="Create a secure password"
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
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-teal-400 hover:text-teal-300 font-medium"
                  >
                    Sign In
                  </a>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <p className="text-xs text-slate-500">
                  Secure setup • Encrypted authentication • HIPAA-ready workflow
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}