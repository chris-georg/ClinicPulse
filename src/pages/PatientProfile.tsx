import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { supabase } from "../lib/supabase";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Pill,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit2,
  Save,
  X,
  XCircle,
} from "lucide-react";

type RiskLevel = "low" | "medium" | "high";

type Patient = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  medication: string;
  start_date: string;
  risk_level: RiskLevel;
  status: string;
  created_at: string;
};

type Checkin = {
  id: string;
  response: string;
  patient_response: string;
  sentiment: string;
  checkin_type: string;
  created_at: string;
};

const riskColors: Record<RiskLevel, string> = {
  low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  high: "bg-red-500/10 text-red-400 border-red-500/20",
};

const riskIcons: Record<RiskLevel, LucideIcon> = {
  low: CheckCircle,
  medium: Clock,
  high: AlertTriangle,
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  at_risk: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  dropped_off: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  at_risk: "At Risk",
  dropped_off: "Dropped Off",
};

export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editForm, setEditForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    medication: "",
    start_date: "",
  });

  const medications = [
    "Ozempic (Semaglutide)",
    "Wegovy (Semaglutide)",
    "Mounjaro (Tirzepatide)",
    "Zepbound (Tirzepatide)",
    "Saxenda (Liraglutide)",
    "Rybelsus (Oral Semaglutide)",
    "Other",
  ];

  const fetchPatient = async () => {
    if (!id) return;

    const { data: patient } = await supabase
      .from("patients")
      .select("*")
      .eq("id", id)
      .single();

    if (patient) {
      setPatient(patient);
      setEditForm({
        full_name: patient.full_name,
        email: patient.email,
        phone: patient.phone,
        medication: patient.medication,
        start_date: patient.start_date,
      });
    }

    const { data: checkins } = await supabase
      .from("checkins")
      .select("*")
      .eq("patient_id", id)
      .order("created_at", { ascending: false });

    setCheckins(checkins || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchPatient();
  }, [id]);

  const handleSaveEdit = async () => {
    if (!patient) return;
    setSaving(true);
    setError("");

    const { error } = await supabase
      .from("patients")
      .update(editForm)
      .eq("id", patient.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setPatient({ ...patient, ...editForm });
    setEditing(false);
    setSaving(false);
  };

  const daysSinceStart = patient
    ? Math.floor(
        (new Date().getTime() - new Date(patient.start_date).getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!patient) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-slate-400">Patient not found</p>
          <button
            onClick={() => navigate("/patients")}
            className="mt-4 text-teal-400 text-sm hover:text-teal-300"
          >
            Back to Patients
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const RiskIcon = riskIcons[patient.risk_level] || CheckCircle;

  return (
    <DashboardLayout>
      {/* Back Button */}
      <button
        onClick={() => navigate("/patients")}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-6 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-xl font-bold">
            {patient.full_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{patient.full_name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[patient.status]}`}
              >
                {statusLabels[patient.status] || patient.status}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${riskColors[patient.risk_level]}`}
              >
                <RiskIcon className="w-3 h-3" />
                {patient.risk_level.charAt(0).toUpperCase() +
                  patient.risk_level.slice(1)}{" "}
                Risk
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition"
        >
          {editing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-4">
          {/* Quick Stats */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h2 className="font-semibold mb-4">Treatment Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">
                  Days on Treatment
                </span>
                <span className="text-sm font-medium">
                  {daysSinceStart} days
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">
                  Check-ins Completed
                </span>
                <span className="text-sm font-medium">{checkins.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Started</span>
                <span className="text-sm font-medium">
                  {new Date(patient.start_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h2 className="font-semibold mb-4">Contact Information</h2>

            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.full_name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, full_name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Medication
                  </label>
                  <select
                    value={editForm.medication}
                    onChange={(e) =>
                      setEditForm({ ...editForm, medication: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-500"
                  >
                    {medications.map((med) => (
                      <option key={med} value={med}>
                        {med}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={editForm.start_date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, start_date: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
                <button
                  onClick={handleSaveEdit}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 text-sm font-semibold hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">
                    {patient.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">
                    {patient.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Pill className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">
                    {patient.medication}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">
                    {new Date(patient.start_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column — Risk History Timeline */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h2 className="font-semibold mb-6">Risk History Timeline</h2>

            {checkins.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-slate-500" />
                </div>
                <p className="text-slate-400 text-sm">No history yet</p>
                <p className="text-slate-600 text-xs mt-1">
                  Timeline will appear once automation is active
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

                <div className="space-y-6">
                  {/* Patient added event — always first */}
                  <div className="relative flex gap-4 items-start">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                    </div>
                    <div className="pt-1 pb-2">
                      <p className="text-sm font-medium text-white">
                        Added to system
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(patient.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Started on {patient.medication}
                      </p>
                    </div>
                  </div>

                  {/* Checkin events */}
                  {checkins.map((checkin) => {
                    const isReply = checkin.checkin_type === "reply";
                    const isNoResponse =
                      checkin.response?.includes("No response");
                    const isRiskUpdate =
                      checkin.response?.includes("risk level updated");

                    let dotColor: string;
                    let dotIcon: typeof Clock;
                    let dotIconColor: string;

                    if (isReply) {
                      if (checkin.sentiment === "positive") {
                        dotColor = "bg-emerald-500/20 border-emerald-500/40";
                        dotIcon = CheckCircle;
                        dotIconColor = "text-emerald-400";
                      } else if (checkin.sentiment === "negative") {
                        dotColor = "bg-red-500/20 border-red-500/40";
                        dotIcon = AlertTriangle;
                        dotIconColor = "text-red-400";
                      } else {
                        dotColor = "bg-amber-500/20 border-amber-500/40";
                        dotIcon = Clock;
                        dotIconColor = "text-amber-400";
                      }
                    } else if (isNoResponse || isRiskUpdate) {
                      dotColor = "bg-red-500/20 border-red-500/40";
                      dotIcon = AlertTriangle;
                      dotIconColor = "text-red-400";
                    } else {
                      dotColor = "bg-blue-500/20 border-blue-500/40";
                      dotIcon = Clock;
                      dotIconColor = "text-blue-400";
                    }

                    const DotIcon = dotIcon;

                    return (
                      <div
                        key={checkin.id}
                        className="relative flex gap-4 items-start"
                      >
                        <div
                          className={`relative z-10 w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${dotColor}`}
                        >
                          <DotIcon className={`w-3.5 h-3.5 ${dotIconColor}`} />
                        </div>
                        <div className="pt-1 pb-2 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-medium text-white">
                              {isReply
                                ? "Patient replied"
                                : isNoResponse
                                  ? "No response detected"
                                  : isRiskUpdate
                                    ? "Risk level updated"
                                    : "Check-in email sent"}
                            </p>
                            <span className="text-xs text-slate-500 shrink-0">
                              {new Date(checkin.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>

                          {/* Reply content */}
                          {isReply && checkin.patient_response && (
                            <p className="text-xs text-slate-300 mt-1 bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                              "{checkin.patient_response}"
                            </p>
                          )}

                          {/* Sentiment badge */}
                          {isReply && checkin.sentiment && (
                            <span
                              className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full border ${
                                checkin.sentiment === "positive"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : checkin.sentiment === "negative"
                                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              }`}
                            >
                              {checkin.sentiment.charAt(0).toUpperCase() +
                                checkin.sentiment.slice(1)}{" "}
                              sentiment
                            </span>
                          )}

                          {/* No response message */}
                          {(isNoResponse || isRiskUpdate) && (
                            <p className="text-xs text-slate-400 mt-1">
                              Patient was automatically flagged by the system
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Current status — always last */}
                  <div className="relative flex gap-4 items-start">
                    <div
                      className={`relative z-10 w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                        patient.status === "dropped_off"
                          ? "bg-red-500/20 border-red-500/40"
                          : patient.status === "at_risk"
                            ? "bg-amber-500/20 border-amber-500/40"
                            : "bg-emerald-500/20 border-emerald-500/40"
                      }`}
                    >
                      {patient.status === "dropped_off" ? (
                        <XCircle className={`w-3.5 h-3.5 text-red-400`} />
                      ) : patient.status === "at_risk" ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-medium text-white">
                        Current status:{" "}
                        <span
                          className={
                            patient.status === "dropped_off"
                              ? "text-red-400"
                              : patient.status === "at_risk"
                                ? "text-amber-400"
                                : "text-emerald-400"
                          }
                        >
                          {patient.status === "dropped_off"
                            ? "Dropped Off"
                            : patient.status === "at_risk"
                              ? "At Risk"
                              : "Active"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
