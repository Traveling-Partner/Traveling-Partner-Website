import { extractBlogDetail } from "@/lib/blogApi";
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

async function fetchLiveApi(path: string): Promise<unknown> {
  const urls = websiteApiUrlsForBrowser(path);
  const errors: string[] = [];

  for (const url of urls) {
    try {
      return await fetchJsonUrl(url);
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  throw new Error(`Live API failed for ${path}. ${errors.join("; ")}`);
}

/** Blog list — live production API only (no static JSON). */
export async function fetchBlogListClient(): Promise<unknown> {
  return fetchLiveApi("/blog/list");
}

/** Blog detail — live `/blog/view/:id` only (no static JSON / list snapshot). */
export async function fetchBlogDetailClient(
  _routeId: string,
  idCandidates: string[]
): Promise<Record<string, unknown> | null> {
  for (const candidateId of idCandidates) {
    try {
      const json = await fetchLiveApi(
        `/blog/view/${encodeURIComponent(candidateId)}`
      );
      const detail = extractBlogDetail(json);
      if (detail) return detail;
    } catch {
      /* try next candidate */
    }
  }

  return null;
}
