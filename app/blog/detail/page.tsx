import React, { Suspense } from "react";
import BlogDetailClient from "../BlogDetailClient";

function BlogDetailFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#fce001]/30 border-t-[#fdb813]" />
    </div>
  );
}

/**
 * Legacy query URL (`?id=`) — still works for old links.
 * Prefer `/blog/{id}` for shares (Open Graph title + image in static HTML).
 */
export default function BlogDetailByQueryPage(): React.ReactElement {
  return (
    <Suspense fallback={<BlogDetailFallback />}>
      <BlogDetailClient />
    </Suspense>
  );
}
