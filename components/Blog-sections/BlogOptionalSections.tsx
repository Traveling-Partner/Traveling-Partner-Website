"use client";

import Image from "next/image";
import type { MappedBlogDetail } from "@/lib/blogMap";

type BlogOptionalSectionsProps = {
  blog: MappedBlogDetail;
  getImageSrc: (value: string) => string;
};

function SectionHeading({ children }: { children: string }) {
  return <h2 className="blog-section-heading">{children}</h2>;
}

function BulletList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function OptionalImage({
  src,
  alt,
  caption,
  getImageSrc,
}: {
  src: string;
  alt: string;
  caption?: string;
  getImageSrc: (value: string) => string;
}) {
  if (!src) return null;
  return (
    <figure className="my-8">
      <Image
        src={getImageSrc(src)}
        alt={alt}
        width={1400}
        height={800}
        className="h-auto w-full rounded-[22px] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
        style={{ width: "100%", height: "auto" }}
        sizes="(max-width: 900px) 92vw, 900px"
      />
      {caption ? (
        <figcaption className="mt-3 text-center text-[13px] italic text-[#6b6960]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function BlogOptionalSections({
  blog,
  getImageSrc,
}: BlogOptionalSectionsProps) {
  const hasSubtitleBlock =
    Boolean(blog.subtitle) ||
    Boolean(blog.subtitleDescription) ||
    Boolean(blog.subtitleCover);
  const hasMiddleBlock =
    Boolean(blog.middleTitle) ||
    Boolean(blog.middleDescription) ||
    Boolean(blog.middleSubtitle) ||
    blog.middleSubBulletPoints.length > 0;
  const hasLastBlock =
    Boolean(blog.lastTitle) ||
    Boolean(blog.lastDescription) ||
    Boolean(blog.lastCover);
  const hasFinalBlock = Boolean(blog.finalTitle) || Boolean(blog.finalDescription);
  const hasTeachBlock =
    Boolean(blog.whatWeTeachTitle) ||
    Boolean(blog.whatWeTeachDescription) ||
    blog.whatWeTeachBulletPoints.length > 0;

  const hasAny =
    Boolean(blog.mainSubDescription) ||
    hasSubtitleBlock ||
    Boolean(blog.imageContextText && !blog.subtitleCover) ||
    Boolean(blog.storyQuotation) ||
    Boolean(blog.learningSectionText) ||
    Boolean(blog.storyFeedback) ||
    Boolean(blog.additionalFeedback) ||
    hasMiddleBlock ||
    Boolean(blog.keyInsight) ||
    Boolean(blog.textBeforeLastSection) ||
    hasLastBlock ||
    hasFinalBlock ||
    hasTeachBlock;

  if (!hasAny) return null;

  return (
    <div className="blog-detail-content blog-detail-figma blog-detail-optional mt-8">
      {blog.mainSubDescription ? <p>{blog.mainSubDescription}</p> : null}

      {hasSubtitleBlock ? (
        <>
          {blog.subtitle ? <SectionHeading>{blog.subtitle}</SectionHeading> : null}
          {blog.subtitleDescription ? <p>{blog.subtitleDescription}</p> : null}
          <OptionalImage
            src={blog.subtitleCover}
            alt={blog.subtitle || blog.main_title}
            caption={blog.imageContextText}
            getImageSrc={getImageSrc}
          />
        </>
      ) : blog.imageContextText ? (
        <p className="italic text-[#6b6960]">{blog.imageContextText}</p>
      ) : null}

      {blog.storyQuotation ? (
        <blockquote>
          <p>{blog.storyQuotation}</p>
        </blockquote>
      ) : null}

      {blog.learningSectionText ? (
        <div className="blog-insight-card">
          <p>
            <strong>What you&apos;ll learn.</strong> {blog.learningSectionText}
          </p>
        </div>
      ) : null}

      {blog.storyFeedback ? <p>{blog.storyFeedback}</p> : null}
      {blog.additionalFeedback ? <p>{blog.additionalFeedback}</p> : null}

      {hasMiddleBlock ? (
        <>
          {blog.middleTitle ? <SectionHeading>{blog.middleTitle}</SectionHeading> : null}
          {blog.middleDescription ? <p>{blog.middleDescription}</p> : null}
          {blog.middleSubtitle ? <h3>{blog.middleSubtitle}</h3> : null}
          <BulletList items={blog.middleSubBulletPoints} />
        </>
      ) : null}

      {blog.keyInsight ? (
        <div className="blog-insight-card">
          <p>
            <strong>Key insight.</strong> {blog.keyInsight}
          </p>
        </div>
      ) : null}

      {blog.textBeforeLastSection ? <p>{blog.textBeforeLastSection}</p> : null}

      {hasLastBlock ? (
        <>
          {blog.lastTitle ? <SectionHeading>{blog.lastTitle}</SectionHeading> : null}
          {blog.lastDescription ? <p>{blog.lastDescription}</p> : null}
          <OptionalImage
            src={blog.lastCover}
            alt={blog.lastTitle || blog.main_title}
            getImageSrc={getImageSrc}
          />
        </>
      ) : null}

      {hasFinalBlock ? (
        <>
          {blog.finalTitle ? <SectionHeading>{blog.finalTitle}</SectionHeading> : null}
          {blog.finalDescription ? <p>{blog.finalDescription}</p> : null}
        </>
      ) : null}

      {hasTeachBlock ? (
        <>
          {blog.whatWeTeachTitle ? (
            <SectionHeading>{blog.whatWeTeachTitle}</SectionHeading>
          ) : null}
          {blog.whatWeTeachDescription ? <p>{blog.whatWeTeachDescription}</p> : null}
          <BulletList items={blog.whatWeTeachBulletPoints} />
        </>
      ) : null}
    </div>
  );
}
