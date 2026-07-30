import { useNavigate } from "react-router-dom";
import {
  Heart,
  Lock,
  MessageCircle,
  Sparkles,
  Target,
  ShieldCheck,
} from "lucide-react";
import { Nav, Footer } from "../components/SiteChrome";

function AboutUs() {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: "Clinic-First Design",
      desc: "Every feature begins with the real workflows of GLP-1 clinics. We build to solve practical challenges, not to add unnecessary complexity.",
    },
    {
      icon: Lock,
      title: "Security by Design",
      desc: "Protecting patient information is fundamental. ClinicPulse is built with secure architecture, privacy-conscious practices, and healthcare in mind.",
    },
    {
      icon: MessageCircle,
      title: "Long-Term Partnership",
      desc: "We believe great software goes beyond features. We continuously improve ClinicPulse through customer feedback and provide responsive support every step of the way.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Nav />

      {/* 1. Hero */}
<section className="pt-28 pb-20 relative overflow-hidden">

  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[640px] rounded-full bg-teal-500/10 blur-3xl" />

  <div className="max-w-4xl mx-auto px-6 text-center relative">

    <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4">
      About ClinicPulse
    </p>

    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
      Building the future of
      <br />
      <span className="gradient-text">
        patient engagement for GLP-1 clinics.
      </span>
    </h1>

    <p className="mt-8 text-lg text-slate-400 leading-8 max-w-3xl mx-auto">
      ClinicPulse is a healthcare technology company focused exclusively on
      helping GLP-1 and medical weight-loss practices improve patient
      retention. Through intelligent automation, proactive follow-up, and
      actionable insights, we help clinics keep more patients engaged
      throughout their treatment journey while reducing the administrative
      burden on care teams.
    </p>

  </div>

</section>

      {/* 2. Company Story */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Story
            </p>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Why
              <span className="p-2 gradient-text"> ClinicPulse </span>
              Exists
            </h2>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              We believe better patient outcomes begin with better patient
              engagement. ClinicPulse was created to help GLP-1 clinics build
              stronger relationships with patients through intelligent,
              proactive follow-up.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-6 text-slate-400 leading-8">
              <p>
                GLP-1 therapies are transforming the way clinics help patients
                achieve healthier outcomes. But successful treatment depends on
                more than prescribing medication—it requires consistent
                engagement throughout the patient's journey.
              </p>

              <p>
                Many clinics invest significant time bringing patients into
                treatment, yet struggle to maintain meaningful follow-up at
                scale. Busy teams, growing patient volumes, and manual workflows
                make it difficult to identify patients who are quietly
                disengaging before valuable intervention opportunities are
                missed.
              </p>

              <p>
                ClinicPulse was created to solve that challenge. Our platform
                helps GLP-1 clinics automate patient follow-up, identify
                disengagement earlier, and provide care teams with the insights
                they need to support patients proactively—not reactively.
              </p>

              <p>
                By focusing exclusively on GLP-1 and medical weight-loss
                practices, we're able to build software tailored to the unique
                workflows, challenges, and retention goals of this rapidly
                growing specialty.
              </p>
            </div>

            {/* Right */}
            <div className="glass-card rounded-3xl overflow-hidden">
              <img
                src="/about-story.jpg"
                alt="ClinicPulse helping GLP-1 clinics improve patient engagement"
                className="w-full h-[560px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            <div className="glass-card rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="/mission-image.png"
                alt="ClinicPulse Mission"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-5">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Our Mission
            </p>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Helping every GLP-1 clinic
              <br />
              <span className="gradient-text">
                keep more patients engaged throughout treatment.
              </span>
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-400">
              We believe every patient deserves consistent support throughout
              their treatment journey. Our mission is to help clinics deliver
              proactive, personalized follow-up through intelligent
              automation—improving patient retention while reducing the
              administrative burden on care teams.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Values */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Values
            </p>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              The principles behind
              <br />
              <span className="gradient-text">everything we build.</span>
            </h2>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Every product decision is guided by a simple philosophy: build
              software that helps clinics deliver better care, protects patient
              trust, and makes everyday workflows simpler—not more complicated.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => {
              const Icon = v.icon;

              return (
                <div
                  key={v.title}
                  className="glass-card rounded-2xl p-7 hover:border-teal-500/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5 text-teal-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">
                    {v.title}
                  </h3>

                  <p className="text-slate-400 leading-7">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Security & Privacy */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Lock className="h-3.5 w-3.5 mr-2" />
              Security & Privacy
            </p>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Protecting patient data
              <br />
              <span className="gradient-text">
                is built into everything we do.
              </span>
            </h2>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              Security isn't an afterthought—it's a core part of how ClinicPulse
              is designed. From authentication to data handling, every layer of
              the platform is built to help clinics manage patient information
              responsibly and confidently.
            </p>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="space-y-6">
              <p className="text-slate-400 leading-8">
                Healthcare organizations trust ClinicPulse with sensitive
                patient information, and we take that responsibility seriously.
                Our platform follows security-first engineering practices and a
                HIPAA-conscious approach to help support the privacy
                expectations of modern GLP-1 clinics.
              </p>

              <p className="text-slate-400 leading-8">
                As ClinicPulse continues to evolve, security and privacy remain
                foundational to every product decision, ensuring clinics can
                focus on delivering exceptional patient care with confidence.
              </p>

              {/* Optional image */}
              <div className="glass-card rounded-2xl overflow-hidden mt-8">
                <img
                  src="/security-dashboard.png"
                  alt="ClinicPulse Security"
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>

            {/* Right */}
            <div className="grid gap-5">
              {[
                {
                  icon: Lock,
                  title: "Encrypted Data",
                  desc: "Patient information is protected during transmission using industry-standard encryption protocols.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Authentication",
                  desc: "Modern authentication and session management help safeguard clinic accounts and reduce unauthorized access.",
                },
                {
                  icon: Target,
                  title: "Role-Based Access",
                  desc: "Each clinic controls who can view and manage patient information with permission-based access controls.",
                },
                {
                  icon: Heart,
                  title: "Privacy-First Design",
                  desc: "Every feature is designed with patient privacy and responsible data handling as a fundamental requirement.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="glass-card rounded-2xl p-6 hover:border-teal-500/20 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-teal-400" />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-slate-400 leading-7">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer-First Support */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageCircle className="h-3.5 w-3.5 mr-2" />
              Customer Support
            </p>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Support that helps your
              <br />
              <span className="gradient-text">clinic succeed.</span>
            </h2>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              We believe great software is only part of the experience.
              Responsive, knowledgeable support helps clinics get the most from
              ClinicPulse every step of the way.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <div className="glass-card rounded-2xl overflow-hidden">
                <img
                  src="/customer-support.jpg"
                  alt="ClinicPulse Customer Support"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <p className="text-slate-400 leading-8">
                Every clinic operates differently, which is why we focus on
                providing practical guidance—not scripted responses. Whether
                you're setting up your workflows, understanding a feature, or
                looking for best practices, our goal is to help you get value
                from ClinicPulse as quickly as possible.
              </p>

              <p className="text-slate-400 leading-8">
                Customer feedback also plays an important role in shaping the
                product. We continuously refine ClinicPulse based on the needs
                of the clinics we serve, ensuring the platform evolves alongside
                real-world healthcare workflows.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold text-white">
                    Responsive Assistance
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Get timely answers from people who understand the product
                    and your workflow.
                  </p>
                </div>

                <div className="glass-card rounded-xl p-5">
                  <h3 className="font-semibold text-white">
                    Built Around Feedback
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Customer insights help shape new features and continuous
                    product improvements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Vision */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="h-3.5 w-3.5 mr-2" />
              Our Vision
            </p>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Building the future of
              <br />
              <span className="gradient-text">
                patient engagement for modern clinics.
              </span>
            </h2>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              We envision a future where every clinic has the tools to identify
              patient disengagement early, strengthen long-term relationships,
              and deliver better outcomes through intelligent, proactive care.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div className="space-y-6">
              <p className="text-slate-400 leading-8">
                As healthcare continues to evolve, patient engagement will
                become just as important as treatment itself. ClinicPulse is
                being built to help clinics move beyond manual follow-ups toward
                intelligent systems that anticipate patient needs and support
                care teams every day.
              </p>

              <p className="text-slate-400 leading-8">
                Our long-term vision is to become the trusted engagement
                platform for GLP-1 clinics—helping providers improve retention,
                strengthen patient relationships, and make data-driven decisions
                with confidence.
              </p>
            </div>

            {/* Right */}
            <div className="glass-card rounded-3xl overflow-hidden">
              <img
                src="/vision-future.jpg"
                alt="The future of patient engagement"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-3xl px-8 py-16 md:px-16 text-center">
            <p className="brand-pill inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6">
              Get Started
            </p>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Give every patient
              <br />
              <span className="gradient-text">the follow-up they deserve.</span>
            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate-400">
              See how ClinicPulse helps GLP-1 clinics automate patient
              follow-up, identify disengagement early, and improve long-term
              retention—without adding extra work for your team.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/register")}
                className="gradient-button px-8 py-4 rounded-xl hover:scale-[1.02] transition-transform"
              >
                Start Free Trial
              </button>

              <button
                onClick={() => navigate("/book-demo")}
                className="border border-white/15 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                Book a Demo
              </button>
            </div>

            <p className="mt-8 text-sm text-slate-500">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AboutUs;
