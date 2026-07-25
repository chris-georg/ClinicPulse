import { ArrowRight, BriefcaseBusiness, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer } from "../components/SiteChrome";
import { Seo } from "../components/Seo";

const studies = [
  {
    clinic: "SlimPath Wellness",
    title: "Reducing patient drop-off with automated follow-ups",
    description:
      "Learn how a growing GLP-1 clinic streamlined patient communication and identified at-risk patients earlier.",
    image: "/slimpath-wellness-dash.png",
  },
  {
    clinic: "Everwell Medical Weight Loss",
    title: "Keeping patients engaged beyond Month Two",
    description:
      "How automated check-ins helped staff stay ahead of patient disengagement.",
    image: "/Everwell-clinics.png",
  },
  {
    clinic: "Northstar Health",
    title: "Managing more patients without hiring more staff",
    description:
      "See how ClinicPulse simplified follow-ups and centralized patient communication.",
    image: "/Northstar-health.png",
  },
];

export default function CaseStudies() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
        <Seo
                 title="Case Studies"
                 description="How GLP-1 Clinics Improve Retention with ClinicPulse"
                 path="/case-studies"
                />
        <Nav />

      {/* Hero */}
      <section className="relative grid-pattern border-b border-white/5">
  <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />

  <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
    <div className="flex items-center gap-2 text-xs font-medium text-teal-400 mb-5">
      <BriefcaseBusiness className="w-3.5 h-3.5" />
      <span>CASE STUDIES</span>
    </div>

    <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
      See how GLP-1 clinics{" "}
      <span className="gradient-text">
        improve retention with ClinicPulse
      </span>
    </h1>

    <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mb-8">
      Explore real examples of independent clinics reducing patient drop-offs,
      streamlining follow-ups, and improving long-term treatment adherence
      through automated retention workflows.
    </p>

    <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
      <span className="flex items-center gap-1.5">
        <Users className="w-4 h-4" />
        Real clinic success stories
      </span>

      <span className="hidden sm:inline">•</span>

      <span>Independent GLP-1 practices</span>
    </div>
  </div>
</section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6">

        <div className="glass-card rounded-3xl overflow-hidden lg:grid lg:grid-cols-2">

          <img
            src="/primecare-medical-case.png"
            alt="Featured Case Study"
            className="w-full h-full object-cover min-h-[350px]"
          />

          <div className="p-10">

            <p className="text-sm brand-text font-semibold">
              Featured Case Study
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              PrimeCare Medical
            </h2>

            <p className="mt-6 text-slate-400 leading-8">
              Discover how a fast-growing GLP-1 clinic transformed patient
              retention by automating follow-ups and identifying disengaged
              patients before they quietly dropped out.
            </p>

            <button
              className="gradient-button rounded-xl px-6 py-3 mt-10 inline-flex items-center gap-2"
            >
              Read Case Study
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </section>

      {/* Grid */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <h2 className="text-3xl font-bold text-center">
          More Customer Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {studies.map((study) => (
            <div
              key={study.clinic}
              className="glass-card rounded-2xl overflow-hidden group"
            >

              <img
                src={study.image}
                alt={study.clinic}
                className="h-56 w-full object-cover"
              />

              <div className="p-7">

                <p className="brand-text text-sm font-semibold">
                  {study.clinic}
                </p>

                <h3 className="mt-3 text-xl font-semibold">
                  {study.title}
                </h3>

                <p className="mt-4 text-slate-400 leading-7">
                  {study.description}
                </p>

                <button className="mt-8 inline-flex items-center gap-2 brand-text font-medium">
                  Read Story
                  <ArrowRight size={17} />
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-5xl mx-auto px-6 pb-28">

        <div className="glass-card rounded-3xl p-16 text-center">

          <h2 className="text-4xl font-bold">
            Ready to write your own success story?
          </h2>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
            Join GLP-1 clinics using ClinicPulse to automate patient follow-ups,
            detect dropout risk, and improve retention.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="gradient-button rounded-xl px-8 py-4 mt-10"
          >
            Start Free Trial
          </button>

        </div>

      </section>

      <Footer />
    </main>
  );
}