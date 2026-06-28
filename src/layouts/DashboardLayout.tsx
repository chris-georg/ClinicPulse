import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { supabase } from "../lib/supabase"
import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  LogOut,
  Menu,
  Activity,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Patients", icon: Users, path: "/patients" },
  { label: "Alerts", icon: Bell, path: "/alerts", showBadge: true },
  { label: "Settings", icon: Settings, path: "/settings" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [clinicName, setClinicName] = useState("C")
  const navigate = useNavigate()
  const location = useLocation()
  const [alertCount, setAlertCount] = useState(0)

  const fetchClinicProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: clinic } = await supabase
      .from("clinics")
      .select("id, clinic_name, logo_url")
      .eq("user_id", user.id)
      .single()

    if (clinic) {
      setLogoUrl(clinic.logo_url || null)
      setClinicName(clinic.clinic_name || "C")

      // Fetch alert count
      const { count } = await supabase
        .from("patients")
        .select("*", { count: "exact", head: true })
        .eq("clinic_id", clinic.id)
        .in("status", ["at_risk", "dropped_off"])

      setAlertCount(count || 0)
    }
  }

  useEffect(() => {
  void (async () => {
    await fetchClinicProfile()
  })()
}, [location.pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/10
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:flex lg:flex-col
      `}>

        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">
              Clinic<span className="text-teal-400">Pulse</span>
            </span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path)
                  setSidebarOpen(false)
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive
                    ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {item.showBadge && alertCount > 0 && (
                  <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-red-500 text-white font-medium">
                    {alertCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:block">
            <p className="text-slate-400 text-sm">Welcome back 👋</p>
          </div>

          {/* Avatar */}
          <button
            onClick={() => navigate("/settings")}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/10 hover:border-teal-500/50 transition"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Clinic Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-sm font-bold">
                {clinicName.charAt(0).toUpperCase()}
              </div>
            )}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto animate-fadeIn">
          {children}
        </main>

      </div>
    </div>
  )
}