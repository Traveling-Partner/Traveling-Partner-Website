/** Normalize API blog HTML so every detail page uses the same section styling. */

export type BlogTocItem = {
  id: string;
  text: string;
};

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function applyAccent(text: string): string {
  return text.replace(
    /(travell?ing partner|TP driver|\bTP\b)/gi,
    '<em class="blog-accent">$1</em>'
  );
}

function isSectionHeading(text: string): boolean {
  const cleaned = text.trim();
  if (cleaned.length < 8 || cleaned.length > 110) return false;
  if (/^Q:/i.test(cleaned) || /^A:/i.test(cleaned)) return false;
  if (/^\d+\s/.test(cleaned)) return false;
  if (/^•/.test(cleaned)) return false;
  if (
    /^(download|available on|learn more|register as|ready to start)/i.test(
      cleaned
    )
  ) {
    return false;
  }
  return true;
}

function toSectionHeading(text: string): string {
  const clean = stripHtml(text);
  const id = slugify(clean);
  return `<h3 class="blog-section-heading" id="${id}">${applyAccent(clean)}</h3>`;
}

/**
 * Unify h2/h3/h4 and strong-only paragraphs into one heading style (blog 68 parity).
 */
export function normalizeBlogContentHtml(html: string): string {
  if (!html) return "";

  let result = html;

  result = result.replace(
    /<h([2-4])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, _level: string, _attrs: string, inner: string) => {
      const text = stripHtml(inner);
      if (!isSectionHeading(text)) return match;
      return toSectionHeading(text);
    }
  );

  result = result.replace(
    /<p([^>]*)>\s*<strong>([^<]{8,120})<\/strong>\s*(?:<br\s*\/?>)?\s*<\/p>/gi,
    (match, _attrs: string, text: string) => {
      const clean = text.trim();
      if (!isSectionHeading(clean)) return match;
      return toSectionHeading(clean);
    }
  );

  return result;
}

export function extractHeadingsFromHtml(html: string): BlogTocItem[] {
  if (!html) return [];

  const items: BlogTocItem[] = [];
  const seen = new Set<string>();

  const sectionRegex =
    /<h3 class="blog-section-heading" id="([^"]+)"[^>]*>([\s\S]*?)<\/h3>/gi;
  let match: RegExpExecArray | null;

  while ((match = sectionRegex.exec(html)) && items.length < 6) {
    const text = stripHtml(match[2]);
    if (!text || seen.has(text.toLowerCase())) continue;
    seen.add(text.toLowerCase());
    items.push({
      id: match[1] || slugify(text),
      text,
    });
  }

  return items;
}
