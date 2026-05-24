import { PUBLIC_WEBSITE_API_BASE } from "@/lib/websiteApiUrl";

export const BLOG_LIST_URL = `${PUBLIC_WEBSITE_API_BASE}/blog/list`;

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
    const response = await fetch(BLOG_LIST_URL, {
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
