import {
  BLOG_LIST_STATIC_PATH,
  BLOG_LIST_URL,
  blogDataStaticPath,
  extractBlogDetail,
  findBlogInListPayload,
} from "@/lib/blogApi";
import { websiteApiUrl } from "@/lib/websiteApiUrl";

function isLocalDevHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

async function fetchJsonUrl(url: string): Promise<unknown> {
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${url} → ${response.status}`);
  }
  return response.json();
}

/**
 * Load blog list in the browser: dev proxy → static snapshot → live API.
 */
export async function fetchBlogListClient(): Promise<unknown> {
  const urls: string[] = [];

  if (typeof window !== "undefined") {
    if (isLocalDevHost()) {
      urls.push(websiteApiUrl("/blog/list"));
    }
    urls.push(BLOG_LIST_STATIC_PATH);
    urls.push(BLOG_LIST_URL);
  } else {
    urls.push(BLOG_LIST_URL);
  }

  const errors: string[] = [];
  for (const url of urls) {
    try {
      return await fetchJsonUrl(url);
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  throw new Error(errors.join("; ") || "Blog list unavailable");
}

/**
 * Load one blog post in the browser: static detail → list snapshot → dev/live API.
 */
export async function fetchBlogDetailClient(
  routeId: string,
  idCandidates: string[]
): Promise<Record<string, unknown> | null> {
  for (const candidateId of idCandidates) {
    try {
      const staticJson = await fetchJsonUrl(blogDataStaticPath(candidateId));
      const detail = extractBlogDetail(staticJson);
      if (detail) return detail;
    } catch {
      /* next source */
    }
  }

  try {
    const listJson = await fetchBlogListClient();
    const fromList = findBlogInListPayload(listJson, routeId);
    if (fromList) return fromList;
  } catch {
    /* next source */
  }

  for (const candidateId of idCandidates) {
    try {
      const json = await fetchJsonUrl(
        websiteApiUrl(`/blog/view/${encodeURIComponent(candidateId)}`)
      );
      const detail = extractBlogDetail(json);
      if (detail) return detail;
    } catch {
      /* next source */
    }
  }

  return null;
}
