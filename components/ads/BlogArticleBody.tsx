"use client";

import AdSlot from "@/components/ads/AdSlot";
import {
  countHtmlWords,
  isParagraphBlock,
  splitHtmlBlocks,
} from "@/lib/ads/blogHtml";

type BlogArticleBodyProps = {
  html: string;
  className?: string;
};

export default function BlogArticleBody({ html, className = "" }: BlogArticleBodyProps) {
  const blocks = splitHtmlBlocks(html);
  if (!blocks.length) return null;

  const wordCount = countHtmlWords(html);
  const showMiddle = wordCount >= 500;
  let paragraphCount = 0;
  let afterSecondIndex = -1;

  blocks.forEach((block, index) => {
    if (isParagraphBlock(block)) {
      paragraphCount += 1;
      if (paragraphCount === 2 && afterSecondIndex < 0) {
        afterSecondIndex = index;
      }
    }
  });

  const middleIndex =
    showMiddle && blocks.length >= 6 ? Math.floor(blocks.length / 2) : -1;

  return (
    <div className={className}>
      {blocks.map((block, index) => (
        <div key={`blog-block-${index}`}>
          <div dangerouslySetInnerHTML={{ __html: block }} />
          {index === afterSecondIndex ? (
            <AdSlot placement="blogArticle" />
          ) : null}
          {index === middleIndex && index !== afterSecondIndex ? (
            <AdSlot placement="blogArticle" />
          ) : null}
        </div>
      ))}
    </div>
  );
}
