/**
 * Shared blog list URL + response parsing for build-time static paths and client fetch.
 */
import { websiteApiUrl } from "@/lib/websiteApiUrl";
/** Public list endpoint (no auth) — used as build-time fallback when env URL fails. */
export const BLOG_LIST_PUBLIC_URL =
  "https://api.traveling-partner.com/api/website/blog/list";

function envBaseToBlogListUrl(base: string): string {
  const normalized = base.replace(/\/$/, "");
  if (normalized.endsWith("/api")) {
    return `${normalized}/website/blog/list`;
  }
  return `${normalized}/api/website/blog/list`;
}

export const BLOG_LIST_API_URL =
  process.env.BLOG_LIST_URL?.trim() ||
  (process.env.NEXT_PUBLIC_API_URL?.trim()
    ? envBaseToBlogListUrl(process.env.NEXT_PUBLIC_API_URL)
    : "") ||
  (process.env.NEXT_PUBLIC_API_BASE_URL?.trim()
    ? envBaseToBlogListUrl(process.env.NEXT_PUBLIC_API_BASE_URL)
    : "") ||
  BLOG_LIST_PUBLIC_URL;

function blogListUrlsToTry(): string[] {
  return [...new Set([BLOG_LIST_API_URL, BLOG_LIST_PUBLIC_URL].filter(Boolean))];
}

/** Browser: same-origin `/website` proxy in dev, direct API on production. Server/build: env + public fallback. */
export function getBlogListFetchUrl(): string {
  if (typeof window !== "undefined") {
    return websiteApiUrl("/blog/list");
  }
  return BLOG_LIST_API_URL;
}

export const extractBlogList = (payload: unknown): Record<string, unknown>[] => {
  const p = payload as Record<string, unknown>;
  const data = p?.data as Record<string, unknown> | unknown[] | undefined;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const content = (data as Record<string, unknown>).content;
    if (Array.isArray(content)) return content as Record<string, unknown>[];
  }
  if (Array.isArray(data)) return data as Record<string, unknown>[];
  if (Array.isArray(payload)) return payload as Record<string, unknown>[];
  const nested = (data as Record<string, unknown> | undefined)?.data;
  if (Array.isArray(nested)) return nested as Record<string, unknown>[];
  const blogs = (data as Record<string, unknown> | undefined)?.blogs;
  if (Array.isArray(blogs)) return blogs as Record<string, unknown>[];
  return [];
};

export const getBlogIdFromItem = (item: Record<string, unknown>): string => {
  const raw =
    item?.id ??
    item?.blog_id ??
    item?.blogId ??
    item?.website_blog_id ??
    item?.websiteBlogId;
  return raw != null && String(raw).trim() !== "" ? String(raw) : "";
};

/** Fetch all blog ids for `generateStaticParams` at build time. */
export async function fetchAllBlogIds(): Promise<string[]> {
  for (const url of blogListUrlsToTry()) {
    try {
      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        console.warn(`[blog] list API ${url} → ${response.status}`);
        continue;
      }
      const json = await response.json();
      const ids = extractBlogList(json)
        .map(getBlogIdFromItem)
        .filter((id) => id.length > 0);
      if (ids.length > 0) {
        console.log(`[blog] generateStaticParams (${ids.length}): ${ids.join(", ")}`);
        return ids;
      }
    } catch (err) {
      console.warn(`[blog] list API ${url} failed:`, err);
    }
  }
  console.error("[blog] generateStaticParams: no blog ids — deploy will 404 on /blog/[id]");
  return [];
}
