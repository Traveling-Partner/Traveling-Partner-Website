import { blogApiUrl, PUBLIC_BLOG_API_BASE } from "@/lib/websiteApiUrl";
import { stripHtml } from "@/lib/blogShare";
import { normalizeStringList } from "@/lib/blogFormat";

/** @deprecated Use blogListApiUrl() — kept for backward compatibility. */
export const BLOG_LIST_URL = `${PUBLIC_BLOG_API_BASE}/getAll?page=0&size=10&search=&status=PUBLISHED`;

/** Build-time OG snapshot only — client UI never reads this. */
export const BLOG_LIST_STATIC_PATH = "/blog-list.json";

const LIST_PAGE_SIZE = 10;

/** @deprecated Build artifact only — client always uses the live view API. */
export function blogDataStaticPath(id: string): string {
  return `/blog-data/${encodeURIComponent(id)}.json`;
}

/** Live published list URL. */
export function blogListApiUrl(page = 0, size = LIST_PAGE_SIZE, search = ""): string {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    search,
    status: "PUBLISHED",
  });
  return blogApiUrl(`/getAll?${params.toString()}`);
}

export function blogDetailApiUrl(id: string): string {
  return blogApiUrl(`/getById/${encodeURIComponent(id)}`);
}

/** @deprecated Use blogListApiUrl — kept for backward compatibility. */
export function blogListUrlForRuntime(): string {
  return blogListApiUrl();
}

export function findBlogInListPayload(
  payload: unknown,
  routeId: string
): Record<string, unknown> | null {
  const normalize = (value: unknown) =>
    String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  const candidates = new Set(
    [routeId, decodeURIComponent(routeId), String(Number(routeId))]
      .filter((value) => value && value !== "NaN")
      .map(normalize)
  );

  return (
    extractBlogList(payload).find((item) => {
      const possible = [
        item.id,
        item.blog_id,
        item.blogId,
        item.website_blog_id,
        item.websiteBlogId,
        item.slug,
        item.title,
        item.main_title,
        item.mainTitle,
      ].map(normalize);
      return possible.some((value) => candidates.has(value));
    }) ?? null
  );
}

export const extractBlogDetail = (payload: unknown): Record<string, unknown> | null => {
  const p = payload as Record<string, unknown>;
  if (!p) return null;
  if (p.success === false) return null;
  const data = p.data as Record<string, unknown> | undefined;
  if (data?.data && typeof data.data === "object" && !Array.isArray(data.data)) {
    return data.data as Record<string, unknown>;
  }
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data;
  }
  if (p.blog && typeof p.blog === "object") return p.blog as Record<string, unknown>;
  if (data?.blog && typeof data.blog === "object") return data.blog as Record<string, unknown>;
  if (typeof p === "object" && !Array.isArray(p)) return p;
  return null;
};

export async function fetchBlogDetailById(
  id: string
): Promise<Record<string, unknown> | null> {
  try {
    const response = await fetch(blogDetailApiUrl(id), {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const json = await response.json();
    return extractBlogDetail(json);
  } catch {
    return null;
  }
}

export function pickBlogMetaFields(item: Record<string, unknown>) {
  const id = getBlogIdFromItem(item);
  const title = String(
    item.seoTitle ||
      item.mainTitle ||
      item.main_title ||
      item.title ||
      "Traveling Partner Blog"
  ).trim();
  const description = String(
    item.seoDescription ||
      item.description1 ||
      item.description ||
      item.short_description ||
      ""
  ).trim();
  const coverImage = String(
    item.coverImage ?? item.cover_image ?? item.image ?? ""
  ).trim();
  const keywords = [
    ...normalizeStringList(item.primaryKeywords),
    ...normalizeStringList(item.secondaryKeywords),
    ...normalizeStringList(item.semanticKeywords),
  ];
  return { id, title, description: stripHtml(description), coverImage, keywords };
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

export async function fetchPublishedBlogPages(): Promise<
  Record<string, unknown>[]
> {
  const all: Record<string, unknown>[] = [];
  let page = 0;
  let totalPages = 1;
  const maxPages = 50;

  while (page < totalPages && page < maxPages) {
    const response = await fetch(blogListApiUrl(page, LIST_PAGE_SIZE, ""), {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      throw new Error(`${blogListApiUrl(page)} → ${response.status}`);
    }
    const json = await response.json();
    const items = extractBlogList(json).filter((item) => {
      const status = String(item.status ?? "").trim().toUpperCase();
      return !status || status === "PUBLISHED";
    });
    all.push(...items);
    const data = (json?.data ?? {}) as Record<string, unknown>;
    const reportedPages = Number(data.totalPages);
    if (Number.isFinite(reportedPages) && reportedPages > 0) {
      totalPages = reportedPages;
    } else if (items.length < LIST_PAGE_SIZE) {
      totalPages = page + 1;
    } else {
      totalPages = page + 2;
    }
    if (items.length === 0) break;
    page += 1;
  }

  return all;
}

export async function fetchAllBlogIds(): Promise<string[]> {
  try {
    const items = await fetchPublishedBlogPages();
    const ids = items
      .map(getBlogIdFromItem)
      .filter((id) => id.length > 0);
    console.log(`[blog] generateStaticParams (${ids.length}): ${ids.join(", ")}`);
    return ids;
  } catch (err) {
    console.warn("[blog] build: failed to fetch blog list", err);
    return [];
  }
}
