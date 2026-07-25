import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );

  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("published", true);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const staticUrls = [
    "",
    "/pricing",
    "/resources/blog",
    "/patient-retention-guide",
  ];

  const base = "https://clinicpulse.cc.cd";

  const urls = [
    ...staticUrls.map(
      (path) => `<url><loc>${base}${path}</loc></url>`
    ),
    ...(posts ?? []).map(
      (p) => `
        <url>
          <loc>${base}/resources/blog/${p.slug}</loc>
          <lastmod>${p.updated_at?.split("T")[0] ?? ""}</lastmod>
        </url>`
    ),
  ].join("");

  res.setHeader("Content-Type", "application/xml");

  return res.status(200).send(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
  );
}