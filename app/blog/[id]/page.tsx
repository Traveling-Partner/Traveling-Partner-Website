import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import {
  extractBlogList,
  fetchAllBlogIds,
  fetchBlogDetailById,
  getBlogIdFromItem,
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
const BLOG_LIST_CACHE_PATH = path.join(
  process.cwd(),
  "data",
  "blog-list-cache.json"
);
const PUBLIC_BLOG_LIST_PATH = path.join(
  process.cwd(),
  "public",
  "blog-list.json"
);

function readIdArrayFile(filePath: string): string[] {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map(String).filter((id) => id.trim().length > 0);
  } catch {
    return [];
  }
}

function readIdsFromListPayloadFile(filePath: string): string[] {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return extractBlogList(parsed)
      .map(getBlogIdFromItem)
      .filter((id) => id.length > 0);
  } catch {
    return [];
  }
}

/** All known blog IDs for static export (API + cache files). */
function collectAllBlogIdsForBuild(apiIds: string[]): string[] {
  const merged = new Set<string>([
    ...apiIds,
    ...readIdArrayFile(CACHED_BLOG_IDS_PATH),
    ...readIdsFromListPayloadFile(BLOG_LIST_CACHE_PATH),
    ...readIdsFromListPayloadFile(PUBLIC_BLOG_LIST_PATH),
  ]);
  return [...merged];
}

export async function generateStaticParams() {
  const apiIds = await fetchAllBlogIds();
  const ids = collectAllBlogIdsForBuild(apiIds);

  if (apiIds.length === 0 && ids.length > 0) {
    console.warn(
      `[blog] build: API returned no IDs — using ${ids.length} ID(s) from cache files`
    );
  }

  if (ids.length === 0) {
    throw new Error(
      "Blog build failed: no blog IDs from API or data/blog-list-cache.json. Run: node scripts/generate-blog-static-data.mjs --public-only"
    );
  }

  console.log(`[blog] generateStaticParams: ${ids.join(", ")}`);
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
