import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import {
  fetchAllBlogIds,
  fetchBlogDetailById,
  pickBlogMetaFields,
} from "@/lib/blogApi";
import {
  getBlogCanonicalUrl,
  stripHtml,
  toAbsoluteImageUrl,
} from "@/lib/blogShare";

const CACHED_BLOG_IDS_PATH = path.join(
  process.cwd(),
  "data",
  "blog-build-ids.json"
);

function readCachedBlogIds(): string[] {
  try {
    const raw = fs.readFileSync(CACHED_BLOG_IDS_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map(String).filter((id) => id.trim().length > 0);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  let ids = await fetchAllBlogIds();
  if (ids.length === 0) {
    ids = readCachedBlogIds();
    if (ids.length > 0) {
      console.warn(
        `[blog] build: API returned no IDs — using ${ids.length} cached ID(s) from data/blog-build-ids.json`
      );
    }
  }
  if (ids.length === 0) {
    throw new Error(
      "Blog build failed: could not fetch blog list and no cached IDs in data/blog-build-ids.json."
    );
  }
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const detail = await fetchBlogDetailById(id);
  const canonical = getBlogCanonicalUrl(id);

  if (!detail) {
    return {
      title: "Blog | Traveling Partner",
      alternates: { canonical },
    };
  }

  const { title, description, coverImage } = pickBlogMetaFields(detail);
  const plainDescription = stripHtml(description).slice(0, 160);
  const image = toAbsoluteImageUrl(coverImage);

  return {
    title: `${title} | Traveling Partner`,
    description: plainDescription || "Read this article on Traveling Partner.",
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description: plainDescription,
      siteName: "Traveling Partner",
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: plainDescription,
      images: image ? [image] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailClient id={id} />;
}
