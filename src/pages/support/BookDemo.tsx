import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Check, ArrowRight } from "lucide-react";
import { Nav, Footer } from "../../components/SiteChrome";
import { supabase } from "../../lib/supabase";

function BookDemo() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "schedule">("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    clinic: "",
    patientVolume: "Under 50 patients",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const volumes = [
    "Under 50 patients",
    "50–150 patients",
    "150–300 patients",
    "300+ patients",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase.from("demo_requests").insert({
      name: form.name,
      email: form.email,
      clinic_name: form.clinic || null,
      patient_volume: form.patientVolume,
    });

    setLoading(false);

    if (insertError) {
      setError("Something went wrong submitting your request. Please try again or email us directly.");
      return;
    }

    setStep("schedule");
  };

  const calendlyUrl = `https://calendly.com/hello-nexusflow/30min?month=2026-07&name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}`;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Nav />

      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-xs font-medium text-teal-300 mb-6">
            <Calendar className="h-3.5 w-3.5" />
            Book a Demo
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            See ClinicPulse working
            <br />
            <span className="gradient-text">with your patients.</span>
          </h1>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            A 15-minute walkthrough of your actual dashboard, using your
            clinic's real workflow — not a generic slide deck.
          </p>

          {/* Step indicator */}
          <div className="mt-8 flex items-center justify-center gap-3 text-xs">
            <span className={`flex items-center gap-1.5 ${step === "form" ? "text-teal-300" : "text-slate-500"}`}>
              <span className={`h-5 w-5 rounded-full flex items-center justify-center ${step === "form" ? "bg-teal-500/20 border border-teal-400" : "bg-white/5 border border-white/10"}`}>
                {step === "schedule" ? <Check className="h-3 w-3" strokeWidth={3} /> : "1"}
              </span>
              A few quick details
            </span>
            <div className="w-8 h-px bg-white/10" />
            <span className={`flex items-center gap-1.5 ${step === "schedule" ? "text-teal-300" : "text-slate-500"}`}>
              <span className={`h-5 w-5 rounded-full flex items-center justify-center ${step === "schedule" ? "bg-teal-500/20 border border-teal-400" : "bg-white/5 border border-white/10"}`}>
                2
              </span>
              Pick a time
            </span>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        {step === "form" ? (
          <div className="max-w-md mx-auto space-y-4">
            <div className="glass-card rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm text-slate-300 font-medium">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 w-full bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
                    placeholder="Dr. Amanda Rivera"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 font-medium">Work email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 w-full bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
                    placeholder="you@yourclinic.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 font-medium">Clinic name</label>
                  <input
                    value={form.clinic}
                    onChange={(e) => setForm({ ...form, clinic: e.target.value })}
                    className="mt-2 w-full bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
                    placeholder="Everwell Medical Weight Loss"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-300 font-medium">
                    Roughly how many patients do you manage?
                  </label>
                  <select
                    value={form.patientVolume}
                    onChange={(e) => setForm({ ...form, patientVolume: e.target.value })}
                    className="mt-2 w-full bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-teal-400/50"
                  >
                    {volumes.map((v) => (
                      <option key={v} value={v} className="bg-slate-900">{v}</option>
                    ))}
                  </select>
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-bg text-slate-950 font-semibold py-3.5 rounded-xl hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:hover:scale-100"
                >
                  {loading ? "Submitting..." : "Continue to Scheduling"}
                </button>
              </form>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <p className="text-sm font-semibold text-white mb-3">What to expect</p>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                  15 minutes, no slide deck — just your dashboard
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
                  No pressure, no hard sell
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate("/register")}
              className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-white/10 hover:border-teal-500/30 transition-colors group"
            >
              <span className="text-sm text-slate-300">Prefer to just try it yourself?</span>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-teal-300 transition-colors shrink-0 ml-3" />
            </button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-sm text-slate-400 mb-4">
              Thanks, {form.name.split(" ")[0]} — pick whatever time works
              for you below. Your details are already filled in.
            </p>
            <div className="glass-card rounded-2xl overflow-hidden min-h-[560px]">
              <iframe
                src={calendlyUrl}
                className="w-full h-full min-h-[560px]"
                frameBorder={0}
              />
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default BookDemo;