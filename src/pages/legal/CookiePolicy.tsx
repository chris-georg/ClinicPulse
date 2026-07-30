import { Link } from "react-router-dom";
import { Nav, Footer } from "../../components/SiteChrome";
import { Seo } from "../../components/Seo";

const SECTIONS = [
  { id: "what-are-cookies", label: "What are cookies" },
  { id: "cookies-we-use", label: "Cookies we use" },
  { id: "cookies-we-dont-use", label: "Cookies we don't use" },
  { id: "third-party", label: "Third-party cookies" },
  { id: "managing-cookies", label: "Managing cookies" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo
        title="Cookie Policy"
        description="What cookies ClinicPulse uses, and what we don't."
        path="/cookies"
      />
      <Nav />

      <section className="relative grid-pattern border-b border-white/5 pt-32 pb-14 px-6">
        <div className="absolute inset-0 bg-linear-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Cookie Policy</h1>
          <p className="text-slate-500 text-sm">
            Effective date: July 26, 2026 &nbsp;•&nbsp; Last updated: July 26, 2026
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[220px_1fr] gap-12">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              On this page
            </p>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-sm py-1.5 border-l-2 border-white/10 pl-3 text-slate-500 hover:text-slate-300 hover:border-white/20 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 max-w-3xl space-y-14 text-slate-400 leading-relaxed">
          <section id="what-are-cookies" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">1. What are cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They
              let a site remember information about your visit — like keeping you signed in —
              between page loads. This policy explains which cookies ClinicPulse uses and why.
            </p>
          </section>

          <section id="cookies-we-use" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">2. Cookies we use</h2>
            <p className="mb-4">
              We currently use only <strong className="text-slate-200">strictly necessary</strong> cookies
              — the kind that don't require consent under most privacy laws because the Service
              can't function without them:
            </p>
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-500">
                    <th className="px-5 py-3 font-medium">Cookie</th>
                    <th className="px-5 py-3 font-medium">Purpose</th>
                    <th className="px-5 py-3 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ["Supabase auth session", "Keeps you signed in to your ClinicPulse dashboard", "Session / until sign-out"],
                    ["CSRF / security token", "Protects against cross-site request forgery", "Session"],
                  ].map(([name, purpose, duration]) => (
                    <tr key={name}>
                      <td className="px-5 py-3.5 font-medium text-slate-200 whitespace-nowrap">{name}</td>
                      <td className="px-5 py-3.5 text-slate-500">{purpose}</td>
                      <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="cookies-we-dont-use" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">3. Cookies we don't use</h2>
            <p className="mb-3">As of the date at the top of this page, ClinicPulse does not use:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Advertising or ad-retargeting cookies</li>
              <li>Third-party analytics or behavioral tracking cookies</li>
              <li>Cross-site tracking of any kind</li>
            </ul>
            <p className="mt-3">
              If this changes — for example, if we add a privacy-respecting analytics tool to
              understand product usage — we will update this policy first and, where required by
              law, request your consent before those cookies are set.
            </p>
          </section>

          <section id="third-party" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">4. Third-party cookies</h2>
            <p>
              Some pages may embed or link to third-party services (for example, our payment
              processor during checkout). Those providers may set their own cookies, governed by
              their own privacy and cookie policies, not this one. See our{" "}
              <Link to="/privacy" className="text-teal-400 hover:underline">
                Privacy Policy
              </Link>{" "}
              for the list of providers we work with.
            </p>
          </section>

          <section id="managing-cookies" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">5. Managing cookies</h2>
            <p className="mb-3">
              Because ClinicPulse currently relies only on strictly necessary cookies, there's no
              cookie preference banner on this site — there's nothing optional to opt out of yet.
            </p>
            <p>
              You can still control or clear cookies at any time through your browser settings.
              Note that blocking the authentication cookie will prevent you from staying signed in
              to your ClinicPulse dashboard.
            </p>
          </section>

          <section id="changes" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">6. Changes to this policy</h2>
            <p>
              We'll update this page if the cookies we use change. Material changes — like
              introducing analytics or advertising cookies — will be reflected here with an
              updated "Last updated" date, and a consent mechanism will be added if legally
              required at that time.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">7. Contact us</h2>
            <p>
              Questions about this Cookie Policy can be sent to{" "}
              <a href="mailto:privacy@clinicpulse.cc.cd" className="text-teal-400 hover:underline">
                privacy@clinicpulse.cc.cd
              </a>
              .
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}