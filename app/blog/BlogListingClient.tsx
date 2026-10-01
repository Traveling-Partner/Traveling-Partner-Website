"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { optimizeCloudinaryImage } from "@/lib/cloudinaryImage";
import { encodeMediaUrl } from "@/lib/encodeMediaUrl";
import { BLOG_GRID_PAGE_SIZE, extractBlogList } from "@/lib/blogApi";
import {
  fetchBlogListPageClient,
  fetchFeaturedBlogListClient,
} from "@/lib/blogClientFetch";
import { formatBlogType } from "@/lib/blogFormat";
import { mapBlogCard, type MappedBlogCard } from "@/lib/blogMap";
import BlogHero, { type BlogHeroCategory } from "@/components/Blog-sections/BlogHero";
import FeaturedBlogSection from "@/components/Blog-sections/FeaturedBlogSection";
import LatestStoriesSection from "@/components/Blog-sections/LatestStoriesSection";
import TPJournalSection from "@/components/Blog-sections/TPJournalSection";
import SearchEmptyState from "@/components/SearchEmptyState";
import BlogLoadError from "@/components/BlogLoadError";
import TPLoader from "@/components/TPLoader";

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

function toCards(payload: unknown): MappedBlogCard[] {
  return extractBlogList(payload)
    .map(mapBlogCard)
    .filter((blog) => blog.id);
}

function categoryNames(blog: MappedBlogCard): string[] {
  const names = blog.categories?.length
    ? blog.categories
    : blog.category
      ? [blog.category]
      : [];
  return names.map((name) => name.trim()).filter(Boolean);
}

function rememberCategories(
  prev: BlogHeroCategory[],
  cards: MappedBlogCard[],
  activeCategory: string,
  totalElements: number
): BlogHeroCategory[] {
  const map = new Map(
    prev
      .filter((category) => category.key !== "All")
      .map((category) => [category.key, { ...category }])
  );

  if (activeCategory !== "All") {
    map.set(activeCategory, {
      key: activeCategory,
      label: formatBlogType(activeCategory) || activeCategory,
      count: totalElements,
    });
  }

  for (const card of cards) {
    for (const name of categoryNames(card)) {
      if (map.has(name)) continue;
      map.set(name, {
        key: name,
        label: formatBlogType(name) || name,
        count: null,
      });
    }
  }

  return [...map.values()];
}

function BlogListingInner() {
  const router = useRouter();
  const pathname = usePathname() || "/blog";
  const searchParams = useSearchParams();

  const committedSearch = searchParams?.get("q") ?? "";
  const selectedCategory = searchParams?.get("cat") ?? "All";
  const sortOrder =
    searchParams?.get("sort") === "oldest" ? "oldest" : "newest";

  const [searchDraft, setSearchDraft] = useState(committedSearch);
  const [blogs, setBlogs] = useState<MappedBlogCard[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<MappedBlogCard[]>([]);
  const [categoryCatalog, setCategoryCatalog] = useState<BlogHeroCategory[]>([]);
  const [allCount, setAllCount] = useState<number | null>(null);
  const [pageLoaded, setPageLoaded] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [visibleCount, setVisibleCount] = useState(BLOG_GRID_PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const requestGeneration = useRef(0);
  const loadingMoreRef = useRef(false);

  const writeParams = useCallback(
    (patch: Record<string, string | number | undefined>) => {
      const next = new URLSearchParams(searchParams?.toString() ?? "");
      Object.entries(patch).forEach(([key, value]) => {
        const asString = value == null ? "" : String(value);
        const isDefault =
          (key === "q" && !asString.trim()) ||
          (key === "cat" && (asString === "All" || !asString)) ||
          (key === "sort" && (asString === "newest" || !asString));
        if (isDefault) next.delete(key);
        else next.set(key, asString);
      });
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    setSearchDraft(committedSearch);
  }, [committedSearch]);

  useEffect(() => {
    let active = true;
    fetchFeaturedBlogListClient()
      .then((payload) => {
        if (!active) return;
        const cards = toCards(payload).filter((blog) => blog.isFeatured);
        setFeaturedBlogs(cards);
        setCategoryCatalog((prev) =>
          rememberCategories(prev, cards, "All", 0)
        );
      })
      .catch(() => {
        if (!active) return;
        setFeaturedBlogs([]);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const requestId = ++requestGeneration.current;
    loadingMoreRef.current = false;
    setLoadingMore(false);
    setLoading(true);
    setError(null);
    setReachedEnd(false);
    setVisibleCount(BLOG_GRID_PAGE_SIZE);

    fetchBlogListPageClient({
      page: 1,
      size: BLOG_GRID_PAGE_SIZE,
      search: committedSearch,
      categoryName: selectedCategory,
    })
      .then((result) => {
        if (requestId !== requestGeneration.current) return;
        const cards = toCards({ data: { content: result.items } });
        setBlogs(cards);
        setPageLoaded(1);
        setTotalPages(result.totalPages);
        setReachedEnd(result.last || result.totalPages <= 1);
        setCategoryCatalog((prev) =>
          rememberCategories(
            prev,
            cards,
            selectedCategory,
            result.totalElements
          )
        );
        if (!committedSearch.trim() && selectedCategory === "All") {
          setAllCount(result.totalElements);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error while fetching blog list:", err);
        if (requestId !== requestGeneration.current) return;
        setBlogs([]);
        setError("Unable to load blogs right now. Please try again.");
        setLoading(false);
      });
  }, [committedSearch, selectedCategory, refreshKey]);

  const loadMore = useCallback(async () => {
    if (loadingMoreRef.current || loading) return;
    if (visibleCount < blogs.length) {
      setVisibleCount((count) =>
        Math.min(count + BLOG_GRID_PAGE_SIZE, blogs.length)
      );
      return;
    }
    if (reachedEnd || pageLoaded >= totalPages) return;

    const requestId = requestGeneration.current;
    const nextPage = pageLoaded + 1;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    try {
      const result = await fetchBlogListPageClient({
        page: nextPage,
        size: BLOG_GRID_PAGE_SIZE,
        search: committedSearch,
        categoryName: selectedCategory,
      });
      if (requestId !== requestGeneration.current) return;

      const cards = toCards({ data: { content: result.items } });
      const seen = new Set(blogs.map((blog) => String(blog.id)));
      const extra = cards.filter(
        (blog) => blog.id && !seen.has(String(blog.id))
      );
      if (extra.length === 0) {
        setReachedEnd(true);
      } else {
        setBlogs((prev) => {
          const ids = new Set(prev.map((blog) => String(blog.id)));
          const more = cards.filter(
            (blog) => blog.id && !ids.has(String(blog.id))
          );
          return more.length ? [...prev, ...more] : prev;
        });
        setVisibleCount((count) => count + extra.length);
      }
      setPageLoaded(nextPage);
      setTotalPages(result.totalPages);
      setReachedEnd(
        extra.length === 0 || result.last || nextPage >= result.totalPages
      );
      setCategoryCatalog((prev) =>
        rememberCategories(
          prev,
          cards,
          selectedCategory,
          result.totalElements
        )
      );
      if (!committedSearch.trim() && selectedCategory === "All") {
        setAllCount(result.totalElements);
      }
    } catch (err) {
      console.error("Error while fetching the next blog page:", err);
    } finally {
      if (requestId === requestGeneration.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    }
  }, [
    blogs,
    committedSearch,
    loading,
    pageLoaded,
    reachedEnd,
    selectedCategory,
    totalPages,
    visibleCount,
  ]);

  const categories = useMemo(() => {
    const chips = [...categoryCatalog];
    if (
      selectedCategory !== "All" &&
      !chips.some((category) => category.key === selectedCategory)
    ) {
      chips.unshift({
        key: selectedCategory,
        label: formatBlogType(selectedCategory) || selectedCategory,
        count: null,
      });
    }
    return [
      { key: "All", label: "All Posts", count: allCount },
      ...chips,
    ];
  }, [allCount, categoryCatalog, selectedCategory]);

  const filtersActive =
    committedSearch.trim() !== "" || selectedCategory !== "All";
  const hasMore = !reachedEnd && totalPages > pageLoaded;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEFBF6]">
      <BlogHero
        searchQuery={searchDraft}
        onSearchChange={setSearchDraft}
        onSearchSubmit={() => {
          const next = searchDraft.trim();
          if (next === committedSearch.trim()) setRefreshKey((key) => key + 1);
          else writeParams({ q: next });
          document
            .getElementById("blog-stories")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => {
          if (cat === selectedCategory) return;
          writeParams({ cat });
        }}
        hideCategories={
          !loading &&
          !error &&
          committedSearch.trim() !== "" &&
          blogs.length === 0
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
            <BlogLoadError
              variant="light"
              onRetry={() => setRefreshKey((key) => key + 1)}
            />
          </div>
        </section>
      ) : blogs.length === 0 ? (
        <section
          id="blog-stories"
          className="relative w-full bg-[#FEFBF6] pb-16 pt-2 sm:pb-20 sm:pt-4"
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <SearchEmptyState
              query={committedSearch || (selectedCategory !== "All" ? selectedCategory : "")}
              description="We couldn't find any blogs matching that keyword. Try another search, or reach our team and we'll point you in the right direction."
            />
          </div>
        </section>
      ) : (
        <div id="blog-stories">
          {filtersActive ? null : (
            <FeaturedBlogSection
              blogs={featuredBlogs}
              getImageSrc={getImageSrc}
            />
          )}
          <LatestStoriesSection
            blogs={blogs}
            getImageSrc={getImageSrc}
            sortOrder={sortOrder}
            visibleCount={visibleCount}
            hasMore={hasMore}
            loadingMore={loadingMore}
            onSortChange={(sort) => {
              writeParams({ sort });
              setVisibleCount(BLOG_GRID_PAGE_SIZE);
            }}
            onVisibleCountChange={setVisibleCount}
            onLoadMore={() => {
              void loadMore();
            }}
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
