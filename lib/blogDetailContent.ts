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

function isInsightCallout(text: string): boolean {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length < 70 || cleaned.length > 340) return false;
  if (/^Q:/i.test(cleaned) || /^A:/i.test(cleaned)) return false;
  if (/^\d+\s/.test(cleaned)) return false;
  if (/^(download|available on|learn more|register as|ready to)/i.test(cleaned)) {
    return false;
  }
  return true;
}

/** Wrap key bold paragraphs in the brand gradient callout (Figma insight blocks). */
function applyInsightCards(html: string): string {
  let result = html;

  result = result.replace(
    /<p([^>]*)>\s*<strong>([\s\S]*?)<\/strong>\s*<\/p>/gi,
    (match, attrs: string, inner: string) => {
      const plain = stripHtml(inner);
      if (!isInsightCallout(plain)) return match;
      return `<div class="blog-insight-card"><p${attrs}><strong>${inner}</strong></p></div>`;
    }
  );

  result = result.replace(
    /<p([^>]*)>\s*<strong>([\s\S]*?)<\/strong>\s*([^<][\s\S]*?)<\/p>/gi,
    (match, attrs: string, strong: string, rest: string) => {
      if (/<br/i.test(match)) return match;
      const plainStrong = stripHtml(strong);
      const plainRest = stripHtml(rest).trim();
      const total = `${plainStrong} ${plainRest}`.replace(/\s+/g, " ").trim();
      if (!isInsightCallout(total)) return match;
      if (isSectionHeading(plainStrong)) return match;
      return `<div class="blog-insight-card"><p${attrs}><strong>${strong}</strong>${rest}</p></div>`;
    }
  );

  return result;
}

/** Add gradient callouts to the first paragraph after section headings (up to max total). */
function applySectionLeadCallouts(html: string, maxTotal = 4): string {
  let count = (html.match(/blog-insight-card/g) || []).length;
  if (count >= maxTotal) return html;

  return html.replace(
    /(<h3 class="blog-section-heading"[^>]*>[\s\S]*?<\/h3>)\s*(<p([^>]*)>([\s\S]*?)<\/p>)/gi,
    (match, heading: string, _fullP: string, attrs: string, inner: string) => {
      if (count >= maxTotal) return match;
      const plain = stripHtml(inner);
      if (plain.length < 60 || plain.length > 280) return match;
      if (/^Q:/i.test(plain) || /^A:/i.test(plain)) return match;
      if (/^(download|available on|learn more|register as|ready to)/i.test(plain)) {
        return match;
      }
      count += 1;
      return `${heading}<div class="blog-insight-card"><p${attrs}>${inner}</p></div>`;
    }
  );
}

/**
 * Drop presentational attributes (inline style/border/width/etc.) that
 * WYSIWYG editors bake into table markup — those inline attributes win over
 * our stylesheet, which is why tables copied from the API look "ordinary"
 * no matter what CSS we write. Structural attributes like colspan/rowspan
 * are left untouched.
 */
function stripTablePresentationAttrs(tableHtml: string): string {
  return tableHtml.replace(
    /<(table|thead|tbody|tfoot|tr|th|td)\b([^>]*)>/gi,
    (_match, tag: string, attrs: string) => {
      const cleaned = attrs.replace(
        /\s(style|class|border|cellpadding|cellspacing|width|height|bgcolor|align|valign|bordercolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
        ""
      );
      return `<${tag}${cleaned}>`;
    }
  );
}

/** Wrap every table in a scrollable, styled container — current and future posts alike. */
function enhanceTables(html: string): string {
  return html.replace(/<table\b[^>]*>[\s\S]*?<\/table>/gi, (tableMatch) => {
    if (/class="[^"]*blog-table-wrap/.test(tableMatch)) return tableMatch;
    return `<div class="blog-table-wrap">${stripTablePresentationAttrs(tableMatch)}</div>`;
  });
}

/**
 * Unify h2/h3/h4 and strong-only paragraphs into one heading style (blog 68 parity).
 */
export function normalizeBlogContentHtml(html: string): string {
  if (!html) return "";

  let result = enhanceTables(html);

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

  result = applyInsightCards(result);
  result = applySectionLeadCallouts(result);

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
