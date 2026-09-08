import React, { Suspense } from "react";
import type { Metadata } from "next";
import BlogDetailClient from "../BlogDetailClient";
import {
  fetchAllBlogIds,
  fetchBlogDetailById,
  pickBlogMetaFields,
} from "@/lib/blogApi";
import {
  getBlogCanonicalUrl,
  getSiteUrl,
  stripHtml,
  toAbsoluteImageUrl,
} from "@/lib/blogShare";

const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/duubabjk7/image/upload/v1715253815/tp-Imgs/logo/Footer-logo_hyzuc1.png";

type PageProps = {
  params: Promise<{ id: string }>;
};

function BlogDetailFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#fce001]/30 border-t-[#fdb813]" />
    </div>
  );
}

/** Required for `output: "export"` — bake one HTML file per blog id. */
export async function generateStaticParams() {
  const ids = await fetchAllBlogIds();
  return ids.map((id) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await fetchBlogDetailById(id);

  if (!blog) {
    return {
      title: "Traveling Partner Blog",
      description: "Stories and updates from Traveling Partner.",
    };
  }

  const { title, description, coverImage, keywords } = pickBlogMetaFields(blog);
  const desc =
    stripHtml(description).slice(0, 200) ||
    "Read this article on Traveling Partner.";
  const image = toAbsoluteImageUrl(coverImage) || DEFAULT_OG_IMAGE;
  const url = getBlogCanonicalUrl(id);

  return {
    title: `${title} | Traveling Partner`,
    description: desc,
    ...(keywords.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: desc,
      siteName: "Traveling Partner",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [image],
    },
  };
}

/**
 * Per-post static HTML so LinkedIn / Facebook / WhatsApp can read
 * og:title + og:image from the shared URL (query-param pages cannot).
 */
export default async function BlogByIdPage({
  params,
}: PageProps): Promise<React.ReactElement> {
  const { id } = await params;

  return (
    <Suspense fallback={<BlogDetailFallback />}>
      <BlogDetailClient blogId={id} />
    </Suspense>
  );
}
