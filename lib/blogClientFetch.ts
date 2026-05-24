import { extractBlogDetail, findBlogInListPayload } from "@/lib/blogApi";
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
 * Blog list — live API only (same backend as admin portal). No static JSON cache.
 */
export async function fetchBlogListClient(): Promise<unknown> {
  const urls = websiteApiUrlsForBrowser("/blog/list");
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
 * Blog detail — live API only (view endpoint + list fallback).
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
