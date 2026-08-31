import { getBlogIdFromItem } from "@/lib/blogApi";
import {
  normalizeStringList,
  pickBlogCategories,
  pickBlogDateField,
} from "@/lib/blogFormat";
import type { BlogFaq } from "@/lib/blogTypes";

export type MappedBlogCard = {
  id: string | number;
  cover_image: string;
  main_title: string;
  description1: string;
  date?: unknown;
  category?: string;
  categories: string[];
  author?: string;
  readTime?: string;
  tags: string[];
  isFeatured: boolean;
};

export type MappedBlogDetail = MappedBlogCard & {
  description2: string;
  views?: number;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  mainSubDescription: string;
  subtitle: string;
  subtitleDescription: string;
  subtitleCover: string;
  imageContextText: string;
  storyQuotation: string;
  learningSectionText: string;
  storyFeedback: string;
  additionalFeedback: string;
  middleTitle: string;
  middleDescription: string;
  middleSubtitle: string;
  middleSubBulletPoints: string[];
  keyInsight: string;
  lastTitle: string;
  lastDescription: string;
  lastCover: string;
  textBeforeLastSection: string;
  finalTitle: string;
  finalDescription: string;
  whatWeTeachTitle: string;
  whatWeTeachDescription: string;
  whatWeTeachBulletPoints: string[];
  faqs: BlogFaq[];
};

function text(value: unknown): string {
  return String(value ?? "").trim();
}

export function isPublishedBlog(item: Record<string, unknown>): boolean {
  const status = text(item.status).toUpperCase();
  return !status || status === "PUBLISHED";
}

export function normalizeFaqs(raw: unknown): BlogFaq[] {
  let source: unknown = raw;
  if (typeof source === "string" && source.trim()) {
    try {
      source = JSON.parse(source) as unknown;
    } catch {
      return [];
    }
  }
  if (source && typeof source === "object" && !Array.isArray(source)) {
    const nested = (source as Record<string, unknown>).faqs;
    if (Array.isArray(nested)) source = nested;
    else source = Object.values(source);
  }
  if (!Array.isArray(source)) return [];
  return source
    .map((entry) => {
      const item = (entry ?? {}) as Record<string, unknown>;
      const question = text(item.question ?? item.Question);
      const answer = text(item.answer ?? item.Answer);
      const sortOrder = Number(item.sortOrder ?? item.sort_order);
      const idRaw = item.id;
      const id =
        typeof idRaw === "number"
          ? idRaw
          : Number(idRaw);
      return {
        id: Number.isFinite(id) ? id : undefined,
        question,
        answer,
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      };
    })
    .filter((faq) => faq.question && faq.answer)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function pickFaqs(item: Record<string, unknown>): BlogFaq[] {
  const direct = normalizeFaqs(item.faqs ?? item.faq ?? item.faqList);
  if (direct.length) return direct;
  const nested = item.data;
  if (nested && typeof nested === "object" && !Array.isArray(nested)) {
    return normalizeFaqs((nested as Record<string, unknown>).faqs);
  }
  return [];
}

export function mapBlogCard(item: Record<string, unknown>): MappedBlogCard {
  const categories = pickBlogCategories(item);
  return {
    id: getBlogIdFromItem(item) || text(item.id),
    cover_image: text(item.coverImage ?? item.cover_image ?? item.image),
    main_title:
      text(item.mainTitle ?? item.main_title ?? item.title) || "Untitled",
    description1: text(
      item.description1 ?? item.description ?? item.short_description
    ),
    date: pickBlogDateField(item),
    category: categories[0] ?? "",
    categories,
    author: text(item.author),
    readTime: text(item.readTime ?? item.read_time),
    tags: normalizeStringList(item.tags),
    isFeatured:
      item.isFeatured === true ||
      item.isFeatured === "true" ||
      item.isFeatured === 1,
  };
}

export function mapBlogDetail(item: Record<string, unknown>): MappedBlogDetail {
  const card = mapBlogCard(item);
  const primary = normalizeStringList(item.primaryKeywords);
  const secondary = normalizeStringList(item.secondaryKeywords);
  const semantic = normalizeStringList(item.semanticKeywords);
  return {
    ...card,
    description2: text(
      item.description2 ?? item.content ?? item.long_description
    ),
    views: Number(item.views ?? item.viewCount ?? 0) || undefined,
    seoTitle: text(item.seoTitle),
    seoDescription: text(item.seoDescription),
    keywords: [...primary, ...secondary, ...semantic],
    mainSubDescription: text(item.mainSubDescription),
    subtitle: text(item.subtitle),
    subtitleDescription: text(item.subtitleDescription),
    subtitleCover: text(item.subtitleCover),
    imageContextText: text(item.imageContextText),
    storyQuotation: text(item.storyQuotation),
    learningSectionText: text(item.learningSectionText),
    storyFeedback: text(item.storyFeedback),
    additionalFeedback: text(item.additionalFeedback),
    middleTitle: text(item.middleTitle),
    middleDescription: text(item.middleDescription),
    middleSubtitle: text(item.middleSubtitle),
    middleSubBulletPoints: normalizeStringList(item.middleSubBulletPoints),
    keyInsight: text(item.keyInsight),
    lastTitle: text(item.lastTitle),
    lastDescription: text(item.lastDescription),
    lastCover: text(item.lastCover),
    textBeforeLastSection: text(item.textBeforeLastSection),
    finalTitle: text(item.finalTitle),
    finalDescription: text(item.finalDescription),
    whatWeTeachTitle: text(item.whatWeTeachTitle),
    whatWeTeachDescription: text(item.whatWeTeachDescription),
    whatWeTeachBulletPoints: normalizeStringList(item.whatWeTeachBulletPoints),
    faqs: pickFaqs(item),
  };
}
