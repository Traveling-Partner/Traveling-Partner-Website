"use client";

import Image from "next/image";
import Link from "next/link";
import type { HelpCategory } from "@/app/help/helpContent";

type BrowseTopicsSectionProps = {
  categories: HelpCategory[];
};

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function TopicCard({ category }: { category: HelpCategory }) {
  return (
    <Link
      href={`#${category.id}`}
      className="group flex h-full flex-col rounded-[22px] border border-[#eceae4] bg-white p-5 shadow-[0_6px_22px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:rounded-[24px] sm:p-6"
    >
      <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-[14px] sm:h-[56px] sm:w-[56px] sm:rounded-[16px]">
        <Image
          src={category.iconSrc}
          alt=""
          width={56}
          height={56}
          className="h-full w-full object-contain"
        />
      </div>

      <h3 className="mb-1 font-poppins text-[20px] font-extrabold leading-tight text-[#0b0b0b] sm:text-[22px]">
        {category.title}
      </h3>

      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a968c] sm:text-[11px]">
        {category.items.length} Article{category.items.length === 1 ? "" : "s"}
      </p>

      <p className="mb-6 flex-grow text-[13px] leading-[1.65] text-[#6b6960] sm:text-[14px]">
        {category.browseDescription}
      </p>

      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f2ee] text-[#0b0b0b] transition-colors group-hover:bg-gradient-to-b group-hover:from-[#FCE001] group-hover:to-[#FDB813]">
        <ArrowRightIcon className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function BrowseTopicsSection({
  categories,
}: BrowseTopicsSectionProps) {
  return (
    <section className="bg-[#FEFBF6] pb-14 pt-2 sm:pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="font-poppins text-[clamp(26px,3.2vw,36px)] font-extrabold leading-[1.15] tracking-tight text-[#0b0b0b]">
            Browse by{" "}
            <span className="bg-gradient-to-b from-[#FCE001] to-[#FDB813] bg-clip-text font-medium italic text-transparent">topic.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-relaxed text-[#6b6960] sm:text-[15px]">
            Choose a topic below or search for what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <TopicCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
