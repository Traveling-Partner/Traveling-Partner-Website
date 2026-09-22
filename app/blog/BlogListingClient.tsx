"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import { encodeMediaUrl } from "@/lib/encodeMediaUrl";
import { formatBlogType } from "@/lib/blogFormat";
import { extractBlogList } from "@/lib/blogApi";
import {
  fetchBlogListClient,
  fetchBlogListHeadClient,
  fetchFeaturedBlogListClient,
} from "@/lib/blogClientFetch";
import { mapBlogCard, type MappedBlogCard } from "@/lib/blogMap";
import BlogHero from "@/components/Blog-sections/BlogHero";
import FeaturedBlogSection from "@/components/Blog-sections/FeaturedBlogSection";
import LatestStoriesSection from "@/components/Blog-sections/LatestStoriesSection";
import TPJournalSection from "@/components/Blog-sections/TPJournalSection";
import SearchEmptyState from "@/components/SearchEmptyState";
import BlogLoadError from "@/components/BlogLoadError";
import TPLoader from "@/components/TPLoader";

const INITIAL_VISIBLE_COUNT = 6;

const getImageSrc = (value: string): string => {
  const src = encodeMediaUrl(String(value || "").trim());
  if (!src) return "/mock-images/blog-cover.svg";
  if (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")) {
    return optimizeCloudinaryImage(src, 1000, 72);
  }
  return "/mock-images/blog-cover.svg";
};

const Loader = () => (
  <div className="flex items-center justify-center py-20">
    <TPLoader variant="inline" size={120} label="Loading blogs…" />
  </div>
);

function matchesListingFilters(
  blog: MappedBlogCard,
  selectedCategory: string,
  searchQuery: string
): boolean {
  const blogCategories = blog.categories?.length
    ? blog.categories
    : blog.category
      ? [blog.category]
      : [];
  const matchesCategory =
    selectedCategory === "All" || blogCategories.includes(selectedCategory);
  if (!matchesCategory) return false;

  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;

  const title = blog.main_title?.toLowerCase() ?? "";
  const description = blog.description1?.toLowerCase() ?? "";
  const categoryText = blogCategories.join(" ").toLowerCase();
  const tags = (blog.tags ?? []).join(" ").toLowerCase();

  return (
    title.includes(query) ||
    description.includes(query) ||
    categoryText.includes(query) ||
    tags.includes(query)
  );
}

function BlogListingInner() {
  const router = useRouter();
  const pathname = usePathname() || "/blog";
  const searchParams = useSearchParams();

  const searchQuery = searchParams?.get("q") ?? "";
  const selectedCategory = searchParams?.get("cat") ?? "All";
  const sortOrder =
    searchParams?.get("sort") === "oldest" ? "oldest" : "newest";
  const shownRaw = Number(searchParams?.get("shown"));
  const visibleCount =
    Number.isFinite(shownRaw) && shownRaw > 0
      ? shownRaw
      : INITIAL_VISIBLE_COUNT;

  const [blogs, setBlogs] = useState<MappedBlogCard[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<MappedBlogCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadRequest = useRef(0);

  const writeParams = useCallback(
    (patch: Record<string, string | number | undefined>) => {
      const next = new URLSearchParams(searchParams?.toString() ?? "");
      Object.entries(patch).forEach(([key, value]) => {
        const asString = value == null ? "" : String(value);
        const isDefault =
          (key === "q" && !asString.trim()) ||
          (key === "cat" && (asString === "All" || !asString)) ||
          (key === "sort" && (asString === "newest" || !asString)) ||
          (key === "shown" &&
            (asString === String(INITIAL_VISIBLE_COUNT) || !asString));
        if (isDefault) next.delete(key);
        else next.set(key, asString);
      });
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const loadBlogs = useCallback(async () => {
    const requestId = ++loadRequest.current;
    const toCards = (payload: unknown) =>
      extractBlogList(payload)
        .map(mapBlogCard)
        .filter((blog) => blog.id);

    try {
      setLoading(true);
      setError(null);

      const [listData, featuredData] = await Promise.all([
        fetchBlogListHeadClient(),
        fetchFeaturedBlogListClient(),
      ]);
      if (requestId !== loadRequest.current) return;
      setBlogs(toCards(listData));
      setFeaturedBlogs(
        toCards(featuredData).filter((blog) => blog.isFeatured)
      );
      setLoading(false);
    } catch (err) {
      console.error("Error while fetching blog list:", err);
      if (requestId !== loadRequest.current) return;
      setFeaturedBlogs([]);
      setError("Unable to load blogs right now. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const listData = await fetchBlogListClient();
      if (requestId !== loadRequest.current) return;
      setBlogs(toCards(listData));
    } catch (err) {
      console.error("Error while fetching the rest of the blog list:", err);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        blogs.flatMap((blog) =>
          (blog.categories?.length ? blog.categories : blog.category ? [blog.category] : [])
            .map((cat) => cat.trim())
            .filter(Boolean)
        )
      )
    );

    return [
      { key: "All", label: "All Posts", count: blogs.length },
      ...unique.map((cat) => ({
        key: cat,
        label: formatBlogType(cat) || cat,
        count: blogs.filter((blog) =>
          (blog.categories?.length ? blog.categories : [blog.category]).includes(cat)
        ).length,
      })),
    ];
  }, [blogs]);

  const carouselBlogs = useMemo(
    () =>
      blogs.filter((blog) =>
        matchesListingFilters(blog, selectedCategory, searchQuery)
      ),
    [blogs, selectedCategory, searchQuery]
  );

  const visibleFeaturedBlogs = useMemo(
    () =>
      featuredBlogs.filter((blog) =>
        matchesListingFilters(blog, selectedCategory, searchQuery)
      ),
    [featuredBlogs, selectedCategory, searchQuery]
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEFBF6]">
      <BlogHero
        searchQuery={searchQuery}
        onSearchChange={(value) =>
          writeParams({ q: value, shown: INITIAL_VISIBLE_COUNT })
        }
        onSearchSubmit={() => {
          if (searchQuery.trim()) {
            fetchBlogListClient(searchQuery.trim())
              .then((listData) => {
                setBlogs(
                  extractBlogList(listData)
                    .map(mapBlogCard)
                    .filter((blog) => blog.id)
                );
              })
              .catch(() => {
                /* keep already-loaded catalogue; client filter still applies */
              });
          }
          document
            .getElementById("blog-stories")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) =>
          writeParams({ cat, shown: INITIAL_VISIBLE_COUNT })
        }
        hideCategories={
          !loading && !error && searchQuery.trim() !== "" && carouselBlogs.length === 0
        }
      />

      {loading ? (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Loader />
        </div>
      ) : error ? (
        <section
          id="blog-stories"
          className="relative w-full bg-[#FEFBF6] pb-16 pt-2 sm:pb-20 sm:pt-4"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlogLoadError variant="light" onRetry={loadBlogs} />
          </div>
        </section>
      ) : carouselBlogs.length === 0 ? (
        <section
          id="blog-stories"
          className="relative w-full bg-[#FEFBF6] pb-16 pt-2 sm:pb-20 sm:pt-4"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <SearchEmptyState
              query={searchQuery}
              description="We couldn't find any blogs matching that keyword. Try another search, or reach our team and we'll point you in the right direction."
            />
          </div>
        </section>
      ) : (
        <div id="blog-stories">
          <FeaturedBlogSection
            blogs={visibleFeaturedBlogs}
            getImageSrc={getImageSrc}
          />
          <LatestStoriesSection
            blogs={carouselBlogs}
            getImageSrc={getImageSrc}
            sortOrder={sortOrder}
            visibleCount={visibleCount}
            onSortChange={(sort) =>
              writeParams({ sort, shown: INITIAL_VISIBLE_COUNT })
            }
            onVisibleCountChange={(shown) => writeParams({ shown })}
          />
        </div>
      )}

      <TPJournalSection />
    </div>
  );
}

export default function BlogListingClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FEFBF6]">
          <Loader />
        </div>
      }
    >
      <BlogListingInner />
    </Suspense>
  );
}
