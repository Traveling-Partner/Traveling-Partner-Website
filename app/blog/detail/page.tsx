import React, { Suspense } from "react";
import BlogDetailClient from "../[id]/BlogDetailClient";

function BlogDetailFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#fce001]/30 border-t-[#fdb813]" />
    </div>
  );
}

/**
 * Single static page for all blog posts (output: export).
 * Loads any post by ?id= from the live API — no per-id HTML file required.
 */
export default function BlogDetailByQueryPage(): React.ReactElement {
  return (
    <Suspense fallback={<BlogDetailFallback />}>
      <BlogDetailClient />
    </Suspense>
  );
}
