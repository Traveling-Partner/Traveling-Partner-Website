/** Encode spaces/commas in stored media URLs so <img src> loads. Does not change the API. */

export function encodeMediaUrl(url: string): string {
  const trimmed = String(url || "").trim();
  if (!trimmed) return url;
  try {
    const parsed = new URL(trimmed);
    parsed.pathname = parsed.pathname
      .split("/")
      .map((segment) => {
        try {
          return encodeURIComponent(decodeURIComponent(segment));
        } catch {
          return encodeURIComponent(segment);
        }
      })
      .join("/");
    return parsed.toString();
  } catch {
    return trimmed.replace(/ /g, "%20").replace(/,/g, "%2C");
  }
}
