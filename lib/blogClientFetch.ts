import {
  extractBlogDetail,
  fetchPublishedBlogPages,
  blogDetailApiUrl,
  legacyBlogDetailApiUrl,
  findBlogInListPayload,
} from "@/lib/blogApi";

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

/** Published blog list — prefers GET /api/blog/getAll, falls back to /website/blog/list. */
export async function fetchBlogListClient(): Promise<unknown> {
  const content = await fetchPublishedBlogPages();
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
  for (const candidateId of idCandidates) {
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
