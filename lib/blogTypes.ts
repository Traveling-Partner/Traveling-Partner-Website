/** Public website blog DTO — read-only. Matches GET /api/blog/getAll and getById. */

export type BlogFaq = {
  id?: number;
  question: string;
  answer: string;
  sortOrder: number;
};

export type BlogStatus = "DRAFT" | "PUBLISHED" | string;

export type BlogDto = {
  id: number | string;
  coverImage?: string | null;
  mainTitle?: string | null;
  description1?: string | null;
  description2?: string | null;
  date?: string | null;
  author?: string | null;
  readTime?: string | null;
  tags?: string[] | null;
  /** New CRM posts: string[]. Legacy posts: comma-separated string. */
  categoryName?: string[] | string | null;
  mainSubDescription?: string | null;
  subtitle?: string | null;
  subtitleDescription?: string | null;
  subtitleCover?: string | null;
  imageContextText?: string | null;
  storyQuotation?: string | null;
  learningSectionText?: string | null;
  storyFeedback?: string | null;
  additionalFeedback?: string | null;
  middleTitle?: string | null;
  middleDescription?: string | null;
  middleSubtitle?: string | null;
  middleSubBulletPoints?: string[] | null;
  keyInsight?: string | null;
  lastTitle?: string | null;
  lastDescription?: string | null;
  lastCover?: string | null;
  textBeforeLastSection?: string | null;
  finalTitle?: string | null;
  finalDescription?: string | null;
  whatWeTeachTitle?: string | null;
  whatWeTeachDescription?: string | null;
  whatWeTeachBulletPoints?: string[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  primaryKeywords?: string[] | null;
  secondaryKeywords?: string[] | null;
  semanticKeywords?: string[] | null;
  status?: BlogStatus | null;
  views?: number | null;
  isFeatured?: boolean | null;
  faqs?: BlogFaq[] | null;
};

export type BlogListPage = {
  content: BlogDto[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
};
