import { Helmet } from "react-helmet-async";

const SITE_NAME = "ClinicPulse";
const SITE_URL = "https://clinicpulse.cc.cd";
const DEFAULT_DESCRIPTION =
  "ClinicPulse helps independent GLP-1 clinics catch patient drop-off before it happens — automated check-ins, dropout risk detection, and real-time alerts.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`; // swap for a real 1200x630 social image once you have one

type ArticleData = {
  publishedTime: string; // ISO string
  modifiedTime?: string; // ISO string
  category?: string;
};

type SeoProps = {
  title: string; // page-specific title, e.g. "Blog" or the post title — SITE_NAME is appended automatically
  description?: string;
  path?: string; // e.g. "/resources/blog/my-post" — defaults to "/"
  type?: "website" | "article";
  image?: string;
  article?: ArticleData; // only pass this for blog post pages
  noindex?: boolean; // for pages like /admin/blog that shouldn't be indexed
};

export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  type = "website",
  image = DEFAULT_IMAGE,
  article,
  noindex = false,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        image,
        url,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime || article.publishedTime,
        ...(article.category && { articleSection: article.category }),
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/home-logo.png` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }
    : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.category && <meta property="article:section" content={article.category} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}