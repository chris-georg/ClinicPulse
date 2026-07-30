import { Link } from "react-router-dom";
import { Nav, Footer } from "../../components/SiteChrome";
import { Seo } from "../../components/Seo";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use-it", label: "How we use it" },
  { id: "how-we-share-it", label: "How we share it" },
  { id: "patient-information", label: "Patient information & HIPAA" },
  { id: "data-security", label: "Data security" },
  { id: "data-retention", label: "Data retention" },
  { id: "your-rights", label: "Your rights & choices" },
  { id: "cookies", label: "Cookies & tracking" },
  { id: "childrens-privacy", label: "Children's privacy" },
  { id: "international", label: "International users" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo
        title="Privacy Policy"
        description="How ClinicPulse collects, uses, and protects clinic and patient information."
        path="/privacy"
      />
      <Nav />

      {/* Header */}
      <section className="relative grid-pattern border-b border-white/5 pt-32 pb-14 px-6">
        <div className="absolute inset-0 bg-linear-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">
            Effective date: July 26, 2026 &nbsp;•&nbsp; Last updated: July 26, 2026
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-[220px_1fr] gap-12">
        {/* TOC */}
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

        {/* Body */}
        <main className="min-w-0 max-w-3xl space-y-14 text-slate-400 leading-relaxed">
          <section id="overview" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">1. Overview</h2>
            <p className="mb-3">
              ClinicPulse ("ClinicPulse," "we," "us," or "our") provides a patient retention
              platform used by independent clinics ("Clinics," "you," or "your customer
              organization") to manage patient check-ins and reduce treatment dropout. This
              Privacy Policy explains what information we collect, how we use and share it, and
              the choices available to you.
            </p>
            <p>
              This policy covers two categories of people: <strong className="text-slate-200">Clinics</strong> who
              create a ClinicPulse account and use our dashboard, and <strong className="text-slate-200">patients</strong> whose
              information a Clinic enters into ClinicPulse in order to run automated check-ins.
              If you are a patient of a clinic that uses ClinicPulse, your clinic — not
              ClinicPulse — is responsible for your care and controls how your information is
              used; ClinicPulse acts as a service provider to that clinic. See{" "}
              <Link to="/hipaa" className="text-teal-400 hover:underline">
                Section 5
              </Link>{" "}
              and our separate{" "}
              <Link to="/hipaa" className="text-teal-400 hover:underline">
                HIPAA Notice
              </Link>{" "}
              for details specific to health information.
            </p>
          </section>

          <section id="information-we-collect" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">2. Information we collect</h2>

            <h3 className="text-sm font-semibold text-slate-200 mb-2 mt-6">a. Information Clinics provide directly</h3>
            <p className="mb-3">
              When a Clinic registers, we collect account information: clinic name, email address, phone number, business address, website, and a clinic logo if
              uploaded. Billing information is collected and processed by our payment provider
              (see Section 4) — ClinicPulse does not store full card numbers.
            </p>

            <h3 className="text-sm font-semibold text-slate-200 mb-2 mt-6">b. Patient information Clinics enter</h3>
            <p className="mb-3">
              To operate the platform, a Clinic enters information about its own patients:
              full name, email, phone number, medication/treatment type, treatment start date,
              and the content of check-in messages and replies (including an automated sentiment
              classification of those replies). This data is entered and controlled by the Clinic,
              not collected by ClinicPulse directly from patients.
            </p>

            <h3 className="text-sm font-semibold text-slate-200 mb-2 mt-6">c. Information collected automatically</h3>
            <p>
              When you use our website or dashboard, we automatically collect limited usage data —
              pages visited, browser type, device type, IP address, and timestamps — for security,
              debugging, and product-improvement purposes.
            </p>
          </section>

          <section id="how-we-use-it" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">3. How we use it</h2>
            <p className="mb-3">We use the information described above to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Create and maintain Clinic accounts and authenticate logins</li>
              <li>Send scheduled patient check-in emails on a Clinic's behalf and record responses</li>
              <li>Classify check-in replies (positive/neutral/negative) to flag dropout risk</li>
              <li>Generate dashboards, alerts, and risk-status views for the Clinic</li>
              <li>Process subscription billing and manage trial/paid status</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Maintain the security, integrity, and reliability of the platform</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do not use patient information entered by a Clinic to advertise to that patient,
              sell it, or use it to train third-party AI models outside the scope of providing the
              service to that Clinic.
            </p>
          </section>

          <section id="how-we-share-it" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">4. How we share it</h2>
            <p className="mb-4">
              We do not sell personal information. We share information only with the service
              providers ("subprocessors") required to operate ClinicPulse, each bound by their own
              data protection terms:
            </p>
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-slate-500">
                    <th className="px-5 py-3 font-medium">Provider</th>
                    <th className="px-5 py-3 font-medium">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ["Supabase", "Database, authentication, and file storage"],
                    ["n8n", "Automated check-in workflows and reply processing"],
                    ["Gmail / Google Workspace", "Sending and receiving check-in emails (development environment)"],
                    ["Lemon Squeezy", "Subscription billing and payment processing"],
                    ["Vercel", "Website and application hosting"],
                  ].map(([name, purpose]) => (
                    <tr key={name}>
                      <td className="px-5 py-3.5 font-medium text-slate-200 whitespace-nowrap">{name}</td>
                      <td className="px-5 py-3.5 text-slate-500">{purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              We may also disclose information if required by law, to enforce our Terms of
              Service, or to protect the rights, property, or safety of ClinicPulse, our
              customers, or others. If ClinicPulse is involved in a merger, acquisition, or asset
              sale, information may be transferred as part of that transaction, subject to this
              policy or a comparable one.
            </p>
          </section>

          <section id="patient-information" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">5. Patient information &amp; HIPAA</h2>
            <p className="mb-3">
              Some information Clinics enter into ClinicPulse may constitute Protected Health
              Information ("PHI") under HIPAA. Where that is the case, ClinicPulse acts as a
              Business Associate to the Clinic, and our handling of that information is governed
              by a Business Associate Agreement and our{" "}
              <Link to="/hipaa" className="text-teal-400 hover:underline">
                HIPAA Notice
              </Link>
              , which controls over this Privacy Policy for any conflict specific to PHI.
            </p>
            <p>
              Patients do not create their own ClinicPulse accounts. Requests to access, correct,
              or delete patient information should be directed to the Clinic providing your care;
              we assist Clinics in fulfilling those requests through the platform.
            </p>
          </section>

          <section id="data-security" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">6. Data security</h2>
            <p>
              We use industry-standard safeguards to protect information, including encryption in
              transit (TLS), database-level access controls and row-level security so that each
              Clinic can only access its own data, and restricted internal access to production
              systems. No method of transmission or storage is 100% secure, and we cannot
              guarantee absolute security. If we become aware of a breach affecting your data, we
              will notify affected Clinics in accordance with applicable law.
            </p>
          </section>

          <section id="data-retention" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">7. Data retention</h2>
            <p>
              We retain Clinic and patient information for as long as the Clinic's account is
              active, and for a reasonable period afterward to comply with legal obligations,
              resolve disputes, and enforce our agreements. A Clinic may request deletion of its
              account and associated data at any time by contacting us; some information may be
              retained in backups for a limited period before permanent deletion.
            </p>
          </section>

          <section id="your-rights" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">8. Your rights &amp; choices</h2>
            <p className="mb-3">
              Depending on your location, you may have the right to access, correct, export, or
              delete personal information we hold, and to object to or restrict certain
              processing. Clinics can access and update most account and patient information
              directly within the ClinicPulse dashboard. For requests we can't fulfill directly in
              the product, contact us using the details in Section 13.
            </p>
            <p>
              Residents of the EU/EEA, UK, and certain U.S. states (including California) may have
              additional statutory rights under GDPR, UK GDPR, or state privacy laws such as the
              CCPA. We will honor verifiable requests consistent with those laws.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">9. Cookies &amp; tracking</h2>
            <p>
              ClinicPulse uses a limited number of strictly necessary cookies to keep you signed
              in and maintain session security. We do not currently use third-party advertising
              cookies. If this changes, we will update this policy and our{" "}
              <Link to="/cookies" className="text-teal-400 hover:underline">
                Cookie Policy
              </Link>{" "}
              accordingly.
            </p>
          </section>

          <section id="childrens-privacy" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">10. Children's privacy</h2>
            <p>
              ClinicPulse is intended for use by clinic staff and is not directed at children. We
              do not knowingly collect personal information directly from children under 13. If a
              Clinic's patient is a minor, the Clinic — not the patient — controls that
              information in accordance with applicable law.
            </p>
          </section>

          <section id="international" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">11. International users</h2>
            <p>
              ClinicPulse is designed for clinics operating in the United States, and our
              subprocessors may store or process data in the United States and other countries.
              If you access ClinicPulse from outside the U.S., you understand your information
              may be transferred to and processed in the U.S. and other jurisdictions with
              different data protection laws than your own.
            </p>
          </section>

          <section id="changes" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">12. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes,
              we will notify Clinics by email or through an in-app notice before the change takes
              effect. The "Last updated" date at the top of this page reflects the most recent
              revision.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">13. Contact us</h2>
            <p>
              Questions about this Privacy Policy or your data can be sent to{" "}
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