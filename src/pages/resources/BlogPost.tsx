import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock } from "lucide-react";
import { Nav, Footer } from "../../components/SiteChrome";
import { Seo } from "../../components/Seo";
import { supabase } from "../../lib/supabase";

type Post = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
  read_time: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("title, excerpt, content, category, created_at, updated_at, read_time")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      if (!data) setNotFound(true);
      else setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (notFound) return <Navigate to="/resources/blog" replace />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {post && (
        <Seo
          title={post.title}
          description={post.excerpt}
          path={`/resources/blog/${slug}`}
          type="article"
          article={{
            publishedTime: post.created_at,
            modifiedTime: post.updated_at,
            category: post.category,
          }}
        />
      )}
      <Nav />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <Link to="/resources/blog" className="text-sm text-slate-400 hover:text-white flex items-center gap-1.5 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : post ? (
          <>
            <span className="text-xs font-medium text-teal-400 bg-teal-500/10 rounded-full px-2.5 py-1">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-5 mb-4 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-10">
              <span>{formatDate(post.created_at)}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.read_time}
              </span>
            </div>
            <div className="prose prose-invert prose-teal max-w-none prose-headings:font-bold prose-a:text-teal-400 prose-strong:text-white">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </div>
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}