import {
  blogApiUrl,
  PUBLIC_BLOG_API_BASE,
  websiteApiUrl,
} from "@/lib/websiteApiUrl";
import { stripHtml } from "@/lib/blogShare";
import { normalizeStringList } from "@/lib/blogFormat";

/** @deprecated Use blogListApiUrl() — kept for backward compatibility. */
export const BLOG_LIST_URL = `${PUBLIC_BLOG_API_BASE}/getAll?page=1&size=10&search=&status=PUBLISHED`;

/** Build-time OG snapshot only — client UI never reads this. */
export const BLOG_LIST_STATIC_PATH = "/blog-list.json";

const LIST_PAGE_SIZE = 10;
/** One grid page on the blog listing. Load more asks for the next page. */
export const BLOG_GRID_PAGE_SIZE = 6;
/** One request large enough for the whole published catalogue. */
const CATALOGUE_SIZE = 200;

/** @deprecated Build artifact only — client always uses the live view API. */
export function blogDataStaticPath(id: string): string {
  return `/blog-data/${encodeURIComponent(id)}.json`;
}

/** Live published list URL. */
export function blogListApiUrl(page = 1, size = LIST_PAGE_SIZE, search = ""): string {
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

/** Public website list — used when CRM GET /api/blog/getAll returns 401. */
export function legacyBlogListApiUrl(
  page = 1,
  size = LIST_PAGE_SIZE,
  search = "",
  categoryName = ""
): string {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  const query = search.trim();
  if (query) params.set("search", query);
  const category = categoryName.trim();
  if (category && category.toLowerCase() !== "all") {
    params.set("categoryName", category);
  }
  return websiteApiUrl(`/blog/list?${params.toString()}`);
}

/** Public website detail — this is the envelope that includes `faqs`. */
export function legacyBlogDetailApiUrl(id: string): string {
  return websiteApiUrl(`/blog/view/${encodeURIComponent(id)}`);
}

/** Public featured list — GET /api/website/blog/featured (no auth). */
export function featuredBlogListApiUrl(
  page = 1,
  size = LIST_PAGE_SIZE
): string {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });
  return websiteApiUrl(`/blog/featured?${params.toString()}`);
}

export function isFeaturedBlogItem(item: Record<string, unknown>): boolean {
  return (
    item.isFeatured === true ||
    item.isFeatured === "true" ||
    item.isFeatured === 1
  );
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
  const urls = [legacyBlogDetailApiUrl(id), blogDetailApiUrl(id)];
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) continue;
      const json = await response.json();
      const detail = extractBlogDetail(json);
      if (detail) return detail;
    } catch {
      /* try next URL */
    }
  }
  return null;
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

/** Successful list only. A failed call does not read this. */
const LIST_CACHE_MS = 2 * 60 * 1000;

let publishedListCache: { at: number; items: Record<string, unknown>[] } | null =
  null;
let featuredListCache: { at: number; items: Record<string, unknown>[] } | null =
  null;
let featuredInflight: Promise<Record<string, unknown>[]> | null = null;

function readFreshListCache(
  entry: { at: number; items: Record<string, unknown>[] } | null
): Record<string, unknown>[] | null {
  if (!entry) return null;
  if (Date.now() - entry.at > LIST_CACHE_MS) return null;
  return entry.items;
}

async function fetchOneListPage(url: string): Promise<{
  items: Record<string, unknown>[];
  totalPages: number;
  totalElements: number;
  last: boolean;
}> {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${url} → ${response.status}`);
  }
  const json = await response.json();
  const items = extractBlogList(json).filter((item) => {
    const status = String(item.status ?? "").trim().toUpperCase();
    return !status || status === "PUBLISHED";
  });
  const data = (json?.data ?? {}) as Record<string, unknown>;
  const reportedPages = Number(data.totalPages);
  const reportedTotal = Number(data.totalElements);
  const totalPages = Number.isFinite(reportedPages)
    ? Math.max(0, reportedPages)
    : items.length > 0
      ? 1
      : 0;
  return {
    items,
    totalPages,
    totalElements: Number.isFinite(reportedTotal) ? reportedTotal : items.length,
    last: data.last === true,
  };
}

export type PublishedBlogPage = {
  items: Record<string, unknown>[];
  page: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
};

const listPageInflight = new Map<string, Promise<PublishedBlogPage>>();

/** One list page. Same query shares one request so a remount cannot fire it twice. */
export async function fetchPublishedBlogListPage(options?: {
  page?: number;
  size?: number;
  search?: string;
  categoryName?: string;
}): Promise<PublishedBlogPage> {
  const page = Math.max(1, options?.page ?? 1);
  const size = options?.size ?? BLOG_GRID_PAGE_SIZE;
  const search = options?.search?.trim() ?? "";
  const rawCategory = options?.categoryName?.trim() ?? "";
  const category =
    rawCategory && rawCategory.toLowerCase() !== "all" ? rawCategory : "";
  const key = `${page}|${size}|${search}|${category}`;
  const pending = listPageInflight.get(key);
  if (pending) return pending;

  const run = async (): Promise<PublishedBlogPage> => {
    const toPage = (
      loaded: Awaited<ReturnType<typeof fetchOneListPage>>
    ): PublishedBlogPage => ({
      items: uniqueByBlogId(loaded.items),
      page,
      totalPages: loaded.totalPages,
      totalElements: loaded.totalElements,
      last:
        loaded.last ||
        loaded.totalPages === 0 ||
        page >= loaded.totalPages ||
        loaded.items.length === 0,
    });
    try {
      return toPage(
        await fetchOneListPage(
          legacyBlogListApiUrl(page, size, search, category)
        )
      );
    } catch (err) {
      console.warn(
        "[blog] GET /api/website/blog/list unavailable; falling back to /api/blog/getAll",
        err
      );
      return toPage(await fetchOneListPage(blogListApiUrl(page, size, search)));
    }
  };

  const promise = run().finally(() => {
    listPageInflight.delete(key);
  });
  listPageInflight.set(key, promise);
  return promise;
}

function uniqueByBlogId(
  items: Record<string, unknown>[]
): Record<string, unknown>[] {
  const seen = new Set<string>();
  const unique: Record<string, unknown>[] = [];
  for (const item of items) {
    const id = getBlogIdFromItem(item);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    unique.push(item);
  }
  return unique;
}

export async function fetchPublishedBlogPages(
  search = ""
): Promise<Record<string, unknown>[]> {
  const query = search.trim();
  if (!query) {
    const fresh = readFreshListCache(publishedListCache);
    if (fresh) return fresh;
  }
  const load = async (url: string) =>
    uniqueByBlogId((await fetchOneListPage(url)).items);
  try {
    const items = await load(legacyBlogListApiUrl(1, CATALOGUE_SIZE, search));
    if (!query) publishedListCache = { at: Date.now(), items };
    return items;
  } catch (err) {
    console.warn(
      "[blog] GET /api/website/blog/list unavailable; falling back to /api/blog/getAll",
      err
    );
    const items = await load(blogListApiUrl(1, CATALOGUE_SIZE, search));
    if (!query) publishedListCache = { at: Date.now(), items };
    return items;
  }
}

/** First page only, so the listing can render before the rest of the catalogue arrives. */
export async function fetchPublishedBlogHead(
  search = ""
): Promise<Record<string, unknown>[]> {
  const query = search.trim();
  if (!query) {
    const fresh = readFreshListCache(publishedListCache);
    if (fresh) return fresh;
  }
  try {
    return (
      await fetchOneListPage(legacyBlogListApiUrl(1, LIST_PAGE_SIZE, search))
    ).items;
  } catch (err) {
    console.warn(
      "[blog] GET /api/website/blog/list page 1 unavailable; falling back to /api/blog/getAll",
      err
    );
    return (
      await fetchOneListPage(blogListApiUrl(1, LIST_PAGE_SIZE, search))
    ).items;
  }
}

/**
 * Featured blogs for the blog page featured section.
 * Public GET only — never falls back to all published posts.
 * Failures return [] so static export / generateStaticParams stay green.
 */
export async function fetchFeaturedBlogPages(): Promise<
  Record<string, unknown>[]
> {
  const fresh = readFreshListCache(featuredListCache);
  if (fresh) return fresh;
  if (featuredInflight) return featuredInflight;

  const run = async (): Promise<Record<string, unknown>[]> => {
    try {
      const url = featuredBlogListApiUrl(1, 50);
      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        console.warn(`[blog] GET /api/website/blog/featured → ${response.status}`);
        return [];
      }
      const json = await response.json();
      const items = extractBlogList(json).filter(isFeaturedBlogItem);
      featuredListCache = { at: Date.now(), items };
      return items;
    } catch (err) {
      console.warn("[blog] GET /api/website/blog/featured failed", err);
      return [];
    }
  };

  featuredInflight = run().finally(() => {
    featuredInflight = null;
  });
  return featuredInflight;
}

export async function fetchAllBlogIds(): Promise<string[]> {
  try {
    const items = await fetchPublishedBlogPages();
    const ids = items.map(getBlogIdFromItem).filter((id) => id.length > 0);
    if (ids.length > 0) {
      console.log(
        `[blog] generateStaticParams (${ids.length}): ${ids.join(", ")}`
      );
      return ids;
    }
  } catch (err) {
    console.warn("[blog] build: failed to fetch blog list", err);
  }

  console.warn(
    "[blog] generateStaticParams empty after API fallback — emitting placeholder route"
  );
  return ["preview"];
}
