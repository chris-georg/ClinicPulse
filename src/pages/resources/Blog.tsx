import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Mail } from "lucide-react";
import { Nav, Footer } from "../../components/SiteChrome";
import { supabase } from "../../lib/supabase";
import { Seo } from "../../components/Seo";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  created_at: string;
  read_time: string;
};

const CATEGORIES = ["All", "Patient Retention", "Clinic Operations", "Clinical Notes", "Building in Public"] as const;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, category, created_at, read_time")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const featured = posts[0];
  const rest = posts
    .slice(1)
    .filter((p) => activeCategory === "All" || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Seo
        title="Blog"
        description="Retention data, operating playbooks, and notes on running a cash-pay GLP-1 practice — from the team building ClinicPulse."
        path="/resources/blog"
      />
      <Nav />

      <section className="relative grid-pattern border-b border-white/5 pt-32 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-xs font-medium text-teal-400 mb-4 tracking-wide">THE CLINICPULSE BLOG</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-5 max-w-2xl">
            Notes on running a <span className="gradient-text">GLP-1 practice</span> that keeps its patients
          </h1>
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            Retention data, operating playbooks, and the occasional story from building ClinicPulse itself.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14">
        {loading ? (
          <p className="text-sm text-slate-500 text-center py-16">Loading posts…</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-16">
            No posts published yet.
          </p>
        ) : (
          <>
            {featured && (
              <Link
                to={`/resources/blog/${featured.slug}`}
                className="group glass-card rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6 mb-14 hover:border-teal-400/30 transition-colors"
              >
                <div className="flex-1">
                  <span className="text-xs font-medium text-teal-400 bg-teal-500/10 rounded-full px-2.5 py-1">
                    {featured.category}
                  </span>
                  <h2 className="text-2xl font-bold mt-4 mb-3 leading-snug group-hover:text-teal-300 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-4 max-w-lg">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>{formatDate(featured.created_at)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.read_time}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
              </Link>
            )}

            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                    activeCategory === c
                      ? "gradient-bg text-white border-transparent"
                      : "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  to={`/resources/blog/${post.slug}`}
                  className="glass-card rounded-xl p-6 hover:border-teal-400/30 transition-colors group flex flex-col"
                >
                  <span className="text-xs font-medium text-teal-400 bg-teal-500/10 rounded-full px-2.5 py-1 w-fit">
                    {post.category}
                  </span>
                  <h3 className="font-semibold mt-4 mb-2 leading-snug group-hover:text-teal-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span>{formatDate(post.created_at)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.read_time}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {rest.length === 0 && posts.length > 1 && (
              <p className="text-sm text-slate-500 text-center py-16">No posts in this category yet.</p>
            )}
          </>
        )}

        <div className="glass-card glow-teal rounded-2xl p-8 sm:p-10 text-center mt-16">
          <Mail className="w-7 h-7 text-teal-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">Get new posts by email</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
            One email when we publish something worth reading. No spam, unsubscribe anytime.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="you@clinic.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm placeholder:text-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/30"
            />
            <button
              type="submit"
              className="gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}