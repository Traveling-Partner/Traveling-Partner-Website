/** Reject empty, zero, and negative ids so /blog/detail?id=-1 is not-found. */

export function isValidBlogId(id: string | null | undefined): boolean {
  const raw = String(id ?? "").trim();
  if (!raw) return false;
  if (!/^-?\d+(\.\d+)?$/.test(raw)) {
    return raw.length > 0 && raw.toLowerCase() !== "nan";
  }
  const n = Number(raw);
  if (!Number.isFinite(n)) return false;
  return n > 0;
}
