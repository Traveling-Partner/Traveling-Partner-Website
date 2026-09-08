import type { ReactNode } from "react";

type EmphasizeTone = "onLight" | "onDark";

const TONE_CLASS: Record<EmphasizeTone, string> = {
  onLight: "font-bold text-[#0b0b0b]",
  onDark: "font-bold text-white",
};

/**
 * Wraps exact phrase matches from content docs in <strong>.
 * Longer phrases are applied first to avoid partial overlaps.
 */
export function emphasizePhrases(
  text: string,
  phrases: readonly string[],
  tone: EmphasizeTone = "onLight",
): ReactNode {
  const sorted = [...phrases]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (!sorted.length) return text;

  type Part = { text: string; bold: boolean };
  let parts: Part[] = [{ text, bold: false }];

  for (const phrase of sorted) {
    const next: Part[] = [];
    for (const part of parts) {
      if (part.bold) {
        next.push(part);
        continue;
      }
      const source = part.text;
      let start = 0;
      let idx = source.indexOf(phrase);
      if (idx === -1) {
        next.push(part);
        continue;
      }
      while (idx !== -1) {
        if (idx > start) {
          next.push({ text: source.slice(start, idx), bold: false });
        }
        next.push({ text: phrase, bold: true });
        start = idx + phrase.length;
        idx = source.indexOf(phrase, start);
      }
      if (start < source.length) {
        next.push({ text: source.slice(start), bold: false });
      }
    }
    parts = next;
  }

  const emphasisClass = TONE_CLASS[tone];

  return parts.map((part, i) =>
    part.bold ? (
      <strong key={i} className={emphasisClass}>
        {part.text}
      </strong>
    ) : (
      part.text
    ),
  );
}
