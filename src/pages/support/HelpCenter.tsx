import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Seo } from "../../components/Seo";
import {
  Search,
  ChevronDown,
  UserPlus,
  Zap,
  Bell,
  CreditCard,
  Settings,
  ShieldCheck,
  MessageCircle,
  MessageCircleQuestion,
} from "lucide-react";
import { Nav, Footer } from "../../components/SiteChrome";

interface Article {
  q: string;
  a: string;
}

interface Category {
  icon: typeof Search;
  title: string;
  desc: string;
  articles: Article[];
}

function HelpCenter() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      icon: UserPlus,
      title: "Getting Started",
      desc: "Setting up your clinic and adding your first patients",
      articles: [
        { q: "How do I create my clinic account?", a: "Go to Register, enter your clinic name and email, and confirm your email address. You'll land in your dashboard immediately — no patients needed to explore the interface." },
        { q: "How do I add my first patient?", a: "From the Patients page, click Add Patient and fill in name, email, phone, medication and start date. ClinicPulse automatically starts the check-in sequence the moment you save." },
        { q: "How long does setup actually take?", a: "Most clinics are fully set up — account, logo, first patient added — in under 5 minutes. There's no integration or technical configuration required to get started." },
        { q: "Do I need to import my existing patient list?", a: "Not required to start. Add patients one at a time as they begin treatment, or reach out to Contact Support if you'd like help bulk-importing an existing list." },
      ],
    },
    {
      icon: Zap,
      title: "Automation & Check-ins",
      desc: "How the automated email sequence and scheduling work",
      articles: [
        { q: "What's the default check-in schedule?", a: "Week 1, Week 2, then Month 1 through Month 6 for active patients on Pro and Clinic+ plans. Starter includes month 1 only." },
        { q: "Can I customize the check-in schedule?", a: "Custom check-in schedules and per-medication templates are available on the Clinic+ plan. Starter and Pro use the standard schedule." },
        { q: "What happens if I delete a patient?", a: "ClinicPulse checks that a patient still exists before sending each scheduled email — once deleted, no further check-ins go out to them." },
        { q: "Do check-ins pause if a patient replies?", a: "No — the schedule keeps running in the background regardless of replies. Replies are read separately by the sentiment engine and layered on top to update risk level." },
      ],
    },
    {
      icon: Bell,
      title: "Risk Detection & Alerts",
      desc: "Understanding risk levels, sentiment, and clinic alerts",
      articles: [
        { q: "How does ClinicPulse decide a patient is 'At Risk'?", a: "A patient moves to At Risk if there's no reply within 3 days of a check-in, or if a reply is flagged neutral or negative by sentiment analysis." },
        { q: "What triggers 'Dropped Off' status?", a: "No response within 7 days of a check-in automatically escalates a patient to Dropped Off, High risk — you'll get an alert the moment this happens." },
        { q: "How accurate is the sentiment analysis?", a: "Every patient reply is read by an AI model trained to classify replies as positive, neutral, or negative. It's a strong signal, not a diagnosis — always use judgment alongside it, especially for clinical concerns." },
        { q: "Where do alerts get sent?", a: "To your clinic's registered email by default. You'll also see a live badge count on the Alerts page and Dashboard the moment a patient is flagged." },
      ],
    },
    {
      icon: CreditCard,
      title: "Billing & Plans",
      desc: "Trials, upgrades, downgrades, and payment questions",
      articles: [
        { q: "What happens after my 14-day free trial?", a: "You'll be prompted to add a payment method to keep your account active. If you don't, your account pauses — your data is kept safe, nothing is deleted." },
        { q: "Can I switch plans later?", a: "Yes, anytime from Settings. Upgrades and downgrades are prorated automatically for the current billing cycle." },
        { q: "Is there a limit on patients for Starter?", a: "Starter is capped at 50 patients. Once you're consistently near that limit, Pro removes the cap entirely and unlocks full-lifecycle automation." },
        { q: "Do you offer refunds?", a: "Reach out via Contact Support with your account email — refund requests are reviewed case by case." },
      ],
    },
    {
      icon: Settings,
      title: "Account & Settings",
      desc: "Clinic profile, branding, and team access",
      articles: [
        { q: "How do I add my clinic logo?", a: "Go to Settings → upload your logo. It appears in your dashboard sidebar and replaces the default clinic-initial avatar automatically." },
        { q: "Can more than one staff member log in?", a: "Multi-staff access (up to 5 team members) is available on the Clinic+ plan. Starter and Pro are single-login accounts." },
        { q: "How do I update my clinic's contact information?", a: "Settings → update phone, address, and website anytime. Your login email is shown but can't be changed from Settings directly — contact support to update it." },
      ],
    },
    {
      icon: ShieldCheck,
      title: "Security & Compliance",
      desc: "Data handling, privacy, and compliance basics",
      articles: [
        { q: "Is patient data encrypted?", a: "Yes — data is encrypted at rest and in transit, with row-level security ensuring your clinic can only ever access its own patients' data." },
        { q: "Is ClinicPulse HIPAA compliant?", a: "ClinicPulse is built with healthcare-grade security practices designed to support HIPAA-conscious workflows. See our HIPAA Notice for full details, and consult your compliance officer for your clinic's specific obligations." },
        { q: "Can I export my data?", a: "Yes, your data is always yours. Contact Support to request a full export of your clinic's patient and check-in records." },
      ],
    },
  ];

  const q = query.trim().toLowerCase();
  const filtered = q
    ? categories
        .map((c) => ({
          ...c,
          articles: c.articles.filter(
            (a) =>
              a.q.toLowerCase().includes(q) || a.a.toLowerCase().includes(q)
          ),
        }))
        .filter((c) => c.articles.length > 0)
    : categories;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
        <Seo
        title="Help Center"
        description="Find answers to your questions about ClinicPulse."
        path="/help-center"
      />
      <Nav />

      {/* Hero + search */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-2xl  font-medium text-teal-300 mb-6">
            <MessageCircleQuestion className="h-9 w-9" />
            Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            How can we <span className="gradient-text">help?</span>
          </h1>
          <p className="mt-4 text-slate-400 text-lg">
            Search our help articles, or browse by category below.
          </p>

          <div className="mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for an answer..."
              className="w-full glass-card rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50 border border-slate-700/60"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {filtered.length === 0 && (
            <div className="glass-card rounded-2xl p-8 text-center text-slate-400">
              No articles match "{query}". Try a different search, or{" "}
              <button
                onClick={() => navigate("/contact-support")}
                className="text-teal-300 hover:underline"
              >
                contact support
              </button>{" "}
              directly.
            </div>
          )}

          {filtered.map((cat) => {
            const Icon = cat.icon;
            const isOpen = openCategory === cat.title || Boolean(q);
            return (
              <div key={cat.title} className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() =>
                    setOpenCategory(openCategory === cat.title ? null : cat.title)
                  }
                  className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">{cat.title}</p>
                    <p className="text-sm text-slate-400">{cat.desc}</p>
                  </div>
                  <span className="text-xs text-slate-500 shrink-0">
                    {cat.articles.length} articles
                  </span>
                  {!q && (
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180 text-teal-300" : ""}`}
                    />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-white/5 divide-y divide-white/5">
                    {cat.articles.map((a) => (
                      <div key={a.q} className="px-6 py-4">
                        <p className="text-sm font-medium text-white">{a.q}</p>
                        <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                          {a.a}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Fallback to human support */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8 text-center">
          <MessageCircle className="h-8 w-8 text-teal-400 mx-auto" />
          <p className="mt-4 text-lg font-semibold text-white">
            Still can't find what you're looking for?
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Our team typically replies within a few hours on Starter and Pro,
            and within 2 hours on Clinic+.
          </p>
          <button
            onClick={() => navigate("/contact-support")}
            className="mt-6 gradient-bg text-slate-950 font-semibold px-6 py-3 rounded-xl hover:scale-[1.01] transition-transform"
          >
            Contact Support
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HelpCenter;