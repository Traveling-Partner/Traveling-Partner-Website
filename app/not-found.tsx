import type { Metadata } from "next";
import NotFoundPage from "@/components/404Page";

export const metadata: Metadata = {
  title: "404 — Page not found | Traveling Partner",
  description: "Looks like you're off route. Let's get you back on track.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      {/* Static hosts serve this 404.html for missing /blog/{id}.html.
          Send those URLs to the always-exported detail page (same API). */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var m=location.pathname.match(/^\\/blog\\/([^/]+)\\/?$/);if(!m)return;var id=decodeURIComponent(m[1]||"").trim();if(!id||id.toLowerCase()==="detail")return;location.replace("/blog/detail?id="+encodeURIComponent(id));}catch(e){}})();`,
        }}
      />
      <NotFoundPage />
    </>
  );
}
