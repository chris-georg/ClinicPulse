import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../layouts/DashboardLayout"
import { supabase } from "../lib/supabase"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

type Alert = {
  id: string
  full_name: string
  medication: string
  risk_level: string
  status: string
  last_checkin: string | null
  created_at: string
}

type FilterType = "all" | "at_risk" | "dropped_off"

const alertConfig: Record<
  string,
  {
    label: string
    color: string
    icon: LucideIcon
    message: string
  }
> = {
  dropped_off: {
    label: "Dropped Off",
    color: "border-red-500/20 bg-red-500/5",
    icon: XCircle,
    message: "This patient has not responded in over 7 days and may have dropped off treatment.",
  },
  at_risk: {
    label: "At Risk",
    color: "border-amber-500/20 bg-amber-500/5",
    icon: AlertTriangle,
    message: "This patient has not responded in over 3 days and needs follow-up.",
  },
}

const tabs: { label: string; value: FilterType }[] = [
  { label: "All Alerts", value: "all" },
  { label: "At Risk", value: "at_risk" },
  { label: "Dropped Off", value: "dropped_off" },
]

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>("all")
  const navigate = useNavigate()
  


  const fetchAlerts = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: clinic } = await supabase
      .from("clinics")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (!clinic) {
      setLoading(false)
      return
    }

    const { data: patients } = await supabase
      .from("patients")
      .select("*")
      .eq("clinic_id", clinic.id)
      .in("status", ["at_risk", "dropped_off"])
      .order("created_at", { ascending: false })

    setAlerts(patients || [])
    setLoading(false)
  }
    
    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchAlerts()

    // Real time updates
    const channel = supabase
      .channel("alerts-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "patients" },
        () => { void fetchAlerts() }
      )
      .subscribe()

    return () => { void supabase.removeChannel(channel) }
  }, [])

  const filtered = alerts.filter((a) =>
    filter === "all" ? true : a.status === filter
  )

  const droppedCount = alerts.filter((a) => a.status === "dropped_off").length
  const atRiskCount = alerts.filter((a) => a.status === "at_risk").length

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Alerts</h1>
          <p className="text-slate-400 text-sm mt-1">
            Patients that need your immediate attention
          </p>
        </div>

        {/* Summary badges */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {atRiskCount} At Risk
          </span>
          <span className="px-3 py-1.5 rounded-xl text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
            {droppedCount} Dropped Off
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
  {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              filter === tab.value
                ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                : "text-slate-400 hover:text-white bg-white/5 border border-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-white font-semibold">All clear</p>
          <p className="text-slate-400 text-sm mt-1">
            No patients need attention right now
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((alert) => {
            const config = alertConfig[alert.status]
            const Icon = config?.icon || AlertTriangle

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border ${config?.color} flex items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-4">

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    alert.status === "dropped_off"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{alert.full_name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        alert.status === "dropped_off"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        {config?.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{alert.medication}</p>
                    <p className="text-xs text-slate-500 mt-1">{config?.message}</p>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => navigate(`/patients/${alert.id}`)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:text-white hover:bg-white/10 transition shrink-0"
                >
                  View Patient
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })}
        </div>
      )}

    </DashboardLayout>
  )
}