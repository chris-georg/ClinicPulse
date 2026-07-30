import { useState } from "react";
import { Mail, Clock, MessageSquareText, ArrowRight, ChevronDown, Headset  } from "lucide-react";
import { Nav, Footer } from "../../components/SiteChrome";
import { supabase } from "../../lib/supabase";

function ContactSupport() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    clinic: "",
    topic: "General question",
    topicOther: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topics = [
    "General question",
    "Billing & payments",
    "Technical issue / bug",
    "Feature request",
    "Account access",
    "Something else",
  ];

  const placeholderByTopic: Record<string, string> = {
    "General question": "What can we help you with?",
    "Billing & payments": "Include your clinic name and, if relevant, the invoice date or plan you're on.",
    "Technical issue / bug": "Tell us what page you were on, what you expected, and what happened instead.",
    "Feature request": "Describe the workflow you're trying to solve — the more specific, the better.",
    "Account access": "Let us know what you're seeing (e.g. can't log in, missing data) and your clinic email.",
    "Something else": "Tell us what's going on.",
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const { error: insertError } = await supabase.from("support_requests").insert({
    name: form.name,
    email: form.email,
    clinic_name: form.clinic || null,
    topic: form.topic,
    topic_other: form.topic === "Something else" ? form.topicOther : null,
    message: form.message,
  });

  setLoading(false);

  if (insertError) {
    setError("Something went wrong sending your message. Please try again or email us directly.");
    return;
  }

  setSubmitted(true);
};

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Nav />

      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/25 text-2xl font-medium text-teal-300 mb-6">
            <Headset className="h-9 w-9" />
            Contact Support
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Talk to a <span className="gradient-text">real person.</span>
          </h1>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            No bots, no ticket mazes. Send us a message and we'll get back to
            you directly.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Left: trust info */}
          <div className="md:col-span-2 space-y-4">
            <div className="glass-card rounded-2xl p-6">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                <Mail className="h-5 w-5 text-teal-400" />
              </div>
              <p className="font-semibold text-white">Email us directly</p>
             <a
                href="mailto:support@clinicpulse.cc.cd"
                className="mt-1.5 block text-sm text-teal-300 hover:underline"
              >
                support@clinicpulse.cc.cd
              </a>
              <p className="mt-2 text-xs text-slate-500">
                Prefer email? This goes to the same inbox as the form.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                <Clock className="h-5 w-5 text-teal-400" />
              </div>
              <p className="font-semibold text-white">Response times</p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-400">
                <li>Starter — within 1 business day</li>
                <li>Pro — priority email, same day</li>
                <li>Clinic+ — 2-hour priority support</li>
              </ul>
            </div>
            <a
              href="/help-center"
              className="flex items-center justify-between glass-card rounded-2xl p-6 hover:border-teal-500/30 border border-transparent transition-colors group"
            >
              <div>
                <p className="font-semibold text-white flex items-center gap-2">
                  <MessageSquareText className="h-4 w-4 text-teal-400" />
                  Check the Help Center first
                </p>
                <p className="mt-1.5 text-sm text-slate-400">
                  Common questions on billing, automation, and risk detection
                  are answered instantly.
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-teal-300 transition-colors shrink-0 ml-3" />
            </a>
          </div>

          {/* Right: form */}
          <div className="md:col-span-3">
            <div className="glass-card rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="h-14 w-14 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center mx-auto">
                    <Mail className="h-6 w-6 text-teal-300" />
                  </div>
                  <p className="mt-5 text-xl font-semibold text-white">
                    Message sent
                  </p>
                  <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
                    We've got your message and will get back to you at{" "}
                    <span className="text-slate-300">{form.email}</span> soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-slate-300 font-medium">
                        Your name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="mt-2 w-full bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
                        placeholder="Dr. Amanda Rivera"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 font-medium">
                        Email address
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="mt-2 w-full bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
                        placeholder="you@yourclinic.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 font-medium">
                      Clinic name
                    </label>
                    <input
                      value={form.clinic}
                      onChange={(e) =>
                        setForm({ ...form, clinic: e.target.value })
                      }
                      className="mt-2 w-full bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
                      placeholder="Everwell Medical Weight Loss"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 font-medium">
                      What's this about?
                    </label>
                    <div className="relative mt-2">
                        <select
                            value={form.topic}
                            onChange={(e) =>
                            setForm({ ...form, topic: e.target.value })
                            }
                            className="w-full appearance-none bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 pr-10 text-sm text-white outline-none focus:border-teal-400/50"
                        >
                            {topics.map((t) => (
                            <option key={t} value={t} className="bg-slate-900">
                                {t}
                            </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                        </div>
                  </div>

                  {form.topic === "Something else" && (
                        <div>
                            <label className="text-sm text-slate-300 font-medium">
                            What's it about?
                            </label>
                            <input
                            required
                            value={form.topicOther}
                            onChange={(e) =>
                                setForm({ ...form, topicOther: e.target.value })
                            }
                            className="mt-2 w-full bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
                            placeholder="Briefly describe the topic"
                            />
                        </div>
                    )}

                  <div>
                    <label className="text-sm text-slate-300 font-medium">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="mt-2 w-full bg-white/[0.03] border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50 resize-none"
                      placeholder={placeholderByTopic[form.topic]}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400 -mt-1">{error}</p>
                    )}
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full gradient-bg text-slate-950 font-semibold py-3.5 rounded-xl hover:scale-[1.01] transition-transform disabled:opacity-60 disabled:hover:scale-100"
                    >
                    {loading ? "Sending..." : "Send Message"}
                    </button>

                  {/* <button
                    type="submit"
                    className="w-full gradient-bg text-slate-950 font-semibold py-3.5 rounded-xl hover:scale-[1.01] transition-transform"
                  >
                    Send Message
                  </button> */}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactSupport;