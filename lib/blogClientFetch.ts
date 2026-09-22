import {
  extractBlogDetail,
  fetchFeaturedBlogPages,
  fetchPublishedBlogHead,
  fetchPublishedBlogPages,
  blogDetailApiUrl,
  legacyBlogDetailApiUrl,
  findBlogInListPayload,
} from "@/lib/blogApi";
import { isValidBlogId } from "@/lib/isValidBlogId";

async function fetchJsonUrl(url: string): Promise<unknown> {
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`${url} → ${response.status}`);
  }
  return response.json();
}

function publishedDetail(
  detail: Record<string, unknown> | null
): Record<string, unknown> | null {
  if (!detail) return null;
  const status = String(detail.status ?? "").trim().toUpperCase();
  if (status && status !== "PUBLISHED") return null;
  return detail;
}

/** Published blog list — public /website/blog/list first (no admin getAll 401). */
export async function fetchBlogListClient(search = ""): Promise<unknown> {
  const content = await fetchPublishedBlogPages(search);
  return { success: true, data: { content } };
}

/** First page of the published list, for the listing's first paint. */
export async function fetchBlogListHeadClient(search = ""): Promise<unknown> {
  const content = await fetchPublishedBlogHead(search);
  return { success: true, data: { content } };
}

/** Featured blogs — GET /api/website/blog/featured. Empty on failure; no published-list fallback. */
export async function fetchFeaturedBlogListClient(): Promise<unknown> {
  const content = await fetchFeaturedBlogPages();
  return { success: true, data: { content } };
}

/**
 * Blog detail — prefers GET /api/blog/getById, then public /website/blog/view,
 * then the published list item (list payloads also include `faqs`).
 */
export async function fetchBlogDetailClient(
  routeId: string,
  idCandidates: string[]
): Promise<Record<string, unknown> | null> {
  if (!isValidBlogId(routeId)) return null;

  for (const candidateId of idCandidates) {
    if (!isValidBlogId(candidateId) && /^-?\d/.test(candidateId)) continue;
    for (const url of [
      legacyBlogDetailApiUrl(candidateId),
      blogDetailApiUrl(candidateId),
    ]) {
      try {
        const json = await fetchJsonUrl(url);
        const detail = publishedDetail(extractBlogDetail(json));
        if (detail) return detail;
      } catch {
        /* try next URL / candidate */
      }
    }
  }

  try {
    const listPayload = await fetchBlogListClient();
    const fromList = publishedDetail(
      findBlogInListPayload(listPayload, routeId)
    );
    if (fromList) return fromList;
  } catch {
    /* ignore */
  }

  return null;
}
