import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"checking" | "allowed" | "denied">("checking");

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return setStatus("denied");
      const { data } = await supabase
        .from("clinics")
        .select("is_admin")
        .eq("user_id", session.user.id)
        .single();
      setStatus(data?.is_admin ? "allowed" : "denied");
    };
    check();
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 text-sm">
        Checking access…
      </div>
    );
  }
  return status === "allowed" ? <>{children}</> : <Navigate to="/login" replace />;
}