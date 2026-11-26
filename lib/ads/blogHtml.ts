const BLOCK_SPLIT = /(?=<(?:p|h2|h3|h4|div|ul|ol|blockquote|figure|table)\b)/i;

export function countHtmlWords(html: string): number {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function splitHtmlBlocks(html: string): string[] {
  const trimmed = html.trim();
  if (!trimmed) return [];
  return trimmed.split(BLOCK_SPLIT).map((part) => part.trim()).filter(Boolean);
}

export function isParagraphBlock(html: string): boolean {
  return /^<p\b/i.test(html.trim());
}
