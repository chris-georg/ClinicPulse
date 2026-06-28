import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { supabase } from "../lib/supabase";
import { Users, AlertTriangle, TrendingUp, Activity } from "lucide-react";

type RiskLevel = "low" | "medium" | "high";

type Patient = {
  id: string;
  full_name: string;
  medication: string;
  risk_level: RiskLevel;
  status: string;
  start_date: string;
};

type Stats = {
  total: number;
  active: number;
  atRisk: number;
  retentionRate: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    active: 0,
    atRisk: 0,
    retentionRate: 0,
  });
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [atRiskPatients, setAtRiskPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: clinic } = await supabase
      .from("clinics")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!clinic) {
      setLoading(false);
      return;
    }

    const { data: patients } = await supabase
      .from("patients")
      .select("*")
      .eq("clinic_id", clinic.id)
      .order("created_at", { ascending: false });

    if (!patients) {
      setLoading(false);
      return;
    }

    const total = patients.length;
    const active = patients.filter((p) => p.status === "active").length;
    const atRisk = patients.filter(
      (p) => p.status === "at_risk" || p.status === "dropped_off",
    ).length;
    const retentionRate = total > 0 ? Math.round((active / total) * 100) : 0;

    setStats({ total, active, atRisk, retentionRate });
    setRecentPatients(patients.slice(0, 5));
    setAtRiskPatients(
      patients
        .filter((p) => p.status === "at_risk" || p.status === "dropped_off")
        .slice(0, 5),
    );
    setLoading(false);
  };

  useEffect(() => {
    void (async () => {
      await fetchDashboardData();

      // Listen for real time patient changes
      const channel = supabase
        .channel("patients-changes")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "patients" },
          () => {
            void fetchDashboardData();
          },
        )
        .subscribe();

      return () => {
        void supabase.removeChannel(channel);
      };
    })();
  }, []);

  const statCards = [
    {
      label: "Total Patients",
      value: stats.total,
      icon: Users,
      color: "teal",
      path: "/patients",
    },
    {
      label: "Active Patients",
      value: stats.active,
      icon: Activity,
      color: "emerald",
      path: "/patients?status=active",
    },
    {
      label: "At Risk",
      value: stats.atRisk,
      icon: AlertTriangle,
      color: "amber",
      path: "/patients?status=needs_attention",
    },
    {
      label: "Retention Rate",
      value: `${stats.retentionRate}%`,
      icon: TrendingUp,
      color: "blue",
      path: "/patients",
    },
  ];

  const colorMap: Record<string, string> = {
    teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  const riskColors: Record<RiskLevel, string> = {
    low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    high: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitor your GLP-1 patient retention at a glance
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {statCards.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  onClick={() => navigate(stat.path)}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 hover:border-teal-500/30 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400 text-sm">{stat.label}</span>
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center ${colorMap[stat.color]}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </div>
              );
            })}
          </div>

          {/* Two Column Section */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Recent Patients */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold">Recent Patients</h2>
                <Link
                  to="/patients"
                  className="text-teal-400 text-sm hover:text-teal-300 transition"
                >
                  View all
                </Link>
              </div>

              {recentPatients.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                    <Users className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-slate-400 text-sm">
                    No patients added yet
                  </p>
                  <p className="text-slate-600 text-xs mt-1">
                    Add your first patient to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentPatients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-xs font-bold">
                          {patient.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {patient.full_name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {patient.medication}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${riskColors[patient.risk_level]}`}
                      >
                        {patient.risk_level.charAt(0).toUpperCase() +
                          patient.risk_level.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* At Risk Patients */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold">At Risk Patients</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {atRiskPatients.length} Needs Attention
                </span>
              </div>

              {atRiskPatients.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                    <AlertTriangle className="w-5 h-5 text-slate-500" />
                  </div>
                  <p className="text-slate-400 text-sm">No at-risk patients</p>
                  <p className="text-slate-600 text-xs mt-1">
                    Risk alerts will appear here automatically
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {atRiskPatients.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-red-500 flex items-center justify-center text-xs font-bold">
                          {patient.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {patient.full_name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {patient.medication}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${riskColors[patient.risk_level]}`}
                      >
                        {patient.risk_level.charAt(0).toUpperCase() +
                          patient.risk_level.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
