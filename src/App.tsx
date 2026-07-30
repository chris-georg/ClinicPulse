import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import PatientRetentionGuide from "./pages/resources/PatientRetentionGuide";
import CaseStudies from "./pages/resources/CaseStudies";
import ScrollToHash from "./components/ScrollToHash";
import Blog from "./pages/resources/Blog";
import BlogPost from "./pages/resources/BlogPost";
import AdminBlog from "./pages/admin/AdminBlog";
import { RequireAdmin } from "./components/RequireAdmin";
import { HelmetProvider } from "react-helmet-async";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import HipaaNotice from "./pages/legal/HipaaNotice";
import CookiePolicy from "./pages/legal/CookiePolicy";
import HelpCenter from "./pages/support/HelpCenter";
import ContactSupport from "./pages/support/ContactSupport"
import BookDemo from "./pages/support/BookDemo"
import SystemStatus from "./pages/support/SystemStatus"
import AboutUs from "./pages/AboutUs"

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <span className="text-2xl font-bold text-white">
          Clinic<span className="text-teal-400">Pulse</span>
        </span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0ms]" />
        <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:150ms]" />
        <div className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setTimeout(() => setLoading(false), 800);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route
            path="/"
            element={!session ? <Landing /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/login"
            element={!session ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!session ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={session ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/patients"
            element={session ? <Patients /> : <Navigate to="/login" />}
          />
          <Route
            path="/patients/:id"
            element={session ? <PatientProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/alerts"
            element={session ? <Alerts /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={session ? <Settings /> : <Navigate to="/login" />}
          />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/patient-retention-guide"
            element={<PatientRetentionGuide />}
          />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/resources/blog" element={<Blog />} />
          <Route path="/resources/blog/:slug" element={<BlogPost />} />
          <Route
            path="/admin/blog"
            element={
              <RequireAdmin>
                <AdminBlog />
              </RequireAdmin>
            }
          />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/hipaa" element={<HipaaNotice />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/system-status" element={<SystemStatus />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="*"
            element={<Navigate to={session ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
