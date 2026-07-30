import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, SquareArrowOutUpRight } from "lucide-react";

export function Logo() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={handleClick} className="flex items-center cursor-pointer">
      <img
        src="/home-logo.png"
        alt="ClinicPulse"
        className="h-29 w-auto object-contain"
        draggable={false}
      />
    </button>
  );
}

const RESOURCE_LINKS = [
  {
    href: "/patient-retention-guide",
    title: "Patient Retention Guide",
    body: "Why patients quit GLP-1s, and the window that decides it.",
  },
  {
    href: "/case-studies",
    title: "Case Studies",
    body: "How independent clinics use retention data day to day.",
  },
  {
    href: "/resources/blog",
    title: "Blog",
    body: "Notes on running a cash-pay GLP-1 practice.",
  },
  {
    href: "/about-us",
    title: "About Us",
    body: "Learn more about the team behind ClinicPulse.",
  },
];

const HELP_LINKS = [
  {
    href: "/help-center",
    title: "Help Center",
    body: "Answers on setup, automation, billing and more.",
  },
  {
    href: "/contact-support",
    title: "Contact Support",
    body: "Reach a real person, not a bot.",
  },
  {
    href: "/book-demo",
    title: "Book a Demo",
    body: "See ClinicPulse working with your patients.",
  },
  {
    href: "/system-status",
    title: "System Status",
    body: "Live status of check-ins, alerts and uptime.",
  },
  {
    href: "/#faq",
    title: "FAQ",
    body: "Frequently asked questions.",
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileHelpOpen, setMobileHelpOpen] = useState(false);
  const navigate = useNavigate();
  const resourcesRef = useRef<HTMLDivElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(e.target as Node)
      ) {
        setResourcesOpen(false);
      }
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setHelpOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setResourcesOpen(false);
        setHelpOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#how", label: "How It Works" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-slate-950/80 border-b border-white/5" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-300 brand-hover transition-colors"
            >
              {l.label}
            </a>
          ))}

          {/* Resources dropdown */}
          <div
            ref={resourcesRef}
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              onClick={() => setResourcesOpen((v) => !v)}
              className="text-sm text-slate-300 brand-hover transition-colors flex items-center gap-1"
            >
              Resources
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {resourcesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                <div className="w-[1180px] max-w-[calc(100vw-48px)] rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-10">
                  <div className="flex items-start gap-20">
                    <div className="w-[320px] shrink-0">
                      <img
                        src="/resources-cover.png"
                        alt="Resources"
                        className="h-48 w-full rounded-2xl object-cover"
                      />

                      <h3 className="mt-6 text-3xl font-bold text-white">
                        Resources
                      </h3>

                      <p className="mt-4 text-slate-400 leading-relaxed">
                        Guides, case studies and practical resources to help
                        GLP-1 clinics improve patient retention.
                      </p>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-x-16 gap-y-10">
                      {RESOURCE_LINKS.map((r) => (
                        <a
                          key={r.href}
                          href={r.href}
                          onClick={() => setResourcesOpen(false)}
                          className="group block"
                        >
                          <h4 className="text-xl font-semibold text-white group-hover:text-teal-300 transition-colors">
                            {r.title}
                          </h4>

                          <p className="mt-2 text-sm leading-7 text-slate-400">
                            {r.body}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help & Support dropdown */}
          <div
            ref={helpRef}
            className="relative"
            onMouseEnter={() => setHelpOpen(true)}
            onMouseLeave={() => setHelpOpen(false)}
          >
            <button
              onClick={() => setHelpOpen((v) => !v)}
              className="text-sm text-slate-300 brand-hover transition-colors flex items-center gap-1"
            >
              Help & Support
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${helpOpen ? "rotate-180" : ""}`}
              />
            </button>

            {helpOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                <div className="w-[1180px] max-w-[calc(100vw-48px)] rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/50 p-10">
                  <div className="flex items-start gap-20">
                    <div className="w-[320px] shrink-0">
                      <img
                        src="/help-cover.png"
                        alt="Help & Support"
                        className="h-48 w-full rounded-2xl object-cover"
                      />

                      <h3 className="mt-6 text-3xl font-bold text-white">
                        Help & Support
                      </h3>

                      <p className="mt-4 text-slate-400 leading-relaxed">
                        Everything you need to get help, book time with us, or
                        check that things are running smoothly.
                      </p>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-x-16 gap-y-10">
                      {HELP_LINKS.map((r) => (
                        <a
                          key={r.href}
                          href={r.href}
                          onClick={() => setHelpOpen(false)}
                          className="group block"
                        >
                          <div className="flex items-center gap-2">
                            <h4 className="text-xl font-semibold text-white group-hover:text-teal-300 transition-colors">
                              {r.title}
                            </h4>

                            {(r.title === "Help Center" ||
                              r.title === "Contact Support") && (
                              <SquareArrowOutUpRight className="h-4 w-4 text-teal-400 group-hover:text-teal-300 transition-colors" />
                            )}
                          </div>

                          <p className="mt-2 text-sm leading-7 text-slate-400">
                            {r.body}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="/pricing"
            className="text-sm text-slate-300 brand-hover transition-colors"
          >
            Pricing
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-slate-300 brand-hover transition-colors px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-sm font-semibold gradient-button px-4 py-2.5 rounded-xl hover:scale-[1.03] transition-transform"
          >
            Start Free Trial
          </button>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-slate-300 brand-hover"
            >
              {l.label}
            </a>
          ))}

          {/* Mobile Resources — expandable */}
          <div>
            <button
              onClick={() => setMobileResourcesOpen((v) => !v)}
              className="w-full flex items-center justify-between text-slate-300 brand-hover"
            >
              Resources
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileResourcesOpen && (
              <div className="mt-3 ml-3 space-y-3 border-l border-white/10 pl-4">
                {RESOURCE_LINKS.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    onClick={() => {
                      setOpen(false);
                      setMobileResourcesOpen(false);
                    }}
                    className="block text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {r.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Help & Support — expandable */}
          <div>
            <button
              onClick={() => setMobileHelpOpen((v) => !v)}
              className="w-full flex items-center justify-between text-slate-300 brand-hover"
            >
              Help & Support
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${mobileHelpOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileHelpOpen && (
              <div className="mt-3 ml-3 space-y-3 border-l border-white/10 pl-4">
                {HELP_LINKS.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    onClick={() => {
                      setOpen(false);
                      setMobileHelpOpen(false);
                    }}
                    className="block text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {r.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href="/pricing"
            onClick={() => setOpen(false)}
            className="block text-slate-300 brand-hover"
          >
            Pricing
          </a>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 text-sm text-slate-200 border border-[#1ED9C3]/20 hover:border-[#1ED9C3]/50 rounded-xl py-2.5"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex-1 text-sm font-semibold gradient-bg text-slate-950 rounded-xl py-2.5"
            >
              Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const cols = [
    {
      t: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/pricing" },
        { label: "How It Works", href: "/#how" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      t: "Company",
      links: [
        { label: "About us", href: "/about-us" },
        { label: "Blog", href: "/resources/blog" },
        { label: "Contact", href: "/contact-support" },
      ],
    },
    {
      t: "Solutions",
      links: [
        { label: "For GLP-1 Clinics", href: "#" },
        { label: "For Weight Loss Practices", href: "#" },
        { label: "For Telehealth Providers", href: "#" },
        { label: "For Multi-Location Clinics", href: "#" },
      ],
    },
    {
      t: "Resources",
      links: [
        { label: "Patient Retention Guide", href: "/patient-retention-guide" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Blog", href: "/resources/blog" },
        { label: "About us", href: "/about-us" },
      ],
    },
    {
      t: "Help & Support",
      links: [
        { label: "Help Center", href: "/help-center" },
        { label: "Contact Support", href: "/contact-support" },
        { label: "Book a Demo", href: "/book-demo" },
        { label: "System Status", href: "/system-status" },
      ],
    },
    {
      t: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "HIPAA Notice", href: "/hipaa" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-slate-950/60 py-16 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[320px_1fr] gap-12">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
            The patient retention platform for GLP-1 clinics.
          </p>
          <div className="mt-5 flex gap-3">
            {["X", "in", "TT"].map((s) => (
              <a
                key={s}
                href="#"
                className="h-9 w-9 rounded-lg glass-card flex items-center justify-center text-xs text-slate-300 hover:text-teal-300 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-12 gap-y-8">
          {cols.map((c) => (
            <div key={c.t} className="w-44">
              <p className="text-sm font-semibold text-white">{c.t}</p>

              <ul className="mt-4 space-y-2.5">
                {c.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Footer Brand Visual */}
          <div className="w-70 flex items-center justify-end">
            <img
              src="/hipaaa.png"
              alt="ClinicPulse"
              className="w-36 opacity-430"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-3 justify-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} ClinicPulse. All rights reserved.</p>
      </div>
    </footer>
  );
}
