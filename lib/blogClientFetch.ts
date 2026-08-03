import {
  BLOG_LIST_STATIC_PATH,
  extractBlogDetail,
  findBlogInListPayload,
} from "@/lib/blogApi";
import { websiteApiUrlsForBrowser } from "@/lib/websiteApiUrl";

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

/**
 * Blog list — production API first, then same-origin snapshot.
 *
 * Staging hosts get 403 from api.traveling-partner.com (CORS), so
 * /blog-list.json (generated at build from that API) keeps blogs visible.
 * Never calls /website/* on the staging domain.
 */
export async function fetchBlogListClient(): Promise<unknown> {
  const urls = [
    ...websiteApiUrlsForBrowser("/blog/list"),
    BLOG_LIST_STATIC_PATH,
  ];
  const errors: string[] = [];

  for (const url of urls) {
    try {
      const data = await fetchJsonUrl(url);
      return data;
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  throw new Error(
    `Could not load blogs from live API. ${errors.join("; ")}`
  );
}

/**
 * Blog detail — production API first, then static snapshot / list fallback.
 */
export async function fetchBlogDetailClient(
  routeId: string,
  idCandidates: string[]
): Promise<Record<string, unknown> | null> {
  for (const candidateId of idCandidates) {
    for (const base of websiteApiUrlsForBrowser(
      `/blog/view/${encodeURIComponent(candidateId)}`
    )) {
      try {
        const json = await fetchJsonUrl(base);
        const detail = extractBlogDetail(json);
        if (detail) return detail;
      } catch {
        /* try next URL */
      }
    }

    try {
      const staticDetail = await fetchJsonUrl(
        `/blog-data/${encodeURIComponent(candidateId)}.json`
      );
      const detail = extractBlogDetail(staticDetail);
      if (detail) return detail;
    } catch {
      /* try next */
    }
  }

  try {
    const listJson = await fetchBlogListClient();
    const fromList = findBlogInListPayload(listJson, routeId);
    if (fromList) return fromList;
  } catch {
    /* list unavailable */
  }

  return null;
}
