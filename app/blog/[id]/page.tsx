import BlogDetailClient from "./BlogDetailClient";
import { fetchAllBlogIds } from "@/lib/blogApi";

export async function generateStaticParams() {
  const ids = await fetchAllBlogIds();
  if (ids.length === 0) {
    throw new Error(
      "Blog build failed: could not fetch blog list for static pages."
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
