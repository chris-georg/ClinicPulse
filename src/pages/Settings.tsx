import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { supabase } from "../lib/supabase";
import { Camera, Save, Building2, X } from "lucide-react";

type ClinicProfile = {
  id: string;
  clinic_name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logo_url: string;
};

export default function Settings() {
  const [profile, setProfile] = useState<ClinicProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: clinic } = await supabase
      .from("clinics")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (clinic) {
      setProfile(clinic);
    } else {
      // Create clinic record if doesn't exist
      const { data: newClinic } = await supabase
        .from("clinics")
        .insert({
          user_id: user.id,
          clinic_name: user.user_metadata?.clinic_name || "My Clinic",
          email: user.email,
        })
        .select()
        .single();

      setProfile(newClinic);
    }

    setLoading(false);
  };

  useEffect(() => {
    void (async () => {
      await fetchProfile();
    })();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSaving(true);
    setError("");
    setSuccess(false);

    const { error } = await supabase
      .from("clinics")
      .update({
        clinic_name: profile.clinic_name,
        phone: profile.phone,
        address: profile.address,
        website: profile.website,
      })
      .eq("id", profile.id);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }

    setSaving(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setUploadingLogo(true);
    setError("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${profile.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("clinic-logos")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setError("Failed to upload logo. Please try again.");
      setUploadingLogo(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("clinic-logos").getPublicUrl(fileName);

    await supabase
      .from("clinics")
      .update({ logo_url: publicUrl })
      .eq("id", profile.id);

    setProfile({ ...profile, logo_url: publicUrl });
    setUploadingLogo(false);
  };

  const handleRemoveLogo = async () => {
    if (!profile) return;
    setError("");

    const fileExt = profile.logo_url.split(".").pop();
    const fileName = `${profile.id}.${fileExt}`;

    await supabase.storage.from("clinic-logos").remove([fileName]);

    await supabase
      .from("clinics")
      .update({ logo_url: null })
      .eq("id", profile.id);

    setProfile({ ...profile, logo_url: "" });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your clinic profile and account
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Logo Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-semibold mb-5">Clinic Logo</h2>

          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center overflow-hidden">
                {profile?.logo_url ? (
                  <img
                    src={profile.logo_url}
                    alt="Clinic Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-white" />
                )}
              </div>

              {/* Upload button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingLogo}
                className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center hover:bg-teal-400 transition disabled:opacity-50"
              >
                {uploadingLogo ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="w-3 h-3 text-white" />
                )}
              </button>

              {/* Remove button — only shows when logo exists */}
              {profile?.logo_url && (
                <button
                  onClick={handleRemoveLogo}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-400 transition"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>

            <div>
              <p className="text-sm font-medium">{profile?.clinic_name}</p>
              <p className="text-xs text-slate-500 mt-1">
                Click the camera icon to upload your logo
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                PNG, JPG up to 2MB
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-semibold mb-5">Clinic Information</h2>

          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-sm">
              Profile saved successfully
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Clinic Name
              </label>
              <input
                type="text"
                value={profile?.clinic_name || ""}
                onChange={(e) =>
                  setProfile(
                    profile
                      ? { ...profile, clinic_name: e.target.value }
                      : null,
                  )
                }
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-slate-900/30 border border-slate-700/50 text-slate-500 text-sm cursor-not-allowed"
              />
              <p className="text-xs text-slate-600 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={profile?.phone || ""}
                onChange={(e) =>
                  setProfile(
                    profile ? { ...profile, phone: e.target.value } : null,
                  )
                }
                placeholder="+1 555 000 0000"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Clinic Address
              </label>
              <input
                type="text"
                value={profile?.address || ""}
                onChange={(e) =>
                  setProfile(
                    profile ? { ...profile, address: e.target.value } : null,
                  )
                }
                placeholder="123 Medical Drive, Houston, TX"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Website
              </label>
              <input
                type="url"
                value={profile?.website || ""}
                onChange={(e) =>
                  setProfile(
                    profile ? { ...profile, website: e.target.value } : null,
                  )
                }
                placeholder="https://yourclinic.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900/70 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-linear-to-r from-teal-500 to-emerald-500 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 text-sm"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
