// app/blog/[id]/page.tsx
import BlogDetailClient from "./BlogDetailClient";

const extractBlogList = (payload: any): any[] => {
  if (Array.isArray(payload?.data?.content)) return payload.data.content;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.blogs)) return payload.data.blogs;
  return [];
};

// Static params for export: fetch available blog ids from CRM API.
export async function generateStaticParams() {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
    "";

  if (!apiBase) return [];

  const normalizedBase = apiBase.replace(/\/$/, "");
  const listUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${normalizedBase}/website/blog/list`
    : `${normalizedBase}/api/website/blog/list`;

  try {
    const response = await fetch(listUrl, {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) return [];
    const json = await response.json();
    const list = extractBlogList(json);
    return list
      .map((item: any) => String(item?.id ?? item?.blog_id ?? ""))
      .filter((id: string) => id.length > 0)
      .map((id: string) => ({ id }));
  } catch {
    return [];
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailClient id={id} />;
}