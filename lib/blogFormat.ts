/** Display helpers for blog UI — no API changes. */

/** Category / type label from API only (no frontend default). */
export function pickBlogCategoryField(
  item: Record<string, unknown> | null | undefined
): string {
  if (!item) return "";
  const raw =
    item.categoryName ??
    item.category ??
    item.type ??
    item.blogType ??
    item.blog_type ??
    "";
  return String(raw ?? "").trim();
}

/** Prefer publish/create fields from Spring/API payloads. */
export function pickBlogDateField(item: Record<string, unknown> | null | undefined): unknown {
  if (!item) return "";
  return (
    item.created_at ??
    item.createdAt ??
    item.createdDate ??
    item.date ??
    item.published_at ??
    item.publishedAt ??
    item.postDate ??
    item.post_date ??
    item.updated_at ??
    item.updatedAt ??
    ""
  );
}

export function parseBlogDate(value: unknown): Date | null {
  if (value == null || value === "") return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "number") {
    const ms = value < 1e12 ? value * 1000 : value;
    const date = new Date(ms);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (Array.isArray(value)) {
    const [y, m, day, h = 0, min = 0, s = 0] = value;
    if (typeof y === "number" && typeof m === "number" && typeof day === "number") {
      const date = new Date(y, m - 1, day, Number(h), Number(min), Number(s));
      return Number.isNaN(date.getTime()) ? null : date;
    }
    return null;
  }

  if (typeof value === "object") {
    const o = value as Record<string, number | undefined>;
    if (o.year != null && o.monthValue != null && o.dayOfMonth != null) {
      const date = new Date(
        o.year,
        o.monthValue - 1,
        o.dayOfMonth,
        o.hour ?? 0,
        o.minute ?? 0,
        o.second ?? 0
      );
      return Number.isNaN(date.getTime()) ? null : date;
    }
    return null;
  }

  const str = String(value).trim();
  if (!str) return null;

  if (str.startsWith("[")) {
    try {
      return parseBlogDate(JSON.parse(str) as unknown);
    } catch {
      return null;
    }
  }

  const parsed = Date.parse(str);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed);
  }

  const dateOnly = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (dateOnly) {
    const date = new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return null;
}

function calendarMonthsBetween(earlier: Date, later: Date): number {
  let months =
    (later.getFullYear() - earlier.getFullYear()) * 12 +
    (later.getMonth() - earlier.getMonth());
  if (later.getDate() < earlier.getDate()) {
    months -= 1;
  }
  return Math.max(0, months);
}

export function formatTimeAgoFromDate(date: Date, now: Date = new Date()): string {
  const then = date.getTime();
  const nowMs = now.getTime();
  if (Number.isNaN(then)) return "";

  const seconds = Math.floor((nowMs - then) / 1000);
  if (seconds < 0) return "just now";
  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  const weeks = Math.floor(days / 7);
  const months = calendarMonthsBetween(date, now);

  if (months < 1) {
    return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  }

  if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

/** Relative time for blog cards/detail (minutes → years). */
export function getBlogTimeAgo(value: unknown): string {
  const date = parseBlogDate(value);
  if (!date) return "";
  return formatTimeAgoFromDate(date);
}

export function formatBlogType(value: string): string {
  const raw = String(value || "").trim();
  if (!raw) return "";

  return raw
    .replace(/[_-]+/g, " ")
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatBlogDate(dateInput: unknown): string {
  const date = parseBlogDate(dateInput);
  if (!date) return String(dateInput ?? "").trim();

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Article meta label from the API. Never appends "read"
 * (avoids "12 hours ago read" / "5 min read").
 */
export function formatReadTimeLabel(value?: string): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return raw.replace(/\s+read\b/gi, "").replace(/\s+/g, " ").trim();
}

/** @deprecated Use getBlogTimeAgo — kept for imports already using formatTimeAgo */
export function formatTimeAgo(dateInput: string | unknown): string {
  return getBlogTimeAgo(dateInput);
}
