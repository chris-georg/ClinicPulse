import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { supabase } from "../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";
import { triggerPatientCheckin } from "../lib/n8n";
import {
  Users,
  Plus,
  Search,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
} from "lucide-react";

type Patient = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  medication: string;
  start_date: string;
  risk_level: string;
  status: string;
  created_at: string;
};

type RiskLevel = "low" | "medium" | "high";

const medications = [
  "Ozempic (Semaglutide)",
  "Wegovy (Semaglutide)",
  "Mounjaro (Tirzepatide)",
  "Zepbound (Tirzepatide)",
  "Saxenda (Liraglutide)",
  "Rybelsus (Oral Semaglutide)",
  "Other",
];

const riskColors: Record<string, string> = {
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  high: "bg-red-500/10 text-red-400 border-red-500/20",
};

const riskIcons: Record<string, LucideIcon> = {
  low: CheckCircle,
  medium: Clock,
  high: AlertTriangle,
};

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusFilter = params.get("status");
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    medication: "",
    start_date: "",
  });

  const fetchClinicAndPatients = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: clinic } = await supabase
      .from("clinics")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (clinic) {
      setClinicId(clinic.id);
      const { data: patients } = await supabase
        .from("patients")
        .select("*")
        .eq("clinic_id", clinic.id)
        .order("created_at", { ascending: false });

      setPatients(
        (patients || []).map((p) => ({
          ...p,
          risk_level: p.risk_level?.trim(),
          status: p.status?.trim(),
        })),
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    void (async () => {
      await fetchClinicAndPatients();
    })();
  }, []);

  const handleDeletePatient = async () => {
    if (!deleteTargetId) return;
    setDeleting(true);

    // Remove from UI instantly
    setPatients((prev) => prev.filter((p) => p.id !== deleteTargetId));
    setDeleteTargetId(null);
    setDeleting(false);

    // Delete in background
    await supabase.from("patients").delete().eq("id", deleteTargetId);
  };

  const handleStatusChange = async (patientId: string, newStatus: string) => {
    const riskMap: Record<string, string> = {
      active: "low",
      at_risk: "medium",
      dropped_off: "high",
    };

    const newRiskLevel = riskMap[newStatus] || "low";

    await supabase
      .from("patients")
      .update({ status: newStatus, risk_level: newRiskLevel })
      .eq("id", patientId);

    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? { ...p, status: newStatus, risk_level: newRiskLevel }
          : p,
      ),
    );
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    let activeClinicId = clinicId;

    if (!activeClinicId) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data: newClinic, error: clinicError } = await supabase
        .from("clinics")
        .insert({
          user_id: user?.id,
          clinic_name: user?.user_metadata?.clinic_name || "My Clinic",
          email: user?.email,
        })
        .select()
        .single();

      if (clinicError) {
        setError("Failed to set up clinic. Please try again.");
        setSaving(false);
        return;
      }

      activeClinicId = newClinic.id;
      setClinicId(newClinic.id);
    }

    const { data: newPatient, error: patientError } = await supabase
      .from("patients")
      .insert({
        ...form,
        clinic_id: activeClinicId,
        risk_level: "low",
        status: "active",
      })
      .select()
      .single();

    if (patientError) {
      setError(patientError.message);
      setSaving(false);
      return;
    }

    // Update local state instantly — no refetch needed
    setPatients((prev) => [
      {
        ...newPatient,
        risk_level: newPatient.risk_level?.trim(),
        status: newPatient.status?.trim(),
      },
      ...prev,
    ]);

    // Trigger n8n check-in workflow for this patient
    const { data: clinic } = await supabase
      .from("clinics")
      .select("clinic_name")
      .eq("id", activeClinicId)
      .single();

    setForm({
      full_name: "",
      email: "",
      phone: "",
      medication: "",
      start_date: "",
    });
    setShowModal(false);
    setSaving(false);

    await triggerPatientCheckin({
      patient_id: newPatient.id,
      clinic_id: activeClinicId!,
      full_name: newPatient.full_name,
      email: newPatient.email,
      medication: newPatient.medication,
      clinic_name: clinic?.clinic_name || "Your Clinic",
    });
  };

  const filtered = patients.filter((p) => {
    const matchesSearch =
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.medication.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter
      ? statusFilter === "needs_attention"
        ? p.status === "at_risk" || p.status === "dropped_off"
        : p.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Patients</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage and monitor all your GLP-1 patients
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 text-sm font-semibold hover:scale-[1.02] transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Patient
        </button>
      </div>

      {statusFilter && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-slate-400">Filtering by:</span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 border border-teal-500/20">
            {statusFilter === "active"
              ? "Active Patients"
              : statusFilter === "at_risk"
                ? "At Risk Patients"
                : statusFilter === "needs_attention"
                  ? "At Risk & Dropped Off"
                  : statusFilter}
          </span>
          <button
            onClick={() => navigate("/patients")}
            className="text-xs text-slate-500 hover:text-white transition"
          >
            Clear filter
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search patients by name or medication..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition"
        />
      </div>

      {/* Patients Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-slate-500" />
            </div>
            <p className="text-slate-400 text-sm">No patients found</p>
            <p className="text-slate-600 text-xs mt-1">
              Add your first patient using the button above
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="px-6 py-4 text-xs font-medium text-slate-400">
                    Patient
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-400">
                    Medication
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-400">
                    Start Date
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-400">
                    Risk Level
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((patient, i) => {
                  const RiskIcon =
                    riskIcons[patient.risk_level as RiskLevel] || CheckCircle;
                  return (
                    <tr
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className={`border-b border-white/5 transition cursor-pointer ${
                        i === filtered.length - 1 ? "border-0" : ""
                      } ${
                        patient.status === "dropped_off"
                          ? "bg-red-500/5 hover:bg-red-500/10"
                          : patient.status === "at_risk"
                            ? "bg-amber-500/5 hover:bg-amber-500/10"
                            : "hover:bg-white/5"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-0.5 rounded-full ${
                              patient.status === "dropped_off"
                                ? "ring-2 ring-red-500/60"
                                : patient.status === "at_risk"
                                  ? "ring-2 ring-amber-500/60"
                                  : "ring-2 ring-emerald-500/60"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-xs font-bold">
                              {patient.full_name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {patient.full_name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {patient.email}
                            </p>
                            <p className="text-xs text-slate-500">
                              {patient.phone}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {patient.medication}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {new Date(patient.start_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            riskColors[patient.risk_level as RiskLevel] ||
                            riskColors["low"]
                          }`}
                        >
                          <RiskIcon className="w-3 h-3" />
                          {patient.risk_level.charAt(0).toUpperCase() +
                            patient.risk_level.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={patient.status}
                          onChange={(e) =>
                            handleStatusChange(patient.id, e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                          className={`
                            px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer
                            focus:outline-none transition
                            ${
                              patient.status === "active"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : patient.status === "at_risk"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : "bg-red-500/10 text-red-400 border-red-500/20"
                            }
                          `}
                        >
                          <option value="active">Active</option>
                          <option value="at_risk">At Risk</option>
                          <option value="dropped_off">Dropped Off</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTargetId(patient.id);
                          }}
                          className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Add New Patient</h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleAddPatient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) =>
                    setForm({ ...form, full_name: e.target.value })
                  }
                  placeholder="Jane Doe"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="patient@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 555 000 0000"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Medication
                </label>
                <select
                  value={form.medication}
                  onChange={(e) =>
                    setForm({ ...form, medication: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-teal-500 text-sm"
                >
                  <option value="">Select medication</option>
                  {medications.map((med) => (
                    <option key={med} value={med}>
                      {med}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Treatment Start Date
                </label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-teal-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl font-semibold bg-linear-to-r from-teal-500 to-emerald-500 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 text-sm"
              >
                {saving ? "Adding Patient..." : "Add Patient"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDeleteTargetId(null)}
          />
          <div className="relative z-10 w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>

            <h2 className="text-lg font-bold text-center mb-2">
              Remove Patient?
            </h2>

            <p className="text-slate-400 text-sm text-center mb-6">
              This will permanently delete the patient and all their check-in
              history. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePatient}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition disabled:opacity-50"
              >
                {deleting ? "Removing..." : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
