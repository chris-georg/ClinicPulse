import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Footer } from "../components/SiteChrome";
import { Seo } from "../components/Seo";
import {
  ArrowRight,
  Clock,
  TrendingDown,
  AlertTriangle,
  MessageSquare,
  Activity,
  ShieldAlert,
  Mail,
  ListChecks,
  BookOpen,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Table of contents — order here drives both the sticky nav and scroll-spy
// ---------------------------------------------------------------------------
const SECTIONS = [
  { id: "why-patients-quit", label: "Why patients actually quit" },
  { id: "retention-timeline", label: "The drop-off timeline" },
  { id: "five-levers", label: "5 levers that change the outcome" },
  { id: "checkin-cadence", label: "A check-in cadence that works" },
  { id: "red-flags", label: "Red flags to automate around" },
  { id: "next-steps", label: "Putting it into practice" },
];

export default function PatientRetentionGuide() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
//   const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
        <Seo
         title="The Complete Patient Retention Guide for GLP-1 Clinics"
         description="Why GLP-1 patients quit, when the drop-off actually happens, and the check-in cadence that keeps patients past month 3."
         path="/patient-retention-guide"
        />
        <Nav />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative grid-pattern border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-400 mb-5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>PATIENT RETENTION GUIDE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
            Why GLP-1 patients quit —{" "}
            <span className="gradient-text">
              and the 12-week window that decides it
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mb-8">
            Most independent clinics lose patients quietly. No complaint, no
            cancellation call — just a missed refill and a phone number that
            stops answering. This guide breaks down when patients actually drop
            off, why, and the specific interventions that keep them on treatment
            long enough to see results.
          </p>
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />9 min read
            </span>
            <span className="hidden sm:inline">•</span>
            <span>For clinic owners &amp; care coordinators</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Body: TOC + content                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[220px_1fr] gap-12">
        {/* Sticky TOC — desktop only */}
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              On this page
            </p>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block text-sm py-1.5 border-l-2 pl-3 transition-colors ${
                  activeId === s.id
                    ? "border-teal-400 text-teal-400 font-medium"
                    : "border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 space-y-20">
          {/* ---------------- Why patients quit ---------------- */}
          <section id="why-patients-quit" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-5">
              Why patients actually quit
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Cost gets blamed first, and it's real — insurance denials, expired
              manufacturer coupons, and rising out-of-pocket prices are the
              single biggest driver of discontinuation. But cost alone doesn't
              explain why patients who can afford treatment still disappear.
              Three other reasons show up just as often, and they're the ones a
              clinic can actually do something about:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  icon: TrendingDown,
                  title: "Cost & coverage",
                  body: "Insurance denial, a coupon that runs out, or a price that quietly becomes unaffordable.",
                },
                {
                  icon: Activity,
                  title: "Side effects, unmanaged",
                  body: "Nausea or GI symptoms during dose titration, with no one to ask whether it's normal.",
                },
                {
                  icon: MessageSquare,
                  title: "Silence, not dissatisfaction",
                  body: "No complaint at all — just no check-in, so the patient assumes no one's tracking it.",
                },
                {
                  icon: AlertTriangle,
                  title: "A stalled scale",
                  body: "A plateau with no context reads as failure, even when it's a normal part of the curve.",
                },
              ].map((item) => (
                <div key={item.title} className="glass-card rounded-xl p-5">
                  <item.icon className="w-5 h-5 text-teal-400 mb-3" />
                  <h3 className="font-semibold text-sm mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              A 2025 Cleveland Clinic study of patients who discontinued
              semaglutide or tirzepatide for obesity found financial reasons
              behind roughly 48% of departures — leaving over half explained by
              side effects, lack of perceived progress, and other factors a
              clinic's own follow-up can influence.{" "}
              <span className="text-slate-600">(Obesity, Nov. 2025)</span>
            </p>
          </section>

          {/* ---------------- Retention timeline ---------------- */}
          <section id="retention-timeline" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-5">The drop-off timeline</h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Retention isn't a slow, even leak — it happens in bursts, tied to
              specific moments in treatment. Independent research on real-world
              GLP-1 use points to the same pattern again and again:
            </p>
            <div className="space-y-0 mb-6">
              {[
                {
                  week: "Weeks 1–4",
                  stat: "30%+ drop out",
                  detail:
                    "during initial dose titration, when side effects peak and the patient has the least context for what's normal.",
                },
                {
                  week: "Month 3",
                  stat: "The steepest decline flattens",
                  detail:
                    "here. This is the window most independent clinics have no formal process for — after onboarding, before the next scheduled visit.",
                },
                {
                  week: "12 months",
                  stat: "37%–81% have discontinued",
                  detail:
                    "depending on insurance status and how the study defines a lapse — with non-diabetic weight-loss patients consistently churning faster than diabetes patients on the same drug.",
                },
              ].map((row, i) => (
                <div key={row.week} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full gradient-bg mt-1.5 shrink-0" />
                    {i < 2 && <div className="w-px flex-1 bg-white/10 my-1" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-xs font-semibold text-teal-400 uppercase tracking-wide mb-1">
                      {row.week}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="font-semibold text-white">
                        {row.stat}
                      </span>{" "}
                      {row.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sources: <em>JAMA Network Open</em> (2025), <em>AJMC</em> / EASD
              2025 (Denmark, n=77,310), BCBS Health Index issue brief on GLP-1
              persistence.
            </p>
          </section>

          {/* ---------------- 5 levers ---------------- */}
          <section id="five-levers" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-5">
              5 levers that change the outcome
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              None of these require more staff time. They require the follow-up
              to happen on a schedule instead of when someone remembers to do
              it.
            </p>
            <div className="space-y-5">
              {[
                {
                  title: "Check in before the patient has to reach out",
                  body: "A short message at week 1, week 2, and each subsequent month catches side-effect concerns while they're still answerable — instead of after the patient has already decided to quit quietly.",
                },
                {
                  title: "Read tone, not just attendance",
                  body: 'A patient who replies "fine" to every check-in is not the same as one who stops replying at all. Distinguishing a flat response from silence is what separates a real early-warning signal from a simple appointment reminder.',
                },
                {
                  title: "Set a no-response clock, and act on it",
                  body: "Three days of silence and seven days of silence mean different things. Treating them differently — a gentle nudge at three, a direct outreach at seven — catches the patient before the gap becomes permanent.",
                },
                {
                  title: "Normalize the plateau, in writing",
                  body: "Patients who understand that a stall in week 6 is expected are far less likely to interpret it as the treatment failing. This is a templated message, not a phone call — but it has to actually get sent.",
                },
                {
                  title: "Make the flag visible to a human, fast",
                  body: "Automation should surface the at-risk patient to a staff member the same day, not bury it in a shared inbox. The intervention that saves a patient is still a human one — the system's job is making sure it happens in time.",
                },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-sm font-semibold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- Check-in cadence ---------------- */}
          <section id="checkin-cadence" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-5">
              A check-in cadence that works
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              You don't need a different cadence for every patient. A fixed
              schedule, applied consistently, outperforms an ad-hoc one —
              because it removes the dependency on staff remembering to follow
              up.
            </p>
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-500">
                    <th className="px-5 py-3 font-medium">Touchpoint</th>
                    <th className="px-5 py-3 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    [
                      "Week 1",
                      "Confirm the first dose landed okay and normalize early side effects.",
                    ],
                    [
                      "Week 2",
                      "Catch titration issues before the next scheduled visit.",
                    ],
                    [
                      "Month 1",
                      "Ask about progress in the patient's own words, not just the scale.",
                    ],
                    [
                      "Month 2",
                      "Reinforce adherence through the most common plateau window.",
                    ],
                    [
                      "Month 3",
                      "The retention checkpoint most clinics skip — and where the biggest cohort is lost.",
                    ],
                  ].map(([week, purpose]) => (
                    <tr key={week}>
                      <td className="px-5 py-3.5 font-medium text-slate-200 whitespace-nowrap">
                        {week}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mt-4">
              This is the exact cadence ClinicPulse automates out of the box —
              each check-in sends on schedule and stops immediately if a patient
              leaves the program.
            </p>
          </section>

          {/* ---------------- Red flags ---------------- */}
          <section id="red-flags" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-5">
              Red flags to automate around
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Whether or not you use software to track this, the same four
              triggers are worth watching for every patient, every week:
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "No reply after 3 days",
                  tag: "Flag as at-risk",
                  tone: "amber",
                },
                {
                  label: "No reply after 7 days",
                  tag: "Escalate to staff outreach",
                  tone: "red",
                },
                {
                  label: "Negative sentiment in a reply",
                  tag: "Route to a human same-day",
                  tone: "red",
                },
                {
                  label: "Neutral or flat replies, repeated",
                  tag: "Watch — don't ignore",
                  tone: "amber",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="glass-card rounded-lg px-5 py-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert
                      className={`w-4 h-4 shrink-0 ${
                        row.tone === "red" ? "text-red-400" : "text-amber-400"
                      }`}
                    />
                    <span className="text-sm text-slate-300">{row.label}</span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                      row.tone === "red"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {row.tag}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- Next steps / CTA ---------------- */}
          <section id="next-steps" className="scroll-mt-24">
            <h2 className="text-2xl font-bold mb-5">
              Putting it into practice
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              A cadence and a set of red flags only help if someone consistently
              acts on them. Most independent clinics don't lose patients because
              they don't care — they lose patients because tracking 40, 80, or
              200 of them by memory and a spreadsheet doesn't scale.
            </p>
            <div className="glass-card glow-teal rounded-2xl p-8 sm:p-10 text-center">
              <ListChecks className="w-8 h-8 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">
                Get the check-in templates and red-flag rules, ready to use
              </h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                We'll send the message templates for each touchpoint above, plus
                the exact escalation rules — free, no credit card.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="you@clinic.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2.5 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/30"
                  />
                </div>
                <button
                  type="submit"
                  className="gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  Send it to me
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-xs text-slate-600 mt-4">
                Prefer to see it running automatically?{" "}
                <Link to="/register" className="text-teal-400 hover:underline">
                  Start a free ClinicPulse trial
                </Link>
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Related resources                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-lg font-semibold mb-6">More from Resources</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                to: "/resources/case-studies",
                title: "Case Studies",
                body: "How independent clinics are using retention data day to day.",
              },
              {
                to: "/resources/blog",
                title: "Blog",
                body: "Notes on running a cash-pay GLP-1 practice.",
              },
              {
                to: "/resources/building-in-public",
                title: "Building in Public",
                body: "Follow ClinicPulse being built, in the open.",
              },
            ].map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="glass-card rounded-xl p-5 hover:border-teal-400/30 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">{r.title}</h3>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {r.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

       <Footer />
    </div>
  );
}
