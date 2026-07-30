import { CheckCircle2, Clock, ExternalLink, Activity } from "lucide-react";
import { Nav, Footer } from "../../components/SiteChrome";

function SystemStatus() {
  const components = [
    {
      name: "Web App & Dashboard",
      desc: "Login, patient management, dashboard, alerts",
      status: "operational" as const,
    },
    {
      name: "Patient Check-in Automation",
      desc: "Scheduled email sequences (n8n)",
      status: "operational" as const,
    },
    {
      name: "Email Delivery",
      desc: "Check-in emails and clinic alert notifications",
      status: "operational" as const,
    },
    {
      name: "Database & Storage",
      desc: "Patient records, check-in history (Supabase)",
      status: "operational" as const,
    },
  ];

  const statusStyles = {
    operational: {
      dot: "bg-emerald-500",
      text: "text-emerald-300",
      label: "Operational",
    },
    degraded: {
      dot: "bg-amber-500",
      text: "text-amber-300",
      label: "Degraded",
    },
    down: {
      dot: "bg-red-500",
      text: "text-red-300",
      label: "Down",
    },
  };

  const allOperational = components.every((c) => c.status === "operational");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Nav />

      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/25 text-2xl font-medium text-teal-300 mb-6">
            <Activity className="h-9 w-9" />
            System Status
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            ClinicPulse System Status
          </h1>
        </div>
      </section>

      <section className="pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className={`glass-card rounded-2xl p-6 flex items-center gap-4 border ${
              allOperational ? "border-emerald-500/20" : "border-amber-500/20"
            }`}
          >
            <CheckCircle2
              className={`h-8 w-8 shrink-0 ${allOperational ? "text-emerald-400" : "text-amber-400"}`}
            />
            <div>
              <p className="font-semibold text-white">
                {allOperational
                  ? "All Systems Operational"
                  : "Some Systems Affected"}
              </p>
              <p className="text-sm text-slate-400 mt-0.5">
                Last checked manually on July 26, 2026
              </p>
            </div>
          </div>

          <div className="mt-4 glass-card rounded-xl px-5 py-4 flex items-start gap-3">
            <Clock className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              This page is currently updated manually rather than by
              automated monitoring. We're working toward real-time,
              self-updating status reporting — until then, if something
              feels off on your end, please{" "}
              <a href="/contact-support" className="text-teal-300 hover:underline">
                contact support
              </a>{" "}
              directly rather than relying solely on this page.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">
            Components
          </p>
          <div className="glass-card rounded-2xl divide-y divide-white/5 overflow-hidden">
            {components.map((c) => {
              const s = statusStyles[c.status];
              return (
                <div
                  key={c.name}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{c.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{c.desc}</p>
                  </div>
                  <span className={`flex items-center gap-2 text-xs font-medium ${s.text}`}>
                    <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Past incidents
            </p>
            <p className="text-xs text-slate-500 mt-1">
              No incidents have been recorded yet.
            </p>
          </div>
          <a
            href="/contact-support"
            className="flex items-center gap-1.5 text-xs text-teal-300 hover:underline shrink-0"
          >
            Report an issue
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SystemStatus;