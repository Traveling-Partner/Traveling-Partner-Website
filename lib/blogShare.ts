/** Live site URL used for share links and Open Graph (must match production domain). */
export function getSiteUrl(): string {
  const fromEnv =
    (globalThis as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.NEXT_PUBLIC_SITE_URL?.trim();
  return (fromEnv || "https://traveling-partner.com").replace(/\/$/, "");
}

export function getBlogCanonicalUrl(id: string | number): string {
  return `${getSiteUrl()}/blog/${id}`;
}

export function toAbsoluteImageUrl(image: string | undefined): string | undefined {
  const src = String(image || "").trim();
  if (!src) return undefined;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
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

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    pinterest: image
      ? `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}&media=${encodedImage}`
      : `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
  };
}
