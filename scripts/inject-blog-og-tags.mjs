/**
 * After `next build`, inject Open Graph / Twitter / JSON-LD into each blog/*.html
 * so LinkedIn, Facebook, WhatsApp show rich previews (image + title + description).
 */
import fs from "fs";
import path from "path";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://traveling-partner.com"
).replace(/\/$/, "");
const API_BASE = "https://api.traveling-partner.com/api/website";
const OUT_BLOG = path.join(process.cwd(), "out", "blog");
const OUT_BLOG_DATA = path.join(process.cwd(), "out", "blog-data");
const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/duubabjk7/image/upload/v1715253815/tp-Imgs/logo/Footer-logo_hyzuc1.png";

function extractBlogRecord(payload) {
  if (!payload || payload.success === false) return null;
  const data = payload.data;
  if (data?.data && typeof data.data === "object" && !Array.isArray(data.data)) {
    return data.data;
  }
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data;
  }
  if (payload.blog && typeof payload.blog === "object") return payload.blog;
  return null;
}

function readStaticBlog(id) {
  const filePath = path.join(OUT_BLOG_DATA, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    return extractBlogRecord(JSON.parse(fs.readFileSync(filePath, "utf8")));
  } catch {
    return null;
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeJson(value) {
  return JSON.stringify(String(value)).slice(1, -1);
}

function stripHtml(value) {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function imageMimeType(url) {
  const lower = url.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

async function fetchBlog(id) {
  const fromStatic = readStaticBlog(id);
  if (fromStatic) return fromStatic;

  try {
    const res = await fetch(`${API_BASE}/blog/view/${encodeURIComponent(id)}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return extractBlogRecord(json);
  } catch (err) {
    console.warn(
      `[inject-blog-og] fetch failed for blog ${id}:`,
      err instanceof Error ? err.message : err
    );
    return null;
  }
}

function buildSocialMetaBlock(blog, id) {
  const title = String(
    blog.mainTitle ?? blog.main_title ?? blog.title ?? "Traveling Partner Blog"
  );
  const description = stripHtml(
    blog.description1 ?? blog.description ?? blog.short_description ?? ""
  ).slice(0, 200);
  let image = String(
    blog.coverImage ?? blog.cover_image ?? blog.image ?? ""
  ).trim();
  if (!image.startsWith("http")) {
    image = DEFAULT_OG_IMAGE;
  }
  const url = `${SITE_URL}/blog/${id}`;
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(
    description || "Read this article on Traveling Partner."
  );
  const published = String(blog.date ?? blog.createdAt ?? "").slice(0, 10);

  let block = `
<meta property="og:type" content="article"/>
<meta property="og:url" content="${url}"/>
<meta property="og:title" content="${safeTitle}"/>
<meta property="og:description" content="${safeDesc}"/>
<meta property="og:site_name" content="Traveling Partner"/>
<meta property="og:locale" content="en_US"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@travelingpartner"/>
<meta name="twitter:title" content="${safeTitle}"/>
<meta name="twitter:description" content="${safeDesc}"/>
<title>${safeTitle} | Traveling Partner</title>
<meta name="description" content="${safeDesc}"/>
<link rel="canonical" href="${url}"/>`;

  if (published) {
    block += `
<meta property="article:published_time" content="${published}"/>
<meta property="article:author" content="Traveling Partner"/>`;
  }

  {
    const safeImg = escapeHtml(image);
    const mime = imageMimeType(image);
    block += `
<meta property="og:image" content="${safeImg}"/>
<meta property="og:image:secure_url" content="${safeImg}"/>
<meta property="og:image:url" content="${safeImg}"/>
<meta property="og:image:type" content="${mime}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="${safeTitle}"/>
<meta name="twitter:image" content="${safeImg}"/>
<meta name="twitter:image:alt" content="${safeTitle}"/>
<meta itemprop="image" content="${safeImg}"/>
<meta itemprop="name" content="${safeTitle}"/>
<meta itemprop="description" content="${safeDesc}"/>`;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description || "Read this article on Traveling Partner.",
    url,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: "Traveling Partner" },
    publisher: {
      "@type": "Organization",
      name: "Traveling Partner",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/duubabjk7/image/upload/v1715253815/tp-Imgs/logo/Footer-logo_hyzuc1.png",
      },
    },
    image: [image],
    ...(published ? { datePublished: published } : {}),
  };

  block += `
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

  return block;
}

function injectIntoHtml(html, metaBlock) {
  let next = html;
  next = next.replace(/<title>[\s\S]*?<\/title>/i, "");
  next = next.replace(/<meta\s+name="description"[^>]*>/i, "");
  next = next.replace(/<link\s+rel="canonical"[^>]*>/i, "");
  next = next.replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, "");
  next = next.replace(/<meta\s+property="article:[^"]+"[^>]*>/gi, "");
  next = next.replace(/<meta\s+property="og:image:[^"]+"[^>]*>/gi, "");
  next = next.replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, "");
  next = next.replace(/<meta\s+itemprop="[^"]+"[^>]*>/gi, "");
  next = next.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/gi,
    ""
  );

  if (!next.includes("<head>")) return html;
  return next.replace("<head>", `<head>${metaBlock}`);
}

async function main() {
  if (!fs.existsSync(OUT_BLOG)) {
    console.warn("[inject-blog-og] out/blog not found — skip");
    return;
  }

  const files = fs.readdirSync(OUT_BLOG).filter((f) => /^\d+\.html$/.test(f));
  let updated = 0;

  for (const file of files) {
    const id = file.replace(".html", "");
    const blog = await fetchBlog(id);
    if (!blog) {
      console.warn(`[inject-blog-og] no data for blog ${id}`);
      continue;
    }

    const filePath = path.join(OUT_BLOG, file);
    const html = fs.readFileSync(filePath, "utf8");
    const metaBlock = buildSocialMetaBlock(blog, id);
    const nextHtml = injectIntoHtml(html, metaBlock);
    fs.writeFileSync(filePath, nextHtml, "utf8");
    updated += 1;
    console.log(
      `[inject-blog-og] ${id}: ${blog.mainTitle ?? blog.main_title} → ${SITE_URL}/blog/${id}`
    );
  }

  console.log(`[inject-blog-og] updated ${updated} blog page(s)`);
  if (files.length > 0 && updated === 0) {
    console.warn(
      "[inject-blog-og] no pages updated (API may be unreachable); build continues."
    );
  }
}

main().catch((err) => {
  console.warn("[inject-blog-og] failed:", err.message || err);
  process.exit(0);
});

