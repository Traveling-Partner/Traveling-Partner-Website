import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";
import {
  fetchAllBlogIds,
  fetchBlogDetailById,
  pickBlogMetaFields,
} from "@/lib/blogApi";
import {
  getBlogCanonicalUrl,
  stripHtml,
  toAbsoluteImageUrl,
} from "@/lib/blogShare";

export async function generateStaticParams() {
  const ids = await fetchAllBlogIds();
  if (ids.length === 0) {
    throw new Error(
      "Blog build failed: could not fetch blog list for static pages."
    );
  }
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const detail = await fetchBlogDetailById(id);
  const canonical = getBlogCanonicalUrl(id);

  if (!detail) {
    return {
      title: "Blog | Traveling Partner",
      alternates: { canonical },
    };
  }

  const { title, description, coverImage } = pickBlogMetaFields(detail);
  const plainDescription = stripHtml(description).slice(0, 160);
  const image = toAbsoluteImageUrl(coverImage);

  return {
    title: `${title} | Traveling Partner`,
    description: plainDescription || "Read this article on Traveling Partner.",
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description: plainDescription,
      siteName: "Traveling Partner",
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: plainDescription,
      images: image ? [image] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogDetailClient id={id} />;
}
