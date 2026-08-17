/** Live site URL used for share links and Open Graph (must match production domain). */
export function getSiteUrl(): string {
  const fromEnv =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_SITE_URL?.trim();
  return (fromEnv || "https://traveling-partner.com").replace(/\/$/, "");
}

/** Path for in-app links (also what crawlers must hit for OG tags). */
export function getBlogPath(id: string | number): string {
  return `/blog/${encodeURIComponent(String(id))}`;
}

export function getBlogCanonicalUrl(id: string | number): string {
  return `${getSiteUrl()}${getBlogPath(id)}`;
}

export function toAbsoluteImageUrl(image: string | undefined): string | undefined {
  const src = String(image || "").trim();
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    try {
      return new URL(src).href;
    } catch {
      return src.replace(/ /g, "%20");
    }
  }
  if (src.startsWith("/")) return `${getSiteUrl()}${src}`;
  return src;
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function buildShareLinks(
  url: string,
  title: string,
  image?: string
): Record<string, string> {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedImage = image ? encodeURIComponent(image) : "";
  const textWithUrl = encodeURIComponent(`${title}\n${url}`);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    pinterest: image
      ? `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}&media=${encodedImage}`
      : `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    threads: `https://www.threads.net/intent/post?text=${textWithUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
  };
}
