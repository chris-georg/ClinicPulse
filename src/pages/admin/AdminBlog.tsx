import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Trash2, Pencil, Plus, ArrowLeft, Eye, EyeOff } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  read_time: string;
  created_at: string;
};

const CATEGORIES = ["Patient Retention", "Clinic Operations", "Clinical Notes", "Building in Public"];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const emptyForm = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: CATEGORIES[0],
  published: false,
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setSlugTouched(false);
  };

  const loadForEdit = (post: BlogPost) => {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      category: post.category,
      published: post.published,
    });
    setSlugTouched(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTitleChange = (value: string) => {
    setForm((f) => ({ ...f, title: value, slug: slugTouched ? f.slug : slugify(value) }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim() || !form.content.trim()) {
      alert("Title, slug, and content are required.");
      return;
    }
    setSaving(true);
    const readTime = `${Math.max(1, Math.round(form.content.split(/\s+/).length / 200))} min`;
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,
      category: form.category,
      published: form.published,
      read_time: readTime,
      updated_at: new Date().toISOString(),
    };

    const result = form.id
      ? await supabase.from("blog_posts").update(payload).eq("id", form.id)
      : await supabase.from("blog_posts").insert(payload);

    setSaving(false);
    if (result.error) return alert(result.error.message);
    resetForm();
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post? This can't be undone.")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return alert(error.message);
    fetchPosts();
  };

  const togglePublished = async (post: BlogPost) => {
    await supabase.from("blog_posts").update({ published: !post.published }).eq("id", post.id);
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>
          <span className="text-sm font-semibold text-slate-300">Blog Admin</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold mb-6">{form.id ? "Edit post" : "New post"}</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Title</label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Why 47% of GLP-1 Patients Never Make It to Month 3"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/30"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                  }}
                  placeholder="why-47-percent-of-glp1-patients..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/30"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-slate-900">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={2}
                placeholder="One or two sentences shown on the blog list page"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/30 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">Content (Markdown)</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={16}
                placeholder={"## A heading\n\nWrite the post here. **Bold**, *italic*, and [links](https://example.com) all work."}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm font-mono leading-relaxed focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/30 resize-y"
              />
            </div>

            <label className="flex items-center gap-2.5 text-sm text-slate-300 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="w-4 h-4 rounded accent-teal-400"
              />
              Published (visible on the public blog)
            </label>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="gradient-bg rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving…" : form.id ? "Update post" : "Create post"}
              </button>
              {form.id && (
                <button onClick={resetForm} className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2.5">
                  Cancel edit
                </button>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">All posts ({posts.length})</h2>
            {form.id && (
              <button onClick={resetForm} className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                New post
              </button>
            )}
          </div>

          {loading ? (
            <p className="text-sm text-slate-500">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-slate-500">No posts yet. Create your first one above.</p>
          ) : (
            <div className="space-y-2.5">
              {posts.map((post) => (
                <div key={post.id} className="glass-card rounded-xl px-5 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${post.published ? "bg-teal-500/10 text-teal-400" : "bg-slate-500/10 text-slate-400"}`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                      <span className="text-xs text-slate-600">{post.category}</span>
                    </div>
                    <p className="text-sm font-medium truncate">{post.title}</p>
                    <p className="text-xs text-slate-600 font-mono truncate">/{post.slug}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => togglePublished(post)} title={post.published ? "Unpublish" : "Publish"} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                      {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => loadForEdit(post)} title="Edit" className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(post.id)} title="Delete" className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}