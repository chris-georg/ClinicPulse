import { Link } from "react-router-dom";
import { Nav, Footer } from "../../components/SiteChrome";
import { Seo } from "../../components/Seo";

const SECTIONS = [
  { id: "our-role", label: "Our role under HIPAA" },
  { id: "phi-we-handle", label: "PHI we handle" },
  { id: "safeguards", label: "Safeguards we maintain" },
  { id: "baa", label: "Business Associate Agreements" },
  { id: "breach-notification", label: "Breach notification" },
  { id: "patient-rights", label: "Patient rights" },
  { id: "clinic-responsibilities", label: "Clinic responsibilities" },
  { id: "retention", label: "Data retention & disposal" },
  { id: "changes", label: "Changes to this notice" },
  { id: "contact", label: "Contact & BAA requests" },
];

export default function HipaaNotice() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo
        title="HIPAA Notice"
        description="How ClinicPulse handles Protected Health Information as a Business Associate to clinics."
        path="/hipaa"
      />
      <Nav />

      <section className="relative grid-pattern border-b border-white/5 pt-32 pb-14 px-6">
        <div className="absolute inset-0 bg-linear-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">HIPAA Notice</h1>
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
          <section id="our-role" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">1. Our role under HIPAA</h2>
            <p className="mb-3">
              Many Clinics using ClinicPulse are "Covered Entities" under the Health Insurance
              Portability and Accountability Act ("HIPAA"). Where a Clinic enters Protected Health
              Information ("PHI") into ClinicPulse, we act as a{" "}
              <strong className="text-slate-200">Business Associate</strong> to that Clinic — we
              handle PHI on the Clinic's behalf and in accordance with the Clinic's instructions,
              not our own independent judgment.
            </p>
            <p>
              This notice explains how we approach that responsibility. It supplements, and does
              not replace, the Business Associate Agreement ("BAA") between ClinicPulse and each
              Clinic — where the two conflict on a specific point, the signed BAA controls.
            </p>
          </section>

          <section id="phi-we-handle" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">2. PHI we handle</h2>
            <p className="mb-3">Depending on what a Clinic enters, this may include:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Patient name, email address, and phone number</li>
              <li>Medication or treatment type and treatment start date</li>
              <li>The content of automated check-in messages and patient replies</li>
              <li>Sentiment classification and risk status derived from those replies</li>
            </ul>
            <p className="mt-3">
              We do not request or require sensitive clinical detail beyond what a Clinic chooses
              to enter for the purpose of running check-ins.
            </p>
          </section>

          <section id="safeguards" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">3. Safeguards we maintain</h2>
            <p className="mb-3">
              We maintain administrative, technical, and physical safeguards designed to protect
              PHI, consistent with our obligations as a Business Associate, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Encryption of data in transit (TLS) between the ClinicPulse application and our infrastructure</li>
              <li>Database-level access controls (row-level security) so each Clinic can only access its own patient data</li>
              <li>Restricted, need-based internal access to production systems and PHI</li>
              <li>Use of infrastructure providers selected for their security posture, with a plan to formalize BAAs with each subprocessor that handles PHI (see Section 4)</li>
            </ul>
            <p className="mt-3 text-sm">
              We continually work to align our infrastructure with HIPAA Security Rule
              requirements as ClinicPulse scales — Clinics with specific compliance requirements
              should contact us to discuss our current safeguards in detail before onboarding
              PHI.
            </p>
          </section>

          <section id="baa" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">4. Business Associate Agreements</h2>
            <p className="mb-3">
              If your Clinic intends to enter PHI into ClinicPulse, a signed BAA between your
              Clinic and ClinicPulse should be in place before doing so. Contact us at the address
              in Section 10 to request one.
            </p>
            <p>
              We rely on subprocessors to operate the Service (see our{" "}
              <Link to="/privacy" className="text-teal-400 hover:underline">
                Privacy Policy
              </Link>{" "}
              for the current list). Where a subprocessor may handle PHI, we work to ensure that
              subprocessor is bound by terms consistent with HIPAA's requirements for
              subcontractors of a Business Associate.
            </p>
          </section>

          <section id="breach-notification" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">5. Breach notification</h2>
            <p>
              If we discover a breach of unsecured PHI, we will notify the affected Clinic without
              unreasonable delay, consistent with the timeline in our BAA and, at minimum, within
              the timeframe required by HIPAA's Breach Notification Rule. As the Covered Entity,
              the Clinic is responsible for notifying affected patients, and where applicable, the
              U.S. Department of Health and Human Services, in accordance with its own obligations
              under HIPAA.
            </p>
          </section>

          <section id="patient-rights" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">6. Patient rights</h2>
            <p>
              If you are a patient, ClinicPulse is not your healthcare provider and does not have
              a direct relationship with you. Requests to access, amend, or restrict your health
              information should be directed to your Clinic, which controls that information. We
              assist Clinics in fulfilling these requests through the platform where technically
              possible.
            </p>
          </section>

          <section id="clinic-responsibilities" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">7. Clinic responsibilities</h2>
            <p className="mb-3">As the Covered Entity, your Clinic remains responsible for:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Having a valid legal basis and patient consent, where required, to collect and share information via ClinicPulse</li>
              <li>Its own workforce training, minimum-necessary use, and internal access controls</li>
              <li>Providing patients with your own Notice of Privacy Practices</li>
              <li>Executing a BAA with ClinicPulse before entering PHI, and promptly notifying us of any known unauthorized use or disclosure</li>
            </ul>
          </section>

          <section id="retention" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">8. Data retention &amp; disposal</h2>
            <p>
              We retain PHI only for as long as needed to provide the Service to the Clinic or as
              required by our BAA and applicable law. Upon termination of a Clinic's account and
              expiration of any required retention period, PHI is deleted or de-identified in
              accordance with our data retention practices described in our{" "}
              <Link to="/privacy" className="text-teal-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section id="changes" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">9. Changes to this notice</h2>
            <p>
              We may update this notice as our infrastructure, subprocessors, or compliance
              posture evolve. Material changes affecting how PHI is handled will be communicated
              to Clinics with an active BAA.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">10. Contact &amp; BAA requests</h2>
            <p>
              To request a Business Associate Agreement, report a suspected security incident, or
              ask questions about this notice, contact{" "}
              <a href="mailto:compliance@clinicpulse.cc.cd" className="text-teal-400 hover:underline">
                compliance@clinicpulse.cc.cd
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