import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  Bell,
  Brain,
  BrainCircuit,
  Check,
  ChevronDown,
  Clock,
  Mail,
  Menu,
  Play,
  TrendingUp,
  UserPlus,
  X,
  Zap,
} from "lucide-react";

function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const s = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const t = size === "sm" ? "text-lg" : "text-xl";
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${s} rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-teal-500/30`}
      >
        <Activity
          className={
            size === "sm" ? "h-4 w-4 text-slate-950" : "h-5 w-5 text-slate-950"
          }
          strokeWidth={2.5}
        />
      </div>
      <span className={`${t} font-bold tracking-tight`}>
        Clinic<span className="gradient-text">Pulse</span>
      </span>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-slate-950/80 border-b border-white/5" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-sm font-semibold gradient-bg text-slate-950 px-4 py-2.5 rounded-xl glow-teal hover:scale-[1.03] transition-transform"
          >
            Start Free Trial
          </button>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-slate-300 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 text-sm text-slate-200 border border-white/10 rounded-xl py-2.5"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex-1 text-sm font-semibold gradient-bg text-slate-950 rounded-xl py-2.5"
            >
              Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

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
      {children}
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative animate-float">
      <div className="absolute -inset-8 bg-teal-500/20 blur-3xl rounded-full" />
      <div className="relative glass-card rounded-3xl p-5 shadow-2xl shadow-teal-500/20">
        <div className="flex items-center justify-between mb-4">
          <Logo size="sm" />
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400/60" />
            <div className="h-2 w-2 rounded-full bg-amber-400/60" />
            <div className="h-2 w-2 rounded-full bg-emerald-400/60" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label: "Total", value: "47" },
            { label: "Active", value: "31" },
            { label: "At Risk", value: "9" },
            { label: "Retention", value: "66%" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-2.5">
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">{s.label}</p>
              <p className="text-lg font-bold text-white mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { i: "S", n: "Sarah M.", m: "Ozempic", s: "Active", c: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", ic: "bg-emerald-500" },
            { i: "J", n: "James K.", m: "Wegovy", s: "At Risk", c: "bg-amber-500/15 text-amber-300 border-amber-500/30", ic: "bg-amber-500" },
            { i: "M", n: "Maria L.", m: "Mounjaro", s: "Dropped Off", c: "bg-red-500/15 text-red-300 border-red-500/30", ic: "bg-red-500" },
          ].map((p) => (
            <div key={p.n} className="glass-card rounded-xl p-2.5 flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full ${p.ic} flex items-center justify-center text-xs font-bold text-slate-950`}>{p.i}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{p.n}</p>
                <p className="text-[11px] text-slate-400">{p.m}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-1 rounded-full border ${p.c}`}>{p.s}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2.5 rounded-xl p-3 bg-amber-500/10 border border-amber-500/25">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <p className="text-xs text-amber-100">
            <span className="font-semibold">James K.</span> hasn't responded in 4 days
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
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-xs font-medium text-teal-300 mb-6">
            <Zap className="h-3.5 w-3.5" />
            Now with AI-powered dropout detection
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Stop Losing<br />
            GLP-1 Patients<br />
            <span className="gradient-text text-6xl">After Month Two</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-lg leading-relaxed">
            ClinicPulse automatically monitors every patient on your GLP-1 program, detects dropout risk before it happens, and alerts your team — so you never lose a patient silently again.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/register")}
              className="gradient-bg text-slate-950 font-semibold px-6 py-3.5 rounded-xl glow-teal hover:scale-[1.02] transition-transform"
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
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-teal-400" />14-day free trial</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-teal-400" />Setup in 5 minutes</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-teal-400" />Cancel anytime</span>
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
  const clinics = ["Vitality Weight Clinic", "NextGen Telehealth", "PrimeCare Medical", "SlimPath Wellness", "NovaMed GLP Center"];
  const stats = [
    { v: "47%", l: "Avg dropout rate solved" },
    { v: "2.3x", l: "Retention improvement" },
    { v: "< 5 min", l: "Setup time" },
  ];
  return (
    <section className="py-16 border-y border-white/5 bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">
          Trusted by GLP-1 Clinics Across the United States
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-slate-500 text-sm">
          {clinics.map((c, i) => (
            <span key={c} className="flex items-center gap-6">
              {c}
              {i < clinics.length - 1 && <span className="text-slate-700">·</span>}
            </span>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="text-4xl md:text-5xl font-extrabold gradient-text">{s.v}</p>
              <p className="mt-2 text-sm text-slate-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
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
            Your Patients Are Disappearing.<br />
            <span className="text-slate-400">You Just Don't Know It Yet.</span>
          </h2>
          <div className="mt-6 space-y-4 text-slate-400 leading-relaxed">
            <p>The average GLP-1 clinic loses <span className="text-white font-semibold">47% of patients</span> before month 3. Not because the medication doesn't work — but because patients feel unsupported, experience side effects alone, and quietly stop responding.</p>
            <p>By the time you notice, they've already cancelled. That's <span className="text-white font-semibold">$300–$500 in monthly recurring revenue gone</span>. Per patient. Silently.</p>
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
        </Reveal>
        <Reveal delay={100}>
          <div className="relative">
            <div className="absolute -inset-6 bg-red-500/10 blur-3xl rounded-full" />
            <div className="relative glass-card rounded-2xl p-6 border-red-500/20">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
                <div>
                  <p className="text-sm font-semibold text-white">Patient Follow-ups</p>
                  <p className="text-xs text-red-400 mt-0.5">⚠ 6 patients need attention</p>
                </div>
                <span className="text-xs text-slate-500">Manual tracking</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { n: "Jessica Roberts", m: "Ozempic", d: "47 days ago", risk: true },
                  { n: "Michael Chen", m: "Wegovy", d: "31 days ago", risk: true },
                  { n: "Priya Patel", m: "Zepbound", d: "23 days ago", risk: true },
                  { n: "Daniel Kim", m: "Mounjaro", d: "18 days ago", risk: false },
                  { n: "Rachel Green", m: "Saxenda", d: "12 days ago", risk: false },
                ].map((p) => (
                  <div key={p.n} className="flex items-center justify-between rounded-lg px-3 py-2.5 bg-white/[0.02] border border-white/5">
                    <div>
                      <p className="text-sm text-white font-medium">{p.n}</p>
                      <p className="text-[11px] text-slate-500">{p.m}</p>
                    </div>
                    <p className={`text-xs ${p.risk ? "text-red-400" : "text-amber-400"}`}>Last contact: {p.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-red-500 italic text-center">This is what dropout looks like — invisibly.</p>
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
      desc: "ClinicPulse automatically sends check-in emails at Week 1, Week 2, Month 1, Month 2 and Month 3. No manual work. No remembering. It just runs.",
    },
    {
      icon: Brain,
      title: "AI Reads Every Reply",
      desc: "When a patient responds, our AI reads the reply and detects whether they're doing well, struggling, or about to quit. Risk levels update automatically.",
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
            How ClinicPulse Works
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

function Features() {
  const features = [
    {
      icon: Mail,
      title: "Automated Check-in Sequences",
      desc: "Scheduled emails go out automatically at Week 1, Week 2, and Months 1–3. Every patient gets consistent follow-up without your staff lifting a finger.",
    },
    {
      icon: BrainCircuit,
      title: "AI Sentiment Detection",
      desc: "Every patient reply is analyzed by AI. Positive, neutral or negative sentiment detected instantly. Risk levels update automatically based on what patients say.",
    },
    {
      icon: Activity,
      title: "Real-Time Risk Dashboard",
      desc: "See every patient's status at a glance. Active, At Risk, Dropped Off. Color-coded. Filterable. Updated in real time without refreshing.",
    },
    {
      icon: Bell,
      title: "Instant Clinic Alerts",
      desc: "The moment a patient goes silent or sends a worrying reply, your clinic receives an email alert with the patient's name, medication and their exact response.",
    },
    {
      icon: Clock,
      title: "Full Patient Timeline",
      desc: "Every check-in sent, every reply received, every risk flag triggered — all logged in a visual timeline on each patient's profile. Full audit trail, always.",
    },
    {
      icon: TrendingUp,
      title: "Risk History Tracking",
      desc: "Track how each patient's risk level has changed over time. Spot patterns. Understand which medications have higher dropout rates in your practice.",
    },
  ];
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything Your Clinic Needs.
            <br />
            <span className="text-slate-400">Nothing You Don't.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 60}>
                <div className="glass-card rounded-2xl p-6 h-full hover:border-teal-500/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-teal-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {f.desc}
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
                  <Logo size="sm" />

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
                        3
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
                    src="https://res.cloudinary.com/duuntbsbf/image/upload/v1778672155/file_000000008b3071f486a27bd0889f20ba_1_pintce.jpg"
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

function Pricing() {
  const [annual, setAnnual] = useState(false);
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Starter",
      monthly: 99,
      annualPrice: 79,
      subtitle: "For solo practitioners just getting started",
      badge: null as { label: string; className: string } | null,
      highlight: false,
      features: [
        "Up to 50 patients",
        "Automated check-ins (Week 1 and Week 2 only)",
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
        "Full check-in sequences (Week 1, 2, Month 1, 2, 3)",
        "AI sentiment analysis on every reply",
        "Full risk scoring (Active / At Risk / Dropped Off)",
        "Real-time dropout risk detection",
        "Instant clinic alerts with patient reply included",
        "Full patient risk history timeline",
        "Color-coded patient dashboard",
        "Clinic profile and logo customization",
        "Priority email support",
        "14-day free trial included",
      ],
    },
    {
      name: "Clinic+",
      monthly: 599,
      annualPrice: 479,
      subtitle: "For established practices with high patient volume and staff",
      badge: { label: "Best for Teams", className: "bg-amber-400 text-slate-950" },
      highlight: false,
      features: [
        "Everything in Pro plus:",
        "Multi-staff access (up to 5 team members)",
        "Custom check-in email templates per medication",
        "Weekly retention report emailed to clinic owner",
        "Patient notes and internal clinic annotations",
        "Dedicated onboarding call with founder",
        "SMS check-ins instead of email (Twilio powered)",
        "Priority support with 4-hour response time",
        "Custom check-in schedule per patient",
        "Early access to all new features",
        "14-day free trial included",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <Reveal className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple Pricing. 
            <span className="gradient-text"> No Surprises.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg">Choose the plan that fits your clinic.</p>
        </Reveal>

        <Reveal delay={80} className="mt-10 flex justify-center">
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
        </Reveal>

        <div className="mt-14 grid md:grid-cols-3 gap-6 md:gap-5 items-stretch">
          {tiers.map((tier, idx) => {
            const price = annual ? tier.annualPrice : tier.monthly;
            const orderClass = tier.highlight ? "order-first md:order-none" : "";
            return (
              <Reveal
                key={tier.name}
                delay={idx * 90}
                className={`${orderClass} ${tier.highlight ? "md:scale-105 md:z-10" : ""}`}
              >
                <div
                  className={`relative rounded-3xl p-8 h-full flex flex-col ${
                    tier.highlight
                      ? "border-2 border-teal-400/70 bg-white/[0.05]"
                      : "glass-card border border-slate-700/60"
                  }`}
                  style={tier.highlight ? { boxShadow: "0 0 40px rgba(20,184,166,0.2)" } : undefined}
                >
                  {tier.badge && (
                    <span
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${tier.badge.className}`}
                    >
                      {tier.badge.label}
                    </span>
                  )}
                  <p className="text-sm text-slate-400">ClinicPulse {tier.name}</p>
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
                    <p className="mt-1 text-xs text-teal-300">billed annually</p>
                  )}
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed min-h-[40px]">
                    {tier.subtitle}
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-teal-300" strokeWidth={3} />
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
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500 leading-relaxed">
          No credit card required to start. Cancel anytime.<br />
          All plans include a 14-day free trial.<br />
          Setup takes less than 5 minutes.
        </p>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      q: "We were losing patients every month and had no idea why. ClinicPulse showed us exactly who was struggling. We recovered 6 patients in the first month alone.",
      n: "Dr. Amanda Rivera",
      t: "Weight Loss MD, Houston TX",
      i: "A",
    },
    {
      q: "I run a solo telehealth practice. I can't afford to manually follow up with 200 patients. ClinicPulse does it automatically. My retention went from 52% to 78% in 60 days.",
      n: "NP Sarah Chen",
      t: "TeleGLP Health",
      i: "S",
    },
    {
      q: "The alert system is what sold me. Getting a text the moment a patient goes silent — before they actually quit — is exactly what we needed.",
      n: "Dr. Marcus Webb",
      t: "PrimeCare Wellness",
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
                    <p className="text-xs text-slate-400">{t.t}</p>
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
      a: "Yes. Patient replies go directly to your clinic email. ClinicPulse also reads the reply, detects the sentiment and updates the patient's risk level automatically.",
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

function Footer() {
  const cols = [
    {
      t: "Product",
      links: ["Features", "Pricing", "How It Works", "FAQ", "Changelog"],
    },
    { t: "Company", links: ["About", "Blog", "Building in Public", "Contact"] },
    {
      t: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "HIPAA Notice",
        "Cookie Policy",
      ],
    },
  ];
  return (
    <footer className="border-t border-white/5 bg-slate-950/60 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
            The patient retention platform for GLP-1 clinics.
          </p>
          <div className="mt-5 flex gap-3">
            {["X", "in", "TT"].map((s) => (
              <a
                key={s}
                href="#"
                className="h-9 w-9 rounded-lg glass-card flex items-center justify-center text-xs text-slate-300 hover:text-teal-300 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <p className="text-sm font-semibold text-white">{c.t}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-3 justify-between text-xs text-slate-500">
        <p>© 2026 ClinicPulse. All rights reserved.</p>
        <p>Built by a solo founder in Nigeria 🇳🇬</p>
      </div>
    </footer>
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
        <Features />
        <DashboardPreview />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
