import { extractBlogDetail, fetchPublishedBlogPages, blogDetailApiUrl } from "@/lib/blogApi";

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

/** Published blog list — GET /api/blog/getAll (paginated). */
export async function fetchBlogListClient(): Promise<unknown> {
  const content = await fetchPublishedBlogPages();
  return { success: true, data: { content } };
}

/** Blog detail — GET /api/blog/getById/{id} only. */
export async function fetchBlogDetailClient(
  _routeId: string,
  idCandidates: string[]
): Promise<Record<string, unknown> | null> {
  for (const candidateId of idCandidates) {
    try {
      const json = await fetchJsonUrl(blogDetailApiUrl(candidateId));
      const detail = extractBlogDetail(json);
      if (detail) {
        const status = String(detail.status ?? "").trim().toUpperCase();
        if (status && status !== "PUBLISHED") continue;
        return detail;
      }
    } catch {
      /* try next candidate */
    }
  }

  return null;
}
