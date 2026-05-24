// app/blog/[id]/page.tsx
import BlogDetailClient from "./BlogDetailClient";
import { fetchAllBlogIds } from "@/lib/blogApi";

/** Pre-render every blog id from the API so static export has HTML for each post. */
export async function generateStaticParams() {
  const ids = await fetchAllBlogIds();
  if (ids.length === 0) {
    throw new Error(
      "Blog build failed: could not fetch blog list. Check network and BLOG_LIST_PUBLIC_URL."
    );
  }
  return ids.map((id) => ({ id }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailClient id={id} />;
}
