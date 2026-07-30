import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo, Nav, Footer } from "../components/SiteChrome";
import { Seo } from "../components/Seo";
import {
  Activity,
  AlertTriangle,
  // ArrowRight,
  Bell,
  Brain,
  BrainCircuit,
  Check,
  ChevronDown,
  Clock,
  Mail,
  Play,
  TrendingUp,
  UserPlus,
  X,
  Zap,
} from "lucide-react";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("in-view"),
        ),
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <div
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Seo
        title="ClinicPulse"
        description="The patient retention platform for GLP-1 clinics. Catch dropout before it happens."
        path="/"
      />
      {children}
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative animate-float">
      {/* Background Glow */}
      <div className="absolute -inset-8 rounded-full blur-3xl" />

      {/* Card */}
      <div
        className="relative glass-card rounded-3xl p-5 shadow-2xl glow-brand"
        // style={{
        //     boxShadow: "0 25px 50px rgba(30,217,195,0.20)",
        //   }}
      >
        <div className="flex items-center justify-between mb-4">
          <Logo />

          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400/60" />
            <div className="h-2 w-2 rounded-full bg-amber-400/60" />
            <div className="h-2 w-2 rounded-full bg-emerald-400/60" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: "Total", value: "47" },
            { label: "Active", value: "31" },
            { label: "At Risk", value: "9" },
            { label: "Retention", value: "66%" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-2.5">
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                {s.label}
              </p>

              <p className="text-lg font-bold text-white mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Patients */}
        <div className="space-y-2">
          {[
            {
              i: "S",
              n: "Sarah M.",
              m: "Ozempic",
              s: "Active",
              c: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
              ic: "bg-emerald-500",
            },
            {
              i: "J",
              n: "James K.",
              m: "Wegovy",
              s: "At Risk",
              c: "bg-amber-500/15 text-amber-300 border-amber-500/30",
              ic: "bg-amber-500",
            },
            {
              i: "M",
              n: "Maria L.",
              m: "Mounjaro",
              s: "Dropped Off",
              c: "bg-red-500/15 text-red-300 border-red-500/30",
              ic: "bg-red-500",
            },
          ].map((p) => (
            <div
              key={p.n}
              className="glass-card rounded-xl p-2.5 flex items-center gap-3"
            >
              <div
                className={`h-8 w-8 rounded-full ${p.ic} flex items-center justify-center text-xs font-bold text-slate-950`}
              >
                {p.i}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{p.n}</p>

                <p className="text-[11px] text-slate-400">{p.m}</p>
              </div>

              <span
                className={`text-[10px] font-medium px-2 py-1 rounded-full border ${p.c}`}
              >
                {p.s}
              </span>
            </div>
          ))}
        </div>

        {/* Alert */}
        <div className="mt-3 flex items-center gap-2.5 rounded-xl p-3 bg-amber-500/10 border border-amber-500/25">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />

          <p className="text-xs text-amber-100">
            <span className="font-semibold">James K.</span> hasn't responded in
            4 days
          </p>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-3xl gradient-glow" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full blur-3xl gradient-glow" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full brand-pill text-xs font-medium mb-6">
            <Zap className="h-3.5 w-3.5" />
            AI-Powered Retention for GLP-1 Clinics
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Nearly 1 in 3
            <br />
            GLP-1 Patients
            <br />
            <span className="gradient-text text-6xl">Quit by Month Two</span>
          </h1>
          <p className="mt-6 text-2xl text-slate-200 max-w-lg leading-relaxed font-medium">
            Yours don't have to be one of them.
          </p>
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            ClinicPulse monitors every GLP-1 patient in real time, flags dropout
            risk weeks before it happens, and alerts your team automatically —
            so no patient goes silent without you knowing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/register")}
              className="gradient-button px-6 py-3.5 rounded-xl hover:scale-[1.02] transition-all duration-300"
            >
              Start Free Trial — No Card Required
            </button>
            <a
              href="#how"
              className="border border-white/15 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-center"
            >
              See How It Works →
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-teal-400" />
              14-day free trial
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-teal-400" />
              Setup in 5 minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-teal-400" />
              Cancel anytime
            </span>
          </div>
        </div>
        <div className="relative">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const clinics = [
    {
      name: "Vitality Weight Clinic",
      logo: "/vitality-weight-clinic-logo.png",
    },
    { name: "Everwell Medical Weight Loss", logo: "/Everwell-clinics.png" },
    { name: "NextGen Telehealth", logo: "/nextgen-telehealth.png" },
    { name: "SlimPath Wellness", logo: "/slimpath-wellness.png" },
    { name: "ApexCare Medical", logo: "/apexcare-medical.png" },
    { name: "PrimeCare Medical", logo: "/primecare-medical.png" },
    { name: "Northstar Health", logo: "/Northstar-health.png" },
  ];

  const stats = [
    { v: "47%", l: "Avg dropout rate solved" },
    { v: "2.3x", l: "Retention improvement" },
    { v: "< 5 min", l: "Setup time" },
  ];

  return (
    <section className="py-16 border-y border-white/5 bg-slate-950/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-3">
          Clinic Types We Serve
        </p>
        <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase mb-8">
          Built for the clinics leading the next generation of GLP-1 care
        </p>
      </div>

      {/* Scrolling track */}
      <div className="relative w-full">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #020817, transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #020817, transparent)",
          }}
        />
        <div
          className="flex gap-6 w-max"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[...clinics, ...clinics].map((clinic, i) => (
            <div
              key={i}
              className="w-60 h-28 rounded-2xl overflow-hidden shrink-0 transition-colors"
            >
              <img
                src={clinic.logo}
                alt={`${clinic.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="text-4xl md:text-5xl font-extrabold gradient-text">
                {s.v}
              </p>
              <p className="mt-2 text-sm text-slate-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function Problem() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-red-500/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-xs font-medium text-red-300 mb-6">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            The Silent Revenue Killer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Your Patients Are Disappearing.
            <br />
            <span className="text-slate-400">You Just Don't Know It Yet.</span>
          </h2>
          <div className="mt-6 space-y-4 text-slate-400 leading-relaxed">
            <p>
              The average GLP-1 clinic loses{" "}
              <span className="text-white font-semibold">47% of patients</span>{" "}
              before month 3. Not because the medication doesn't work — but
              because patients feel unsupported, experience side effects alone,
              and quietly stop responding.
            </p>
            <p>
              By the time you notice, they've already cancelled. That's{" "}
              <span className="text-white font-semibold">
                $300–$500 in monthly recurring revenue gone
              </span>
              . Per patient. Silently.
            </p>
            <p>Without a system to catch them, you're running blind.</p>
          </div>
          <ul className="mt-8 space-y-3">
            {[
              "No visibility into which patients are struggling",
              "No automated follow-up when patients go silent",
              "No early warning before a patient drops off",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-lg bg-red-500/15 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="h-3.5 w-3.5 text-red-400" />
                </div>
                <span className="text-slate-300">{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-white">
            Industry data shows comparable clinics losing 40–45%+ of patients
            before a retention system is in place.
          </p>
          <p className="mt-6 text-sm text-slate-500 italic">
            There's a better way to catch this before it happens →
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative">
            <div className="absolute -inset-6 bg-red-500/10 blur-3xl rounded-full" />
            <div className="relative glass-card rounded-2xl p-6 border-red-500/20">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Patient Follow-ups
                  </p>
                  <p className="text-xs text-red-400 mt-0.5">
                    ⚠ 6 patients need attention
                  </p>
                </div>
                <span className="text-xs text-slate-500">Manual tracking</span>
              </div>
              <div className="space-y-2.5">
                {[
                  {
                    n: "Jessica Roberts",
                    m: "Ozempic",
                    d: "47 days ago",
                    risk: true,
                  },
                  {
                    n: "Michael Chen",
                    m: "Wegovy",
                    d: "31 days ago",
                    risk: true,
                  },
                  {
                    n: "Priya Patel",
                    m: "Zepbound",
                    d: "23 days ago",
                    risk: true,
                  },
                  {
                    n: "Daniel Kim",
                    m: "Mounjaro",
                    d: "18 days ago",
                    risk: false,
                  },
                  {
                    n: "Rachel Green",
                    m: "Saxenda",
                    d: "12 days ago",
                    risk: false,
                  },
                  {
                    n: "Marcus Thompson",
                    m: "Ozempic",
                    d: "9 days ago",
                    risk: false,
                  },
                ].map((p) => (
                  <div
                    key={p.n}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 bg-white/[0.02] border border-white/5"
                  >
                    <div>
                      <p className="text-sm text-white font-medium">{p.n}</p>
                      <p className="text-[11px] text-slate-500">{p.m}</p>
                    </div>
                    <p
                      className={`text-xs ${p.risk ? "text-red-400" : "text-amber-400"}`}
                    >
                      Last contact: {p.d}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-red-500 italic text-center">
                This is what dropout looks like — invisibly.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Add Your Patient",
      desc: "When a patient starts their GLP-1 program, add them to ClinicPulse in seconds. Name, email, phone, medication and start date.",
    },
    {
      icon: Zap,
      title: "Automation Takes Over",
      desc: "ClinicPulse automatically sends check-in throughout the first 6 months of treatment — at Week 1, Week 2, and Months 1 through 6. No manual work. No remembering. It just runs.",
    },
    {
      icon: Brain,
      title: "AI Reads Every Reply",
      desc: "When a patient responds, ClinicPulse's AI analyzes the reply, updates their risk level automatically, and stores every response in the patient's profile so your clinic can review the complete communication history anytime.",
    },
    {
      icon: Bell,
      title: "Get Alerted Before It's Too Late",
      desc: "If a patient goes silent for 3+ days or sends a concerning reply, your team gets an immediate alert. You know exactly who to call and why.",
    },
  ];
  return (
    <section id="how" className="py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            How Clinic<span className="gradient-text">Pulse</span> Works
          </h2>
          <p className="mt-4 text-slate-400">
            Set it up once. Let it run forever.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 80}>
                <div className="glass-card rounded-2xl p-6 h-full">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30">
                    <Icon className="h-5 w-5 text-slate-950" />
                  </div>
                  <div className="text-xs text-teal-400 font-semibold mb-2">
                    Step {i + 1}
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  const patients = [
    {
      initial: "S",
      name: "Sarah Mitchell",
      medication: "Ozempic (Semaglutide)",
      status: "Active",
      risk: "Low",
      color: "emerald",
    },
    {
      initial: "J",
      name: "James Kowalski",
      medication: "Wegovy (Semaglutide)",
      status: "At Risk",
      risk: "Medium",
      color: "amber",
    },
    {
      initial: "M",
      name: "Maria Lopez",
      medication: "Mounjaro (Tirzepatide)",
      status: "Dropped Off",
      risk: "High",
      color: "red",
    },
    {
      initial: "D",
      name: "David Chen",
      medication: "Zepbound (Tirzepatide)",
      status: "Active",
      risk: "Low",
      color: "emerald",
    },
    {
      initial: "R",
      name: "Rachel Nguyen",
      medication: "Ozempic (Semaglutide)",
      status: "At Risk",
      risk: "Medium",
      color: "amber",
    },
  ];

  const colors = {
    emerald: {
      avatar: "bg-emerald-500",
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    },
    amber: {
      avatar: "bg-amber-500",
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    },
    red: {
      avatar: "bg-red-500",
      badge: "bg-red-500/10 text-red-300 border-red-500/20",
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <Reveal className="text-center max-w-2xl mx-auto">
          <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-3">
            Live Clinic Dashboard
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Your Entire Patient Panel.
            <br />
            <span className="gradient-text">One Dashboard.</span>
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-14">
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-12">
              {/* Sidebar */}
              <aside className="hidden md:flex md:col-span-3 lg:col-span-2 flex-col justify-between border-r border-white/5 bg-slate-950/40 p-4">
                <div>
                  <Logo />

                  <div className="mt-8 space-y-2">
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl px-3 py-2 text-sm text-teal-300">
                      Dashboard
                    </div>

                    <div className="px-3 py-2 text-sm text-slate-400">
                      Patients
                    </div>

                    <div className="flex justify-between items-center px-3 py-2 text-sm text-slate-400">
                      Alerts
                      <span className="bg-red-500 text-white rounded-full px-2 text-[10px]">
                        9
                      </span>
                    </div>

                    <div className="px-3 py-2 text-sm text-slate-400">
                      Settings
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </aside>

              {/* Main */}
              <div className="md:col-span-9 lg:col-span-10 p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Welcome back 👋</p>

                  <img
                    src="/slimpath-wellness-dash.png"
                    alt="User avatar"
                    className="h-10 w-10 rounded-full object-cover border-2 border-teal-500/40"
                  />
                </div>

                <h3 className="text-2xl font-bold mt-3">Dashboard</h3>

                <p className="text-slate-500 text-sm">
                  Monitor your GLP-1 patient retention at a glance
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {[
                    ["Total Patients", "47"],
                    ["Active Patients", "31"],
                    ["At Risk", "9"],
                    ["Retention Rate", "66%"],
                  ].map(([label, value]) => (
                    <div key={label} className="glass-card rounded-xl p-4">
                      <p className="text-xs text-slate-400">{label}</p>

                      <p className="text-2xl font-bold mt-2">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-3 gap-5 mt-6">
                  {/* Recent Patients */}

                  <div className="lg:col-span-2 glass-card rounded-xl p-4">
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold">Recent Patients</p>

                      <span className="text-sm text-teal-400">View all</span>
                    </div>

                    <div className="space-y-2">
                      {patients.map((p) => {
                        const c = colors[p.color as keyof typeof colors];

                        return (
                          <div
                            key={p.name}
                            className="flex items-center gap-3 rounded-lg p-3 bg-white/[0.03]"
                          >
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-slate-950 ${c.avatar}`}
                            >
                              {p.initial}
                            </div>

                            <div className="flex-1">
                              <p className="text-sm font-medium">{p.name}</p>

                              <p className="text-xs text-slate-500">
                                {p.medication}
                              </p>
                            </div>

                            <span
                              className={`text-xs border rounded-full px-2 py-1 ${c.badge}`}
                            >
                              {p.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* At Risk */}

                  <div className="glass-card rounded-xl p-4">
                    <div className="flex justify-between mb-4">
                      <p className="font-semibold">At Risk Patients</p>

                      <span className="text-[10px] px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        3 Needs Attention
                      </span>
                    </div>

                    <div className="space-y-2">
                      {patients
                        .filter((p) => p.color !== "emerald")
                        .map((p) => {
                          const c = colors[p.color as keyof typeof colors];

                          return (
                            <div
                              key={p.name}
                              className="flex items-center gap-3 rounded-lg p-3 bg-white/[0.03]"
                            >
                              <div
                                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-slate-950 ${c.avatar}`}
                              >
                                {p.initial}
                              </div>

                              <div className="flex-1">
                                <p className="text-xs font-medium">{p.name}</p>
                              </div>

                              <span
                                className={`text-[10px] border rounded-full px-2 py-1 ${c.badge}`}
                              >
                                {p.risk}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      category: "Automation",
      icon: Mail,
      title: "Automated Check-in Sequences",
      desc: "Automatically sends personalized follow-up emails from Week 1 through Month 6 so every patient stays engaged without adding work for your staff.",
      visual: "checkins",
    },
    {
      category: "AI",
      icon: BrainCircuit,
      title: "Know Which Patients Need Help",
      desc: "Every patient reply is analyzed instantly. ClinicPulse's AI detects positive, neutral, or negative sentiment and updates risk levels automatically.",
      visual: "ai",
    },
    {
      category: "Dashboard",
      icon: Activity,
      title: "Real-Time Risk Dashboard",
      desc: "See every patient's status at a glance with live updates, powerful filters, and color-coded risk levels.",
      visual: "dashboard",
    },
    {
      category: "Alerts",
      icon: Bell,
      title: "Instant Clinic Alerts",
      desc: "Receive immediate notifications whenever a patient goes silent or sends a concerning reply, complete with the patient's response.",
      visual: "alerts",
    },
    {
      category: "Patient Profile",
      icon: Clock,
      title: "Complete Patient Timeline",
      desc: "Every check-in, every reply, and every risk change is stored in a clean visual timeline inside each patient's profile.",
      visual: "timeline",
    },
    {
      category: "Analytics",
      icon: TrendingUp,
      title: "Risk History Tracking",
      desc: "Track how patient engagement changes over time and identify trends before dropouts impact your clinic.",
      visual: "history",
    },
  ];

  function FeatureVisual({ type }: { type: string }) {
    if (type === "checkins") {
      const rows = [
        { label: "Week 1", done: true },
        { label: "Week 2", done: true },
        { label: "Month 1", done: true },
        { label: "Month 2", done: false },
        { label: "Month 3", done: false },
      ];
      return (
        <div className="w-full h-full p-5 flex flex-col justify-center gap-2">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center gap-3 rounded-lg px-3 py-2 bg-white/[0.03] border border-white/5"
            >
              <div
                className={`h-4 w-4 rounded-full flex items-center justify-center shrink-0 ${
                  r.done
                    ? "bg-teal-500/20 border border-teal-400"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                {r.done && (
                  <Check
                    className="h-2.5 w-2.5 text-teal-300"
                    strokeWidth={4}
                  />
                )}
              </div>
              <span
                className={`text-xs ${r.done ? "text-slate-300" : "text-slate-500"}`}
              >
                {r.label}
              </span>
              <span
                className={`ml-auto text-[10px] ${r.done ? "text-teal-400" : "text-slate-600"}`}
              >
                {r.done ? "Sent" : "Scheduled"}
              </span>
            </div>
          ))}
        </div>
      );
    }

    if (type === "ai") {
      const replies = [
        {
          text: "Feeling great, no complaints!",
          tag: "Positive",
          c: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
        },
        {
          text: "It's okay, I guess.",
          tag: "Neutral",
          c: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        },
        {
          text: "The nausea is unbearable.",
          tag: "Negative",
          c: "bg-red-500/15 text-red-300 border-red-500/30",
        },
      ];
      return (
        <div className="w-full h-full p-5 flex flex-col justify-center gap-2.5">
          {replies.map((r) => (
            <div
              key={r.text}
              className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 bg-white/[0.03] border border-white/5"
            >
              <p className="text-xs text-slate-300 truncate">"{r.text}"</p>
              <span
                className={`text-[10px] font-medium px-2 py-1 rounded-full border shrink-0 ${r.c}`}
              >
                {r.tag}
              </span>
            </div>
          ))}
        </div>
      );
    }

    if (type === "dashboard") {
      const stats = [
        { label: "Active", value: "31", c: "text-emerald-300" },
        { label: "At Risk", value: "9", c: "text-amber-300" },
        { label: "Dropped", value: "7", c: "text-red-300" },
      ];
      const rows = [
        { n: "Sarah M.", c: "bg-emerald-500" },
        { n: "James K.", c: "bg-amber-500" },
        { n: "Maria L.", c: "bg-red-500" },
      ];
      return (
        <div className="w-full h-full p-5 flex flex-col justify-center gap-3">
          <div className="grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg px-2 py-2.5 bg-white/[0.03] border border-white/5 text-center"
              >
                <p className={`text-lg font-bold ${s.c}`}>{s.value}</p>
                <p className="text-[9px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            {rows.map((r) => (
              <div
                key={r.n}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 bg-white/[0.03] border border-white/5"
              >
                <div className={`h-5 w-5 rounded-full ${r.c} shrink-0`} />
                <span className="text-[11px] text-slate-300">{r.n}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (type === "alerts") {
      return (
        <div className="w-full h-full p-5 flex flex-col justify-center gap-3">
          <div className="flex items-center gap-2.5 rounded-xl p-3 bg-amber-500/10 border border-amber-500/25">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-100">
              <span className="font-semibold">James K.</span> hasn't responded
              in 4 days
            </p>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl p-3 bg-red-500/10 border border-red-500/25">
            <Bell className="h-4 w-4 text-red-400 shrink-0" />
            <p className="text-xs text-red-100">
              <span className="font-semibold">Maria L.</span> sent a concerning
              reply
            </p>
          </div>
        </div>
      );
    }

    if (type === "timeline") {
      const events = [
        { label: "Patient added", time: "Day 0" },
        { label: "Week 1 check-in sent", time: "Day 7" },
        { label: "Patient replied — Positive", time: "Day 8" },
        { label: "Month 1 check-in sent", time: "Day 30" },
      ];
      return (
        <div className="w-full h-full p-5 flex items-center">
          <div className="relative pl-5 space-y-3.5 before:absolute before:left-[3px] before:top-1 before:bottom-1 before:w-px before:bg-white/10 w-full">
            {events.map((e) => (
              <div key={e.label} className="relative">
                <div className="absolute -left-5 top-1 h-1.5 w-1.5 rounded-full bg-teal-400" />
                <p className="text-xs text-slate-300">{e.label}</p>
                <p className="text-[10px] text-slate-600">{e.time}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // history — simple trend bars
    return (
      <div className="w-full h-full flex flex-col overflow-hidden rounded-t-2xl">
        {/* Screenshot Area */}
        <div className="relative flex-1 bg-slate-900 border-b border-white/5">
          <img
            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/data_analyticstrendsmin.jpg"
            alt="Analytics Dashboard"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 text-[10px] text-slate-500 bg-slate-950">
          <span>Last 8 weeks</span>

          <span className="flex items-center gap-2 text-teal-300 font-medium">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Retention trending up
          </span>
        </div>
      </div>
    );
  }

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <Reveal className="max-w-3xl mx-auto text-center mb-20">
          <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-3">
            Everything your clinic needs
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Retain More Patients.
            <br />
            <span className="gradient-text">Without Hiring More Staff.</span>
          </h2>
          <p className="mt-7 text-slate-400 text-lg leading-8 max-w-2xl mx-auto">
            From automated follow-ups to AI-powered dropout detection,
            ClinicPulse was built specifically for modern GLP-1 clinics.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={index * 70}>
                <div className="glass-card rounded-3xl overflow-hidden h-full hover:-translate-y-2 hover:glow-brand hover:border-white/15 transition-all duration-300">
                  {/* Hard-coded UI preview instead of a screenshot */}
                  <div className="relative h-56 overflow-hidden bg-slate-900/60 border-b border-white/5">
                    <FeatureVisual type={feature.visual} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <p className="text-xs uppercase tracking-[0.22em] brand-text font-semibold">
                      {feature.category}
                    </p>
                    <div className="mt-5 w-11 h-11 rounded-xl brand-pill flex items-center justify-center">
                      <Icon className="w-5 h-5 brand-text" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold leading-snug">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-slate-400 leading-7">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      q: "We were losing patients every month and had no idea why. ClinicPulse showed us exactly who was struggling. We recovered 6 patients in the first month alone.",
      n: "Dr. Amanda Rivera",
      i: "A",
    },
    {
      q: "I run a solo telehealth practice. I can't afford to manually follow up with 200 patients. ClinicPulse does it automatically. My retention went from 52% to 78% in 60 days.",
      n: "NP Sarah Chen",
      i: "S",
    },
    {
      q: "The alert system is what sold me. Getting a text the moment a patient goes silent — before they actually quit — is exactly what we needed.",
      n: "Dr. Marcus Webb",
      i: "M",
    },
  ];
  return (
    <section className="py-24 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            What Clinic Owners Are Saying
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, idx) => (
            <Reveal key={t.n} delay={idx * 80}>
              <div className="glass-card rounded-2xl p-7 h-full flex flex-col">
                <div className="flex gap-1 text-teal-300 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-slate-200 leading-relaxed flex-1">"{t.q}"</p>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center text-slate-950 font-bold">
                    {t.i}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.n}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const qs = [
    {
      q: "How long does setup take?",
      a: "Less than 5 minutes. Create your account, add your first patient, and the automated check-in sequence starts immediately. No technical knowledge required.",
    },
    {
      q: "What happens after the free trial?",
      a: "After 14 days you'll be prompted to enter payment details to continue. Your patients and data are saved. If you don't subscribe, your account is paused.",
    },
    {
      q: "Can my patients reply directly to the check-in emails?",
      a: "Yes. Patient replies go directly to your patient's profile. ClinicPulse also reads the reply, detects the sentiment and updates the patient's risk level automatically.",
    },
    {
      q: "Is this HIPAA compliant?",
      a: "ClinicPulse is built with healthcare-grade security practices including encrypted data storage and row-level security. We recommend consulting your compliance officer for your specific requirements.",
    },
    {
      q: "What GLP-1 medications does ClinicPulse support?",
      a: "All of them. Ozempic, Wegovy, Mounjaro, Zepbound, Saxenda, Rybelsus and any other medication you choose to track.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. No contracts, no cancellation fees. Cancel from your dashboard at any time.",
    },
  ];
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <div className="space-y-3">
          {qs.map((item, i) => (
            <Reveal key={item.q} delay={i * 40}>
              <div className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-medium text-white pr-4">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-teal-300" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-slate-400 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl gradient-bg p-12 md:p-20 text-center">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Stop Losing Patients
            <br />
            You Could Have Saved.
          </h2>
          <p className="mt-6 text-lg text-slate-900/80 max-w-2xl mx-auto">
            Join GLP-1 clinics using ClinicPulse to automatically monitor
            patients, detect dropout risk and protect their revenue — without
            adding a single task to their day.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="bg-slate-950 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-900 transition-colors"
            >
              Start Free Trial — No Card Required
            </button>
            <button className="border-2 border-slate-950 text-slate-950 font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-950/10 transition-colors inline-flex items-center justify-center gap-2">
              <Play className="h-4 w-4" fill="currentColor" /> Watch Demo
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-900/70">
            14-day free trial · Setup in 5 minutes · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <HowItWorks />
        <DashboardPreview />
        <Features />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
