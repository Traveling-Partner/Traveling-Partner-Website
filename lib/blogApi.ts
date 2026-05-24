import {
  getWebsiteApiBase,
  PUBLIC_WEBSITE_API_BASE,
  websiteApiUrlsForBrowser,
} from "@/lib/websiteApiUrl";

/** @deprecated Use blogListApiUrl() — kept for backward compatibility. */
export const BLOG_LIST_URL = `${PUBLIC_WEBSITE_API_BASE}/blog/list`;

/** Build-time snapshot path only (not used by client UI). */
export const BLOG_LIST_STATIC_PATH = "/blog-list.json";

/** @deprecated Build artifact only — client uses live API via blogClientFetch. */
export function blogDataStaticPath(id: string): string {
  return `/blog-data/${encodeURIComponent(id)}.json`;
}

/** Live list URL from env (same base as admin portal). */
export function blogListApiUrl(): string {
  return `${getWebsiteApiBase()}/blog/list`;
}

/** @deprecated Use websiteApiUrlsForBrowser — kept for backward compatibility. */
export function blogListUrlForRuntime(): string {
  return websiteApiUrlsForBrowser("/blog/list")[0];
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
    const response = await fetch(
      `${getWebsiteApiBase()}/blog/view/${encodeURIComponent(id)}`,
      { method: "GET", cache: "no-store", headers: { Accept: "application/json" } }
    );
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
    item.mainTitle ?? item.main_title ?? item.title ?? "Traveling Partner Blog"
  );
  const description = String(
    item.description1 ?? item.description ?? item.short_description ?? ""
  ).trim();
  const coverImage = String(
    item.coverImage ?? item.cover_image ?? item.image ?? ""
  ).trim();
  return { id, title, description, coverImage };
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

export async function fetchAllBlogIds(): Promise<string[]> {
  try {
    const response = await fetch(blogListApiUrl(), {
      method: "GET",
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      console.warn(`[blog] build: list API returned ${response.status}`);
      return [];
    }
    const json = await response.json();
    const ids = extractBlogList(json)
      .map(getBlogIdFromItem)
      .filter((id) => id.length > 0);
    console.log(`[blog] generateStaticParams (${ids.length}): ${ids.join(", ")}`);
    return ids;
  } catch (err) {
    console.warn("[blog] build: failed to fetch blog list", err);
    return [];
  }
}
