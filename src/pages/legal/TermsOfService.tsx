import { Link } from "react-router-dom";
import { Nav, Footer } from "../../components/SiteChrome";
import { Seo } from "../../components/Seo";

const SECTIONS = [
  { id: "agreement", label: "Agreement to terms" },
  { id: "description", label: "Description of service" },
  { id: "eligibility", label: "Eligibility & accounts" },
  { id: "billing", label: "Subscriptions & billing" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "clinic-responsibilities", label: "Clinic responsibilities" },
  { id: "no-medical-advice", label: "No medical advice" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "third-party", label: "Third-party services" },
  { id: "warranties", label: "Disclaimer of warranties" },
  { id: "liability", label: "Limitation of liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "termination", label: "Term & termination" },
  { id: "governing-law", label: "Governing law" },
  { id: "changes", label: "Changes to these terms" },
  { id: "contact", label: "Contact us" },
];

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo
        title="Terms of Service"
        description="The terms that govern use of the ClinicPulse platform."
        path="/terms"
      />
      <Nav />

      <section className="relative grid-pattern border-b border-white/5 pt-32 pb-14 px-6">
        <div className="absolute inset-0 bg-linear-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
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
          <section id="agreement" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">1. Agreement to terms</h2>
            <p>
              These Terms of Service ("Terms") form a binding agreement between you, acting on
              behalf of a clinic or practice ("Clinic," "you," or "your"), and ClinicPulse
              ("ClinicPulse," "we," "us," or "our") governing your access to and use of the
              ClinicPulse platform (the "Service"). By creating an account or using the Service,
              you agree to these Terms. If you don't agree, don't use the Service.
            </p>
          </section>

          <section id="description" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">2. Description of service</h2>
            <p>
              ClinicPulse is a software platform that helps clinics automate patient check-ins,
              detect dropout risk through response-pattern analysis, and surface alerts to clinic
              staff. ClinicPulse is a communication and workflow tool. It does not practice
              medicine, diagnose conditions, prescribe treatment, or make clinical decisions —
              those remain entirely the responsibility of the Clinic and its licensed providers.
            </p>
          </section>

          <section id="eligibility" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">3. Eligibility &amp; accounts</h2>
            <p className="mb-3">
              You must be at least 18 years old and authorized to bind your clinic or practice to
              these Terms to create an account. You're responsible for maintaining the
              confidentiality of your login credentials and for all activity that occurs under
              your account.
            </p>
            <p>
              You agree to provide accurate registration information and to keep it up to date.
              We may suspend or terminate accounts that provide false information or that we
              reasonably believe are being used fraudulently.
            </p>
          </section>

          <section id="billing" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">4. Subscriptions &amp; billing</h2>
            <p className="mb-3">
              ClinicPulse offers subscription plans (currently Starter, Pro, and Clinic+) billed
              monthly, and may offer a free trial period of a stated length. At the end of a
              trial, your subscription will begin and billing will start unless you cancel before
              the trial ends.
            </p>
            <p className="mb-3">
              Subscriptions automatically renew each billing period until canceled. You can cancel
              at any time from your account settings; cancellation takes effect at the end of the
              current billing period, and we do not provide partial-period refunds except where
              required by law. Payments are processed by our third-party payment processor
              (currently Lemon Squeezy); by subscribing, you also agree to that processor's
              applicable terms.
            </p>
            <p>
              We may change our pricing or plan features with advance notice. Continued use of the
              Service after a pricing change takes effect constitutes acceptance of the new
              pricing.
            </p>
          </section>

          <section id="acceptable-use" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">5. Acceptable use</h2>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Use the Service for any unlawful purpose or in violation of any applicable healthcare, privacy, or consumer protection law</li>
              <li>Upload patient information you are not authorized to collect, use, or share</li>
              <li>Attempt to access another Clinic's data or bypass account-level access controls</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code of the Service</li>
              <li>Use the Service to send spam, harassment, or deceptive communications to patients</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
            </ul>
          </section>

          <section id="clinic-responsibilities" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">6. Clinic responsibilities</h2>
            <p className="mb-3">
              You are solely responsible for the accuracy of the patient information you enter
              into ClinicPulse, and for obtaining any consent required by law before entering a
              patient's information into the Service or contacting that patient through automated
              check-ins. You represent that you have the right to share this information with
              ClinicPulse for the purpose of operating the Service on your behalf.
            </p>
            <p>
              Where patient information constitutes Protected Health Information under HIPAA, our
              relationship is additionally governed by a Business Associate Agreement and our{" "}
              <Link to="/hipaa" className="text-teal-400 hover:underline">
                HIPAA Notice
              </Link>
              . You are responsible for your own compliance with HIPAA and other applicable laws
              as a covered entity or comparable role.
            </p>
          </section>

          <section id="no-medical-advice" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">7. No medical advice</h2>
            <p>
              ClinicPulse does not provide medical advice, diagnosis, or treatment, and nothing in
              the Service should be interpreted as such. Automated sentiment classification of
              patient replies is a workflow aid to help prioritize follow-up — it is not a
              clinical assessment and must not be relied upon as one. All clinical judgment
              remains the responsibility of the Clinic and its qualified staff.
            </p>
          </section>

          <section id="intellectual-property" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">8. Intellectual property</h2>
            <p className="mb-3">
              ClinicPulse and its licensors retain all rights, title, and interest in the Service,
              including its software, design, and branding. These Terms grant you a limited,
              non-exclusive, non-transferable right to use the Service for your internal business
              purposes — nothing more.
            </p>
            <p>
              You retain all rights to the patient and clinic data you input into the Service
              ("Your Data"). You grant ClinicPulse a limited license to host, process, and display
              Your Data solely to provide the Service to you.
            </p>
          </section>

          <section id="third-party" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">9. Third-party services</h2>
            <p>
              The Service relies on third-party infrastructure and providers (including Supabase,
              n8n/Render, Gmail, Lemon Squeezy, and Vercel) to operate. We are not responsible for
              outages, errors, or data handling by these providers beyond our contractual
              relationship with them, though we select and monitor them with reasonable care.
            </p>
          </section>

          <section id="warranties" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">10. Disclaimer of warranties</h2>
            <p className="uppercase text-xs tracking-wide leading-relaxed text-slate-500">
              The service is provided "as is" and "as available" without warranties of any kind,
              express or implied, including implied warranties of merchantability, fitness for a
              particular purpose, and non-infringement. We do not warrant that the service will be
              uninterrupted, error-free, or completely secure.
            </p>
          </section>

          <section id="liability" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">11. Limitation of liability</h2>
            <p className="mb-3 uppercase text-xs tracking-wide leading-relaxed text-slate-500">
              To the maximum extent permitted by law, ClinicPulse will not be liable for any
              indirect, incidental, special, consequential, or punitive damages, or any loss of
              profits, revenue, or data, arising out of or related to your use of the service.
            </p>
            <p className="text-sm">
              <span className="text-slate-300 font-medium">Placeholder — needs your input:</span>{" "}
              our total liability for any claim will be capped at the amount you paid us in the{" "}
              <em>[e.g., 12 months]</em> preceding the claim. Confirm this cap and duration with
              legal counsel before publishing.
            </p>
          </section>

          <section id="indemnification" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">12. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold ClinicPulse harmless from any claims,
              damages, or expenses (including reasonable attorneys' fees) arising from your use of
              the Service, your violation of these Terms, or your violation of any law or
              third-party right — including any failure to obtain proper patient consent.
            </p>
          </section>

          <section id="termination" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">13. Term &amp; termination</h2>
            <p className="mb-3">
              These Terms remain in effect while you use the Service. You may terminate by
              canceling your subscription and closing your account. We may suspend or terminate
              your access if you materially breach these Terms, including failure to pay fees when
              due, and we will make reasonable efforts to notify you before doing so except where
              immediate action is required to protect the Service or other Clinics.
            </p>
            <p>
              Upon termination, your right to use the Service ends. We will retain and delete your
              data in accordance with our{" "}
              <Link to="/privacy" className="text-teal-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section id="governing-law" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">14. Governing law</h2>
            <p className="text-sm">
              <span className="text-slate-300 font-medium">Placeholder — needs your input:</span>{" "}
              these Terms are governed by the laws of <em>[your business entity's jurisdiction, e.g. the State of Delaware, United States]</em>,
              without regard to conflict-of-law principles. Fill this in based on where your
              company is actually incorporated once that's finalized, and consider whether you
              want an arbitration clause here — a lawyer can advise on what's standard and
              enforceable for your situation.
            </p>
          </section>

          <section id="changes" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">15. Changes to these terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be communicated
              by email or in-app notice before taking effect. Continued use of the Service after
              changes take effect constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section id="contact" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-white mb-4">16. Contact us</h2>
            <p>
              Questions about these Terms can be sent to{" "}
              <a href="mailto:legal@clinicpulse.cc.cd" className="text-teal-400 hover:underline">
                legal@clinicpulse.cc.cd
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