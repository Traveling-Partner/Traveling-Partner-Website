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
  const pageRaw = Number(searchParams?.get("page"));
  const currentPage =
    Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  const [searchDraft, setSearchDraft] = useState(committedSearch);
  const [blogs, setBlogs] = useState<MappedBlogCard[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<MappedBlogCard[]>([]);
  const [categoryCatalog, setCategoryCatalog] = useState<BlogHeroCategory[]>([]);
  const [allCount, setAllCount] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const requestGeneration = useRef(0);

  const writeParams = useCallback(
    (patch: Record<string, string | number | undefined>) => {
      const next = new URLSearchParams(searchParams?.toString() ?? "");
      Object.entries(patch).forEach(([key, value]) => {
        const asString = value == null ? "" : String(value);
        const isDefault =
          (key === "q" && !asString.trim()) ||
          (key === "cat" && (asString === "All" || !asString)) ||
          (key === "sort" && (asString === "newest" || !asString)) ||
          (key === "page" && (asString === "1" || !asString || Number(asString) < 1));
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
    setLoading(true);
    setError(null);

    fetchBlogListPageClient({
      page: currentPage,
      size: BLOG_GRID_PAGE_SIZE,
      search: committedSearch,
      categoryName: selectedCategory,
    })
      .then((result) => {
        if (requestId !== requestGeneration.current) return;
        const cards = toCards({ data: { content: result.items } });
        setBlogs(cards);
        setTotalPages(result.totalPages);
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
  }, [committedSearch, currentPage, selectedCategory, refreshKey]);

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

  const goToPage = (page: number) => {
    if (page === currentPage || page < 1 || (totalPages > 0 && page > totalPages)) {
      return;
    }
    writeParams({ page });
    document
      .getElementById("blog-stories")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FEFBF6]">
      <BlogHero
        searchQuery={searchDraft}
        onSearchChange={setSearchDraft}
        onSearchSubmit={() => {
          const next = searchDraft.trim();
          if (next === committedSearch.trim() && currentPage === 1) {
            setRefreshKey((key) => key + 1);
          } else {
            writeParams({ q: next, page: 1 });
          }
          document
            .getElementById("blog-stories")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => {
          if (cat === selectedCategory) return;
          writeParams({ cat, page: 1 });
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
            page={currentPage}
            totalPages={totalPages}
            onSortChange={(sort) => writeParams({ sort })}
            onPageChange={goToPage}
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
