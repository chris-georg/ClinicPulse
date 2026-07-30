import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Minus, CircleDollarSign  } from "lucide-react";
import { Nav, Footer } from "../components/SiteChrome";
import { Seo } from "../components/Seo";

function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Starter",
      monthly: 199,
      annualPrice: 179,
      subtitle: "For solo practitioners just getting started",
      badge: null as { label: string; className: string } | null,
      highlight: false,
      features: [
        "Up to 50 patients",
        "Automated check-ins during each patient's first month",
        "Basic patient engagement tracking",
        "Basic risk flagging (Active / Dropped Off)",
        "Email alerts when patient goes silent",
        "Patient list dashboard",
        "Basic patient profile",
        "Email support",
        "14-day free trial included",
      ],
    },
    {
      name: "Pro",
      monthly: 299,
      annualPrice: 239,
      subtitle: "For growing GLP-1 clinics managing 50–300 patients",
      badge: { label: "Most Popular", className: "gradient-bg text-slate-950" },
      highlight: true,
      features: [
        "Everything in Starter plus:",
        "Unlimited patients",
        "Continuous automated check-ins for every active patient",
        "AI sentiment analysis on every reply",
        "Full risk scoring (Active / At Risk / Dropped Off)",
        "Real-time dropout risk detection",
        "Instant clinic alerts with patient replies",
        "Complete patient communication history",
        "Color-coded patient dashboard",
        "Clinic branding (logo & profile)",
        "Priority email support",
        "14-day free trial included",
      ],
    },
    {
      name: "Clinic+",
      monthly: 599,
      annualPrice: 479,
      subtitle: "For established practices with high patient volume and staff",
      badge: {
        label: "Best for Teams",
        className: "bg-amber-400 text-slate-950",
      },
      highlight: false,
      features: [
        "Everything in Pro plus:",
        "Multi-staff access (up to 5 team members)",
        "SMS check-ins (Twilio)",
        "Custom check-in templates per medication",
        "Weekly retention report",
        "Patient notes and internal clinic annotations",
        "Dedicated onboarding call with founder",
        "Custom check-in schedules",
        "4-hour priority support",
        "Early access to all new features",
        "14-day free trial included",
        "SMS features available after trial",
      ],
    },
  ];

  const comparisonRows: {
    label: string;
    starter: string | boolean;
    pro: string | boolean;
    clinicPlus: string | boolean;
  }[] = [
    {
      label: "Patients",
      starter: "Up to 50",
      pro: "Unlimited",
      clinicPlus: "Unlimited",
    },
    {
      label: "Automated check-ins",
      starter: "Month 1 only",
      pro: "Full lifecycle",
      clinicPlus: "Full lifecycle",
    },
    {
      label: "AI sentiment analysis",
      starter: false,
      pro: true,
      clinicPlus: true,
    },
    {
      label: "Risk scoring levels",
      starter: "2 levels",
      pro: "3 levels",
      clinicPlus: "3 levels",
    },
    { label: "SMS check-ins", starter: false, pro: false, clinicPlus: true },
    {
      label: "Custom templates per medication",
      starter: false,
      pro: false,
      clinicPlus: true,
    },
    { label: "Team members", starter: "1", pro: "1", clinicPlus: "Up to 5" },
    {
      label: "Weekly retention reports",
      starter: false,
      pro: false,
      clinicPlus: true,
    },
    { label: "Clinic branding", starter: false, pro: true, clinicPlus: true },
    {
      label: "Support",
      starter: "Email",
      pro: "Priority email",
      clinicPlus: "4-hour priority",
    },
    { label: "Onboarding call", starter: false, pro: false, clinicPlus: true },
  ];

  const faqs = [
    {
      q: "What happens after my 14-day free trial?",
      a: "You'll be asked to add a payment method to continue. If you don't, your account pauses (your data stays safe) until you're ready to subscribe.",
    },
    {
      q: "Can I switch plans later?",
      a: "Yes — upgrade or downgrade anytime from your Settings page. Changes are prorated automatically.",
    },
    {
      q: "Do you charge per patient or a flat rate?",
      a: "Flat monthly rate per tier. Starter caps at 50 patients; Pro and Clinic+ are unlimited.",
    },
    {
      q: "Is SMS included, or an add-on?",
      a: "SMS check-ins are included in Clinic+ after your trial ends. Starter and Pro use email check-ins only.",
    },
    {
      q: "Is there a contract or can I cancel anytime?",
      a: "No contracts. Cancel anytime from Settings — you won't be billed for the next cycle.",
    },
    {
      q: "Do you offer a discount for annual billing?",
      a: "Yes — annual billing saves 20% compared to paying monthly, across all three tiers.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Seo
              title="Pricing"
              description="Simple, transparent pricing for clinics of all sizes."
              path="/pricing"
            />
      <Nav />

      {/* Page header */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-400 mb-5">
            <CircleDollarSign className="w-3.5 h-3.5" />
            <span>SIMPLE, TRANSPARENT PRICING</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple Pricing.
            <span className="gradient-text"> No Surprises.</span>
          </h1>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            Choose the plan that fits your clinic. Every plan starts with a
            14-day free trial — no credit card required.
          </p>
        </div>
      </section>

      {/* Toggle */}
      <div className="flex justify-center px-6">
        <div className="glass-card inline-flex items-center gap-1 p-1 rounded-full">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${!annual ? "gradient-bg text-slate-950" : "text-slate-300 hover:text-white"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${annual ? "gradient-bg text-slate-950" : "text-slate-300 hover:text-white"}`}
          >
            Annual <span className="opacity-80">(Save 20%)</span>
          </button>
        </div>
      </div>

      {/* Tier cards */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-5 items-stretch">
          {tiers.map((tier) => {
            const price = annual ? tier.annualPrice : tier.monthly;
            const orderClass = tier.highlight
              ? "order-first md:order-none"
              : "";
            return (
              <div
                key={tier.name}
                className={`${orderClass} ${tier.highlight ? "md:scale-105 md:z-10" : ""}`}
              >
                <div
                  className={`relative rounded-3xl p-8 h-full flex flex-col ${
                    tier.highlight
                      ? "border-2 border-teal-400/70 bg-white/[0.05]"
                      : "glass-card border border-slate-700/60"
                  }`}
                  style={
                    tier.highlight
                      ? { boxShadow: "0 0 40px rgba(20,184,166,0.2)" }
                      : undefined
                  }
                >
                  {tier.badge && (
                    <span
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${tier.badge.className}`}
                    >
                      {tier.badge.label}
                    </span>
                  )}
                  <p className="text-sm text-slate-400">
                    ClinicPulse {tier.name}
                  </p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span
                      key={price}
                      className="text-5xl font-extrabold animate-fade-up"
                    >
                      ${price}
                    </span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  {annual && (
                    <p className="mt-1 text-xs text-teal-300">
                      billed annually
                    </p>
                  )}
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed min-h-[40px]">
                    {tier.subtitle}
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check
                            className="h-3 w-3 text-teal-300"
                            strokeWidth={3}
                          />
                        </div>
                        <span className="text-[14px] text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate("/register")}
                    className={`mt-8 w-full font-semibold py-3.5 rounded-xl transition-transform hover:scale-[1.01] ${
                      tier.highlight
                        ? "gradient-bg text-slate-950 glow-teal"
                        : "border border-teal-400/60 text-teal-200 hover:bg-teal-400/10"
                    }`}
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500 leading-relaxed">
          No credit card required to start. Cancel anytime.
          <br />
          All plans include a 14-day free trial. Setup takes less than 5
          minutes.
        </p>
      </section>

      {/* Feature comparison table */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight">
            Compare every feature
          </h2>
          <p className="mt-3 text-slate-400 text-center">
            A closer look at what's included in each plan.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 sticky top-0 bg-slate-950">
                  <th className="text-left py-4 px-3 text-sm font-medium text-slate-400">
                    Feature
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-white">
                    Starter
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-teal-300">
                    Pro
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-semibold text-white">
                    Clinic+
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                  >
                    <td className="py-3.5 px-3 text-sm text-slate-300">
                      {row.label}
                    </td>
                    {[row.starter, row.pro, row.clinicPlus].map((val, idx) => (
                      <td key={idx} className="py-3.5 px-3 text-center">
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check
                              className="h-4 w-4 text-teal-400 mx-auto"
                              strokeWidth={3}
                            />
                          ) : (
                            <Minus className="h-4 w-4 text-slate-600 mx-auto" />
                          )
                        ) : (
                          <span className="text-sm text-slate-300">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust / guarantee strip */}
      <section className="py-14 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 text-center">
          <p className="text-lg text-white font-semibold">
            Every plan is backed by a 14-day free trial.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            No setup fees. No credit card required upfront. Cancel anytime —
            your data is always yours to export.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center tracking-tight">
            Pricing questions
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((item, i) => (
              <div
                key={item.q}
                className="glass-card rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">
                    {item.q}
                  </span>
                  <span className="text-slate-400 text-lg">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Not sure which plan fits?
          </h2>
          <p className="mt-3 text-slate-400">
            Start with a free trial on any plan — you can always change tiers
            later.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="mt-6 gradient-bg text-slate-950 font-semibold px-8 py-3.5 rounded-xl glow-teal hover:scale-[1.01] transition-transform"
          >
            Start Free Trial
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PricingPage;
